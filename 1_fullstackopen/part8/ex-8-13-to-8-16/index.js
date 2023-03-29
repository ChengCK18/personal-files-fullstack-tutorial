require("dotenv").config();

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const { v1: uuid } = require("uuid");

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const MONGODB_URI = process.env.MONGODB_URI;
const jwt = require("jsonwebtoken");

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("connected to MongoDB");
    })
    .catch((error) => {
        console.log("error connection to MongoDB:", error.message);
    });

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
 */

/*
  you can remove the placeholder query once your first own has been implemented
*/

const typeDefs = `
    type User{
        username:String!
        favouriteGenre:String!
        id:ID!
    }

    type Token{
        value:String!
        loggedInUser:User!
    }


    type Author {
      name:String!
      born:Int!
      bookCount:Int!
      id:ID!
    }
    type Book {
      title:String!
      published:Int!
      author:Author!
      genres:[String!]!
      id:ID!
    }



    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author:String,genre:String):[Book!]!
        allAuthors:[Author!]!
        me:User

    }

    type Mutation{
      addBook(
        title:String!
        author:String!
        published:Int!
        genres:[String!]
        ):Book

      editAuthor(name:String!,setBornTo:Int!):Author

      createUser(username:String!,favouriteGenre:String!):User
      login(username:String!,password:String!):Token
    }
`;

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),

        allBooks: async (root, args) => {
            let originalBooks = null;
            if (args.author && args.author !== "") {
                if (args.author.length < 5) {
                    return new GraphQLError(
                        "Author name shorter than allowed of 5 characters",
                        {
                            extensions: {
                                code: "BAD_USER_INPUT",
                                invalidArgs: args.name,
                            },
                        }
                    );
                }

                originalBooks = await Book.find().populate({
                    path: "author",
                    model: Author,
                    match: { name: { $eq: args.author } },
                });
                originalBooks = originalBooks.filter(
                    (bk) => bk.author !== null
                );
            } else {
                originalBooks = await Book.find().populate({
                    path: "author",
                    model: Author,
                });
            }

            if (args.genre) {
                if (args.genre !== "all") {
                    originalBooks = originalBooks.filter((bk) =>
                        bk.genres.includes(args.genre)
                    );
                }
            }
            console.log(originalBooks);

            return originalBooks;
        },
        allAuthors: async () => {
            const result = await Author.find({});
            return result;
        },
        me: (root, args, context) => {
            return context.currentUser;
        },
    },
    Author: {
        bookCount: async (root) => {
            //or can just store list of books in Author, the IDs
            // This approach is not good, as there would be many calls to mongoDB

            allBooks = await Book.find().populate({
                path: "author",
                model: Author,
                match: { name: { $eq: root.name } },
            });
            booksByAuthor = allBooks.filter((bk) => bk.author !== null);
            return booksByAuthor.length;
        },
    },

    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser;
            if (!currentUser) {
                throw new GraphQLError("not authenticated", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                    },
                });
            }

            let authorResult = await Author.findOne({ name: args.author });

            if (authorResult === null) {
                // If the author is yet to exist, add it.
                let newAuthor = new Author({
                    name: args.author,
                    born: 0,
                });
                try {
                    authorResult = await newAuthor.save();
                } catch (error) {
                    throw new GraphQLError("Saving person failed", {
                        extensions: {
                            code: "BAD_USER_INPUT",
                            invalidArgs: args.name,
                            error,
                        },
                    });
                }
            }

            let newBook = new Book({ ...args, author: authorResult._id });

            try {
                const result = await newBook.save();
                const populatedResult = result.populate({
                    path: "author",
                    model: Author,
                });
                return populatedResult;
            } catch (error) {
                throw new GraphQLError("Saving book failed", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.title,
                        error,
                    },
                });
            }
        },

        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser;
            if (!currentUser) {
                throw new GraphQLError("not authenticated", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                    },
                });
            }

            const result = await Author.findOneAndUpdate(
                { name: args.name },
                { born: args.setBornTo },
                { new: true }
            );

            if (result === null) {
                return null;
            }

            return result;
        },
        createUser: async (root, args) => {
            const user = new User({
                username: args.username,
                favouriteGenre: args.favouriteGenre,
            });

            return user.save().catch((error) => {
                throw new GraphQLError("Creating the user failed", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.name,
                        error,
                    },
                });
            });
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username });
            if (!user || args.password !== "secret") {
                throw new GraphQLError("wrong credentials", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                    },
                });
            }

            const tokenForUser = {
                username: user.username,
                id: user._id,
            };

            return {
                value: jwt.sign(tokenForUser, process.env.JWT_SECRET),
                loggedInUser: user,
            };
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.startsWith("Bearer ")) {
            const decodedToken = jwt.verify(
                auth.substring(7),
                process.env.JWT_SECRET
            );
            const currentUser = await User.findById(decodedToken.id);
            return { currentUser };
        }
    },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});

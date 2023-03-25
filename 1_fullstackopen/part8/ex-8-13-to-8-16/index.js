require("dotenv").config();

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const { v1: uuid } = require("uuid");

const Author = require("./models/author");
const Book = require("./models/book");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const MONGODB_URI = process.env.MONGODB_URI;

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

    }

    type Mutation{
      addBook(
        title:String!
        author:String!
        published:Int!
        genres:[String!]
        ):Book

      editAuthor(name:String!,setBornTo:Int!):Author
    }
`;

const resolvers = {
    Query: {
        bookCount: () => books.length,
        authorCount: () => Author.collection.countDocuments(),

        allBooks: async (root, args) => {
            let originalBooks = await Book.find({});

            // if (args.author) {
            //     originalBooks = originalBooks.filter(
            //         (bk) => bk.author === args.author
            //     );
            // }

            // if (args.genre) {
            //     originalBooks = originalBooks.filter((bk) =>
            //         bk.genres.includes(args.genre)
            //     );
            // }

            return originalBooks;
        },
        allAuthors: async () => {
            const result = await Author.find({});
            return result;
        },
    },
    Author: {
        bookCount: (root) => {
            const result = Book.find({});
            return result.reduce((totalBook, book) => {
                return (totalBook += book.author === root.name);
            }, 0);
        },
    },
    Mutation: {
        addBook: async (root, args) => {
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
                await newBook.save();
            } catch (error) {
                throw new GraphQLError("Saving person failed", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.name,
                        error,
                    },
                });
            }
        },

        editAuthor: (root, args) => {
            // const findAuthor = authors.find((aut) => aut.name === args.name);
            // if (!findAuthor) {
            //     return null;
            // } else {
            //     const updatedAuthor = { ...findAuthor, born: args.setBornTo };

            //     authors = authors.map((aut) =>
            //         aut.name === args.name ? updatedAuthor : aut
            //     );
            //     return updatedAuthor;
            // }
            return null;
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

startStandaloneServer(server, {
    listen: { port: 4000 },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});

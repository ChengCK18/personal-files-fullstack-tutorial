const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const { v1: uuid } = require("uuid");

const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Person = require("./models/person");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
console.log("connecting to", MONGODB_URI);
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("connected to MongoDB");
    })
    .catch((error) => {
        console.log("error connection to MongoDB:", error.message);
    });

// Defining the GraphQL schema here ;D
// Includes a 'Query' type to outline what can be queried
const typeDefs = `
    enum YesNo {
        YES
        NO
    }
    type User {
        username: String!
        friends: [Person!]!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Address {
        street: String!
        city: String!
    }

    type Person {
        name: String!
        phone: String
        address: Address!
        id: ID!
    }

    type Query {
        personCount: Int!
        allPersons(phone: YesNo): [Person!]!
        findPerson(name: String!): Person
        me: User
    }
    type Mutation {
        addPerson(
            name: String!
            phone: String
            street: String!
            city: String!
        ): Person

        editNumber(name: String!, phone: String!): Person

        createUser(username: String!): User
        login(username: String!, password: String!): Token
        addAsFriend(
            name: String!
          ): User
    }
`;

//Based on the define 'Query', how to resolve for each Query
// findPerson's 'root' will be 'parent' if there are previous chain resolver
// since findPerson is not chained with other resolvers, hence it's 'root'
// essentially it contains the return value of the resolver/field's parent

const resolvers = {
    Query: {
        personCount: async () => Person.collection.countDocuments(),
        allPersons: async (root, args) => {
            if (!args.phone) {
                return Person.find({});
            }
            console.log("Heyyy");

            return Person.find({ phone: { $exists: args.phone === "YES" } });
        },
        findPerson: async (root, args) => Person.findOne({ name: args.name }),
        me: (root, args, context) => {
            return context.currentUser;
        },
    },
    Person: {
        address: (root) => {
            //root in this case refers to Person original object
            return {
                street: root.street,
                city: root.city,
            };
        },
    },
    Mutation: {
        addPerson: async (root, args, context) => {
            const person = new Person({ ...args });
            const currentUser = context.currentUser;

            if (!currentUser) {
                throw new GraphQLError("not authenticated", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                    },
                });
            }

            try {
                await person.save();
                currentUser.friends = currentUser.friends.concat(person);
                await currentUser.save();
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

        editNumber: async (root, args) => {
            const person = await Person.findOne({ name: args.name });
            person.phone = args.phone;
            try {
                await person.save();
            } catch (error) {
                throw new GraphQLError("Saving number failed", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.name,
                        error,
                    },
                });
            }
        },
        createUser: async (root, args) => {
            const user = new User({ username: args.username });

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

            const userForToken = {
                username: user.username,
                id: user._id,
            };

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
        },
        addAsFriend: async (root, args, { currentUser }) => {
            const isFriend = (person) =>
                currentUser.friends
                    .map((f) => f._id.toString())
                    .includes(person._id.toString());

            if (!currentUser) {
                throw new GraphQLError("wrong credentials", {
                    extensions: { code: "BAD_USER_INPUT" },
                });
            }

            const person = await Person.findOne({ name: args.name });
            if (!isFriend(person)) {
                currentUser.friends = currentUser.friends.concat(person);
            }

            await currentUser.save();

            return currentUser;
        },
    },
    // Person: { //overwriting default resolver which returns orignal property of the obj
    //     street: (root) => "Manhattan", //everyone is from manhattan new york D;
    //     city: (root) => "New York"
    // }
};

//Apollo server object requires two parameters
// 1, GraphQL Schema
// 2, Resolvers based on the GraphQL Schema
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
            const currentUser = await User.findById(decodedToken.id).populate(
                "friends"
            );
            return { currentUser };
        }
    },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});

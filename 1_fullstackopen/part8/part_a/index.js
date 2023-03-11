const { ApolloServer, gql } = require("apollo-server");
const { v1: uuid } = require("uuid");
const { GraphQLError } = require("graphql");

let persons = [
    {
        name: "Arto Hellas",
        phone: "040-123543",
        street: "Tapiolankatu 5 A",
        city: "Espoo",
        id: "3d594650-3436-11e9-bc57-8b80ba54c431",
    },

    {
        name: "Matti Luukkainen",
        phone: "040-432342",
        street: "Malminkaari 10 A",
        city: "Helsinki",
        id: "3d599470-3436-11e9-bc57-8b80ba54c431",
    },
    {
        name: "Venla Ruuska",
        street: "Nallemäentie 22 C",
        city: "Helsinki",
        id: "3d599471-3436-11e9-bc57-8b80ba54c431",
    },
];

// Defining the GraphQL schema here ;D
// Includes a 'Query' type to outline what can be queried
const typeDefs = gql`
    enum YesNo {
        YES
        NO
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
    }
    type Mutation {
        addPerson(
            name: String!
            phone: String
            street: String!
            city: String!
        ): Person

        editNumber(name: String!, phone: String!): Person
    }
`;

//Based on the define 'Query', how to resolve for each Query
// findPerson's 'root' will be 'parent' if there are previous chain resolver
// since findPerson is not chained with other resolvers, hence it's 'root'
// essentially it contains the return value of the resolver/field's parent

const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: (root, args) => {
            if (!args.phone) {
                //ENUM args can be null
                return persons;
            }

            const byPhone = (pers) => {
                return args.phone === "YES"
                    ? "phone" in pers
                    : !("phone" in pers);
            };

            return persons.filter(byPhone);
        },
        findPerson: (root, args) => persons.find((p) => p.name === args.name),
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
        addPerson: (root, args) => {
            if (persons.find((p) => p.name === args.name)) {
                throw new GraphQLError("Name must be unique", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.name,
                    },
                });
            }

            const person = { ...args, id: uuid() };
            persons = persons.concat(person);
            return person;
        },
        editNumber: (root, args) => {
            const person = persons.find((p) => p.name === args.name);
            if (!person) {
                //No one found with given name
                return null;
            }
            const updatedPerson = { ...person, phone: args.phone }; //spread operator
            persons = persons.map((p) =>
                p.name === args.name ? updatedPerson : p
            );
            return updatedPerson;
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

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});

const { ApolloServer, gql } = require('apollo-server')

let persons = [
    {
        name: "Arto Hellas",
        phone: "040-123543",
        street: "Tapiolankatu 5 A",
        city: "Espoo",
        id: "3d594650-3436-11e9-bc57-8b80ba54c431"
    },
    {
        name: "Matti Luukkainen",
        phone: "040-432342",
        street: "Malminkaari 10 A",
        city: "Helsinki",
        id: '3d599470-3436-11e9-bc57-8b80ba54c431'
    },
    {
        name: "Venla Ruuska",
        street: "Nallemäentie 22 C",
        city: "Helsinki",
        id: '3d599471-3436-11e9-bc57-8b80ba54c431'
    },
]


// Defining the GraphQL schema here ;D
// Includes a 'Query' type to outline what can be queried
const typeDefs = gql`

    type Address{
        street:String!
        city:String!
    }

    type Person{
        name:String!
        phone:String
        address:Address!
        id:ID!
    }

    type Query{
        personCount:Int!
        allPersons:[Person!]!
        findPerson(name:String!):Person

    }
`

//Based on the define 'Query', how to resolve for each Query
// findPerson's 'root' will be 'parent' if there are previous chain resolver
// since findPerson is not chained with other resolvers, hence it's 'root'
// essentially it contains the return value of the resolver/field's parent

const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons,
        findPerson: (root, args) => persons.find(p => p.name === args.name)
    },
    Person: {
        address: (root) => {
            return {
                street: root.name,
                city: root.city
            }
        }
    }
    // Person: { //overwriting default resolver which returns orignal property of the obj
    //     street: (root) => "Manhattan", //everyone is from manhattan new york D;
    //     city: (root) => "New York"
    // }

}

//Apollo server object requires two parameters
// 1, GraphQL Schema
// 2, Resolvers based on the GraphQL Schema
const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})



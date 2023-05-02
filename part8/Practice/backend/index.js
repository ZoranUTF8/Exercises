require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Person = require("./models/person");

const MONGODB_URI = process.env.TEST_MONGODB_URI_GRAPHQL;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = `

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
    phone: String!
    address: Address!
    id: ID!
  }
  type Query {
    personCount: Int!
    allPersons: [Person!]!
    findPerson(name: String!): Person
    allPersonsWithPhone(phone: YesNo): [Person!]!
  }
  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(
      name: String!
      phone: String!
    ): Person
  }
`;

const resolvers = {
  Query: {
    personCount: async () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      if (!args.phone) {
        return Person.find({});
      }
      return Person.find({ phone: { $exists: args.phone === "YES" } });
    },
    findPerson: async (root, args) => Person.findOne({ name: args.name }),
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },

  Mutation: {
    addPerson: async (root, args) => {
      const person = new Person({ ...args });

      try {
        await person.save();
      } catch (error) {
        throw new GraphQLError("Saving person failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      return person;
    },
    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name });

      if (!person) {
        throw new GraphQLError("No such person found.", {
          extensions: { code: "BAD_USER_INPUT", invalidArgs: args.name },
        });
      } else {
        try {
          person.phone = args.phone;
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
      }
      return person;
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

// ? Executing the queries
/*
  get all persons
query AllPersons {
  allPersons {
    name
  }
}

find a single person
query {
  findPerson(name: "Arto Hellas") {
    phone
    name
    address {
      city
    }
  }
}

get all persons by phone numbber or without phone number
query {
  allPersonsWithPhone(phone: YES) {
    phone
    name
  }
}

add a new person
mutation {
  addPerson(
    name: "Pekka Mikkola"
    phone: "045-2374321"
    street: "Vilppulantie 25"
    city: "Helsinki"
  ) {
    name
    phone
    address{
      city
      street
    }
    id
  }
}

update a persons phone number 
mutation {
  editNumber(name: "Arto Hellas", phone: "000-000-001") {
    name
    phone
  }
}




*/

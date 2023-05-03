require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const DBconnection = require("./server");
const jwt = require("jsonwebtoken");
const Person = require("./models/person");
const User = require("./models/user");

const typeDefs = `

enum YesNo {
  YES
  NO
}

type User {
  username: String!
  email:String!
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
    phone: String!
    address: Address!
    id: ID!
  }
  
  type Query {
    me: User
    personCount: Int!
    allPersons: [Person!]!
    findPerson(name: String!): Person
    allPersonsWithPhone(phone: YesNo): [Person!]!
  }
  type Mutation {
    createUser(
      username: String!
      password:String!
      email:String!
    ): User
    
    login(
      username: String!
      password: String!
    ): Token

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

    addAsFriend(
      username: String!
    ): User

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
    me: (root, args, context) => {
      return context.currentUser;
    },
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
        throw new GraphQLError("Saving user failed", {
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
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        email: args.email,
        password: args.password,
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

      if (!user || args.password !== user.password) {
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
      // ! Fix friend check

      const person = await Person.findOne({ name: args.username });

      const isFriend = (person) =>
        currentUser.friends
          .map((f) => f._id.toString())
          .includes(person._id.toString());

      if (!currentUser) {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      console.log(isFriend(person));

      if (!isFriend(person)) {
        currentUser.friends = currentUser.friends.concat(person);
        await currentUser.save();
      } else {
        throw new GraphQLError("Already friends.", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      return currentUser;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

DBconnection.connectDB()
  .then((conn) => {
    console.log("Connected to db successfully."),
      startStandaloneServer(server, {
        listen: { port: 4000 },
        // The object returned by context is given to all resolvers as their third parameter.
        // Context is the right place to do things which are shared by multiple resolvers, like user identification.
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

            console.log(currentUser);
            return { currentUser };
          }
        },
      }).then(({ url }) => {
        console.log(`Server ready at ${url}`);
      });
  })
  .catch((error) => {
    console.error(`Error connecting to db: ${error.message}`);
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

create new person
mutation {
  createUser (
    username: "mluukkai"
  ) {
    username
    id
  }
}

login user
mutation {
  login (
    username: "mluukkai"
    password: "test"
  ) {
    value
  }
}



query {
  me {
    email
    username
    friends {
       name
      phone
    }
  }
}


mutation {
  createUser(email: "test@gmail.com", username: "mluukkai", password: "test") {
    username
    id
  }
}

*/

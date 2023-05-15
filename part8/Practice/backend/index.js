require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const DBconnection = require("./server");
const jwt = require("jsonwebtoken");
//? Express
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const cors = require("cors");
const http = require("http");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");

const User = require("./models/user");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

// setup is now within a function
const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  const PORT = 4000;

  try {
    await server.start(); // Start the Apollo server first

    app.use(
      "/",
      cors(),
      express.json(),
      expressMiddleware(server, {
        context: async ({ req }) => {
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
      })
    );

    DBconnection.connectDB()
      .then((conn) => {
        console.log("Connected to db successfully.");
        httpServer.listen(PORT, () =>
          console.log(`Server is now running on http://localhost:${PORT}`)
        );
      })
      .catch((error) => {
        console.error(`Error connecting to db: ${error.message}`);
      });
  } catch (error) {
    console.error(`Error starting Apollo server: ${error.message}`);
  }
};
start();

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

get all persons by phone number or without phone number
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

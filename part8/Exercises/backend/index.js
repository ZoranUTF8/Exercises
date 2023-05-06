require("dotenv").config();

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const { GraphQLError } = require("graphql");
const DBConnection = require("./server");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
const jwt = require("jsonwebtoken");

const typeDefs = `

  type User {
    username: String!
    favoriteGenre: [String]
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name:String!,
    born:Int,
    id:ID!,
    bookCount: Int!
  }

  type Book {
    title:String!,
    published:Int!,
    author: Author!,
    genres: [String!]!
    id:String
    }

  type Query {
    me: User
    authorCount:Int!
    bookCount:Int!
    allBooks(author: String,genre: String):[Book]!
    allAuthors: [Author!]!
  }
  
  type Mutation {
    addBook(
      title:String!,
      published:Int!,
      author: String!,
      genres: [String!]!
    ):Book

    editAuthor(
      name:String!
      born:Int!
      ):Author
    addAuthor(
      name:String!
      born:Int
      ):Author

      createUser(
        username: String!
        password:String!
        favoriteGenre: String
      ): User

      loginUser(
        username: String!
        password: String!
      ): Token
  }
`;

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      try {
        const query = {};
        if (args.author) {
          query.author = args.author;
        }
        if (args.genre) {
          query.genres = args.genre;
        }

        const books = await Book.find(query).populate("author");
        return books;
      } catch (error) {
        throw new Error("Error retrieving books");
      }
    },
    allAuthors: async () => {
      const authorBooks = await Book.aggregate([
        {
          $group: {
            _id: "$author",
            bookCount: { $sum: 1 },
          },
        },
      ]);

      const authors = await Author.find({});

      return authors.map((author) => {
        const bookCount = authorBooks.find(
          (authorBook) => authorBook._id.toString() === author._id.toString()
        );
        return {
          ...author.toJSON(),
          bookCount: bookCount ? bookCount.bookCount : 0,
        };
      });
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },

  Mutation: {
    addAuthor: async (root, args) => {
      const newAuthor = new Author({ ...args });

      try {
        await newAuthor.save();
        return newAuthor;
      } catch (error) {
        if (error.name === "ValidationError" && error.errors.title) {
          // title validation error
          throw new GraphQLError(
            `Book validation failed: ${error.errors.title.message}`,
            { extensions: { code: "BAD_USER_INPUT", invalidArgs: args } }
          );
        } else {
          console.log(error);
          throw new GraphQLError(error._message, {
            extensions: { code: "BAD_USER_INPUT", invalidArgs: args },
          });
        }
      }
    },
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("You need to be logged in.", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }

      const { title, published, author, genres } = args;
      // check if author already exists in authors array

      let existingAuthor = await Author.findOne({ name: author });

      // if author doesn't exist, add the author to the authors array
      if (!existingAuthor) {
        newAuthor = new Author({ name: author });
        existingAuthor = await newAuthor.save();
      }

      //  than add the book as well
      const newBook = new Book({
        title,
        published,
        author: existingAuthor._id,
        genres,
      });
      try {
        await newBook.save();

        existingAuthor.bookCount += 1;

        await existingAuthor.save();
      } catch (err) {
        if (err.name === "ValidationError" && err.errors.title) {
          // title validation error
          throw new GraphQLError(
            `Book validation failed: ${err.errors.title.message}`,
            { extensions: { code: "BAD_USER_INPUT", invalidArgs: args } }
          );
        } else {
          console.log(err);
          throw new GraphQLError(err._message, {
            extensions: { code: "BAD_USER_INPUT", invalidArgs: args },
          });
        }
      }

      return newBook;
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("You need to be logged in.", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      const authorToEdit = await Author.findOne({ name: args.name });

      if (!authorToEdit) {
        throw new GraphQLError("No such author found.", {
          extensions: { code: "BAD_USER_INPUT", invalidArgs: args.name },
        });
      } else {
        try {
          authorToEdit.born = args.born;
          await authorToEdit.save();
        } catch (error) {
          throw new GraphQLError("Edit author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.name,
              error,
            },
          });
        }
      }

      return authorToEdit;
    },
    createUser: async (root, args) => {
      const newUser = new User({
        username: args.username,
        password: args.password,
      });

      return newUser.save().catch((err) => {
        throw new GraphQLError("Creating the user failed.", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error: err.message,
          },
        });
      });
    },
    loginUser: async (root, args) => {
      const currentUser = await User.findOne({ username: args.username });

      if (!currentUser || args.password !== currentUser.password) {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const tokenForUser = {
        username: currentUser.username,
        id: currentUser._id,
      };

      return { value: jwt.sign(tokenForUser, process.env.JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

DBConnection.connectDB()
  .then((conn) => {
    console.log("Connected to the database.");
    startStandaloneServer(server, {
      listen: { port: 4000 },
      context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null;

        if (auth && auth.startsWith("Bearer ")) {
          const decodedTokenFromRequest = jwt.verify(
            auth.substring(7),
            process.env.JWT_SECRET
          );

          const currentUser = await User.findById(
            decodedTokenFromRequest.id
          ).select("-password");

          return { currentUser };
        }
      },
    }).then(({ url }) => {
      console.log(`Server ready at ${url}`);
    });
  })
  .catch((err) => {
    console.log(`Error connecting to db ${err.message}`);
  });

/*


get current user 
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
login user
mutation {
  login (
    username: "zochan"
    password: "testpassword"
  ) {
    value
  }
}

create new user
mutation {
  createUser(username: "zochan",  password: "test") {
    username
    id
  }
}

add new author
mutation {
  addAuthor(
    name: "Zoki Zokic"
  ) {
    name
    born
    bookCount
  }
}


get author count
query {
  authorCount
}

get all books
query {
  allBooks { 
    title 
    author
    published 
    genres
  }
}

get all authors
query {
  allAuthors {
    name
    bookCount
  }
}

get all authors with books count
query {
  allAuthors {
    name
    bookCount
  }
}

get books from the author
query {
  allBooks(author: "Robert Martin") {
    title
  }
}

get books by the genre
query {
  allBooks(genre: "refactoring") {
    title
    author
  }
}

 add new book mutation {
  addBook(
    title: "NoSQL Distilled",
    author: "Martin Fowler",
    published: 2012,
    genres: ["database", "nosql"]
  ) {
    title,
    author
  }
}

update a author born year
mutation {
  editAuthor(name: "Arto Hellas", born: 1241) {
    name
    born  }
}

*/

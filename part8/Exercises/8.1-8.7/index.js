const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
const { GraphQLError } = require("graphql");

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

/*


 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 **/

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const typeDefs = `
  type Author {
    name:String!,
    born:Int,
    id:ID!,
    bookCount: Int!
  }

  type Book {
    title:String!,
    published:Int!,
    author: String!,
    genres: [String!]!
    }
  type Query {
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
    editAuthor(name:String!,birthYear:Int!):Author
  }
`;

const resolvers = {
  Query: {
    authorCount: () => authors.length,
    bookCount: () => books.length,
    allBooks: (root, args) => {
      switch (true) {
        case Boolean(args.author):
          const allAuthorBooks = books.filter(
            (book) => book.author === args.author
          );
          return allAuthorBooks;
        case Boolean(args.genre):
          const allGenreBooks = books.filter((book) =>
            book.genres.includes(args.genre)
          );
          return allGenreBooks;
        default:
          return books;
      }
    },
    allAuthors: () => {
      return authors.map((author) => {
        const bookCount = books.filter(
          (book) => book.author === author.name
        ).length;
        return { ...author, bookCount };
      });
    },
  },

  Mutation: {
    addBook: (root, args) => {
      const { title, published, author, genres } = args;
      // check if author already exists in authors array
      let existingAuthor = authors.find((a) => a.name === author);

      // if author doesn't exist, add the author to the authors array
      if (!existingAuthor) {
        const newAuthor = { name: author, id: uuid() };
        authors = authors.concat(newAuthor);
        existingAuthor = newAuthor;
      }

      //  than add the book as well
      const book = {
        title,
        published,
        author: existingAuthor.name,
        genres,
        id: uuid(),
      };
      books = books.concat(book);
      return book;
    },
    editAuthor: (root, args) => {
      // check if author already exists in authors array
      let existingAuthor = authors.find((a) => a.name === args.name);
      console.log(authors);
      if (!existingAuthor) {
        throw new GraphQLError("No such author found.", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
          },
        });
      }

      const updatedAuthor = { ...existingAuthor, born: args.birthYear };

      authors = authors.map((author) =>
        author.name === args.name ? updatedAuthor : author
      );
      return updatedAuthor;
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

/*
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



*/

import { gql } from "@apollo/client";

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      bookCount
      born
      id
    }
  }
`;

const ALL_BOOKS = gql`
  query ($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`;

const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      genres
    }
  }
`;

const UPDATE_AUTHOR_BORN = gql`
  mutation updateAuthorBorn($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      name
      born
    }
  }
`;

const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      value
    }
  }
`;

export default {
  ALL_AUTHORS,
  ALL_BOOKS,
  CREATE_BOOK,
  UPDATE_AUTHOR_BORN,
  LOGIN_USER,
};

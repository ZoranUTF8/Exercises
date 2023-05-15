import { gql } from "@apollo/client";

//? Fragments
/* 
It is pretty common in GraphQL that multiple queries return similar results.
Situations can be simplified with the use of fragments.
Let's declare a fragment for selecting all fields of a person:
*/

const PERSON_DETAILS_FRAGMENT = gql`
  fragment PersonDetails on Person {
    id
    name
    phone
    address {
      street
      city
    }
  }
`;

const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS_FRAGMENT}
`;

const ALL_PERSONS = gql`
  query {
    allPersons {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS_FRAGMENT}
`;

const CREATE_PERSON = gql`
  mutation createPerson(
    $name: String!
    $street: String!
    $city: String!
    $phone: String
  ) {
    addPerson(name: $name, street: $street, city: $city, phone: $phone) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`;

const EDIT_NUMBER = gql`
  mutation editNumber($name: String!, $phone: String!) {
    editNumber(name: $name, phone: $phone) {
      name
      phone
      address {
        street
        city
      }
      id
    }
  }
`;

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export default {
  FIND_PERSON,
  ALL_PERSONS,
  CREATE_PERSON,
  EDIT_NUMBER,
  LOGIN_USER,
};

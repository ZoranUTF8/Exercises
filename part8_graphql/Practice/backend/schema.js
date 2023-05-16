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
    allPersons(phone: YesNo): [Person!]!
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

  type Subscription {
    personAdded: Person!
  }  
`;

module.exports = typeDefs;

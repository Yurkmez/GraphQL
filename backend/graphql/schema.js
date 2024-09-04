const { buildSchema } = require('graphql');

// Обязательно обратные кавычки!
const schema = buildSchema(`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    createdAt: String!
    updatedAt: String!
  }

  type RowCount {
    rows: [User!]!
    count: Int!
  }

  type Query {
    test: String!
    getUsers: RowCount!
    getOneUser(id_found: ID!): User!
    }

  input userCreate {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
  
  input userUpdate {
    firstName: String!
    lastName: String!
    email: String!
  }

  type Mutation {
    createUser(input: userCreate!): User!
    updateUser(id_found: ID!, input: userUpdate!): User!
    deleteUser(id_found: ID!): Boolean!
  }
`);

module.exports = schema;

const { gql } = require("apollo-server");

module.exports = gql`
  type bsocialProduct {
    id: ID!
    name: String!
    description: String!
    price: Int!
  }

  type User {
    id: ID!
    email: String!
    username: String!
    token: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    email: String!
  }

  type Query {
    getbsocialProducts: [bsocialProduct]
    getbsocialProduct(bsocialProductId: ID!): bsocialProduct 
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createbsocialProduct(body: String!): bsocialProduct!
    deletebsocialProduct(bsocialProductId: ID!): String!
  }

  type Subscription {
    newbscoialProduct: bsocialProduct!
  }
`;

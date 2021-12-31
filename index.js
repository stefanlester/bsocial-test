require('dotenv').config();
const { ApolloServer} = require('apollo-server')
const mongoose = require('mongoose')
const gql = require('graphql-tag')
const connectDB = require('./db/connect')
const mongoSanitize = require('express-mongo-sanitize');

const typeDefs = gql`
    type  Query{
        sayHi: String! 
    }
`

const resolvers = {
    Query: {
        sayHi: () => 'Hello World'
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    server.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();


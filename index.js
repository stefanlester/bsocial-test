require('dotenv').config();
const { ApolloServer} = require('apollo-server')
const mongoose = require('mongoose')
const connectDB = require('./db/connect')
const mongoSanitize = require('express-mongo-sanitize');
const resolvers = require('./gql/user_resolvers')
const typeDefs = require('./gql/typedef')



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


require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const connectDB = require("./db/connect");
const mongoSanitize = require("express-mongo-sanitize");
const resolvers = require("./gql/user_resolvers");
const typeDefs = require("./gql/typedef");
const express = require('express');
const app = express();
const xss = require('xss-clean');
const cors = require('cors');
const helmet = require('helmet'); //enables all security headers  for csrf protection
/* Strict-Transport-Security
X-frame-Options
X-XSS-Protection
X-Content-Type-Protection
Content-Security-Policy
Cache-Control
Expect-CT
Disable X-Powered-By */
const rateLimiter = require('express-rate-limit'); //implemeted a rate limiter which we talked about in the interview
const session = require('express-session'); //to prevent session hijacking

app.use(cors());
app.use(xss());
app.use(mongoSanitize());
app.use(helmet());

app.set('trust proxy', 1); //rate limiter implementation
app.use(
    rateLimiter({
      windowMs: 15 * 60 * 1000,
      max: 60,
    })
  );

app.use(session({
  secret: 'secret1',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, path: '/'}
}));

const server = new ApolloServer({ typeDefs, resolvers });

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

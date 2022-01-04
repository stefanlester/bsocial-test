const bsocialProductResolvers = require("./bsocialproductResolver");
const usersResolvers = require("./user_resolvers");

module.exports = {
  Query: {
    ...bsocialProductResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
  },
};

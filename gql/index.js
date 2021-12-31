const bsocialProductResolver = require('./bsocialproductResolver')
const usersResolvers = require('./user_resolvers');


module.exports = {
  Query: {
        ...usersResolvers.Query
      },
  Mutation: {
    ...usersResolvers.Mutation,
  }
};
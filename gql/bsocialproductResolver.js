const { AuthenticationError } = require("apollo-server");
const bsocialProduct = require("../../models/bsocialproduct");

module.exports = {
  Query: {
    async getbsocialProducts() {
      try {
        const bsocialProducts = await bsocialProduct
          .find()
          .sort({ createdAt: -1 });
        return bsocialProduct;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getbsocialProduct(_, { bsocialProductId }) {
      try {
        const bsocialProduct = await bsocialProduct.findById(bsocialProductId);
        if (bsocialProduct) {
          return bsocialProduct;
        } else {
          throw new Error("bsocialProduct not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createbsocialProduct(_, { body }, context) {
      const user = checkAuth(context);

      if (args.body.trim() === "") {
        throw new Error("bsocialProduct body must not be empty");
      }

      const newbsocialProduct = new bsocialProduct({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const bsocialProduct = await newbsocialProduct.save();

      context.pubsub.publish("NEW_bsocialProduct", {
        newbsocialProduct: bsocialProduct,
      });

      return bsocialProduct;
    },
    async deletebsocialProduct(_, { bsocialProductId }, context) {
      const user = checkAuth(context);

      try {
        const bsocialProduct = await bsocialProduct.findById(bsocialProductId);
        if (user.username === bsocialProduct.username) {
          await bsocialProduct.delete();
          return "bsocialProduct deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Subscription: {
    newbsocialProduct: {
      subscribe: (_, __, { pubsub }) =>
        pubsub.asyncIterator("NEW_bsocialProduct"),
    },
  },
};

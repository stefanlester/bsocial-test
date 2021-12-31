const bsocialProduct = require("../../models/bsocialproduct");

module.exports = {
  Query: {
    async getbsocialProduct() {
      try {
        const posts = await bsocialProduct.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

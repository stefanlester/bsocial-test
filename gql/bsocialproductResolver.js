const bsocialProduct = require("../../models/bsocialproduct");

module.exports = {
  Query: {
    async getbsocialProduct() {
      try {
        const bsocialProduct_1 = await bsocialProduct.find();
        return bsocialProduct_1;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

const { model, Schema } = require('mongoose');

const bsocialproductSchema = new Schema({
  name: String,
  description: String,
  price: Number,
});

module.exports = model('User', bsocialproductSchema);

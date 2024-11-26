const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productGroupSchema = new Schema({
  product_group_id: {type: String, unique: true, required: true, trim: true},
});

module.exports = mongoose.model("ProductGroup", productGroupSchema);

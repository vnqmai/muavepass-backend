const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  order_id: { type: String, unique: true, required: true, trim: true },
  product_id: { type: String, required: true, trim: true },
  email: { type: String, unique: false, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  fullname: { type: String, required: true, trim: true },
  status: { type: String, required: true, trim: true },
});

module.exports = mongoose.model("Order", orderSchema);

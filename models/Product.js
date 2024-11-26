const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  product_id: { type: String, unique: true, required: true, trim: true },
  product_name: { type: String, required: true, trim: true },
  seat: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  cost: { type: Number, required: true },
  status: { type: String, required: true, trim: true },
  images: [
    {
      type: String,
    },
  ],
  event_image: {
    type: String,
  },
  event_time: {
    type: String,
  },
  event_location: {
    type: String,
  },
  class: {
    type: String,
  },
});

module.exports = mongoose.model("Product", productSchema);

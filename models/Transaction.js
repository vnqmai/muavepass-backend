const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  accountNumber: { type: String, required: true, trim: true },
  amount: { type: Number,required: true },
  counterAccountBankId: { type: String },
  counterAccountBankName: { type: String },
  counterAccountName: { type: String },
  counterAccountNumber: { type: String },
  description: { type: String, required: true, trim: true },
  fullname: { type: String },
  reference: { type: String, },
  transactionDateTime: { type: String },
  virtualAccountName: { type: String },
  virtualAccountNumber: { type: String },
});

module.exports = mongoose.model("Transaction", transactionSchema);

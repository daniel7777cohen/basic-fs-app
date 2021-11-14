const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  customer_id: {
    type: Schema.Types.ObjectId,
    ref: 'customer',
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String, //should be an enum as in ui
    required: true,
  },
  credit_card_type: {//  enum
    type: String,
    required: true,
  },
  credit_card_number: {//validation for proper number
    type: Number,
    required: true,
  },
});

const Transaction = mongoose.model('transaction', TransactionSchema);
export default Transaction;

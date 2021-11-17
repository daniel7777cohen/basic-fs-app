const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import { Gender } from '../common/types';
import { validateEmail } from './utils';

const CustomerSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  gender: {
    type: String,
    required: true,
    enum: Object.values(Gender),
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: false,
  },
  transactions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'transaction',
    },
  ],
  is_deleted: {
    type: Boolean,
    default: false,
  },
});

const Customer = mongoose.model('customer', CustomerSchema);
export default Customer;

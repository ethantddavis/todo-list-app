const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  timestamp: {
    type: String,
    required: true
  },
  userAddress: {
    type: String,
    required: true
  },
  transactionHash: {
    type: String,
    required: true
  },
  transactionType: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
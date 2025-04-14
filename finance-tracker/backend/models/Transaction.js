import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  amount: Number,
  date: Date,
  description: String
}, { timestamps: true });

export default mongoose.model('Transaction', TransactionSchema);

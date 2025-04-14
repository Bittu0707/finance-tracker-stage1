import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import './output.css';
import Transaction from './models/Transaction.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// MongoDB connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// Routes
app.get('/api/transactions', async (req, res) => {
  const transactions = await Transaction.find().sort({ date: -1 });
  res.json(transactions);
});

app.post('/api/transactions', async (req, res) => {
  const { amount, date, description } = req.body;
  if (!amount || !date || !description) return res.status(400).json({ error: 'Missing fields' });
  const newTransaction = await Transaction.create({ amount, date, description });
  res.status(201).json(newTransaction);
});

app.put('/api/transactions', async (req, res) => {
  const { id, amount, date, description } = req.body;
  const updated = await Transaction.findByIdAndUpdate(id, { amount, date, description }, { new: true });
  res.json(updated);
});

app.delete('/api/transactions', async (req, res) => {
  const { id } = req.body;
  await Transaction.findByIdAndDelete(id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

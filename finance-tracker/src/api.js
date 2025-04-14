import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

export const fetchTransactions = () => API.get('/transactions');
export const addTransaction = (tx) => API.post('/transactions', tx);
export const updateTransaction = (tx) => API.put('/transactions', tx);
export const deleteTransaction = (id) => API.delete('/transactions', { data: { id } });

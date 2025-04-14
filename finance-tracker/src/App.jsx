import { useEffect, useState } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import ExpenseChart from './components/ExpenseChart';
import {
  fetchTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from './api';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [selected, setSelected] = useState(null);

  const loadData = async () => {
    const res = await fetchTransactions();
    setTransactions(res.data);
  };

  const handleSubmit = async (tx) => {
    if (tx.id) {
      await updateTransaction(tx);
    } else {
      await addTransaction(tx);
    }
    setSelected(null);
    loadData();
  };

  const handleDelete = async (id) => {
    await deleteTransaction(id);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <main style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>

        <h1 className="text-3xl font-bold text-center">Finance Tracker</h1>

        <div className="mt-8">
        <TransactionForm onSubmit={handleSubmit} selected={selected} />
        </div>

        <div className="mt-14">
          <TransactionList transactions={transactions} onEdit={setSelected} onDelete={handleDelete} />
        </div>

        <div className="mt-20">
          <ExpenseChart transactions={transactions} />
        </div>
      
    </main>
  );
}

export default App;

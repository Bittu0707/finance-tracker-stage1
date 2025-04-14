import { useState, useEffect } from 'react';

export default function TransactionForm({ onSubmit, selected }) {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (selected) {
      setAmount(selected.amount);
      setDate(selected.date.substring(0, 10));
      setDescription(selected.description);
    }
  }, [selected]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !date || !description) return alert('All fields required');
    onSubmit({ amount: Number(amount), date, description, id: selected?._id });
    setAmount('');
    setDate('');
    setDescription('');
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} >
      <input className="border rounded py-2 px-3 w-full" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
      <input className="border rounded py-2 px-3 w-full" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input className="border rounded py-2 px-3 w-full" type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <button className="bg-blue-500 text-white px-4 py-2 my-5 rounded-md font-medium hover:bg-blue-600" type="submit">{selected ? 'Update' : 'Add'} Transaction</button>
    </form>
  );
}


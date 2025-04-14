export default function TransactionList({ transactions, onEdit, onDelete }) {
    return (
      <ul>
        {transactions.map((tx) => (
          <li className="bg-gray-100 p-4 border-2 rounded-sm flex justify-between items-center shadow-lg mb-4" key={tx._id}>
            <div>
              <strong>{tx.description}</strong> - ${tx.amount} on {new Date(tx.date).toLocaleDateString()}
            </div>
            <div>
              <button className="border-none px-6 py-1 rounded-md bg-green-400 hover:bg-green-500" onClick={() => onEdit(tx)}>Edit</button>
              <button className="border-none px-4 py-1 rounded-md bg-red-400 hover:bg-red-500 ml-4" onClick={() => onDelete(tx._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    );
  }
  
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ExpenseChart({ transactions }) {
  const monthlyTotals = {};

  transactions.forEach(({ amount, date }) => {
    const month = new Date(date).toLocaleString('default', { month: 'short', year: 'numeric' });
    monthlyTotals[month] = (monthlyTotals[month] || 0) + Number(amount);
  });

  const chartData = Object.entries(monthlyTotals).map(([month, total]) => ({
    month,
    total,
  }));

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

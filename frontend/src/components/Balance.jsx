export default function Balance({ value }) {
  return (
    <div className="rounded-3xl bg-linear-to-r from-slate-400 to-slate-500 p-8 hover:from-slate-500 hover:to-slate-600 text-white shadow-lg">
      <p className="text-sm opacity-80">Available Balance</p>

      <h2 className="mt-3 text-4xl font-bold">₹ {value}</h2>

      <p className="mt-2 text-sm opacity-80">+12.4% from last month</p>
    </div>
  );
}

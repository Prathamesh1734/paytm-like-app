import { Send, History, CreditCard } from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      icon: <Send size={22} />,
      title: "Send Money",
    },
    {
      icon: <History size={22} />,
      title: "History",
    },
    {
      icon: <CreditCard size={22} />,
      title: "Cards",
    },
  ];

  return (
    <div className="rounded-3xl bg-white p-6 shadow">
      <h3 className="mb-6 font-bold">Quick Actions</h3>

      <div className="grid grid-cols-3 gap-4">
        {actions.map((action) => (
          <button
            key={action.title}
            className="rounded-2xl border p-4 hover:bg-slate-50"
          >
            <div className="flex justify-center">{action.icon}</div>

            <div className="mt-2 text-sm">{action.title}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

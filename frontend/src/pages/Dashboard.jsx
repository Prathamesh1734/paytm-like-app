import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import QuickActions from "../components/QuickActions";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Appbar />

      <div className="mx-auto max-w-7xl p-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <Balance value="12,45,890" />

          <QuickActions />
        </div>

        <div className="mt-8">
          <Users />
        </div>
      </div>
    </div>
  );
}

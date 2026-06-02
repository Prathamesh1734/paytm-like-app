import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

export default function Appbar() {
  const navigate = useNavigate();
  const firstName = localStorage.getItem("username");

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-slate-700 p-2 text-white font-bold">
              $
            </div>
            <button
              onClick={() => {
                navigate("/");
              }}
              className="text-xl font-bold"
            >
              TransferX
            </button>
          </div>

          <nav className="hidden gap-8 md:flex">
            <div className="hover:text-slate-800 pt-2">
              Welcome, {firstName}
            </div>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/");
              }}
              className="rounded-xl bg-slate-600 px-5 py-2 text-white transition hover:bg-slate-700"
            >
              logout
            </button>
          </nav>

          <Menu className="md:hidden" />
        </div>
      </header>
    </>
  );
}

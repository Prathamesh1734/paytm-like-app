import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

export default function Appbar() {
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-black p-2 text-white font-bold">
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
            <a href="#how" className="hover:text-slate-800">
              Welcome
            </a>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
              className="hover:text-slate-800"
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

import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Heading from "../components/Heading.jsx";
import ButtonComponent from "../components/ButtonComponent.jsx";

export default function SendMoney() {
  const [amount, setAmount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [label, setLabel] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (amount <= 0) {
        setLabel("Enter a valid amount");
        setShowPopup(true);
        return;
      }

      setLoading(true);

      const response = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          to: id,
          amount: Number(amount),
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        },
      );

      if (response.status === 200) {
        setLabel("Transfer Successful");
        setShowPopup(true);
      }
    } catch (error) {
      setLabel(error.response?.data?.message || "Transfer Failed");

      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showPopup && <Popup label={label} />}
      <div className="rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold">Send Money</h1>

        <p className="mt-2 text-slate-500">Transfer funds securely</p>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-500 text-xl font-bold text-white">
            {name?.[0]?.toUpperCase()}
          </div>

          <div>
            <h3 className="font-semibold">{name}</h3>

            <p className="text-sm text-slate-500">Wallet User</p>
          </div>
        </div>

        <div className="mt-8">
          <label className="text-sm text-slate-500">Amount</label>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="5000"
            className="
                        mt-2
                        w-full
                        rounded-2xl
                        border
                        p-4
                        text-2xl
                        font-bold
                        focus:border-slate-500
                        focus:outline-none
                      "
          />
        </div>

        <div className="mt-6 rounded-2xl bg-slate-50 p-4">
          <div className="flex justify-between">
            <span>Transfer Fee</span>
            <span>₹0</span>
          </div>

          <div className="mt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{Number(amount || 0).toLocaleString()}</span>
          </div>
        </div>

        <button
          disabled={loading}
          onClick={handleSubmit}
          className="
                      mt-6
                      w-full
                      rounded-2xl
                      bg-slate-600
                      py-4
                      font-semibold
                      text-white
                      transition
                      hover:bg-slate-700
                      disabled:opacity-50
                    "
        >
          {loading ? "Processing..." : "Transfer Money"}
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="
      mt-3
      w-full
      rounded-2xl
      border
      py-4
      font-semibold
    "
        >
          Cancel
        </button>
      </div>
    </>
  );
}

function Popup({ label }) {
  const navigate = useNavigate();

  const success = label.includes("Success");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-96 rounded-3xl bg-white p-8 text-center shadow-xl">
        <div
          className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
            success ? "bg-slate-100" : "bg-red-100"
          }`}
        >
          <span className="text-3xl">{success ? "✓" : "!"}</span>
        </div>

        <h2 className="mt-4 text-2xl font-bold">{label}</h2>

        <button
          onClick={() => navigate("/dashboard")}
          className="
            mt-6
            w-full
            rounded-2xl
            bg-slate-600
            py-3
            text-white
          "
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

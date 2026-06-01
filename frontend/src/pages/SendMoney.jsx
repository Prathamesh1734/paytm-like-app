import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Heading from "../components/Heading.jsx";
import ButtonComponent from "../components/ButtonComponent.jsx";

export default function SendMoney() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [label, setLabel] = useState("");

  const handleSubmit = async () => {
    try {
      if (amount <= 5) {
        setLabel("enter valid amount");
        setShowPopup(true);
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          to: id,
          amount,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        },
      );

      if (response.status === 200) {
        setLabel("success!");
        setShowPopup(true);
      }
    } catch (error) {
      setLabel("insufficient balance");
      setShowPopup(true);
    }
  };

  return (
    <>
      {showPopup && <Popup label={label} />}
      <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
          <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col space-y-1.5 p-6 mb-0">
              <h2 className="text-3xl font-bold text-center">send money</h2>
            </div>
            <div className="p-3">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-2xl text-white">
                    {name[0].toUpperCase()}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold">{name}</h3>
              </div>
              <div className="space-y-4 pt-1">
                <div className="space-y-2 pt-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="amount"
                  >
                    Amount (in ₹)
                  </label>
                  <input
                    type="number"
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    id="amount"
                    placeholder="enter amount"
                  />
                </div>
                <button
                  className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 hover:bg-green-700  text-white"
                  onClick={handleSubmit}
                >
                  transfer
                </button>
                <button
                  className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full border border-gray-500 bg-white-500 hover:bg-gray-200  text-black"
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                >
                  back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Popup({ label }) {
  const navigate = useNavigate();

  return (
    <div className="bg-black/50 fixed inset-0 flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={label} />
          <div className="pt-4">
            <ButtonComponent
              onClick={async () => {
                navigate("/dashboard");
              }}
              label={"back"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

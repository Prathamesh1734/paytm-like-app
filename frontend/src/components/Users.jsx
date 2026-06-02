import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "./ButtonComponent";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
      .then((response) => {
        setUsers(response.data.user);
      });
  }, [filter]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          placeholder="search user"
          className="w-full px-2 py-1 border rounded border-slate-200"
        />
      </div>
      <div>
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
    </>
  );
}

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="mb-3 flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-600">
          {user.firstName[0]}
        </div>

        <div>
          <h4 className="font-semibold">
            {user.firstName} {user.lastName}
          </h4>

          <p className="text-sm text-slate-500">Wallet User</p>
        </div>
      </div>

      <button
        onClick={() => navigate(`/send?id=${user._id}&name=${user.firstName}`)}
        className="rounded-xl bg-slate-600 px-5 py-2 text-white transition hover:bg-slate-700"
      >
        Send Money
      </button>
    </div>
  );
}

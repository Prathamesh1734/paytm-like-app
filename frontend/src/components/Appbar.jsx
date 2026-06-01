import { useNavigate } from "react-router-dom";
import ButtonComponent from "./ButtonComponent";

export default function Appbar() {
  const navigate = useNavigate();

  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">paytm</div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">
          hello, user
        </div>
        <div className="mt-2 mr-2">
          <ButtonComponent
            label={"logout"}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          />
        </div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">U</div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/Subheading";
import { useNavigate } from "react-router-dom";
import InputBox from "../components/InputBox";
import ButtonComponent from "../components/ButtonComponent";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"sign up"} />
          <SubHeading label={"enter your information to create an account"} />
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder={"john"}
            label={"first name"}
          />
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder={"doe"}
            label={"last name"}
          />
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder={"johndoe@email.com"}
            label={"email"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder={"*******"}
            label={"password"}
          />
          <div className="pt-4">
            <ButtonComponent
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  { username, password, firstName, lastName },
                );
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              }}
              label={"sign up"}
            />
          </div>
          <BottomWarning
            label={"already have an account?"}
            buttonText={"sign in"}
            to={"/signin"}
          ></BottomWarning>
        </div>
      </div>
    </div>
  );
}

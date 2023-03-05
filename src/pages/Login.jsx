import axios from "axios";
import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { mainContext } from "../mainContext";

const Login = () => {
  const { setUser } = useContext(mainContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("api/login", { email, password });
      setRedirect(true);
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <form className="mt-9 w-full max-w-[500px] m-auto" onSubmit={handleLogin}>
      <h1 className="text-[35px] font-bold mb-4 text-center">Login</h1>
      <input
        type="email"
        placeholder="Your Email"
        className="mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Your password"
        className="mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-gray-600 rounded-md text-white py-1 w-full">
        Login
      </button>
    </form>
  );
};

export default Login;

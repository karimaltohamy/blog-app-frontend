import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("api/register", { username, email, password });
      setRedirect(true);
    } catch (err) {
      console.log(err);
    }
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }
  return (
    <form
      className="mt-9 w-full max-w-[500px] m-auto"
      onSubmit={handleRegister}
    >
      <h1 className="text-[35px] font-bold mb-4 text-center">Register</h1>
      <input
        type="text"
        placeholder="Your User name"
        className="mb-2"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
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
        Register
      </button>
    </form>
  );
};

export default Register;

import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const { signup, error, isLoading } = useSignup();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password, firstname, lastname);
  };

  return (
    <>
      <form className="signup" onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input
          type="text"
          onChange={(e) => setFirstname(e.target.value)}
          value={firstname}
        />
        <br />
        <label>Last Name:</label>
        <input
          type="text"
          onChange={(e) => setLastname(e.target.value)}
          value={lastname}
        />
        <br />
        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <button disabled={isLoading}>Sign up</button>
        {error && <div>{error}</div>}
      </form>
    </>
  );
}

export default Signup;

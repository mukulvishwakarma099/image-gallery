import React, { useState } from "react";

const Login = () => {
  const userObj = {
    name: "test",
    password: 123456,
  };

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login form</h2>
        <div className="user">
          <label htmlFor="username">Username</label> <br />
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter Username"
          />{" "}
          <br />
          <span className="userErr">ABC</span>
        </div>
        <div className="password">
          <label htmlFor="username">Password</label> <br />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
          <br />
          <span className="passwordErr">Abc</span>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

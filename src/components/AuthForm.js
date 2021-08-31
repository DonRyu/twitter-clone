import React, { useState } from "react";
import { authService, firebaseInstance } from "../fbase";
import "./components.css";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      if (newAccount) {
        await authService.createUserWithEmailAndPassword(email, password);
      } else {
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => {
    //setNewAccount(prev => !prev);
    setNewAccount((prev) => {
      return !prev;
    });
  };

  return (
    <>

      <h1 className="authForm_title">Don Twitter</h1>
      <form onSubmit={onSubmit} className="AuthForm">
        <input onChange={onChange} name="email" type="text" placeholder="  Email" required value={email} />
        <input onChange={onChange} name="password" type="password" placeholder="  Password" required value={password} />
        <input className="btn btn-primary" type="submit" value={newAccount ? "Create Account" : "Log In"} />

        {error}
      </form>
      <button className="btn btn-secondary" onClick={toggleAccount}>
        {newAccount ? "Login" : "Create Account"}
      </button>
    </>
  );
};

export default AuthForm;

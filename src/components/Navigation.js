import React from "react";
import { Link } from "react-router-dom";
import "./components.css";
import home from "../img/home_logo.png";
import user from "../img/user_logo.png";

const Navigation = ({ userObj }) => {
  return (
    <>
      <nav className="Navigation">
        <div>
          <Link to="/">
            <img src={home} />
            <div>Home</div>
          </Link>
        </div>
        <div>
          <Link className="setting" to="/profile">
            <img src={user} />
            <div>Setting</div>
          </Link>
        
        </div>
      </nav>
      <h2>Hello, {userObj.displayName}</h2>

    </>
  );
};

export default Navigation;

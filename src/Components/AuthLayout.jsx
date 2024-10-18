import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "./../assets/logo.png";

export default function AuthLayout() {
  return (
    <div>
      <nav>
        <div className="light-blue-background navbar bg-white p-3">
          <div className="container">
            <div className="navbar-content d-flex justify-content-between align-items-center w-100">
              <div className="login-logo">
                <img src={logo} className="" />
              </div>
              <div className="start-buttons d-flex gap-3">
                <Link to="login">
                  <button className="btn btn-outline-warning" id="loginBtn">
                    Login
                  </button>
                </Link>
                <Link to="register">
                  <button className="btn btn-outline-danger" id="signUpBtn">
                    Sign up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

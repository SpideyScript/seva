import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/sign-up");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar" id="main-nav">
      <div className="nav-inner">

        <div
          className="logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          Seva<span>•</span>
        </div>

        <div className="nav-links">
          <a className="active" id="nav-home">Home</a>
          <a>Services</a>
          <a>How It Works</a>
          <a>Become a Provider</a>
        </div>

        <div className="nav-right">
          {!user ? (
            <>
              <button
                className="btn btn-outline"
                onClick={handleLogin}
              >
                Login
              </button>

              <button
                className="btn btn-primary"
                onClick={handleSignup}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <span style={{ marginRight: "10px" }}>
                Hi, {user.name}
              </span>

              <button
                className="btn btn-primary"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
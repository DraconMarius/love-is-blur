import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/NavigationTabs.css";
import { useState } from "react";
import Auth from "../utils/auth";

/* eslint-disable jsx-a11y/anchor-is-valid */
function NavigationTabs({ handlePageChange }) {
  const [isActive, setisActive] = useState(false);
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a
          onClick={() => {
            setisActive(!isActive);
          }}
          role="button"
          className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isActive ? "is-active" : ""}`}
      >
        <div className="navbar-start">
          <motion.div
            className="nav-link"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link
              to="/home" onClick={() => handlePageChange("Home")}
            >
              Home
            </Link>
          </motion.div>
          {Auth.loggedIn() ? (
            <>
              <motion.div
                className="nav-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to="/chat" onClick={() => handlePageChange("Chat")}>
                  Chat
                </Link>
              </motion.div>
              <motion.div
                className="nav-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to="/profile" onClick={() => handlePageChange("Profile")}>
                  profile
                </Link>
              </motion.div>

              <motion.div
                className="nav-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to="/swipe" onClick={() => handlePageChange("Swipe")}>
                  Swipe
                </Link>
              </motion.div>
            </>
          ) : (
            <>
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    <motion.div
                      className="sign-up"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Link
                        to="/signup"
                        onClick={() => handlePageChange("SignUp")}
                      >
                        Sign Up
                      </Link>
                    </motion.div>
                    <motion.div
                      className="login"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Link
                        to="/login"
                        onClick={() => handlePageChange("Login")}
                      >
                        Log in
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavigationTabs;

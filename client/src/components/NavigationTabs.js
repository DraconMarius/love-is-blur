import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/NavigationTabs.css";
import { useState } from "react";
import Auth from "../utils/auth";

/* eslint-disable jsx-a11y/anchor-is-valid */
//navigation tabs component
function NavigationTabs() {
  //setting our state for our navbar burger
  const [isActive, setisActive] = useState(false);

  // const navigate = useNavigate();

  // const handleLogOut = async () => {
  //   navigate('/')
  // };

  // navbar jsx
  return (
    <>
      {/* //if the user is logged in, display the navbar with the links to the home, chat, swipe and profile pages, and a logout button */}
      {Auth.loggedIn() ? (
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a
              //setting our state for our navbar burger to active when clicked
              onClick={() => {
                setisActive(!isActive);
              }}
              role="button"
              //if isActive is true, add the is-active class to the navbar burger to see the navbar menu
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
            //if isActive is true, add the is-active class to the navbar menu to see the navbar menu
            className={`navbar-menu ${isActive ? "is-active" : ""}`}
          >
            <div className="navbar-start">
              {/* //motion.div is a framer motion component that allows us to add animations to our links */}
              <motion.div
                className="nav-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* //link to home page */}
                <Link to="/">Home</Link>
              </motion.div>

              <motion.div
                className="nav-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to="/chat">Chat</Link>
              </motion.div>
              <motion.div
                className="nav-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to="/profile"> edit profile</Link>
              </motion.div>

              <motion.div
                className="nav-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to="/swipe">Swipe</Link>
              </motion.div>
            </div>
            <>
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    <motion.div
                      className="logout"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {/* //logout button directs to homepage and logs user out */}
                      <Link to="/" onClick={Auth.logout}>
                        Logout
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </>
          </div>
        </nav>
      ) : (
        //if the user is not logged in, display the navbar with the links to the home, signup and login pages
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
                <Link to="/">Home</Link>
              </motion.div>
            </div>

            <>
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    <motion.div
                      className="sign-up"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Link to="/signup">Sign Up</Link>
                    </motion.div>
                    <motion.div
                      className="login"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Link to="/login">Log in</Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </>
          </div>
        </nav>
      )}
    </>
  );
}
export default NavigationTabs;

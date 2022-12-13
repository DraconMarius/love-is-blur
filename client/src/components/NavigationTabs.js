import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/NavigationTabs.css';
import { useState } from 'react';
import Auth from '../utils/auth';

/* eslint-disable jsx-a11y/anchor-is-valid */
function NavigationTabs() {
  const [isActive, setisActive] = useState(false);
  return (
    <>
      {Auth.loggedIn() ? (
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a
              onClick={() => {
                setisActive(!isActive);
              }}
              role="button"
              className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
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
            className={`navbar-menu ${isActive ? 'is-active' : ''}`}
          >
            <div className="navbar-start">
              <motion.div
                className="nav-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
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
                <Link to="/profile">profile</Link>
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
                      <Link onClick={Auth.logout}>Logout</Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </>
          </div>
        </nav>
      ) : (
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a
              onClick={() => {
                setisActive(!isActive);
              }}
              role="button"
              className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
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
            className={`navbar-menu ${isActive ? 'is-active' : ''}`}
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

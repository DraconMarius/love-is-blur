import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';
// import logo from "./assets/chris-gibson-high-resolution-logo-color-on-transparent-background.png";
// import "../components/styles/navbar.css";
// Here we are using object destructuring assignment to pluck off our variables from the props object
// We assign them to their own variable names
/* eslint-disable */
function NavigationTabs({ currentPage, handlePageChange }) {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a
          role="button"
          className="navbar-burger"
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

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link
            to="/home"
            onClick={() => handlePageChange('Home')}
            className={
              currentPage !== 'Home' ? 'navbar-item' : 'navbar-item is-info'
            }
          >
            Home
          </Link>
          {Auth.loggedIn() ? (
            <>
              <Link
                to="/chat"
                onClick={() => handlePageChange('Chat')}
                className={
                  currentPage !== 'Chat' ? 'navbar-item' : 'navbar-item is-info'
                }
              >
                Chat
              </Link>

              <Link
                to="/profile"
                onClick={() => handlePageChange('Profile')}
                className={
                  currentPage !== 'Profile'
                    ? 'navbar-item'
                    : 'navbar-item is-info'
                }
              >
                profile
              </Link>

              <Link
                to="/swipe"
                onClick={() => handlePageChange('Swipe')}
                className={
                  currentPage !== 'Swipe'
                    ? 'navbar-item'
                    : 'navbar-item is-info'
                }
              >
                Swipe
              </Link>
            </>
          ) : (
            <>
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    <Link to="/signup" className="button is-primary">
                      <strong>Sign up</strong>
                    </Link>
                    <Link to="/login" className="button is-light">
                      Log in
                    </Link>
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

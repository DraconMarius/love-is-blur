import React from 'react';
// import logo from "./assets/chris-gibson-high-resolution-logo-color-on-transparent-background.png";
// import "../components/styles/navbar.css";
// Here we are using object destructuring assignment to pluck off our variables from the props object
// We assign them to their own variable names
/* eslint-disable */
function NavigationTabs({ currentPage, handlePageChange }) {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a class="navbar-item" href="#">
          Love is Blurr
        </a>
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
        <div className="navbar-end">
          <a
            href="#aboutMe"
            // onClick={() => handlePageChange("AboutMe")}
            // Check to see if the currentPage is `About`, and if so we use the active link className from bootstrap. Otherwise, we set it to a normal nav-link
            className={
              currentPage !== 'AboutMe' ? 'navbar-item' : 'navbar-item is-info'
            }
          >
            About Me
          </a>

          <a
            href="#portfolio"
            // onClick={() => handlePageChange("Portfolio")}
            // Check to see if the currentPage is `Blog`, and if so we use the active link className from bootstrap. Otherwise, we set it to a normal nav-link
            className={
              currentPage !== 'Portfolio'
                ? 'navbar-item'
                : 'navbar-item is-info'
            }
          >
            Portfolio
          </a>

          <a
            href="#contactMe"
            // onClick={() => handlePageChange("ContactMe")}
            // Check to see if the currentPage is `Contact`, and if so we use the active link className from bootstrap. Otherwise, we set it to a normal nav-link
            className={
              currentPage !== 'ContactMe'
                ? 'navbar-item'
                : 'navbar-item is-info'
            }
          >
            Contact Me
          </a>

          <a
            href="#resume"
            // onClick={() => handlePageChange("Resume")}
            // Check to see if the currentPage is `Contact`, and if so we use the active link className from bootstrap. Otherwise, we set it to a normal nav-link
            className={
              currentPage !== 'Resume' ? 'navbar-item' : 'navbar-item is-info'
            }
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}

export default NavigationTabs;

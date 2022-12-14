import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope, faCheck } from "@fortawesome/free-solid-svg-icons";
import Auth from "../utils/auth";
// login page component
const Login = (props) => {
  // set initial form state to empty strings
  const [formState, setFormState] = useState({ email: "", password: "" });
  // useMutation hook to call the login mutation
  const [login, { error, data }] = useMutation(LOGIN);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(formState);
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <div
      className="login-container"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div
        id="login-form"
        className="is-fullwidth-mobile is-halfwidth-tablet is-one-quarter-desktop "
        style={{ textAlign: "center" }}
      >
        <form onSubmit={handleFormSubmit}>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="email"
                placeholder="Email"
                name="email"
                value={formState.email}
                onChange={handleChange}
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <span className="icon is-small is-right">
                <FontAwesomeIcon icon={faCheck} />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="password"
                name="password"
                placeholder="Password"
                value={formState.password}
                onChange={handleChange}
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faLock} />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <motion.button
                className="button is-success"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Login
              </motion.button>
            </p>
            <p>
              Don't have an account? <Link to="/signup">Signup</Link>
            </p>
          </div>
          <div>
            {error && (
              <p className="help is-danger">
                The provided credentials are incorrect
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;

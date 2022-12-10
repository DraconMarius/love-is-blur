import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope, faCheck } from "@fortawesome/free-solid-svg-icons";
import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

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
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="is-fullwidth-mobile is-halfwidth-tablet is-one-quarter-desktop">
        <form onSubmit={handleFormSubmit}>
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input
                class="input"
                type="email"
                placeholder="Email"
                name="email"
                value={formState.email}
                onChange={handleChange}
              />
              <span class="icon is-small is-left">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <span class="icon is-small is-right">
                <FontAwesomeIcon icon={faCheck} />
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input
                class="input"
                type="password"
                name="password"
                placeholder="Password"
                value={formState.password}
                onChange={handleChange}
              />
              <span class="icon is-small is-left">
                <FontAwesomeIcon icon={faLock} />
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control">
              <button class="button is-success">Login</button>
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

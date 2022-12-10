import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../graphql/mutations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faEnvelope,
  faCheck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Auth from "../utils/auth";

const SignUp = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

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
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
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
                type="name"
                placeholder="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faUser} />
              </span>
            </p>
          </div>
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
              <button class="button is-success">signup</button>
            </p>
            <p>
              already have an account? <Link to="/login">Signup</Link>
            </p>
          </div>
          <div>
            {error && (
              <p className="help is-danger">try again, something went wrong</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

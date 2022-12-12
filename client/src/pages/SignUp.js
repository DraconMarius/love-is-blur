import React, { useState, useRef } from "react";
import { Navigate, Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../utils/mutations";
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
    username: "",
    firstname: "",
    email: "",
    password: "",
    bio: "",
  });
  //getting image url
  //using useRefs
  // const [imgURL, setimgURL] = useState("");
  const imgURL = useRef("");


  const [createUser, { error, data }] = useMutation(CREATE_USER);

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
    // console.log(formState);
    try {
      console.log("flag");
      const { data } = await createUser({
        variables: { ...formState, image: imgURL.current },
      });
      console.log(formState);
      console.log(imgURL)
      // console.log(data.createUser.user)
      // console.log(data.createUser.token)
      Auth.login(data.createUser.token);
    } catch (error) {
      console.log(error);
      console.error(error);
    }
    // clear form values
    setFormState({
      username: "",
      firstname: "",
      email: "",
      password: "",
      bio: "",
    });
  };
  const cloudName = "dp9s1u3uv";
  const uploadPreset = "ml_default";
  const myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: cloudName,
      uploadPreset: uploadPreset,
      cropping: true,
      multiple: false,
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        // const urlString = result.info.url
        imgURL.current = result.info.url;
        console.log(result.info.url)
        console.log(imgURL.current)
      }
    }
  );

  const openWidget = (myWidget) => {
    // event.preventDefault();
    myWidget.open();
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="is-fullwidth-mobile is-halfwidth-tablet is-one-quarter-desktop">
        <form onSubmit={handleFormSubmit}>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="username"
                placeholder="username"
                name="username"
                value={formState.username}
                onChange={handleChange}
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faUser} />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="firstname"
                placeholder="firstname"
                name="firstname"
                value={formState.firstname}
                onChange={handleChange}
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faUser} />
              </span>
            </p>
          </div>
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
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label"></label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <textarea
                    name="bio"
                    className="textarea"
                    placeholder="Enter a short bio"
                    value={formState.bio}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="field">
            <p className="control">
              <button className="button is-success">signup</button>
              <button
                className="button is-success"
                onClick={() => openWidget(myWidget)}
                type="button"
              >
                upload Photo
              </button>
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

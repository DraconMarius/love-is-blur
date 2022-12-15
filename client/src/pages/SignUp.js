// import hooks from react
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
//importing motion component from framer motion. {/* //motion.button is a framer motion component that allows us to add animations to our buttons */}
import { motion } from "framer-motion";
import "../styles/signup.css";
//importing usemutation hooks from appplo client so we are able to call our create user mutation
import { useMutation } from "@apollo/client";
//importing mutations from client side utils
import { CREATE_USER } from "../utils/mutations";
//importing fontawesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faEnvelope,
  faCheck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
//import auth from utils for web token
import Auth from "../utils/auth";

//our signup page component
const SignUp = () => {
  //setting our state for our form data to be empty strings
  const [formState, setFormState] = useState({
    username: "",
    firstname: "",
    email: "",
    password: "",
    bio: "",
  });
  //using useref hook so we can acces the image url from the cloudinary widget
  const imgURL = useRef("");
  //using useMutation hook to call our create user mutation
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

    try {
      console.log("flag");
      // execute addUser mutation and pass in variable data from form
      const { data } = await createUser({
        variables: { ...formState, image: imgURL.current },
      });
      console.log(formState);
      console.log(imgURL);

      //create token for user
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
  //cloudinary widget so we can upload images
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
        console.log(result.info.url);
        console.log(imgURL.current);
      }
    }
  );
  //function to open the cloudinary widget
  const openWidget = (myWidget) => {
    // event.preventDefault();
    myWidget.open();
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="is-fullwidth-mobile is-halfwidth-tablet is-one-quarter-desktop">
        {/* need to wrap entire fields in form  and put handleform sumbit here so that all inputted user input is accounted for */}
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
            <div className="field-body">
              <div className="field ">
                <div className="control">
                  <textarea
                    name="bio"
                    className="textarea "
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
              <motion.button
                className="button is-success"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                signup
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                id="upload-widget-button"
                className="button is-success"
                onClick={() => openWidget(myWidget)}
                type="button"
              >
                upload Photo
              </motion.button>
            </p>
          </div>
          <div>
            {/* error message is signup is unsuccessful */}
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

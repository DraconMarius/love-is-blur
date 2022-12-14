// Page to customize your profile/personal information
import React, { useState, formState, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { EDIT_USER, DELETE_USER } from "../utils/mutations";
import { useNavigate} from "react-router-dom";

import Auth from "../utils/auth";

import "../styles/profile.css";

function Profile({ user }) {
  const [formState, setFormState] = useState({
    username: user.username,
    firstname: user.firstname,
    email: user.email,
    bio: user.bio,
  });

  console.log(user);
  //const { update } = useMutation(UPDATE_USER);
  const imgURL = useRef("");
  const [editUser, { error, data }] = useMutation(EDIT_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(formState);
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // console.log(formState);
    try {
      console.log("flag");

      const { data } = await editUser({
        variables: { ...formState, userId: user._id, image: imgURL.current },
      });
      console.log(data);
      console.log("flag");
      console.log(formState);
      console.log(imgURL);
      // console.log(data.createUser.user)
      // console.log(data.createUser.token)
      Auth.login(data.editUser.token);
    } catch (error) {
      console.log(error);
      console.error(error);
    }
    // clear form values
    setFormState({
      username: "",
      firstname: "",
      email: "",
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
        console.log(result.info.url);
        console.log(imgURL.current);
      }
    }
  );

  const openWidget = (myWidget) => {
    // event.preventDefault();
    myWidget.open();
  };
  const navigate = useNavigate();
  const [deleteUser] = useMutation(DELETE_USER);
  const handleDeleteUser = async () => {
    navigate("/");
    try {
      const { deleteData } = await deleteUser({
        variables: { userId: user._id },
      });
      // Handle successful deletion here...
      // For example, you could display the deleteData in your UI:
      console.log(deleteData);
    } catch (deleteError) {
      console.error(deleteError);
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="is-fullwidth-mobile is-halfwidth-tablet is-one-quarter-desktop">
        <figure
          style={{
            margin: "auto",
          }}
          className="image is-128x128"
        >
          <img className="is-rounded" src={user.image} alt={user.firstname} />
        </figure>
        <form onSubmit={handleFormSubmit}>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <span>Username:</span>
              <input
                className="input"
                type="text"
                name="username"
                value={formState.username}
                // defaultValue={user.username}
                onChange={handleChange}
              />
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <span>Firstname:</span>
              <input
                className="input"
                type="firstname"
                name="firstname"
                value={formState.firstname}
                // defaultValue={user.firstname}
                onChange={handleChange}
              />
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <span>Email:</span>
              <input
                className="input"
                type="email"
                name="email"
                value={formState.email}
                // defaultValue={user.email}
                onChange={handleChange}
              />
            </p>
          </div>

          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field ">
                <div className="control">
                  <span>Bio:</span>
                  <textarea
                    name="bio"
                    className="textarea "
                    value={formState.bio}
                    // defaultValue={user.bio}
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
                Save edits
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                id="upload-widget-button"
                className="button is-success"
                onClick={() => openWidget(myWidget)}
                type="button"
              >
                Upload New Photo
              </motion.button>
            </p>
          </div>
          {/* <div>
            {error && (
              <p className="help is-danger">try again, something went wrong</p>
            )}
          </div> */}
        </form>
        <motion.button
          className="button is-danger"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleDeleteUser(user._id) && Auth.logout()}
        >
          Delete me
        </motion.button>
      </div>
    </div>
  );
}

export default Profile;

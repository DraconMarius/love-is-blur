// Page to customize your profile/personal information
//importing hooks from reac
import React, { useState, formState, useRef } from "react";
//importing hooks from appplo client
import { useMutation } from "@apollo/client";
// importing motion component from framer motion. {/* //motion.button is a framer motion component that allows us to add animations to our buttons */}
import { motion } from "framer-motion";
//importing mutations from client side utils
import { EDIT_USER, DELETE_USER } from "../utils/mutations";
//importing usenavigate from react router dom
import { useNavigate } from "react-router-dom";

import Auth from "../utils/auth";

import "../styles/profile.css";

//our profile page component, this componenet is wrapped in the profile container component, whcih is how we have access to the user info.
function Profile({ user }) {
  //setting our state for our form data so that the users info will be displayed in the form
  const [formState, setFormState] = useState({
    username: user.username,
    firstname: user.firstname,
    email: user.email,
    bio: user.bio,
  });

  //using useref hook so we can acces the image url from the cloudinary widget
  const imgURL = useRef("");
  //using useMutation hook to call our edit user mutation
  const [editUser, { error, data }] = useMutation(EDIT_USER);

  //handlechange function to update our form state with the users inputted info from the form
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(formState);
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  //handleformsubmit function to prevent the default behavior of the form, and then call our edit user mutation to change the fields in the database
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("flag");

      const { data } = await editUser({
        variables: { ...formState, userId: user._id, image: imgURL.current },
      });
      console.log(data);
      console.log("flag");
      console.log(formState);
      console.log(imgURL);
      //user has to be logged in to edit their profile and needs a valid token to do so
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
  //cloudinary widget code. this is the code that allows us to upload images to cloudinary and then get the url of the image to store in our database
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
    myWidget.open();
  };
  //using usenavigate hook to navigate to the home page after the user deletes their account
  const navigate = useNavigate();
  //using useMutation hook to call our delete user mutation
  const [deleteUser] = useMutation(DELETE_USER);
  //handledeleteuser function to call our delete user mutation and then navigate to the home page
  const handleDeleteUser = async () => {
    navigate("/");
    try {
      // Call our mutation
      const { deleteData } = await deleteUser({
        variables: { userId: user._id },
      });
      console.log(deleteData);
    } catch (deleteError) {
      console.error(deleteError);
    }
  };
  //jsx for our profile page
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
                //make sure to call the openwidget function when the upload new photo button is clicked
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
          //make sure to call the handledeleteuser function when the delete me button is clicked and also log the user out
          onClick={() => handleDeleteUser(user._id) && Auth.logout()}
        >
          Delete me
        </motion.button>
      </div>
    </div>
  );
}

export default Profile;

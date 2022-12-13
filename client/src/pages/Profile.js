// Page to customize your profile/personal information
import React, { useState, formState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import { QUERY_ME } from '../utils/queries';
import { UPDATE_USER } from '../utils/mutations';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLock,
  faEnvelope,
  faCheck,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import Auth from '../utils/auth';

import '../styles/profile.css';

function Profile({ user }) {
  const [formState, setFormState] = useState({
    username: '',
    firstname: '',
    email: '',
    password: '',
    bio: '',
  });
  console.log(user);
  //const { update } = useMutation(UPDATE_USER);

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
      console.log('flag');
      //   const { data } = await createUser({
      //     variables: { ...formState, image: imgURL.current },
      //   });
      console.log(formState);

      // console.log(data.createUser.user)
      // console.log(data.createUser.token)
    } catch (error) {
      console.log(error);
      console.error(error);
    }
    // clear form values
    setFormState({
      username: '',
      firstname: '',
      email: '',
      password: '',
      bio: '',
    });
  };

  //   const [formState, setFormState] = useState({
  //     firstname: {user.firstname},
  //   })

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="is-fullwidth-mobile is-halfwidth-tablet is-one-quarter-desktop">
        <form onSubmit={handleFormSubmit}>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="text"
                placeholder={user.username}
                name="username"
                value=""
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
                value={user.firstname}
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
                value={user.email}
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
                value={user.password}
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
                    value={user.bio}
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
                type="button"
              >
                upload Photo
              </motion.button>
            </p>
          </div>
          {/* <div>
            {error && (
              <p className="help is-danger">try again, something went wrong</p>
            )}
          </div> */}
        </form>
      </div>
    </div>
  );
}

export default Profile;

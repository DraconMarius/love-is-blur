// // Page to customize your profile/personal information
// import React from 'react';
// import { useMutation, useQuery } from '@apollo/client';
// import { QUERY_ME } from '../utils/queries';
// import { UPDATE_USER } from '../utils/mutations';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faLock,
//   faEnvelope,
//   faCheck,
//   faUser,
// } from '@fortawesome/free-solid-svg-icons';
// import Auth from '../utils/auth';

// import '../styles/profile.css';

// function Profile() {
//   const { data } = useQuery(QUERY_ME);
//   const { update } = useMutation(UPDATE_USER);
//   let user;

//   if (data) {
//     user = data.user;
//   }

//   const [formState, setFormState] = useState({
//     firstname: {user.firstname},
//   })

//   return (
//     <>
//       <div className="profile-container">
//         <div className="field">
//           <label className="label">Name</label>
//           <div className="control">
//             <input className="input" type="text" placeholder="Text input" />
//           </div>
//         </div>

//         <div className="field">
//           <label className="label">Username</label>
//           <div className="control has-icons-left has-icons-right">
//             <input className="input" type="text" placeholder="Text input" />
//             <span className="icon is-small is-left">
//               <i className="fas fa-user"></i>
//             </span>
//             <span className="icon is-small is-right">
//               <i className="fas fa-check"></i>
//             </span>
//           </div>
//         </div>

//         <div className="field">
//           <label className="label">Message</label>
//           <div className="control">
//             <textarea className="textarea" placeholder="Textarea"></textarea>
//           </div>
//         </div>

//         <div className="field is-grouped">
//           <div className="control">
//             <button className="button is-link">Submit</button>
//           </div>
//           <div className="control">
//             <button className="button is-link is-light">Cancel</button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Profile;

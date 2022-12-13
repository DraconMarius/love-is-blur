import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import "../styles/Card.css";
import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';

// const db = [
//   {
//     name: "Richard Hendricks",
//     bio: "hikingwrtgertgwtcrwgt4gcw4rtghxerwthcgertchg3ryhgceryhceryhcehyerycherycherythceryhceryhveryhcryceheryhcryhc",
//   },
//   {
//     name: "Erlich Bachman",
//     bio: "bakingechyeryhceryhceryhcenbtycnrtyncerycerybcnerycnerychbrycbherythcerychery",
//   },
//   {
//     name: "Monica Hall",
//     bio: "runningcehyeryhceryhceryhcryhvtyncnrtyxnrtcyncrtycnrtyncrtyncrtynrtynctycn",
//   },
//   {
//     name: "Jared Dunn",
//     bio: "bballcrtyncrtycnrtycndrtxnyrtcyncrthncrtyncrtnctyncrtynctycrtycrtycnty",
//   },
//   {
//     name: "Dinesh Chugtai",
//     bio: "bikingcrtyncrtynctyrncrtyncrtyncrtyrnjvbwelrjgbw;eirvbw;jknw;eorvnwoernv;oernv;orkw;erknvworknvwoirnv;w4rnvwo4inrvwokernvowiernvwoirvn;oweinv;wok4enrv",
//   },
// ];

//**now passing db info from wrapper Match. App.js will display match, load
//the db data before loading the swipe.js

export default function Card({ rawdb }) {
  const [updateUser, { error, data }] = useMutation(UPDATE_USER);


  //get user profile
  const loggedInUser = Auth.getProfile();
  console.log(loggedInUser);
  console.log(rawdb);

  // filter all user that is not our current user (working)
  const filteredDB = rawdb.filter(user => user._id !== loggedInUser.data._id);

  console.log(filteredDB);

  //smae line of code as above but changed name to db to connec to card render
  // const db = rawdb.filter(user => user._id !== loggedInUser.data._id);
  // console.log(db)

  const db = filteredDB.filter(user => !user.likedBy.includes(loggedInUser.data._id));

  console.log(db);


  //below code is not actually filtering users that we already liked
  // filter all users that is not already liked by us
  // const db = filteredDB.filter(user => {
  //   const r = user.likedBy.every((likedByUserId) => likedByUserId !== loggedInUser.data._id);

  //   return r
  // });






  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir, ID) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
      console.log(dir);
      if (dir === "right") {
        console.log("ID: ", ID)
        console.log("LoggedIn ID: ", loggedInUser.data._id)
        const { data } = await updateUser({
          variables: { userId: ID, likedBy: loggedInUser.data._id }
        })
        console.log(data);
      }
    }
  };

  return (
    <div className="mainComponent">
      <link
        href="https://fonts.googleapis.com/css?family=Damion&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
        rel="stylesheet"
      />

      <div className="cardContainer">
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={character.firstname}
            onSwipe={(dir) => swiped(dir, character.firstname, index)}
            onCardLeftScreen={() => outOfFrame(character.firstname, index)}
          >
            <div className="card">
              <h3>{character.firstname}</h3>
              <p>{character.bio}</p>
              <div className="buttons">
                <button
                  style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
                  onClick={() => swipe("left")}
                >
                  Swipe left!
                </button>

                <button
                  style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
                  onClick={() => swipe("right", character._id)}
                >
                  Swipe right!
                </button>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>

      {lastDirection ? (
        <h2 key={lastDirection} className="infoText">
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className="infoText">Start swiping and find your match</h2>
      )}
    </div>
  );
}

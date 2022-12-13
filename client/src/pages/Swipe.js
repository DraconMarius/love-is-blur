import React, { useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import TinderCard from "react-tinder-card";
import "../styles/Card.css";
import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_USER, CREATE_MATCH } from '../utils/mutations';
import Auth from '../utils/auth';



//**now passing db info from wrapper Match. App.js will display match, load
//the db data before loading the swipe.js

export default function Card({ rawdb }) {
  const [updateUser, { error1, data1 }] = useMutation(UPDATE_USER);
  const [createMatch, { error2, data2 }] = useMutation(CREATE_MATCH);


  //get user profile
  const loggedInUser = Auth.getProfile();
  console.log(loggedInUser);
  console.log(rawdb);

  //getting our own data
  const me = rawdb.filter(user => user._id == loggedInUser.data._id);
  console.log(me[0].likedBy);

  // filter all user that is not our current user (working)
  const filteredDB = rawdb.filter(user => user._id !== loggedInUser.data._id);

  console.log(filteredDB);
  //filtering all users that we did not liked YET
  const db = filteredDB.filter(user => !user.likedBy.includes(loggedInUser.data._id));

  console.log(db);


  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // const [matched, setMatched] = useState(false);
  // console.log(matched)
  const isMatched = useRef(false);
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
        if (me[0].likedBy.includes(ID)) {
          console.log(me[0]._id)
          console.log(ID)
          const { data } = await createMatch({
            variables: { user1: me[0]._id, user2: ID }
          })
          console.log(data);
          if (data) {
            isMatched.current = true
            console.log(isMatched.current);
          }
        }
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
      {(isMatched.current === true) ? <div id="modal" className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head custom-modal-header"></header>
          <section className="modal-card-body custom-modal-body">
            <p>YOU GOT A MATCH</p>
            <div className="level-right">
              <Link to="/chat">
                <button id="ExpOKBtn" className="button ok-btn custom-btn">OK</button>
              </Link>
            </div>
          </section>
        </div>
      </div> : <></>}
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

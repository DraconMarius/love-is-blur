//import hooks from react
import React, { useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
//import tinder card componenet from react tinder card
import TinderCard from "react-tinder-card";
import "../styles/Card.css";
import { useQuery, useMutation } from "@apollo/client";
//importing our mutations  from utils
import { UPDATE_USER, CREATE_MATCH } from "../utils/mutations";
import Auth from "../utils/auth";

//**now passing db info from wrapper Match. App.js will display match, load
//the db data before loading the swipe.js
//card component
export default function Card({ rawdb }) {
  //using useMutation hook to call our update user mutation
  const [updateUser, { error1, data1 }] = useMutation(UPDATE_USER);
  //using useMutation hook to call our create match mutation
  const [createMatch, { error2, data2 }] = useMutation(CREATE_MATCH);

  //get user profile
  const loggedInUser = Auth.getProfile();
  console.log(loggedInUser);
  console.log(rawdb);

  //getting our own data
  const me = rawdb.filter((user) => user._id == loggedInUser.data._id);
  console.log(me[0].likedBy);

  // filter all user that is not our current user (working)
  const filteredDB = rawdb.filter((user) => user._id !== loggedInUser.data._id);

  console.log(filteredDB);
  //filtering all users that we did not liked YET
  const db = filteredDB.filter(
    (user) => !user.likedBy.includes(loggedInUser.data._id)
  );

  console.log(db);

  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // const [matched, setMatched] = useState(false);
  // console.log(matched)
  const isMatched = useRef(false);
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);
  // usememo hook to create a ref for each card
  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );
  //function to update current index
  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  // can swipe if there are cards left
  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  // outofframe function to handle the case in which go back is pressed before card goes outOfFrame
  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };
  //function to handle the case in which the user clicks on the keep swiping button in the match modal
  const removeActiveClass = () => {
    const modal = document.querySelector("#modal");
    modal.classList.remove("is-active");
  };

  //swipe function that will be called when the user clicks on the swipe buttons
  const swipe = async (dir, ID) => {
    // if there are cards left to swipe and the user is not swiping the same card twice then swipe the card
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
      console.log(dir);
      //if the user swipes right, update the user's likedBy array to show the id of the user that liked them
      if (dir === "right") {
        console.log("ID: ", ID);
        console.log("LoggedIn ID: ", loggedInUser.data._id);
        const { data } = await updateUser({
          variables: { userId: ID, likedBy: loggedInUser.data._id },
        });
        //if the user swipes right and the user that they liked  also liked them back, create a match
        if (me[0].likedBy.includes(ID)) {
          console.log(me[0]._id);
          console.log(ID);
          const { data } = await createMatch({
            variables: { user1: me[0]._id, user2: ID },
          });
          console.log(data);
          //if the match data exists (matche created), then set the matched state to true
          if (data) {
            isMatched.current = true;
            console.log(isMatched.current);
          }
        }
      }
    }
  };

  //jsx for the card component
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
      {/* //if the user has a match, display the modal */}
      {isMatched.current === true ? (
        <div id="modal" className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head custom-modal-header"></header>
            <section
              id="modal-match"
              className="modal-card-body custom-modal-body"
            >
              <p>YOU GOT A MATCH</p>
              <div className="level-right">
                {/* //link to the chat page */}
                <Link to="/chat">
                  <button id="ExpOKBtn" className="button ok-btn custom-btn">
                    MESSAGE THEM
                  </button>
                </Link>
                <Link to="/swipe">
                  <button
                    onClick={() => removeActiveClass()}
                    className="button ok-btn custom-btn"
                  >
                    KEEP SWIPING
                  </button>
                </Link>
              </div>
            </section>
          </div>
          {/* //if the user has no match, display no modal and dislpay the cards still */}
        </div>
      ) : (
        <></>
      )}
      <div className="cardContainer">
        {db.map((character, index) => (
          <TinderCard
            //ref for each card so that we can acess the cards info
            ref={childRefs[index]}
            className="swipe"
            //key for each card
            key={character.firstname}
            //when card swiped, call the swiped function and pass in the direction, name of the card, and the index of the card
            onSwipe={(dir) => swiped(dir, character.firstname, index)}
            //when card goes out of frame, call the outOfFrame function and pass in the name of the card and the index of the card
            onCardLeftScreen={() => outOfFrame(character.firstname, index)}
          >
            <div className="card">
              <h3>{character.firstname}</h3>
              <p>{character.bio}</p>
              <div className="buttons">
                <button
                  //if the user can't swipe, make the button grey
                  style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
                  //when the user clicks on the button, call the swipe function and pass in left direction and the id of the user
                  onClick={() => swipe("left")}
                >
                  Swipe left!
                </button>

                <button
                  //
                  style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
                  //when the user clicks on the button, call the swipe function and pass in right direction and the id of the user
                  onClick={() => swipe("right", character._id)}
                >
                  Swipe right!
                </button>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
      {/* //if the user has swiped, display the direction they swiped, otherwise display the start swiping text */}
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

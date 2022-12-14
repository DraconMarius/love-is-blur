import React from "react";
import "../styles/Card.css";
//import useQuery from apollo client to retrieve the user data
import { useQuery } from "@apollo/client";
//importing our query me from utils
import { QUERY_ME } from "../utils/queries";
//importing our profile component
import Profile from "./Profile";

//
export default function Match() {
  //using useQuery hook to retrieve the logged in user's data
  const { loading, error, data } = useQuery(QUERY_ME);
  //if there is an error/, display undefined rather than crashing the app
  const user = data?.me;
  console.log(user);
  console.log(data);

  //wrapping our swipable card:

  //if loading, display loading page //otherwise the query is retrieve, pass it down to
  //swip so it can use as initial state
  //TODO: maybe a modal would be good for the loading

  return <>{loading ? <div>Loading...</div> : <Profile user={user} />}</>;
}

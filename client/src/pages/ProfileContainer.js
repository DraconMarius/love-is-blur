import React from "react";
import "../styles/Card.css";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

import Profile from "./Profile";

export default function Match() {
  const { loading, error, data } = useQuery(QUERY_ME);
  const user = data?.me;
  console.log(user);
  console.log(data);

  //wrapping our swipable card:

  //if loading, display loading page //otherwise the query is retrieve, pass it down to
  //swip so it can use as initial state
  //TODO: maybe a modal would be good for the loading

  return <>{loading ? <div>Loading...</div> : <Profile user={user} />}</>;
}

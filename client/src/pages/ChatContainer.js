import React from 'react';
import { useQuery } from "@apollo/client";
import { ALL_USER, GET_ALL_MATCH } from "../utils/queries";

import Chat from "./Chat";

function ChatContainer() {

  const { loading: UserLoading, data: userData } = useQuery(ALL_USER);
  const users = userData?.users || [];
  const { loading: MatchLoading, data: matchesData } = useQuery(GET_ALL_MATCH);
  const matches = matchesData?.matches || [];
  console.log(matchesData)

  return (<>{(UserLoading || MatchLoading) ? (<div>Loading...</div>)
    : (<Chat users={users} matches={matches} />)}</>
  )
}

export default ChatContainer
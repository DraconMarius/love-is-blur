import React from 'react';
import { useQuery } from "@apollo/client";
import { ALL_USER } from "../utils/queries";

import Chat from "./Chat";

function ChatContainer() {

    const { loading, error, data } = useQuery(ALL_USER);
    const users = data?.users || [];

  return ( <>{(loading) ? (<div>Loading...</div>) 
            : (<Chat users={users} />)}</>
  )
}

export default ChatContainer
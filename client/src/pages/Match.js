import React from "react";
import "../styles/Card.css";
import { useQuery } from "@apollo/client";
import { ALL_USER, QUERY_ME } from '../utils/queries';
import Card from './Swipe'

export default function Match() {
    const { loading, error, data } = useQuery(ALL_USER);
    const rawdb = data?.users || [];

    // const { loading1, error1, data1 } = useQuery(QUERY_ME);
    // // const me = data1.me
    // console.log(data1)


    //wrapping our swipable card:

    //if loading, display loading page //otherwise the query is retrieve, pass it down to
    //swip so it can use as initial state
    //TODO: maybe a modal would be good for the loading 


    return (
        <>
            {(loading) ? (<div>Loading...</div>)
                : (<Card rawdb={rawdb} />)}
        </>
    )



}
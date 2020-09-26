import React, {useEffect, useState} from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

import axios from "axios"


export default function Comments() {
  const [tweets, setTweets] = useState(null);

  useEffect(() => {
    async function fetchTweets(){
        const url = "https://twitter.com/Interior/status/463440424141459456"
        const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://publish.twitter.com/oembed?url=${url}`)
    
        //console.log(response)
        setTweets(response.data.html)
        //console.log(tweets)
    }

    fetchTweets()    
  }, [])
  
  //console.log(tweets)

   
  return (
    <React.Fragment>
    <div style={{display: "flex", justifyContent: "space-evenly", flexDirection: "row", flexWrap: "wrap"}}>
        <TwitterTweetEmbed tweetId={'463440424141459456'}/>
        <TwitterTweetEmbed tweetId={'463440424141459456'}/>
    </div>

    </React.Fragment>
  );
}
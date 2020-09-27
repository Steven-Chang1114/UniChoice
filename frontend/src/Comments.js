import React, {useEffect, useState} from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import Title from "./Title"
import Divider from '@material-ui/core/Divider';

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
      <Title>
        Public mood
      </Title>
    <div style={{display: "flex", justifyContent: "space-evenly", flexDirection: "row", flexWrap: "wrap"}}>
      <div style={{flex: "6 0 33%"}}>
        <TwitterTweetEmbed tweetId={'463440424141459456'}/>
      </div>
      <div style={{flex: "6 0 33%"}}>
        <TwitterTweetEmbed tweetId={'463440424141459456'}/>
      </div>
    </div>

    <Divider variant="middle" style={{margin: "30px 0"}}/>

    <Title>
        Public mood
      </Title>
    <div style={{display: "flex", justifyContent: "space-evenly", flexDirection: "row", flexWrap: "wrap"}}>
      <div style={{flex: "6 0 33%"}}>
        <TwitterTweetEmbed tweetId={'463440424141459456'}/>
      </div>
      <div style={{flex: "6 0 33%"}}>
        <TwitterTweetEmbed tweetId={'463440424141459456'}/>
      </div>
    </div>

    <Divider variant="middle" style={{margin: "30px 0"}}/>

    <Title>
        Public mood
    </Title>
    <div style={{display: "flex", justifyContent: "space-evenly", flexDirection: "row", flexWrap: "wrap"}}>
      <div style={{flex: "6 0 33%"}}>
        <TwitterTweetEmbed tweetId={'463440424141459456'}/>
      </div>
      <div style={{flex: "6 0 33%"}}>
        <TwitterTweetEmbed tweetId={'463440424141459456'}/>
      </div>
    </div>

    </React.Fragment>
  );
}
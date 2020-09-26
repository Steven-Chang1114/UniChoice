import React, {useEffect, useState} from 'react';

import axios from "axios"

// Generate Order Data
function createData(id, date, name, comment) {
  return { id, date, name, comment };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'This is nice'),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'This is nidgdgdgrgdgce'),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'This is nsfsfsfseesice'),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'This is nifsefsfsfsefsece'),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'This is nsfsfsfsfsfesfice'),
];


export default function Comments() {
  const [tweets, setTweets] = useState(null);

  useEffect(() => {
    // code to run on component mount
    async function fetchTweets(){
        const url = "https://twitter.com/Interior/status/463440424141459456"
        const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://publish.twitter.com/oembed?url=${url}`)

        console.log(response.data)
        setTweets(response.data.html)
        console.log(tweets)
        console.log("RUN!!!")
    }

    fetchTweets();
   },[])

   console.log(tweets)
  return (
    <React.Fragment>
    <div style={{display: "flex", justifyContent: "space-around", flexDirection: "row", flexWrap: "wrap"}}>
    <blockquote class="twitter-tweet"><p lang="en" dir="ltr">Sunsets don&#39;t get much better than this one over <a href="https://twitter.com/GrandTetonNPS?ref_src=twsrc%5Etfw">@GrandTetonNPS</a>. <a href="https://twitter.com/hashtag/nature?src=hash&amp;ref_src=twsrc%5Etfw">#nature</a> <a href="https://twitter.com/hashtag/sunset?src=hash&amp;ref_src=twsrc%5Etfw">#sunset</a> <a href="http://t.co/YuKy2rcjyU">pic.twitter.com/YuKy2rcjyU</a></p>&mdash; US Department of the Interior (@Interior) <a href="https://twitter.com/Interior/status/463440424141459456?ref_src=twsrc%5Etfw">May 5, 2014</a></blockquote>
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Sunsets don&#39;t get much better than this one over <a href="https://twitter.com/GrandTetonNPS?ref_src=twsrc%5Etfw">@GrandTetonNPS</a>. <a href="https://twitter.com/hashtag/nature?src=hash&amp;ref_src=twsrc%5Etfw">#nature</a> <a href="https://twitter.com/hashtag/sunset?src=hash&amp;ref_src=twsrc%5Etfw">#sunset</a> <a href="http://t.co/YuKy2rcjyU">pic.twitter.com/YuKy2rcjyU</a></p>&mdash; US Department of the Interior (@Interior) <a href="https://twitter.com/Interior/status/463440424141459456?ref_src=twsrc%5Etfw">May 5, 2014</a></blockquote>
    </div>

    </React.Fragment>
  );
}
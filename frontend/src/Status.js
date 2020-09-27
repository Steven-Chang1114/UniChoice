import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import Divider from '@material-ui/core/Divider';
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

const GreenTextTypography = withStyles({
    root: {
      color: "#64DD17",
      fontSize: "22px"
    }
  })(Typography);


 

export default function Status(props) {
  const classes = useStyles();

  useEffect(() => {
    // after click "Analysis"
   async function submitHandler (){
    // this.setState({progressBar: true});
    // this.setState({submitted: false});
    var positive = 0
    var negative = 0
    var neutral = 0

    // console.log(props.name) // works

    try {        
      axios.get('http://localhost:8000/analyzehashtag', {
          params: {
              text: props.name
          }
      }).then(function(response) {
          negative = response.data.negative
          positive = response.data.positive
          neutral = response.data.neutral
          // self.setState({submitted: true});
          // self.setState({progressBar: false});
          // self.setState({series: [negative, positive, neutral]});

          // TODO: handle the output
          console.log('=============================== response:', response, " ============================")
          console.log('=============================== negative:', negative, " ============================")
          console.log('=============================== neutral:', neutral, " ============================")
          console.log('=============================== positive:', positive, " ============================")
      });
      } catch(e) {
        console.log(e);
      }

    try {        
      axios.get('https://api.twitter.com/1.1/account/verify_credentials.json', {
          params: {
          }
      }).then(function(response) {
          console.log('=============================== response:', response, " ============================")
      });
      } catch(e) {
        console.log(e);
      }
    
    // try {        
    // var url = "https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=" + props.name + "&limit=1&format=json"
    //   axios.get(url).then(function(response) {
    //       self.setState({hashtag_desc: response.data[2][0]});
    //   });
    //   } catch(e) {
    //     console.log(e);
    //   }
    
    // try {        
    //   axios.get('http://localhost:8000/gettweets', {
    //       params: {
    //           text: props.name
    //       }
    //   }).then(function(response) {
    //       self.setState({tweets: response.data.results});
    //   });
    //   } catch(e) {
    //     console.log(e);
    //   }

    }

    submitHandler();

  })



  return (
    <React.Fragment>
      <Title>{props.name}</Title>
      <Typography component="p" variant="h5">
        Status: Good
      </Typography>
      <Divider style={{margin: "15px 0"}}/>

      <Typography color="textSecondary" className={classes.depositContext} variant="h6">
        Mood: Negative <br/>
        <ArrowDropUpIcon style={{margin: "4px 0", float: "left", color: "64DD17"}}/> 
        <Typography component={'span'} variant={'body2'} style={{display: "inline", fontSize: "20px"}}><GreenTextTypography>16</GreenTextTypography></Typography>
      </Typography>

      <Typography color="textSecondary" className={classes.depositContext} variant="h6">
        Health: Negative <br/>
        <ArrowDropDownIcon style={{margin: "4px 0", float: "left"}} color="secondary"/> 
                <Typography  style={{display: "inline", fontSize: "20px"}} color="secondary">14</Typography>
      </Typography>
    </React.Fragment>
  );
}
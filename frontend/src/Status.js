import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import Divider from '@material-ui/core/Divider';
import { withStyles } from "@material-ui/core/styles";

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { green } from '@material-ui/core/colors';

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
        <Typography variant="h6" style={{display: "inline"}}><GreenTextTypography>16</GreenTextTypography></Typography>
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext} variant="h6">
        Health: Negative <br/>
        <ArrowDropDownIcon style={{margin: "4px 0", float: "left"}} color="secondary"/> 
        <Typography variant="h6" style={{display: "inline"}} color="secondary">14</Typography>
      </Typography>
    </React.Fragment>
  );
}
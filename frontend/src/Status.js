import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import Divider from '@material-ui/core/Divider';

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Status(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>{props.name}</Title>
      <Typography component="p" variant="h4">
        Status: Good
      </Typography>
      <Divider style={{margin: "15px 0"}}/>
      <Typography color="textSecondary" className={classes.depositContext} variant="h5">
        Mood: Negative <ArrowDropUpIcon /> 14
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext} variant="h5">
        Health: Negative <ArrowDropDownIcon /> 14
      </Typography>
    </React.Fragment>
  );
}
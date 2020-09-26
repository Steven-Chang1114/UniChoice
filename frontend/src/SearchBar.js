import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      width: '100%',
    },
  main: {
    textAlign: "center",
    marginLeft: "21.5vw",
    marginRight: "21.5vw",
    marginTop: "20.5vh",
  }
  },
}));

export default function SearchBar() {
  const classes = useStyles();

  return (
    <div className ={classes.main}>
      <h3>University search</h3>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="outlined-basic" label="How's the COVID protection done by" variant="outlined" />
      </form>
    </div>

  );
}
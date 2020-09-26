import React from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      width: '100%',
    },
  },
  text: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
}));

const MyComponent = styled('div')({
  margin: "20.5vh 0",
});

export default function SearchBar() {
  const classes = useStyles();

  return (
    <MyComponent>
      <form className={classes.root} noValidate autoComplete="off">
        <Typography variant="h2" align="center" gutterBottom>
          University Search
        </Typography>
        <TextField id="outlined-basic" label="How's the COVID protection done by" variant="outlined" />
      </form>
    </MyComponent>

  );
}
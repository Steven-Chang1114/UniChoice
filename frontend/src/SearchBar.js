import React from 'react';
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    '& > *': {
      width: '100%',
    },
  }
};

const MyComponent = styled('div')({
  margin: "20.5vh 0",
});

@withStyles(styles)
class SearchBar extends React.Component {

  render(){
    return (
      <MyComponent>
        <form className={this.props.classes.root} noValidate autoComplete="off" onSubmit={e => console.log("submit")}>
          <Typography variant="h2" align="center" gutterBottom>
            University Search
          </Typography>
          <TextField id="outlined-basic" label="How's the COVID protection done by" variant="outlined" />
        </form>
      </MyComponent>
  
    );
  }
  
}


export default SearchBar;
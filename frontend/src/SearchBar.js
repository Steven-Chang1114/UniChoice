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
  onSubmitHandler = (e) => {
    e.preventDefault();
    //Add autoComplete
    console.log("SUbmit");
    this.props.onChangeValue();
  }

  onInputChange = (e) => {
    console.log(e.target.value)
  }

  render(){
    return (
      <MyComponent>
        <form className={this.props.classes.root} noValidate autoComplete="off" onSubmit={this.onSubmitHandler}>
          <Typography variant="h2" align="center" gutterBottom>
            University Search
          </Typography>
          <TextField onChange={this.onInputChange} id="outlined-basic" label="How's the COVID protection done by" variant="outlined" />
        </form>
      </MyComponent>
  
    );
  }
  
}


export default SearchBar;
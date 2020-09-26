import React from 'react';
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
class SearchBar extends React.PureComponent {
  state = {
    term: null,
    collegeData: [],
    
  }

  componentDidMount = () => {
    let json = require("./data/data.json")
    let object = JSON.parse(JSON.stringify(json))
    this.setState({collegeData: object.filter(obj => obj.alpha_two_code === this.props.country.code)})
    //console.log(object)
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
    //Add autoComplete
    //console.log(e.target.value);
    this.props.onChangeValue(this.state.term);
  }

  onInputChange = (event, value) => {
    this.setState({
      term: value
    }, () => {
      //Process the name
    });
  }
  //<TextField onChange={this.onInputChange} id="outlined-basic" label="How's the COVID protection done by" variant="outlined" />

  render(){
    return (
      <MyComponent>
        <form className={this.props.classes.root} noValidate autoComplete="off" onSubmit={this.onSubmitHandler}>
          <Typography variant="h2" align="center" gutterBottom>
            University Search ({this.props.country.label})
          </Typography>
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            onChange={this.onInputChange}
            options={this.state.collegeData.map((option) => option.name)}
            renderInput={(params) => (
          <div>
          <TextField
            {...params}
            label="How's the COVID protection done by"
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: 'search' }}
              />
          </div>
          
            )}
          />
         
        </form>
      </MyComponent>
  
    );
  }
  
}


export default SearchBar;
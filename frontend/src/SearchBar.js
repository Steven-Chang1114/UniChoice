import React from 'react';
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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
  state = {
    term: null,
    collegeData: [], 
    allData: JSON.parse(JSON.stringify(require("./data/data.json")))
  }

  componentDidMount = () => {
    this.setState({collegeData: this.state.allData.filter(obj => obj.alpha_two_code === this.props.country.code)})
    //console.log(object)
  }

  componentDidUpdate = () => {
    // let json = require("./data/data.json")
    // let object = JSON.parse(JSON.stringify(json)
    let newData = this.state.allData.filter(obj => obj.alpha_two_code === this.props.country.code)
    
    if(newData.length !== this.state.collegeData.length) {
      //console.log(newData)
      this.setState({collegeData: newData})
    }else{
      //console.log(111)
    }
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
            options={this.state.collegeData
                      .filter(el => el.alpha_two_code === this.props.country.code)
                      .map((option) => option.name)}
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
          <Grid container direction="row" justify="center" alignItems="center">
            <Button variant="outlined" color="primary" type="submit">
              Search
            </Button>
          </Grid>
         
        </form>
      </MyComponent>
  
    );
  }
  
}


export default SearchBar;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import { TabContext } from '@material-ui/lab';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { Container } from '@material-ui/core';

import SearchBar from "./SearchBar"
import DropDown from "./DropDown"
import DashBoard from "./Dashboard"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function HeadNav() {
  const classes = useStyles();
  const [value, setValue] = React.useState('1');
  const [searchTerm, setSearchTerm] = React.useState(null);
  const [country, setCountry] = React.useState({
    label: "United States",
    code: "US"
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // after press SEARCH in search bar (i.e search page), set value to 2
  // when value = 2, render result
  const onChangeValue = (term) => {
    setValue("2");
    setSearchTerm(term);
  }

  const changeCountry = ({label, code}) => {
    setCountry({
      label,
      code
    })

  }

  // && data.indexOf(searchTerm) !== -1

  // Dashboard (result page) --> status
  const renderResult = () => {
    const data = JSON.parse(JSON.stringify(require("./data/data.json"))).filter(obj => obj.name === searchTerm)
    
    if(searchTerm !== null){
      return <DashBoard searchTerm = {data}/>
    }else{
      return <h1>No access, please enter the valid University/College name :)</h1>
    }
  }

  return (
    <div className={classes.root}>
      <TabContext value={value}>
        <AppBar position="static">
          <TabList onChange={handleChange} aria-label="simple tabs example">
            <DropDown justify="flex-end" changeCountry={changeCountry}/>
            <Tab label="Main" value="1" />
            <Tab label="Result" value="2" />
          </TabList>
        </AppBar>

        <Container maxWidth="md">
            <TabPanel value="1">
                <SearchBar country={country} onChangeValue={onChangeValue}/>
            </TabPanel>
        </Container>

        <Container maxWidth="xl">
            <TabPanel value="2">
                {renderResult()}
            </TabPanel>
        </Container>
        
      </TabContext>
    </div>
  );
}
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
  const [value, setValue] = React.useState('2');
  const [searchTerm, setSearchTerm] = React.useState(null);
  const [country, setCountry] = React.useState({
    label: "United States",
    code: "US"
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  // const renderResult = () => {
  //   const data = JSON.parse(JSON.stringify(require("./data/data.json"))).filter(obj => obj.alpha_two_code === country.code).map(el => el.name)
    
  //   if(searchTerm !== null && data.indexOf(searchTerm) !== -1){
  //     return <DashBoard searchTerm = {searchTerm}/>
  //   }else{
  //     return <h1>No access, please enter the valid University/College name :)</h1>
  //   }
  // }

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
              <DashBoard searchTerm = "Harvard University"/>
            </TabPanel>
        </Container>
        
      </TabContext>
    </div>
  );
}
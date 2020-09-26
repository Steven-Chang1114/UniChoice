import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import { TabContext } from '@material-ui/lab';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { Container } from '@material-ui/core';

import SearchBar from "./SearchBar"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function HeadNav() {
  const classes = useStyles();
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onChangeValue = () => {
    setValue("2");
  }

  return (
    <div className={classes.root}>
      <TabContext value={value}>
        <AppBar position="static">
          <TabList onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Main" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </AppBar>

        <Container maxWidth="md">
            <TabPanel value="1">
                <SearchBar onChangeValue={onChangeValue}/>
            </TabPanel>
            <TabPanel value="2">
                Item Two
            </TabPanel>
            <TabPanel value="3">
                Item Three
            </TabPanel>
        </Container>

      </TabContext>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Status from './Status';
import Comments from './Comments';
import Charts from './Charts';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Title from './Title';
import clsx from 'clsx';

import axios from "axios"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  }
}));

const theme = createMuiTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};


export default function ImageAvatars(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [avatar, setAvatar] = useState(null)

  useEffect(() => {
    console.log(props.searchTerm[0].web_pages[0])
    // code to run on component mount
    async function fetchAvatar(){
        const response = await axios.get('https://api.cognitive.microsoft.com/bing/v7.0/images/search', {
            headers: {
              'Ocp-Apim-Subscription-Key': 'cc51064584a144658387dca84fe1b8e0'
            },
            params: {
              count: 10,
              mkt: 'en-US',
              q: props.searchTerm[0].name
            }
          })

        //console.log(response.data.value[0].contentUrl)
        const url = response.data.value[0].contentUrl;
        setAvatar(url);
    }
    
    fetchAvatar()

  }, [])

  return (
    <div className={classes.root}>
        
        <Container maxWidth="lg" className={classes.container}>

          <Grid container spacing={4}>
            {/* Chart */}
            <Grid item xs={6} md={2} lg={2} className={classes.container}>
                <Avatar alt="Logo" src={avatar} className={classes.large}/>
                <Title><a href={props.searchTerm[0].web_pages[0]}>{props.searchTerm[0].name}</a></Title>      
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Status name={props.searchTerm[0].name}/>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={7}>
              <Paper className={fixedHeightPaper}>
                <Charts />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12}>
                <Comments />
            </Grid>
            {/* Recent Orders */}
          </Grid>
        </Container>
      
    </div>
  );

}
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles({
    root: {
      width: 500,
    },
  });

function BottomNav() {
    const classes = useStyles();
    const [value, setValue] = useState(null);

    return (
        <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
            setValue(newValue);
        }}
        showLabels
        className={classes.root}
        >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>
    );
}

export default BottomNav;
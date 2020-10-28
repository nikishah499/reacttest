import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Drawer,
    AppBar,
    Toolbar,
    List,
    CssBaseline,
    Typography,
    Divider,
    IconButton
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import AssignmentIndRoundedIcon from '@material-ui/icons/AssignmentIndRounded';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { logOutAction } from '../../redux/actions/authAction';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(1),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    logoutButton: {
        position: 'absolute',
        right: 0
    }
}));

const Menubar = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLinkClick = (event, path) => {
        event.preventDefault();
        setOpen(false);
        props.goToPath(path);
    }
    return (
      <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position='fixed'
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
          >
              <Toolbar>
                  <IconButton
                    color='inherit'
                    aria-label='open drawer'
                    onClick={handleDrawerOpen}
                    edge='start'
                    className={clsx(classes.menuButton, open && classes.hide)}
                  >
                      <MenuIcon />
                  </IconButton>
                  <Typography component='h1' variant='h6' color='inherit' noWrap className={classes.title}>
                      React app
                  </Typography>
                  <IconButton color='inherit' className={classes.logoutButton} onClick={props.logOutAction}>
                      <ExitToAppOutlinedIcon />
                  </IconButton>
              </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant='persistent'
            anchor='left'
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
          >
              <div className={classes.drawerHeader}>
                  <IconButton onClick={handleDrawerClose}>
                      {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                  </IconButton>
              </div>
              <Divider />
              <List>
                  <ListItem button key='home' onClick={(e) => {handleLinkClick(e, '/')}}>
                      <ListItemIcon><HomeRoundedIcon color='action' /></ListItemIcon>
                      <ListItemText primary='Home' />
                  </ListItem>
                  <ListItem button key='categories' onClick={(e) => {handleLinkClick(e, '/categories')}}>
                      <ListItemIcon><LocalOfferRoundedIcon color='action' /></ListItemIcon>
                      <ListItemText primary='Categories' />
                  </ListItem>
                  <ListItem button key='favorites' onClick={(e) => {handleLinkClick(e, '/favorites')}}>
                      <ListItemIcon><FavoriteRoundedIcon color='action' /></ListItemIcon>
                      <ListItemText primary='Favorites' />
                  </ListItem>
                  <ListItem button key='profile' onClick={(e) => {handleLinkClick(e, '/profile')}}>
                      <ListItemIcon><AssignmentIndRoundedIcon color='action' /></ListItemIcon>
                      <ListItemText primary='Profile' />
                  </ListItem>
              </List>
          </Drawer>
          <main
            className={clsx(classes.content, {
                [classes.contentShift]: open,
            })}
          >
              <div className={classes.drawerHeader} />
              {props.children}
          </main>
      </div>
    );
};

const mapDispatchToProps = dispatch => bindActionCreators({
    logOutAction,
    goToPath: (path) => push(path)
}, dispatch);

export default connect(null, mapDispatchToProps)(Menubar);

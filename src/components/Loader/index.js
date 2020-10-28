import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    backdrop: {
        zIndex: 999,
        color: '#fff'
    }
}));

const Loader = (props) => {
    const {isLoading} = props;
    const classes = useStyles();
    return (
        <Backdrop open={isLoading} className={classes.backdrop}>
            <CircularProgress color='inherit'/>
        </Backdrop>
    );
};

export default Loader;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { hidePopupAction } from '../../redux/actions/popupActions';

const useStyles = makeStyles((theme) => ({
  headerTitle: {
    flexGrow: 2,
    textAlign: 'center',
    fontWeight: '600'
  },
  dialogActionButtons: {
    justifyContent: 'center',
    flexDirection: 'column',
  },
  dismissButton: {
    marginLeft: '0 !important',
  },
  messageBox: {
    minWidth: '200px',
    padding: theme.spacing(1.5),
    textOverflow: 'ellipsis',
    overflowX: 'hidden',
    wordBreak: 'break-word'
  }
}));

const PopUpDialog = () => {
  const classes = useStyles();
  const popupData = useSelector((state) => state.popupReducer);

  const dispatch = useDispatch();

  const handleDismiss = (event) => {
    event.preventDefault();
    dispatch(hidePopupAction());
  };

  return(
    <Dialog
      open={popupData.showPopup}
      onClose={handleDismiss}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        <Typography variant='h5' component='h5' className={classes.headerTitle}>
          {popupData.header}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <div className={classes.messageBox}>
          <Typography variant='subtitle1'>{popupData.message}</Typography>
        </div>
      </DialogContent>
      <DialogActions className={classes.dialogActionButtons}>
          <Button
            onClick={handleDismiss}
            color='default'
            className={classes.dismissButton}
          >
            Dismiss
          </Button>
        </DialogActions>
    </Dialog>
  );
};

export default PopUpDialog;

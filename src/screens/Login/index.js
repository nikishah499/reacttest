import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import {
  Button,
  Container,
  CssBaseline,
  Typography,
  TextField,
  makeStyles,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Grid,
  Link
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import Loader from '../../components/Loader';
import PopUpDialog from '../../components/PopUpDialog';
import { loginAction } from '../../redux/actions/authAction';
import { push } from 'connected-react-router';

const useStyles = makeStyles(() => ({
  paper: {
    marginTop: '30%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: 1,
  },
  submit: {
    margin: '5% 0 4%',
  },
  passwordField: {
    width: '100%'
  },
  linkGroup: {
    marginBottom: '4%',
  }
}));

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    errors: {},
    showPassword: false
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loaderReducer.isLoading);
  const showPopup = useSelector((state) => state.popupReducer.showPopup);

  const handleChange = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const {name, value} = event.target;
    const {errors} = values;
    delete errors[name];
    setValues({...values, errors, [name]: value});
  };

  const handleClickShowPassword = (event) => {
    event.preventDefault();
    const {showPassword} = values;
    setValues({...values, showPassword: !showPassword});
  };

  const handleResisterClick = (event) => {
    event.preventDefault();
    dispatch(push('/register'));
  };

  const validate = () => {
    const emailRegExp = /^(([^<>()\],;:\s@]+(\.[^<>()\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+\.)+[^<>()[\],;:\s@]{2,})$/i;
    const {email, password, errors} = values;
    if (!emailRegExp.test(email)) {
      errors.email = 'Please enter valid email address';
    }
    if (_.isEmpty(password)) {
      errors.password = 'Please enter password';
    }
    return errors;
  };

  const login = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const {email, password} = values;
    const validationError = validate();
    if (_.isEmpty(validationError)) {
      dispatch(loginAction({email, password}));
    } else {
      setValues({...values, errors: validationError});
    }
  };

  const {email, password, showPassword, errors} = values;
  return (
    <Container component='main' maxWidth='xs'>
      <Loader isLoading={isLoading}/>
      {showPopup && <PopUpDialog />}
      <CssBaseline/>
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>Sign In</Typography>
        <form className={classes.form} onSubmit={login}>
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            value={email}
            error={!_.isEmpty(errors.email)}
            onChange={handleChange}
            helperText={errors.email}
            autoComplete='email'
            autoFocus
          />
          <FormControl className={classes.passwordField} variant='outlined' margin='normal' error={!_.isEmpty(errors.password)}>
            <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              type={showPassword ? 'text' : 'password'}
              name='password'
              value={password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    edge='end'
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={85}
              fullWidth
            />
            {
              !_.isEmpty(errors.password) && <FormHelperText id='component-error-text'>{errors.password}</FormHelperText>
            }
          </FormControl>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.submit}
            fullWidth
          >
            Sign In
          </Button>
          <Grid container justify='flex-end' className={classes.linkGroup}>
            <Grid item>
              <Link href='/register' variant='body2' onClick={handleResisterClick}>
                {"Do't have an account? Sign up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Login;

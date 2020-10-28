import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {push} from 'connected-react-router';
import {
    Button,
    Container,
    CssBaseline,
    Typography,
    TextField,
    Grid,
    Link,
    makeStyles,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormHelperText,
    FormControl
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import _ from 'lodash';

import Loader from '../../components/Loader';
import {registerAction} from '../../redux/actions/authAction';
import PopUpDialog from '../../components/PopUpDialog';

const useStyles = makeStyles(() => ({
    paper: {
        marginTop: '20%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: '5%',
    },
    submit: {
        margin: '2% 0 4%',
    },
    linkGroup: {
        marginBottom: '4%',
    },
    passwordField: {
        width: '100%'
    }
}));

const Register = () => {
    const [values, setValues] = useState({
        user: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
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
        const {user, errors} = values;
        user[name] = value;
        delete errors[name];
        setValues({ ...values, user, errors });
    };

    const handleClickShowPassword = (event) => {
        event.preventDefault();
        const {showPassword} = values;
        setValues({...values, showPassword: !showPassword});
    };

    const validate = () => {
        const requiredFields = ['firstName', 'lastName'];
        const emailRegExp = /^(([^<>()[\],;:\s@]+(\.[^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+\.)+[^<>()[\],;:\s@]{2,})$/i;
        const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/i;
        const {user, errors} = values;
        requiredFields.forEach((fieldName) => {
            if (user[fieldName].length === 0) {
                errors[fieldName] = `Please enter ${fieldName}`;
            }
        });
        if (!emailRegExp.test(user.email)) {
            errors.email = 'Please enter valid email address';
        }
        if (!passwordRegExp.test(user.password)) {
            errors.password = 'Password must contain Alphabets character, 1 Number, 1 special character, and it must be 8 characters or longer';
        }
        return errors;
    };

    const register = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const {user} = values;
        const validationError = validate();
        if (_.isEmpty(validationError)) {
            dispatch(registerAction(user));
        } else {
            setValues({ ...values, errors: validationError });
        }
    };

    const handleLoginClick = (event) => {
        event.preventDefault();
        dispatch(push('/login'));
    };

    const { user: { firstName, lastName, email, password }, showPassword, errors} = values;
    return (
      <Container component='main' maxWidth='xs'>
          <Loader isLoading={isLoading}/>
          {showPopup && <PopUpDialog />}
          <CssBaseline/>
          <div className={classes.paper}>
              <Typography component='h1' variant='h5'>Sign Up</Typography>
              <form className={classes.form} onSubmit={register}>
                  <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                          <TextField
                            variant='outlined'
                            fullWidth
                            id='firstName'
                            name='firstName'
                            label='First Name'
                            value={firstName}
                            onChange={handleChange}
                            error={!_.isEmpty(errors.firstName)}
                            helperText={errors.firstName}
                            autoComplete='fname'
                          />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                          <TextField
                            variant='outlined'
                            fullWidth
                            id='lastName'
                            name='lastName'
                            label='last Name'
                            value={lastName}
                            onChange={handleChange}
                            error={!_.isEmpty(errors.lastName)}
                            helperText={errors.lastName}
                            autoComplete='lname'
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <TextField
                            variant='outlined'
                            fullWidth
                            id='email'
                            label='Email Address'
                            name='email'
                            value={email}
                            onChange={handleChange}
                            error={!_.isEmpty(errors.email)}
                            helperText={errors.email}
                            autoComplete='email'
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <FormControl className={classes.passwordField} variant='outlined' error={!_.isEmpty(errors.password)}>
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
                      </Grid>
                      <Grid item xs={12}>
                          <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            fullWidth
                          >
                              Sign Up
                          </Button>
                      </Grid>
                  </Grid>
                  <Grid container justify='flex-end' className={classes.linkGroup}>
                      <Grid item>
                          <Link href='/login' variant='body2' onClick={handleLoginClick}>
                              {'Already have an account? Sign in'}
                          </Link>
                      </Grid>
                  </Grid>
              </form>
          </div>
      </Container>
    );
}

export default Register;

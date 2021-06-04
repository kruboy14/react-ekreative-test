import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import { userApi } from '../utils/api/user';
import { useDispatch } from 'react-redux';
import { userActions } from '../store/actions/user';
import GoogleButton from 'react-google-button';
import FacebookIcon from '@material-ui/icons/Facebook';

const LoginStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  facebookBtn: {
    marginTop: 16,
    backgroundColor: 'blue',
    width: 240,
    color: 'white',
    '&:hover': {
      backgroundColor: '#0000ff8f'
      
    }
  },
});

export const Login = () => {
  const dispatch = useDispatch();
  const classes = LoginStyles();

  const fetchAuthUser = async () => {
    try {
      const { data } = await userApi.fetchAuthUser();
      dispatch(userActions.setIsAuth(true));
      dispatch(userActions.setUserData(data));
    } catch (error) {
      console.log(error);
    }
  };

  const redirectToGoogleSign = async () => {
    let timer = null;
    const newWindow = window.open(
      'http://localhost:3333/auth/google',
      '_blank',
      'width=500,height=600',
    );
    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          fetchAuthUser();
          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  };
  const redirectToFacebookSign = async () => {
    let timer = null;
    const newWindow = window.open(
      'http://localhost:3333/auth/facebook',
      '_blank',
      'width=500,height=600',
    );
    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          fetchAuthUser();
          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  };
  return (
    <div className={classes.wrapper}>
      <GoogleButton onClick={redirectToGoogleSign}></GoogleButton>
      <Button
        startIcon={<FacebookIcon />}
        onClick={redirectToFacebookSign}
        className={classes.facebookBtn}>
        Facebook
      </Button>
    </div>
  );
};
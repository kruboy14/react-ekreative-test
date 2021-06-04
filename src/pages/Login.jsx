import { Button } from '@material-ui/core';
import React from 'react';
import { userApi } from '../utils/api/user';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/actions/user';

export const Login = () => {
  const dispatch = useDispatch();
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
    <div>
      <Button onClick={redirectToGoogleSign}>Google</Button>
      <Button onClick={redirectToFacebookSign}>Facebook</Button>

    </div>
  );
};

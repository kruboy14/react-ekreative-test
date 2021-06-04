import { createAction } from '@reduxjs/toolkit';

import { USER_SET_AUTH, USER_SET_DATA } from '../constants/actionTypes';

export const userActions = {
  setIsAuth: createAction(USER_SET_AUTH),
  setUserData: createAction(USER_SET_DATA),
};

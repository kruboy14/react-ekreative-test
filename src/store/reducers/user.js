import { createReducer } from '@reduxjs/toolkit';
import { USER_SET_AUTH, USER_SET_DATA } from '../constants/actionTypes';

const initialState = {
  isAuth: false,
  userData: null,
};
export const userReducer = createReducer(initialState, {
  [USER_SET_AUTH]: (state, action) => {
    state.isAuth = action.payload;
  },
  [USER_SET_DATA]: (state, action) => {
    state.userData = action.payload;
  },
});

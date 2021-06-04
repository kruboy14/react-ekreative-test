import { configureStore } from '@reduxjs/toolkit';

import { videoReducer as video } from './reducers/video';
import { userReducer as user } from './reducers/user';

const store = configureStore({
  reducer: {
    video,
    user,
  },
});

export default store;

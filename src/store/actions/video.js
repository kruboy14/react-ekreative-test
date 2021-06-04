import { createAction } from '@reduxjs/toolkit';
import {
  VIDEO_SET_ALL_VIDEOS,
  VIDEO_SET_CURRENT_VIDEO_DATA,
  VIDEO_SET_CURRENT_VIDEO_ID,
} from '../constants/actionTypes';

export const videoActions = {
  setVideosDataFlow: createAction(VIDEO_SET_ALL_VIDEOS),
  setVideosData: (videosStat) => async (dispatch) => {
    await dispatch(videoActions.setVideosDataFlow(videosStat));
    dispatch(videoActions.setCurrentVideoData());
  },
  setCurrentVideoId: createAction(VIDEO_SET_CURRENT_VIDEO_ID),
  setCurrentVideoData: createAction(VIDEO_SET_CURRENT_VIDEO_DATA),
};

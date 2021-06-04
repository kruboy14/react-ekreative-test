import { createReducer } from '@reduxjs/toolkit';
import {
  VIDEO_SET_ALL_VIDEOS,
  VIDEO_SET_CURRENT_VIDEO_ID,
  VIDEO_SET_CURRENT_VIDEO_DATA,
} from '../constants/actionTypes';

const initialState = {
  currentVideoId: null,
  videosData: null,
  currentVideoData: null,
};
export const videoReducer = createReducer(initialState, {
  [VIDEO_SET_ALL_VIDEOS]: (state, action) => {
    const data = action.payload.map((video) => ({
      id: video.id,
      title: video.snippet.localized.title,
      description: video.snippet.localized.description,
      thumbnail: video.snippet.thumbnails.default,
      viewCount: video.statistics.viewCount,
      likeCount: video.statistics.likeCount,
      dislikeCount: video.statistics.dislikeCount,
      favoriteCount: video.statistics.favoriteCount,
      commentCount: video.statistics.commentCount,
    }));
    state.videosData = data;
  },
  [VIDEO_SET_CURRENT_VIDEO_ID]: (state, action) => {
    state.currentVideoId = action.payload;
  },
  [VIDEO_SET_CURRENT_VIDEO_DATA]: (state, action) => {
    if(state.currentVideoId && state.videosData) {
      const videoData = state.videosData.find(
        (item) => item.id === state.currentVideoId,
      );
      state.currentVideoData = videoData;
    }
 
  },
});

export const selectAllVideos = (state) => state.video.videosData;
export const selectCurrentVideoID = (state) => state.video.currentVideoId;
export const selectCurrentVideoData = (state) => state.video.currentVideoData;

export const selectUserAuth = (state) => state.user.isAuth;
export const selectUserPicture = (state) => state.user.userData;

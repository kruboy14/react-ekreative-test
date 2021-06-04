import {  makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';

import { getVideoIdFromPlaylist, getVideosbyId } from '../utils/api/ytVideo';
import { useDispatch, useSelector } from 'react-redux';
import { videoActions } from '../store/actions/video';
import { selectCurrentVideoID } from '../store/selectors';
import { VideoList } from '../components/VideoList';
import { useLocation } from 'react-router';
import { VideoContent } from '../components/VideoContent';
import { useState } from 'react';
import Header from '../components/Header';


const HomeStyles = makeStyles({
  wrapper: {
    backgroundColor: '#eee',
    height: '100%',
  },
  content: {
    margin: '0 auto',
    maxWidth: 1280,
    padding: '0 20',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export const Home = () => {
  const classes = HomeStyles();
  const dispatch = useDispatch();
  const videoId = useSelector(selectCurrentVideoID);
  const location = useLocation();
  const [channelName, setchannelName] = useState();

  const hanldeChannelName = (event) => {
    setchannelName(event.target.value);
  };
  useEffect(() => {
    (async () => {
      const items = await getVideoIdFromPlaylist({
        apiKey: process.env.REACT_APP_YOUTUBE_API_KEY,
        playlistId: 'UUP_IYZTiqbmUqmI3KXHIEoQ',
      });
      const videosStat = await getVideosbyId({
        apiKey: process.env.REACT_APP_YOUTUBE_API_KEY,
        videoIdx: items,
      });

      dispatch(videoActions.setVideosData(videosStat));
    })();
  }, [dispatch]);

  useEffect(() => {
    const videoId = location.pathname.split('/').pop();
    dispatch(videoActions.setCurrentVideoId(videoId));
    if (videoId) {
      dispatch(videoActions.setCurrentVideoData());
    }
  }, [location.pathname, dispatch]);
 
  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <Header/>
        {videoId ? (
          <VideoContent id={videoId} />
        ) : (
          <VideoList
            channelName={channelName}
            hanldeChannelName={hanldeChannelName}
          />
        )}
      </div>
    </div>
  );
};

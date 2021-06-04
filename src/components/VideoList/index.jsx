import React from 'react';
import { selectAllVideos } from '../../store/selectors';
import { useSelector } from 'react-redux';
import { VideoItem } from '../VideoItem';


export const VideoList = ({ channelName, hanldeChannelName }) => {
  const videos = useSelector(selectAllVideos);

  return (
    <div>
      {videos &&
        videos.map((video) => (
          <VideoItem
            key={video.id}
            title={video.title}
            thumbnail={video.thumbnail}
            id={video.id}
          />
        ))}
    </div>
  );
};

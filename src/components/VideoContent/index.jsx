import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentVideoData } from '../../store/selectors';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player/youtube';
import { makeStyles, Typography } from '@material-ui/core';
import Linkify from 'react-linkify';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const VideoContentStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 400,
    fontSize: 32,
  },
  stats: {
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
  viewCount: {
    fontSize: 20,
    marginBottom: theme.spacing(3),
    '& span': {
      fontWeight: 600,
    },
  },
  statsInfo: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(2),
    fontWeight: 600,
    fontSize: 16,
  },
  likeCount: {
    color: 'green',
    marginLeft: theme.spacing(1),
  },
  dislikeCount: {
    color: 'red',
    marginLeft: theme.spacing(1),
  },
  commentInfo: {
    marginBottom: theme.spacing(3),
    fontWeight: 600,
    fontSize: 18,
  },
  commentCount: {
    marginLeft: theme.spacing(1),
  },
  descriptionTitle: {
    fontWeight: 600,
  },

  description: {},
}));
export const VideoContent = () => {
  const classes = VideoContentStyles();

  const videoData = useSelector(selectCurrentVideoData);

  return (
    <>
      <Link to="/">BACK!</Link>
      {videoData && (
        <div>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoData.id}`}
            controls={true}
            width={1260}
            height={580}
          />
          <Typography className={classes.title}>{videoData.title}</Typography>

          <div className={classes.viewCount}>
            viewCount <span>{videoData.viewCount}</span>
          </div>
          <div className={classes.stats}>
            <div className={classes.statsInfo}>
              <ThumbUpIcon />
              <span className={classes.likeCount}>{videoData.likeCount}</span>
            </div>
            <div className={classes.statsInfo}>
              <ThumbDownIcon />
              <span className={classes.dislikeCount}>
                {videoData.dislikeCount}
              </span>
            </div>
          </div>
          <div className={classes.commentInfo}>
            commentCount:
            <span className={classes.commentCount}>
              {videoData.commentCount}
            </span>
          </div>
          <Typography className={classes.description}>
            <div className={classes.descriptionTitle}>Description:</div>
            <Linkify>{videoData.description}</Linkify>
          </Typography>
        </div>
      )}
    </>
  );
};

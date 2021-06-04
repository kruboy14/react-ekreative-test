import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const VideoItemStyles = makeStyles((theme) => ({
  videoLink: { textDecoration: 'none', color: 'inherit' },
  videoContent: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #975665',
    maxWidth: 480,
    width: '100%',
    margin: '10px 0',
    textDecoration: 'none',
  },
  videoTitle: {
    marginLeft: theme.spacing(2),
    fontWeight: 600,

  },
  videoImage: {
    display: 'inherit',
  },
}));

export const VideoItem = ({ title, thumbnail, id }) => {
  const classes = VideoItemStyles();

  return (
    <Link className={classes.videoLink} to={`/video/${id}`}>
      <div className={classes.videoContent}>
        <div className={classes.videoImage}>
          <img src={thumbnail.url} alt="Video src" />
        </div>
        <Typography className={classes.videoTitle}>{title}</Typography>
      </div>
    </Link>
  );
};

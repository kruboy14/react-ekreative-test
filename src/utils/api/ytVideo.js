import axios from 'axios';

import { sliceIntoChunks } from '../helpers/sliceIntoChunks';

export const getVideoIdFromPlaylist = async ({
  apiKey,
  playlistId,
  pageToken,
}) => {
  const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&pageToken=${
    pageToken || ''
  }&playlistId=${playlistId}&key=${apiKey}`;

  const { data } = await axios.get(url);

  const videoId = data.items.map((elem) => elem.snippet.resourceId.videoId);
  if (data.nextPageToken) {
    return [].concat(videoId).concat(
      await getVideoIdFromPlaylist({
        apiKey,
        playlistId,
        pageToken: data.nextPageToken,
      }),
    );
  } else {
    return videoId;
  }
};

export const getVideosbyId = async ({ videoIdx, apiKey }) => {
  const chunks = sliceIntoChunks(videoIdx, 45);
  const idx = chunks.map((chunk) => {
    return chunk.map((elem) => 'id=' + elem + '&').join('');
  });
  const urls = idx.map(
    (url) =>
      `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails%2C%20snippet%2C%20statistics&${url}&key=${apiKey}`,
  );
  let res = [];
  for (let i = 0; i < urls.length; i++) {
    const { data } = await axios.get(urls[i]);
    res.push(data.items);
  }

  return res.flat(Infinity);
};

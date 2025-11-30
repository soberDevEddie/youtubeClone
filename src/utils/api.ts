import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const getHomeVideos = async (categoryId: string, pageToken?: string) => {
  const url = `${BASE_URL}/videos?key=${API_KEY}&part=snippet,statistics,contentDetails&chart=mostPopular&${
    categoryId != null ? `videoCategoryId=${categoryId}` : ``
  }&${pageToken != null ? `pageToken=${pageToken}` : ``}&maxResults=20`;

  const response = await axios.get(url);

  return response.data;
};

export const getActivitiesVideos = async (videoIds: string[]) => {
  const url = `${BASE_URL}/videos?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${videoIds}`;

  const response = await axios.get(url);

  return response.data;
};

export const getVideoDetails = async (videoId: string) => {
  const url = `${BASE_URL}/videos?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${videoId}`;

  const response = await axios.get(url);

  return response.data.items;
};

export const getActivities = async (channelId: string, pageToken?: string) => {
  const url = `${BASE_URL}/activities?key=${API_KEY}&part=snippet,contentDetails&channelId=${channelId}${
    pageToken ? `&pageToken=${pageToken}` : ''
  }&maxResults=20`;

  const response = await axios.get(url);

  return response.data;
};

export const getVideoComments = async (videoId: string, pageToken?: string) => {
  const url = `${BASE_URL}/commentThreads?key=${API_KEY}&part=snippet,replies&videoId=${videoId}${
    pageToken ? `&pageToken=${pageToken}` : ''
  }`;
  const response = await axios.get(url);

  return response.data;
};

export const getCommentReplies = async (commentId: string) => {
  const url = `${BASE_URL}/comments?key=${API_KEY}&part=snippet&parentId=${commentId}`;

  const response = await axios.get(url);

  return response.data.items;
};

export const getChannelInfo = async (
  channelId?: string,
  channelIds?: string[]
) => {
  const url = `${BASE_URL}/channels?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${
    channelId ? channelId : channelIds
  }`;

  const response = await axios.get(url);

  return response.data.items;
};

export const getChannelPlaylists = async (
  channelId: string,
  pageToken?: string
) => {
  const url = `${BASE_URL}/playlists?key=${API_KEY}&part=snippet,contentDetails&channelId=${channelId}${
    pageToken ? `&pageToken=${pageToken}` : ''
  }&maxResults=8`;

  const response = await axios.get(url);

  return response.data;
};

export const getPlaylistInfo = async (playlistId: string) => {
  const url = `${BASE_URL}/playlists?key=${API_KEY}&part=snippet,contentDetails&id=${playlistId}&maxResults=20`;

  const response = await axios.get(url);

  return response.data.items[0];
}
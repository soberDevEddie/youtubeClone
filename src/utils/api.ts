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

export const getChannelInfo = async (channelId: string) => {
  const url = `${BASE_URL}/channels?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${channelId}`;

  const response = await axios.get(url);

  return response.data.items[0];
};

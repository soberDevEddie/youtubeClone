import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY; 

const getChannelInfo = async () => {
  const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${channelId}`
}
import axios from 'axios';

import type { HomeVideoCardType } from './Types';

const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchVideosWithChannels = async (items: any[]) => {
  const videoData = items.map((item: any) => {
    return {
      videoId: item.id,
      videoTitle: item.snippet.title,
      videoThumbnail: item.snippet.thumbnails.standard.url,
      videoDuration: item.contentDetails.duration,
      videoViews: item.statistics.viewCount,
      videoAge: item.snippet.publishedAt,
      channelInfo: {
        id: item.snippet.channelId,
        name: item.snippet.channelTitle,
      },
    };
  });

  const channelIds = videoData
    .map((video: HomeVideoCardType) => video.channelInfo.id)
    .join(',');

  const channelResponse = await axios.get(
    `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&part=snippet&id=${channelIds}`
  );

  const channelData: { [key: string]: string } = {};

  channelResponse.data.items.forEach((channel: any) => {
    channelData[channel.id] = channel.snippet.thumbnails.default.url;
  });

  const videos = videoData.map((video: HomeVideoCardType) => ({
    ...video,
    channelInfo: {
      ...video.channelInfo,
      image: channelData[video.channelInfo.id],
    },
  }));

  return videos;
};

import { useState } from 'react';
import axios from 'axios';

import type { HomeVideoCardType } from '../Utils/Types';

const API_KEY = import.meta.env.VITE_API_KEY;

export const useHome = () => {
  interface HomeHookPropType {
    videos: HomeVideoCardType[];
    nextPageToken: string | null;
  }
  

  const [homeVideos, setHomeVideos] = useState<
    Record<string, HomeHookPropType>
  >({
    home: { videos: [], nextPageToken: null },
    music: { videos: [], nextPageToken: null },
    sports: { videos: [], nextPageToken: null },
    gaming: { videos: [], nextPageToken: null },
    movies: { videos: [], nextPageToken: null },
    news: { videos: [], nextPageToken: null },
    fashion: { videos: [], nextPageToken: null },
    education: { videos: [], nextPageToken: null },
  });

  const [error, setError] = useState<string | null>(null)

  const fetchHomeVideos = async (
    filter: string,
    categoryId: string | null,
    pageToken: string | null
  ) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet,statistics,contentDetails&chart=mostPopular&${
          categoryId != null ? `videoCategoryId=${categoryId}` : ``
        }&${pageToken != null ? `pageToken=${pageToken}` : ``}&maxResults=20`
      );
      setError(null)

      const videoData = response.data.items.map((item: any) => {
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

      // console.log(channelResponse);
      const videos = videoData.map((video: HomeVideoCardType) => ({
        ...video,
        channelInfo: {
          ...video.channelInfo,
          image: channelData[video.channelInfo.id],
        },
      }));

      setHomeVideos((prev) => ({
        ...prev,
        [filter]: {
          videos: [...prev[filter].videos, ...videos],
          nextPageToken: response.data.nextPageToken,
        },
      }));
    } catch (error) {
      console.error(`Error fetching ${filter} videos:`, error);
      setError(`Error fetching the ${filter} videos, fetch again later.`)
    }
  };

  return { homeVideos, fetchHomeVideos, error };
};

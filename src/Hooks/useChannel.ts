import { useState } from 'react';
import axios from 'axios';

import type { ChannelInfoType } from '../Utils/Types';
const API_KEY = import.meta.env.VITE_API_KEY;

export const useChannel = () => {
  const [channelInfo, setChannelInfo] = useState<ChannelInfoType | null>(null);

  const fetchChannelInfo = async (channelId: string) => {
    try {
      const channelInfoResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${channelId}`
      );

      // console.log(channelInfoResponse);

      const items = channelInfoResponse.data.items;
      // console.log(items);

      const channelInfoData = items.map((item: any) => ({
        id: items.id,
        thumbnail: item.snippet.thumbnails.high.url,
        title: item.snippet.title,
        customUrl: item.snippet.customUrl,
        description: item.snippet.description,
        subCount: item.statistics.subscriberCount,
        videoCount: item.statistics.videoCount,
      }));

      // console.log(channelInfoData);

      setChannelInfo(channelInfoData[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return { channelInfo, fetchChannelInfo };
};

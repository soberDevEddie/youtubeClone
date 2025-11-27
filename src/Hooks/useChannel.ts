import { useState } from 'react';

import type { ChannelInfoType } from '../Utils/Types';
import { getActivities, getChannelInfo } from '../Utils/api';

export const useChannel = () => {
  const [channelInfo, setChannelInfo] = useState<ChannelInfoType | null>(null);

  const fetchChannelInfo = async (channelId: string) => {
    try {
      const channelInfoResponse = await getChannelInfo(channelId);

      const channelInfoData = {
        id: channelInfoResponse[0].id,
        thumbnail: channelInfoResponse[0].snippet.thumbnails.high.url,
        title: channelInfoResponse[0].snippet.title,
        customUrl: channelInfoResponse[0].snippet.customUrl,
        description: channelInfoResponse[0].snippet.description,
        subCount: channelInfoResponse[0].statistics.subscriberCount,
        videoCount: channelInfoResponse[0].statistics.videoCount,
      };

      // console.log(channelInfoData);

      setChannelInfo(channelInfoData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchChannelData = async (channelId: string) => {
    const channelVideosReponse = await getActivities(channelId);

    console.log(channelVideosReponse);
    
  };

  return { channelInfo, fetchChannelInfo, fetchChannelData };
};

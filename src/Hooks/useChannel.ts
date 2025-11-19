import { useState } from 'react';

import type { ChannelInfoType } from '../Utils/Types';
import { getChannelInfo } from '../Utils/api';

export const useChannel = () => {
  const [channelInfo, setChannelInfo] = useState<ChannelInfoType | null>(null);

  const fetchChannelInfo = async (channelId: string) => {
    try {
      const channelInfoResponse = await getChannelInfo(channelId);

      const channelInfoData = {
        id: channelInfoResponse.id,
        thumbnail: channelInfoResponse.snippet.thumbnails.high.url,
        title: channelInfoResponse.snippet.title,
        customUrl: channelInfoResponse.snippet.customUrl,
        description: channelInfoResponse.snippet.description,
        subCount: channelInfoResponse.statistics.subscriberCount,
        videoCount: channelInfoResponse.statistics.videoCount,
      };

      // console.log(channelInfoData);

      setChannelInfo(channelInfoData);
    } catch (error) {
      console.error(error);
    }
  };

  return { channelInfo, fetchChannelInfo };
};

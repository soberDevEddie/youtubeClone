import { useState } from 'react';

import type { ChannelInfoType, HomeVideoCardType } from '../Utils/Types';
import {
  getActivities,
  getChannelInfo,
  getActivitiesVideos,
} from '../Utils/api';
import { fetchVideosWithChannels } from '../Utils/videoDetailsHelper';

interface ChannelVideoListState {
  videos: HomeVideoCardType[];
  nextPageToken: string | null;
}

export const useChannel = () => {
  const [channelInfo, setChannelInfo] = useState<ChannelInfoType | null>(null);
  const [channelVideosList, setChannelVideosList] =
    useState<ChannelVideoListState>({ videos: [], nextPageToken: null });

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

  const fetchChannelData = async (channelId: string, pageToken?: string) => {
    const channelVideosReponse = await getActivities(channelId, pageToken);
    // console.log(`channelVideosreponse:`, channelVideosReponse);

    const videoIds: string[] = [];

    channelVideosReponse.items.forEach(
      (item: {
        contentDetails: {
          upload?: {
            videoId: string;
          };
          playlistItem?: {
            resourceId: { videoId: string };
          };
        };
      }) => {
        if (item.contentDetails.upload) {
          videoIds.push(item.contentDetails.upload.videoId);
        }
        // } else if (item.contentDetails.playlistItem?.resourceId.videoId) {
        //   videoIds.push(item.contentDetails.playlistItem.resourceId.videoId);
        // }
      }
    );

    const vidReponse = await getActivitiesVideos(videoIds!);
    const videosArray = await fetchVideosWithChannels(vidReponse.items);

    setChannelVideosList((prev) => ({
      videos: [...prev.videos, ...videosArray],
      nextPageToken: channelVideosReponse.nextPageToken || null,
    }));

    // console.log(
    //   'You are using the useChannel hook to fetch videos reponse',
    //   videosArray
    // );
  };

  return { channelInfo, fetchChannelInfo, channelVideosList, fetchChannelData };
};

import { useState } from 'react';

import type {
  ChannelInfoType,
  HomeVideoCardType,
  ChannelPlaylistType,
} from '../Utils/Types';
import {
  getActivities,
  getChannelInfo,
  getActivitiesVideos,
  getChannelPlaylists,
} from '../Utils/api';
import { fetchVideosWithChannels } from '../Utils/videoDetailsHelper';
import { parseChannelPlaylist } from '../Utils/parseData';

interface ChannelVideoListState {
  videos: HomeVideoCardType[];
  nextPageToken: string | null;
}
interface ChannelPlaylistListState {
  playlists: ChannelPlaylistType[];
  nextPageToken: string | null;
}

export const useChannel = () => {
  const [category, setCategory] = useState('videos');
  const [channelInfo, setChannelInfo] = useState<ChannelInfoType | null>(null);
  const [channelVideosList, setChannelVideosList] =
    useState<ChannelVideoListState>({
      videos: [],
      nextPageToken: null,
    });
  const [hasMoreVideos, setHasMoreVideos] = useState(true);

  const [channelPlaylists, setChannelPlaylists] =
    useState<ChannelPlaylistListState>({
      playlists: [],
      nextPageToken: null,
    });

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
    if (category == 'videos') {
      const channelVideosReponse = await getActivities(
        channelId,
        channelVideosList.nextPageToken || undefined
      );

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

      setHasMoreVideos(videoIds.length <= Number(channelInfo?.videoCount));

      // console.log(
      //   'You are using the useChannel hook to fetch videos reponse',
      //   videosArray
      // );
      console.log(`channelVideosData:`, channelVideosReponse);
    } else {
      const channelPlaylistResponse = await getChannelPlaylists(
        channelId!,
        channelPlaylists.nextPageToken || undefined
      );

      const channelPlaylistData = parseChannelPlaylist(
        channelPlaylistResponse.items
      );
      console.log('channelPlaylistData', channelPlaylistData);
      setChannelPlaylists((prev) => ({
        playlists: [...prev.playlists, ...channelPlaylistData],
        nextPageToken: channelPlaylistResponse.nextPageToken || null,
      }));
      setHasMoreVideos(Boolean(channelPlaylistResponse.nextPageToken));
    }
  };

  return {
    channelInfo,
    fetchChannelInfo,
    channelVideosList,
    fetchChannelData,
    category,
    setCategory,
    channelPlaylists,
    hasMoreVideos
  };
};

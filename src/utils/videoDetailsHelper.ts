import type { HomeVideoCardType } from './Types';
import { getChannelInfo } from './api';

export const fetchVideosWithChannels = async (items: any[]) => {
  const videoData = items.map((item: any) => {
    return {
      videoId: item.id,
      videoTitle: item.snippet.title,
      videoDescription: item.snippet.description,
      videoThumbnail:
        item.snippet.thumbnails.standard?.url ||
        item.snippet.thumbnails.default?.url,
      videoDuration: item.contentDetails.duration,
      videoViews: item.statistics.viewCount,
      videoLikes: item.statistics.likeCount,
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

  const channelResponse = await getChannelInfo(channelIds);

  const channelData: { [key: string]: { image: string; subCount: string } } =
    {};

  channelResponse.forEach((channel: any) => {
    channelData[channel.id] = {
      image: channel.snippet.thumbnails.default.url,
      subCount: channel.statistics.subscriberCount,
    };
  });

  const videos = videoData.map((video: HomeVideoCardType) => ({
    ...video,
    channelInfo: {
      ...video.channelInfo,
      image: channelData[video.channelInfo.id].image,
      subCount: channelData[video.channelInfo.id].subCount,
    },
  }));

  // console.log(`check`, videos);

  return videos;
};

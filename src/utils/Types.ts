export interface HomeVideoCardType {
  videoId: string;
  videoThumbnail: string;
  videoDuration: string;
  videoTitle: string;
  videoViews: string;
  videoAge: string;
  channelInfo: {
    id: string;
    image?: string;
    name: string;
  };
}

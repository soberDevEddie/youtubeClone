export interface HomeVideoCardType {
  videoId: string;
  videoTitle: string;
  videoDescription: string;
  videoThumbnail: string;
  videoDuration: string;
  videoViews: string;
  videoLikes: string;
  videoAge: string;
  channelInfo: {
    id: string;
    image?: string;
    name: string;
    subCount?: string;
  };
}

export interface CommentBodyType {
  commentId: string;
  authorChannelId: string;
  authorProfile: string;
  authorName: string;
  commentText: string;
  commentLikes: string;
}

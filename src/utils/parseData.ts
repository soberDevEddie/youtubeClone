import type {
  ChannelPlaylistType,
  HomeVideoCardType,
  CommentBodyType,
} from './Types';

export const parseVideos = (videos: any[]): HomeVideoCardType[] => {
  return videos.map((video: any) => ({
    videoId: video.id,
    videoTitle: video.snippet.title,
    videoDescription: video.snippet.description,
    videoThumbnail:
      video.snippet.thumbnails.standard?.url ||
      video.snippet.thumbnails.default?.url,
    videoDuration: video.contentDetails.duration,
    videoViews: video.statistics.viewCount,
    videoLikes: video.statistics.likeCount,
    videoAge: video.snippet.publishedAt,
    channelInfo: {
      id: video.snippet.channelId,
      name: video.snippet.channelTitle,
    },
  }));
};

export const parseChannelPlaylist = (
  playlists: any[]
): ChannelPlaylistType[] => {
  return playlists.map((playlist: any) => ({
    id: playlist.id,
    title: playlist.snippet.title,
    thumbnail:
      playlist.snippet.thumbnails.high!.url ||
      playlist.snippet.thumbnails!.default.url,
    videoCount: playlist.contentDetails.itemCount,
  }));
};

export const parseComments = (comments: any[]): CommentBodyType[] => {
  return comments.map((comment: any) => ({
    commentId: comment.id,
    authorChannelId:
      comment.snippet.topLevelComment.snippet.authorChannelId.value,
    authorProfile:
      comment.snippet.topLevelComment.snippet.authorProfileImageUrl,
    authorName: comment.snippet.topLevelComment.snippet.authorDisplayName,
    commentText: comment.snippet.topLevelComment.snippet.textOriginal,
    commentLikes: comment.snippet.topLevelComment.snippet.likeCount,
    commentRepliesCount: comment.snippet.totalReplyCount,
  }));
};

export const parseReplyComments = (replies: any[]): CommentBodyType[] => {
  return replies.map((comment: any) => ({
    commentId: comment.id,
    authorChannelId: comment.snippet.authorChannelId.value,
    authorProfile: comment.snippet.authorProfileImageUrl,
    authorName: comment.snippet.authorDisplayName,
    commentText: comment.snippet.textOriginal,
    commentLikes: comment.snippet.likeCount,
  }));
};

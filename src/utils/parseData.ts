import type { ChannelPlaylistType } from './Types';

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

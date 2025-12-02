import { useState } from 'react';

import type { PlaylistVideoType } from './Types';
import { getPlaylistVideos } from '../Utils/api';

interface PlaylistItemsState {
  videos: PlaylistVideoType[];
  nextPageToken: string | null;
}

export const usePlaylistItems = () => {
  const [playlistItems, setPlaylistItems] = useState<PlaylistItemsState>({
    videos: [],
    nextPageToken: null,
  });

  const fetchPlaylistVideos = async (playlistId: string) => {
    const playlistVideosResponse = await getPlaylistVideos(playlistId!);

    const playlistVideosData = playlistVideosResponse.items.map(
      (item: any) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail:
          item.snippet.thumbnails.high!.url! ||
          item.snippet.thumbnails.standard!.url!,
      })
    );
    console.log('playlistVideosResponse', playlistVideosData);
    setPlaylistItems((prev) => ({
      videos: [...prev.videos, ...playlistVideosData],
      nextPageToken: playlistVideosResponse.nextPageToken,
    }));
  };

  return { playlistItems, fetchPlaylistVideos };
};

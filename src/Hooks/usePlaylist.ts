import { useState } from 'react';

import type { PlaylistInfoType } from '../Utils/Types';
import { getPlaylistInfo } from '../Utils/api';
import { parsePlaylistInfo } from '../Utils/parseData';

export const usePlaylistInfo = () => {
  const [playlistInfo, setPlaylistInfo] = useState<PlaylistInfoType | null>(
    null
  );
  const [showDescription, setShowDescription] = useState(false);

  const fetchPlaylistData = async (playlistId: string | null) => {
    const playlistInfoReponse = await getPlaylistInfo(playlistId!);
    // console.log("playlistInfoReponse", playlistInfoReponse);

    const playlistInfoData = parsePlaylistInfo(playlistInfoReponse);

    // console.log('playlistInfo', playlistInfoData);
    setPlaylistInfo(playlistInfoData);
  };

  return {
    playlistInfo,
    fetchPlaylistData,
    showDescription,
    setShowDescription,
  };
};

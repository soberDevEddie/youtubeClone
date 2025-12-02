import React from 'react';
import type { PlaylistVideoType } from '../Utils/Types';
import PlaylistItemCard from './PlaylistItemCard';

function PlaylistItems({ videos }: { videos: PlaylistVideoType[] }) {
  return (
    <div className='container-fluid mt-10'>
      <div className='row justify-content-center g-5'>
        {videos.map((item: PlaylistVideoType, index) => (
          <PlaylistItemCard item={item} index={index} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default PlaylistItems;

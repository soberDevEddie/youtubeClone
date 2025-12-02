import { useParams } from 'react-router-dom';

// import { getPlaylistInfo } from '../Utils/api';
import { useEffect, useState } from 'react';
// import type { PlaylistInfoType } from '../Utils/Types';
import { GrClose } from 'react-icons/gr';
import { usePlaylistInfo } from '../Hooks/usePlaylist';
// import { getPlaylistVideos } from '../Utils/api';
// import type { PlaylistVideoType } from '../Utils/Types';
import { usePlaylistItems } from '../Hooks/usePlaylistItems';
import PlaylistItems from '../Components/PlaylistItems';

function Playlist() {
  const { channelId, playlistId } = useParams();
  const {
    playlistInfo,
    fetchPlaylistData,
    showDescription,
    setShowDescription,
  } = usePlaylistInfo();
  const { fetchPlaylistVideos, playlistItems } = usePlaylistItems();

  useEffect(() => {
    fetchPlaylistData(playlistId!);
    fetchPlaylistVideos(playlistId!);
  }, []);

  return (
    <div className='relative '>
      {/* Modal */}

      {showDescription && playlistInfo?.description && (
        <div className='z-[10] absolute overflow-hidden bg-neutral-800 rounded-xl left-1/2 top-14 transform -translate-x-1/2'>
          <div className='flex flex-col gap-2 items-end w-[600px] max-h-[500px] p-8 overflow-y-auto'>
            <div className=''>
              <GrClose
                onClick={() => setShowDescription(false)}
                className='text-2xl text-neutral-200'
              />
            </div>
            <p className='text-lg whitespace-pre-line'>
              {playlistInfo?.description}
            </p>
          </div>
        </div>
      )}

      <div className='w-[90%] mx-auto mt-8'>
        <div className='row row-cols-2 bg-neutral-900 p-5 rounded-xl'>
          {/* image */}
          <div className='col-4'>
            {/* <div className=' aspect-[16/9] object-cover bg-red-300 mx-auto'></div> */}
            <img
              className='w-52 aspect-[16/10] mx-auto object-cover'
              src={playlistInfo?.thumbnail}
              alt=''
            />
          </div>
          {/* details */}

          <div className='col-md-8 col-12 flex flex-col gap-2'>
            <h1 className='md:text-4xl sm:text-3xl text-2xl font-semibold'>
              {playlistInfo?.title}
            </h1>

            {playlistInfo?.description && (
              <div className=''>
                <p className='line-clamp-3 text-neutral-400 whitespace-pre-line'>
                  {playlistInfo?.description}
                </p>
                <button
                  onClick={() => setShowDescription(true)}
                  className='font-semibold'
                >
                  more
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <PlaylistItems channelId={channelId!} videos={playlistItems.videos} />
    </div>
  );
}

export default Playlist;

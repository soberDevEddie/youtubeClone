import { useParams } from 'react-router-dom';

import { getPlaylistInfo } from '../Utils/api';
import { useEffect, useState } from 'react';
import type { PlaylistInfoType } from '../Utils/Types';
import { GrClose } from 'react-icons/gr';

function Playlist() {
  const { channelId, playlistId } = useParams();
  const [playlistInfo, setPlaylistInfo] = useState<PlaylistInfoType | null>(
    null
  );
  const [showDescription, setShowDescription] = useState(false);

  const fetchPlaylistData = async () => {
    const playlistInfoReponse = await getPlaylistInfo(playlistId!);
    // console.log("playlistInfoReponse", playlistInfoReponse);

    const playlistInfoData = {
      id: playlistInfoReponse.id,
      title: playlistInfoReponse.snippet.title,
      description: playlistInfoReponse.snippet.description,
      thumbnail: playlistInfoReponse.snippet.thumbnails?.high?.url,
      itemCount: playlistInfoReponse.contentDetails.itemCount,
    };

    console.log('playlistInfo', playlistInfoData);
    setPlaylistInfo(playlistInfoData);
  };

  useEffect(() => {
    fetchPlaylistData();
  }, []);

  return (
    <div className='relative'>
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

      <div className='row row-cols-4 gap-y-2 mt-4'>
        {/* Playlist video card */}
        {[...Array(12)].map((item: any) => (
          <div className='col flex flex-col'>
            {/* Thumbnail */}
            <div className='relative'>
              <div className='absolute flex gap-2 items-center top-0 left-0 bg-[#0c0c0cd0] px-2 py-0.5 h-full w-[100px] '>
                <h2 className='text-center w-full'>1</h2>
              </div>
              <div className='bg-red-300 w-[300px] rounded aspect-[16/9]'></div>
              {/* <img
            src={item.thumbnail}
            className='bg-red-300 w-[300px] object-cover rounded aspect-[16/9]'
            alt=''
          /> */}
            </div>

            {/* Playlist Video Title */}

            <div className='flex flex-col gap-1 mt-1'>
              <h1 className='text-md line-clamp-1'>Playlist Video title</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Playlist;

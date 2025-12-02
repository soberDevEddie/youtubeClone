import { useParams } from 'react-router-dom';

// import { getPlaylistInfo } from '../Utils/api';
import { useEffect, useState } from 'react';
// import type { PlaylistInfoType } from '../Utils/Types';
import { GrClose } from 'react-icons/gr';
import { usePlaylistInfo } from '../Hooks/usePlaylist';
import { getPlaylistVideos } from '../Utils/api';
import type { PlaylistVideoType } from '../Utils/Types';

interface PlaylistItemsState {
  videos: PlaylistVideoType[];
  nextPageToken: string | null;
}

function Playlist() {
  const { channelId, playlistId } = useParams();
  const {
    playlistInfo,
    fetchPlaylistData,
    showDescription,
    setShowDescription,
  } = usePlaylistInfo();
  const [playlistItems, setPlaylistItems] = useState<PlaylistItemsState>({
    videos: [],
    nextPageToken: null,
  });

  const fetchPlaylistVideos = async () => {
    const playlistVideosResponse = await getPlaylistVideos(playlistId!);

    const playlistVideosData = playlistVideosResponse.items.map(
      (item: any) => ({
        id: item.id,
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

  useEffect(() => {
    fetchPlaylistData(playlistId!);
    fetchPlaylistVideos();
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

      <div className='container-fluid mt-10'>
        <div className='row justify-content-center g-5'>
          {playlistItems.videos.map((item: PlaylistVideoType, index) => (
            <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center'>
              <div className='w-100' style={{ maxWidth: '300px' }}>
                {/* Thumbnail */}
                <div className='relative'>
                  <div className='absolute flex gap-2 items-center top-0 left-0 bg-[#0c0c0cd0] px-2 py-0.5 h-full w-[100px]'>
                    <h2 className='text-center w-full text-2xl text-neutral-400'>{index + 1}</h2>
                  </div>
                  <img src={item.thumbnail} className='w-full rounded aspect-[16/9]' alt="" />
                  {/* <div className='bg-red-300 w-full rounded aspect-[16/9]'></div> */}
                </div>

                {/* Playlist Video Title */}
                <div className='flex flex-col gap-1 mt-1'>
                  <h1 className='text-md line-clamp-1'>{item.title}</h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Playlist;

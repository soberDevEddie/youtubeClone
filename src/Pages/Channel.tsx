import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GrClose } from 'react-icons/gr';

import { useChannel } from '../Hooks/useChannel';
import ChannelVideosList from '../Components/ChannelVideosList';
import { fetchVideosWithChannels } from '../Utils/videoDetailsHelper';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../Components/Loading';
import ChannelPlaylist from '../Components/ChannelPlaylist';

function Channel() {
  const { channelId } = useParams();
  const { channelInfo, fetchChannelInfo, fetchChannelData, channelVideosList } =
    useChannel();
  const [showDescription, setShowDescription] = useState(false);
  const [category, setCategory] = useState('videos');

  const fetchMoreChannelVideos = async () => {
    fetchChannelData(channelId!, channelVideosList!.nextPageToken!);
  };

  useEffect(() => {
    fetchChannelInfo(channelId!);
    fetchChannelData(channelId!);
  }, []);

  return (
    <div className='relative mb-12'>
      {/* Modal */}
      {showDescription && channelInfo?.description && (
        <div className='z-[10] absolute overflow-hidden bg-neutral-800 rounded-xl left-1/2 top-14 transform -translate-x-1/2'>
          <div className='flex flex-col gap-2 items-end w-[600px] max-h-[500px] p-8 overflow-y-auto'>
            <div className=''>
              <GrClose
                onClick={() => setShowDescription(false)}
                className='text-2xl text-neutral-200'
              />
            </div>
            <p className='text-lg whitespace-pre-line'>
              {channelInfo?.description}
            </p>
          </div>
        </div>
      )}

      <InfiniteScroll
        next={() => fetchMoreChannelVideos()}
        hasMore={true}
        dataLength={channelVideosList.videos.length}
        loader={<Loading />}
      >
        <div className='w-[95%] mx-auto mt-8'>
          <div className='row row-cols-2'>
            {/* image */}
            <div className='col-4'>
              {/* <div className='w-52 aspect-square rounded-full bg-red-300 mx-auto'></div> */}
              <img
                className='w-52 aspect-square rounded-full mx-auto object-cover'
                src={channelInfo?.thumbnail}
                alt=''
              />
            </div>
            {/* details */}
            <div className='col-8'>
              <h1 className='text-4xl font-semibold'>{channelInfo?.title}</h1>
              <div className='flex gap-2 text-neutral-400 text-lg mt-2'>
                <h2>{channelInfo?.customUrl}</h2>
                <h2>{channelInfo?.subCount} Subsribers</h2>
                <h2>{channelInfo?.videoCount} Videos</h2>
              </div>
              {channelInfo?.description && (
                <div className=''>
                  <p className='w-[600px] line-clamp-3 text-neutral-400 whitespace-pre-line'>
                    {channelInfo?.description}
                  </p>
                  <button
                    onClick={() => setShowDescription(!showDescription)}
                    className='font-semibold'
                  >
                    more...
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className='my-3'>
            <button
              onClick={() => setCategory('videos')}
              className={`w-44 tex-xl py-2 font-semibold ${
                category === 'videos' ? 'border-b-2 border-red-600' : ''
              }`}
            >
              Videos
            </button>
            <button
              onClick={() => setCategory('playlists')}
              className={`w-44 tex-xl py-2 font-semibold ${
                category === 'playlists' ? 'border-b-2 border-red-600' : ''
              }`}
            >
              Playlists
            </button>
            <hr />
          </div>

          {category == 'videos' ? (
            <ChannelVideosList channelVideos={channelVideosList!.videos} />
          ) : (
            <ChannelPlaylist  />
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default Channel;

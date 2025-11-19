import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GrClose } from 'react-icons/gr';

import { useChannel } from '../Hooks/useChannel';

function Channel() {
  const { channelId } = useParams();
  const { channelInfo, fetchChannelInfo } = useChannel();
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    fetchChannelInfo(channelId!);
  }, []);

  return (
    <div className='relative'>
      {showDescription &&
        channelInfo?.description && (
          <div className='absolute flex flex-col items-end gap-2 bg-neutral-800 rounded-xl w-[600px] px-8 py-8 left-1/2 top-1/2 transform -translate-x-1/2 z-10'>
            <GrClose
              className='text-2xl text-neutral-200'
              onClick={() => setShowDescription(false)}
            />
            <p className='text-lg whitespace-pre-line'>
              {channelInfo?.description}
            </p>
          </div>
        )}

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
      </div>
    </div>
  );
}

export default Channel;

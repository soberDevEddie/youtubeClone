import { useState } from 'react';
import { FaThumbsUp, FaShareSquare } from 'react-icons/fa';

import type { HomeVideoCardType } from '../Utils/Types';
import { Link } from 'react-router-dom';

function VideoDetails({ details }: { details?: HomeVideoCardType }) {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className='flex flex-col'>
      {/* Video Title */}
      <h2 className='text-xl font-semibold mb-2'>{details?.videoTitle}</h2>

      {/* Channel Section */}
      <div className='flex items-center justify-between'>
        {/* Channel info */}
        <div className='flex items-center gap-3'>
          {/* <div className='w-10 h-10 rounded-full bg-pink-300'></div> */}
          <Link to={`/channel/${details?.channelInfo.id}`}>
            <img
              src={details?.channelInfo.image}
              className='w-10 h-10 rounded-full object-cover hover:scale-[108%] duration-200 ease-in-out'
              alt=''
            />
          </Link>
          <div className='flex flex-col'>
            <h3 className='text-base font-semibold'>
              {details?.channelInfo.name}
            </h3>
            <p className='text-sm text-gray-400'>
              {details?.channelInfo.subCount} subscribers
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex items-center gap-2 cursor-pointer'>
          <div className='flex items-center bg-neutral-800 rounded-full px-3 py-1 gap-2'>
            <FaThumbsUp className='text-sm' />
            <span className='text-md'>{details?.videoLikes}</span>
          </div>

          <div className='flex items-center bg-neutral-800 rounded-full px-3 py-1 gap-2'>
            <FaShareSquare className='text-sm' />
            <span className='text-md'>share</span>
          </div>
        </div>
      </div>
      {/* Description */}

      <div className='text-lg bg-neutral-700 px-3 py-2 rounded-xl '>
        <p
          className={`whitespace-pre-line ${
            showDescription ? '' : `line-clamp-3`
          }`}
        >
          {details?.videoDescription}
        </p>
        {!showDescription ? (
          <button onClick={() => setShowDescription(true)}>...more</button>
        ) : (
          <button onClick={() => setShowDescription(false)}>...less</button>
        )}
      </div>
    </div>
  );
}

export default VideoDetails;

import { useState } from 'react';
import { FaThumbsUp, FaShareSquare } from 'react-icons/fa';

function VideoDetails() {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className='flex flex-col'>
      {/* Video Title */}
      <h1 className='text-xl font-semibold mb-2'>Video Title</h1>

      {/* Channel Section */}
      <div className='flex items-center justify-between'>
        {/* Channel info */}
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-full bg-pink-300'></div>
          <div className='flex flex-col'>
            <h2 className='text-base font-semibold'>Channel Name</h2>
            <p className='text-sm text-gray-400'>Sub Count</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex items-center gap-2 cursor-pointer'>
          <div className='flex items-center bg-neutral-800 rounded-full px-3 py-1 gap-2'>
            <FaThumbsUp className='text-sm' />
            <span className='text-sm'>Video Likes</span>
          </div>

          <div className='flex items-center bg-neutral-800 rounded-full px-3 py-1 gap-2'>
            <FaShareSquare className='text-sm' />
            <span className='text-sm'>share</span>
          </div>
        </div>
      </div>
      {/* Description */}

      <div className='text-lg bg-neutral-700 px-3 py-2 rounded-xl '>
        <p className={`${showDescription ? '' : `line-clamp-3`}`}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
          fugit in vero quidem dolorem dignissimos totam! Excepturi iure
          quisquam vel, voluptates possimus explicabo commodi adipisci
          recusandae ipsa deleniti dolores autem voluptatibus ducimus temporibus
          distinctio natus, sit, rerum dicta beatae harum. Mollitia repudiandae
          recusandae a. Impedit modi sapiente atque deleniti nobis!
        </p>
        {!showDescription ? <button onClick={() => setShowDescription(true)}>...more</button> : 
        <button onClick={() => setShowDescription(false)}>...less</button>
        }
      </div>
    </div>
  );
}

export default VideoDetails;

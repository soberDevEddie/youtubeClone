import { FaList } from 'react-icons/fa';
import type { ChannelPlaylistType } from '../Utils/Types';

function ChannelPlaylistCard({ item }: { item: ChannelPlaylistType }) {
  return (
    <div className='col flex flex-col'>
      {/* Thumbnail */}
      <div className='relative'>
        <div className='absolute flex bottom-2 gap-2 items-center right-2 bg-[#0c0c0cd0] px-2 py-0.5 rounded '>
          <FaList />
          <h2>{item.videoCount}</h2>
        </div>
        {/* <div className='bg-red-300 w-[300px] rounded aspect-[16/9]'></div> */}
        <img
          src={item.thumbnail}
          className='bg-red-300 w-[300px] object-cover rounded aspect-[16/9]'
          alt=''
        />
      </div>

      {/* Title */}

      <div className='flex flex-col gap-1 mt-1'>
        <h1 className='text-md line-clamp-1'>
          {/* {item.videoTitle} */}
          {item.title}
        </h1>
      </div>
    </div>
  );
}

export default ChannelPlaylistCard;

import { Link } from 'react-router-dom';
import type { HomeVideoCardType } from '../Utils/Types';

function MiniCard({ item }: { item: HomeVideoCardType }) {
  return (
    <Link to={`/watch/${item.videoId}/${item.channelInfo.id}`}>
    <div className='flex gap-3 hover:scale-[102%] duration-200 ease-in-out'>
      <div className='relative h-22 min-w-fit'>
        <span className='absolute bottom-1 right-1 bg-[#0c0c0cd0] px-2 py-0.5 rounded'>
          {item.videoDuration}
        </span>
        {/* <div className='bg-red-200 w-40 aspect-[16/9] rounded'></div> */}
        <img
          src={item.videoThumbnail}
          className='max-w-40 aspect-[16/9] rounded object-cover'
          alt=''
          />
      </div>
      <div className=''>
        <h4 className=''>{item.videoTitle}</h4>
        <div className='text-sm text-gray-400'>
          <h3>{item.channelInfo.name}</h3>
          <div className='flex gap-1 items-center'>
            <h3>{item.videoViews}</h3>
            <span className='w-[4px] h-[4px] bg-white text-gray-400'></span>
            <h3>{item.videoAge}</h3>
          </div>
        </div>
      </div>
    </div>
          </Link>
  );
}

export default MiniCard;

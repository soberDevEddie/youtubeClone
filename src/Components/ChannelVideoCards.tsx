import { Link } from 'react-router-dom';
import type { HomeVideoCardType } from '../Utils/Types';

function ChannelVideoCards({ item }: { item: HomeVideoCardType }) {
  return (
    <Link to={`/watch/${item.videoId}/${item.channelInfo.id}`}>
      <div className='col flex flex-col hover:scale-[105%] duration-300 ease-in-out'>
        {/* Thumbnail */}
        <div className='relative'>
          <div className='absolute bottom-2 right-2 bg-[#0c0c0cd0] px-2 py-0.5 rounded '>
            {item.videoDuration}
          </div>
          {/* <div className='bg-red-300 w-[300px] rounded aspect-[16/9]'></div> */}
          <img
            src={item.videoThumbnail}
            className='bg-red-300 w-[300px] object-cover rounded aspect-[16/9]'
            alt=''
          />
        </div>

        {/* Title */}

        <div className='flex flex-col gap-1 mt-1'>
          <h1 className='text-md line-clamp-1'>{item.videoTitle}</h1>
          <div className='flex gap-3 text-sm text-gray-400'>
            <h2>{item.videoViews}</h2>
            <h2>{item.videoAge}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ChannelVideoCards;

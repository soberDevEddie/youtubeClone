import { Link } from 'react-router-dom';
import type { HomeVideoCardType } from '../Utils/Types';

function Card({ data }: { data: HomeVideoCardType }) {
  return (
    <div className='flex flex-col gap-3 pb-3 hover:scale-[102%] duration-200 ease-in-out'>
      {/* thumbnail */}
      <div className='relative'>
        <Link
          to={`/watch/${data.videoId}/${data.channelInfo.id}`}
          className='block'
        >
          <img
            src={data.videoThumbnail}
            alt='Video Thumbnail'
            className='aspect-[16/9] object-cover rounded-xl w-full'
          />
        </Link>
        <span className='absolute sm:bottom-3 bottom-2 sm:right-3 right-2 bg-[#0c0c0cd0] px-2 py-0.5 text-sm rounded'>
          {data.videoDuration}
        </span>
      </div>
      {/* details */}
      <div className='flex gap-2'>
        <Link to={`/channel/${data.channelInfo.id}`} className='flex-shrink-0'>
          <img
            src={data.channelInfo.image}
            alt='Channel Logo'
            className='aspect-square rounded-full h-12 w-12 object-cover hover:scale-[110%] duration-300 ease-in-out'
          />
        </Link>
        <div className='flex flex-col overflow-hidden'>
          <h3 className='sm:text-lg text-md line-clamp-2'>{data.videoTitle}</h3>
          <div className='sm:text-md text-sm'>
            <h4>{data.channelInfo.name}</h4>
            <div className='flex gap-1'>
              <span>{data.videoViews}</span>
              <span>.</span>
              <span>{data.videoAge}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

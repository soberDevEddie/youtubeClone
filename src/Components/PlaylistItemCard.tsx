import { Link } from 'react-router-dom';
import type { PlaylistVideoType } from '../Utils/Types';

function PlaylistItemCard({
  item,
  index,
  channelId,
}: {
  item: PlaylistVideoType;
  index: number;
  channelId: string;
}) {
  return (
    <Link className='col-xl-3 col-lg-4 col-md-6 col-sm-12 d-flex  justify-content-center' to={`/watch/${item.id}/${channelId}`}>
      <div className=' hover:scale-[105%] duration-300 ease-in-out'>
        <div className='w-100' style={{ maxWidth: '300px' }}>
          {/* Thumbnail */}
          <div className='relative'>
            <div className='absolute flex gap-2 items-center top-0 left-0 bg-[#0c0c0cd0] px-2 py-0.5 h-full w-[100px] '>
              <h2 className='text-center w-full text-2xl text-neutral-400'>
                {index + 1}
              </h2>
            </div>
            <img
              src={item.thumbnail}
              className='w-full rounded aspect-[16/9]'
              alt=''
            />
            {/* <div className='bg-red-300 w-full rounded aspect-[16/9]'></div> */}
          </div>

          {/* Playlist Video Title */}
          <div className='flex flex-col gap-1 mt-1'>
            <h1 className='text-md line-clamp-1'>{item.title}</h1>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PlaylistItemCard;

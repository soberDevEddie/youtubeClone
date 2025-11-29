import type { HomeVideoCardType } from '../Utils/Types';
import ChannelVideoCards from './ChannelVideoCards';

function ChannelVideosList({
  channelVideos,
}: {
  channelVideos: HomeVideoCardType[];
}) {
  return (
    <div className='row row-cols-4 gap-y-4'>
      {channelVideos &&
        channelVideos.map((item: HomeVideoCardType, idx) => (
          <ChannelVideoCards key={idx} item={item} />
        ))}
    </div>
  );
}

export default ChannelVideosList;

import type { HomeVideoCardType } from '../Utils/Types';
import ChannelVideoCards from './ChannelVideoCards';

function ChannelVideosList({
  channelVideosList,
}: {
  channelVideosList: HomeVideoCardType[];
}) {
  return (
    <div className='row row-cols-4 gap-y-4'>
      {channelVideosList &&
        channelVideosList.map((item: HomeVideoCardType, ind) => (
          <ChannelVideoCards key={ind} item={item} />
        ))}
    </div>
  );
}

export default ChannelVideosList;

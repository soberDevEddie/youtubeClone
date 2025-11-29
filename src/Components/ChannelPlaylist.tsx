import type { ChannelPlaylistType } from '../Utils/Types';
import ChannelPlaylistCard from './ChannelPlaylistCard';

function ChannelPlaylist({
  channelPlaylists,
}: {
  channelPlaylists: ChannelPlaylistType[];
}) {
  return (
    <div className='row row-cols-4 gap-y-4'>
      {channelPlaylists?.map((item: ChannelPlaylistType) => (
        <ChannelPlaylistCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ChannelPlaylist;
 
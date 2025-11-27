import ChannelVideoCards from './ChannelVideoCards';

function ChannelVideosList() {
  return (
    <div className='row row-cols-4 gap-y-4'>
      {[...Array(12)].map((items: any) => (
        <ChannelVideoCards key={items} />
      ))}
    </div>
  );
}

export default ChannelVideosList;

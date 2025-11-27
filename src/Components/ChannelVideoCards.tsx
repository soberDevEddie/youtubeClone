function ChannelVideoCards({item}: {item: HomeVideoCardType}) {
  return (
    <div className='col flex flex-col'>
      {/* Thumbnail */}
      <div className='relative'>
        <div className='absolute bottom-2 right-2 bg-[#0c0c0cd0] px-2 py-0.5 rounded '>
          duration
        </div>
        <div className='bg-red-300 w-[300px] rounded aspect-[16/9]'></div>
      </div>

      {/* Title */}

      <div className='flex flex-col gap-1 mt-1'>
        <h1 className='text-md line-clamp-1'>Video title</h1>
        <div className='flex gap-3 text-sm text-gray-400'>
          <h2>views</h2>
          <h2>age</h2>
        </div>
      </div>
    </div>
  );
}

export default ChannelVideoCards;

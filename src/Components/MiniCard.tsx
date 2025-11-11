function MiniCard() {
  return (
    <div className='flex gap-3'>
      <div className="relative h-22">
        <span className="absolute bottom-1 right-1 bg-[#0c0c0cd0] px-2 py-0.5 rounded">duration</span>
        <div className='bg-red-200 w-40 aspect-[16/9] rounded'></div>
      </div>
      <div className=''>
        <h3 className=''>Video Title</h3>
        <div className='text-sm text-gray-400'>
          <h3>Channel Name</h3>
          <div className='flex gap-1 items-center'>
            <h3>Views</h3>
            <span className='w-[4px] h-[4px] bg-white text-gray-400'></span>
            <h3>Age</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiniCard;

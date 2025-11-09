function Card() {
  return (
    <div className='flex flex-col gap-3 pb-3'>
      {/* thumbanail */}
      <div className="relative">
        <div className="bg-red-300 aspect-[16/9] rounded-xl"></div>
        <span className="absolute bottom-3 right-3 bg-[#0c0c0cd0] px-2 py-0.5 text-sm rounded">duration</span>
      </div>
      {/* details */}
      <div className="flex gap-2">
        <div className="bg-red-300 aspect-[1/1] rounded-full h-12"></div>
        <div className="flex flex-col">
          <h3 className="text-lg">Video Title</h3>
          <div className="text-md">
            <h4>Channel Name</h4>
            <div className="flex gap-1">
              <span>Views</span>
              <span>.</span>
              <span>Video Age</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card

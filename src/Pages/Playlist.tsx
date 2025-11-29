import { useParams } from 'react-router-dom';

function Playlist() {
  // const { channelId, playlistId } = useParams();

  return <div className='w-[90%] mx-auto mt-8'>
          <div className='row row-cols-2 bg-neutral-900 p-5 rounded-xl'>
            {/* image */}
            <div className='col-4'>
              <div className=' aspect-[16/9] object-cover bg-red-300 mx-auto'></div>
              {/* <img
                className='w-52 aspect-square rounded-full mx-auto object-cover'
                src={channelInfo?.thumbnail}
                alt=''
              /> */}
            </div>
            {/* details */}
            <div className='col-8'>
              <h1 className='text-4xl font-semibold'>Playlist Title</h1>
              <div className='flex gap-2 text-neutral-400 text-lg mt-2'>
              </div>
              {/* {channelInfo?.description && ( */}
                <div className=''>
                  <p className='w-[600px] line-clamp-3 text-neutral-400 whitespace-pre-line'>
                    Playlist description
                  </p>
                  <button
                    // onClick={() => setShowDescription(!showDescription)}
                    className='font-semibold'
                  >
                    more...
                  </button>
                </div>
              {/* )} */}
            </div>
          </div>

          

          
        </div>
}

export default Playlist;

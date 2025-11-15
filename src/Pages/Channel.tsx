import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_API_KEY;

function Channel() {
  const { channelId } = useParams();

  const fetchChannelInfo = async () => {
    try {
      const channelInfoResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${channelId}`
      );

      console.log(channelInfoResponse);
    } catch (error) {}
  };

  useEffect(() => {
    fetchChannelInfo();
  }, []);

  return (
    <div className='w-[95%] mx-auto mt-8'>
      <div className='row row-cols-2'>
        {/* image */}
        <div className='col-4'>
          <div className='w-52 aspect-square rounded-full bg-red-300 mx-auto'></div>
        </div>
        {/* details */}
        <div className='col-8'>
          <h1 className='text-4xl font-semibold'>Channel title</h1>
          <div className='flex gap-2 text-neutral-400 text-lg mt-2'>
            <h2>Custom Url</h2>
            <h2>Subcount</h2>
            <h2>Video Count</h2>
          </div>
          <div className=''>
            <p className='w-[600px] line-clamp-3 text-neutral-400 whitespace-pre-line'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate illo expedita aperiam nisi placeat blanditiis
              exercitationem earum ipsum ad, possimus enim sunt consequatur nam
              similique culpa provident ea nulla tenetur?
            </p>
            <button className='font-semibold'>more...</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Channel;

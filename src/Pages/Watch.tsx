import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

import MiniCard from '../Components/MiniCard';
import VideoDetails from '../Components/VideoDetails';
import type { HomeVideoCardType } from '../Utils/Types';
import { fetchVideosWithChannels } from '../Utils/videoDetailsHelper';

const API_KEY = import.meta.env.VITE_API_KEY;

function Watch() {
  const { videoId } = useParams();

  console.log(`Video ID, ${videoId}`);

  const [details, setDetails] = useState<HomeVideoCardType>();

  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${videoId}`
      );

      console.log(`res`, response.data.items);

      const items = response.data.items;

      const videoDetails = await fetchVideosWithChannels(items);

      setDetails(videoDetails[0]);
    } catch (error) {}
  };

  useEffect(() => {
    console.log(`Details`, details);
  }, [details]);

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className='w-[95%] mx-auto mt-6 mb-12'>
      <div className='row'>
        {/* Col 1 */}
        <div className='col-8'>
          {/* <div className='w-full aspect-[16/9] bg-red-400'></div> */}
          <iframe
            className='w-full aspect-[16/9]'
            src={`https://www.youtube.com/embed/${details?.videoId}?autoplay=1`}
            title='Youtube Video Player'
            allow='autoplay; picture-inpicture;'
            allowFullScreen
          ></iframe>
          <VideoDetails details={details} />
        </div>
        {/* Col 2 */}
        <div className='col-4 flex flex-col gap-3'>
          {[...Array(12)].map((item, ind) => (
            <MiniCard key={ind} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Watch;

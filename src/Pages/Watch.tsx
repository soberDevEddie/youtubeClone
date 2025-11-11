import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

import MiniCard from '../Components/MiniCard';
import VideoDetails from '../Components/VideoDetails';
import type { HomeVideoCardType } from '../Utils/Types';

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

      const videoData = items.map((item: any) => ({
        videoId: item.id,
        videoTitle: item.snippet.title,
        videoThumbnail: item.snippet.thumbnails.standard.url,
        videoDuration: item.contentDetails.duration,
        videoViews: item.statistics.viewCount,
        videoAge: item.snippet.publishedAt,
        channelInfo: {
          id: item.snippet.channelId,
          name: item.snippet.channelTitle,
        },
      }));

      setDetails(videoData[0]);
      // const item = response.data.items[0];

      // setDetails({
      //   videoId: item.id,
      //   videoTitle: item.snippet.title,
      //   videoThumbnail: item.snippet.thumbnails.standard.url,
      //   videoDuration: item.contentDetails.duration,
      //   videoViews: item.statistics.viewCount,
      //   videoAge: item.snippet.publishedAt,
      //   channelInfo: {
      //     id: item.snippet.channelId,
      //     name: item.snippet.channelTitle,
      //   },
      // });
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
          <div className='w-full aspect-[16/9] bg-red-400'></div>
          <VideoDetails />
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

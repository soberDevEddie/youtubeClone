import { useEffect, useState } from 'react';
import axios from 'axios';

import Card from '../Components/Card';
import type { HomeVideoCard } from '../utils/types';

const API_KEY = import.meta.env.VITE_API_KEY;

// console.log(API_KEY);

function Home() {
  const [homeVideos, setHomeVideos] = useState<HomeVideoCard[]>([]);

  const fetchHomeVideos = async () => {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet,statistics,contentDetails&chart=mostPopular&maxResults=20`
    );
    // console.log(response.data);

    const videos = response.data.items.map((item: any) => {
      return {
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
      };
    });
    setHomeVideos(videos);
  };

  useEffect(() => {
    fetchHomeVideos();
  }, []);

  useEffect(() => {
    console.log(homeVideos);
  }, [homeVideos]);

  return (
    <div className='row row-cols-3 w-[95%] mx-auto mt-6'>
      {[...Array(12)].map((item) => (
        <Card />
      ))}
    </div>
  );
}

export default Home;

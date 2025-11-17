import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { ChannelInfoType } from '../Utils/Types';

const API_KEY = import.meta.env.VITE_API_KEY;

function Channel() {
  const { channelId } = useParams();

  const [channelInfo, setChannelInfo] = useState<ChannelInfoType | null>(null);

  const fetchChannelInfo = async () => {
    try {
      const channelInfoResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${channelId}`
      );

      // console.log(channelInfoResponse);

      const items = channelInfoResponse.data.items;
      // console.log(items);

      const channelInfoData = items.map((item: any) => ({
        id: items.id,
        thumbnail: item.snippet.thumbnails.high.url,
        title: item.snippet.title,
        customUrl: item.snippet.customUrl,
        description: item.snippet.description,
        subCount: item.statistics.subscriberCount,
        videoCount: item.statistics.videoCount,
      }));

      // console.log(channelInfoData);

      setChannelInfo(channelInfoData[0]);
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
          {/* <div className='w-52 aspect-square rounded-full bg-red-300 mx-auto'></div> */}
          <img className='w-52 aspect-square rounded-full mx-auto object-cover' src={channelInfo?.thumbnail} alt="" />
        </div>
        {/* details */}
        <div className='col-8'>
          <h1 className='text-4xl font-semibold'>{channelInfo?.title}</h1>
          <div className='flex gap-2 text-neutral-400 text-lg mt-2'>
            <h2>{channelInfo?.customUrl}</h2>
            <h2>{channelInfo?.subCount} Subsribers</h2>
            <h2>{channelInfo?.videoCount} Videos</h2>
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

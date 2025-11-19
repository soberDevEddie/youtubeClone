import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import MiniCard from '../Components/MiniCard';
import VideoDetails from '../Components/VideoDetails';
import type { HomeVideoCardType } from '../Utils/Types';
import { fetchVideosWithChannels } from '../Utils/videoDetailsHelper';
import Comments from '../Components/Comments';
import {
  getActivities,
  getActivitiesVideos,
  getVideoDetails,
} from '../Utils/api';


function Watch() {
  const { videoId, channelId } = useParams();
  const [activities, setActivities] = useState<HomeVideoCardType[]>();

  // console.log(`Video ID, ${videoId}`);

  const [details, setDetails] = useState<HomeVideoCardType>();

  const fetchDetails = async () => {
    try {
      const res = await getVideoDetails(videoId!);

      // console.log(`res`, res.data.items);

      const videoDetails = await fetchVideosWithChannels(res);

      setDetails(videoDetails[0]);
    } catch (error) {}
  };

  const fetchActivities = async () => {
    try {
      const res = await getActivities(channelId!);

      const videoIds: string[] = [];

      res.forEach(
        (item: {
          contentDetails: {
            upload?: {
              videoId: string;
            };
            playlistItem?: {
              resourceId: { videoId: string };
            };
          };
        }) => {
          if (item.contentDetails.upload) {
            videoIds.push(item.contentDetails.upload.videoId);
          } else if (item.contentDetails.playlistItem?.resourceId.videoId) {
            videoIds.push(item.contentDetails.playlistItem.resourceId.videoId);
          }
        }
      );

      // console.log(`Activies`, response);
      // console.log(`Ids`, videoIds);

      const vidReponse = await getActivitiesVideos(videoIds!);

      // console.log(`Videos Reponse`, vidReponse);

      const videosArray = await fetchVideosWithChannels(vidReponse.items);

      // console.log('Video Array', videosArray);

      setActivities(videosArray);
    } catch (error) {}
  };

  useEffect(() => {
    // console.log(`Details`, details);
  }, [details]);

  useEffect(() => {
    fetchDetails();
    fetchActivities();
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
          <Comments videoId={details?.videoId} />
        </div>
        {/* Col 2 */}
        <div className='col-4 flex flex-col gap-3'>
          {activities?.map((item, ind) => (
            <MiniCard key={ind} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Watch;

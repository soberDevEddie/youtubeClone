import { useSearchParams } from 'react-router-dom';
import { getActivitiesVideos, getSearchVideos } from '../Utils/api';
import { useEffect } from 'react';
import { fetchVideosWithChannels } from '../Utils/videoDetailsHelper';

function Search() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');

  const fetchSearch = async () => {
    try {
      const searchVideosResponse = await getSearchVideos(searchQuery!);
      // console.log('searchVideosResponse', searchVideosResponse);

      const videoIds: string[] = [];

      searchVideosResponse.items.forEach(
        (item: { id: { videoId: string } }) => {
          if (item.id.videoId) {
            videoIds.push(item.id.videoId);
          }
        }
      );
      const searchVideosData = await getActivitiesVideos(videoIds);
      // console.log('searchVideosData', searchVideosData);

      const videosData = await getActivitiesVideos(videoIds);
      const videosArray = await fetchVideosWithChannels(searchVideosData.items);
      console.log('videosArray', videosArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSearch();
  }, []);
  return <div>{searchQuery}</div>;
}

export default Search;

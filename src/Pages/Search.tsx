import { useSearchParams } from 'react-router-dom';
import { getActivitiesVideos, getSearchVideos } from '../Utils/api';
import { useEffect, useState } from 'react';
import { fetchVideosWithChannels } from '../Utils/videoDetailsHelper';
import type { HomeVideoCardType } from '../Utils/Types';
import Card from '../Components/Card';

function Search({ setSearch }: { setSearch: (q: string) => void }) {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');
  const [searchList, setSearchList] = useState<HomeVideoCardType[] | null>();

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
      // console.log('videosArray', videosArray);

      setSearchList(videosArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      setSearchList(null);
      fetchSearch();
    }
    return () => {
      setSearchList(null);
      setSearch('');
    };
  }, [searchQuery]);

  return (
    <div className='row row-cols-3 w-[95%] mx-auto mt-6'>
      {searchList?.map((item: HomeVideoCardType) => (
        <Card data={item} />
      ))}
    </div>
  );
}

export default Search;

import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import Card from '../Components/Card';
import { useHome } from '../Hooks/useHome';

function Home({
  categoryId,
  filter,
}: {
  filter: string;
  categoryId: string | null;
}) {
  const { homeVideos, fetchHomeVideos } = useHome();

  useEffect(() => {
    fetchHomeVideos(filter, categoryId, homeVideos[filter].nextPageToken);
  }, [categoryId]);

  useEffect(() => {
    // console.log(homeVideos);
  }, [homeVideos]);

  return (
    <InfiniteScroll
      next={() =>
        fetchHomeVideos(filter, categoryId, homeVideos[filter].nextPageToken)
      }
      hasMore={true}
      dataLength={homeVideos[filter].videos.length}
      loader={<h4>Loading...</h4>}
    >
      <div className='row row-cols-3 w-[95%] mx-auto mt-6'>
        {homeVideos[filter].videos?.map((item) => (
          <Card key={item.videoId} data={item} />
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default Home;

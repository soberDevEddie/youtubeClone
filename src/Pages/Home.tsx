import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import Card from '../Components/Card';
import { useHome } from '../Hooks/useHome';
import Loading from '../Components/Loading';

function Home({
  categoryId,
  filter,
}: {
  filter: string;
  categoryId: string | null;
}) {
  const { homeVideos, fetchHomeVideos, error } = useHome();

  useEffect(() => {
    fetchHomeVideos(filter, categoryId, homeVideos[filter].nextPageToken);
  }, [categoryId]);

  useEffect(() => {
    // console.log(homeVideos);
  }, [homeVideos]);

  return (
    <div>
      {/* <Loading/> */}
      {error ? (
        <div className='text-center mt-8 text-xl text-red-500 font-semibold'>{error}</div>
      ) : (
        <InfiniteScroll
          next={() =>
            fetchHomeVideos(
              filter,
              categoryId,
              homeVideos[filter].nextPageToken
            )
          }
          hasMore={true}
          dataLength={homeVideos[filter].videos.length}
          loader={<Loading/>}
        >
          <div className='row row-cols-3 w-[95%] mx-auto mt-6'>
            {homeVideos[filter].videos?.map((item) => (
              <Card key={item.videoId} data={item} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}

export default Home;

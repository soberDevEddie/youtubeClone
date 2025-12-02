import { useSearchParams } from 'react-router-dom';
import { getSearchVideos } from '../Utils/api';
import { useEffect } from 'react';

function Search() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');

  const fetchSearch = async () => {
    try {
      const searchVideosResponse = await getSearchVideos(searchQuery!);
      console.log("searchVideosResponse", searchVideosResponse);
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

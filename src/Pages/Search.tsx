import { useSearchParams } from "react-router-dom"

function Search() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');

  return (
    <div>
      {searchQuery}
    </div>
  )
}

export default Search

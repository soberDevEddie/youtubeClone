import { MdHome, MdMusicNote, MdOutlineSportsFootball,MdOutlineSportsEsports,MdOutlineTheaters,MdLightbulb  } from "react-icons/md";
import { FaRegNewspaper } from "react-icons/fa";
import { TbHanger } from "react-icons/tb";


const mainLinks = [{
  icon: <MdHome className="text-xl" />,
  name: 'Home',
  filterTag: 'home'
}]

const categoriesLinks = [
  {
  icon: <MdMusicNote className="text-xl"/>,
  name: 'Music',
  filterTag: 'music'
},
  {
  icon: <MdOutlineSportsFootball className="text-xl"/>,
  name: 'Sports',
  filterTag: 'sports'
},
  {
  icon: <MdOutlineSportsEsports className="text-xl"/>,
  name: 'Gaming',
  filterTag: 'gaming'
},
  {
  icon: <MdOutlineTheaters className="text-xl"/>,
  name: 'Movies',
  filterTag: 'movies'
},
  {
  icon: <MdOutlineSportsEsports className="text-xl"/>,
  name: 'Gaming',
  filterTag: 'gaming'
},
]



function Sidebar() {
  return (
    <>
      Sidebar
    </>
  )
}

export default Sidebar

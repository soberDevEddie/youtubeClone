import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  MdHome,
  MdMusicNote,
  MdOutlineSportsFootball,
  MdOutlineSportsEsports,
  MdOutlineTheaters,
  MdLightbulb,
} from 'react-icons/md';
import { FaRegNewspaper, FaYoutube } from 'react-icons/fa';
import { TbHanger } from 'react-icons/tb';
import { GiHamburgerMenu } from 'react-icons/gi';

const API_KEY = import.meta.env.VITE_API_KEY;

function Sidebar({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: (filter: string) => void;
}) {
  const [categoriesData, setCategoriesData] = useState<any[]>([]);

  const mainLinks = [
    {
      icon: <MdHome className='text-xl' />,
      name: 'Home',
      filterTag: 'home',
      categoryId: null,
    },
  ];

  const categoriesLinks = [
    {
      icon: <MdMusicNote className='text-xl' />,
      name: 'Music',
      filterTag: 'music',
      categoryId: null,
    },
    {
      icon: <MdOutlineSportsFootball className='text-xl' />,
      name: 'Sports',
      filterTag: 'sports',
      categoryId: categoriesData.find(
        (item: { snippet: { title: string } }) => item.snippet.title === 'Music'
      )?.id,
    },
    {
      icon: <MdOutlineSportsEsports className='text-xl' />,
      name: 'Gaming',
      filterTag: 'gaming',
      categoryId: categoriesData.find(
        (item: { snippet: { title: string } }) =>
          item.snippet.title === 'Gaming'
      )?.id,
    },
    {
      icon: <MdOutlineTheaters className='text-xl' />,
      name: 'Movies',
      filterTag: 'movies',
      categoryId: categoriesData.find(
        (item: { snippet: { title: string } }) =>
          item.snippet.title === 'Movies'
      )?.id,
    },
    {
      icon: <FaRegNewspaper className='text-xl' />,
      name: 'News',
      filterTag: 'news',
      categoryId: categoriesData.find(
        (item: { snippet: { title: string } }) =>
          item.snippet.title === 'News & Politics'
      )?.id,
    },
    {
      icon: <TbHanger className='text-xl' />,
      name: 'Fashion',
      filterTag: 'fashion',
      categoryId: categoriesData.find(
        (item: { snippet: { title: string } }) =>
          item.snippet.title === 'Howto & Style'
      )?.id,
    },
    {
      icon: <MdLightbulb className='text-xl' />,
      name: 'Education',
      filterTag: 'education',
      categoryId: categoriesData.find(
        (item: { snippet: { title: string } }) =>
          item.snippet.title === 'Education'
      )?.id,
    },
  ];

  const fetchAndSetCategories = async () => {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videoCategories?key=${API_KEY}&part=snippet&regionCode=us`
    );
    // console.log(response.data);
    setCategoriesData(response.data);
  };

  useEffect(() => {
    fetchAndSetCategories();
  }, []);

  const toggleFilter = (filterTag: string, categoryId: string) => {
    setFilter(filterTag);
  };

  return (
    <div
      data-bs-toggle='offcanvas'
      className='w-full h-full bg-[#0c0c0c] text-white'
    >
      <div className='w-[85%] mx-auto flex items-center gap-8 h-14'>
        <a
          className='btn'
          data-bs-toggle='offcanvas'
          href='#offcanvasExample'
          role='button'
          aria-controls='offcanvasExample'
        >
          <GiHamburgerMenu className='text-xl' />
        </a>

        <div className='flex items-center gap-1'>
          <FaYoutube className='text-3xl text-red-600' />
          <span className='text-xl'>YouTube</span>
        </div>
      </div>
      <ul className='border-b-[1px] border-zinc-700'>
        {mainLinks.map(({ icon, name, filterTag, categoryId }) => (
          <li
            key={name}
            className={`pl-6 py-3 hover:bg-neutral-800 ${
              filter == filterTag ? 'bg-neutral-800' : ''
            }`}
            onClick={() => toggleFilter(filterTag)}
          >
            <h1 className='flex items-center gap-5'>
              {icon}
              <span className='text-sm'>{name}</span>
            </h1>
          </li>
        ))}
      </ul>
      <ul className='border-b-[1px] border-zinc-700'>
        {categoriesLinks.map(({ icon, name, filterTag, categoryId }) => (
          <li
            key={name}
            className={`pl-6 py-3 hover:bg-neutral-800 ${
              filter == filterTag ? 'bg-neutral-800' : ''
            }`}
            onClick={() => toggleFilter(filterTag)}
          >
            <h1 className='flex items-center gap-5'>
              {icon}
              <span className='text-sm'>{name}</span>
            </h1>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;

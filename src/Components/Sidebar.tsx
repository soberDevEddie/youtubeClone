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

const mainLinks = [
  {
    icon: <MdHome className='text-xl' />,
    name: 'Home',
    filterTag: 'home',
  },
];

const categoriesLinks = [
  {
    icon: <MdMusicNote className='text-xl' />,
    name: 'Music',
    filterTag: 'music',
  },
  {
    icon: <MdOutlineSportsFootball className='text-xl' />,
    name: 'Sports',
    filterTag: 'sports',
  },
  {
    icon: <MdOutlineSportsEsports className='text-xl' />,
    name: 'Gaming',
    filterTag: 'gaming',
  },
  {
    icon: <MdOutlineTheaters className='text-xl' />,
    name: 'Movies',
    filterTag: 'movies',
  },
  {
    icon: <MdOutlineSportsEsports className='text-xl' />,
    name: 'Gaming',
    filterTag: 'gaming',
  },
  {
    icon: <FaRegNewspaper className='text-xl' />,
    name: 'News',
    filterTag: 'news',
  },
  {
    icon: <TbHanger className='text-xl' />,
    name: 'Fashion',
    filterTag: 'fashion',
  },
  {
    icon: <MdLightbulb className='text-xl' />,
    name: 'Education',
    filterTag: 'education',
  },
];

function Sidebar() {
  return (
    <div data-bs-toggle='offcanvas' className='w-full h-full bg-[#0c0c0c] text-white'>
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
        {mainLinks.map(({ icon, name, filterTag }) => (
          <li key={name} className='pl-6 py-3 hover:bg-neutral-800'>
            <h1 className='flex items-center gap-5'>
              {icon}
              <span className='text-sm'>{name}</span>
            </h1>
          </li>
        ))}
      </ul>
      <ul className='border-b-[1px] border-zinc-700'>
        {categoriesLinks.map(({ icon, name, filterTag }) => (
          <li key={name} className='pl-6 py-3 hover:bg-neutral-800'>
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

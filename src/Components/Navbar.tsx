import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaSearch, FaYoutube } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';

function Navbar({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (q: string) => void;
}) {
  const navigate = useNavigate();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (search.trim()) {
        navigate(`/search?query=${search}`);
      } else {
        navigate('/');
      }
    }
  };

  return (
    <div className='w-full bg-[#0c0c0c] sticky-top'>
      <div className='flex md:gap-0 gap-2 justify-between w-[95%] mx-auto h-14 '>
        <div className='flex items-center md:gap-8 gap-3'>
          <a
            className='btn'
            data-bs-toggle='offcanvas'
            href='#offcanvasExample'
            role='button'
            aria-controls='offcanvasExample'
          >
            <GiHamburgerMenu className='text-3xl sm:text-xl' />
          </a>

          <div
            className='flex items-center gap-1 hover:cursor-pointer'
            onClick={() => navigate('/')}
          >
            <FaYoutube className='text-3xl text-red-600' />
            <span className='sm:text-xl text-lg'>YouTube</span>
          </div>
        </div>
        <div className='flex items-center'>
          <form>
            <div className='flex items-center sm:h-10 h-9 border-[0.6px] border-neutral-700 rounded-full overflow-hidden'>
              <div className='flex items-center sm:pr-5 pr-3 '>
                <input
                  value={search}
                  type='text'
                  placeholder='Search'
                  className='md:w-96 w-full px-3 sm:text-lg text-md text-zinc-300 bg-[#0c0c0c] focus:outline-none placeholder-neutral-500'
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <GrClose
                  onClick={() => setSearch('')}
                  className={`sm:text-lg text-md cursor-pointer text-neutral-400 ${
                    !search ? 'invisible' : 'visible'
                  }`}
                />
              </div>
              <button className='flex justify-center w-16 border-l-[1px] border-neutral-700'>
                <FaSearch className='sm:text-2xl text-xl text-neutral-200' />
              </button>
            </div>
          </form>
        </div> 
        <div className='lg:block hidden'></div>
      </div>
    </div>
  );
}

export default Navbar;

import { GiHamburgerMenu } from 'react-icons/gi';
import { FaSearch, FaYoutube } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';

function Navbar() {
  return (
    <div className='w-full bg-[#0c0c0c]'>
      <div className='flex justify-between w-[95%] mx-auto h-14'>
        <div className='flex items-center gap-8'>
          <GiHamburgerMenu className='text-xl' />
          <div className='flex items-center gap-1'>
            <FaYoutube className='text-3xl text-red-600' />
            <span className='text-xl'>YouTube</span>
          </div>
        </div>
        <div className='flex items-center'>
          <form>
            <div className='flex items-center h-10 border-[0.6px] border-neutral-700 rounded-full overflow-hidden'>
              <div className='flex items-center pr-5 '>
                <input
                  type='text'
                  placeholder='Search'
                  className='w-96 px-3 text-lg text-zinc-300 bg-[#0c0c0c] focus:outline-none placeholder-neutral-500'
                />
                <GrClose className='text-lg cursor-pointer text-neutral-400' />
              </div>
              <button className='flex justify-center w-16 border-l-[1px] border-neutral-700'>
                <FaSearch className='text-2xl text-neutral-200' />
              </button>
            </div>
          </form>
        </div>
        <div className=''>{/* Empty */}</div>
      </div>
    </div>
  );
}

export default Navbar;

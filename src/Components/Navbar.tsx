import { GiHamburgerMenu } from 'react-icons/gi';
import { FaYoutube } from 'react-icons/fa';

function Navbar() {
  return (
    <div className='w-full bg-[#0c0c0c]'>
      <div className='flex'>
        <div className='flex items-center gap-6'>
          <GiHamburgerMenu className='text-xl' />
          <div className='flex items-center'>
            <FaYoutube className='text-3xl'/>
            <span className='text-xl'>YouTube</span>
          </div>
        </div>
        <div className=''></div>
      </div>
    </div>
  );
}

export default Navbar;

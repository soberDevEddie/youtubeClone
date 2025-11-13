import { FaThumbsUp } from 'react-icons/fa';
import type { CommentBodyType } from '../Utils/Types';

function CommentBody({ item }: { item: CommentBodyType }) {
  return (
    <div className='flex gap-2'>
      {/* <div className='bg-red-300 w-10 h-fit aspect-[1/1] rounded-full'></div> */}
      <img
        src={item.authorProfile}
        className='w-10 h-fit aspect-[1/1] rounded-full'
        alt=''
      />
      <div className=''>
        <h5 className='text-md'>{item.authorName}</h5>
        <p className='text-neutral-200 whitespace-pre-line'>
          {item.commentText}
        </p>
        <div className='flex items-centern text-neutral-400 gap-1 cursor-pointer'>
          <FaThumbsUp />
          {item.commentLikes}
        </div>
      </div>
    </div>
  );
}

export default CommentBody;

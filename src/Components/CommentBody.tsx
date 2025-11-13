import { FaThumbsUp } from "react-icons/fa"

function CommentBody() {
  return (
   <div className='flex gap-2'>
          <div className='bg-red-300 w-10 h-fit aspect-[1/1] rounded-full'></div>
          <div className=''>
            <h5 className='text-md'>Channel Name</h5>
            <h5 className='text-neutral-300 whitespace-pre-line'>Comment</h5>
            <div className='flex items-centern text-neutral-400 gap-1 cursor-pointer'>
              <FaThumbsUp />
              Likecount
            </div>
          </div>
        </div>
  )
}

export default CommentBody

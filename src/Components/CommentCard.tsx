import type { CommentBodyType } from '../Utils/Types';

import CommentBody from './CommentBody';

function CommentCard({ comment }: { comment: CommentBodyType }) {
  return (
    <div className='flex flex-col gap-2'>
      <CommentBody item={comment} />
      <div className='px-14 '>
        {[...Array(2)].map(() => (
          <CommentBody item={comment} />
        ))}
      </div>
    </div>
  );
}

export default CommentCard;

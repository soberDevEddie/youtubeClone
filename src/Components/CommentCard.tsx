import { useEffect, useState } from 'react';

import CommentBody from './CommentBody';
import type { CommentBodyType } from '../Utils/Types';
import { getCommentReplies } from '../Utils/api';

function CommentCard({ comment }: { comment: CommentBodyType }) {
  const [replies, setReplies] = useState<CommentBodyType[]>([]);

  const fetchReplies = async () => {
    try {
      if (comment.commentRepliesCount) {
        const repliesResponse = await getCommentReplies(comment.commentId);

        const repliesData = repliesResponse.map((item: any) => ({
          commentId: item.id,
          authorChannelId: item.snippet.authorChannelId.value,
          authorProfile: item.snippet.authorProfileImageUrl,
          authorName: item.snippet.authorDisplayName,
          commentText: item.snippet.textOriginal,
          commentLikes: item.snippet.likeCount,
        }));

        setReplies(repliesData);
      }
    } catch (error) {
      console.error(`Error fetching the comment replies`, error);
    }
  };

  useEffect(() => {
    fetchReplies();
  }, []);

  return (
    <div className='flex flex-col gap-2'>
      <CommentBody item={comment} />
      <div className='px-14 '>
        {replies?.map((item: any, ind) => (
          <div className='bg-neutral-600 '>
            <CommentBody key={ind} item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentCard;

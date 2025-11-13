import { useEffect } from 'react';
import axios from 'axios';


import CommentBody from './CommentBody';
import type { CommentBodyType } from '../Utils/Types';

const API_KEY = import.meta.env.VITE_API_KEY;

function CommentCard({ comment }: { comment: CommentBodyType }) {
  const fetchReplies = async () => {
    try {
      if (comment.commentRepliesCount) {
        const repliesResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/comments?key=${API_KEY}&part=snippet&parentId=${comment.commentId}`
        );
        console.log(`Replies Reponse`, repliesResponse.data);
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
        {[...Array(2)].map(() => (
          <CommentBody item={comment} />
        ))}
      </div>
    </div>
  );
}

export default CommentCard;

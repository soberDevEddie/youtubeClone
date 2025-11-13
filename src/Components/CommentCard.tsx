import { useEffect, useState } from 'react';
import axios from 'axios';

import CommentBody from './CommentBody';
import type { CommentBodyType } from '../Utils/Types';

const API_KEY = import.meta.env.VITE_API_KEY;

function CommentCard({ comment }: { comment: CommentBodyType }) {
  const [replies, setReplies] = useState<CommentBodyType>([]);

  const fetchReplies = async () => {
    try {
      if (comment.commentRepliesCount) {
        const repliesResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/comments?key=${API_KEY}&part=snippet&parentId=${comment.commentId}`
        );
        // console.log(`Replies Reponse`, repliesResponse.data);
        const items = repliesResponse.data.items;
        const repliesData = items.map((item: any) => ({
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
        {replies?.map((item:any) => (
          <CommentBody item={item} />
        ))}
      </div>
    </div>
  );
}

export default CommentCard;

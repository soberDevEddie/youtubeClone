import { useEffect, useState } from 'react';
import axios from 'axios';

import CommentBody from './CommentBody';
import type { CommentBodyType } from '../Utils/Types';
import CommentCard from './CommentCard';

const API_KEY = import.meta.env.VITE_API_KEY;

interface CommentState {
  comments: CommentBodyType[];
  nextPageToken: string | null;
}

function Comments({ videoId }: { videoId?: string }) {
  const [commentsList, setCommentsList] = useState<CommentState>({
    comments: [],
    nextPageToken: null,
  });

  const fetchComments = async () => {
    try {
      const commentsReponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/commentThreads?key=${API_KEY}&part=snippet,replies&videoId=${videoId}&${
          commentsList.nextPageToken
            ? `&pageToken=${commentsList.nextPageToken}`
            : ``
        }`
      );
      console.log(`Comments Response`, commentsReponse.data);
      const items = commentsReponse.data.items;

      const commentsData = items.map((comment: any) => ({
        commentId: comment.id,
        authorChannelId:
          comment.snippet.topLevelComment.snippet.authorChannelId.value,
        authorProfile:
          comment.snippet.topLevelComment.snippet.authorProfileImageUrl,
        authorName: comment.snippet.topLevelComment.snippet.authorDisplayName,
        commentText: comment.snippet.topLevelComment.snippet.textOriginal,
        commentLikes: comment.snippet.topLevelComment.snippet.likeCount,
      }));

      console.log(commentsData);

      setCommentsList((prev) => ({
        comments: [...prev.comments, ...commentsData],
        nextPageToken: commentsReponse.data.nextPageToken,
      }));
    } catch (error) {
      console.error(`Error fetching the comments.`);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  return (
    <div className='flex mt-3 gap-2 flex-col'>
      <h3 className='font-semibold px-4'>Comments</h3>
      {commentsList.comments?.map((comment: any) => (
        <CommentCard comment={comment}/>
      ))}
      <button className='text-gray-400 hover:underline '
      onClick={() => fetchComments()}
      >Show more...</button>
    </div>
  );
}

export default Comments;

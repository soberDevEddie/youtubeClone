import { useEffect, useState } from 'react';
import axios from 'axios';

import CommentBody from './CommentBody';
import type { CommentBodyType } from '../Utils/Types';
import CommentCard from './CommentCard';
import { getVideoComments } from '../Utils/api';
import { parseComments } from '../Utils/parseData';

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
      const commentsReponse = await getVideoComments(
        videoId!,
        commentsList!.nextPageToken!
      );
      // console.log(`Comments Response`, commentsReponse.data);
      const items = commentsReponse.items;

      const commentsData = parseComments(items);

      // console.log(commentsData);

      setCommentsList((prev) => ({
        comments: [...prev.comments, ...commentsData],
        nextPageToken: commentsReponse.nextPageToken,
      }));
    } catch (error) {
      console.error(`Error fetching the comments.`);
    }
  };

  useEffect(() => {
    if (videoId) {
      fetchComments();
    }
  }, [videoId]);

  return (
    <div className='flex mt-3 gap-2 flex-col'>
      <h3 className='font-semibold px-4'>Comments</h3>
      {commentsList.comments?.map((comment: any, ind) => (
        <CommentCard key={ind} comment={comment} />
      ))}
      <button
        className='text-gray-400 hover:underline '
        onClick={() => fetchComments()}
      >
        Show more...
      </button>
    </div>
  );
}

export default Comments;

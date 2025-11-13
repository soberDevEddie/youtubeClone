import CommentBody from './CommentBody';

function Comments() {
  return (
    <div className='flex mt-3 gap-2 flex-col'>
      <h3 className='font-semibold px-4'>Comments</h3>
      {[...Array(10)].map((item: any) => (
        <CommentBody />
      ))}
    </div>
  );
}

export default Comments;

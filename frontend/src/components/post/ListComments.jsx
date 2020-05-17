import React from 'react';
import CommentItem from './CommentItem';


const ListComments = ({ postId, comments }) => {
  return (
    <div className='comments'>
      {comments.map(comment => (
        <CommentItem comment={comment} postId={postId} key={comment._id}/>
      ))}
    </div>
  );
}

export default ListComments;

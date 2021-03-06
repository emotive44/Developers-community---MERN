import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getPost } from '../../actions/post';

import Spinner from '../common/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import ListComments from './ListComments';


const Post = ({ getPost, post: { post, loading}, match }) => {
  useEffect(() => {
    getPost(match.params.postId);
  }, [getPost, match.params.postId]);

  return (
    <Fragment>
      {loading && <Spinner />}
      <Link to='/posts' className='btn'>Go back to posts</Link>
      {post && <PostItem post={post}/>}
      {post && <CommentForm postId={post._id}/>}
      {post && <ListComments postId={post._id} comments={post.comments}/>}
    </Fragment>
  );
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);

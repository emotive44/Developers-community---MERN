import React, { Fragment, useEffect } from 'react';

import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';

import Spinner from '../common/Spinner';
import PostItem from './PostItem';


const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <Fragment>
      {loading && <Spinner />}
      <h1 className="large text-primary">Posts</h1>
      <p className="lead"><i className="fas fa-user" /> Welcome to the community!</p>
      <div className='posts'>
        {posts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);

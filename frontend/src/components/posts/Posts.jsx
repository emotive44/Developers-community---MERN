import React, { Fragment, useEffect } from 'react';

import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';

import Spinner from '../common/Spinner';


const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <Fragment>
      {loading && <Spinner />}
    </Fragment>
  );
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);

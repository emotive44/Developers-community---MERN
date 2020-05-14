import React, { Fragment, useEffect } from 'react';

import { connect } from 'react-redux';
import { getPost } from '../../actions/post';

import Spinner from '../common/Spinner';
import './Post.css';


const Post = ({ getPost, post: { post, loading}, match }) => {
  useEffect(() => {
    getPost(match.params.postId);
  }, [getPost, match.params.postId]);

  return (
    <Fragment>
      {loading && <Spinner />}
      dsadsdad
    </Fragment>
  );
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);

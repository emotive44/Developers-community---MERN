import React from 'react';
import { Link } from 'react-router-dom';
import './PostItem.css';

import { connect } from 'react-redux';

import Moment from 'react-moment';

const PostItem = ({ 
  post: {
    _id,
    name,
    text,
    avatar,
    likes,
    comments,
    date,
    user
  },
  userId
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <a href="profile.html">
          <img
            className="round-img"
            src={avatar}
            alt=""
          />
          <h4>{name}</h4>
        </a>
      </div>
      <div>
        <p className="my-1">{text}</p>
          <p className="post-date">
            Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-up" />
          <span>{likes.length > 0 && likes.length}</span>
        </button>
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-down" />
        </button>
        <Link to={`post/${_id}`} className="btn btn-primary">
          Discussion <span className='comment-count'>
            {comments.length > 0 && comments.length}
          </span>
        </Link>
        {user === userId && (
          <button type="button" className="btn btn-danger">
            <i className="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  userId: state.auth.userId
});

export default connect(mapStateToProps, {  })(PostItem);

import React, { useState } from 'react';

import { connect } from 'react-redux';
import { addComment } from '../../actions/post';


const CommentForm = ({ postId, addComment }) => {
  const [formData, setFormData] = useState({
    text: ''
  });

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const submitPostHandler = (e) => {
    e.preventDefault();
    addComment(postId, formData);
    setFormData({ ...formData, text: ''});
  }

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave a comment.</h3>
      </div>
      <form className="form my-1" onSubmit={submitPostHandler}>
        <textarea
          rows="5"
          cols="30"
          required
          name="text"
          value={formData.text}
          onChange={inputHandler}
          placeholder="Write a comment"
        />
        <input 
          type="submit" 
          value="Submit" 
          className="btn btn-dark my-1" 
        />
      </form>
    </div>
  );
}

export default connect(null, { addComment })(CommentForm);

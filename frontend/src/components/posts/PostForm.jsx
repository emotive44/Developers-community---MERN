import React, { useState } from 'react';

import { connect } from 'react-redux';
import { createPost } from '../../actions/post';


const PostForm = ({ createPost }) => {
  const [formData, setFormData] = useState({
    text: ''
  });

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const submitPostHandler = (e) => {
    e.preventDefault();
    createPost(formData);
    setFormData({ ...formData, text: ''});
  }

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form className="form my-1" onSubmit={submitPostHandler}>
        <textarea
          rows="5"
          cols="30"
          required
          name="text"
          value={formData.text}
          onChange={inputHandler}
          placeholder="Create a post"
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

export default connect(null, { createPost })(PostForm);

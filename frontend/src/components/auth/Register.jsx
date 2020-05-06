import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import axios from 'axios';
import './LoginRegister.css';

import { setAlert } from '../../actions/alert';

const Register = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const inputHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const registerHandler = async e => {
    e.preventDefault();
    if(password !== password2) {
      props.setAlert('Password do not match.', 'danger');
      return;
    }

    try {
      const newUser = { name, email, password };
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const body = JSON.stringify(newUser);

      const res = await axios.post('http://localhost:5000/api/users/signup', body, config);
      props.setAlert('You are register success.', 'success');
    } catch(err) {
      props.setAlert('Register failed.', 'danger');
    }
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={registerHandler}>
        <div className="form-group">
          <input 
            required
            type="text" 
            name="name"
            value={name} 
            placeholder="Name" 
            onChange={inputHandler}
           />
        </div>
        <div className="form-group">
          <input 
            required
            type="email" 
            name="email" 
            value={email}
            placeholder="Email Address" 
            onChange={inputHandler}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            required
            minLength="6"
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={inputHandler}
          />
        </div>
        <div className="form-group">
          <input
            required
            minLength="6"
            type="password"
            name="password2"
            value={password2}
            onChange={inputHandler}
            placeholder="Confirm Password"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
}

export default connect(null, { setAlert })(Register);

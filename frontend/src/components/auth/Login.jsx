import React, { useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './LoginRegister.css';

import { connect } from 'react-redux';
import { login } from '../../actions/auth';

const Login = ({ login, isAuth }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;

  const inputHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const loginHandler = async e => {
    e.preventDefault();
    login(email, password);
  }
  
  if(isAuth) {
    return <Redirect to='/dashboard'/>
  }
  
  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
      <form className="form" onSubmit={loginHandler}>
        <div className="form-group">
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={inputHandler}
            placeholder="Email Address"
          />
        </div>
        <div className="form-group">
          <input
            required
            type="password"
            name="password"
            value={password}
            onChange={inputHandler}
            placeholder="Password"
          />
        </div>
        <input 
          type="submit" 
          className="btn btn-primary" 
          value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, { login })(Login);

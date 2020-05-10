import React, { useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import Input from '../common/Input';
import './LoginRegister.css';

import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = ({ setAlert, register, isAuth }) => {
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
      setAlert('Password do not match.', 'danger');
      return;
    }
    
    register(name, email, password);
  }

  if(isAuth) {
    return <Redirect to='dashboard' />
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={registerHandler}>
        <Input 
          required
          type='text'
          name='name'
          value={name}
          inputHandler={inputHandler}
          placeholder='Name'
        />
        <Input 
          required
          type='email'
          name='email'
          value={email}
          inputHandler={inputHandler}
          placeholder='Email Address'
          msg='This site uses Gravatar so if you want a profile image, use a Gravatar email.'
        />
        <Input 
          required
          minLength='6'
          type='password'
          name='password'
          value={password}
          placeholder='Password'
          inputHandler={inputHandler}
        />
        <Input 
          required
          minLength='6'
          type='password'
          name='password2'
          value={password2}
          inputHandler={inputHandler}
          placeholder='Confirm Password'
        />
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, { setAlert, register })(Register);

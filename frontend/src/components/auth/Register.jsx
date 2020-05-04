import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
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

  const registerHandler = e => {
    e.preventDefault();
    if(password !== password2) {
      console.log('password do not match.');
      return;
    }
    
    console.log(formData)
  }

  return (
    <section className="container">
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
        Already have an account? <Link to='/'>Sign In</Link>
      </p>
    </section>
  );
}

export default Register;

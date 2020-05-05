import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './LoginRegister.css';

const Login = () => {
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

    try {
      const user = { email, password };
      const config = { 
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const body = JSON.stringify(user);

      const res = await axios.post('http://localhost:5000/api/users/login', body, config);
      console.log(res.data);
    } catch(err) {}
  }

  return (
    <section className="container">
      <div className="alert alert-danger">
        Invalid credentials
      </div>
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
    </section>
  );
}

export default Login;

import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const NavBar = ({ isAuth, logout }) => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to='/'><i className="fas fa-code"></i> DevConnector</Link>
      </h1>
      <ul>
        <li>
          <Link to='/developers'>
          <i className='fas fa-users' />{' '}
            Developers
          </Link>
        </li>
        {
          isAuth && (
            <li>
              <Link to='/dashboard'>
              <i className='fas fa-user' />{' '}
                Dashboard
              </Link>
            </li>
          )
        }
        {
          !isAuth && (
            <li>
              <Link to='/register'>Register</Link>
            </li>
          )
        }
        {
          !isAuth && (
            <li>
              <Link to='/login'>Login</Link>
            </li>
          )
        }
        {
          isAuth && (
            <li onClick={logout}>
              <Link to='/'>
                <i className='fas fa-sign-out-alt' />{' '}
                Logout
              </Link>
            </li>
          )
        }
      </ul>
    </nav>
  );
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, { logout })(NavBar);

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

import { connect } from 'react-redux';

const Landing = ({ isAuth }) => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            {
              !isAuth && (
                <Fragment>
                  <Link to="/register" className="btn btn-primary">Sign Up</Link>
                  <Link to="/login" className="btn btn-light">Login</Link>
                </Fragment>
              )
            }
          </div>
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps)(Landing);

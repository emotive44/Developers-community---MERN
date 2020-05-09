import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';

import Spinner from '../common/Spinner';
import ActionsDashboard from './ActionsDashboard';

const Dashboard = ({ auth, profile: { profile, loading }, getCurrentProfile }) => {
  useEffect(() => {
    getCurrentProfile(); 
  }, []);

  if(loading) {
    return <Spinner />
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> 
          Welcome {profile && <span>{profile.user.name.toUpperCase()}</span>}
      </p>
      {
        profile !== null 
          ? (
              <Fragment>
                <ActionsDashboard />
              </Fragment>
            )
          : (
              <Fragment> 
                <p>You do not have setup a profile, please add some info.</p>
                <Link to='/create-profile' className='btn btn-primary my-1'>
                  Create Profile
                </Link>
              </Fragment>
            )
      }
    </Fragment>
  )
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);

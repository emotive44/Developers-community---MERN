import React, { useEffect, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

import Spinner from '../common/Spinner';
import ActionsDashboard from './ActionsDashboard';
import ExperienceOrEducation from './ExperienceOrEducation';

const Dashboard = ({ auth, profile: { profile, loading }, getCurrentProfile, deleteAccount }) => {
  const history = useHistory();
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
          Welcome {profile && profile.user && <span>{profile.user.name.toUpperCase()}</span>}
      </p>
      {
        profile !== null 
          ? (
              <Fragment>
                <ActionsDashboard />
                <ExperienceOrEducation experience={profile.experience}/>
                <ExperienceOrEducation education={profile.education}/>
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
      {profile && 
        <div className="my-2">
          <button className="btn btn-danger" onClick={() => deleteAccount(history)}>
              <i className="fas fa-user-minus" />
              Delete My Account
          </button>
        </div>
      }
    </Fragment>
  )
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);

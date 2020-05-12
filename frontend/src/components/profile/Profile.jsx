import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getAllProfileById } from '../../actions/profile';

import Spinner from '../common/Spinner';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';


const Profile = ({ getAllProfileById, match, profile: { profile, loading }, auth }) => {
  useEffect(() => {
    getAllProfileById(match.params.profileId);
  }, [getAllProfileById]);

  return (
    <Fragment>
      {profile === null && loading && <Spinner />}
      <Link to='/profiles' className="btn btn-light">Back To Profiles</Link>
      {!auth.loading && 
        profile && profile.user && !profile.loading &&
        auth.userId === profile.user._id && 
        <Link to='/edit-profile' className='btn btn-dark'>
          Edit Profile
        </Link>
      }
      <div className="profile-grid my-1">
        {profile && <Fragment>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
        </Fragment>
        }
      </div>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getAllProfileById })(Profile);

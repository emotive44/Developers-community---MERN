import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getAllProfileById } from '../../actions/profile';

import Spinner from '../common/Spinner';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileExp from './ProfileExp';
import ProfileEduc from './ProfileEduc';
import ProfileGithubRepos from './ProfileGithubRepos';
import './Profile.css';


const Profile = ({ getAllProfileById, match, profile: { profile, loading }, auth }) => {
  useEffect(() => {
    getAllProfileById(match.params.profileId);
  }, [getAllProfileById, match.params.profileId]);

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
          <ProfileExp experiences={profile.experience} />
          <ProfileEduc educations={profile.education} />
          {profile.githubUsername && <ProfileGithubRepos username={profile.githubUsername}/>}
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

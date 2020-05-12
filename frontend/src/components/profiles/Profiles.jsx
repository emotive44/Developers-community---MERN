import React, { Fragment, useEffect } from 'react';

import { connect } from 'react-redux';
import { getAllProfiles } from '../../actions/profile';

import Spinner from '../common/Spinner';
import ProfileItem from './ProfileItem';
import './Profiles.css';


const Profiles = ({ getAllProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getAllProfiles();
  }, []);

  return (
    <Fragment>
      {loading && <Spinner />}
      <h1 className='large text-primary'>Developers</h1>
      <p className='lead'>
        <i className='fab fa-connectdevelop'/> Browse
        and connect with developers
      </p>
      <div className='profiles'> 
        {profiles.length > 0
          ? profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
            ))
          : <h4>No Profiles Found...</h4>
        }
      </div>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);

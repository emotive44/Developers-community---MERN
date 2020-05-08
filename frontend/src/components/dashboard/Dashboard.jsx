import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({ auth, profile, getCurrentProfile }) => {
  useEffect(() => {
    if(auth.isAuth) getCurrentProfile();
  }, []);
  return (
    <div>
      Dashboard
    </div>
  );
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);

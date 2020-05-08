import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => (
  <Route 
    {...rest}
    render={() => !isAuth 
      ? <Redirect to='login' />
      : <Component />
    }
  />
)
const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps)(PrivateRoute);

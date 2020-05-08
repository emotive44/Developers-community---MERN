import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import { Provider } from 'react-redux';
import store from './store';
import { getUser } from './actions/auth';

import setAuthToken from './utils/setAuthToken';

import Landing from './components/common/Landing';
import NavBar from './components/common/NavBar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/common/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/common/PrivateRoute';


if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(getUser());
  }, []);
  
  return (
    <Provider store={store}>
      <Router>
        <Route exact path='/' component={Landing}/>
        <NavBar />
        <section className="container">
          <Alert />
          <Switch>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <PrivateRoute path='/dashboard' component={Dashboard}/>
          </Switch>
        </section>
      </Router>
    </Provider>
  );
}

export default App;

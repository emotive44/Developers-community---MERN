import React, { useEffect } from 'react';
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
import CreateOrEditProfile from './components/profile-forms/CreateOrEditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import NotFound from './components/common/NotFound';


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
        <NavBar />
        <Alert />
        <Switch>
          <Route exact path='/' component={Landing}/>
          <section className="container">
            <Switch>
              <Route path='/login' component={Login}/>
              <Route path='/register' component={Register}/>
              <Route exact path='/profiles' component={Profiles}/>
              <Route path='/profiles/:profileId' component={Profile}/>
              <PrivateRoute exact path='/posts' component={Posts}/>
              <PrivateRoute path='/posts/:postId' component={Post}/>
              <PrivateRoute path='/dashboard' component={Dashboard}/>
              <PrivateRoute path='/create-profile' component={() => <CreateOrEditProfile types='Create'/>}/>
              <PrivateRoute path='/edit-profile' component={() => <CreateOrEditProfile types='Edit'/>}/>
              <PrivateRoute path='/add-experience' component={AddExperience}/>
              <PrivateRoute path='/add-education' component={AddEducation}/>
              <Route component={NotFound}/>
            </Switch>
          </section>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

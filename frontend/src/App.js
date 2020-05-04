import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Landing from './components/common/Landing';
import NavBar from './components/common/NavBar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';


const App = () => {
  return (
    <Fragment>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;

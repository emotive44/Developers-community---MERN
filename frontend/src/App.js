import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import { Provider } from 'react-redux';
import store from './store';
 
import Landing from './components/common/Landing';
import NavBar from './components/common/NavBar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

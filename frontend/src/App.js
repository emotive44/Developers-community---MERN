import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import { Provider } from 'react-redux';
import store from './store';
 
import Landing from './components/common/Landing';
import NavBar from './components/common/NavBar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/common/Alert';


const App = () => {
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
          </Switch>
        </section>
      </Router>
    </Provider>
  );
}

export default App;

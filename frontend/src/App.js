import React, { Fragment } from 'react';
import './App.css';

import Landing from './components/common/Landing';
import NavBar from './components/common/NavBar';

const App = () => {
  return (
    <Fragment>
      <NavBar />
      <Landing />
    </Fragment>
  );
}

export default App;

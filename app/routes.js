import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import LightLevels from './components/LightLevels';
import LogLightData from './components/LogLightData';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/lightlevel' component={LightLevels} />
    <Route path='/loglightdata' component={LogLightData} />
  </Route>
);
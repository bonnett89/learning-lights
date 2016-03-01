import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import LightLevels from './components/LightLevels';
import Light from './components/Light';
import LightingMode from './components/LightingMode';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/lightlevel' component={LightLevels} />
    <Route path='/light' component={Light} />
    <Route path='/lightingmode' component={LightingMode} />
  </Route>
);
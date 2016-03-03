import React from 'react';
import LightingMode from './LightingMode';
import Light from './Light';
import LightLevels from './LightLevels';

class Home extends React.Component {
  render() {
    return (
      <div>
        <LightingMode />
        <Light />
      </div>
    );
  }
}

export default Home;
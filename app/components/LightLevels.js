import React from 'react';
import {Link} from 'react-router';
import {isEqual} from 'underscore';
import LightLevelsActions from '../actions/LightLevelsActions';
import LightLevelsStore from '../stores/LightLevelsStore';

class LightLevels extends React.Component {
  constructor(props) {
    super(props);
    this.state = LightLevelsStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    LightLevelsStore.listen(this.onChange);
    LightLevelsActions.getLights(this.props.params);
  }

  componentWillUnmount() {
    LightLevelsStore.unlisten(this.onChange);
  }

  componentDidUpdate(prevProps) {
    console.log('component updated');
    if(!isEqual(prevProps.params, this.props.params)) {
      LightLevelsActions.getLights(this.props.params);
    }
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    if (this.state.lights) {
      let lightLevels = this.state.lights.map((light, index) => {
        return (
          <div key={light.lightId} className='list-group-item animated fadeIn'>
            <div className='media'>
              <div className='media-body'>
                <h4 className='media-heading'>
                  <small>Light Reading: <strong>{light.value}</strong></small>
                </h4>
                <small>Date: <strong>{light.date}</strong></small>
                <br />
              </div>
            </div>
          </div>
        );
      });

    return (
      <div className='container'>
        <div className='list-group'>
          {lightLevels}
        </div>
      </div>
    );
    } else {
      return (
        <div className='alert alert-info'>
          Hello from LightLevels Component
        </div>
      );
    }
  }
}

export default LightLevels;
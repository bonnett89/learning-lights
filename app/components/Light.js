import React from 'react';
import LightStore from '../stores/LightStore';
import LightActions from '../actions/LightActions';

class Light extends React.Component {

  constructor(props) {
    super(props);
    this.state = LightStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  onChange(state) {
    this.setState(state);
  }

  componentDidMount() {
    console.log('Mounted');
    LightStore.listen(this.onChange);
  }

  componentWillUnmount() {
    LightStore.unlisten(this.onChange);
  }

  changeLightState(lightState) {
    LightActions.updateLightState(lightState);
    LightActions.changeLightState(lightState);
  }

  render() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='panel panel-default'>
            <div className='panel-heading'>WeMo Light</div>
            <div className='panel-body'>
              <div>
                <label>{this.state.lightState}</label>
              </div>
              <div className='Button'>
                <button type='button' id='on' className='btn btn-primary' onClick={this.changeLightState.bind(this, 'on')}>On</button>
                <button type='button' id='off' className='btn btn-secondary' onClick={this.changeLightState.bind(this, 'off')}>Off</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Light;

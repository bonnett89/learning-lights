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

  turnLightOnClick() {
    LightActions.lightOn();
  }

  turnLightOffClick() {
    LightActions.lightOff();
  }

  componentDidMount() {
    console.log('Mounted');
  }

  render() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='panel panel-default'>
            <div className='panel-heading'>WeMo Light</div>
            <div className='panel-body'>
              <div className='Button'>
                <button type='button' className='btn btn-primary' onClick={this.turnLightOnClick}>On</button>
                <button type='button' className='btn btn-secondary' onClick={this.turnLightOffClick}>Off</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Light;

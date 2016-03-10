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
    if (this.state.lightState == 'on') {
      var labelStyle = 'label label-success pull-right';
    } else if (this.state.lightState == 'off') {
      var labelStyle = 'label label-danger pull-right';
    }
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='panel panel-default'>
            <div className='panel-heading'>WeMo Light<span className={labelStyle}>{this.state.lightState}</span></div>
            <div className='panel-body'>
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

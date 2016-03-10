import React from 'react';
import LightingModeStore from '../stores/LightingModeStore';
import LightingModeActions from '../actions/LightingModeActions';

class LightingMode extends React.Component {

  constructor(props) {
    super(props);
    this.state = LightingModeStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  onChange(state) {
    this.setState(state);
  }

  componentDidMount() {
    //console.log('Mounted');
    LightingModeStore.listen(this.onChange);
  }

  componentWillUnmount() {
    LightingModeStore.unlisten(this.onChange);
  }

  handleSubmit(event) {
    event.preventDefault();
    var mode = this.state.mode;
    LightingModeActions.lightingMode(mode);
  }

  render() {
    if (this.state.mode == 'learning') {
      var labelStyle = 'label label-success pull-right';
    } else if (this.state.mode == 'manual') {
      var labelStyle = 'label label-danger pull-right';
    }
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='panel panel-default'>
            <div className='panel-heading'>Lighting Mode<span className={labelStyle}>{this.state.mode}</span></div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className={'form-group'}>
                    <div className='radio radio-inline'>
                      <input type='radio' name='lighting_mode' id='learning' value='learning' checked={this.state.mode === 'learning'}
                        onChange={LightingModeActions.updateMode}/>
                      <label htmlFor='learning'>Learning</label>
                    </div>
                    <div className='radio radio-inline'>
                      <input type='radio' name='lighting_mode' id='manual' value='manual' checked={this.state.mode === 'manual'}
                        onChange={LightingModeActions.updateMode}/>
                      <label htmlFor='manual'>Manual</label>
                    </div>
                  </div>
                  <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default LightingMode;

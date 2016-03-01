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
    console.log('Mounted');
    LightingModeStore.listen(this.onChange);
  }

  componentWillUnmount() {
    LightingModeStore.unlisten(this.onChange);
  }

  setLearningModeClick() {
    console.log('LEARNING MODE');
    var mode = this.state.mode;
    LightingModeActions.learningMode(mode);
  }

  setManualModeClick() {
    console.log('MANUAL MODE');
    LightingModeActions.manualMode();
  }

  handleSubmit(event) {
    event.preventDefault();

    var mode = this.state.mode;

    if (mode) {
      LightingModeActions.learningMode(mode);
    }
  }



                  //<div className='Button'>
                  //  <button type='button' className='btn btn-primary' onClick={this.setLearningModeClick}>Learning</button>
                  //</div>
                  //<div className='Button'>
                  //  <button type='button' className='btn btn-primary' onClick={this.setManualModeClick}>Manual</button>
                  //</div>

  render() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Lighting Mode</div>
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
      </div>
    );
  }
}

export default LightingMode;

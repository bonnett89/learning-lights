import React from 'react';
import LogLightDataStore from '../stores/LogLightDataStore';
import LogLightDataActions from '../actions/LogLightDataActions';

class LogLightData extends React.Component {

  constructor(props) {
    super(props);
    this.state = LogLightDataStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  onChange(state) {
    this.setState(state);
  }

  componentDidMount() {
    console.log('Mounted');
    LogLightDataStore.listen(this.onChange);
  }

  componentWillUnmount() {
    LogLightDataStore.unlisten(this.onChange);
  }

  handleSubmit(event) {
    event.preventDefault();
    var logState = this.state.logState;
    console.log('Log State: ' + logState);
    LogLightDataActions.loggingState(logState);
  }

  render() {
    if (this.state.logState == 'log') {
      var labelStyle = 'label label-success pull-right';
    } else if (this.state.logState == 'nolog') {
      var labelStyle = 'label label-danger pull-right';
    }
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='panel panel-default'>
            <div className='panel-heading'>Light Logging<span className={labelStyle}>{this.state.logState}</span></div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className={'form-group'}>
                    <div className='radio radio-inline'>
                      <input type='radio' name='logging_state' id='logging' value='log' checked={this.state.logState === 'log'}
                        onChange={LogLightDataActions.updateLogState}/>
                      <label htmlFor='logging'>Logging</label>
                    </div>
                    <div className='radio radio-inline'>
                      <input type='radio' name='logging_state' id='notLogging' value='nolog' checked={this.state.logState === 'nolog'}
                        onChange={LogLightDataActions.updateLogState}/>
                      <label htmlFor='notLogging'>Not Logging</label>
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

export default LogLightData;
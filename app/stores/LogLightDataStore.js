import alt from '../alt';
import LogLightDataActions from '../actions/LogLightDataActions';

class LogLightDataStore {
  constructor() {
    this.bindActions(LogLightDataActions);
    this.logState = '';
    this.helpBlock = '';
  }

  changeloggingStateSuccess(successMessage) {
    this.helpBlock = successMessage;
  }

  onChangeloggingStateFail(errorMessage) {
    this.helpBlock = errorMessage;
  }

  onUpdateLogState(event) {
    this.logState = event.target.value;
    this.helpBlock = '';
  }
}

export default alt.createStore(LogLightDataStore);
import alt from '../alt';
import LightingModeActions from '../actions/LightingModeActions';

class LightingModeStore {
  constructor() {
    this.bindActions(LightingModeActions);
    this.mode = '';
    this.helpBlock = '';
  }

  onChangeLightingModeSuccess(successMessage) {
    this.helpBlock = successMessage;
  }

  onChangeLightingModeFail(errorMessage) {
    this.helpBlock = errorMessage;
  }

  onUpdateMode(event) {
    this.mode = event.target.value;
    this.helpBlock = '';
  }
}

export default alt.createStore(LightingModeStore);
import alt from '../alt';
import LightActions from '../actions/LightActions';

class LightStore {
  constructor() {
    this.bindActions(LightActions);
    this.lightState = '';
  }

  onChangeLightStateSuccess(successMessage) {
    this.helpBlock = successMessage;
  }

  onChangeLightStateFail(errorMessage) {
    this.helpBlock = errorMessage;
  }

  onUpdateLightState(value) {
    this.lightState = value;
  }
}

export default alt.createStore(LightStore);
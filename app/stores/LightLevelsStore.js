import alt from '../alt';
import LightLevelsActions from '../actions/LightLevelsActions';

class LightLevelsStore {

  constructor() {
    this.bindActions(LightLevelsActions);
    this.lights = [];
  }

  onGetLightsSuccess(data) {
    this.lights = data;
  }

  onGetLightsFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(LightLevelsStore);
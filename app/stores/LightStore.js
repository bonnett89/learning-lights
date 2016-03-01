import alt from '../alt';
import LightActions from '../actions/LightActions';

class LightStore {
  constructor() {
    this.bindActions(LightActions);
  }
}

export default alt.createStore(LightStore);
import alt from '../alt';

class LightActions {
  constructor() {
    this.generateActions(
      'changeLightStateSuccess',
      'changeLightStateFail',
      'updateLightState'
    );
  }

  changeLightState(lightState) {
    $.ajax({
      type: 'POST',
      url: '/api/lightstate',
      data: { lightState: lightState }
    })
      .done((data) => {
        //console.log('ajax done');
        this.actions.changeLightStateSuccess(data.message);
      })
      .fail((jqXhr) => {
        console.log('ajax fail');
        this.actions.changeLightStateFail(jqXhr);
      });
  }
}

export default alt.createActions(LightActions);
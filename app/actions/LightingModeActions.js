import alt from '../alt';

class LightingModeActions {
  constructor() {
    this.generateActions(
      'changeLightingModeSuccess',
      'changeLightingModeFail',
      'updateMode'
    );
  }

  lightingMode(mode) {
    $.ajax({
      type: 'POST',
      url: '/api/lightingmode',
      data: { mode: mode }
    })
      .done((data) => {
        //console.log('ajax done');
        this.actions.changeLightingModeSuccess(data.message);
      })
      .fail((jqXhr) => {
        console.log('ajax fail');
        this.actions.changeLightingModeFail(jqXhr);
      });
  }
}

export default alt.createActions(LightingModeActions);

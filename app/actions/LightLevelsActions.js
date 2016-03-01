import alt from '../alt';

class LightLevelsActions {
  constructor() {
    this.generateActions(
      'getLightsSuccess',
      'getLightsFail'
    );
  }

  getLights(payload) {
    let url = '/api/lightlevels';
    let params = {
      value: payload.value
    };

    $.ajax({ url: url, data: params })
      .done((data) => {
        console.log('Success');
        this.actions.getLightsSuccess(data);
        //console.log(data);
      })
      .fail((jqXhr) => {
        console.log('FAILED');
        this.actions.getLightsFail(jqXhr);
      });
  }
}

export default alt.createActions(LightLevelsActions);
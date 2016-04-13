import alt from '../alt';

class LogLightDataActions {
  constructor() {
    this.generateActions(
      'changeloggingStateSuccess',
      'changeloggingStateFail',
      'updateLogState'
    );
  }

  loggingState(logState) {
    $.ajax({
      type: 'POST',
      url: '/api/loggingState',
      data: { logState: logState }
    })
      .done((data) => {
        console.log('ajax done');
        this.actions.changeloggingStateSuccess(data.message);
      })
      .fail((jqXhr) => {
        console.log('ajax fail');
        this.actions.changeloggingStateFail(jqXhr);
      });
  }
}

export default alt.createActions(LogLightDataActions);

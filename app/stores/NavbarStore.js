import alt from '../alt';
import NavbarActions from '../actions/NavbarActions';

class NavbarStore {
  constructor() {
    this.bindActions(NavbarActions);
    //this.onlineUsers = 0;
    this.ajaxAnimationClass = '';
  }
  /*
  onUpdateOnlineUsers(data) {
    this.onlineUsers = data.onlineUsers;
  }
  */

  onUpdateAjaxAnimation(className) {
    this.ajaxAnimationClass = className; //fadein or fadeout
  }
}

export default alt.createStore(NavbarStore);
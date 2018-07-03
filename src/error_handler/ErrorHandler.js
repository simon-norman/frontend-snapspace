import { store } from './../store/store';

export default class ErrorHandler {
  constructor() {
    this.generalErrorMessage = 'So sorry, there\'s been an error - please contact us or try again later';
  }
  handleError(error) {
    if (error.response) {
      store.commit('UPDATE_ERROR_MESSAGE', error.response.data.error.message);
    } else {
      store.commit('UPDATE_ERROR_MESSAGE', this.generalErrorMessage);
    }
    store.commit('UPDATE_ERROR_STATUS', true);
  }
}

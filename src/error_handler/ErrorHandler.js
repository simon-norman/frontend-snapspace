import { store } from './../store/store';

const _logErrorToAtatus = Symbol('logErrorToAtatus');
const _displayErrorAlert = Symbol('displayErrorAlert');

export default class ErrorHandler {
  constructor() {
    this.generalErrorMessage = 'So sorry, there\'s been an error - please contact us or try again later';
  }

  handleError(error) {
    this.atatus = window.atatus;
    this[_logErrorToAtatus](error);
    this[_displayErrorAlert](error);
  }

  [_logErrorToAtatus](error) {
    this.atatus.notify(error, {
      extra: error,
    });
  }

  [_displayErrorAlert](error) {
    if (error.response) {
      store.commit('UPDATE_ERROR_MESSAGE', error.response.data.error.message);
    } else {
      store.commit('UPDATE_ERROR_MESSAGE', this.generalErrorMessage);
    }
    store.commit('UPDATE_ERROR_STATUS', true);
  }
}

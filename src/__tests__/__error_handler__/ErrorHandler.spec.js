import alerts from './../../store/modules/alerts';
import ErrorHandler from '../../error_handler/ErrorHandler';

jest.mock('./../../store/modules/alerts');

describe('ErrorHandler.js', () => {  
  describe('Handle errors', () => {
    let errorHandler;
    let unknownError;
    let messageFromApi;
    let errorWithMessageFromApi;

    beforeEach(() => {
      errorHandler = new ErrorHandler();
      messageFromApi = 'message from api';
      unknownError = {};
      errorWithMessageFromApi = {
        response: {
          data: {
            error: {
              message: messageFromApi,
            },
          },
        },
      };
    });

    afterEach(() => {
      jest.clearAllMocks(); 
    });

    it('should update Vuex, to activate error alert, with message sent from api', () => {
      errorHandler.handleError(errorWithMessageFromApi);

      expect(alerts.mutations.UPDATE_ERROR_STATUS.mock.calls[0][1]).toEqual(true);
      expect(alerts.mutations.UPDATE_ERROR_MESSAGE.mock.calls[0][1]).toEqual(messageFromApi);
    });

    it('should update Vuex, to activate error alert, with general error message', () => {
      errorHandler.handleError(unknownError);
  
      expect(alerts.mutations.UPDATE_ERROR_STATUS.mock.calls[0][1]).toEqual(true);
      expect(alerts.mutations.UPDATE_ERROR_MESSAGE.mock.calls[0][1])
        .toEqual(errorHandler.generalErrorMessage);
    });
  });
});

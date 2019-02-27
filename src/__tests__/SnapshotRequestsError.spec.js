import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';
import mockAxios from 'axios';
import SnapshotRequests from '../components/administrator_backend/SnapshotRequests.vue';

import mockErrorHandler from '../error_handler/ErrorHandler';

jest.mock('../error_handler/ErrorHandler');

// stubbing Window.scrollTo as scrollTo not provided in JSDOM
// stops it from throwing errors in testing
global.scrollTo = () => {};

const createWrapper = (mocks, propsData) => {
  const localVue = createLocalVue();
  localVue.use(Vuetify);
  localVue.use(Vuelidate);
          
  const wrapper = mount(SnapshotRequests, {
    localVue,
    mocks,
    propsData,
  });
  
  return wrapper;
};

describe('SnapshotRequests.vue', () => {
  describe('Error when save requests fails', () => {
    it('should show an error if save was not successful', async () => {
      const $route = {
        params: {
          clId: '1',
          prId: '2',
        },
      };
    
      const mocks = {
        $route,
      };

      const wrapper = createWrapper(mocks);

      const errorMessage = 'Requests server error';

      mockAxios.post.mockImplementation(() => {
        throw new Error(errorMessage);
      });

      wrapper.find('#saveRequests').trigger('click');

      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      
      const mockHandleError = mockErrorHandler.mock.instances[0].handleError;
      expect(mockHandleError.mock.calls[0][0].message).toEqual(errorMessage);
    });
  });
});

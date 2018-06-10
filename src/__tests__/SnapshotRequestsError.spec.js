import { mount, createLocalVue, config, TransitionStub } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';
import mockAxios from 'axios';
import SnapshotRequestApi from '../api/snapshotRequestApi';
import SnapshotRequests from '../components/SnapshotRequests.vue';

config.stubs.transition = TransitionStub;

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),

  post: jest.fn(() => Promise.resolve({ data: {} })),

  create: jest.fn(function () {
    return this;
  }),
}));

// stubbing Window.scrollTo as scrollTo not provided in JSDOM
// stops it from throwing errors in testing
global.scrollTo = () => {};

describe('SnapshotRequests.vue', () => {
  describe('Error when save requests fails', () => {
    let wrapper; 
    let newRequests; 
    let savedRequests;
    
    beforeEach(() => {
      mockAxios.get.mockReset();
      mockAxios.post.mockReset();
      mockAxios.post.mockImplementation(() => {
        throw new Error('Server error');
      });
      const localVue = createLocalVue();
      localVue.use(Vuetify);
      localVue.use(Vuelidate);
    
      /* eslint no-unused-vars: 0 */
      wrapper = mount(SnapshotRequests, {
        localVue,
        stubs: {
          transition: TransitionStub,
        },
      });
    });

    afterEach(() => {
      jest.restoreAllMocks();
      jest.resetModules();
      jest.clearAllMocks();
    });

    it('should show an error if save was not successful', async () => {
      expect(wrapper.find('#errorMessage').hasStyle('display', 'none')).toBe(true);
      mockAxios.post.mockImplementation(() => {
        throw new Error('Server error');
      });
      wrapper.find('#saveRequests').trigger('click');
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      expect(wrapper.find('#errorMessage').hasStyle('display', 'none')).toBe(false);
    });
  });
});

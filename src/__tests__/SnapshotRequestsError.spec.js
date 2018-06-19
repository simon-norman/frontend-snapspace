import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';
import mockAxios from 'axios';
import SnapshotRequests from '../components/SnapshotRequests.vue';

// stubbing Window.scrollTo as scrollTo not provided in JSDOM
// stops it from throwing errors in testing
global.scrollTo = () => {};

const createWrapper = (mocks) => {
  const localVue = createLocalVue();
  localVue.use(Vuetify);
  localVue.use(Vuelidate);
          
  const wrapper = mount(SnapshotRequests, {
    localVue,
    mocks,
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

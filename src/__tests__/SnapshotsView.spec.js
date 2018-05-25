import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import SnapshotsView from '../components/SnapshotsView.vue';

describe('SnapshotsView.vue', () => {
  describe('Tests loading successfully', () => {
    const localVue = createLocalVue();
    localVue.use(Vuetify);
  
    /* eslint no-unused-vars: 0 */
    const wrapper = mount(SnapshotsView, {
      localVue,
    });
    
    it('should have loaded a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });
  });
});

import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import mockAxios from 'axios';
import SnapshotRequestApi from '../api/snapshotRequestApi';
import SnapshotRequests from '../components/SnapshotRequests.vue';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),

  create: jest.fn(function () {
    return this;
  }),
}));

describe('SnapshotRequests.vue', () => {
  describe('Tests loading successfully', () => {
    const localVue = createLocalVue();
    localVue.use(Vuetify);
  
    /* eslint no-unused-vars: 0 */
    const wrapper = mount(SnapshotRequests, {
      localVue,
    });
    
    it('should have loaded a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });
  });

  describe('Create snapshot requests', () => {
    const localVue = createLocalVue();
    localVue.use(Vuetify);
  
    /* eslint no-unused-vars: 0 */
    const wrapper = mount(SnapshotRequests, {
      localVue,
    });
    
    it('should add a snapshot request to request list', () => {
      wrapper.find('#addRequest').trigger('click');
      expect(wrapper.find('#request2').exists()).toBeTruthy();
    });
  });

  describe('Update snapshot requests', () => {
    let wrapper; 

    beforeAll(() => {
      const snapshotRequests = [{ _id: '1', title: 'title1' }, { _id: '2', title: 'title2' }, { _id: '3', title: 'title3' }];
      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: snapshotRequests,
        }));
    });
    
    beforeEach(() => {
      const localVue = createLocalVue();
      localVue.use(Vuetify);
    
      /* eslint no-unused-vars: 0 */
      wrapper = mount(SnapshotRequests, {
        localVue,
      });
    });

    
    it('should load existing snapshot requests', () => {
      expect(wrapper.find('.requestTitle')).toHaveLength(3);
    });
  });
});

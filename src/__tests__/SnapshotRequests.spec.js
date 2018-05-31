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
    let snapshotRequests;

    beforeAll(() => {
      snapshotRequests = [{ _id: '', title: 'title1' }, { _id: 2, title: 'title2' }];
      mockAxios.get.mockImplementation(() =>
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

    afterAll(() => {
      jest.restoreAllMocks();
    });
    
    it('should load existing snapshot requests', (done) => {
      wrapper.vm.$nextTick(() => {
        expect(wrapper.find('#request1').element.value).toBe(snapshotRequests[0].title);
        expect(wrapper.find('#request2').element.value).toBe(snapshotRequests[1].title);
        done();
      });
    });

    it('should remove a snapshot request from request list', (done) => {
      wrapper.vm.$nextTick(() => {
        wrapper.find('#deleteRequest2').trigger('click');
        expect(wrapper.find('#request2').exists()).toBeFalse();
        done();
      });
    });

    it('should delete a snapshot request completely if not yet saved', (done) => {
      wrapper.vm.$nextTick(() => {
        wrapper.find('#deleteRequest1').trigger('click');
        expect(wrapper.vm.uiRequests[0].snapshotRequest._id).toBe(2);
        done();
      });
    });

    it('should make a snapshot request inactive if has been previously saved, without deleting it', (done) => {
      wrapper.vm.$nextTick(() => {
        wrapper.find('#deleteRequest2').trigger('click');
        expect(wrapper.vm.uiRequests[1].isActive).toBe(false);
        done();
      });
    });
  });
});

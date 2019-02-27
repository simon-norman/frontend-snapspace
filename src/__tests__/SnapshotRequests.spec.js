import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';
import mockAxios from 'axios';
import SnapshotRequests from '../components/administrator_backend/SnapshotRequests.vue';

jest.mock('axios');

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

// stubbing Window.scrollTo as scrollTo not provided in JSDOM
// stops it from throwing errors in testing
global.scrollTo = () => {};

describe('SnapshotRequests.vue', () => {
  const $route = {
    params: {
      clId: '1',
      prId: '2',
    },
  };

  const mocks = {
    $route,
  };

  describe('Tests loading successfully', () => {    
    it('should have loaded a Vue instance', () => {
      const wrapper = createWrapper(mocks);
      expect(wrapper.isVueInstance()).toBeTruthy();
    });
  });

  describe('Create snapshot requests', () => {    
    it('should add a snapshot request to request list', async () => {
      const snapshotRequests = [{ _id: 2, name: 'name1', sequence: 1 }];

      mockAxios.get.mockImplementation(() =>
        Promise.resolve({
          data: snapshotRequests,
        }));
      
      const wrapper = createWrapper(mocks);
      const event = new Event('click');
      wrapper.find('#addRequest').element.dispatchEvent(event);
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      expect(wrapper.find('#request2').exists()).toBeTruthy();
    });
  });

  describe('Update snapshot requests', () => {
    let wrapper; 
    let snapshotRequests;

    beforeAll(() => {
      snapshotRequests = [{ _id: '', name: 'name1', sequence: 1 }, { _id: 2, name: 'name2', sequence: 2 }];

      mockAxios.get.mockImplementation(() =>
        Promise.resolve({
          data: snapshotRequests,
        }));
    });
    
    beforeEach(() => {
      wrapper = createWrapper(mocks);
    });
    
    it('should load existing snapshot requests', async () => {
      expect(wrapper.find('#request1').element.value).toBe(snapshotRequests[0].name);
      expect(wrapper.find('#request2').element.value).toBe(snapshotRequests[1].name);
    });

    it('should remove a snapshot request from request list', async () => {
      await wrapper.vm.$nextTick();
      const event = new Event('click');
      wrapper.find('#deleteRequest2').element.dispatchEvent(event);
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      expect(wrapper.find('#request2').exists()).toBeFalse();
    });

    it('should delete a snapshot request completely if not yet saved', async () => {
      await wrapper.vm.$nextTick();
      const event = new Event('click');
      wrapper.find('#deleteRequest1').element.dispatchEvent(event);
      expect(wrapper.vm.uiRequests[0].snapshotRequest._id).toBe(2);
    });

    it('should make a snapshot request inactive if has been previously saved, without deleting it', async () => {
      await wrapper.vm.$nextTick();
      const event = new Event('click');
      wrapper.find('#deleteRequest2').element.dispatchEvent(event);
      expect(wrapper.vm.uiRequests[1].snapshotRequest.status).toBe('deleted');
    });
  });

  describe('Save snapshot requests', () => {
    let wrapper; 
    let newRequests; 
    let savedRequests;
    
    beforeEach(() => {
      mockAxios.get.mockReset();

      savedRequests = [{ _id: 1, name: 'save1', sequence: 1 }, { _id: 2, name: 'save2', sequence: 2 }];
      mockAxios.post.mockImplementation(() =>
        Promise.resolve({
          data: savedRequests,
        }));

      wrapper = createWrapper(mocks);

      newRequests = [{ 
        uiRequestId: 1, 
        snapshotRequest: { name: 'test', sequence: 1, status: 'active' }, 
      }, 
      {
        uiRequestId: 2, 
        snapshotRequest: { name: 'test1', sequence: 2, status: 'active' }, 
      }];
      wrapper.setData({ 
        requestIdCounter: 3,
        uiRequests: newRequests, 
      });
    });
    
    it('should send snapshot requests to API and post a success message when save successful', async () => {
      expect(wrapper.find('#successMessage').hasStyle('display', 'none')).toBe(true);
      const event = new Event('click');
      wrapper.find('#saveRequests').element.dispatchEvent(event);

      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      expect(wrapper.find('#successMessage').hasStyle('display', 'none')).toBe(false);
      expect(mockAxios.post).toHaveBeenCalledTimes(1);
      expect(wrapper.vm.$data.uiRequests.length).toBe(2);
    });

    it('should update requests with any new request IDs returned by API', async () => {
      const event = new Event('click');
      wrapper.find('#saveRequests').element.dispatchEvent(event);

      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.$data.uiRequests[0].snapshotRequest._id).toBe(1);
    });

    it('should display error, on save, if name not populated', async () => {
      newRequests = [{ 
        uiRequestId: 1, 
        snapshotRequest: { name: '', sequence: 1, status: 'active' }, 
      }, 
      {
        uiRequestId: 2, 
        snapshotRequest: { name: '', sequence: 2, status: 'active' }, 
      }];

      wrapper.setData({ 
        requestIdCounter: 3,
        uiRequests: newRequests, 
      });

      const event = new Event('click');
      wrapper.find('#saveRequests').element.dispatchEvent(event);
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      expect(Array.isArray(wrapper.vm.nameErrors(0))).toBeTrue();
      expect(wrapper.vm.nameErrors(0)).not.toBeEmpty();
      expect(wrapper.find('.input-group--error').exists()).toBeTruthy();
    });
  });
});

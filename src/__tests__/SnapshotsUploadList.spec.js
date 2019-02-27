import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import mockAxios from 'axios';
import Vuex from 'vuex';
import SnapshotsUploadList from '../components/snapshots_upload/SnapshotsUploadList.vue';

jest.mock('axios');

const createWrapper = (stubs, mocks, getters) => {
  const localVue = createLocalVue();
  localVue.use(Vuetify);
  localVue.use(Vuex);

  const store = new Vuex.Store({
    state: {},
    getters,
  });
          
  const wrapper = mount(SnapshotsUploadList, {
    localVue,
    stubs,
    mocks,
    store,
  });
  
  return wrapper;
};

describe('SnapshotUploadList.vue', () => {
  // mocking $route object otherwise Vue Test Utils throws errors
  // when trying to access it
  const $route = {
    params: {
      clId: '1',
      prId: '2',
    },
  };

  const mocks = {
    $route,
  };

  // stubbing child component so logic (e.g. v-for) to create
  // that component can be tested
  const stubs = {
    SnapshotsUpload: '<div id="snapshotsUpload"></div>',
  };

  const getters = {
    getErrorMessage: () => [],
    getErrorStatus: () => false,
    getSuccessMessage: () => () => '',
    getSuccessStatus: () => () => false,
  };

  describe('Tests loading successfully', () => {  
    it('should have loaded a Vue instance', () => {
      const wrapper = createWrapper(stubs, mocks, getters);
      expect(wrapper.isVueInstance()).toBeTruthy();
    });
  });

  describe('Load list of snapshot requests', () => {
    it('should display all snapshot requests', async () => {
      const snapshotRequests = [
        { name: 'name1', _id: 'B1' }, 
        { name: 'name2', _id: 'B2' },
      ];

      mockAxios.get.mockImplementation(() =>
        Promise.resolve({
          data: snapshotRequests,
        }));

      const wrapper = createWrapper(stubs, mocks, getters);
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      expect(wrapper.findAll('#snapshotsUpload')).toHaveLength(2);
    });
  });
});

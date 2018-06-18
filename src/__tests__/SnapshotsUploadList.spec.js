import { shallow, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import SnapshotsUploadList from '../components/SnapshotsUploadList.vue';
import SnapshotsUpload from '../components/SnapshotsUpload.vue';

const createWrapper = (stubs, wrapperData, mocks) => {
  const localVue = createLocalVue();
  localVue.use(Vuetify);
          
  const wrapper = shallow(SnapshotsUploadList, {
    localVue,
    stubs,
    mocks,
  });

  if (wrapperData) {
    wrapper.setData(wrapperData);
  } 
  
  return wrapper;
};

describe('SnapshotUploadList.vue', () => {
  describe('Tests loading successfully', () => {
    const wrapper = createWrapper();
    
    it('should have loaded a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });
  });

  describe('Load list of snapshot requests', () => {
    it.only('should display all snapshot requests', async () => {
      /*       const stubs = {
        'snapshots-upload': 'ab27c74f73ba26561c61cbcc',
      }; */
      const wrapperData = 
      {
        snapshotRequests: [
          { name: 'name1', _id: 'B1' }, 
          { name: 'name2', _id: 'B2' },
        ],
      };
      const $route = {
        params: {
          clId: '1',
          prId: '2',
        },
      };
      const mocks = {
        $route,
      };
      const wrapper = createWrapper(undefined, wrapperData, mocks);
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      debugger;
      
      expect(wrapper.findAll(SnapshotsUpload)).toHaveLength(2);
    });
  });
});

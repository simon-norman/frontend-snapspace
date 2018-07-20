import { shallow, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';
import flushPromises from 'flush-promises';
import SnapshotsUpload from '../components/SnapshotsUpload.vue';

const createWrapper = (propsData, wrapperData) => {
  const localVue = createLocalVue();
  localVue.use(Vuetify);
  localVue.use(Vuelidate);
          
  const wrapper = shallow(SnapshotsUpload, {
    localVue,
    propsData,
  });

  if (wrapperData) {
    wrapper.setData(wrapperData);
  } 
  
  return wrapper;
};

describe('SnapshotUpload.vue', () => {
  describe('Tests loading successfully', () => {
    const propsData = {
      requestId: 'ab27c74f73ba26561c61cbcc',
      requestName: 'name', 
    };
    const wrapper = createWrapper(propsData);
    
    it('should have loaded a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });
  });

  describe('Load snapshot request', () => {
    it('should display the snapshot request name', async () => {
      const propsData = {
        requestId: 'ab27c74f73ba26561c61cbcc',
        requestName: 'name', 
      };
      const wrapper = createWrapper(propsData);
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      expect(wrapper.find(`#${propsData.requestId}`).exists()).toBeTruthy();
    });
  });

  describe('Display image', () => {    
    it('should display image when user adds image', async () => {
      // Vue Image Upload object produced by 3rd party image uploader (Vue Image Upload)
      // Here providing stubbed version of that object
      const wrapper = createWrapper();
      const VueImageUploadObject = { dataUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD' };
      wrapper.vm.addImage(VueImageUploadObject);
      await flushPromises();
      await flushPromises();
      expect(wrapper.find('#snapshotImage').exists()).toBeTruthy();
    });

    it('should inform user that image is loading', async () => {
      const wrapper = createWrapper();
      wrapper.vm.informUserImageLoading();
      await flushPromises();
      expect(wrapper.find('#imageLoadingView').hasStyle('display', 'none')).toBe(false);
    });

    it('should close loading view', async () => {
      // Vue Image Upload object produced by 3rd party image uploader (Vue Image Upload)
      // Here providing stubbed version of that object
      const wrapper = createWrapper();
      const VueImageUploadObject = { dataUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD' };
      wrapper.vm.addImage(VueImageUploadObject);
      await flushPromises();
      expect(wrapper.find('#imageLoadingView').hasStyle('display', 'none')).toBe(true);
    });
  });
  
  describe('Form validation on submit snapshot', () => {
    let wrapper;
  
    beforeEach(() => {
      wrapper = createWrapper();
    });
  
    it('should display error, on save snapshot, if comment not populated', (done) => {
      wrapper.find('#submitSnapshot').trigger('click');
      wrapper.vm.$nextTick(() => {
        expect(Array.isArray(wrapper.vm.commentErrors)).toBeTrue();
        expect(wrapper.vm.commentErrors).not.toBeEmpty();
        done();
      });
    });
  
    it('should display error, on save snapshot, if image not provided', (done) => {
      wrapper.find('#submitSnapshot').trigger('click');
      wrapper.vm.$nextTick(() => {
        expect(wrapper.find('#imageError').exists()).toBeTruthy();
        done();
      });
    });
  
    it('should be no error, on save snapshot, if comment is populated', (done) => {
      expect(Array.isArray(wrapper.vm.commentErrors)).toBeTrue();
      expect(wrapper.vm.commentErrors).toBeEmpty();

      wrapper.setData({
        snapshotData: {
          snapshot: { comment: 'data' },
        },
      });

      wrapper.find('#submitSnapshot').trigger('click');
      wrapper.vm.$nextTick(() => {
        expect(Array.isArray(wrapper.vm.commentErrors)).toBeTrue();
        expect(wrapper.vm.commentErrors).toBeEmpty();
        done();
      });
    });
  
    it('should be no error, on save snapshot, if image is provided', (done) => {
      expect(wrapper.find('#imageError').exists()).toBeFalsy();

      wrapper.setData({
        snapshotData: { 
          imageFile: 'data',
          localImageDisplay: '',
          snapshot: {
            imageUrl: '',
            comment: '',
          },
        },
      });

      wrapper.find('#submitSnapshot').trigger('click');
      wrapper.vm.$nextTick(() => {
        expect(wrapper.find('#imageError').exists()).toBeFalsy();
        done();
      });
    });
  });
});

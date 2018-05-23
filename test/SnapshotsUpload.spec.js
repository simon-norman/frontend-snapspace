import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';
import flushPromises from 'flush-promises';
import SnapshotsUpload from '../src/components/SnapshotsUpload.vue';

describe('SnapshotUpload.vue', () => {
  describe('Tests loading successfully', () => {
    const localVue = createLocalVue();
    localVue.use(Vuetify);
    localVue.use(Vuelidate);
  
    /* eslint no-unused-vars: 0 */
    const wrapper = mount(SnapshotsUpload, {
      localVue,
    });
    
    it('should have loaded a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });
  });

  describe('Display image', () => {
    const localVue = createLocalVue();
    localVue.use(Vuetify);
    localVue.use(Vuelidate);
  
    /* eslint no-unused-vars: 0 */
    const wrapper = mount(SnapshotsUpload, {
      localVue,
    });
    
    it('should display image when user adds image', async () => {
      const imageFile = new Blob(['image'], { type: 'image/jpg' });
      wrapper.vm.addImage(imageFile);
      await flushPromises();
      await flushPromises();
      expect(wrapper.find('#snapshotImage').exists()).toBeTruthy();
    });
  });

  describe('Save snapshot', () => {
    let wrapper; 

    beforeEach(() => {
      const localVue = createLocalVue();
      localVue.use(Vuetify);
      localVue.use(Vuelidate);
      /* eslint no-unused-vars: 0 */
      wrapper = mount(SnapshotsUpload, {
        localVue,
      });
    });
  });
  
  describe('Form validation on submit snapshot', () => {
    let wrapper;
  
    beforeEach(() => {
      const localVue = createLocalVue();
      localVue.use(Vuetify);
      localVue.use(Vuelidate);
      /* eslint no-unused-vars: 0 */
      wrapper = mount(SnapshotsUpload, {
        localVue,
      });
    });
  
    it('should display error, on submit, if comment not populated', (done) => {
      wrapper.find('#submitSnapshot').trigger('click');
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.commentErrors).not.toBeEmpty();
        done();
      });
    });
  
    it('should display error, on submit, if image not provided', (done) => {
      wrapper.find('#submitSnapshot').trigger('click');
      wrapper.vm.$nextTick(() => {
        expect(wrapper.find('#imageError').exists()).toBeTruthy();
        done();
      });
    });
  
    it('should be no error if comment is populated', (done) => {
      expect(wrapper.vm.commentErrors).toBeEmpty();

      wrapper.setData({
        snapshot: { comment: 'data' },
      });

      wrapper.find('#submitSnapshot').trigger('click');
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.commentErrors).toBeEmpty();
        done();
      });
    });
  
    it('should be no error if image is provided', (done) => {
      expect(wrapper.find('#imageError').exists()).toBeFalsy();

      wrapper.setData({ imageFile: 'data' });

      wrapper.find('#submitSnapshot').trigger('click');
      wrapper.vm.$nextTick(() => {
        expect(wrapper.find('#imageError').exists()).toBeFalsy();
        done();
      });
    });
  });
});

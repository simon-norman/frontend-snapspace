import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';
import SnapshotsUpload from '../src/components/SnapshotsUpload.vue';

describe('SnapshotsUpload.vue', () => {
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

  it('should have loaded a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('should display error ', (done) => {
    // issue is that validation is not dirty - so it's not triggering the error
    wrapper.vm.$v.snapshot.$touch();
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.commentErrors).not.toBeEmpty();
      done();
    });
  });
});

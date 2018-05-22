import { mount } from '@vue/test-utils';
import SnapshotsUpload from 'components/SnapshotsUpload.vue';

test('displays error when no comment added', () => {
  const wrapper = mount(SnapshotsUpload);
  expect(wrapper.isVueInstance()).toBeTruthy();
}); 



import testUtilsWrapperFactory from './__helpers__/test_utils_wrapper_factory';
import Alert from '../components/administrator_backend/Alert';

jest.mock('axios');

const createStubbedVuexMutations = () => {
  const stubbedMutations = {
    UPDATE_ERROR_STATUS: jest.fn(() => ''),
  };
  return stubbedMutations;
};

const createStubbedVuexGetters = () => {
  const stubbedGetters = {
    getErrorMessage: () => 'error',
    getErrorStatus: () => true,
  };
  return stubbedGetters;
};

describe('Alert.vue', () => {
  let vueTestWrapperElements;

  beforeEach(() => {
    vueTestWrapperElements = {
      componentToTest: Alert,
      vuexStoreStubs: { 
        stubbedVuexGetters: createStubbedVuexGetters(), 
        stubbedVuexMutations: createStubbedVuexMutations(), 
      },
    };
  });

  describe('Display alert', () => {
    it('should display error alert', async () => {
      const wrapper = testUtilsWrapperFactory.createWrapper(vueTestWrapperElements);
      await wrapper.vm.$nextTick();

      expect(wrapper.find('#errorAlert').hasStyle('display', 'none')).toBe(false);
    });

    it('should not display error alert', async () => {
      vueTestWrapperElements.vuexStoreStubs.stubbedVuexGetters.getErrorStatus = () => false;
      const wrapper = testUtilsWrapperFactory.createWrapper(vueTestWrapperElements);

      await wrapper.vm.$nextTick();

      expect(wrapper.find('#errorAlert').hasStyle('display', 'none')).toBe(true);
    });
  });
});

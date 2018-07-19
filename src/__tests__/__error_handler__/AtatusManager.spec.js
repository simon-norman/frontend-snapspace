import { initialiseAtatus } from '../../error_handler/AtatusManager';
import testUtilsWrapperFactory from '../__helpers__/test_utils_wrapper_factory';

const mockAtatusNotify = jest.fn(() => {});
window.atatus = {
  notify: mockAtatusNotify,
};

describe('AtatusManager.js', () => {
  const testVueComponent = {
    template: '<div></div>',
    created() {
      initialiseAtatus();
    },
  };
      
  describe('Initialise Atatus', () => {
    it('should add Atatus set up script to document head', () => {
      const testVueWrapper = testUtilsWrapperFactory.createWrapper(testVueComponent);
      expect(testVueWrapper.vm.$el.ownerDocument.head.innerHTML.includes('window._atatusConfig')).toBeTruthy();
    });

    it('should add Atatus configuration script to document head', () => {
      const testVueWrapper = testUtilsWrapperFactory.createWrapper(testVueComponent);
      expect(testVueWrapper.vm.$el.ownerDocument.head.innerHTML.includes('atatus.js')).toBeTruthy();
    });
  });
});

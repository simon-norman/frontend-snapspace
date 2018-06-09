import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';
import mockAxios from 'axios';
import SnapshotRequestApi from '../api/snapshotRequestApi';
import Menu from '../components/Menu.vue';

jest.mock('axios', () => ({
  
  post: jest.fn(() => Promise.resolve({ data: {} })),
  
}));

describe('Menu.vue', () => {
  describe('Tests loading successfully', () => {
    const localVue = createLocalVue();
    localVue.use(Vuetify);
    localVue.use(Vuelidate);
      
    /* eslint no-unused-vars: 0 */
    const wrapper = mount(Menu, {
      localVue,
    });
        
    it('should have loaded a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });
  });

  describe('Add client', () => {
    let wrapper; 

    beforeEach(() => {
      mockAxios.get.mockReset();
      mockAxios.post.mockReset();
      const localVue = createLocalVue();
      localVue.use(Vuetify);
      localVue.use(Vuelidate);
          
      /* eslint no-unused-vars: 0 */
      wrapper = mount(Menu, {
        localVue,
      });
    });
        
    it('should add a new client to the menu when I enter name and select to add', async () => {
      wrapper.setData({ 
        newClientName: 'Client',
        clients: [], 
      });
      wrapper.find('#addClient').trigger('click');
      await wrapper.vm.$nextTick();
      
      expect(wrapper.find('#ClientListGroup').exists()).toBeTruthy();
    });

    it('should display error request me to add name if name not populated', async () => {
      wrapper.find('#addClient').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.input-group--error').exists()).toBeTruthy();
    });

    it('should not add client if name is not populated', async () => {
      wrapper.find('#addClient').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('#ClientListGroup').exists()).toBeFalsy();
      expect(mockAxios.post).toHaveBeenCalledTimes(0);
    });
  });
});

import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';
import mockAxios from 'axios';
import SnapshotRequestApi from '../api/snapshotRequestApi';
import Menu from '../components/Menu.vue';

jest.mock('axios');

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
      mockAxios.post.mockReset();
      const localVue = createLocalVue();
      localVue.use(Vuetify);
      localVue.use(Vuelidate);
          
      /* eslint no-unused-vars: 0 */
      wrapper = mount(Menu, {
        localVue,
      });
    });
        
    it.only('should post client to server and, if successful, add client to client list', async () => {
      const newClientName = 'Client';
      const returnedClient = { _id: 3, name: newClientName };
      mockAxios.post.mockImplementation(() =>
        Promise.resolve({
          data: returnedClient,
        }));
      
      wrapper.setData({ 
        newClientName,
        clients: [], 
      });
      wrapper.find('#addClient').trigger('click');

      await wrapper.vm.$nextTick();
      expect(wrapper.find('#ClientListGroup').exists()).toBeTruthy();
      expect(wrapper.vm.clients[0]._id).toBe(returnedClient._id);
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

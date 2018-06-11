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
        
    it('should post client to server and, if successful, add client to client list', async () => {
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
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.clients[0]._id).toBe(returnedClient._id);
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
  describe('Error when save requests fails', () => {
    let wrapper; 
    let newRequests; 
    let savedRequests;
      
    beforeEach(() => {
      mockAxios.post.mockReset();
      mockAxios.post.mockImplementation(() => {
        throw new Error('Server error');
      });
      const localVue = createLocalVue();
      localVue.use(Vuetify);
      localVue.use(Vuelidate);
          
      /* eslint no-unused-vars: 0 */
      wrapper = mount(Menu, {
        localVue,
      });
    });
  
    it('should show an error if save was not successful', async () => {
      expect(wrapper.find('#errorMessage').hasStyle('display', 'none')).toBe(true);
      const newClientName = 'Client';
      wrapper.setData({ 
        newClientName,
        clients: [], 
      });
      wrapper.find('#addClient').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('#errorMessage').hasStyle('display', 'none')).toBe(false);
    });
  });
  describe('Add project', () => {
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
        
    it.only('should post project to server and, if successful, add project to project list', async () => {
      const newProjectName = 'Project';
      const returnedProject = { _id: 3, name: newProjectName };
      mockAxios.post.mockImplementation(() =>
        Promise.resolve({
          data: returnedProject,
        }));
      
      wrapper.setData({ 
        clients: [{
          name: 'Client', _id: 1, newProjectName, projects: [], 
        }], 
      });
      wrapper.find('#addProject').trigger('click');

      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.clients[0].projects[0]._id).toBe(returnedProject._id);
      expect(wrapper.find('#ClientListGroup').exists()).toBeTruthy();
    });
  });
});

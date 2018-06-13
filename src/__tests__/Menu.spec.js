import { mount, shallow, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';
import mockAxios from 'axios';
import Vuex from 'vuex';
import Menu from '../components/Menu.vue';

jest.mock('axios');

const createWrapper = (actions, wrapperData) => {
  const localVue = createLocalVue();
  localVue.use(Vuetify);
  localVue.use(Vuelidate);
  localVue.use(Vuex);

  const store = new Vuex.Store({
    state: {},
    actions,
  });
          
  const wrapper = shallow(Menu, {
    store,
    localVue,
  });

  if (wrapperData) {
    wrapper.setData(wrapperData);
  } 
  
  return wrapper;
};

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
    let wrapperData;
    let actions;

    beforeEach(() => {
      const newClientName = 'Client';
      wrapperData = { 
        newClientName,
        clients: [], 
      };
    });
    
    it('should save client to store', async () => {
      const clientActionData = { _id: 3, name: 'Client' };
      actions = {
        addClientAction: jest.fn(() => Promise.resolve(clientActionData)),
      };

      wrapper = createWrapper(actions, wrapperData);    

      wrapper.find('#addClient').trigger('click');

      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      expect(actions.addClientAction).toHaveBeenCalled();
    });

    it('should call Vuex action to save client and, if successful, add client to client list', async () => {
      const clientActionData = { _id: 3, name: 'Client' };
      actions = {
        addClientAction: jest.fn(() => Promise.resolve(clientActionData)),
      };

      wrapper = createWrapper(actions, wrapperData);      

      wrapper.find('#addClient').trigger('click');

      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      expect(actions.addClientAction).toHaveBeenCalled();
      expect(wrapper.vm.clients[0]._id).toBe(clientActionData._id);
      expect(wrapper.find('#ClientListGroup').exists()).toBeTruthy();
    });

    it('should display error request to add name if name not populated', async () => {
      wrapper = createWrapper();  
      wrapper.find('#addClient').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.input-group--error').exists()).toBeTruthy();
    });

    it('should not add client if name is not populated', async () => {
      wrapper = createWrapper();  
      wrapper.find('#addClient').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('#ClientListGroup').exists()).toBeFalsy();
      expect(mockAxios.post).toHaveBeenCalledTimes(0);
    });
  });

  describe('Error when save client fails', () => {
    let wrapper; 
    let wrapperData;
    let actions;

    beforeEach(() => {
      const newClientName = 'Client';
      wrapperData = { 
        newClientName,
        clients: [], 
      };
    });
  
    it('should show an error if save was not successful', async () => {
      actions = {
        addClientAction: jest.fn(() => {
          throw new Error('Server error');
        }),
      };

      wrapper = createWrapper(actions, wrapperData);   
      expect(wrapper.find('#errorMessage').hasStyle('display', 'none')).toBe(true); 

      wrapper.find('#addClient').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('#errorMessage').hasStyle('display', 'none')).toBe(false);
    });
  });

  describe('Add project', () => {
    let wrapper; 
    let wrapperData;
    let actions;
    let newProjectName;

    beforeEach(() => {
      newProjectName = 'Project';
      wrapperData = { 
        clients: [{
          name: 'Client', _id: 1, newProjectName, projects: [], 
        }], 
      };
    });
        
    it('should post project to server and, if successful, add project to project list', async () => {
      const projectActionData = { _id: 3, name: newProjectName };
      actions = {
        addProjectAction: jest.fn(() => Promise.resolve(projectActionData)),
      };

      wrapper = createWrapper(actions, wrapperData);    

      wrapper.find('#addProject').trigger('click');

      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.clients[0].projects[0]._id).toBe(projectActionData._id);
      expect(wrapper.find(`#${newProjectName}ListTile`).exists()).toBeTruthy();
    });
  });
});

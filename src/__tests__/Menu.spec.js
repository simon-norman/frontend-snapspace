import { shallow, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';
import mockAxios from 'axios';
import Vuex from 'vuex';
import Menu from '../components/Menu.vue';

jest.mock('axios');

const createWrapper = (actions, wrapperData, getters) => {
  const localVue = createLocalVue();
  localVue.use(Vuetify);
  localVue.use(Vuelidate);
  localVue.use(Vuex);

  const store = new Vuex.Store({
    state: {},
    actions,
    getters,
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
    let wrapper; 

    it('should have loaded a Vue instance', () => {
      wrapper = createWrapper(undefined, undefined, undefined); 
      expect(wrapper.isVueInstance()).toBeTruthy();
    });
  });

  describe('Add client', () => {
    let wrapper; 
    let actions;
    let getters;

    beforeEach(() => {
      actions = {
        addClientAction: jest.fn(() => Promise.resolve({})),
        addProjectAction: jest.fn(() => Promise.resolve({})),
        newClientNameAction: jest.fn(() => Promise.resolve({})),
        newProjectNameAction: jest.fn(() => Promise.resolve({})),
        loadClientsAction: jest.fn(() => Promise.resolve({})),
      };

      getters = {
        getClients: () => [],
        getNewClientName: () => 'Client',
        getNewProjectName: () => () => '',
      };
    });

    it('should save client to store', async () => {
      wrapper = createWrapper(actions, undefined, getters);    

      wrapper.find('#addClient').trigger('click');

      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      expect(actions.addClientAction).toHaveBeenCalled();
    });

    it('should add new client to client list', async () => {
      const clientActionData = { newProjectName: '', persistedClient: { name: 'Client' } };

      getters.getClients = () => [clientActionData];

      wrapper = createWrapper(actions, undefined, getters);  

      wrapper.find('#addClient').trigger('click');

      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      expect(actions.addClientAction).toHaveBeenCalled();
      expect(actions.addClientAction.mock.calls[0][1]).toEqual(clientActionData);
      expect(wrapper.find('#ClientListGroup').exists()).toBeTruthy();
    });

    it('should display error request to add name if name not populated', async () => {
      getters.getNewClientName = () => '';
      wrapper = createWrapper(actions, undefined, getters);  
      wrapper.find('#addClient').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.input-group--error').exists()).toBeTruthy();
    });

    it('should not add client if name is not populated', async () => {
      getters.getNewClientName = () => '';
      wrapper = createWrapper(actions, undefined, getters);  
      wrapper.find('#addClient').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('#ClientListGroup').exists()).toBeFalsy();
      expect(mockAxios.post).toHaveBeenCalledTimes(0);
    });

    it('should show an error if save was not successful', async () => {
      actions.addClientAction = jest.fn(() => {
        throw new Error('Server error');
      });

      wrapper = createWrapper(actions, undefined, getters);  
      expect(wrapper.find('#errorMessage').hasStyle('display', 'none')).toBe(true); 

      wrapper.find('#addClient').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('#errorMessage').hasStyle('display', 'none')).toBe(false);
    });
  });

  describe('Add project', () => {
    let wrapper; 
    let actions;
    let getters;
    let newProjectName;

    beforeEach(() => {
      actions = {
        addClientAction: jest.fn(() => Promise.resolve({})),
        addProjectAction: jest.fn(() => Promise.resolve({})),
        newClientNameAction: jest.fn(() => Promise.resolve({})),
        newProjectNameAction: jest.fn(() => Promise.resolve({})),
        loadClientsAction: jest.fn(() => Promise.resolve({})),
      };

      getters = {
        getClients: () => [],
        getNewClientName: () => 'Client',
        getNewProjectName: () => () => '',
      };
    });
        
    it('should save project with store action', async () => {
      newProjectName = 'newProject';
      const payload = { clientId: 1, clientIndex: 0, newProject: { name: newProjectName } };

      getters.getNewProjectName = () => () => newProjectName;

      const clientActionData = {
        newProjectName, 
        persistedClient: { 
          name: 'Client', 
          _id: 1,
          projects: [],
        }, 
      };
      getters.getClients = () => [clientActionData];

      wrapper = createWrapper(actions, undefined, getters);  
      wrapper.find('#addProject').trigger('click');
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      expect(actions.addProjectAction.mock.calls[0][1]).toEqual(payload);
    });

    it('should display projects in the store', async () => {
      const projectName = 'project';

      const clientActionData = { 
        persistedClient: { 
          name: 'Client', 
          _id: 1,
          projects: [{ _id: 3, name: projectName }],
        }, 
      };
      getters.getClients = () => [clientActionData];

      wrapper = createWrapper(actions, undefined, getters);     
      expect(wrapper.find(`#${projectName}ListTile`).exists()).toBeTruthy();
    });
  });
});

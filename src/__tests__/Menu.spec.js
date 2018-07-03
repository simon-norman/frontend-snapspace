import { shallow, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';
import mockAxios from 'axios';
import Vuex from 'vuex';
import Menu from '../components/Menu.vue';
import mockErrorHandler from '../error_handler/ErrorHandler';

jest.mock('axios');
jest.mock('../error_handler/ErrorHandler');

const createWrapper = (actions, getters, mutations) => {
  const localVue = createLocalVue();
  localVue.use(Vuetify);
  localVue.use(Vuelidate);
  localVue.use(Vuex);

  const store = new Vuex.Store({
    state: {},
    actions,
    getters,
    mutations,
  });
          
  const wrapper = shallow(Menu, {
    store,
    localVue,
  });
  
  return wrapper;
};

const createActions = () => {
  const actions = {
    addClientAction: jest.fn(() => Promise.resolve({})),
    addProjectAction: jest.fn(() => Promise.resolve({})),
    loadClientsAction: jest.fn(() => Promise.resolve({})),
  };
  return actions;
};

const createGetters = () => {
  const getters = {
    getClients: () => [],
    getNewClientName: () => 'Client',
    getNewProjectName: () => () => '',
  };
  return getters;
};

const createMutations = () => {
  const mutations = {
    UPDATE_NEW_CLIENT_NAME: () => '',
    UPDATE_NEW_PROJECT_NAME: () => '',
  };
  return mutations;
};

const getSavedClientData = () => {
  const savedClientData = {
    newProjectName: '', 
    savedClient: { 
      name: 'Client', 
      _id: 1,
      projects: [],
    }, 
  };
  return savedClientData;
};

describe('Menu.vue', () => {
  let wrapper; 
  let actions;
  let getters;
  let mutations;

  describe('Tests loading successfully', () => {
    it('should have loaded a Vue instance', () => {
      actions = createActions();
      getters = createGetters();
      mutations = createMutations();
      wrapper = createWrapper(actions, getters, mutations); 

      expect(wrapper.isVueInstance()).toBeTruthy();
    });
  });

  describe('Add client', () => {
    beforeEach(() => {
      actions = createActions();
      getters = createGetters();
      mutations = createMutations();
    });

    it('should save client to store', async () => {
      wrapper = createWrapper(actions, getters, mutations);    

      wrapper.find('#addClient').trigger('click');

      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      expect(actions.addClientAction.mock.calls[0][1]).toEqual({ newClient: { name: 'Client' }, newProjectName: '' });
    });

    it('should display clients saved in the store', async () => {
      const savedClientData = getSavedClientData();
      getters.getClients = () => [savedClientData];
      wrapper = createWrapper(actions, getters, mutations);   

      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      expect(wrapper.find('#ClientListGroup').exists()).toBeTruthy();
    });

    it('should display error request to add name if name not populated', async () => {
      getters.getNewClientName = () => '';
      wrapper = createWrapper(actions, getters, mutations);   

      wrapper.find('#addClient').trigger('click');

      await wrapper.vm.$nextTick();

      expect(wrapper.find('.input-group--error').exists()).toBeTruthy();
    });

    it('should not add client if name is not populated', async () => {
      getters.getNewClientName = () => '';
      wrapper = createWrapper(actions, getters, mutations);    

      wrapper.find('#addClient').trigger('click');

      await wrapper.vm.$nextTick();

      expect(wrapper.find('#ClientListGroup').exists()).toBeFalsy();
      expect(mockAxios.post).toHaveBeenCalledTimes(0);
    });

    it('should call error handler if save was not successful', async () => {
      const errorMessage = 'Client server error';
      actions.addClientAction = jest.fn(() => {
        throw new Error(errorMessage);
      });
      wrapper = createWrapper(actions, getters, mutations);   

      wrapper.find('#addClient').trigger('click');

      await wrapper.vm.$nextTick();

      const mockHandleError = mockErrorHandler.mock.instances[0].handleError;
      expect(mockHandleError.mock.calls[0][0].message).toEqual(errorMessage);
    });
  });

  describe('Add project', () => {
    const newProjectName = 'NewProjectName';
    const savedProjectName = 'SavedProjectName';

    beforeEach(() => {
      actions = createActions();
      getters = createGetters();
    });
        
    it('should save project to the store', async () => {
      const savedClientData = getSavedClientData();
      savedClientData.newProjectName = newProjectName;
      getters.getClients = () => [savedClientData];

      wrapper = createWrapper(actions, getters, mutations);  
 
      wrapper.find('#ClientAddProject').trigger('click');

      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      const payload = { clientId: 1, clientIndex: 0, newProject: { name: newProjectName } };
      expect(actions.addProjectAction.mock.calls[0][1]).toEqual(payload);
    });

    it('should display projects in the store', async () => {
      const savedClientData = getSavedClientData();
      savedClientData.savedClient.projects = [{ name: savedProjectName, _id: 1 }];
      getters.getClients = () => [savedClientData];

      wrapper = createWrapper(actions, getters, mutations);   
         
      expect(wrapper.find(`#${savedProjectName}ListTile`).exists()).toBeTruthy();
    });

    it('should call error handler if save was not successful', async () => {
      const errorMessage = 'Project server error';
      actions.addProjectAction = jest.fn(() => {
        throw new Error(errorMessage);
      });

      const savedClientData = getSavedClientData();
      savedClientData.newProjectName = newProjectName;
      getters.getClients = () => [savedClientData];

      wrapper = createWrapper(actions, getters, mutations);  
 
      wrapper.find('#ClientAddProject').trigger('click');

      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      const mockHandleError = mockErrorHandler.mock.instances[0].handleError;
      expect(mockHandleError.mock.calls[1][0].message).toEqual(errorMessage);
    });
  });
});

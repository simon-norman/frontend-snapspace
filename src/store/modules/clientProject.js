import ClientProjectApi from '../../api/clientProjectApi';

const clientProjectApi = new ClientProjectApi();

const mutations = {
  ADD_CLIENT: (state, payload) => {
    state.clients.push(payload);
  },

  ADD_PROJECT: (state, payload) => {
    state.clients[payload.clientIndex].persistedClient.projects.push(payload.savedProject);
  },

  UPDATE_NEW_CLIENT_NAME: (state, payload) => {
    state.newClientName = payload;
  },
  UPDATE_NEW_PROJECT_NAME: (state, payload) => {
    state.clients[payload.clientIndex].newProjectName = payload.newProjectName;
  },
};

const actions = {
  addClientAction: (context, payload) => new Promise(async (resolve) => {
    const result = await clientProjectApi.postClient(payload.persistedClient);
    payload.persistedClient = result.data;
    payload.storeIndex = context.getters.getClients.length;
    context.commit('ADD_CLIENT', payload);
    resolve();
  }),

  addProjectAction: ({ commit }, payload) => new Promise(async (resolve) => {
    const result = await clientProjectApi.postProject(payload.clientId, payload.newProject);
    const savedProject = result.data;
    const finalPayload = payload;
    finalPayload.savedProject = savedProject;
    commit('ADD_PROJECT', finalPayload);
    resolve();
  }),

  updateNewClientName: ({ commit }, payload) => {
    commit('UPDATE_NEW_CLIENT_NAME', payload);
  },
  updateNewProjectName: ({ commit }, payload) => {
    commit('UPDATE_NEW_PROJECT_NAME', payload);
  },
};

const getters = {
  getClients: state => state.clients,

  getNewClientName: state => state.newClientName,

  getNewProjectName: (state) => (clientIndex) => state.clients[clientIndex].newProjectName,
};

const state = {
  clients: [],
  newClientName: '',
};  

export default {
  state,
  mutations,
  getters,
  actions,
};

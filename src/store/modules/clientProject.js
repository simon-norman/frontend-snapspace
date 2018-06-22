import ClientProjectApi from '../../api/clientProjectApi';

const clientProjectApi = new ClientProjectApi();

const mutations = {
  ADD_CLIENT: (state, payload) => {
    state.clients.push(payload);
  },

  ADD_PROJECT: (state, payload) => {
    state.clients[payload.clientIndex].savedClient.projects.push(payload.savedProject);
  },

  UPDATE_NEW_CLIENT_NAME: (state, payload) => {
    state.newClientName = payload;
  },
  UPDATE_NEW_PROJECT_NAME: (state, payload) => {
    state.clients[payload.clientIndex].newProjectName = payload.newProjectName;
  },

  LOAD_CLIENTS: (state, payload) => {
    state.clients = payload;
  },
};

const actions = {
  loadClientsAction: async ({ commit }) => {
    const { data } = await clientProjectApi.getClients();

    const payload = [];
    for (const client of data) {
      payload.push({ newProjectName: '', savedClient: client });
    }

    commit('LOAD_CLIENTS', payload);
  },

  async addClientAction(context, payload) {
    try {
      const { data } = await clientProjectApi.postClient(payload.newClient);

      const finalPayload = Object.assign({}, payload);
      finalPayload.savedClient = data;
      context.commit('ADD_CLIENT', finalPayload);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async addProjectAction({ commit }, payload) {
    try {
      const { data } = await clientProjectApi.postProject(payload.clientId, payload.newProject);

      const finalPayload = Object.assign({}, payload);
      finalPayload.savedProject = data;
      commit('ADD_PROJECT', finalPayload);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
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

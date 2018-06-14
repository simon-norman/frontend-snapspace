import ClientProjectApi from '../../api/clientProjectApi';

const clientProjectApi = new ClientProjectApi();

const mutations = {
  ADD_CLIENT: (state, payload) => {
    state.clients.push(payload);
  },

  ADD_PROJECT: (state, payload) => {
    state.clients[payload.clientStoreIndex].projects.push(payload.savedProject);
  },

  UPDATE_NEW_CLIENT_NAME: (state, payload) => {
    state.newClientName = payload;
  },
};

const actions = {
  addClientAction: (context, payload) => new Promise(async (resolve) => {
    const result = await clientProjectApi.postClient(payload);
    const savedClient = result.data;
    savedClient.storeIndex = context.getters.getClients.length;
    context.commit('ADD_CLIENT', savedClient);
    resolve(savedClient);
  }),

  addProjectAction: ({ commit }, payload) => new Promise(async (resolve) => {
    const result = await clientProjectApi.postProject(payload.clientId, payload.newProject);
    const savedProject = result.data;
    // issue is somewhere here
    const finalPayload = payload;
    finalPayload.savedProject = savedProject;
    commit('ADD_PROJECT', finalPayload);
    resolve(savedProject);
  }),

  updateNewClientName: ({ commit }, payload) => {
    commit('UPDATE_NEW_CLIENT_NAME', payload);
  },
};

const getters = {
  getClients: state => state.clients,
  getNewClientName: state => state.newClientName,
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

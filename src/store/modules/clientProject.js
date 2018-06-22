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

  LOAD_CLIENTS: (state, payload) => {
    state.clients = payload;
  },
};

const actions = {
  loadClientsAction: async ({ commit }) => {
    const result = await clientProjectApi.getClients();
    const clients = result.data;
    const payload = [];
    for (const client of clients) {
      payload.push({ newProjectName: '', persistedClient: client });
    }
    commit('LOAD_CLIENTS', payload);
  },

  // addClientAction: (context, payload) => new Promise(async (resolve, reject) => {
  //   try {
  //     const result = await clientProjectApi.postClient(payload.persistedClient);
  //     payload.persistedClient = result.data;
  //     context.commit('ADD_CLIENT', payload);
  //     resolve();
  //   } catch (error) {
  //     reject(error);
  //     // error handle 
  //   }
  // }),
  // Add try and catch 
  async addClientAction(context, payload) {
    try {
      const result = await clientProjectApi.postClient(payload.persistedClient);
      payload.persistedClient = result.data;
      context.commit('ADD_CLIENT', payload);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
      // error handle 
    }
  },
  addProjectAction: ({ commit }, payload) => new Promise(async (resolve, reject) => {
    try {
      const { data } = await clientProjectApi.postProject(payload.clientId, payload.newProject);
      const finalPayload = payload;
      finalPayload.savedProject = data;
      commit('ADD_PROJECT', finalPayload);
      resolve();
    } catch (error) {
      reject(error);
    // error handle 
    }
  }),

  newClientNameAction: ({ commit }, payload) => {
    commit('UPDATE_NEW_CLIENT_NAME', payload);
  },
  
  newProjectNameAction: ({ commit }, payload) => {
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

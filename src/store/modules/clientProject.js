import ClientProjectApi from '../../api/clientProjectApi';

const clientProjectApi = new ClientProjectApi();

const mutations = {
  ADD_CLIENT: (state, client) => {
    state.clientsProjects.push(client);
  },

  ADD_PROJECT: (state, client) => {
    state.clientsProjects.push(client);
  },
};

const actions = {
  addClientAction: ({ commit }, payload) => new Promise(async (resolve) => {
    debugger;
    const result = await clientProjectApi.postClient(payload);
    const savedClient = result.data;
    commit('ADD_CLIENT', savedClient);
    resolve(savedClient);
  }),

  addProjectAction: ({ commit }, payload) => new Promise(async (resolve) => {
    const result = await clientProjectApi.postProject(payload.clientId, payload.newProject);
    const savedProject = result.data;
    commit('ADD_PROJECT', savedProject);
    resolve(savedProject);
  }),
};

const getters = {
  getClientsProjects: state => state.clientsProjects,
};

const state = {
  clientsProjects: [],
};  

export default {
  state,
  mutations,
  getters,
  actions,
};

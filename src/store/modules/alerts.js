
const mutations = {
  UPDATE_ERROR_MESSAGE: (state, payload) => {
    state.errorMessage = payload;
  },

  UPDATE_ERROR_STATUS: (state, payload) => {
    state.errorStatus = payload;
  },

  UPDATE_SUCCESS_STATUS: (state, payload) => {
    state.successStatus = payload;
  },

  UPDATE_SUCCESS_MESSAGE: (state, payload) => {
    state.successMessage = payload;
  },
};

const getters = {
  getErrorMessage: state => state.errorMessage,

  getErrorStatus: state => state.errorStatus,
  
  getSuccessMessage: state => state.successMessage,

  getSuccessStatus: state => state.successStatus,
};

const state = {
  errorStatus: false,
  errorMessage: '',
  successStatus: false,
  successMessage: '',
};  

export default {
  state,
  mutations,
  getters,
};

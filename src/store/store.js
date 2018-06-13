import Vue from 'vue';
import Vuex from 'vuex';
import clientProject from './modules/clientProject';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    clientProject,
  },
});


import Vue from 'vue';
import Vuex from 'vuex';
import clientProject from './modules/clientProject';
import alerts from './modules/alerts';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    clientProject,
    alerts,
  },
});


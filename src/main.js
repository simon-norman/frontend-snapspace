// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Lazyload from 'vue-lazyload-component';
import {
  Vuetify,
  VApp,
  VAlert,
  VCard,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VTextField,
  VGrid,
  VToolbar,
  transitions,
} from 'vuetify';

import App from './App.vue';
import router from './router';
import { store } from './store/store';

import '../static/assets/css/snapspace.css';
import '../node_modules/vuetify/src/stylus/app.styl';

Vue.use(Vuelidate);

Vue.use(Lazyload);

Vue.use(Vuetify, {
  components: {
    VApp,
    VAlert,
    VCard,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VTextField,
    VToolbar,
    transitions,
  },
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  },
});

Vue.config.productionTip = false;

// axios.defaults.baseURL = process.env.SNAPSPACE_API;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
});

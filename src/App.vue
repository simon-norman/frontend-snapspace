<template>
  <v-app>
    <v-content>
      <router-view name="alert"/>
      <router-view name="menu"/>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import { initialiseAtatus } from './error_handler/AtatusManager';

export default {
  name: 'App',
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire',
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    };
  },

  created() {
    initialiseAtatus();
  },
};
</script>

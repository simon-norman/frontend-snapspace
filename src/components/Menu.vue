<template>
  <v-container 
    fluid 
    fill-height>
    <v-navigation-drawer
      stateless
      value="true"
    >
      <v-list>
        <v-list-tile>
          <v-text-field 
            v-model="newClientName"  
            :error-messages="clientNameErrors"
            label="Client Name"
            required
            type="text"/>
          <v-icon
            id="addClient"   
            medium
            @click="addClient()">add</v-icon>
        </v-list-tile>
        <v-list-group
          v-for="(client) in clients"
          :id="client.name + 'ListGroup'"
          :key="client.name"
          value="true"
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>{{ client.name }}</v-list-tile-title>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>
<script>

import { required } from 'vuelidate/lib/validators';
// import SnapshotRequestApi from '../api/snapshotRequestApi';

// const snapshotRequestApi = new SnapshotRequestApi();
export default {
  name: 'Menu',
  data() {
    return {
      newClientName: '',
      clients: [
      ],
    };
  },
  validations: {
    newClientName: { required },
  },
  computed: {
    clientNameErrors() {
      debugger;
      const errors = [];
      if (this.$v.newClientName.$error) {
        errors.push('Please provide a name');
      }
      return errors;
    },
  },
  async mounted() {
    // placeholder for mounted
  },
  methods: {
    addClient() {
      this.$v.$touch();
      if (!this.$v.$error) {
        this.$v.$reset();
        this.clients.push({ name: this.newClientName });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

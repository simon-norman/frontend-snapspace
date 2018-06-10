<template>
  <v-container 
    fluid 
    fill-height>
    <div>
      <v-alert 
        id="errorMessage"
        v-model="errorAlert.active" 
        transition="scale-transition"
        type="error" 
        dismissible>
        {{ errorAlert.message }}
      </v-alert>
    </div>
    <v-navigation-drawer
      stateless
      value="true"
    >
      <v-list>
        <v-list-tile>
          <v-text-field 
            v-model="newClientName"  
            :error-messages="clientNameErrors"
            solo
            flat
            label="New client name"
            required
            type="text"/>
          <v-icon
            id="addClient"   
            medium
            @click="addClient()">add</v-icon>
        </v-list-tile>
        <div id="specialdiv">
          <v-list-group
            v-for="client in clients"
            :id="client.name + 'ListGroup'"
            :key="client.name"
            value="true"
          >
            <v-list-tile slot="activator">
              <v-list-tile-title>{{ client.name }}</v-list-tile-title>
            </v-list-tile>
          </v-list-group>
        </div>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>
<script>

import { required } from 'vuelidate/lib/validators';
import ClientProjectApi from '../api/clientProjectApi';

const clientProjectApi = new ClientProjectApi();
export default {
  name: 'Menu',
  data() {
    return {
      errorAlert: {
        active: false,
        message: '',
      },
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
      const errors = [];
      if (this.$v.newClientName.$error) {
        errors.push('');
      }
      return errors;
    },
  },
  async mounted() {
    // placeholder for mounted
  },
  methods: {
    async addClient() {
      this.$v.$touch();
      
      if (!this.$v.$error) {
        this.$v.$reset();
        const newClient = { name: this.newClientName };

        try {
          const result = 
            await clientProjectApi.postClient(newClient);
          // should check if result code is 201?
          this.clients.push(result.data);
        } catch (error) {
          // placeholder for logging
          this.errorAlert.message = 
          ('So sorry, there\'s been an error - ' +
          'please contact us or try again later');
          this.errorAlert.active = true; 
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

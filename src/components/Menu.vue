<template>
  <v-container 
    fluid 
    fill-height>
    <v-layout column>
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
          <v-list-group
            v-for="(client, index) in clients"
            :id="client.name + 'ListGroup'"
            :key="client.name"
            value="true"
          >
            <v-list-tile slot="activator">
              <v-list-tile-title>{{ client.name }}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-text-field 
                v-model="client.newProjectName"  
                :error-messages="projectNameErrors(index)"
                solo
                flat
                label="New project name"
                required
                type="text"/>
              <v-icon
                id="addProject"   
                medium
                @click="addProject(index)">add</v-icon>
            </v-list-tile>
            <v-list-tile
              v-for="project in clients[index].projects"
              :id="project.name + 'ListTile'"
              :key="project.name"
              value="true"/>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
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
    clients: {
      $each: {
        newProjectName: { required },
      },
    },
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
    projectNameErrors(clientIndex) {
      const errors = [];
      if (this.$v.clients.$each[clientIndex].newProjectName.$error) {
        errors.push('Please provide a name');
      }
      return errors;
    },
    async addClient() {
      this.$v.$touch();
      
      if (!this.$v.newClientName.$error) {
        this.$v.$reset();
        const newClient = { name: this.newClientName };

        try {
          const result = 
            await clientProjectApi.postClient(newClient);
          // should check if result code is 201?
          this.clients.push(result.data);
        } catch (error) {
          // placeholder for logging
          if (error.response) {
            this.errorAlert.message = error.response.data.error.message;
          } else {
            this.errorAlert.message = 
          ('So sorry, there\'s been an error - ' +
          'please contact us or try again later');
          }

          this.errorAlert.active = true; 
        }
      }
    },
    async addProject(clientIndex) {
      this.$v.$touch();
      
      if (!this.$v.clients.$each[clientIndex].newProjectName.$error) {
        this.$v.$reset();
        const newProject = { name: this.clients[0].newProjectName };
        

        try {
          debugger;
          const result = 
            await clientProjectApi.postProject(this.clients[clientIndex]._id, newProject);
          this.clients[clientIndex].projects.push(result.data);
          debugger;
        } catch (error) {
          // placeholder for logging
          if (error.response) {
            this.errorAlert.message = error.response.data.error.message;
          } else {
            this.errorAlert.message = 
          ('So sorry, there\'s been an error - ' +
          'please contact us or try again later');
          }

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

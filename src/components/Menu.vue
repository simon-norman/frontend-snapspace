<template>
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
      fixed
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
          v-for="(client, clientIndex) in getClients"
          :id="client.name + 'ListGroup'"
          :key="client.name"
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>{{ client.name }}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-text-field 
              v-model="client.newProjectName"  
              :error-messages="projectNameErrors(clientIndex)"
              solo
              flat
              label="New project name"
              required
              type="text"/>
            <v-icon
              id="addProject"   
              medium
              @click="addProject(clientIndex)">add</v-icon>
          </v-list-tile>
          <v-list-tile
            v-for="project in clients[clientIndex].projects"
            :id="project.name + 'ListTile'"           
            :key="project.name"
            :to="snapshotRequestsLink(client._id, project._id)">
            <v-list-tile-content>
              <v-list-tile-title>{{ project.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>
<script>

import { required } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Menu',
  data() {
    return {
      errorAlert: {
        active: false,
        message: '',
      },
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
    ...mapGetters([
      'getClients',
      'getNewClientName',
    ]),
    clientNameErrors() {
      const errors = [];
      if (this.$v.newClientName.$error) {
        errors.push('');
      }
      return errors;
    },
    newClientName: {
      get() {
        return this.getNewClientName;
      },
      set(newClientName) {
        this.updateNewClientName(newClientName);
      },
    },
  },
  async mounted() {
    // placeholder for mounted
  },
  methods: {
    ...mapActions([
      'addClientAction',
      'addProjectAction',
      'updateNewClientName',
    ]),
    snapshotRequestsLink(clientId, projectId) {
      return `/client/${clientId}/project/${projectId}/snapshotRequests`;
    },
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
          const savedClient = await this.addClientAction(newClient);
          this.clients.push(savedClient);
          this.newClientName = '';
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
          const payload = { 
            clientId: this.clients[clientIndex]._id, 
            clientStoreIndex: this.clients[clientIndex].storeIndex, 
            newProject, 
          };
          await this.addProjectAction(payload);
          this.clients[clientIndex].newProjectName = '';
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

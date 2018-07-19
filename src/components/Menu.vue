<template>
  <v-layout column>
    <v-navigation-drawer
      fixed
      stateless
      value="true"
    >
      <v-list>
        <v-list-tile>
          <v-text-field 
            v-model="newClientName"  
            :error-messages="clientNameErrors()"
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
          v-for="(client, clientIndex) in clients"
          :id="client.savedClient.name + 'ListGroup'"
          :key="client.savedClient.name"
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>{{ client.savedClient.name }}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-text-field 
              :error-messages="projectNameErrors(clientIndex)"
              :value="getNewProjectName(clientIndex)"
              solo
              flat
              label="New project name"
              required
              type="text"
              @input="UPDATE_NEW_PROJECT_NAME({clientIndex, newProjectName: $event})"/>
            <v-icon
              :id="client.savedClient.name + 'AddProject'"  
              medium
              @click="addProject(clientIndex)">add</v-icon>
          </v-list-tile>
          <v-list-tile
            v-for="project in clients[clientIndex].savedClient.projects"
            :id="project.name + 'ListTile'"           
            :key="project._id"
            :to="snapshotRequestsLink(client.savedClient._id, project._id)">
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
import { mapGetters, mapMutations, mapActions } from 'vuex';
import ErrorHandler from '../error_handler/ErrorHandler';

const errorHandler = new ErrorHandler();

export default {
  name: 'Menu',

  data() {
    return {
      errorAlert: {
        active: false,
        message: '',
      },
      errorAlertMessages: {
        generalError: 'So sorry, there\'s been an error - please contact us or try again later',
      },
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
      'getNewClientName',
      'getNewProjectName',
      'getClients',
    ]),

    newClientName: {
      get() {
        return this.getNewClientName;
      },
      set(newClientName) {
        this.UPDATE_NEW_CLIENT_NAME(newClientName);
      },
    },

    clients() {
      return this.getClients;
    },
  },

  created() {
    this.loadClientsAction();
  },

  methods: {
    ...mapActions([
      'addClientAction',
      'addProjectAction',
      'loadClientsAction',
    ]),

    ...mapMutations([
      'UPDATE_NEW_CLIENT_NAME',
      'UPDATE_NEW_PROJECT_NAME',
    ]),

    snapshotRequestsLink(clientId, projectId) {
      return `/client/${clientId}/project/${projectId}/snapshotRequests`;
    },

    clientNameErrors() {
      const validationErrors = [];
      if (this.$v.newClientName.$error) {
        validationErrors.push('');
      }
      return validationErrors;
    },

    projectNameErrors(clientIndex) {
      const validationErrors = [];
      if (this.$v.clients.$each[clientIndex].newProjectName.$error) {
        validationErrors.push('');
      }
      return validationErrors;
    },

    async addClient() {
      console.log('another testsssssss');
      this.$v.newClientName.$touch();   
      if (!this.$v.newClientName.$error) {
        this.$v.$reset();
        try {
          const newClientUi = { newProjectName: '', newClient: { name: this.newClientName } };
          await this.addClientAction(newClientUi);
          this.newClientName = '';
        } catch (error) {
          errorHandler.handleError(error);
        }
      }
    },

    async addProject(clientIndex) {
      this.$v.clients.$touch();
      if (!this.$v.clients.$each[clientIndex].newProjectName.$error) {
        this.$v.$reset();
        try {
          const newProject = { name: this.clients[clientIndex].newProjectName }; 
          const payload = { 
            clientId: this.clients[clientIndex].savedClient._id, 
            clientIndex,
            newProject, 
          };
          await this.addProjectAction(payload);
          this.clients[clientIndex].newProjectName = '';
        } catch (error) {
          errorHandler.handleError(error);
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

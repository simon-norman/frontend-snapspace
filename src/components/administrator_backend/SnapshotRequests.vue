<template>
  <v-container 
    fluid 
    fill-height>
    <div>
      <v-alert 
        id="successMessage"
        v-model="submitSuccessAlert" 
        transition="scale-transition"
        type="success" 
        dismissible>
        Success! WELL DONE YOU!!!!!!
      </v-alert>
    </div>
    <v-layout 
      align-center 
      justify-center>
      <v-flex 
        id="snapshotflex" 
        xs12 
        sm8 
        md4>
        <v-list>
          <v-list-tile 
            v-for="(uiRequest, index) in uiRequests"
            v-if="uiRequest.snapshotRequest.status === 'active'" 
            :key="uiRequest.uiRequestId">
            <v-text-field 
              :label="'Request ' + (index + 1)" 
              :id="'request' + (uiRequest.uiRequestId)"  
              v-model="uiRequest.snapshotRequest.name"
              :error-messages="nameErrors(index)"
              required
              class="requestTitle" 
              type="text"/>
            <v-icon
              :id="'deleteRequest' + (uiRequest.uiRequestId)"   
              medium
              @click="deleteRequest(index)">delete</v-icon>
          </v-list-tile>
        </v-list>
        <v-btn 
          id="addRequest"
          class="info" 
          @click="addRequest()">Add request</v-btn>
        <v-btn 
          id="saveRequests" 
          class="info"
          @click="saveRequests()">Save requests</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { required } from 'vuelidate/lib/validators';
import SnapshotRequestApi from '../../api/snapshotRequestApi';
import ErrorHandler from '../../error_handler/ErrorHandler';

const errorHandler = new ErrorHandler();

const snapshotRequestApi = new SnapshotRequestApi();
export default {
  name: 'SnapshotRequests',

  data() {
    return {
      submitSuccessAlert: false,
      requestIdCounter: 1,
      clientId: this.$route.params.clId,
      projectId: this.$route.params.prId,
      uiRequests: [
      ],
    };
  },
  
  validations: {
    uiRequests: {
      $each: {
        snapshotRequest: {
          name: { required },
        },
      },
    },
  },

  watch: {
    $route: {
      // This will be fired before created in component lifecycle
      handler() {
        this.clientId = this.$route.params.clId;
        this.projectId = this.$route.params.prId;
        this.loadSnapshotRequests();
      },
      immediate: true,
    },
  },

  methods: {
    nameErrors(requestIndex) {
      const errors = [];
      if (this.$v.uiRequests.$each[requestIndex].snapshotRequest.name.$error) {
        errors.push('Please provide a name');
      }
      return errors;
    },

    async loadSnapshotRequests() {
      this.uiRequests = [];
      try {
        const result = await snapshotRequestApi.getSnapshotRequests(this.clientId, this.projectId);
        const snapshotRequests = result.data;
        for (const snapshotRequest of snapshotRequests) {
          this.addRequest(snapshotRequest);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.addRequest();
        } else {
        // placeholder for error
        }
      }
    },

    addRequest(snapshotRequest) {
      let _id;
      let name;
      
      if (snapshotRequest) {
        ({ name, _id } = snapshotRequest);
      }
      this.uiRequests.push({ 
        uiRequestId: this.requestIdCounter, 
        snapshotRequest: 
        { _id, name, status: 'active' }, 
      });
      this.incrementRequestId();
    },  

    incrementRequestId() {
      this.requestIdCounter = this.requestIdCounter + 1;
    },

    deleteRequest(index) {
      if (this.uiRequests[index].snapshotRequest._id) {
        this.uiRequests[index].snapshotRequest.status = 'deleted';
      } else {
        this.uiRequests.splice(index, 1);
      }
    },

    async saveRequests() {
      this.$v.$touch();
      if (!this.$v.$error) {
        this.$v.$reset();
        try {
          const postRequests = [];
          let sequence = 1;
          for (const uiRequest of this.uiRequests) {
            uiRequest.snapshotRequest.sequence = sequence; 
            postRequests.push(uiRequest.snapshotRequest);
            sequence += 1;
          }
          const result = 
            await snapshotRequestApi.postRequests(this.clientId, this.projectId, postRequests);
          for (const snapshotRequest of result.data) {
            this.uiRequests.find(uiRequest => 
              uiRequest.snapshotRequest.sequence === snapshotRequest.sequence)
              .snapshotRequest._id = snapshotRequest._id;
          }
          window.scrollTo(0, 0);
          this.submitSuccessAlert = true;
          setTimeout(() => {
            this.submitSuccessAlert = false;
          }, 4000);
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

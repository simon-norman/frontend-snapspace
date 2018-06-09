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
    <v-layout 
      align-center 
      justify-center>
      <v-flex 
        id="snapshotflex" 
        xs12 
        sm8 
        md4>
        <v-list >
          <v-list-tile 
            v-for="(uiRequest, index) in uiRequests"
            v-if="uiRequest.isActive" 
            :key="uiRequest.uiRequestId">
            <v-text-field 
              :label="'Request ' + (index + 1)" 
              :id="'request' + (uiRequest.uiRequestId)"  
              :value="uiRequest.snapshotRequest.name"
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
import SnapshotRequestApi from '../api/snapshotRequestApi';

const snapshotRequestApi = new SnapshotRequestApi();
export default {
  name: 'SnapshotRequests',
  data() {
    return {
      submitSuccessAlert: false,
      errorAlert: {
        active: false,
        message: '',
      },
      requestIdCounter: 1,
      clientId: 1,
      prId: 2,
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
  async mounted() {
    try {
      const result = await snapshotRequestApi.getSnapshotRequests(this.clientId, this.prId);
      const snapshotRequests = result.data;
      if (!Array.isArray(snapshotRequests) || !snapshotRequests.length) { 
        this.addRequest();
      } else {
        for (const snapshotRequest of snapshotRequests) {
          this.addRequest(snapshotRequest);
        } 
      }
    } catch (error) {
      // placeholder for logging
    }
  },
  methods: {
    nameErrors(requestIndex) {
      const errors = [];
      if (this.$v.uiRequests.$each[requestIndex].snapshotRequest.name.$error) {
        errors.push('Please provide a name');
      }
      return errors;
    },
    addRequest(snapshotRequest) {
      let _id;
      let name;
      if (snapshotRequest) {
        ({ name, _id } = snapshotRequest);
      }
      this.uiRequests.push({ 
        uiRequestId: this.requestIdCounter, 
        isActive: true,
        snapshotRequest: 
        { _id, name }, 
      });
      this.incrementRequestId();
    },  

    incrementRequestId() {
      this.requestIdCounter = this.requestIdCounter + 1;
    },

    deleteRequest(index) {
      if (this.uiRequests[index].snapshotRequest._id) {
        this.uiRequests[index].isActive = false;
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
          for (const uiRequest of this.uiRequests) {
            postRequests.push(uiRequest.snapshotRequest);
          }
          const result = 
            await snapshotRequestApi.saveRequests(this.clientId, this.projectId, postRequests);
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
          window.scrollTo(0, 0);
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

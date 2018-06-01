<template>
  <v-container 
    fluid 
    fill-height>
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
              class="requestName" 
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
          class="info">Save requests</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import SnapshotRequestApi from '../api/snapshotRequestApi';

const snapshotRequestApi = new SnapshotRequestApi();
export default {
  name: 'SnapshotRequests',
  data() {
    return {
      requestIdCounter: 1,
      uiRequests: [
      ],
    };
  },
  async mounted() {
    try {
      const result = await snapshotRequestApi.getSnapshotRequests();
      const snapshotRequests = result.data;
      if (!Array.isArray(snapshotRequests) || !snapshotRequests.length) { 
        this.addRequest();
      } else {
        for (const snapshotRequest of snapshotRequests) {
          this.addRequest(snapshotRequest);
        } 
      }
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    addRequest(snapshotRequest) {
      let _id = '';
      let name = '';
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

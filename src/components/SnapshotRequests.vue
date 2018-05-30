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
        <v-text-field 
          v-for="(snapshotRequest, index) in snapshotRequests" 
          :key="snapshotRequest._id" 
          :label="'Request ' + (index + 1)" 
          :id="'request' + (index + 1)"  
          class="requestTitle"
          type="text"/>
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
      snapshotRequests: [
        { _id: '', description: 'description' },
      ],
    };
  },
  async mounted() {
    try {
      const result = await snapshotRequestApi.getSnapshotRequests();
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    addRequest() {
      this.snapshotRequests.push({ _id: '', description: '' });
    }, 
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

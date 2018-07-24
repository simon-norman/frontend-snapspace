<template>
  <v-layout 
    column>
    <div>
      <v-alert 
        :value="getSuccessStatus" 
        class="page-top-alert"
        transition="scale-transition"
        type="success" 
        dismissible>
        {{ getSuccessMessage }}
      </v-alert>
    </div>
    <div class="snapshots-upload-container">
      <snapshots-upload 
        v-for="snapshotRequest in snapshotRequests"
        ref="snapshots"
        :key="snapshotRequest._id"
        :request-name="snapshotRequest.name"
        :request-id="snapshotRequest._id"
        :request-sequence="snapshotRequest.sequence"
        class="snapshot-upload"
      />
    </div>
  </v-layout>
</template>
<script>

import { mapGetters } from 'vuex';
import SnapshotsUpload from './SnapshotsUpload.vue';
import SnapshotRequestApi from '../api/snapshotRequestApi';

const snapshotRequestApi = new SnapshotRequestApi();

export default {
  name: 'Menu',
  components: {
    SnapshotsUpload,
  },
  data() {
    return {
      snapshotRequests: [],
      clientId: this.$route.params.clId,
      projectId: this.$route.params.prId,
    };
  },    
  computed: {
    ...mapGetters([
      'getSuccessMessage',
      'getSuccessStatus',
    ]),
  },
  created() {
    this.loadSnapshotRequests();
  },
  methods: {
    async loadSnapshotRequests() {
      try {
        const result = await snapshotRequestApi.getSnapshotRequests(this.clientId, this.projectId);
        this.snapshotRequests = result.data;
      } catch (error) {
        // placeholder for error
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<template>
  <v-layout column>
    <snapshots-upload 
      v-for="snapshotRequest in snapshotRequests"
      :key="snapshotRequest._id"
    />
  </v-layout>
</template>
<script>

import SnapshotsUpload from './SnapshotsUpload.vue';
import SnapshotRequestApi from '../api/snapshotRequestApi';

const snapshotRequestApi = new SnapshotRequestApi();

export default {
  name: 'Menu',
  components: {
    'snapshots-upload': SnapshotsUpload,
  },
  data() {
    return {
      snapshotRequests: [],
      clientId: this.$route.params.clId,
      projectId: this.$route.params.prId,
    };
  },    
  async created() {
    await this.loadSnapshotRequests();
    // placeholder for mounted
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

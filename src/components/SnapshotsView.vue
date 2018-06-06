<template>
  <v-container 
    grid-list-md 
    text-xs-center>
    <v-layout 
      row 
      wrap>
      <v-flex 
        v-for="snapshot in snapshots" 
        id="snapshotflex"
        :key="snapshot._id" 
        xs4
      >
        <lazy-component>
          <v-card 
            flat 
            color="transparent">
            <v-card-media 
              :src="snapshot.imageURL" 
              contain 
              height="200px"/>
            <v-card-text 
              primary-title 
              class="title">
              <div>
                <div>{{ snapshot.comment }}</div>
              </div>
            </v-card-text>
          </v-card>
        </lazy-component>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SnapshotApi from '../api/snapshotApi';

const snapshotApi = new SnapshotApi();
export default {
  name: 'SnapshotsView',
  data() {
    return {
      snapshots: [
      ],
    };
  },
  async mounted() {
    try {
      const result = await snapshotApi.getSnapshots();
      this.snapshots = result.data;
    } catch (error) {
      // placeholder for logging
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.acrossPage {
  flex-direction: row;
}
</style>

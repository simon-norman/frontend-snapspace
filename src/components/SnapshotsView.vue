<template>
  <v-container 
    grid-list-md 
    text-xs-center>
    <v-layout 
      row 
      wrap>
      <v-flex 
        v-for="snapshot in snapshots" 
        :key="snapshot._id" 
        xs4>
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SnapshotApi from '../api/snapshotApi';

const snapshotApi = new SnapshotApi();
export default {
  name: 'App',
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
      console.log(error);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

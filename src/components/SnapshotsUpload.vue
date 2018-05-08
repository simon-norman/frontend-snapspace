<template>
  <v-container grid-list-xl>
    <v-layout row justify-center align-center wrap>
      <v-flex xs12 s4 md3>
        <label class="btn btn-file info btn--block">
          Take photo
          <input type="file" @change="addPhoto($event.target.files[0])" id="addphoto" accept="image/*" style="display: none;">
        </label>
      </v-flex>
    </v-layout>
    <v-layout row justify-center align-center wrap>
      <v-flex xs12 s4 md3>
        <v-text-field
          name="input-7-1"
          label="Tell us more"
          multi-line
        ></v-text-field>
      </v-flex>
    </v-layout>  
    <v-layout row justify-center align-center wrap>
      <v-flex xs12 s4 md3>
        <v-btn block v-on:click="saveSnapshot()" class="info">Submit</v-btn>
      </v-flex>
    </v-layout>    
  </v-container>
</template>

<script>
import axios from 'axios'
axios.defaults.baseURL = process.env.SNAPSPACE_API
export default {
  data () {
    return {
      imageFile: '',
      imageURL: '',
      comment: ''
    }
  },
  methods: {
    addPhoto (imageFile) {
      this.imageFile = imageFile
    },
    saveSnapshot () {
      this.storeImage()
    },
    storeImage () {
      const imageFile = this.imageFile
      axios
        .get('/signedAWSURL', {
          params: {
            imageFileName: Date.now()
          }
        })

        .then(function (result) {
          const signedURL = result.data.signedAWSURL
          console.log(result)
          var options = {
            headers: {
              'Content-Type': imageFile.type
            }
          }

          return axios.put(signedURL, imageFile, options)
        })

        .then(function (result) {
          console.log(result)
        })

        .catch(function (err) {
          console.log(err)
        })
    }
  },
  name: 'App'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
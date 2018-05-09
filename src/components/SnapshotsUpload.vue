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
          v-model="snapshot.comment"
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
console.log(process.env.NODE_ENV)
export default {
  data () {
    return {
      imageFile: '',
      snapshot: {
        imageURL: '',
        comment: ''
      }
    }
  },
  methods: {
    addPhoto (imageFile) {
      this.imageFile = imageFile
      console.log(process.env.NODE_ENV)
    },
    saveSnapshot () {
      console.log(process.env.SNAPSPACE_API)
      console.log(process.env.NODE_ENV)
      const self = this
      this.storeImage(() => {
        axios
          .post('/snapshot', self.snapshot)
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      })
    },
    storeImage (callback) {
      const self = this
      axios
        .get('/image-aws-config', {
          params: {
            imageFileName: Date.now()
          }
        })

        .then(result => {
          self.snapshot.imageURL = result.data.imageURL
          console.log(result.data.imageURL)
          var options = {
            headers: {
              'Content-Type': self.imageFile.type
            }
          }

          return axios.put(result.data.signedAWSURL, self.imageFile, options)
        })

        .then(result => {
          callback()
        })

        .catch(err => {
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
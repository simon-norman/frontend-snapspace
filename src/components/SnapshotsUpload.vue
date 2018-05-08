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
        <v-btn block class="info">Submit</v-btn>
      </v-flex>
    </v-layout>    
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      imageFile: "",
      imageURL: "",
      comment: ""
    };
  },
  methods: {
    addPhoto(imageFile) {
      this.imageFile = imageFile;
    },
    storeImage() {
      const imageFile = this.imageFile;
      axios
        .get('/signedAWSURL', {
          imageFileName: Date.now()
        })

        .then(function(result) {
          var signedUrl = result.data.signedUrl;
          var options = {
            headers: {
              "Content-Type": imageFile.type
            }
          };

          return axios.put(signedUrl, imageFile, options);
        })

        .then(function(result) {
          console.log(result);
        })
        
        .catch(function(err) {
          console.log(err);
        });
    },
  },
  name: "App"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
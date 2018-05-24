<template>
  <v-container
    id="uploadContainer" 
    fluid 
    grid-list-xl>
    <div>
      <v-alert 
        v-model="submitSuccessAlert" 
        transition="scale-transition"
        type="success" 
        dismissible>
        Thank you for your help!
      </v-alert>
    </div>
    <div>
      <v-alert 
        v-model="errorAlert.active" 
        transition="scale-transition"
        type="error" 
        dismissible>
        {{ errorAlert.message }}
      </v-alert>
    </div>
    <v-layout 
      row 
      justify-center 
      align-center 
      wrap>
      <v-flex 
        xs12 
        s4 
        md3>
        <v-card 
          flat 
          color="transparent">
          <v-card-media 
            v-if="localImageDisplay"
            id="snapshotImage"
            :src="localImageDisplay" 
            contain
            height="200px"/></v-card>
      </v-flex>
    </v-layout>
    <v-layout 
      row 
      justify-center 
      align-center 
      wrap>
      <v-flex 
        xs12 
        s4 
        md3>
        <label 
          class="btn btn-file btn--block info">
          Take a photo of a problem in your workspace
          <input 
            id="addImage" 
            type="file" 
            accept="image/*" 
            capture="camera"
            style="display: none;" 
            @change="addImage($event.target.files[0])">
        </label>
        <div 
          v-if="$v.imageFile.$error"
          id="imageError"
          class="input-group__messages 
      input-group__error input-group__details input-group--error 
      input-group--required error--text">
          Please add a photo</div>
      </v-flex>
    </v-layout>
    <v-layout 
      row 
      justify-center 
      align-center 
      wrap>
      <v-flex 
        xs12 
        s4 
        md3>
        <v-text-field
          id="snapshotComment"
          v-model="snapshot.comment"
          :error-messages="commentErrors"
          class="spacelabThin"
          name="input-7-1"
          label="Tell us more about the problem"
          multi-line
          required
          rows="3"
        />
      </v-flex>
    </v-layout>  
    <v-layout 
      row 
      justify-center 
      align-center 
      wrap>
      <v-flex 
        xs12 
        s4 
        md3>
        <v-btn 
          id="submitSnapshot"
          class="info"
          block 
          @click="saveSnapshot()">Submit</v-btn>
      </v-flex>
    </v-layout>    
  </v-container>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import SnapshotApi from '../api/snapshotApi';
import ImageApi from '../api/imageApi';

const snapshotApi = new SnapshotApi();
const imageApi = new ImageApi();
export default {
  name: 'App',
  data() {
    return {
      submitSuccessAlert: false,
      errorAlert: {
        active: false,
        message: '',
      },
      imageFile: '',
      localImageDisplay: '',
      snapshot: {
        imageURL: '',
        comment: '',
      },
    };
  },
  validations: {
    snapshot: {
      comment: { required },
    },
    imageFile: { required },
  },
  computed: {
    commentErrors() {
      const errors = [];
      if (this.$v.snapshot.comment.$error) {
        errors.push('Please provide a comment');
      }
      return errors;
    },
  },
  methods: {
    addImage(imageFile) {
      if (!imageFile) return;
      this.imageFile = imageFile;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.localImageDisplay = e.target.result;
      };
      reader.readAsDataURL(imageFile);
    },

    async saveSnapshot() {
      this.$v.$touch();
      
      if (!this.$v.$error) {
        try {
          let result = await snapshotApi.getSignedPostURL({
            params: {
              imageFileName: Date.now(),
            },
          });
          this.snapshot.imageURL = result.data.imageURL;

          const options = {
            headers: {
              'Content-Type': this.imageFile.type,
            },
          };
          await imageApi.putImage(result.data.signedAWSURL, this.imageFile, options);

          result = await snapshotApi.postSnapshot(this.snapshot);
          if (result.status === 200) {
            window.scrollTo(0, 0);
            this.submitSuccessAlert = true;
          }
        } catch (error) {
          window.scrollTo(0, 0);
          console.log(error);
          this.errorAlert.message = 
          ('So sorry, something went wrong - ' +
          'please contact us or try again later' || error.response.data.error.message);
          this.errorAlert.active = true;
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#uploadContainer {
}

</style>

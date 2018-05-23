<template>
  <v-container 
    fluid 
    grid-list-xl>
    <div>
      <v-alert 
        v-model="submitSuccessAlert" 
        transition="scale-transition"
        type="success" 
        dismissible>
        Thank you for your feedback!
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
        <label 
          class="btn btn-file info btn--block">
          Add photo
          <input 
            id="addImage" 
            type="file" 
            accept="image/*" 
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
          name="input-7-1"
          label="Tell us more"
          multi-line
          required
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
          block 
          class="info" 
          @click="saveSnapshot()">Submit</v-btn>
      </v-flex>
    </v-layout>    
  </v-container>
</template>

<script>
import axios from 'axios';
import { required } from 'vuelidate/lib/validators';
import Api from '../api/Api';

const HTTP = new Api();
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
    saveSnapshot() {
      const self = this;
      this.$v.$touch();
      if (!self.$v.$error) {
        this.storeImage(() => {
          axios
            .post('/snapshot', self.snapshot)
            .then(res => {
              if (res.status === 200) {
                self.submitSuccessAlert = true;
              }
            })
            .catch(err => {
              self.errorAlert.message = err.response.data.error.message;
              self.errorAlert.active = true;
            });
        });
      }
    },
    async storeImage() {
      const self = this;
      try {
        const result = await HTTP.getSignedPostURL({
          params: {
            imageFileName: Date.now(),
          },
        });
        console.log(result);
      } catch (error) {
        self.errorAlert.message = 
          ('So sorry, it seems we`re having some technical issues - ' +
          'please contact us or try again later' || error.response.data.error.message);
        self.errorAlert.active = true;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

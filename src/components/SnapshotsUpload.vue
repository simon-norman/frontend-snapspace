<template>
  <v-container
    id="uploadContainer" 
    fluid
    grid-list-lg>
    <v-layout 
      row 
      justify-center 
      align-center 
      wrap>
      <v-flex 
        xs12 
        s4 
        md3>
        <h2 class="request-title">{{ requestName }}</h2>  
        <v-card 
          flat
          color="transparent">
          <v-card-media 
            v-if="snapshotData.localImageDisplay"
            id="snapshotImage"
            :src="snapshotData.localImageDisplay" 
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
          :id="requestId"
          class="btn btn-file btn--block secondary">
          Tap here to take a photo of your space
          <input 
            id="addImage" 
            type="file" 
            accept="image/*" 
            capture="camera"
            style="display: none;" 
            @change="addImage($event.target.files[0])">
        </label>
        <div 
          v-if="$v.snapshotData.imageFile.$error"
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
          v-model="snapshotData.snapshot.comment"
          :error-messages="commentErrors"
          class="spacelabThin"
          name="input-7-1"
          label="Tell us more about this"
          multi-line
          required
          rows="2"
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
          class="secondary"
          block 
          @click="saveSnapshot()">Submit</v-btn>
      </v-flex>
    </v-layout>    
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import SnapshotApi from '../api/snapshotApi';
import ImageApi from '../api/imageApi';
import ErrorHandler from '../error_handler/ErrorHandler';

const errorHandler = new ErrorHandler();
const snapshotApi = new SnapshotApi();
const imageApi = new ImageApi();

function getDefaultData() {
  return {
    imageFile: '',
    localImageDisplay: '',
    snapshot: {
      imageUrl: '',
      comment: '',
    },
  };
}

export default {
  name: 'SnapshotsUpload',
  props: {
    'request-id': { 
      type: String,
      required: true,
    },
    'request-name': {
      type: String,
      required: true,
    },
    'request-sequence': {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      successMessage: 'Thank you for your feedback - keep \'em coming!',
      snapshotData: getDefaultData(),
    };    
  },
  validations: {
    snapshotData: {
      snapshot: {
        comment: { required },
      },
      imageFile: { required },
    },
  },

  computed: {
    commentErrors() {
      const errors = [];
      if (this.$v.snapshotData.snapshot.comment.$error) {
        errors.push('Please provide a comment');
      }
      return errors;
    },
  },
  
  methods: {
    ...mapMutations([
      'UPDATE_SUCCESS_STATUS',
      'UPDATE_SUCCESS_MESSAGE',
    ]),

    addImage(imageFile) {
      if (!imageFile) return;
      this.snapshotData.imageFile = imageFile;
      const url = URL.createObjectURL(imageFile);
      this.snapshotData.localImageDisplay = url;
    },

    async saveSnapshot() {    
      if (this.areSnapshotParametersValid()) {
        try {
          const imageUploadConfig = await this.getImageUploadConfig();
          this.snapshotData.snapshot.imageUrl = imageUploadConfig.imageUrl;

          this.uploadImage(imageUploadConfig.signedImageUploadUrl);

          const result = this.saveFullSnapshotRecord();
          if (result.status === 200) {
            this.informUserSaveSuccessful();
          }
        } catch (error) {
          errorHandler.handleError(error);
        }
      }
    },

    areSnapshotParametersValid() {
      this.$v.$touch();
      if (!this.$v.$error) {
        this.$v.$reset();
        return true;
      }
      return false;
    },

    async getImageUploadConfig() {
      try {
        const result = await snapshotApi.getImageUploadConfig({
          params: {
            imageFileName: Date.now(),
          },
        });

        return result.data;
      } catch (error) {
        throw error;
      }
    },

    saveImage(signedImageUploadUrl) {
      const options = {
        headers: {
          'Content-Type': this.snapshotData.imageFile.type,
        },
      };

      imageApi.putImage(signedImageUploadUrl, this.snapshotData.imageFile, options);
    },

    async saveFullSnapshotRecord() {
      try {
        const finalSnapshot = Object.assign({}, this.snapshotData.snapshot);
        finalSnapshot.requestId = this.requestId;
        const result = await snapshotApi.postSnapshot(finalSnapshot);
        return result;
      } catch (error) {
        throw error;
      }
    },

    informUserSaveSuccessful() {
      this.reset();
      this.UPDATE_SUCCESS_MESSAGE(this.successMessage);
      this.UPDATE_SUCCESS_STATUS(true);
      setTimeout(() => {
        this.UPDATE_SUCCESS_STATUS(false);
      }, 4000);
    },

    reset() {
      const defaultData = getDefaultData();
      Object.assign(this.$data.snapshotData, defaultData);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

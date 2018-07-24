<template>
  <v-container
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
        <h2 
          :id="requestId + 'RequestName'" 
          class="request-title">{{ requestName }}</h2>  
        <v-card 
          flat
          color="transparent">
          <v-card-media 
            v-if="snapshotData.imageFile"
            id="snapshotImage"
            :src="snapshotData.imageFile"
            contain 
            height="200px"
            @click="clickOnImageUploaderButton()"/>
      </v-card></v-flex>
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
        <v-layout 
          row 
          justify-center 
          align-center 
          wrap>
          <img 
            v-show="snapshotData.preImageUpload"
            class="btn-image-upload"
            src="../../static/img/icons/camera.gif"
            @click="clickOnImageUploaderButton()">
          <image-uploader
            ref="imageUploadBtn"
            :debug="1"
            :max-width="512"
            :quality="0.7"
            :auto-rotate="true"
            :preview="false"
            :class-name="'fileinput'"
            output-format="verbose"
            capture="environment"
            @input="addImage"
          />
          <div 
            v-if="$v.snapshotData.imageFile.$error"
            id="imageError"
            class="input-group__messages 
      input-group__error input-group__details input-group--error 
      input-group--required error--text">
            Please add a photo</div>
        </v-layout>
        <v-layout 
          row 
          justify-center 
          align-center>
          <div
            class="medium-title">{{ instructionsOnTakingPhoto }}</div>
        </v-layout>
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
          :id="requestId + 'SnapshotComment'"
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
          id="submitSnapshotBtn"
          class="secondary"
          block 
          @click="saveSnapshot()">Submit</v-btn>
      </v-flex>
    </v-layout>    
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';
import { ImageUploader } from 'vue-image-upload-resize';
import { required } from 'vuelidate/lib/validators';
import { readBase64MimeType, removeMimeType } from '../helpers/base64StringHelper';
import SnapshotApi from '../api/snapshotApi';
import ImageApi from '../api/imageApi';
import ErrorHandler from '../error_handler/ErrorHandler';

const errorHandler = new ErrorHandler();
const snapshotApi = new SnapshotApi();
const imageApi = new ImageApi();

function getDefaultData() {
  return {
    preImageUpload: true,
    imageFile: '',
    snapshot: {
      imageUrl: '',
      comment: '',
    },
  };
}

export default {
  name: 'SnapshotsUpload',

  components: {
    ImageUploader,
  },
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
    instructionsOnTakingPhoto() {
      let photoInstructions;

      if (this.snapshotData.preImageUpload) {
        photoInstructions = 'Tap to take a photo';
      }

      if (this.snapshotData.imageFile) {
        photoInstructions = 'Tap your photo to retake it';
      }

      return photoInstructions;
    },

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

    clickOnImageUploaderButton() {
      this.$refs.imageUploadBtn.$el.children[1].click();
    },

    addImage(imageFile) {
      this.snapshotData.preImageUpload = false;
      this.snapshotData.imageFile = imageFile.dataUrl;
    },

    async saveSnapshot() {    
      if (this.areSnapshotParametersValid()) {
        try {
          const imageUploadConfig = await this.getImageUploadConfig();

          this.uploadImage(imageUploadConfig.signedImageUploadUrl);

          this.snapshotData.snapshot.imageUrl = imageUploadConfig.imageUrl;
          const result = await this.saveFullSnapshotRecord();
          if (result.status === 200) {
            this.informUserSaveSuccessful();
            this.resetSnapshotUploadForm();
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

    uploadImage(signedImageUploadUrl) {
      const imageBase64WithContentType = this.snapshotData.imageFile;

      const contentType = readBase64MimeType(imageBase64WithContentType);
      const imageBase64Only = removeMimeType(imageBase64WithContentType);

      const options = {
        headers: {
          'Content-Type': contentType,
          'Content-Encoding': 'base64',
        },
      };

      imageApi.putImage(signedImageUploadUrl, imageBase64Only, options);
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
      this.UPDATE_SUCCESS_MESSAGE(this.successMessage);
      this.UPDATE_SUCCESS_STATUS(true);
      setTimeout(() => {
        this.UPDATE_SUCCESS_STATUS(false);
      }, 4000);
    },

    resetSnapshotUploadForm() {
      const defaultData = getDefaultData();
      Object.assign(this.$data.snapshotData, defaultData);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<template>
  <div class="photoTaker">
    <div class="buttonsBlock">
      <label
          class="inputFileLabel"
          @click="chooseUpload"
      >
        Загрузить фото
        <input
            class="inputFile"
            ref="inputFile"
            @change="updatePhotoFromInput"
            type="file"
        >
      </label>
      <button
          class="chooseWebcamBtn"
          @click="chooseWebcam"
      >
        Shoot
      </button>
    </div>


    <img
        :src="image"
        alt=""
        ref="preview"
    >

    <div
        v-if="type === 'webcam'"
        class="photoTaker__webcamBlock"
    >
      <Webcam
          @updateImage="updateUncutImage"
      />
    </div>
    <Croppie
        class="photoTaker__croppieBlock"
        v-if="uncutImage"
        :src="uncutImage"
        @onCropImage="saveImageToCanvas"
    />
  </div>
</template>

<script>
  import Webcam from './webcam';
  import Croppie from './croppie';

  export default {
    components: {
      Webcam,
      Croppie
    },
    props: {},

    data() {
      return {
        uncutImage: null,
        image: null,
        croppieInstance: null,
        type: null, // 'upload' || 'webcam'
      }
    },

    mounted() {

    },
    methods: {
      chooseUpload: function () {
        this.type = 'upload';
      },
      chooseWebcam: function () {
        this.type = 'webcam';
      },
      updatePhotoFromInput() {
        const {
          inputFile
        } = this.$refs;

        const reader = new FileReader();
        const file = inputFile.files[0];

        reader.onloadend = () => {
          this.uncutImage = reader.result;
        };

        if (file) {
          reader.readAsDataURL(file);
        } else {
          this.uncutImage = "";
        }
      },

      updateUncutImage(base64) {
        this.uncutImage = base64;
      },

      saveImageToCanvas(base64) {
        this.$emit('saveToCanvas', base64);
      }
    }
  };
</script>

<style scoped lang="scss" src="./index.scss"></style>

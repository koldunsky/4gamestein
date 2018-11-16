<template>
  <div
      class="photoTaker"
      :class="{
        'activated': type === 'webcam' && !uncutImage
      }"
  >
    <PhotoLoader
        class="loader"
        :class="{
        'loader_active': type === 'webcam' && !uncutImage
      }"
    />
    <div
        class="buttonsBlock"
        :class="{
          'buttonsBlock__inactive': type === 'webcam' || uncutImage
        }"
    >
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
            accept=".jpeg, .jpg, .gif, .png, image/*"
        >
      </label>
      <button
          class="chooseWebcamBtn"
          @click="chooseWebcam"
      >
        <WebcamIcon class="chooseWebcamBtn__icon"/>
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
          @onReset="onReset"
      />
    </div>
    <Croppie
        class="photoTaker__croppieBlock"
        v-if="uncutImage"
        :src="uncutImage"
        @onCropImage="saveImageToCanvas"
        @onReset="onReset"
    />
  </div>
</template>

<script>
  import Webcam from './Webcam';
  import Croppie from './Croppie';
  import WebcamIcon from './assets/webcam.svg';
  import PhotoLoader from './assets/loader.svg';

  export default {
    components: {
      Webcam,
      Croppie,
      WebcamIcon,
      PhotoLoader
    },
    props: {},

    data() {
      return {
        uncutImage: null,
        image: null,
        type: null, // 'upload' || 'webcam'
      }
    },

    mounted() {

    },
    methods: {
      onReset() {
        this.type = null;
        this.image = null;
        this.uncutImage = null;
        this.$emit('onReset');
      },

      chooseUpload: function () {
        this.$refs.inputFile.value = null;
        this.type = 'upload';
        this.$emit('onTypeChoose', this.type);
      },
      chooseWebcam: function () {
        this.type = 'webcam';
        this.$emit('onTypeChoose', this.type);
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

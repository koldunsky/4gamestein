<template>
  <div class="croppieRoot">
    <div
        id="croppie"
        class="croppieContainer"
    > </div>
    <button
        class="saveCroppedBtn"
        @click="saveFromCroppie"
    >
      saveFromCroppie
    </button>
  </div>
</template>

<script>
  import 'croppie'; // in global scope
  import 'croppie/croppie.css';
  import {width, height} from '../../constants/editor';

  export default {
    props: ['src'],

    data() {
      return {
        croppieInstance: null,
      }
    },

    mounted() {
      this.initCroppie()
    },
    methods: {
      initCroppie() {
        this.croppieInstance = new Croppie(this.$el.querySelector('#croppie'), {
          viewport: {
            width,
            height,
            type: 'square'
          }
        });
        this.croppieInstance.bind({
          url: this.src,
        });
      },
      saveFromCroppie() {
        const result = this.croppieInstance.result({
          type: 'base64',
          size: {width, height},
          format: 'png',
        });
        result.then((base64) => {
          this.$emit('onCropImage', base64);
        });
      },
    }
  };
</script>

<style lang="scss">
  .croppieContainer {
    width: 460px;
    height: 590px;
    position: absolute;
    top: 0;
    left: 0;
  }

  .cr-viewport {
    border: 1px dashed rgba(black, .5) !important;
  }

  .cr-slider-wrap {
    position: absolute;
    bottom: 0;
    z-index: 2;
    background: cyan;
    left: 0;
    right: 0;
    margin: 0 auto !important;
    padding-top: 10px;
    padding-bottom: 20px;
  }

  .saveCroppedBtn {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 3;
  }
</style>

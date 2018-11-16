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
      <AcceptIcon
          class="saveCroppedBtn__icon"
      />
    </button>

    <ResetBtn
        class="resetCroppedPhoto"
        @click="reset"
    >
    </ResetBtn>
  </div>
</template>

<script>
  import 'croppie'; // in global scope
  import 'croppie/croppie.css';
  import {WIDTH, HEIGHT} from '../../../constants/editor';
  import AcceptIcon from '../assets/accept.svg';
  import ResetBtn from '../../ResetButton';

  export default {
    props: ['src'],

    components: {
      AcceptIcon,
      ResetBtn
    },

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
            width: WIDTH,
            height: HEIGHT,
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
          size: {width: WIDTH, height: HEIGHT},
          format: 'png',
        });
        result.then((base64) => {
          this.$emit('onCropImage', base64);
        });
      },

      reset() {
        this.$emit('onReset');
      }
    }
  };
</script>

<style lang="scss" src="./index.scss"></style>
<template>
  <div class="webcamRoot">
    <video
        class="video"
        ref="videoEl"
        autoplay
    />

    <button
        class="screenshotButton"
        ref="screenshotButton"
        @click="getScreenshot"
    >
      Сделать фото
    </button>
    <ResetBtn
        @click="$emit('onReset')"
        text="Отмена"
    />
    <canvas
        style="display:none;"
        ref="canvasEl"
    ></canvas>
  </div>
</template>

<script>
  import ResetBtn from '../../ResetButton';

  export default {
    components: {
      ResetBtn
    },

    data() {
      return {
        stream: null,
      }
    },

    mounted() {
      function hasGetUserMedia() {
        return !!(navigator.mediaDevices &&
          navigator.mediaDevices.getUserMedia);
      }

      if (hasGetUserMedia()) {
        const constraints = {
          video: true
        };

        const video = this.$refs.videoEl;

        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
          video.srcObject = stream;
          this.stream = stream;
        });
      } else {
        alert('getUserMedia() is not supported by your browser');
      }
    },

    beforeDestroy() {
      this.stream.getTracks()[0].stop();
    },

    methods: {
      getScreenshot() {
        const {canvasEl: canvas, videoEl: video, imageEl: image} = this.$refs;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        // Other browsers will fall back to image/png
        this.$emit('updateImage', canvas.toDataURL('image/webp'))
      }
    }
  };
</script>

<style scoped lang="scss" src="./index.scss">
</style>

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
      take screenshot
    </button>
    <canvas
        style="display:none;"
        ref="canvasEl"
    ></canvas>
  </div>
</template>

<script>
  export default {
    props: {},

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
          video.srcObject = stream
        });
      } else {
        alert('getUserMedia() is not supported by your browser');
      }
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

<style scoped lang="scss">
  .webcamRoot {
    overflow: hidden;
    height: 590px;
    width: 460px;
    outline: 1px dashed red;
  }

  .video {
    height: 100%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }

  .screenshotButton {
    position: absolute;
    bottom: 0;
    margin: auto;
    z-index: 2;
    cursor: pointer;
  }
</style>

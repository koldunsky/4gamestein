<template>
  <div class="result-canvas">
    <canvas
        class="canvas"
        ref="canvas"
        :width="width"
        :height="height"
    >

    </canvas>
  </div>
</template>

<script>
  export default {
    props: [
      'width',
      'height'
    ],

    mounted() {
      const ctx = this.$refs.canvas.getContext("2d");
      ctx.moveTo(0, 0);
      ctx.lineTo(200, 100);
      ctx.stroke();
    }
  };
</script>

<style scoped lang="scss" src="./index.scss"></style>

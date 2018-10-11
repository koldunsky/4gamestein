<template>
  <div class="result-canvas">
    <canvas ref="canvas" width="200" height="100"></canvas>
  </div>
</template>

<script>
  export default {
    props: {
    },

    mounted() {
      const ctx = this.$refs.canvas.getContext("2d");
      ctx.moveTo(0, 0);
      ctx.lineTo(200, 100);
      ctx.stroke();
    }
  };
</script>

<style scoped lang="scss" src="./index.scss"></style>

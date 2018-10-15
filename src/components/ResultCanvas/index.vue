<template>
  <div class="result-canvas">
    <canvas
        class="canvas"
        ref="canvas"
        :width="width"
        :height="height"
    >
    </canvas>
    <div style="opacity: 0"></div>
    {{assets}}
  </div>
</template>

<script>
  export default {
    props: [
      'width',
      'height',
      'assets',
    ],

    data() {
      return {
        ctx: null,
      }
    },

    updated() {
      this.ctx.clearRect(0, 0, parseInt(this.width, 10), parseInt(this.height, 10));
      this.assets.forEach(this.drawAsset);
    },

    mounted() {
      this.ctx = this.$refs.canvas.getContext("2d");
      this.ctx.rect(20, 20, 150, 300);
      this.ctx.stroke();
      this.assets.forEach(this.drawAsset);
    },
    methods: {
      drawAsset(a) {
        const normalizedAsset = this.normalizeSize(a);
        const {width, height, x, y, angle, assetImage} = normalizedAsset;

        const image = new Image(width, height);

        this.normalizeSize(a);

        image.onload = () => {
          if (angle !== 0) {
            this.drawRotated(image, x, y, width, height, angle)
          } else {
            this.ctx.drawImage(image, x, y, width, height);
          }
        };
        image.src = assetImage;
      },

      drawRotated(image, x, y, w, h, degrees) {
        const {ctx} = this;
        // ctx.clearRect(0, 0, ctx.width, ctx.height);

        // save the unrotated context of the canvas so we can restore it later
        // the alternative is to untranslate & unrotate after drawing
        ctx.save();

        // Move to the center of the image
        ctx.translate(x + w / 2, y + h / 2);

        // Rotate canvas
        ctx.rotate(degrees * (Math.PI / 180));

        // Draw image
        ctx.drawImage(image, -w / 2, -h / 2, w, h);


        // we’re done with the rotating so restore the unrotated context
        ctx.restore();
      },

      normalizeSize(asset) {
        const realW = asset.scaleX * asset.width;
        const realX = Math.round(asset.x - (realW - asset.width));
        const realH = asset.scaleY * asset.height;
        const realY = Math.round(asset.y - (realH - asset.height));
        console.info(realX);
        console.info(realY);

        return {
          ...asset,
          x: realX,
          y: realY,
          height: realH,
          width: realW,
        };
      },
      getSizeWithSquareAspectRatio(asset) {

        return asset;
      }
    }
  };
</script>

<style scoped lang="scss" src="./index.scss"></style>

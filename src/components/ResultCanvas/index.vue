<template>
  <div class="resultCanvas">
    <h1>PRVIEW</h1>
    <canvas
        class="canvas"
        ref="canvas"
        :width="width"
        :height="height"
    >
    </canvas>
    <div style="opacity: 0; height: 0; width: 0;">
      {{assets}}
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      'width',
      'height',
      'assets',
      'background',
    ],

    data() {
      return {
        ctx: null,
      }
    },

    updated() {
      this.redraw();
    },

    mounted() {
      this.ctx = this.$refs.canvas.getContext("2d");
      this.redraw();
    },
    methods: {
      drawAsset(a) {
        const normalizedAsset = this.normalizeSize(a);
        const {width, height, x, y, angle, assetImage} = normalizedAsset;
        const image = new Image(width, height);

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

        const imageFormat = realW > realH ? 'landscape' : 'portrait';
        const shorterSide = Math.min(realH, realW);

        const transformator = {
          'landscape': (asset) => {
            return {
              ...asset,
              x: asset.x + (realW - shorterSide) / 2,
              width: shorterSide,
              height: shorterSide,
            }
          },
          'portrait': (asset) => ({
            ...asset,
            y: asset.y + (realH - shorterSide) / 2,
            width: shorterSide,
            height: shorterSide,
          }),
        };

        return transformator[imageFormat]({
          ...asset,
          x: realX,
          y: realY,
          height: realH,
          width: realW,
        });
      },

      redraw() {
        const {
          ctx,
          width,
          height,
          background,
          assets
        } = this;

        // Clear
        ctx.clearRect(0, 0, parseInt(width, 10), parseInt(height, 10));

        // Photo
        if (background) {
          const image = new Image(width, height);

          image.onload = () => {
            this.ctx.drawImage(image, 0, 0, width, height);
          };
          image.src = background;
        }

        // Assets
        assets.forEach(this.drawAsset);
      }
    }
  };
</script>

<style scoped lang="scss" src="./index.scss"></style>

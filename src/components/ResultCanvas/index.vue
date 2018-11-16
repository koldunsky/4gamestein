<template>
  <div class="resultCanvas">
    <canvas
        class="canvas"
        ref="canvas"
        :width="width"
        :height="height"
    >
    </canvas>
    <canvas
        class="socialCanvas"
        ref="socialCanvas"
        :width="social.width"
        :height="social.height"
    >
    </canvas>
  </div>
</template>

<script>
  export default {
    props: [
      'width',
      'height',
      'assets',
      'photo',
      'getResultImages'
    ],

    data() {
      return {
        ctx: null,
        social: {
          bg: require('./assets/bg_1409x630.png'),
          width: 1409,
          height: 630,
        }
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
        return new Promise((resolve) => {
          const normalizedAsset = this.normalizeSize(a);
          const {width, height, x, y, angle, assetImage} = normalizedAsset;
          const image = new Image(width, height);

          image.onload = () => {
            if (angle !== 0) {
              this.drawRotated(image, x, y, width, height, angle)
            } else {
              this.ctx.drawImage(image, x, y, width, height);
            }
            resolve(image);
          };
          image.src = assetImage;
        });
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

      drawImage(ctx, src, x, y, width, h) {
        return new Promise((resolve) => {
          const image = new Image(width, h);

          image.onload = () => {
            ctx.drawImage(image, x, y, width, h);
            resolve(image);
          };
          image.src = src;
        });
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
          photo,
          assets
        } = this;

        const promises = [];

        // Clear
        ctx.clearRect(0, 0, parseInt(width, 10), parseInt(height, 10));

        // Photo
        if (photo) {
          promises.push(
            new Promise((resolve) => {
              const image = new Image(width, height);

              image.onload = () => {
                this.ctx.drawImage(image, 0, 0, width, height);
                resolve(image);
              };
              image.src = photo;
            })
          );
        }

        // Assets
        assets.sort((a, b) => {
          return a.order < b.order ? -1 : 1;
        });
        assets.forEach((asset) => {
          promises.push(this.drawAsset(asset));
        });

        Promise.all(promises)
          .then(this.drawSocialCanvas)
          .then(() => {
            this.$emit('onImagesReady', {
              raw: this.$refs.canvas.toDataURL(),
              framed: this.$refs.socialCanvas.toDataURL(),
            });
          });
      },

      drawSocialCanvas() {
        return new Promise((resolve) => {
          const ctx = this.$refs.socialCanvas.getContext("2d");
          const {bg, width, height} = this.social;

          this.drawImage(ctx, bg, 0, 0, width, height)
            .then(() => {
              ctx.drawImage(this.$refs.canvas, 520, 145, 365, 470);
              resolve();
            });
        });
      }
    }
  };
</script>

<style scoped lang="scss" src="./index.scss"></style>

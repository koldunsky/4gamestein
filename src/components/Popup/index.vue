<template>
  <div
      class="popup"
      ref="popup"
      :class="{
       'popup__is-active': isActive
      }"
  >
    <div
        class="popup__content"
        ref="popup__content"
    >
      <ShareView
          v-if="url && !shared"
          :url="url"
          :photo="photoLinks"
          @onShare="onShare"
      />

      <!--v-if="shared"-->
      <PromoCodeView
          v-if="shared"
          :photo="photoLinks"
      />
      <button
          class="popup__close"
          @click="onClose"
      >
        <CloseIcon class="popup__close-icon" />
      </button>
      <div
          class="popup__loader"
          :class="{
          'popup__loader_active': isLoading,
          // 'popup__loader_active': false,
        }"
      >
        <div class="popup__loaderIcon">
          <Loader/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import anime from 'animejs';
  import b64ToBlob from 'b64-to-blob';

  import * as c from '../../constants/fetch';

  import ShareView from './shareView';
  import PromoCodeView from './promoCodeView';

  import Loader from './assets/loader.svg';
  import CloseIcon from './assets/close.svg';

  import * as freezer from '../../utils/bodyFreezer';

  export default {
    props: {
      isActive: {
        type: Boolean,
        required: true,
      },
      photo: {
        type: Object,
      }
    },

    components: {
      Loader,
      ShareView,
      PromoCodeView,
      CloseIcon
    },

    data() {
      return {
        url: null,
        isLoading: true,
        shared: false,
        photoLinks: {
          raw: null,
          framed: null,
        }
      }
    },

    watch: {
      isActive(isActive) {
        // freeze body
        freezer.freeze();
        // show popup
        const {popup__content: popupContent, popup} = this.$refs;

        if (isActive) {
          anime(this.getEasing(popup, {
            opacity: 1,
            backgroundColor: 'rgba(0,0,0,.5)'
          }));
          anime(this.getEasing(popupContent, {
            top: '0',
          }));
        } else {
          // unfreeze body
          freezer.unfreeze();

          // hide popup
          anime(this.getEasing(popup, {
            opacity: 0,
            backgroundColor: 'rgba(0,0,0,0)',
          }));
          anime(this.getEasing(popupContent, {
            top: '100px',
          }));
        }

        // Share
        if (!this.url) {
          this.share()
        }
      },
    },

    methods: {
      getEasing(domEl, props = {}) {
        return {
          targets: domEl,
          easing: 'easeInOutQuad',
          duration: 300,
          ...props
        }
      },

      uploadImages() {
        return new Promise((resolve) => {
          Promise.all([
            this.uploadImage(this.photo.raw),
            this.uploadImage(this.photo.framed)
          ]).then(([rawObj, framedObj]) => {
            this.photoLinks.raw = rawObj.fileUrl;
            this.photoLinks.framed = framedObj.fileUrl;
            resolve();
          });
        });
      },

      uploadImage(base64) {
        const fd = new FormData();

        fd.append('image', b64ToBlob(base64.split(',')[1], 'image/png'));

        return new Promise((resolve) => {
          fetch(c.UPLOAD_FILES_URL, {
            method: 'POST',
            body: fd
          })
            .then(function (response) {
              resolve(response.json());
            });
        });
      },

      share() {
        this.makePage()
          .then(({fileUrl}) => {
            this.url = fileUrl;
            this.isLoading = false;
          });
      },

      makePage() {
        return new Promise((resolve) => {
          this.uploadImages()
            .then(() => {
              const {raw, framed} = this.photoLinks;
              const fd = new FormData();

              fd.append('PHOTO_RAW', raw);
              fd.append('PHOTO_FRAMED', framed);

              fetch(c.MAKE_PAGE_URL, {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                body: `PHOTO_RAW=${raw}&PHOTO_FRAMED=${framed}`
              })
                .then(function (response) {
                  resolve(response.json());
                });
            });
        });
      },

      onShare() {
        this.shared = true;
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 5000);
      },

      onClose() {
        this.$emit('onClose');
        setTimeout(() => {
          this.shared = false;
        }, 400);
      }
    }
  };
</script>

<style lang="scss" src="./index.scss"></style>

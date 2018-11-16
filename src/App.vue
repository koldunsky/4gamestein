<template>
  <div id="app">
    <Header
        :scroll-amount="scrollAmount"
    />
    <Editor
        :scroll-amount="scrollAmount"
        @onEditFinish="onEditFinish"
    />
    <ShareBlock
        @onShare="share"
    />
    <LegalInfo/>
    <Popup
        :isActive="isPopupActive"
        :photo="photo"
        @onClose="closePopup"
    />
    <Footer />
  </div>
</template>

<script>
  import Editor from './components/Editor/index.vue';
  import Header from './components/Header/index.vue';
  import ShareBlock from './components/PromoBlock/index.vue';
  import LegalInfo from './components/LegalInfo/index.vue';
  import Popup from './components/Popup/index.vue';
  import Footer from './components/Footer/index.vue';

  import _throttle from 'lodash/throttle';

  export default {
    components: {
      Editor,
      Header,
      ShareBlock,
      LegalInfo,
      Popup,
      Footer
    },

    data() {
      return {
        photo: {
          raw: null,
          framed: null,
        },
        isPopupActive: false,
        scrollAmount: 0,
      }
    },

    mounted() {
      window.addEventListener('scroll', this.throttledHandleScroll);
    },

    beforeDestroy() {
      window.removeEventListener('scroll', this.throttledHandleScroll);
    },
    methods: {
      onEditFinish(images) {
        if (images) {
          this.photo = images;
        }
        if (this.photo) {
          this.share();
        }
      },

      closePopup() {
        this.isPopupActive = false;
      },

      handleScroll() {
        const doc = document.documentElement;
        this.scrollAmount = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
      },

      throttledHandleScroll() {
        return _throttle(this.handleScroll, 16)();
      },

      share() {
        this.isPopupActive = true;
      },
    }
  }
</script>

<style lang="scss" src="./global/fonts/Gotham/styles.scss">
</style>

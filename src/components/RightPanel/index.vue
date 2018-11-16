<template>
  <div
      class="rightPanel"
      :class="{
        'inactive': !readyToChooseMask
      }"
  >
    <button
        class="arrow arrow_up"
        @click="scrollUp"
        :class="{
          inactive: upBtnInactive || !readyToChooseMask,
          hidden: btnsHidden
        }"
    >
      <ArrowIcon
          class="arrow__icon arrow__icon_up"
      />
    </button>
    <div
        class="scrollContainer"
        ref="scrollContainer"
    >
      <div
          class="assetsContainer"
          ref="assetsContainer"
          @scroll="scrollHandler"
      >
        <div
            class="innerScrollContainer"
            ref="innerScrollContainer"
        >
          <div
              v-for="(asset, i) in assets"
              :key="asset.image + i"
              class="asset"
              @click="selectAsset(asset)"
          >
            <div class="assetPreview">
              <img :src="asset.preview"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
        class="arrow arrow_down"
        @click="scrollDown"
        :class="{
          inactive: downBtnInactive || !readyToChooseMask,
          hidden: btnsHidden
        }"
    >
      <ArrowIcon
          class="arrow__icon arrow__icon_down"
      />
    </button>
  </div>
</template>

<script>
  import anime from 'animejs';

  import ArrowIcon from './assets/arrow.svg';

  export default {
    components: {
      ArrowIcon
    },

    props: {
      assets: {
        type: Array,
        required: true,
      },
      selectAsset: {
        type: Function,
        required: true,
      },
      readyToChooseMask: {
        type: Boolean,
        required: true,
      }
    },

    data() {
      return {
        upBtnInactive: null,
        downBtnInactive: null,
        btnsHidden: null,
      }
    },

    updated() {
      this.scrollHandler();
    },

    mounted() {
      this.scrollHandler();
    },
    methods: {
      scrollHandler() {
        const {
          assetsContainer,
          innerScrollContainer
        } = this.$refs;
        const assetsRect = assetsContainer.getBoundingClientRect();
        const innerScrollRect = innerScrollContainer.getBoundingClientRect();
        const bottomOffset = innerScrollRect.height - assetsContainer.scrollTop - assetsRect.height;

        this.upBtnInactive = assetsContainer.scrollTop <= 0;
        this.downBtnInactive = bottomOffset <= 0;
        this.btnsHidden = innerScrollRect.height <= assetsRect.height;
      },

      scrollDown() {
        this.scroll(true);
      },

      scrollUp() {
        this.scroll(false);
      },

      scroll(down = false) {
        const duration = 300;
        const {assetsContainer} = this.$refs;
        const controlAsset = assetsContainer.querySelector('.asset');
        const scrollAmount = controlAsset.getBoundingClientRect().height + parseInt(window.getComputedStyle(controlAsset).marginTop, 10);
        const currentScroll = assetsContainer.scrollTop;
        const mathMetod = down ? 'ceil' : 'floor';
        let finalScroll = Math[mathMetod](currentScroll / scrollAmount + (down ? 1 : -1) * 3) * scrollAmount;

        anime({
          targets: this.$refs.assetsContainer,
          scrollTop: finalScroll,
          easing: 'easeInOutQuad',
          duration,
        });
      }
    }
  }
  ;
</script>

<style scoped lang="scss" src="./index.scss"></style>

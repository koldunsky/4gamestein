<template>
  <div
      :class="{
        'rightPanel': true,
        'inactive': assets.length === 0
      }"
  >
    <div class="scrollContainer">
      <div class="assetsContainer">
        <div
            v-for="asset in assets"
            :key="asset.image"
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
</template>

<script>
  export default {
    props: {
      assets: {
        type: Array,
        required: true,
      },
      selectAsset: {
        type: Function,
        required: true,
      }
    },

    mounted() {
      console.info(this.assets);
    }
  };
</script>

<style scoped lang="scss">
  .rightPanel {
    background-color: #0c1011;
    border-radius: 5px;
  }

  .inactive {
    opacity: .8;
    pointer-events: none;
  }

  .scrollContainer {
    overflow: hidden;
    width: 40px;
  }

  .assetsContainer {
    max-height: 160px;
    overflow-y: scroll;
    margin-right: -20px;
    padding-right: 20px;
  }

  .asset {
    width: 40px;
    height: 40px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>

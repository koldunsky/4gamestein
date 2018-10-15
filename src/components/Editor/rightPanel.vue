<template>
  <div class="rightPanel">
    <div
        v-for="asset in assets"
        :key="asset.image"
        class="asset"
        @click="selectAsset(asset)"
    >
      <div class="assetPreview">
        <img :src="asset.preview" />
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
  .asset {
    width: 40px;
    height: 40px;
  }
</style>

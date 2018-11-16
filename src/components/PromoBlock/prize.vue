<template>
  <div class="prize"
       :class="{
          [`prize_${prize.size}`]: prize.size,
       }"
  >
    <div
        class="prize__imageBlock"
        :class="{
          [`prize__imageBlock_${prize.size}`]: prize.size,
        }"
    >
      <FrameBigIcon
          v-if="prize.size === 'big'"
          class="prize__imageFrame prize__imageFrame_big"
      />
      <FrameSmallIcon
          v-else
          class="prize__imageFrame prize__imageFrame_small"
      />
      <div
          class="prize__image"
          :style="{
          backgroundImage: `url(${prize.image})`,
        }"
      >
      </div>
    </div>
    <div
        class="prize__label"
        v-html="prize.text"
    >
    </div>
  </div>
</template>

<script>
  import FrameSmallIcon from './assets/borderSmall.svg';
  import FrameBigIcon from './assets/borderBig.svg';

  export default {
    components: {
      FrameSmallIcon,
      FrameBigIcon
    },
    props: {
      prize: Object
    },
  };
</script>

<style scoped lang="scss" src="./index.scss"></style>

<template>
  <button
      class="button"
      @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
  export default {
    props: {
    },
  };
</script>

<style scoped lang="scss" src="./index.scss"></style>

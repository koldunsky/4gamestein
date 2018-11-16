<template>
  <button
      class="btn"
      :class="{
        btn_transparent: transparent
      }"
      @click="$emit('click')"
  >
    <span class="btn__tooltip">
      {{text}}
    </span>
    <CloseIcon
        class="btn__icon"
        :class="{
          btn__icon_transparent: transparent
        }"
    />
  </button>
</template>

<script>
  import CloseIcon from './assets/delete.svg';

  export default {
    components: {
      CloseIcon,
    },
    props: {
      transparent: {
        type: Boolean,
      },
      text: {
        type: String,
        default: 'Удалить фото'
      }
    },
  };
</script>

<style scoped lang="scss" src="./index.scss"></style>

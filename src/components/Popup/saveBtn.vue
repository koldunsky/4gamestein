<template>
  <a
      :href="href"
      :download="href"
      target="_blank"
  >
    <button
        class="popup__button popup__button_download"
    >
      <DownloadIcon class="popup__buttonIcon popup__buttonIcon_download"/>
      Сохранить фото
    </button>
  </a>
</template>

<script>
  import DownloadIcon from './assets/download.svg';

  export default {
    components: {
      DownloadIcon
    },
    props: ['href'],
  };
</script>

<style scoped lang="scss" src="./index.scss"></style>

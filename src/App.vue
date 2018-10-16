<template>
  <div id="app">
    <Editor />
    <button ref="shareButton"></button>
  </div>
</template>

<script>
  import Editor from './components/Editor/index.vue';

  export default {
    components: {
      Editor
    },
    mounted() {
      // share
      this.$refs.shareButton.innerHTML = window.VK.Share.button({
      url: 'https://ru.4game.com/',
      title: 'Crow',
      image: 'https://ru.4game.com/c/cCrowfall/mainpage-tile/cover.jpg',
      noparse: true
    }, {
      type: 'custom',
      text: `<button class="vk-share">vk-share</button>`,
    });
    }
  }
</script>

<style>
</style>

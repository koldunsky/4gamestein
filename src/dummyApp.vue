<template>
  <div class="dummyPage">
    <img class="img" :src="img" alt="">
    <div v-html="text" class="text">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      text: String
    },
    data() {
      return {
        img: require('./assets/dummyPageHeader.png')
      }
    },
  };
</script>

<style scoped lang="scss">
  .dummyPage {
    max-width: 100%;
    padding-bottom: 150px;
  }

  .img {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    display: block;
  }

  .text {
    max-width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    padding: 10px 40px;
    color: #fff;
    font-size: 16px;
    line-height: 1.8;
    font-weight: 400;
  }
</style>

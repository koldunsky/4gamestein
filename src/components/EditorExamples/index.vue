<template>
  <div class="examples">
    <div class="dots">
      <div
          class="dot"
          :key="src"
          v-for="(src, i) in examples"
      >
        {{i}}
        <div
            class="example"
            :style="{backgroundImage: `url(${src}), url(${bg})`}"
        >

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {},

    data() {
      return {
        bg: require('./assets/bg-fog.png'),
        examples: [
          require('./assets/01.jpg'),
          require('./assets/02.jpg'),
          require('./assets/03.jpg'),
        ]
      }
    }
  };
</script>

<style scoped lang="scss" src="./index.scss"></style>

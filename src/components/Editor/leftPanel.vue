<template>
  <div class="leftPanel">
    <div
        v-for="cat, key in categories"
        :key="key"
        class="category"
        :class="{
          isActive: cat.isActive,
        }"
        @click="selectCategory(key)"
    >
      <img
          :src="cat.icon"
          :alt="cat.title"
          class="categoryIcon"
      >
      <div class="categoryTitle">
        {{cat.title}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      categories: {
        type: Object,
        required: true,
      },
      selectCategory: {
        type: Function,
        required: true,
      }
    },
  };
</script>

<style scoped lang="scss">
  .category {
    width: 40px;
    margin-bottom: 20px;
    cursor: pointer;
  }

  .isActive {
    background: darkorange;
  }

  .categoryIcon {
    width: 40px;
    height: 40px;
  }
</style>

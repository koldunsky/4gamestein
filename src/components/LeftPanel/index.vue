<template>
  <div class="leftPanel"
       :class="{
        'inactive': !readyToChooseMask
       }"
  >
    <div
        v-for="(cat, key) in categories"
        :key="key"
        class="category"
        :class="{
          isActive: cat.isActive && readyToChooseMask,
        }"
        @click="selectCategory(key)"
        :style="{backgroundImage: `url(${cat.bg})`}"
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
      readyToChooseMask: {
        type: Boolean,
        required: true,
      },
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

<style scoped lang="scss" src="./index.scss"></style>

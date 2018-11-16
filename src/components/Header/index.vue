<template>
  <div class="header">
    <div
        class="parallax parallax_uno"
        :style="{
          transform: `translateY(${layerOffset.uno}px)`
        }"
    ></div>
    <div
        class="parallax parallax_dos"
        :style="{
          transform: `translateY(${layerOffset.dos}px)`
        }"
    ></div>
    <div
        class="parallax parallax_tre"
    ></div>
    <div
        class="slogan"
    >
      <div class="sloganImage">
        <SloganIcon class="sloganImage__icon"/>
      </div>
      <div class="sloganRibbonText">
        Промокод за репост гарантирован!
      </div>
      <div class="sloganSub">
        Превратись в монстра и выиграй
        <br>
        жууутко клевые призы!
      </div>
      <Button
          @click="scrollToEditor"
      >
        Стать монстром
      </Button>
    </div>
  </div>
</template>

<script>
  import anime from 'animejs';

  import getScroll from '../../utils/getScroll';

  import Button from '../Button';
  import SloganIcon from './assets/slogan.svg';

  export default {
    components: {
      Button,
      SloganIcon,
    },
    props: {
      scrollAmount: {
        type: Number,
        required: true,
      }
    },

    data() {
      return {
        layerOffset: {
          uno: 0,
          dos: 0,
          tre: 0,
        }
      }
    },

    watch: {
      scrollAmount() {
        this.layerOffset.uno = this.scrollAmount / 1.5;
        this.layerOffset.dos = this.scrollAmount / 4;
      }
    },

    methods: {
      scrollToEditor() {
        let {y} = this.$parent.$el.querySelector('.editorStage').getBoundingClientRect();
        y += getScroll.top();
        anime({
          targets: "html, body",
          scrollTop: [0, y],
          easing: 'easeOutCubic',
          duration: 400,
        });
      }
    }
  };
</script>

<style scoped lang="scss" src="./index.scss"></style>

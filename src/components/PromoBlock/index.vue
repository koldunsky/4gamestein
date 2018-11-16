<template>
  <div class="promoBlock">
    <div class="promoBlock__icon">
      <PumpkinIcon
          class="pumpkinIcon"
      />
    </div>
    <div class="promoBlock__title">
      Экспериментируй <br>
      и выигрывай!
    </div>
    <div class="promoBlock__subtitle">
      Опубликуй своего монстра в соцсетях с хэштегом <span class="promoBlock__highlighted">#фогеймштейн</span> и участвуй в розыгрыше призов.
    </div>

    <div class="promoBlock__prizes">
      <Prize
          class="promoBlock__prize"
          :key="p.text"
          :prize="p"
          v-for="p in prizes"
      />
    </div>

    <div class="promoBlock__subtitle">
      Мы выберем победителя 13 ноября, а пока адски веселись в наших играх!
    </div>
    <a href="https://ru-new.4game.com/?utm_source=4gamestein" target="_blank">
      <Button
          class="promoBlock__button"
      >
        <FogameIcon/>
        Играть в Фогейме
      </Button>
    </a>
  </div>
</template>

<script>
  import Button from '../Button';
  import Prize from './prize';

  import PumpkinIcon from './assets/pumpkinCrownIcon.svg';
  import FogameIcon from '../../assets/4gameLogo.svg';

  import prizes from './prizes';

  export default {
    components: {
      PumpkinIcon,
      Button,
      FogameIcon,
      Prize
    },

    data() {
      return {
        prizes,
      }
    },

    props: {},

    mounted() {

    },

    methods: {
      share() {
        this.$emit('onShare')
      }
    }
  };
</script>

<style scoped lang="scss" src="./index.scss"></style>

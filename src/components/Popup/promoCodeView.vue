<template>
  <div class="promoCodeView">
    <div class="popup__textContent">
      <div class="popup__headline">
        Эксперимент удался!
      </div>
      <div
          class="popup__promoCode popup__bgHighlighted"
      >
        NT3G-XAKZ-MUAV-FZSI
      </div>
      <div class="popup__text">
        Введи промокод при пополнении счета<br>
        в
        <a
            class="popup__link"
            href="https://ru-new.4game.com/?utm_source=4gamestein"
            target="_blank"
        >Фогейме</a> и получи <span class="popup__highlighted">бонус +13%</span> к сумме. Используй его до 14 ноября.<br><br>

        Призы разыграем 13 ноября в
        <a
          class="popup__link"
          href="https://vk.com/4game_pro"
          target="_blank"
          v-html="'группе Фогейма'"
        >
        </a>,
        а пока  можно жутко повеселиться в наших играх!

      </div>
    </div>
    <div class="shareButtons">
      <a
          href="https://ru-new.4game.com/?utm_source=4gamestein"
          target="_blank"
      >
        <button
            class="popup__button popup__button_share"
        >
          <FogameIcon class="popup__buttonIcon"/>
          Играть в Фогейме
        </button>
      </a>
    </div>
    <SaveBtn :href="photo.raw"/>
  </div>
</template>

<script>
  import SaveBtn from './saveBtn';

  import FogameIcon from '../../assets/4gameLogo.svg';

  export default {
    components: {
      SaveBtn,
      FogameIcon
    },
    props: {
      photo: {
        type: Object,
        required: true,
      }
    },
  };
</script>

<style lang="scss" src="./index.scss"></style>

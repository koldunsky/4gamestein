<template>
  <div class="shareView">
    <div class="popup__textContent">
      <div class="popup__headline">
        Не поделился — <br>
        в конкурсе слился
      </div>
      <div class="popup__text">
        Поделись Фогеймштейном в соцсетях и поставь хэштег
        <span class="popup__highlighted popup__bgHighlighted">#фогеймштейн</span>, чтобы выиграть призы от Sennheiser
        <br>и Фогейма!<br><br>

        Как только ты сделаешь репост, здесь появится <span class="popup__highlighted">промокод с бонусом 13%</span>
        <br>при пополнении счета в
        <a
            class="popup__link"
            href="https://ru-new.4game.com/?utm_source=4gamestein"
            target="_blank"
        >
          Фогейме
        </a>
      </div>
    </div>
    <div class="shareButtons">
      <div
          ref="VKShareButton"
      >
        Вконтакте
      </div>
      <button
          class="popup__button popup__button_share popup__button_fb"
          @click="onFacebookClick"
      >
        <FbIcon class="popup__buttonIcon"/>
        Facebook
      </button>
    </div>
    <SaveBtn :href="photo.raw" />
  </div>
</template>

<script>
  import SaveBtn from './saveBtn';

  import FbIcon from './assets/fb.svg';
  import DownloadIcon from './assets/download.svg';

  import getClosest from '../../utils/getClosest';

  export default {
    components: {
      FbIcon,
      DownloadIcon,
      SaveBtn
    },

    props: ['url', 'photo'],

    mounted() {
      this.prepareVKToShare();
      document.addEventListener('click', this.handleClick, true);
    },

    beforeDestroy() {
      document.removeEventListener('click', this.handleClick);
    },

    data() {
      return {
        title: 'Превратись в Фогеймштейна и выиграй жууутко клевые призы!',
        quote: 'Превратись в Фогеймштейна и выиграй жууутко клевые призы!',
        hashtag: '#фогеймштейн',
      }
    },

    methods: {
      prepareVKToShare() {
        const {url, photo, title} = this;
        this.$refs.VKShareButton.innerHTML = window.VK.Share.button({
          url,
          title,
          image: photo.framed,
          noparse: true
        }, {
          type: 'custom',
          text: `<button class="popup__button popup__button_share popup__button_vk">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-205 6.6 548.4 548.4" class="popup__buttonIcon" ><path d="M340.5 406.9c-.7-1.4-1.3-2.6-1.9-3.6-9.5-17.1-27.7-38.2-54.5-63.1l-.6-.6-.3-.3-.3-.3h-.3c-12.2-11.6-19.9-19.4-23.1-23.4-5.9-7.6-7.2-15.3-4-23.1 2.3-5.9 10.9-18.4 25.7-37.4 7.8-10.1 14-18.2 18.6-24.3 32.9-43.8 47.2-71.8 42.8-83.9l-1.7-2.8c-1.1-1.7-4.1-3.3-8.8-4.7-4.8-1.4-10.9-1.7-18.3-.7l-82.2.6c-1.3-.5-3.2-.4-5.7.1-2.5.6-3.7.9-3.7.9l-1.4.7-1.1.9c-1 .6-2 1.6-3.1 3s-2.1 3.1-2.8 5c-9 23-19.1 44.4-30.6 64.2-7 11.8-13.5 22-19.4 30.7-5.9 8.7-10.8 15-14.8 19.1-4 4.1-7.6 7.4-10.9 9.8-3.2 2.5-5.7 3.5-7.4 3.1-1.7-.4-3.3-.8-4.9-1.1-2.7-1.7-4.8-4-6.4-7-1.6-3-2.7-6.7-3.3-11.1-.6-4.5-.9-8.3-1-11.6-.1-3.2 0-7.8.1-13.7.2-5.9.3-9.9.3-12 0-7.2.1-15.1.4-23.6.3-8.5.5-15.2.7-20.1.2-4.9.3-10.2.3-15.7s-.3-9.8-1-13c-.7-3.1-1.7-6.2-3-9.1-1.3-2.9-3.3-5.2-5.9-6.9-2.6-1.6-5.8-2.9-9.6-3.9-10.1-2.3-22.9-3.5-38.5-3.7-35.4-.4-58.1 1.9-68.2 6.9-4 2.1-7.6 4.9-10.8 8.6-3.4 4.2-3.9 6.5-1.4 6.9 11.4 1.7 19.5 5.8 24.3 12.3l1.7 3.4c1.3 2.5 2.7 6.9 4 13.1 1.3 6.3 2.2 13.2 2.6 20.8.9 13.9.9 25.8 0 35.7-1 9.9-1.9 17.6-2.7 23.1-.9 5.5-2.1 10-3.9 13.4-1.7 3.4-2.9 5.5-3.4 6.3-.6.8-1 1.2-1.4 1.4-2.5.9-5 1.4-7.7 1.4s-5.9-1.3-9.7-4c-3.8-2.7-7.8-6.3-11.8-11-4.1-4.7-8.7-11.2-13.9-19.6-5.1-8.4-10.5-18.3-16-29.7L-64 205c-2.9-5.3-6.8-13.1-11.7-23.3-5-10.2-9.3-20-13.1-29.6-1.5-4-3.8-7-6.9-9.1l-1.4-.9c-.9-.8-2.5-1.6-4.6-2.4-2.1-.9-4.3-1.5-6.6-1.9l-78.2.6c-8 0-13.4 1.8-16.3 5.4l-1.1 1.7c-.6 1-.9 2.5-.9 4.6 0 2.1.6 4.7 1.7 7.7 11.4 26.8 23.8 52.7 37.3 77.7s25.1 45 35 60.2c9.9 15.2 20 29.6 30.3 43.1s17.1 22.2 20.4 26c3.3 3.8 6 6.7 7.9 8.6l7.1 6.9c4.6 4.6 11.3 10 20.1 16.4 8.9 6.4 18.7 12.7 29.4 18.9 10.5 6.4 23 11.4 37.3 15.3 14.3 3.9 28.2 5.5 41.7 4.7h32.8c6.7-.6 11.7-2.7 15.1-6.3l1.1-1.4c.8-1.1 1.5-2.9 2.1-5.3.7-2.4 1-5 1-7.9-.2-8.2.4-15.6 1.9-22.1 1.4-6.6 3-11.5 4.9-14.8 1.8-3.3 3.9-6.1 6.1-8.4 2.3-2.3 3.9-3.7 4.9-4.1.9-.5 1.7-.8 2.3-1 4.6-1.5 9.9 0 16.1 4.4 6.2 4.5 12 10 17.4 16.6 5.4 6.6 11.9 13.9 19.6 22.1 7.6 8.2 14.3 14.3 20 18.3l5.7 3.4c3.8 2.3 8.8 4.4 14.9 6.3 6.1 1.9 11.4 2.4 16 1.4l73.1-1.1c7.2 0 12.9-1.2 16.8-3.6 4-2.4 6.4-5 7.1-7.9.8-2.9.8-6.1.1-9.7-.6-3.6-1.3-6.1-1.9-7.6z"/></svg> Вконтакте
                  </button>`,
        });
      },

      onFacebookClick() {
        const {url: href, hashtag, quote} = this;
        window.FB.ui({
          method: 'share',
          href,
          hashtag,
          quote,
        });
      },

      handleClick(e) {
        if (getClosest(e.target, '.popup__button_share')) {
          this.$emit('onShare');
        }
      }
    }
  };
</script>

<style lang="scss" src="./index.scss"></style>

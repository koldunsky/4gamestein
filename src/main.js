import Vue from 'vue';
import App from './App.vue';
import Dummy from './dummyApp.vue';
import store from './store';

import checkBlob from './utils/checkForBlob';

// Polyfills
import 'whatwg-fetch';
import 'blob-polyfill';

import './global/style/index.scss';

Vue.config.productionTip = false;

const cantBlob = !checkBlob();
const tooSmallViewport = window.innerHeight <= 400 || window.innerWidth <= 800;


new Vue({
  store,
  render: h => {
    if (cantBlob) {
      return h(Dummy, {}, ['Лаборатория фогеймштейна не может быть запущена на твоем железе, попробуй более новый браузер ;)']);
    }

    if (tooSmallViewport) {
      document.querySelector('body').style.minWidth = 'auto';
      document.querySelector('html').style.minWidth = 'auto';
      document.querySelector('body').style.maxWidth = '100%';
      document.querySelector('html').style.maxWidth = '100%';
      return h(Dummy, {
        props: {
          text: `
  Фогеймштейн настолько велик и ужасен, <br>
 что не помещается на твоем экране. <br>
  Зайди с компьютера!`
        }
        },
      );
    }

    return h(App);
  },
}).$mount('#app');
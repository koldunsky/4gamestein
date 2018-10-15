import Vue from 'vue';
import App from './App.vue';
import store from './store';
import VueDragResizeAndRotate from 'vue-drag-resize-and-rotate'

import './global/style/index.scss';

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');

Vue.component('vue-drag-resize-and-rotate', VueDragResizeAndRotate);
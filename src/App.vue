<template>
  <div id="app">
    <div class="App">
      <div class="wrapper">
        <div ref="workspace"
             class="workspace"
             :style="{
               width: `${canvasWidth}px`,
               height: `${canvasHeight}px`
             }"
        >
          <FreeTransformBox
              v-for="element in elements"
              :key="element.id"
              :element="element"
              :offset-x="offsetX"
              :offset-y="offsetY"
              :canvas="canvas"
              :update="update"
              :selectElement="selectElement"
              @mouseup="onMouseUp(element.id)"
          />
        </div>
        <button @click="addOne">add one</button>
        <ResultCanvas
            :width="canvasWidth"
            :height="canvasHeight"
            :assets="elements"
        />
        <button @click="drawImage">drawImage</button>
        <button ref="shareButton"></button>
      </div>
      <pre style="position: fixed; top: 0; right: 0;">
        {{boxSizes}}
      </pre>
      <pre style="position: fixed; top: 40px; right: 0;">
        {{elements}}
      </pre>
    </div>
  </div>
</template>

<script>
  import FreeTransformBox from './components/FreeTransformBox/index.vue';
  import ResultCanvas from './components/ResultCanvas/index.vue';
  import isIntersected from './utils/isIntersected.js';
  import _remove from 'lodash/remove';

  let currentId = 0;
  const moustache = require('./assets/mustache-clipart-9.png');

  export default {
    components: {
      FreeTransformBox,
      ResultCanvas
    },
    data() {
      return {
        offsetX: 0,
        offsetY: 0,
        canvas: null,
        canvasWidth: 300,
        canvasHeight: 400,
        elements: [
          this.getNewBox(),
          this.getNewBox()
        ]
      }
    },
    mounted() {
      this.canvas = this.$refs.workspace.getBoundingClientRect();
      this.offsetX = this.$refs.workspace.offsetLeft;
      this.offsetY = this.$refs.workspace.offsetTop;

      // share
      this.$refs.shareButton.innerHTML = window.VK.Share.button({
        url: 'https://ru.4game.com/',
        title: 'Crow',
        image: 'https://ru.4game.com/c/cCrowfall/mainpage-tile/cover.jpg',
        noparse: true
      }, {
        type: 'custom',
        text: `<button class="vk-share">vk-share</button>`,
      });
      // window.VK.Observer.subscribe("widgets.like.shared", function f() {
      //   alert('Молодец!');
      // });
    },

    computed: {
      boxSizes: function () {
        return this.elements.map((el) => {
          return {
            h: el.height * el.scaleY,
            w: el.width * el.scaleX,
          }
        });
      }
    },

    methods: {
      update(id, payload) {
        this.elements = this.elements.map(item => {
          if (item.id === id) {
            return {
              ...item,
              ...payload,
              inCanvas: isIntersected(this.canvas, item, {x: this.offsetX, y: this.offsetY}),
            }
          }
          return item
        })
      },
      addOne() {
        this.elements.push(this.getNewBox())

      },
      getNewBox() {
        const id = currentId;
        currentId++;
        const colors = [
          'rgba(255, 0, 0, .3)',
          'rgba(255, 255, 0, .3)',
          'rgba(0, 0, 255, .3)'
        ];
        return {
          id: `el-${id}`,
          x: 15 + (10 * id),
          y: 15 + (10 * id),
          scaleX: 1,
          scaleY: 1,
          width: 100,
          height: 100,
          angle: 30,
          classPrefix: "tr",
          assetImage: moustache,
          styles: {
            backgroundColor: `${colors[id % 3]}`,
          },

          isSelected: false,
          inCanvas: true,
        }
      },
      selectElement(id) {
        this.elements = this.elements.map(item => {
          return {
            ...item,
            isSelected: item.id === id,
          }
        });
      },

      drawImage() {
        console.info('draaaaaw!');
      },
      onMouseUp(id) {
        const elementsCopy = [...this.elements];
        _remove(elementsCopy, (el) => el.id === id && !el.inCanvas);
        this.elements = elementsCopy;
      }
    }
  }
</script>

<style>

  body,
  html {
    margin: 0;
    padding: 0;
  }

  #app {
    display: flex;
    background: #F8FAFC;
  }

  .wrapper {
    flex: 1;
    margin-left: 89px;
  }

  .workspace {
    width: 200px;
    height: 200px;
    margin: 25px auto;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.10);
    border: 1px solid rgba(0, 0, 0, 0.10);
    background: #fff;

  }

  * {
    box-sizing: border-box;
  }

</style>

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
              :element="element"
              :offset-x="offsetX"
              :offset-y="offsetY"
              :canvas="canvas"
              :update="update"
              :selectElement="selectElement"
              :getElementStyles="getElementStyles"
          />
        </div>
        <button @click="addOne">add one</button>
        <ResultCanvas
            :width="canvasWidth"
            :height="canvasHeight"
        />
        <button @click="drawImage">drawImage</button>
        <burron ref="shareButton"></burron>
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
      window.VK.Observer.subscribe("widgets.like.shared", function f() {
        alert('Молодец!');
      });
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
      getElementStyles(element) {
        const styles = element.styles ? element.styles : {}
        return {
          width: '100%',
          height: '100%',
          ...styles
        }
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
          x: 0 + (10 * id),
          y: 0 + (10 * id),
          scaleX: 1,
          scaleY: 1,
          width: 100,
          height: 100,
          angle: 0,
          classPrefix: "tr",
          styles: {
            backgroundImage: `url(${moustache})`,
            backgroundColor: `${colors[id % 3]}`,
          },

          isSelected: false,
          inCanvas: true,
        }
      },
      selectElement(id) {
        this.elements = this.elements.map(item => {
          console.info(item.id, id);
          return {
            ...item,
            isSelected: item.id === id,
          }
        });
      },

      drawImage() {
        console.info('draaaaaw!');
      }
    }
  }
</script>

<style>
  .intersection {
    width: 100px;
    height: 100px;
    position: relative;
    border: 1px solid black;
  }

  .div1 {
    background: rgba(200, 0, 0, .5);
  }

  .div2 {
    top: -10px;
    background: rgba(0, 200, 0, .5);
  }

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

<template>
  <div id="app">
    <div class="App">
      <div class="wrapper">
        <div class="workspace" ref="workspace">
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
        <ResultCanvas />
        <button @click="drawImage">drawImage</button>
      </div>
      <pre>
        {{boxSizes}}
      </pre>
      <pre>
        {{elements}}
      </pre>
    </div>
  </div>
</template>

<script>
  import FreeTransformBox from './components/FreeTransformBox/index.vue';
  import ResultCanvas from './components/ResultCanvas/index.vue';

  let currentId = 1;
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
        elements: [
          this.getNewBox()
        ]
      }
    },
    mounted() {
      this.canvas = this.$refs.workspace.getBoundingClientRect();
      this.offsetX = this.$refs.workspace.offsetLeft;
      this.offsetY = this.$refs.workspace.offsetTop;
    },

    computed: {
      boxSizes: function() {
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
        console.info(payload);
        this.elements = this.elements.map(item => {
          if (item.id === id) {
            return {
              ...item,
              ...payload
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
          'red',
          'green',
          'blue'
        ];
        return {
          id: `el-${id}`,
          x: 100 + (10 * id),
          y: 50 + (10 * id),
          scaleX: 1,
          scaleY: 1,
          width: 60,
          actualWidth: 60,
          height: 60,
          actualHeight: 60,
          angle: 0,
          classPrefix: "tr",
          styles: {
            backgroundImage: `url(${moustache})`,
            backgroundColor: `${colors[id % 3]}`,
          },

          isSelected: false,
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
  #app {
    display: flex;
    background: #F8FAFC;
  }

  .wrapper {
    flex: 1;
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

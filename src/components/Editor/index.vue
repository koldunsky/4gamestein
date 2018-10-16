<template>
  <div id="azaza">
    <div class="editor">
      <PhotoTaker
          class="editor__photo-taker"
          @saveToCanvas="addPhotoToCanvas"
      />
      <LeftPanel
          class="editor__left-panel"
          :categories="categories"
          :selectCategory="selectCategory"
      />
      <RightPanel
          class="editor__right-panel"
          :assets="assets"
          :selectAsset="selectAsset"
      />
      <div class="wrapper">
        <div ref="workspace"
             class="workspace"
             :style="{
               width: `${canvasWidth}px`,
               height: `${canvasHeight}px`
             }"
        >
          <div
              class="photoBg"
              :style="{backgroundImage: `url(${photoSrc})`}"
          >

          </div>
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
        <ResultCanvas
            class="resultCanvas"
            :width="canvasWidth"
            :height="canvasHeight"
            :assets="elements"
            :background="photoSrc"
        />
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
  import FreeTransformBox from '../FreeTransformBox/index.vue';
  import ResultCanvas from '../ResultCanvas/index.vue';
  import LeftPanel from './leftPanel.vue';
  import RightPanel from './rightPanel.vue';
  import PhotoTaker from '../PhotoTaker/index.vue';
  import data from './data';

  import isIntersected from '../../utils/isIntersected.js';
  // import _remove from 'lodash/remove';
  import _each from 'lodash/each';
  import _map from 'lodash/map';

  import {width, height} from '../../constants/editor';

  let currentId = 0;
  const moustache = require('../../assets/mustache-clipart-9.png');

  export default {
    components: {
      FreeTransformBox,
      ResultCanvas,
      LeftPanel,
      RightPanel,
      PhotoTaker
    },
    data() {
      const {categories} = data;
      return {
        categories,
        assets: [],
        offsetX: 0,
        offsetY: 0,
        canvas: null,
        photoSrc: null,
        canvasWidth: width,
        canvasHeight: height,
        elements: [
          // this.getNewBox(),
          // this.getNewBox()
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
      getNewBox(image = moustache) {
        const id = currentId;
        currentId++;

        const vacantCoords = this.findVacantPlace();

        const colors = [
          'rgba(255, 0, 0, .3)',
          'rgba(255, 255, 0, .3)',
          'rgba(0, 0, 255, .3)'
        ];
        return {
          id: `el-${id}`,
          x: vacantCoords,
          y: vacantCoords,
          scaleX: 1,
          scaleY: 1,
          width: 100,
          height: 100,
          angle: 0,
          classPrefix: "tr",
          assetImage: image,
          styles: {
            backgroundColor: `${colors[id % 3]}`,
          },

          isSelected: true,
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

      onMouseUp(id) {
        // const elementsCopy = [...this.elements];
        // _remove(elementsCopy, (el) => el.id === id && !el.inCanvas);
        // console.warn('ты хочешь его удалить?', id)
        // this.elements = elementsCopy;
      },

      findVacantPlace(step = 15) {
        if(!this.elements) {
          return 0;
        }
        let counter = 0;
        const sorted = this.elements.sort((el1, el2) => el1.x < el2.x ? -1 : 1);
        console.info(sorted);
        sorted.forEach((el) => {
          if (el.x === counter * step) {
            counter++;
          }
        });

        return counter * step;
      },

      selectCategory(key) {
        _each(this.categories, (cat, catKey) => {
          if (key === catKey) {
            cat.isActive = true;
            this.assets = cat.assets;
          } else {
            cat.isActive = false;
          }
        });
      },
      selectAsset(asset) {
        this.elements = _map(this.elements, (el) => ({
          ...el,
          isSelected: false,
        }));
        this.elements.push(this.getNewBox(asset.image))
      },

      addPhotoToCanvas(base64) {
        this.photoSrc = base64;
      }
    }
  }
</script>

<style lang="scss" src="./index.scss" scoped></style>

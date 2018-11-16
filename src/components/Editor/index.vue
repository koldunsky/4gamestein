<template>
  <div class="editorStage">
    <div
        class="mnstr"
        :style="{transform: `translateY(${scrollAmount / -5}px)`}"
    ></div>
    <div class="editorDescription">
      <div class="editorDescription__icon">
        <PumpkinIcon
            class="pumpkinIcon"
        />
      </div>
      <div class="editorDescription__title">
        Лаборатория Фогеймштейна
      </div>
      <div class="editorDescription__text">
        Подготовься к самому страшному празднику:<br>
        приклей рога и натяни кровожадную улыбку!<br>
        Просто загрузи свою фотографию и укрась её частями монстров
        <br>из любимых игр.

      </div>
      <!--<EditorExamples-->
      <!--class="editor__examples"-->
      <!--/>-->
    </div>
    <div class="editor">
      <PhotoTaker
          v-if="!photoSrc"
          class="editor__photo-taker"
          @saveToCanvas="addPhotoToCanvas"
          @onReset="resetEditor"
          @onTypeChoose="photoTakerChooseType"
      />
      <LeftPanel
          class="editor__left-panel"
          :categories="categories"
          :selectCategory="selectCategory"
          :readyToChooseMask="photoSrc !== null && !editFinished"
      />
      <RightPanel
          class="editor__right-panel"
          :assets="assets"
          :selectAsset="selectAsset"
          :readyToChooseMask="photoSrc !== null && !editFinished"
      />
      <div class="wrapper">
        <div ref="workspace"
             class="workspace"
             :style="{
               width: `${canvasWidth}px`,
               height: `${canvasHeight}px`
             }"
        >
          <SvgPlaceholder
              v-if="!photoSrc && !photoTakerTypeHasBeenTaken"
              class="svgBg"/>
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
              @mouseup="onMouseUp"
          />
          <ResetButton
              v-if="photoSrc"
              @click="resetEditor"
              :transparent="true"
              text="Удалить всё"
          />
        </div>
        <div
            class="trashBin"
            :class="{
                'trashBin_shown ': trashBinVisible,
                'trashBin_active ': trashBinActive,
              }"
            ref="trashBin"
        >
          <TrashBinIcon class="trashBin__icon"/>
        </div>
        <ResultCanvas
            v-if="editFinished"
            class="resultCanvas"
            :width="canvasWidth"
            :height="canvasHeight"
            :assets="elements"
            :photo="photoSrc"
            @onImagesReady="onImagesReady"
        />
      </div>
      <div
          v-if="photoSrc && elements.length"
          class="finishButtonBlock"
      >
        <Button
            class="finishButtonBlock__button"
            @click="onFinishEdit"
        >
          Сохранить и поделиться
        </Button>
      </div>
      <div class="ctaText">
        Поделись и сразу получи промокод с бонусом +13% <br>
        при пополнении счета в Фогейме!
      </div>
    </div>
  </div>
</template>

<script>
  import FreeTransformBox from '../FreeTransformBox/index.vue';
  import ResultCanvas from '../ResultCanvas/index.vue';
  import LeftPanel from '../LeftPanel/index';
  import RightPanel from '../RightPanel/index.vue';
  import PhotoTaker from '../PhotoTaker/index.vue';
  import Button from '../Button/index.vue';
  import EditorExamples from '../EditorExamples/index.vue';
  import ResetButton from '../ResetButton/index.vue';

  import PumpkinIcon from './assets/pumpkinIcon.svg';
  import SvgPlaceholder from './assets/editorPlaceholder.svg';
  import TrashBinIcon from './assets/trash.svg';

  import testWebp from '../../utils/webpSupport';
  import getClosest from '../../utils/getClosest';
  import getScroll from '../../utils/getScroll';

  import rawCategories from './data';

  import isIntersected, {isIntersectedForNonSmokers} from '../../utils/isIntersected.js';
  import getAssets from '../../utils/requireMedia';
  import _remove from 'lodash/remove';
  import _debounce from 'lodash/debounce';
  import _each from 'lodash/each';
  import _map from 'lodash/map';
  import _some from 'lodash/some';
  import _filter from 'lodash/filter';

  import {WIDTH, HEIGHT} from '../../constants/editor';

  let currentId = 0;
  let order = 1;

  export default {
    props: {
      scrollAmount: {
        type: Number,
        required: true,
      }
    },

    components: {
      FreeTransformBox,
      ResultCanvas,
      LeftPanel,
      RightPanel,
      PhotoTaker,
      SvgPlaceholder,
      PumpkinIcon,
      TrashBinIcon,
      Button,
      EditorExamples,
      ResetButton,
    },
    data() {
      return {
        categories: {},
        assets: [],
        offsetX: 0,
        offsetY: 0,
        canvas: null,
        photoSrc: null,
        photoTakerTypeHasBeenTaken: false,
        canvasWidth: WIDTH,
        canvasHeight: HEIGHT,
        elements: [],
        mouse: {
          x: null,
          y: null,
        },
        editFinished: false,
      }
    },
    mounted() {
      this.canvas = this.$refs.workspace.getBoundingClientRect();
      this.updateOffset();

      window.addEventListener('resize', _debounce(this.updateOffset, 500, {trailing: false}));

      testWebp((canWebp) => {
        if (canWebp) {
          this.categories = this.fillCategories(rawCategories, getAssets()['webp']);
        } else {
          this.categories = this.fillCategories(rawCategories, getAssets()['png']);
        }

        this.assets = _filter(this.categories, {isActive: true})[0].assets;
      });
      document.addEventListener('mousemove', (e) => {
        this.mouse = {
          x: e.pageX,
          y: e.pageY,
        }
      });

      document.addEventListener('mousedown', (e) => {
        if (!getClosest(e.target, '.tr-transform') && !getClosest(e.target, '.asset')) {
          this.selectElement(null);
        }
      })
    },

    computed: {
      trashBinVisible() {
        return _some(this.elements, {underDrag: true})
      },
      trashBinActive() {
        return _some(this.elements, {willBeRemoved: true})
      }
    },

    methods: {
      photoTakerChooseType() {
        this.photoTakerTypeHasBeenTaken = true;
      },

      resetEditor() {
        if(confirm("Точно удалить всё и начать сначала?")) {
          this.photoTakerTypeHasBeenTaken = false;
          this.photoSrc = null;
          this.elements = [];
        }
      },

      updateOffset() {
        const wsp = this.$refs.workspace;
        this.offsetX = wsp.getBoundingClientRect().left + getScroll.left();
        this.offsetY = wsp.getBoundingClientRect().top + getScroll.top();
      },

      update(id, payload) {
        const wspRect = this.$refs.workspace.getBoundingClientRect();

        this.elements = this.elements.map(item => {
          if (item.id === id) {
            return {
              ...item,
              ...payload,
              inCanvas: isIntersected({
                x: this.offsetX,
                y: this.offsetY,
                height: wspRect.height,
                width: wspRect.width,
              }, item),
              willBeRemoved: this.checkTrashIntersection(),
            }
          }
          return item
        })
      },

      getNewBox(image) {
        const id = currentId;
        currentId++;
        order++;

        const {x, y} = this.findVacantPlace();

        return {
          id: `el-${id}`,
          x,
          y,
          scaleX: 1,
          scaleY: 1,
          width: 250,
          height: 250,
          angle: 0,
          classPrefix: "tr",
          assetImage: image,
          order,
          isSelected: true,
          underDrag: false,
          inCanvas: true,
          willBeRemoved: false,
        }
      },

      selectElement(id) {
        this.elements = this.elements.map(item => {
          const match = item.id === id;

          return {
            ...item,
            isSelected: match,
            underDrag: match,
            order: item.id === id ? order++ : item.order,
          }
        });
      },

      onMouseUp(id) {
        if (this.checkTrashIntersection()) {
          this.removeItem(id);
          return true;
        }
        this.elements = this.elements.map(item => ({
          ...item,
          underDrag: false,
        }));
      },

      checkTrashIntersection() {
        const tbRect = this.$refs.trashBin.getBoundingClientRect();
        const trash = {
          x: tbRect.left + getScroll.left(),
          y: tbRect.top + getScroll.top(),
          width: tbRect.width,
          height: tbRect.height
        };
        const mouse = {
          width: 1,
          height: 1,
          ...this.mouse
        };

        console.log(tbRect.top, getScroll.top());

        return isIntersectedForNonSmokers(trash, mouse);
      },

      findVacantPlace(step = 15) {
        if (!this.elements) {
          return 1;
        }
        let counter = 1;
        const sorted = this.elements.sort((el1, el2) => el1.x < el2.x ? -1 : 1);

        sorted.forEach((el) => {
          if (el.x === counter * step) {
            counter++;
          }
        });

        return {
          x: counter * step,
          y: counter * step + 45
        };
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
        this.elements.push(this.getNewBox(asset.image));
      },

      addPhotoToCanvas(base64) {
        this.photoSrc = base64;
      },

      onFinishEdit() {
        if (this.editFinished) {
          this.$emit('onEditFinish');
        } else {
          this.editFinished = true;
        }
      },

      fillCategories(rawCategories, assets) {
        const clone = {...rawCategories};
        _each(clone, (cat, key) => {
          cat.assets = assets[key] || [];
        });

        return clone;
      },

      removeItem(id) {
        const cloneElements = [...this.elements];
        _remove(cloneElements, (el) => el.id === id);
        this.elements = cloneElements;
      },

      onImagesReady(imgs) {
        this.$emit('onEditFinish', imgs);
      }
    }
  }
</script>

<style lang="scss" src="./index.scss" scoped></style>

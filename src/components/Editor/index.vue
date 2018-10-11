<template>
  <div id="editor">
    <div class="App">
      <div class="wrapper">
        <div class="workspace" ref="workspace">
          <FreeTransform
              :x="freeTransform.x"
              :y="freeTransform.y"
              :scale-x="freeTransform.scaleX"
              :scale-y="freeTransform.scaleY"
              :width="freeTransform.width"
              :height="freeTransform.height"
              :angle="freeTransform.angle"
              :offset-x="freeTransform.offsetX"
              :offset-y="freeTransform.offsetY"
              :disable-scale="true"
              @update="update(freeTransform, $event)"
          >
            <div class="element"
                 :style="getElementStyles(freeTransform)">
              {{freeTransform.text}}
            </div>

          </FreeTransform>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import FreeTransform from 'vue-free-transform'

  export default {
    name: 'editor',
    components: {
      FreeTransform
    },
    data() {
      return {
        freeTransform: {
          id: "el-1",
          x: 100,
          y: 50,
          scaleX: 1,
          scaleY: 1,
          width: 100,
          height: 100,
          angle: 0,
          classPrefix: "tr",
          styles: {
            background: "linear-gradient(135deg, #0FF0B3 0%,#036ED9 100%)",
          },
          offsetX: 0,
          offsetY: 0
        }
      }
    },
    mounted() {
      this.freeTransform.offsetX = this.$refs.workspace.offsetLeft;
      this.freeTransform.offsetY = this.$refs.workspace.offsetTop;
    },
    methods: {
      update(item, payload) {
        Vue.nextTick();
        console.info(payload);
        this.freeTransform = {
          ...item,
          ...payload
        }
      },
      getElementStyles(element) {
        const styles = element.styles ? element.styles : {}
        return {
          width: `${element.width}px`,
          height: `${element.height}px`,
          ...styles
        }
      }
    },
  }
</script>

<style>
  #editor {
    display: flex;
    background: #F8FAFC;
  }

  .wrapper {
    flex: 1;
  }

  .workspace {
    width: 800px;
    height: 800px;
    margin: 25px auto;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.10);
    border: 1px solid rgba(0, 0, 0, 0.10);
    background: #fff;

  }

  * {
    box-sizing: border-box;
  }

  .tr-transform__content {
    user-select: none;
  }

  .tr-transform__rotator {
    top: -45px;
    left: calc(50% - 7px);
  }

  .tr-transform__rotator,
  .tr-transform__scale-point {
    background: #fff;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    position: absolute;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .tr-transform__rotator:hover,
  .tr-transform__scale-point:hover {
    background: #F1F5F8;
  }

  .tr-transform__rotator:active,
  .tr-transform__scale-point:active {
    background: #DAE1E7;
  }

  .tr-transform__scale-point {

  }

  .tr-transform__scale-point--tl {
    top: -7px;
    left: -7px;
  }

  .tr-transform__scale-point--ml {
    top: calc(50% - 7px);
    left: -7px;
  }

  .tr-transform__scale-point--tr {
    left: calc(100% - 7px);
    top: -7px;
  }

  .tr-transform__scale-point--tm {
    left: calc(50% - 7px);
    top: -7px;
  }

  .tr-transform__scale-point--mr {
    left: calc(100% - 7px);
    top: calc(50% - 7px);
  }

  .tr-transform__scale-point--bl {
    left: -7px;
    top: calc(100% - 7px);
  }

  .tr-transform__scale-point--bm {
    left: calc(50% - 7px);
    top: calc(100% - 7px);
  }

  .tr-transform__scale-point--br {
    left: calc(100% - 7px);
    top: calc(100% - 7px);
  }

</style>
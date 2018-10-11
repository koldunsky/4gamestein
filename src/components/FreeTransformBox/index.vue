<template>
  <FreeTransform
      :x="element.x"
      :y="element.y"
      :scale-x="element.scaleX"
      :scale-y="element.scaleY"
      :width="element.width"
      :height="element.height"
      :angle="element.angle"
      :offset-x="offsetX"
      :offset-y="offsetY"
      :disable-scale="true"
      :aspect-ratio="false"
      :selected="element.isSelected"
      selectOn="click"
      @update="update(element.id, $event)"
      @mousedown="onMouseDown(element.id)"
  >
    <div class="tr-content-image"
         :class="{
          'tr-content-image_inside-canvas': element.inCanvas,
         }"
         :style="getElementStyles(element)">
      insideCanvas: {{element.inCanvas}}
    </div>

  </FreeTransform>
</template>

<script>
  import FreeTransform from 'vue-free-transform'

  export default {
    props: [
      'offsetX',
      'offsetY',
      'canvas',
      'element',
      'getElementStyles',
      'update',
      'selectElement'
    ],
    components: {
      FreeTransform
    },
    methods: {
      onMouseDown: function(id) {
        this.selectElement(id);
      },
    }
  }
</script>

<style>
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

  .tr-content-image {
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .tr-content-image_inside-canvas {
    outline: 3px lime solid;
  }

</style>

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
      selectOn="mousedown"
      @update="update(element.id, $event)"
      @mousedown="onMouseDown(element.id)"
      @mouseup="onMouseUp"
      :style="{'z-index': element.order}"
  >
    <div class="tr-content-image"
         :class="{
          'tr-content-image_inside-canvas': element.inCanvas,
          'tr-content-image_under-drag': element.underDrag,
          'tr-content-image_will-be-removed': element.willBeRemoved,
         }"
         :style="{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${element.assetImage})`,
         }">
    </div>
  </FreeTransform>
</template>

<script>
  import FreeTransform from 'vue-free-transform'
  import RotateIcon from './assets/rotate.svg';

  export default {
    props: [
      'offsetX',
      'offsetY',
      'canvas',
      'element',
      'update',
      'selectElement'
    ],
    components: {
      FreeTransform,
      RotateIcon
    },

    methods: {
      onMouseDown(id) {
        this.selectElement(id);
      },
      onMouseUp(e) {
        this.$emit('mouseup', this.element.id);
      }
    }
  }
</script>

<style lang="scss" src="./index.scss"></style>

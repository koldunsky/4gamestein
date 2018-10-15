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
      @mouseup="$emit('mouseup', element.id)"
  >
    <div class="tr-content-image"
         :class="{
          'tr-content-image_inside-canvas': element.inCanvas,
         }"
         :style="{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${element.assetImage})`,
         }">
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
      'update',
      'selectElement'
    ],
    components: {
      FreeTransform
    },
    methods: {
      onMouseDown: function (id) {
        this.selectElement(id);
      },
    }
  }
</script>

<style lang="scss" src="./index.scss"></style>

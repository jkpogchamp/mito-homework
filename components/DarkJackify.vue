<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "DarkJackify",
})
</script>

<template>
  <section class="dark-jackify-wrapper" id="container">
    <canvas class="canvas" id="js-canvas" width="442" />
    <div class="scratch">
      <BlackJack />
      <BonusGame />
    </div>

  </section>
</template>

<style scoped>
  .dark-jackify-wrapper {
    position: relative;
    height: 782px;
    width: 442px;
    background: url('@/assets/images/lekapart.svg');
  }

  .canvas {
    position: absolute;
    top: 0;
  }

</style>

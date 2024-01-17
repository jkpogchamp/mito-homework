<script lang="ts">
import {defineComponent} from 'vue'
import poszto from '@/assets/images/poszto.svg'

export default defineComponent({
  name: "DarkJackify",
  mounted() {
    this.initCanvas()
  },
  methods: {
    initCanvas() {
      const canvas = document.getElementById('js-canvas') as HTMLCanvasElement
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
      const img = new Image()
      img.src = poszto
      img.onload = () => {
        ctx.drawImage(img, 0, 0)
      }

      let mouseX = 0
      let mouseY = 0
      let isDragged = false
      interface Events {
        mouse: {
          down: string,
          up: string,
          move: string,
        },
        touch: {
          down: string,
          up: string,
          move: string,
        },
      }

      let events: Events = {
        mouse: {
          down: 'mousedown',
          up: 'mouseup',
          move: 'mousemove',
        },
        touch: {
          down: 'touchstart',
          up: 'touchend',
          move: 'touchmove',
        },
      }

      let deviceType: 'mouse' | 'touch' = 'mouse'

      const isTouchDevice = () => {
        try {
          document.createEvent("TouchEvent");
          deviceType = 'touch'
          return true;
        } catch (e) {
          deviceType = 'mouse'
          return false;
        }
      }

      let rectLeft = canvas.getBoundingClientRect().left
      let rectTop = canvas.getBoundingClientRect().top

      const getXY = (e) => {
        mouseX = (isTouchDevice() ? e.touches[0].pageX : e.pageX) - rectLeft
        mouseY = (isTouchDevice() ? e.touches[0].pageY : e.pageY) - rectTop
      }
      const scratch = (x: number, y: number)=> {
        ctx.globalCompositeOperation = 'destination-out'
        ctx.beginPath()
        ctx.arc(x, y, 32, 0,  2*Math.PI,)
        ctx.fill();
      }

      canvas.addEventListener(events[deviceType].down, (e) => {
        isDragged = true
        getXY(e as TouchEvent | MouseEvent)
        scratch(mouseX, mouseY)
      })

      canvas.addEventListener(events[deviceType].move, (e) => {
        if (!isTouchDevice()) {
          e.preventDefault();
        }
        if (isDragged) {
          getXY(e as TouchEvent)
          scratch(mouseX, mouseY)
        }
      })

      canvas.addEventListener(events[deviceType].up, () => {
        isDragged = false
      })

      canvas.addEventListener('mouseleave', () => {
        isDragged = false
      })
    }
  },
})
</script>

<template>
  <section class="dark-jackify-wrapper" id="container">
    <div class="scratch">
      <BlackJack />
      <BonusGame />
    </div>
    <canvas class="canvas" id="js-canvas" height="380" width="392"/>
  </section>
</template>

<style scoped>
  .canvas {
    position: absolute;
    top: 326px;
    left: 24px;
    cursor: url("@/assets/images/kaparoeszkoz.svg") 32 32, grab;
  }

  .dark-jackify-wrapper {
    position: relative;
    height: 782px;
    width: 442px;
    background: url('@/assets/images/lekapart.svg');
  }
</style>

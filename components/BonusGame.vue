<script lang="ts">
import {defineComponent} from 'vue'
import {utils} from "~/mixins/utils";

export default defineComponent({
  name: "BonusGame",
  mounted() {
    this.play()
  },
  data() {
    return {
      bonusGameNumbers: [] as number[],
    }
  },
  methods: {
    generateBonusGameNumbers(targetSum = 21, amountOfNumbers = 3) {
      if (targetSum <= amountOfNumbers) {
        throw new Error('targetSum must be greater than amountOfNumbers')
      }
      // amountOfNumbers számú számot generálok, amelyek összege targetSum
      // a legmagasabb szám nem lehet nagyobb, mint az [1, 2, 3, ...] számtani sorozat első amountOfNumbers - 1 elemeinek összege
      //számtani sorozatok összege: Sn=(a1+an)⋅n/2
      let ceil = targetSum - (amountOfNumbers) * (amountOfNumbers - 1) / 2;
      for (let i = 0; i < amountOfNumbers - 1; i++) {
        let randomNumber = Math.floor(Math.random() * ceil) + 1;
        this.bonusGameNumbers.push(randomNumber);
        ceil -= randomNumber;
      }
      const remainder = targetSum - this.bonusGameNumbers.reduce((acc, curr) => acc + curr, 0)
      this.bonusGameNumbers.push(remainder);
    },
    play() {
      const chance = Math.random()
      if (chance >= 0.5) {
        this.generateBonusGameNumbers()
      } else {
        const randomNumberBetween4And21 = Math.floor(Math.random() * 18) + 4
        this.generateBonusGameNumbers(randomNumberBetween4And21)
      }
    },
  },
  mixins: [utils],
})
</script>

<template>
  <div class="bonus-game-numbers" v-if="bonusGameNumbers.length">
    <p class="flavor-text">Bónusz-játék</p>
    <div class="number" v-for="number in bonusGameNumbers">
      <p>{{ number }}</p>
      <p class="text">{{ createTextForValue(number) }}</p>
    </div>
  </div>
</template>

<style scoped>
  .bonus-game-numbers {
    position: absolute;
    bottom: 100px;
    right: 60px;
    display: grid;
    grid-template-columns: repeat(2, 60px);
    grid-template-rows: repeat(2, 60px);
  }

  .text {
    font-size: 14px;
    font-weight: 700;
  }

  .number {
    font-size: 32px;
    text-align: center;
  }

  .flavor-text {
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

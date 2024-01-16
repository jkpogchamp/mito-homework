<script lang="ts">
import {defineComponent} from 'vue'
import {utils} from "~/mixins/utils";

// Black jack játék:
// A játék leírására való tekintettel miszerint: win condition, ha az osztónál nagyobb handem van,
// de nem mehetek túl 21-en a blackjack szabályai miatt, a 21-nél nagyobb handeket nem veszem figyelembe.

// Továbbá feltételezem, hogy nyitó handekről van szó, tehát a legrosszabb esetben is 4-es handem van (2 x 2),
// a 3-as handeket (A x 2) nem veszem figyelembe, mert a játékos úgy döntene, hogy az ász értékét 11-nek veszi.
export const POSSIBLE_BLACKJACK_HANDS = [4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21] as const
export type PossibleBlackJackHand = typeof POSSIBLE_BLACKJACK_HANDS[number]
export default defineComponent({
  name: "BlackJack",
  mounted() {
    this.play()
  },
  data() {
    return {
      handAmount: 4,
      isWinner: false,
      prize: 'Nem nyert :(',
      handValues: [] as PossibleBlackJackHand[],
      dealerHandValue: 0,
    }
  },
  methods: {
    generateHandValues() {
      const handValues = [] as PossibleBlackJackHand[]
      for (let i = 0; i < this.handAmount; i++) {
        const randomIndex = Math.floor(Math.random() * POSSIBLE_BLACKJACK_HANDS.length)
        handValues.push(POSSIBLE_BLACKJACK_HANDS[randomIndex])
      }
      if (!this.isWinner && handValues.some(hand => hand === 21)) {
        const foundIndex = handValues.findIndex(hand => hand === 21)
        handValues[foundIndex] = 20
      }
      this.handValues = handValues
    },
    calculateDealerHandValue() {
      let possibleDealerHands: Partial<PossibleBlackJackHand[]> = [...POSSIBLE_BLACKJACK_HANDS]
      if(this.isWinner) {
        possibleDealerHands = POSSIBLE_BLACKJACK_HANDS.filter(hand => hand < this.highestHandValue)
      } else {
        possibleDealerHands = POSSIBLE_BLACKJACK_HANDS.filter(hand => hand > this.highestHandValue)
      }
      const randomIndex = Math.floor(Math.random() * possibleDealerHands.length)
      this.dealerHandValue = possibleDealerHands[randomIndex] || 4
    },
    setIfWinner(chance: number) {
      if (chance >= 0.7) {
        this.isWinner = true
      }
    },
    calculateWinAmount(chance: number) {
      if (chance >= 0.7) {
        this.prize = '500 Ft<br> Ötszáz'
      }
      if (chance >= 0.75) {
        this.prize = '1.000 Ft<br> Ezer'
      }
      if (chance >= 0.85) {
        this.prize = '5.000 Ft<br> Ötezer'
      }
      if (chance >= 0.90) {
        this.prize = '10.000 Ft<br>Tízezer'
      }
      if (chance >= 0.95) {
        this.prize = '100.000 Ft<br> Százezer'
      }
    },
    play() {
      const chance = Math.random()
      this.setIfWinner(chance)
      this.calculateWinAmount(chance)
      this.generateHandValues()
      this.calculateDealerHandValue()
    }
  },
  computed: {
    highestHandValue(): PossibleBlackJackHand {
      return this.handValues.reduce((acc, curr) => {
        if (curr > acc) {
          return curr
        }
        return acc
      }, 4 as PossibleBlackJackHand)
    },
  },
  mixins: [utils],
})
</script>

<template>
  <div class="field" v-if="handValues.length">
    <div class="dealer">
      <p class="prize" v-html="prize" />
      <p>{{ dealerHandValue }}</p>
      <p class="text">{{ createTextForValue(dealerHandValue) }}</p>
    </div>
    <div class="hand" v-for="hand in handValues">
      <p>{{ hand }}</p>
      <p class="text">{{ createTextForValue(hand) }}</p>
    </div>
  </div>
</template>

<style scoped>
  .field {
    position: absolute;
    top: 353px;
    width: 100%;
    height: 220px;
    display: grid;
    grid-template-columns: 80px 101px 101px 80px;
    grid-template-rows: 110px;
    grid-template-areas: "first-hand dealer dealer second-hand" "third-hand third-hand fourth-hand fourth-hand";
    padding: 0 40px;
    text-align: center;
  }

  .dealer {
    grid-area: dealer;
  }

  .prize {
    height: 32px;
  }

  .prize,
  .text {
    font-size: 14px;
    font-weight: 700;
    line-height: 16px;
  }

  .hand:first-child {
    grid-area: first-hand;
  }

  .hand:nth-child(2) {
    grid-area: second-hand;
  }

  .hand:nth-child(3) {
    grid-area: third-hand;
    padding-left: 20px;
  }

  .hand:nth-child(4) {
    grid-area: fourth-hand;
    padding-right: 20px;
  }

  .hand,
  .dealer{
    font-size: 40px;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
  }

</style>

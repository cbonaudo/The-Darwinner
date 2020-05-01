<template>
  <div>
    <h2>
      <span>{{ atomsNumber }} {{ atomsNumber === 1 ? "Atom" : "Atoms"}}</span>
      <br />
      <span
        v-if="proteinsNumber"
      >{{ proteinsNumber }} {{ atomsNumber === 1 ? "Protein" : "Proteins"}}</span>
    </h2>

    <div class="atom-container">
      <div>{{ incrementValue === 1 ? "Atom" : "Atoms"}} per Click : {{ incrementValue }}</div>

      <div>
        <button @click="atomClick" @keyup.a="atomClick">
          Add 1
          <span class="underlined">A</span>tom
        </button>
      </div>

      <div>
        <div v-for="(upgrade, i) in upgrades" :key="i">
          <button @click="useUpgrade(upgrade, i)" v-if="isUnlocked(upgrade)">{{ upgrade.text }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { upgrades } from '@/data/upgradesAtoms'
import { atomCeiling } from '@/data/constants'

export default {
  name: 'Atoms',
  data() {
    return {
      // Stats
      clicksNumber: 0,
      timer: 0,
      // Resources
      atomsNumber: 0,
      proteinsNumber: 0,
      // Resources Multiplier
      incrementValue: 1,
      // Upgrades
      upgrades
    }
  },
  watch: {
    atomsNumber: {
      handler() {
        this.getProteins()
      }
    }
  },
  methods: {
    // Atoms Actions
    atomClick() {
      this.atomsNumber += this.incrementValue
      this.clicksNumber++
      this.$emit('clicked')
    },
    // Proteins Actions
    getProteins() {
      if (this.atomsNumber >= atomCeiling) {
        this.proteinsNumber += Math.floor(this.atomsNumber / atomCeiling)
        this.atomsNumber %= atomCeiling
      }
    },
    // Upgrades
    useUpgrade(upgrade, i) {
      switch (upgrade.action) {
        case 'doubleIncrement':
          this.doubleIncrement()
          break
        case 'addIncrementPer10':
          console.log('hello')
      }
      this.proteinsNumber -= upgrade.proteinsNeeded
      this.upgrades.splice(i, 1)
    },
    doubleIncrement() {
      this.incrementValue *= 2
    },
    isUnlocked(upgrade) {
      return this.proteinsNumber >= upgrade.proteinsNeeded
    },
    // Debug
    resetAtoms() {
      this.atomsNumber = 0
    }
  }
}
</script>

<style scoped>
.atom-container > div {
  margin-bottom: 10px;
}
</style>

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
        <button @click="atomClick">
          Add 1
          <span :class="maintainUnlocked ? 'underlined': ''">A</span>tom
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
      // Resources
      atomsNumber: 0,
      proteinsNumber: 0,
      // Resources Multiplier
      incrementValue: 1,
      // Upgrades
      upgrades,
      maintainUnlocked: false
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
      this.$emit('clicked')
      this.atomBuying()
    },
    atomBuying() {
      this.atomsNumber += this.incrementValue
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
      this['upgrade_' + upgrade.action]()
      this.proteinsNumber -= upgrade.proteinsNeeded
      this.upgrades.splice(i, 1)
    },
    upgrade_doubleIncrement() {
      this.incrementValue *= 2
    },
    upgrade_unlockKeystroke() {
      this.maintainUnlocked = true
      this.$emit('unlockKeystroke')
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

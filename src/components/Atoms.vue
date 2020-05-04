<template>
  <div>
    <div class="flex-row space-between">
      <div class="upgrades-bought">
        <div v-for="(upgradeBought, i) in upgradesBought" :key="i">{{ upgradeBought.text }}</div>
      </div>
      <div class="atom-container">
        <h2>
          <span v-if="proteinsNumber">
            {{ proteinsNumber > 9999 ? proteinsNumber.toExponential() : proteinsNumber }}
            {{ atomsNumber === 1 ? 'Protein' : 'Proteins' }}
          </span>
        </h2>

        <h2>
          <span>{{ Math.floor(atomsNumber) }} {{ atomsNumber === 1 ? 'Atom' : 'Atoms' }}</span>
        </h2>

        <div v-if="tenthClickActivated">
          Tenth Click :
          <span v-for="(tenth, i) in new Array(tenthClick)" :key="i + 'tenthC'">o</span>
          <span v-for="(empty, i) in new Array(10 - tenthClick)" :key="i + 'emptyC'">-</span>
        </div>

        <div v-if="tenthKeyStrokeActivated">
          Tenth Key Stroke :
          <span
            v-for="(tenth, i) in new Array(tenthKeyStroke)"
            :key="i + 'tenthKS'"
          >o</span>
          <span v-for="(empty, i) in new Array(10 - tenthKeyStroke)" :key="i + 'emptyKS'">-</span>
        </div>

        <div>{{ incrementValue === 1 ? 'Atom' : 'Atoms' }} per Click : {{ incrementValue }}</div>

        <div
          v-if="tickActivated"
        >{{ incrementValue === 1 ? 'Atom' : 'Atoms' }} per Second : {{ incrementValue }}</div>

        <div>
          <button type="button" @mousedown="atomClick">
            Add 1
            <span :class="keyStrokeUnlocked ? 'underlined' : ''">A</span>tom
          </button>
        </div>

        <div>
          <div v-for="(upgrade, i) in upgrades" :key="i">
            <button @click="useUpgrade(upgrade, i)" v-if="isUnlocked(upgrade)">{{ upgrade.text }}</button>
          </div>
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
      tenthClick: 0,
      tenthClickActivated: false,
      tenthKeyStroke: 0,
      tenthKeyStrokeActivated: false,
      // Resources Multiplier
      incrementValue: 1,
      // Tick Resources
      tickActivated: false,
      // Upgrades
      upgrades,
      upgradesBought: [],
      keyStrokeUnlocked: false
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
      this.tenthClickActivated && this.getTenthClick()
      this.atomBuying()
    },
    atomKeyStroke() {
      this.tenthKeyStrokeActivated && this.getTenthKeyStroke()
      this.atomBuying(0.5)
    },
    atomBuying(modifier = 1) {
      this.atomsNumber += this.incrementValue * modifier
    },
    getTenthClick() {
      if (this.tenthClick >= 9) {
        this.tenthClick = 0
        this.atomBuying()
      } else {
        this.tenthClick++
      }
    },
    getTenthKeyStroke() {
      if (this.tenthKeyStroke >= 9) {
        this.tenthKeyStroke = 0
        this.atomBuying(0.5)
      } else {
        this.tenthKeyStroke++
      }
    },
    // Proteins Actions
    getProteins() {
      if (this.atomsNumber >= atomCeiling) {
        this.proteinsNumber += Math.floor(this.atomsNumber / atomCeiling)
        this.atomsNumber %= atomCeiling
      }
    },
    // Tick Actions
    tickActions() {
      this.tickActivated && this.atomBuying()
    },
    // Upgrades
    useUpgrade(upgrade, i) {
      this['upgrade_' + upgrade.action]()
      this.proteinsNumber -= upgrade.proteinsNeeded
      this.upgradesBought.push(upgrade)
      this.upgrades.splice(i, 1)
    },
    upgrade_doubleIncrement() {
      this.incrementValue *= 2
    },
    upgrade_unlockKeyStroke() {
      this.keyStrokeUnlocked = true
      this.$emit('unlockKeystroke')
    },
    upgrade_activateTenthClick() {
      this.tenthClickActivated = true
    },
    upgrade_activateTenthKeyStroke() {
      this.tenthKeyStrokeActivated = true
    },
    upgrade_activateTick() {
      this.tickActivated = true
    },
    isUnlocked(upgrade) {
      return this.proteinsNumber >= upgrade.proteinsNeeded
    },
    // Debug
    resetAtoms() {
      this.atomsNumber = 0
    }
  },
  created() {
    setInterval(() => {
      console.log('hello')
      this.tickActions()
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.upgrades-bought {
  width: 100px;
}
.atom-container {
  flex-grow: 2;
  > div {
    margin-bottom: 10px;
  }
}
</style>

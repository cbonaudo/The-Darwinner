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

        <div v-if="tenthTickActivated">
          Tenth Tick :
          <span v-for="(tenth, i) in new Array(tenthTick)" :key="i + 'tenthC'">o</span>
          <span v-for="(empty, i) in new Array(10 - tenthTick)" :key="i + 'emptyC'">-</span>
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
          <div v-for="(empty, i) in new Array(5)" :key="i">
            <button
              v-if="upgrades[i]"
              @click="isUnlocked(upgrades[i]) && useUpgrade(i)"
              :disabled="isUnlocked(upgrades[i]) ? false : true"
            >{{ upgrades[i].text }} {{ getPercentForUpgrade(i) }}</button>
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
      // Tenths
      tenthClick: 0,
      tenthClickActivated: false,
      tenthClickIncrement: 1,
      tenthKeyStroke: 0,
      tenthKeyStrokeActivated: false,
      tenthKeyStrokeIncrement: 0.5,
      tenthTick: 0,
      tenthTickActivated: false,
      tenthTickIncrement: 1,
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
        this.atomBuying(this.tenthClickIncrement)
      } else {
        this.tenthClick++
      }
    },
    getTenthKeyStroke() {
      if (this.tenthKeyStroke >= 9) {
        this.tenthKeyStroke = 0
        this.atomBuying(this.tenthKeyStrokeIncrement)
      } else {
        this.tenthKeyStroke++
      }
    },
    getTenthTick() {
      if (this.tenthTick >= 9) {
        this.tenthTick = 0
        this.atomBuying(this.tenthTickIncrement)
      } else {
        this.tenthTick++
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
      if (!this.tickActivated) {
        return
      }
      this.atomBuying()
      this.tenthTickActivated && this.getTenthTick()
    },
    // Upgrades
    useUpgrade(i) {
      this['upgrade_' + this.upgrades[i].action]()
      this.proteinsNumber -= this.upgrades[i].proteinsNeeded
      this.upgradesBought.push(this.upgrades[i])
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
    upgrade_increaseTenthClick() {
      this.tenthClickIncrement *= 2
    },
    upgrade_activateTenthKeyStroke() {
      this.tenthKeyStrokeActivated = true
    },
    upgrade_increaseTenthKeyStroke() {
      this.tenthKeyStrokeIncrement *= 2
    },
    upgrade_activateTenthTick() {
      this.tenthTickActivated = true
    },
    upgrade_increaseTenthTick() {
      this.tenthTickIncrement *= 2
    },
    upgrade_activateTick() {
      this.tickActivated = true
    },
    isUnlocked(upgrade) {
      return this.proteinsNumber >= upgrade.proteinsNeeded
    },
    getPercentForUpgrade(index) {
      const upgrade = this.upgrades[index]
      const atomsNeeded = upgrade.proteinsNeeded * atomCeiling
      const atomsHoarded = this.proteinsNumber * atomCeiling + this.atomsNumber
      const percent = (atomsHoarded / atomsNeeded) * 100
      return percent < 100 ? `${Math.floor(percent)}%` : ''
    },
    // Debug
    resetAtoms() {
      this.atomsNumber = 0
    }
  },
  created() {
    setInterval(() => {
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

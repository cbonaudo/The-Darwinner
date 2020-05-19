<template>
  <div>
    <div class="flex-row space-between">
      <div class="upgrades-bought">
        <div v-for="(upgradeBought, i) in $atomStore.upgradesBought" :key="i">{{ upgradeBought.text }}</div>
      </div>
      <div class="atom-container">
        <h2>
          <span v-if="$atomStore.proteinsNumber">
            {{ $atomStore.proteinsNumber > 9999 ? $atomStore.proteinsNumber.toExponential() : $atomStore.proteinsNumber }}
            {{ $atomStore.proteinsNumber === 1 ? 'Protein' : 'Proteins' }}
          </span>
        </h2>
        <h2>
          <span>{{ Math.floor($atomStore.atomsNumber) }} {{ $atomStore.atomsNumber >= 2 ? 'Atoms' : 'Atom' }}</span>
        </h2>

        <div v-if="$atomStore.tenthClickActivated">
          Tenth Click :
          <span v-for="(tenth, i) in new Array($atomStore.tenthClick)" :key="i + 'tenthC'">o</span>
          <span v-for="(empty, i) in new Array(10 - $atomStore.tenthClick)" :key="i + 'emptyC'">-</span>
        </div>
        <div v-if="$atomStore.tenthKeyStrokeActivated">
          Tenth Key Stroke :
          <span
            v-for="(tenth, i) in new Array($atomStore.tenthKeyStroke)"
            :key="i + 'tenthKS'"
          >o</span>
          <span v-for="(empty, i) in new Array(10 - $atomStore.tenthKeyStroke)" :key="i + 'emptyKS'">-</span>
        </div>
        <div v-if="$atomStore.tenthTickActivated">
          Tenth Tick :
          <span v-for="(tenth, i) in new Array($atomStore.tenthTick)" :key="i + 'tenthT'">o</span>
          <span v-for="(empty, i) in new Array(10 - $atomStore.tenthTick)" :key="i + 'emptyT'">-</span>
        </div>

        <div>{{ $atomStore.clickIncrement * $atomStore.globalMultiplier >= 2 ? 'Atoms' : 'Atom' }} per Click : {{ $atomStore.clickIncrement * $atomStore.globalMultiplier }}</div>
        <div
          v-if="$atomStore.tickActivated"
        >{{ $atomStore.tickIncrement * $atomStore.globalMultiplier >= 2 ? 'Atoms' : 'Atom' }} per Second : {{ $atomStore.tickIncrement * $atomStore.globalMultiplier }}</div>
        <div
          v-if="$atomStore.keyStrokeUnlocked"
        >{{ $atomStore.keyStrokeIncrement * $atomStore.globalMultiplier >= 2 ? 'Atoms' : 'Atom' }} per Keystroke : {{ $atomStore.keyStrokeIncrement * $atomStore.globalMultiplier }}</div>

        <div>
          <button type="button" @mousedown="atomClick">
            Add 1
            <span :class="$atomStore.keyStrokeUnlocked ? 'underlined' : ''">A</span>tom
          </button>
        </div>

        <div>
          <div v-for="(empty, i) in new Array(5)" :key="i">
            <button
              v-if="$atomStore.upgrades[i]"
              @click="useUpgrade(i)"
              :disabled="!isUnlocked($atomStore.upgrades[i])"
            >{{ $atomStore.upgrades[i].text }} {{ getPercentForUpgrade(i) }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { atomCeiling } from '@/data/constants'

export default {
  name: 'Atoms',
  watch: {
    '$atomStore.atomsNumber': {
      handler() {
        this.getProteins()
      }
    }
  },
  methods: {
    // Atoms Actions
    atomClick() {
      this.$emit('clicked')
      this.$atomStore.tenthClickActivated && this.getTenthClick()
      this.atomBuying(this.$atomStore.clickIncrement)
    },
    atomKeyStroke() {
      this.$atomStore.tenthKeyStrokeActivated && this.getTenthKeyStroke()
      this.atomBuying(this.$atomStore.keyStrokeIncrement)
    },
    atomBuying(modifier = 1) {
      this.$atomStore.atomsNumber += this.$atomStore.globalMultiplier * modifier
    },
    getTenthClick() {
      if (this.$atomStore.tenthClick >= 9) {
        this.$atomStore.tenthClick = 0
        this.atomBuying(this.$atomStore.tenthClickIncrement)
      } else {
        this.$atomStore.tenthClick++
      }
    },
    getTenthKeyStroke() {
      if (this.$atomStore.tenthKeyStroke >= 9) {
        this.$atomStore.tenthKeyStroke = 0
        this.atomBuying(this.$atomStore.tenthKeyStrokeIncrement)
      } else {
        this.$atomStore.tenthKeyStroke++
      }
    },
    getTenthTick() {
      if (this.$atomStore.tenthTick >= 9) {
        this.$atomStore.tenthTick = 0
        this.atomBuying(this.$atomStore.tenthTickIncrement)
      } else {
        this.$atomStore.tenthTick++
      }
    },
    // Proteins Actions
    getProteins() {
      if (this.$atomStore.atomsNumber >= atomCeiling) {
        this.$atomStore.proteinsNumber += Math.floor(this.$atomStore.atomsNumber / atomCeiling)
        this.$atomStore.atomsNumber %= atomCeiling
      }
    },
    // Tick Actions
    tickActions() {
      if (!this.$atomStore.tickActivated) {
        return
      }
      this.atomBuying(this.$atomStore.tickIncrement)
      this.$atomStore.tenthTickActivated && this.getTenthTick()
    },
    // Upgrades
    useUpgrade(i) {
      this['upgrade_' + this.$atomStore.upgrades[i].action]()
      this.$atomStore.proteinsNumber -= this.$atomStore.upgrades[i].proteinsNeeded
      this.$atomStore.upgradesBought.push(this.$atomStore.upgrades[i])
      this.$atomStore.upgrades.splice(i, 1)
    },
    upgrade_doubleGlobal() {
      this.$atomStore.globalMultiplier *= 2
    },

    upgrade_increaseClick() {
      this.$atomStore.clickIncrement *= 2
    },
    upgrade_activateTenthClick() {
      this.$atomStore.tenthClickActivated = true
    },
    upgrade_increaseTenthClick() {
      this.$atomStore.tenthClickIncrement *= 2
    },

    upgrade_unlockKeyStroke() {
      this.$atomStore.keyStrokeUnlocked = true
      this.$emit('unlockKeystroke')
    },
    upgrade_increaseKeyStroke() {
      this.$atomStore.keyStrokeIncrement *= 2
    },
    upgrade_activateTenthKeyStroke() {
      this.$atomStore.tenthKeyStrokeActivated = true
    },
    upgrade_increaseTenthKeyStroke() {
      this.$atomStore.tenthKeyStrokeIncrement *= 2
    },

    upgrade_activateTick() {
      this.$atomStore.tickActivated = true
    },
    upgrade_increaseTick() {
      this.$atomStore.tickIncrement *= 2
    },
    upgrade_activateTenthTick() {
      this.$atomStore.tenthTickActivated = true
    },
    upgrade_increaseTenthTick() {
      this.$atomStore.tenthTickIncrement *= 2
    },
    isUnlocked(upgrade) {
      return this.$atomStore.proteinsNumber >= upgrade.proteinsNeeded
    },
    getPercentForUpgrade(index) {
      const upgrade = this.$atomStore.upgrades[index]
      const atomsNeeded = upgrade.proteinsNeeded * atomCeiling
      const atomsHoarded = this.$atomStore.proteinsNumber * atomCeiling + this.$atomStore.atomsNumber
      const percent = (atomsHoarded / atomsNeeded) * 100
      return percent < 100 ? `${Math.floor(percent)}%` : ''
    },
    // Debug
    resetAtoms() {
      this.$atomStore.atomsNumber = 0
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

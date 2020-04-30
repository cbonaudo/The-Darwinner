<template>
  <div>
    <h2>
      <span>{{ Math.floor(atomsNumber) }}</span> Atoms
    </h2>

    <div class="atom-container">
      <div>Atoms per Click : {{ incrementValue }}</div>

      <div>
        <button @click="atomClick" @keyup.a="atomClick">
          <span class="underlined">A</span>dd 1 Atom
        </button>
      </div>

      <div>
        <div v-for="(upgrade, i) in upgrades" :key="i">
          <button
            @click="useUpgrade(upgrade.action, i)"
            v-if="isUnlocked(upgrade)"
          >{{ upgrade.text }}</button>
        </div>
      </div>
    </div>

    <div class="debug">
      <button v-on:click="resetAtoms">Reset</button>
      <p>Clicks : {{ clicksNumber }}</p>
      <p>Timer : {{ timer }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Atoms',
  data() {
    return {
      // Stats
      clicksNumber: 0,
      timer: 0,
      // Resources
      atomsNumber: 0,
      proteinNumber: 0,
      // Resources Multiplier
      incrementValue: 1,
      // Upgrades
      upgrades: [
        {
          text: 'Add Increment 1',
          action: 'addIncrement',
          unlock: () => this.proteinNumber > 0
        },
        {
          text: 'Add Increment 2',
          action: 'addIncrement',
          unlock: () => this.proteinNumber > 49
        }
      ]
    }
  },
  methods: {
    // Atoms Actions
    atomClick() {
      this.atomsNumber += this.incrementValue
      this.clicksNumber++
    },
    // Upgrades
    useUpgrade(upgradeAction, i) {
      if (upgradeAction === 'addIncrement') {
        this.addIncrement()
      }
      this.upgrades.splice(i, 1)
    },
    addIncrement() {
      this.incrementValue *= 2
    },
    isUnlocked(upgrade) {
      return upgrade.unlock()
    },
    // Debug
    resetAtoms() {
      this.atomsNumber = 0
    }
  }
}
</script>

<style scoped>
.debug {
  border: 1px black solid;
  width: 100px;
  position: absolute;
  top: 250px;
  right: 10%;
}

.atom-container > div {
  margin-bottom: 10px;
}
</style>

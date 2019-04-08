<template>
  <div>
    <h2>
      <span>{{ Math.floor(cellsNumber) }}</span> Cells
    </h2>
    <p v-if="divisionChance > 0">
      Automatic Division Chance :
      <span>{{ Math.floor(divisionChance * 100) }} %</span>
      Periodic Multiplier :
      <span>{{ Math.floor(periodicMultiplier * 100) }} %</span>
    </p>
    <p>
      Current Max Click Multiplier :
      <span>{{ Math.floor(maxClickMultiplier * 100) }} %</span>
    </p>
    <button v-on:click="clickCells">Divide</button>
    <p>+ {{ Math.floor(earnedCellPeriodic) }} | + {{ Math.floor(earnedCellClick) }}</p>
    <p v-if="periodicGain > 0">+ {{ periodicGain }}/sec</p>

    <div>
      <div v-for="(upgrade, key) in upgradesAvailable" :key="key">
        <button v-on:click="useUpgradeCells(upgrade.name,key)">{{ upgrade.name}}</button>
        <span>{{upgrade.description }}</span>
      </div>
    </div>

    <div class="debug">
      <!-- <button v-on:click="resetCells">Reset</button>
      <button v-on:click="doubleMulti">Double</button>-->
      <p>Clicks : {{ clicksNumber }}</p>
      <p>Timer : {{ timer }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cells",

  // -- VAR --
  data() {
    return {
      // Stats
      clicksNumber: 0,
      timer: 0,
      // Ressource Number
      cellsNumber: 1,
      // Clicks
      maxClickMultiplier: 0.05,
      earnedCellClick: 0,
      // Ticks
      periodicGain: 0,
      divisionChance: 0,
      periodicMultiplier: 0.05,
      earnedCellPeriodic: 0,
      // Upgrades
      upgradesAvailable: [],
      upgrades: { "Buff 1": {}, "Buff 2": {}, "Buff 3": {}, "Buff 4": {} }
    };
  },

  // -- CREATED --
  created() {
    setInterval(this.tickActions, 1000);
  },

  methods: {
    // -- CLICK FUNCTIONS --
    clickCells: function(event) {
      // DEBUG : Increase click counter
      this.clicksNumber += 1;
      // Store the starting cell floored
      const startingCellsNumber = Math.floor(this.cellsNumber);
      // Add some cells (bigger multiplier at the start)
      if (this.cellsNumber < 4) {
        this.cellsNumber +=
          Math.random() *
          (this.cellsNumber * this.maxClickMultiplier * (5 - this.cellsNumber));
      } else {
        this.cellsNumber +=
          Math.random() * (this.cellsNumber * this.maxClickMultiplier);
      }
      // Compare the cells and starting cells to see how much was created
      this.earnedCellClick = this.cellsNumber - startingCellsNumber;
      this.showUpgradeCells();
    },

    // -- UPGRADE FUNCTIONS --
    showUpgradeCells: function() {
      // Add upgrades if above a certain cellsNumber
      if (this.cellsNumber > 50 && !this.upgrades["Buff 1"].shown) {
        this.upgradesAvailable.push({
          name: "Buff 1",
          description: "You earn 1 Cell per second"
        });
        this.upgrades["Buff 1"].shown = true;
      }
      if (
        this.cellsNumber > 100 &&
        this.upgrades["Buff 1"].used &&
        !this.upgrades["Buff 2"].shown
      ) {
        this.upgradesAvailable.push({
          name: "Buff 2",
          description: "Add 5% to your max click multiplier"
        });
        this.upgrades["Buff 2"].shown = true;
      }
      if (
        this.cellsNumber > 1000 &&
        this.upgrades["Buff 2"].used &&
        !this.upgrades["Buff 3"].shown
      ) {
        this.upgradesAvailable.push({
          name: "Buff 3",
          description: "Add 10% to Automatic Division chances"
        });
        this.upgrades["Buff 3"].shown = true;
      }
      if (
        this.cellsNumber > 10000 &&
        this.upgrades["Buff 3"].used &&
        !this.upgrades["Buff 4"].shown
      ) {
        this.upgradesAvailable.push({
          name: "Buff 4",
          description: ""
        });
        this.upgrades["Buff 4"].shown = true;
      }
    },
    useUpgradeCells: function(upgrade, index) {
      switch (upgrade) {
        case "Buff 1":
          this.periodicGain += 1;
          this.upgrades["Buff 1"].used = true;
          break;
        case "Buff 2":
          this.maxClickMultiplier += 0.05;
          this.upgrades["Buff 2"].used = true;
          break;
        case "Buff 3":
          this.divisionChance += 0.1;
          this.upgrades["Buff 3"].used = true;
          break;
      }
      this.upgradesAvailable.splice(index, 1);
      this.cellsNumber = this.cellsNumber * 0.1;
      this.showUpgradeCells();
    },

    // -- TICK FUNCTIONS --
    tickActions: function() {
      // Increase timer
      this.timer += 1;
      // Periodic chance to gain a percentage of your cells
      if (Math.random() < this.divisionChance) {
        this.earnedCellPeriodic = this.cellsNumber * this.periodicMultiplier;
        this.cellsNumber += this.cellsNumber * this.periodicMultiplier;
      }
      // Periodic gain of cells
      this.cellsNumber += this.periodicGain;
    },

    // -- DEV FUNCTIONS --
    resetCells: function() {
      this.timer = 0;
      this.clicksNumber = 0;

      this.cellsNumber = 1;

      this.maxClickMultiplier = 0.05;
      this.earnedCellClick = 0;

      this.divisionChance = 0;
      this.periodicMultiplier = 0.05;
      this.earnedCellPeriodic = 0;
      this.periodicGain = 0;

      this.upgradesAvailable = [];
      this.upgrades = {
        "Buff 1": {},
        "Buff 2": {},
        "Buff 3": {},
        "Buff 4": {}
      };
    },
    doubleMulti: function() {
      this.maxClickMultiplier *= 2;
    }
  }
};
</script>

<style>
.debug {
  border: 1px black solid;
  width: 100px;
  position: absolute;
  top: 250px;
  right: 10%;
}

@-webkit-keyframes fadeOutUp {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
}

@keyframes fadeOutUp {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
}
.fadeOutUp {
  -webkit-animation-name: fadeOutUp;
  animation-name: fadeOutUp;
}
</style>

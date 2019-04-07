<template>
  <div>
    <h2>The Cells Era</h2>
    <p>
      Cells :
      <span>{{ Math.floor(cellsNumber) }}</span>
    </p>
    <p>
      Current Max Click Multiplier :
      <span>{{ maxClickMultiplier * 100 }} %</span>
    </p>
    <button v-on:click="clickCells">Divide</button>
    <button v-on:click="resetCells">Reset</button>
    <!-- <button v-on:click="doubleMulti">Double</button> -->
    <p>Your cells divided and created {{ Math.floor(earnedCell) }} new cells !</p>
    <div>
      <button
        v-for="(upgradeName, key) in upgradesAvailable"
        :key="key"
        v-on:click="useUpgradeCells(upgradeName,key)"
      >{{ upgradeName }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cells",
  data() {
    return {
      cellsNumber: 1,
      maxClickMultiplier: 0.05,
      earnedCell: 0,
      upgradesAvailable: []
    };
  },
  created() {},
  methods: {
    clickCells: function(event) {
      // Store the starting cell floored
      const startingCellsNumber = Math.floor(this.cellsNumber);
      // Add some cells (bigger multiplier if starting)
      if (this.cellsNumber < 4) {
        this.cellsNumber +=
          Math.random() *
          (this.cellsNumber * this.maxClickMultiplier * (5 - this.cellsNumber));
      } else {
        this.cellsNumber +=
          Math.random() * (this.cellsNumber * this.maxClickMultiplier);
      }
      // Compare the cells and starting cells to see how much was created
      this.earnedCell = this.cellsNumber - startingCellsNumber;
      // Add upgrades if above a certain cellsNumber
      if (startingCellsNumber < 100 && this.cellsNumber > 100) {
        this.upgradesAvailable.push("Buff 1");
      }
      if (startingCellsNumber < 200 && this.cellsNumber > 200) {
        // this.upgradesAvailable.push("Buff 2");
      }
    },
    resetCells: function() {
      this.cellsNumber = 1;
      this.maxClickMultiplier = 0.05;
      this.earnedCell = 0;
      this.upgradesAvailable = [];
    },
    doubleMulti: function() {
      this.maxClickMultiplier *= 2;
    },
    useUpgradeCells: function(upgrade, index) {
      switch (upgrade) {
        case "Buff 1":
          this.maxClickMultiplier *= 2;
          this.upgradesAvailable.splice(index, 1);
          this.cellsNumber = 1;
          break;
        case "Buff 2":
          break;
      }
    }
  }
};
</script>

<style>
</style>

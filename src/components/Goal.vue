<template>
  <div class="goal">
    <h2>How to play :</h2>
    <div v-if="era === 0">
      <h3>Error - Era</h3>
      <p>Someone messed up big</p>
    </div>
    <div v-if="era === 1">
      <h3>Part I - The Atoms Era</h3>
      <ul>
        <li>Create more Atoms</li>
        <li>{{ atomCeiling }} Atoms gives a Protein</li>
        <li>42 M Proteins unlock next Era</li>
      </ul>
    </div>
    <div v-if="era === 2">
      <h3>Part II - The Cells Era</h3>
      <ul>
        <li>Divide Cells</li>
        <li>Buy Upgrades (cost 90% of your cells)</li>
        <li>Repeat</li>
        <li>$$-Profit-$$</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { atomCeiling } from '@/data/constants'

export default {
  name: 'Goal',
  data() {
    return { atomCeiling }
  },
  props: {
    era: { default: 0 }
  }
}
</script>

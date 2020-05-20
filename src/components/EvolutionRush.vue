<template>
  <div class="rush" :style="getPosition" v-if="isDisplayed"></div>
</template>

<script>
export default {
  name: 'EvolutionRush',
  data() {
    return { top: 5, left: 5 }
  },
  props: {
    isDisplayed: { default: true }
  },
  computed: {
    getPosition() {
      return { top: `${this.top}%`, left: `${this.left}%` }
    }
  },
  methods: {
    changePosition() {
      this.top = Math.random() * 65 + 5
      this.left = Math.random() * 75 + 5
    }
  }
}
</script>

<style scoped>
.rush {
  background-color: black;
  top: 5%;
  height: 200px;
  width: 200px;
  border-radius: 5%;
  position: fixed;
}
</style>

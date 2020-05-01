<template>
  <div class="debug">
    <button @click="reset">Reset</button>
    <p>Clicks : {{ clicks }}</p>
    <p>Key Strokes : {{ keyStrokes }}</p>
    <p>Timer : {{ timer }}</p>
  </div>
</template>

<script>
export default {
  name: 'Goal',
  data() {
    return { eraNumber: 1, timer: 0 }
  },
  props: {
    clicks: { default: 0 },
    keyStrokes: { default: 0 }
  },
  created() {
    setInterval(this.tick, 1000)
  },
  methods: {
    tick() {
      this.timer++
    },
    reset() {
      this.$emit('resetAll')
      this.timer = 0
    }
  }
}
</script>

<style>
.debug {
  border: 1px black solid;
  margin: auto 75px;
  padding: 10px;
}
</style>

<template>
  <div>
    <div class="flex-row app-container">
      <div class="flex-col main-window">
        <Header></Header>
        <Atoms @clicked="clicks++" ref="atoms"></Atoms>
        <!-- <Cells></Cells> -->
      </div>
      <div class="sidebar">
        <Goal :era="era"></Goal>
        <Debug :clicks="clicks" @resetAll="resetAll"></Debug>
        <Changelog></Changelog>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
import Atoms from './components/Atoms'
import Cells from './components/Cells'
import Goal from './components/Goal'
import Debug from './components/Debug'
import Changelog from './components/Changelog'

export default {
  name: 'Global',
  data() {
    return { clicks: 0, era: 1 }
  },
  components: { Goal, Debug, Header, Atoms, Cells, Changelog },
  methods: {
    resetAll() {
      this.$refs.atoms.resetAtoms()
      this.clicks = 0
    }
  }
}
</script>

<style scoped>
.app-container {
  margin-left: 30px;
  margin-right: 30px;
}
.sidebar {
  align-items: center;
}
.main-window {
  flex-grow: 2;
}
</style>

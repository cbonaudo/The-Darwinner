<template>
  <div>
    <div class="flex-row app-container">
      <div class="flex-col main-window">
        <Header></Header>
        <Atoms @clicked="clicks++" @unlockKeystroke="unlockKeystroke(65)" ref="atoms"></Atoms>
      </div>
      <div class="sidebar">
        <Goal :era="era"></Goal>
        <Debug :clicks="clicks" :keyStrokes="keyStrokes" @resetAll="resetAll"></Debug>
        <Changelog></Changelog>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
import Atoms from './components/Atoms'
import Goal from './components/Goal'
import Debug from './components/Debug'
import Changelog from './components/Changelog'

export default {
  name: 'Global',
  data() {
    return { clicks: 0, keyStrokes: 0, era: 1, keyStrokesAllowed: [] }
  },
  components: { Goal, Debug, Header, Atoms, Changelog },
  created() {
    document.onkeydown = evt => {
      // Key: A
      if (evt.keyCode === 65 && this.keyStrokesAllowed.includes(65)) {
        this.$refs.atoms.atomKeyStroke()
        this.keyStrokes++
      }
    }
  },
  methods: {
    unlockKeystroke(key) {
      this.keyStrokesAllowed.push(key)
    },
    resetAll() {
      this.$refs.atoms.resetAtoms()
      this.clicks = 0
      this.keyStrokes = 0
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

<template>
  <div>
    <Header></Header>
    <div class="flex-row">
      <Atoms></Atoms>
      <!-- <Cells></Cells> -->
    </div>
    <Goal></Goal>
    <Changelog></Changelog>
  </div>
</template>

<script>
import Goal from './components/Goal'
import Header from './components/Header'
import Atoms from './components/Atoms'
import Cells from './components/Cells'
import Changelog from './components/Changelog'

export default {
  name: 'Global',
  components: { Goal, Header, Atoms, Cells, Changelog }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.flex-row {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>

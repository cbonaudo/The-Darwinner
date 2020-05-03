<template>
  <div class="changelog">
    <h2>Release Notes</h2>
    <h3>V.0.2.0 - Re-Genesis - 30/04/20</h3>
    <ul>
      <li>Add testing</li>
      <li>Create Atoms Era</li>
      <li>Add features (click, tenthClick)</li>
    </ul>
    <h3>V.0.1.0 - Genesis - 07/04/19</h3>
    <ul>
      <li>Create the game</li>
      <li>Find a cool-ass name</li>
      <li>Create Cells era</li>
      <li>Deploy the game</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Changelog'
}
</script>

<style>
.changelog {
  text-align: left;
  max-height: 400px;
  overflow-y: auto;
}
</style>

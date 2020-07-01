<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Screen />
  </div>
</template>

<script>
import Screen from './components/screen.vue'

let screen = [];

export default {
  name: 'App',
  components: {
    Screen
  },
  data() {
    return {
      screen
    };
  },
  mounted() {

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div id="app">
    <Screen v-bind:screen="screen" v-bind:keyboard="keyboard"/>
    <Settings
            v-bind:game="game"
            v-bind:gameList="gameList"
            v-bind:isRunning="isRunning"
            v-on:select-game="onSelectGame"
            v-on:select-frequency="onSelectFrequency"
            v-on:start-game="onStartGame"
            v-on:stop-game="onStopGame"
    />
  </div>
</template>

<script>
import Screen from './components/screen.vue'
import Settings from './components/settings.vue';
import { getGames, startGame, stopGame } from './API.js';

let store = {
  screen: [],
  keyboard: [],
  gameList: [],
  game: '',
  frequency: 0,
  isRunning: false,
  id: ''
};

export default {
  name: 'App',
  components: {
    Screen,
    Settings
  },
  data() {
    return store;
  },
  async mounted() {
    store.gameList = await getGames();
  },
  methods: {
    onSelectGame(game) {
      store.game = game;
    },
    onSelectFrequency(frequency) {
      store.frequency = frequency;
    },
    async onStartGame() {
      const {game, frequency} = store;
      this.id = await startGame(game, frequency);
    },
    onStopGame() {
      stopGame(this.id);
    }
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

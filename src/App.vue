<template>
  <div id="app" v-on:keydown="onKeyDown" v-on:keyup="onKeyUp">
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
import { getGames, startGame, stopGame, startSocket, updateKeyboard } from './API.js';

let oscillator = null;
let soundTimeoutId = null;
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
      startSocket(this.onNewFrame, this.onSound, this.id);
    },
    onNewFrame(rawScreen){
      const screen = [];

      for (let y = 0; y < rawScreen.length; y += 1) {
        for (let x = 0; x < rawScreen[y].length; x += 1) {
          const currentPixel = this.screen[y + rawScreen.length * x];

          if (!currentPixel || rawScreen[y][x] !== currentPixel.value) {
            screen[y + rawScreen.length * x] = { x, y, value: rawScreen[y][x]}
          }
        }
      }

      this.screen = screen;
    },
    onSound() {
      if (soundTimeoutId) {
        window.clearTimeout(soundTimeoutId);
      } else {
        const context = new AudioContext();

        oscillator = context.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.value = 440;
        oscillator.connect(context.destination);
        oscillator.start();
      }
      soundTimeoutId = window.setTimeout(() => {
        console.log('Stopping Oscillator');
        oscillator.stop();
        window.clearTimeout(soundTimeoutId);
        soundTimeoutId = null;
      }, 1);
    },
    onKeyDown({ keyCode }) {
      if (!this.keyboard.includes(keyCode)) {
        this.keyboard.push(keyCode);
        updateKeyboard(this.keyboard);
      }
    },
    onKeyUp({ keyCode }) {
      if (this.keyboard.includes(keyCode)) {
        const index = this.keyboard.indexOf(keyCode);

        this.keyboard.splice(index, 1);
        updateKeyboard(this.keyboard);
      }
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

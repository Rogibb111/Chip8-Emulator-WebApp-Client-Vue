<template>
    <div class="settings-container">
        <md-field class="game-select">
            <md-select v-model="selectedGame" name="game" id="game" placeholder="Select Game">
                <md-option v-for="game in gameList"
                           v-bind:key="game.fileName"
                           v-bind:value="game.fileName">
                    {{game.name}}
                </md-option>
            </md-select>
        </md-field>
        <md-field class="frequency-select">
            <md-select v-model="selectedFrequency" name="selectedFrequency" id="selectedFrequency" placeholder="Select Frequency">
                <md-option value="1">1 Hz</md-option>
                <md-option value="5">5 Hz</md-option>
                <md-option value="10">10 Hz</md-option>
                <md-option value="20">20 Hz</md-option>
                <md-option value="25">25 Hz</md-option>
                <md-option value="30">30 Hz</md-option>
                <md-option value="35">35 Hz</md-option>
                <md-option value="40">40 Hz</md-option>
                <md-option value="45">45 Hz</md-option>
                <md-option value="50">50 Hz</md-option>
                <md-option value="100">100 Hz</md-option>
                <md-option value="200">200 Hz</md-option>
                <md-option value="300">300 Hz</md-option>
                <md-option value="400">400 Hz</md-option>
                <md-option value="500">500 Hz</md-option>
            </md-select>
        </md-field>
        <md-button class="md-raised md-primary" v-on:click="gameActionClick">{{ gameAction }}</md-button>
        <md-button class="md-raised md-accent">Pause</md-button>
    </div>
</template>
<script>
    export default {
        name: "Settings",
        props: {
            gameList: Array,
            isRunning: Boolean,
            game: String,
            frequency: Number
        },
        data() {
            return {
                selectedGame: this.game,
                selectedFrequency: this.frequency
            }
        },
        computed: {
            gameAction() {
                return this.isRunning ? 'Stop' : 'Start';
            }
        },
        methods: {
            gameActionClick() {
                if (this.isRunning) {
                    this.$emit('stop-game');
                } else {
                    this.$emit('start-game');
                }
            }
        }
    }
</script>

<style scoped>

</style>
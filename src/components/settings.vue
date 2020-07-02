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
                <md-option value=1000>1000 HZ</md-option>
                <md-option value=2000>2000 HZ</md-option>
                <md-option value=3000>3000 HZ</md-option>
                <md-option value=4000>4000 HZ</md-option>
            </md-select>
        </md-field>
        <md-button class="md-raised md-primary">{{ gameAction }}</md-button>
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
        }
    }
</script>

<style scoped>

</style>
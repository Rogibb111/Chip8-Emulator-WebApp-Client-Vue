<template>
    <div class="screen">
        <h1>Chip 8 Emulator</h1>
        <svg width="99%" viewBox="0 0 64 32">
            <rect v-for="(pixel, index) of screen"
                  v-bind:key="index"
                  height="1" width="1"
                  v-bind:fill="pixel.value ? 'white' : 'black'"
                  v-bind:x="pixel.x"
                  v-bind:y="pixel.y"/>
        </svg>
    </div>
</template>

<script>
    export default {
        name: "Screen",
        props: {
            screen: Array
        }
    }
</script>

<style scoped>

</style>
<template>
  <div>
    <h3>Times Rebaixados</h3>
    <ul>
      <li v-for="time in timesRebaixados" v-bind:key="time">
        <clube :time="time"></clube>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["times"],
  computed: {
    timesRebaixados() {
      return this.times.slice(16, 20);
    }
  }
};
</script>

<style>
</style>
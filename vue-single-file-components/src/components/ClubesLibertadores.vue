<template>
  <div>
    <h3>Times classificados para a libertadores 2019</h3>
    <ul>
      <li v-for="time in timesLibertadores" v-bind:key="time">
        <clube :time="time"></clube>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["times"],
  computed: {
    timesLibertadores() {
      return this.times.slice(0, 6);
    }
  }
};
</script>

<style>
</style>
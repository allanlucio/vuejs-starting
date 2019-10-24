<template>
  <div style="display: flex; flex-direction:row">
    <img :style="{order: invertido =='true'?2:1}" class="escudo" :src="time.escudo" alt />
    <span :style="{order: invertido =='true'?1:2}">{{time.nome | ucwords}}</span>
  </div>
</template>

<script>
export default {
  props: ["time", "invertido"]
};
</script>

<style scoped>
  .escudo{
            width: 30px;
            height: 30px;
        }
</style>
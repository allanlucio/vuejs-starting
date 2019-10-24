<template>
  <div class="row">
    <h1 @click="clique()">Campeonato Brasileiro Serie A - 2018 {{$parent.visao}}</h1>
    </div>
</template>

<script>
export default {
    methods:{
        clique(){
            window.console.log(this.$parent.$parent);
        }
    }
}
</script>

<style>

</style>
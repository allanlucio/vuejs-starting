<template>
  <div id="app">
    <div id="app" class="container">
      <titulo></titulo>
      <div class="row">
        <div class="col-md-12">
          <novo-jogo :times="$root.times"></novo-jogo>
        </div>
      </div>

      <div class="row"></div>
      <div class="row">
        <div class="col-md-12">
          <tabela-clubes :times="$root.times"></tabela-clubes>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  data(){
        return {
            visao:'tabela',
            timeCasa: null,
            timeFora:null
        }
    },
    computed:{ 
    },
    methods:{
        showTabela(){
            this.visao = "tabela";
        },
        showPlacar({timeCasa,timeFora}){
            
            this.visao = "placar";
            this.timeCasa = timeCasa;
            this.timeFora = timeFora;
            
        }
    }
};
</script>


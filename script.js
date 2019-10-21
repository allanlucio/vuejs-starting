Vue.filter('ucwords',(valor) => {
    return valor.charAt(0).toUpperCase() + valor.slice(1);
    
});

Vue.component("my-app",{
    
    template:`
    <div id="app" class="container">
    
    <titulo></titulo>
    <div class="row">
    <div class="col-md-12">
    <novo-jogo :times="$root.times"></novo-jogo>
    </div>
    
    </div>
    
    <div  class="row">
    
    </div>
    <div class="row">
    <div class="col-md-12">
    <tabela-clubes :times="$root.times"></tabela-clubes>
    
    
    
    
    </div>
    </div>
    
    
    
    
    
    </div>
    `,
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
            console.log("oi");
        }
    }
});

Vue.component('titulo',
{
    template:`
    <div class="row">
    <h1 @click="clique()">Campeonato Brasileiro Serie A - 2018 {{$parent.visao}}</h1>
    </div>
    `,
    methods:{
        clique(){
            console.log(this.$parent.$parent);
        }
    }
});
Vue.component('tabela-clubes',{
    
    inject:["timesColecao"],
    data(){
        
        return {
            times:this.timesColecao,
            busca:'',
            ordem:{
                colunas: [
                    'pontos','gm','gs','saldo'
                ],
                orientacao:[
                    'desc','desc','asc','saldo'
                ]
            },
            
        }
        
    },
    methods:{
        ordenar(indice){
            
            this.$set(this.ordem.orientacao,indice,this.ordem.orientacao[indice]=='desc' ? 'asc':'desc')
        },
    },
    computed:{
        timesFiltrados(){
            var times = this.timesOrdered;
            var busca = this.busca.toLowerCase();
            
            return _.filter(times,function(time){
                
                return time.nome.toLowerCase().indexOf(busca) >= 0;
            });
        },
        timesOrdered(){
            var times = _.orderBy(this.times,this.ordem.colunas,this.ordem.orientacao);
            return times;
        },
    },
    template:`
    <div>
    <input type="text" class="form-control" v-model='busca'>
    <table class="table table-striped">
    <thead>
    <tr>
    <th>Nome</th>
    
    <th v-for="(coluna, indice) in ordem.colunas">
    
    <a href="#" @click.prevent="ordenar(indice)">{{coluna | ucwords }}</a>
    
    </th>
    
    
    </tr>
    
    </thead>
    <tbody>
    <tr v-for='(time,indice) in timesFiltrados' :class="{'table-success': indice < 6, 'table-danger':indice > 15}" :style="{'font-size': indice<6?'17px':'15px'}">
    <td><clube :time='time' invertido='false'></clube></td>
    <td>{{time.pontos}}</td>
    <td>{{time.gm}}</td>
    <td>{{time.gs}}</td>
    <td>{{time.saldo}}</td>
    </tr>
    
    
    </tbody>
    </table>
    <clubes-libertadores :times='timesOrdered'></clubes-libertadores>
    <clubes-rebaixados   :times='timesOrdered'></clubes-rebaixados>
    </div>
    `
});

Vue.component('clubes-rebaixados',
{
    props:["times"],
    template:`
    <div>
    <h3>Times Rebaixados</h3>
    <ul>
    <li v-for='time in timesRebaixados'>
    <clube :time='time'></clube>
    </li>
    </ul>
    </div>
    `,
    computed:{
        timesRebaixados(){
            return this.times.slice(16,20);
        },
    }
});
Vue.component('clubes-libertadores',
{
    props:["times"],
    template:`
    <div>
    <h3>Times classificados para a libertadores 2019</h3>
    <ul>
    <li v-for='time in timesLibertadores'>
    <clube :time='time'></clube>
    </li>
    </ul>
    </div>
    `,
    computed:{
        timesLibertadores(){
            return this.times.slice(0,6);
        },
    }
});

Vue.component('placar',{
    props:['timeCasa','timeFora'],
    data(){
        return {
            golsCasa:0,
            golsFora:0
        }
    },
    methods:{
        fimJogo(){
            var golsMarcados= parseInt(this.golsCasa)
            var golsSofridos= parseInt(this.golsFora)
            this.timeCasa.fimJogo(this.timeFora,golsMarcados,golsSofridos);
            this.$emit('fim-jogo');
        },
    },
    template:`
    <form class='form-inline'>
    <input type="text" class="form-control col-md-1" v-model="golsCasa">
    <clube :time="timeCasa" invertido="true" v-if="timeCasa"></clube>
    <span>X</span>
    <clube :time="timeFora" v-if="timeFora"></clube>
    <input type="text" class="form-control col-md-1" v-model="golsFora">
    <button type="button" class="btn btn-primary col-md-12" @click="fimJogo"> Fim de Jogo</button>
    </form>
    
    `
});




Vue.component('clube',
{
    props:['time','invertido'],
    template:`
    <div style="display: flex; flex-direction:row">
    <img :style="{order: invertido =='true'?2:1}" class="escudo" :src="time.escudo" alt="">
    <span :style="{order: invertido =='true'?1:2}">{{time.nome | ucwords}}</span>
    </div>
    `
});


Vue.component('novo-jogo',
{
    inject:["timesColecao"],
    methods:{
        
        criarNovoJogo(){
            var indiceCasa = Math.floor(Math.random()*20);
            indiceFora=Math.floor(Math.random()*20);
            this.timeCasa = this.timesColecao[indiceCasa];            
            this.timeFora = this.timesColecao[indiceFora];
            
            // this.$emit("novo-jogo",{timeCasa,timeFora});
            this.$refs.modal.show();
            
            
        },
    },
    data(){
        return {
            times:this.timesColecao,
            timeCasa: null,
            timeFora: null
            
        }
    },
    template:`
    <div>
    <button class="btn btn-primary" @click='criarNovoJogo'> Novo Jogo</button>
    <placar-modal :time-casa="timeCasa" :time-fora="timeFora" ref="modal"></placar-modal>
    </div>
    `,
    
});

Vue.component("placar-modal", {
    props:['timeCasa','timeFora'],
    data(){
        return {
            golsCasa:0,
            golsFora:0
        }
    },
    methods:{
        show(){
            $("#modalExemplo").modal("show");
        },
        close(){
            $("#modalExemplo").modal("hide");
        },
        fimJogo(){
            var golsMarcados= parseInt(this.golsCasa)
            var golsSofridos= parseInt(this.golsFora)
            this.timeCasa.fimJogo(this.timeFora,golsMarcados,golsSofridos);
            this.close();
            
        },
    },
    template: `
    <div class="modal fade" id="modalExemplo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
    <div class="modal-content">
    <div class="modal-header">
    <h5 class="modal-title" id="exampleModalLabel">Novo Jogo</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
    <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
        <form class='form-inline'>
        <input type="text" class="form-control col-md-1" v-model="golsCasa">
        <clube :time="timeCasa" invertido="true" v-if="timeCasa"></clube>
        <span>X</span>
        <clube :time="timeFora" v-if="timeFora"></clube>
        <input type="text" class="form-control col-md-1" v-model="golsFora">
        </form>
    </div>
    <div class="modal-footer">
        
        <button type="button" class="btn btn-primary" @click="fimJogo"> Fim de Jogo</button>
    </div>
    </div>
    </div>
    </div>
    `
});



new Vue({
    el: '#app',
    // template:'',
    provide(){
        return {
            timesColecao:[
                new Time('palmeiras', 'assets/palmeiras_60x60.png'),
                new Time('Internacional', 'assets/internacional_60x60.png'),
                new Time('Flamengo', 'assets/flamengo_60x60.png'),
                new Time('Atlético-MG', 'assets/atletico_mg_60x60.png'),
                new Time('Santos', 'assets/santos_60x60.png'),
                new Time('Botafogo', 'assets/botafogo_60x60.png'),
                new Time('Atlético-PR', 'assets/atletico-pr_60x60.png'),
                new Time('Corinthians', 'assets/corinthians_60x60.png'),
                new Time('Grêmio', 'assets/gremio_60x60.png'),
                new Time('Fluminense', 'assets/fluminense_60x60.png'),
                new Time('Bahia', 'assets/bahia_60x60.png'),
                new Time('Chapecoense', 'assets/chapecoense_60x60.png'),
                new Time('São Paulo', 'assets/sao_paulo_60x60.png'),
                new Time('Cruzeiro', 'assets/cruzeiro_60x60.png'),
                new Time('Sport', 'assets/sport_60x60.png'),
                new Time('Ceará', 'assets/ceara_60x60.png'),
                new Time('Vitória', 'assets/vitoria_60x60.png'),
                new Time('Vasco', 'assets/vasco_60x60.png'),
                new Time('América-MG', 'assets/america_mg_60x60.png'),
                new Time('Paraná', 'assets/parana_60x60.png'),
            ]
        }
    },
    data: {
        param1:"Hello World Root",
        // times:[
        //         new Time('palmeiras', 'assets/palmeiras_60x60.png'),
        //         new Time('Internacional', 'assets/internacional_60x60.png'),
        //         new Time('Flamengo', 'assets/flamengo_60x60.png'),
        //         new Time('Atlético-MG', 'assets/atletico_mg_60x60.png'),
        //         new Time('Santos', 'assets/santos_60x60.png'),
        //         new Time('Botafogo', 'assets/botafogo_60x60.png'),
        //         new Time('Atlético-PR', 'assets/atletico-pr_60x60.png'),
        //         new Time('Corinthians', 'assets/corinthians_60x60.png'),
        //         new Time('Grêmio', 'assets/gremio_60x60.png'),
        //         new Time('Fluminense', 'assets/fluminense_60x60.png'),
        //         new Time('Bahia', 'assets/bahia_60x60.png'),
        //         new Time('Chapecoense', 'assets/chapecoense_60x60.png'),
        //         new Time('São Paulo', 'assets/sao_paulo_60x60.png'),
        //         new Time('Cruzeiro', 'assets/cruzeiro_60x60.png'),
        //         new Time('Sport', 'assets/sport_60x60.png'),
        //         new Time('Ceará', 'assets/ceara_60x60.png'),
        //         new Time('Vitória', 'assets/vitoria_60x60.png'),
        //         new Time('Vasco', 'assets/vasco_60x60.png'),
        //         new Time('América-MG', 'assets/america_mg_60x60.png'),
        //         new Time('Paraná', 'assets/parana_60x60.png'),
        //     ],
    }
});
<template>
  <div>
    <input type="text" class="form-control" v-model="busca" />
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nome</th>

          <th v-for="(coluna, indice) in ordem.colunas" v-bind:key="indice">
            <a href="#" @click.prevent="ordenar(indice)">{{coluna | ucwords }}</a>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-bind:key="indice"
          v-for="(time,indice) in timesFiltrados"
          :class="{'table-success': indice < 6, 'table-danger':indice > 15}"
          :style="{'font-size': indice<6?'17px':'15px'}"
>
          <td>
            <clube :time="time" invertido="false"></clube>
          </td>
          <td>{{time.pontos}}</td>
          <td>{{time.gm}}</td>
          <td>{{time.gs}}</td>
          <td>{{time.saldo}}</td>
        </tr>
      </tbody>
    </table>
    <clubes-libertadores :times="timesOrdered"></clubes-libertadores>
    <clubes-rebaixados :times="timesOrdered"></clubes-rebaixados>
  </div>
</template>

<script>

import _ from 'lodash';
export default {
  inject: ["timesColecao"],
  data() {
    return {
      times: this.timesColecao,
      busca: "",
      ordem: {
        colunas: ["pontos", "gm", "gs", "saldo"],
        orientacao: ["desc", "desc", "asc", "saldo"]
      }
    };
  },
  methods: {
    ordenar(indice) {
      this.$set(
        this.ordem.orientacao,
        indice,
        this.ordem.orientacao[indice] == "desc" ? "asc" : "desc"
      );
    }
  },
  computed: {
    timesFiltrados() {
      var times = this.timesOrdered;
      var busca = this.busca.toLowerCase();

      return _.filter(times, function(time) {
        return time.nome.toLowerCase().indexOf(busca) >= 0;
      });
    },
    timesOrdered() {
      var times = _.orderBy(
        this.times,
        this.ordem.colunas,
        this.ordem.orientacao
      );
      return times;
    }
  }
};
</script>

<style>
</style>
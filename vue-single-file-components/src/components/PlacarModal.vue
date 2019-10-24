<template>
  <modal ref="modal">
    <h5 class="modal-title" slot="header" id="exampleModalLabel">Novo Jogo</h5>

    <form slot="body" class="form-inline">
      <input type="text" class="form-control col-md-1" v-model="golsCasa" />
      <clube :time="timeCasa" invertido="true" v-if="timeCasa"></clube>
      <span>X</span>
      <clube :time="timeFora" v-if="timeFora"></clube>
      <input type="text" class="form-control col-md-1" v-model="golsFora" />
    </form>

    <div slot="footer">
      <button type="button" class="btn btn-primary" @click="fimJogo">Fim de Jogo</button>
    </div>
  </modal>
</template>

<script>
export default {
  props: ["timeCasa", "timeFora"],
  data() {
    return {
      golsCasa: 0,
      golsFora: 0
    };
  },
  methods: {
    showModal() {
      this.getModal().show();
    },
    closeModal() {
      this.getModal().close();
    },
    getModal() {
      return this.$refs.modal;
    },
    fimJogo() {
      var golsMarcados = parseInt(this.golsCasa);
      var golsSofridos = parseInt(this.golsFora);
      this.timeCasa.fimJogo(this.timeFora, golsMarcados, golsSofridos);
      this.closeModal();
    }
  }
};
</script>

<style>
</style>
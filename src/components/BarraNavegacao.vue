<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-info">
    <a class="navbar-brand ml-2" href="/" style="margin: 10px">Flashcards</a>
    <button class="navbar-toggler" type="button">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" >
      <BarraNavegacaoQuandoLogado v-if="usuarioestaLogado" @logout="efetuarLogout" />
      <BarraNavegacaoQuandoDeslogado v-else @login="efetuarLogin" />
    </div>
  </nav>
</template>

<script>
import BarraNavegacaoQuandoLogado from "./BarraNavegacaoQuandoLogado.vue";
import BarraNavegacaoQuandoDeslogado from "./BarraNavegacaoQuandoDeslogado.vue";

export default {
  components: {
    BarraNavegacaoQuandoLogado,
    BarraNavegacaoQuandoDeslogado,
  },
  data() {
    return {

    };
  },
  computed: {
    usuarioestaLogado () {
      return Boolean(this.$store.state.token)

    }
  },
  methods: {
    efetuarLogout () {
      this.$store.commit('DESLOGAR_USUARIO')
      this.$router.push({ name: 'login' })
    },
    
  },
};
</script>

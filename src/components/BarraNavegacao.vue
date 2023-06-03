<template>
  <nav class="navbar navbar-expand-lg navbar-bytebank">
    <a class="navbar-brand" href="#">ByteBank</a>
    <button class="navbar-toggler" type="button">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse">
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

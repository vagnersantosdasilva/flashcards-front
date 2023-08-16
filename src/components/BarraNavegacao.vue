<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top">
    <a class="navbar-brand ml-2"
       style="margin: 10px; font-family: 'Pacifico'; color:#222;"
    >
      <router-link to="/" class="nav-link" >
        Simples Flashcards
      </router-link>

    </a>
    <button class="navbar-toggler" type="button" @click="toggleMenu">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" :class="{ 'show': isMenuOpen }">
      <div v-if="usuarioestaLogado">
        <BarraNavegacaoQuandoLogado @logout="efetuarLogout" />

      </div>
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
      isMenuOpen: false
    };
  },
  computed: {
    usuarioestaLogado () {
      return Boolean(this.$store.state.token)

    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },

    efetuarLogout () {
      localStorage.removeItem("token");
      this.$store.commit('DESLOGAR_USUARIO')
      this.$router.push({ name: 'login' })
    },

  },
};
</script>


<style scoped>
  .show{
    justify-content: start;
    text-align: justify;
    //border: 1px dashed black;

    margin-left:  5px;
    padding: 1px;
    color:black
  }
</style>
<template>
  <ul class="navbar-nav mr-auto" style="margin-right: 10px">

    <li class="nav-item">
      <router-link to="/cadastro_usuario" class="nav-link">
        Inscrever-se
      </router-link>
    </li>

    <li class="nav-item">
      <router-link to="/login" class="nav-link">
        Entrar
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  methods: {
    efetuarLogin() {
      this.$emit('login'); // Emitindo o evento de login para o componente pai
    }
  }
}
</script>

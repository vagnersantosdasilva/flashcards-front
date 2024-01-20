<template>
  <ul class="navbar-nav mr-auto align-items-center justify-content-sm-start" style="margin-right: 10px">

    <li class="nav-item" >
      <router-link to="/" class="nav-link" style="color:#222">
        Inscrever-se
      </router-link>
    </li>

    <li class="nav-item">
      <router-link to="/login" class="nav-link">
        <b-button variant="success" style="width: 90px;">Entrar</b-button>
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

<template>
  <ul class="navbar-nav mr-auto" style="margin-right: 10px">
    <li class="nav-item">
      <router-link class="nav-link" to="/login">Login</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/cadastre-se" class="nav-link">
        Registre-se
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

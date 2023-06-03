<template>
  <ul class="navbar-nav mr-auto">
    <li class="nav-item">
      <router-link class="nav-link" to="/">Home</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/gerentes" class="nav-link">
        Gerentes
      </router-link>
    </li>

    <li class="nav-item">
      <router-link to="/cadastro" class="nav-link">
        Cadastrar Flashcards
      </router-link>
    </li>

    <li class="nav-item">
      <a href="#" class="nav-link" @click.prevent="efetuarLogout">Logout</a>
    </li>
  </ul>
</template>

<script>
export default {
  methods: {
    efetuarLogout() {
      this.$emit('logout'); // Emitindo o evento de logout para o componente pai
    }
  }
}
</script>

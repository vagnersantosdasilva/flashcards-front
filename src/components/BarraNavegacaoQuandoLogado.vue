<template>

  <ul class="navbar-nav mr-auto" style="margin-right: 10px">

    <li class="nav-item">
      <router-link class="nav-link" to="/">
        <box-icon name="home"  />
      </router-link>
    </li>

    <li class="nav-item">
      <router-link to="/cadastro" class="nav-link">
        <box-icon name="cog" />
      </router-link>
    </li>

    <li class="nav-item">
      <a href="#" class="nav-link" @click.prevent="efetuarLogout">
        <box-icon name="log-out" />
      </a>
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


<template>

  <ul class="navbar-nav mr-auto" style="margin-right: 10px">
    <div>
      <b-dropdown right variant="black" toggle-class="header-item">
        <template v-slot:button-content>
          <box-icon name="user"/>
        </template>
        <!-- item-->
        <b-dropdown-item class="dropdown-item">
          <router-link class="nav-link" to="/perfil" >
            <box-icon name="id-card" /> Perfil
          </router-link>
        </b-dropdown-item>

<!--        <b-dropdown-item class="dropdown-item">
          <router-link class="nav-link" to="/">
            <box-icon name="bell"/>Notificações
          </router-link>
        </b-dropdown-item>-->

        <b-dropdown-item class="dropdown-item">
          <router-link class="nav-link" to="/cadastro">
            <box-icon name="detail"/>Meus Cartões
          </router-link>
        </b-dropdown-item>

        <b-dd-divider></b-dd-divider>

        <b-dropdown-item class="dropdown-item">
          <a href="#" class="nav-link" @click.prevent="efetuarLogout">
            <box-icon name="log-out" />Sair
          </a>
        </b-dropdown-item>
      </b-dropdown>
    </div>
<!--
    <li class="nav-item">
      <router-link class="nav-link" to="/">
        <box-icon name="bell-off" />
      </router-link>
    </li>

    <li class="nav-item">
      <router-link class="nav-link" to="/">
        <box-icon name="bell" />
      </router-link>
    </li>

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
    </li>-->


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

<style scoped>
/* Reduzindo o espaço entre as linhas */
.dropdown-item {
  line-height: 1.8; /* Você pode ajustar o valor conforme necessário */
  margin-bottom: 0;
}

/* Alinhando o ícone com o texto */
.dropdown-item a {
  display: flex;
  align-items: center;
}

.dropdown-item a box-icon {
  margin-right: 4px; /* Espaçamento entre o ícone e o texto - ajuste conforme necessário */
}
</style>
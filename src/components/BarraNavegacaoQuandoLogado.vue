<template>
  <ul class="navbar-nav d-flex align-items-center justify-content-center">

    <li class="nav-item mt-2 d-none d-lg-block" v-b-tooltip.hover >
      <router-link class="nav-link" to="help">
        <box-icon name='help-circle' title="Ajuda" class="icon"></box-icon>
      </router-link>
    </li>

    <li class="nav-item mt-2 nav-link d-none d-lg-block" v-b-tooltip.hover >
      <box-icon name='fullscreen' title="Tela cheia" class="icon"></box-icon>
    </li>
    <!--
        <li class="nav-item mt-2">
          <router-link class="nav-link" to="/">
            <box-icon type='solid' name='help-circle' class="icon"></box-icon>
          </router-link>
        </li>-->

    <div class=" mt-1 avatar-menu nav-link d-none d-lg-block" v-b-tooltip.hover>
      <div class="avatar-button" @click="toggleSubMenu" title="Usuário">
        {{ initials }}
      </div>
      <div class="submenu" v-show="showSubMenu">
        <div
            class="submenu-item"
            @click="selectSubitem('perfil')"
        >
          <box-icon name="id-card" class="me-1"/>
          Perfil
        </div>
        <div
            class="submenu-item"
            @click="selectSubitem('cadastro')"
        >
          <box-icon name="detail" class="me-1"/>
          Meus Cartões
        </div>
        <div class="divider"></div> <!-- Divider -->
        <div
            class="submenu-item"
            @click.prevent="efetuarLogout"

        >
          <box-icon name="log-out" class="me-1"/>
          Sair
        </div>
      </div>
    </div>

    <!-- Subitens para dispositivos móveis -->
    <li class="nav-item mt-2 d-lg-none">
      <div class="mobile-submenu">
        <div class="mobile-submenu-item" @click="selectSubitem('ajuda')">
          <box-icon name='help-circle' class="me-1" title="Ajuda" ></box-icon>
          Ajuda
        </div>
        <div class="mobile-submenu-item" @click="fullscreen">
          <box-icon name='fullscreen' class="me-1" title="Tela cheia" ></box-icon>
          Tela Cheia
        </div>
        <div class="mobile-submenu-item" @click="selectSubitem('perfil')">
          <box-icon name="id-card" class="me-1"/>
          Perfil
        </div>
        <div class="mobile-submenu-item" @click="selectSubitem('cadastro')">
          <box-icon name="detail" class="me-1"/>
          Meus Cartões
        </div>

        <div class="mobile-submenu-item" @click.prevent="efetuarLogout">
          <box-icon name="log-out" class="me-1"/>
          Sair
        </div>
      </div>
    </li>


  </ul>

</template>

<script>
export default {

  data() {
    return {
      username: 'John Doe', // Replace with the actual username
      showSubMenu: false,
      activeSubitem: null,
    };
  },
  computed: {
    initials() {
      const username = this.$store.state.usuario.username;
      const nameParts = username.split(' ');
      return nameParts
          .map(part => part.charAt(0).toUpperCase())
          .join('');
    },
  },
  methods: {
    fullscreen(){
      
    },
    toggleSubMenu() {
      this.showSubMenu = !this.showSubMenu;
    },
    selectSubitem(subitem) {
      this.activeSubitem = subitem;
      this.showSubMenu = false;
      if (subitem === 'perfil') this.$router.push({name: 'perfil'})
      if (subitem === 'cadastro') this.$router.push({name: 'cadastro'})
      if (subitem === 'ajuda') this.$router.push({name: 'ajuda'})
      this.$emit('close-menu');
    },
    efetuarLogout() {
      this.$emit('logout'); // Emitindo o evento de logout para o componente pai
    }
  },
};
</script>

<style scoped>
.mobile-submenu{
  display: block;
  height: 100vh;

}
.mobile-submenu-item{
  display: flex;
  justify-content: start;
  height: 70px;
  column-gap: 0.1rem;
}


.icon {
  color: #284f79; /*#0d3173;  Cor do ícone */
  fill: currentColor;
}
.icon:hover {
  color: #ffffff; /*#0d3173;  Cor do ícone */
  fill: currentColor;
}

.divider {
  height: 1px;
  background-color: #ccc; /* Cor do divisor, ajuste conforme necessário */
  margin: 5px 0;
}

.avatar-menu {
  position: relative;
  display: inline-block;
}


.avatar-button {
  margin-right: 10px;
  width: 30px;
  height: 30px;
  line-height: 33px;
  text-align: center;
  border-radius: 50%;
  color: #f8f9fe;
  background-color: #284f79; /* Change this to your desired background color */
  cursor: pointer;
}


.submenu {
  position: absolute;
  top: 100%;
  right: 10px;
  background-color: #f8f9fe; /* Change this to your desired background color */
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: none;
  width: 160px;
}

.submenu-item {
  padding: 10px;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: left;
}

/*.submenu-item.active {
  background-color: #3490dc; !* Change this to your desired active background color *!
  color: #ffffff; !* Change this to your desired active text color *!
}*/

a {
  text-decoration: none;
}

.submenu-item:hover {
  background-color: #3490dc; /* Change this to your desired active background color */
  color: #ffffff; /* Change this to your desired active text color */
}

.avatar-menu:hover .submenu {
  display: block;
}
</style>
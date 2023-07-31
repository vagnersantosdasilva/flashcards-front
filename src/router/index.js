import Vue from 'vue'
import VueRouter from 'vue-router'
import Gerentes from '../views/Gerentes.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Cadastro from '../views/Cadastro.vue'
import Questao from '../views/Questao.vue'
import provedor from "../provedor";
import CadastroUsuario from "../views/CadastroUsuario.vue";
import ResetPublico from "../views/ResetPublico.vue";
import Perfil from "../views/Perfil.vue";
import ResetPrivado from "../views/ResetPrivado.vue";
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'home',
    component: Home
  },

  {
    path: '/gerentes',
    name: 'gerentes',
    component: Gerentes
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: Cadastro

  },
  {
    path: '/questao',
    name: 'questao',
    component: Questao

  },
  {
    path: '/cadastro_usuario',
    name: 'cadastroUsuario',
    component: CadastroUsuario,
    meta: {
      publica: true
    }
  },
  {
    path:'/login' ,
    name:'login',
    component: Login,
    meta: {
      publica: true
    }
  },
  {
    path:'/reset' ,
    name:'reset',
    component: ResetPublico,
    meta: {
      publica: true
    }
  },
  {
    path:'/resetPrivado',
    name:'resetPrivado',
    component: ResetPrivado,
    meta:{
      publica: false
    }
  },

  {
    path:'/perfil' ,
    name:'perfil',
    component: Perfil,

  },
]



const router = new VueRouter({
  mode: 'history',
  routes
})


router.beforeEach((routeTo, routeFrom, next) => {
  if (!routeTo.meta.publica && !provedor.state.token && localStorage.getItem('token')==null) {
    return next({
      path:'/login'
    });
  }
  next();
})

export default router

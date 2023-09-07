import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Cadastro from '../views/Cadastro.vue'
import Questao from '../views/Questao.vue'
import provedor from "../provedor";
import CadastroUsuario from "../views/CadastroUsuario.vue";
import ResetPublico from "../views/ResetPublico.vue";
import Perfil from "../views/Perfil.vue";
import ResetPrivado from "../views/ResetPrivado.vue";
import Editor from "../views/Editor.vue";

import Help from "../views/Help.vue";
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'home',
    component: Home
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

  {
    path:'/editor' ,
    name:'editor',
    meta:{
      publica: true
    },
    component: Editor,

  },
  {
    path:'/help' ,
    name:'help',
    component: Help,

  },

  {
    path:'/' ,
    name:'cadastroUsuario',
    meta:{
      publica: true
    },
    component: Editor,

  },
]



const router = new VueRouter({
  mode: 'history',
  routes
})


router.beforeEach((routeTo, routeFrom, next) => {
  if (!routeTo.meta.publica && !provedor.state.token && localStorage.getItem('token')==null) {
    return next({
      path:'/cadastro_usuario'
    });
  }
  next();
})

export default router

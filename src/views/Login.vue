<template>
  <div class="login">

    <b-container>
      <b-row class="justify-content-center">

        <b-col md="6">
          <p class="text-danger" v-if="erroAutenticacao">Ocorreu um erro ao tentar autenticar</p>
          <b-card class="shadow-lg">
            <b-card-title>Login</b-card-title>
            <b-card-body>
              <div class="text-center mb-4">

              </div>
              <form>
                <div class="form-group mt-2">
                  <b-form-input v-model="usuario.email" placeholder="Email " class="form-control-lg"></b-form-input>
                </div>
                <div class="form-group mt-2">
                  <b-form-input v-model="usuario.password" type="password" placeholder="Senha" class="form-control-lg"></b-form-input>
                </div>
                <div class="form-group mt-2 ">
                  <b-button variant="primary" block size="lg" class="w-100 mb-2" @click="login">Entrar</b-button>
                </div>
                <div class="text-center">
                  <b-button variant="success" size="lg" class="w-100">Cadastrar</b-button>
                </div>
              </form>
              <hr>
              <div class="d-flex justify-content-sm-end">
                <a href="#" class="text-primary">Esqueceu a senha?</a>
              </div>
              <b-row class="d-flex justify-content-center w-100">
                <b-row class="d-flex justify-content-center w-50">
                  <b-col >
                    <b-row class="d-flex justify-content-end">
                      <b-button variant="outline-primary " class="w-75 mt-4">
                        <b-icon icon="facebook"></b-icon>
                      </b-button>
                    </b-row>

                  </b-col>
                  <b-col>
                    <b-row class="d-flex justify-content-center">
                      <b-button variant="outline-primary" class="w-75 mt-4">
                        <b-icon icon="Google"></b-icon>
                      </b-button>
                    </b-row>
                  </b-col>
                  <b-col>
                    <b-row class="d-flex justify-content-start">
                      <b-button variant="outline-primary" class="w-75 mt-4">
                        <b-icon icon="twitter"></b-icon>
                      </b-button>
                    </b-row>
                  </b-col>
                </b-row>
              </b-row>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

//import http from '@/http'
//import axios from 'axios'
export default {
  data() {
    return {
      email: '',
      password: '',
      acessToken:null,
      refleshToken:null,
      erroAutenticacao:false,
      usuario:{
        email:null,
        password:null,
      }
    };
  },
  methods: {
    async login() {
      this.$store.dispatch('efetuarLogin', this.usuario)
          .then( () => {
             this.getUserInfo()
          })
          .catch((error)=>{
            console.log(error);
            this.erroAutenticacao = true;
          })
    },

    async getUserInfo() {
      try {
        const config = {
          params: {
            email: this.usuario.email
          }
        };
        const response = await this.$http.get('api/userinfo', config);
        const token = this.$store.state.token
        const refreshToken = this.$store.state.refreshToken
        if (response.data.id) {
          this.$store.commit('DEFINIR_USUARIO_LOGADO',{
            token:token,
            refreshToken:refreshToken,
            usuario: response.data
          })
          this.$router.push({ name: 'home'})
        }
      } catch (erro) {
        console.log(erro)
      }
    }
  },
  watch:{
  /*  usernameResponse:function (novo){
      if (novo) {
        this.getUserInfo();
        this.$router.push('/')
      }
    }*/
  }
};
</script>

<style scoped>
.login {
  margin: 100px auto;
}

.logo {
  width: 150px;
}

.form-control-lg {
  padding: 18px;
  font-size: 16px;
}

.text-primary {
  color: #4267B2;
}

.b-card {
  border: none;
}

.b-card-body {
  padding: 2rem;
}
</style>
plate>
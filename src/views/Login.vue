<template>
  <div class="login">
    <section class="bemvindo ">
      <div class="container">
        <div class="row justify-content-center mt-4">
          <div class="col-md-6" >
            <div class="login-content">
              <h3>Bem-vindo ao Simples Flashcards!</h3>
              <p>
                Estamos muito felizes em disponibilizar a primeira versão
                dessa ferramenta que acredimos que será muito útil no
                dia a dia de qualquer estudante.
              </p>
              <p>
                Aqui você terá a opção de estudar de forma eficaz e aprimorar sua retenção de
                conhecimento com a testada e aprovada técnica de repetição espaçada.
              </p>
              <p>
                Crie seus próprios flashcards com perguntas e respostas
                personalizadas e melhore sua aprendizagem.
              </p>
            </div>
          </div>

          <div class="col-md-6" >
            <p class="text-danger" v-if="erroAutenticacao">Ocorreu um erro ao tentar autenticar</p>
            <b-card class="shadow-lg">
              <b-card-title style="color:#182c59;">Login</b-card-title>
              <b-card-body>
                <div class="text-center mb-4">

                </div>
                <form>
                  <div class="form-group mt-2">
                    <b-form-input v-model="usuario.email" placeholder="Email " class="form-control-lg"></b-form-input>
                  </div>
                  <div class="form-group mt-2">
                    <b-form-input v-model="usuario.password" type="password" placeholder="Senha"
                                  class="form-control-lg"></b-form-input>
                  </div>
                  <div class="form-group mt-2 ">
                    <b-button variant="primary" block size="lg" class="w-100 mb-2" @click="login">Entrar</b-button>
                  </div>
                  <div class="text-center">
                    <b-button variant="success" size="lg" class="w-100" @click="cadastrar">Inscrever-se</b-button>
                  </div>
                </form>
                <hr>
                <router-link to="reset">
                  <div class="d-flex justify-content-sm-end">
                    <a href="" class="text-primary">Esqueceu a senha?</a>
                  </div>
                </router-link>

              </b-card-body>
            </b-card>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script>

//import http from '@/http'
//import axios from 'axios'
//import cadastroUsuario from "./CadastroUsuario.vue";

//import axios from "axios";

export default {
  components: {},
  data() {
    return {
      email: '',
      password: '',
      acessToken: null,
      refleshToken: null,
      erroAutenticacao: false,
      usuario: {
        email: null,
        password: null,
      }
    };
  },
  methods: {
    async login() {
      this.$store.dispatch('efetuarLogin', this.usuario)
          .then(() => {
            //this.getUserInfo()
            this.$router.push({name: 'home'})
          })
          .catch((error) => {
            console.log(error);
            this.erroAutenticacao = true;
          })
    },

    cadastrar() {
      this.$router.push({name: 'cadastroUsuario'})
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
          this.$store.commit('DEFINIR_USUARIO_LOGADO', {
            token: token,
            refreshToken: refreshToken,
            usuario: response.data
          })
          this.$router.push({name: 'home'})
        }
      } catch (erro) {
        console.log(erro)
      }
    },

    async loginWithGoogle() {

      this.$http.get(`/login/google`).then((response) => {
        console.log(response);
      })
    }

  },
  watch: {
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



img {

  max-width: 100%;
}
p{
  font-family: 'Open Sans', sans-serif;
  color: #284f79;

}
h3{
  font-family: 'Open Sans', sans-serif;
  color: #284f79;
}

.btn {
  border-radius: 0;
}

input {
  border-radius: 0;
}

section {
  padding: 65px;
  height: 100vh;
}

section p{
  text-align: justify;
}

.bemvindo {
  background-image: linear-gradient(to bottom, #79D4F6, #AAE3F9);
  padding-bottom: 200px;
  padding-top: 200px;
  height: 100vh;
}

.bemvindo p {
  margin-right: 5px;
}
.login {

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
  background-color: #f8f9fa; /* Fundo suave */
  border: none;
}

.b-card-body {
  padding: 2rem;
  color: #343a40; /* Texto preto ou cinza escuro */
}

.bg-info {
  background-color: #17a2b8;
}

.has-cards-inverse {
  overflow: hidden;
  padding-top: 0px;

  position: relative;
  background: transparent;
  pointer-events: none;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 400px;
    height: 500px;
    background:#FDFDFE;
    transform: skew(0,8deg);
  }

  .container {
    pointer-events: auto;
    position: relative;
  }
}
.has-cards {
  overflow: hidden;
  padding-top: 100px;
  padding-bottom: 200px ;
  position: relative;
  background: transparent;
  pointer-events: none;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 600px;
    height: 1000px;
    background:whitesmoke;
    transform: skew(0,-8deg);
  }

  .container {
    pointer-events: auto;
    position: relative;
  }
}

@media screen and (max-width: 960px) {
  section{
    padding: 10px;
  }
  section p{
    text-align: justify;
  }

}

</style>

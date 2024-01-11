<template>
  <div class="login">
    <section class="bemvindo d-flex flex-column align-items-center justify-content-center">
      <div class="container">
        <div class="row justify-content-center mt-4">
          <div class="col-md-6" >
            <div class="login-content">
              <h3>Bem-vindo ao Memo Beam!</h3>
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
              <b-card-title class="custom-title">Seja bem vindo(a) de volta!</b-card-title>
              <b-card-body>
                <div class="text-center mb-1">

                </div>
                <form>
                  <b-row  class="d-flex justify-content-between">
                    <b-col class="col-12 d-flex justify-content-center align-content-center ">
                      <b-button
                          style="border-color:#c5d4e3;"
                          variant="transparent"
                          class="cutom-button mt-1 mb-1 d-flex justify-content-center align-content-center"
                          @click="loginGoogle"
                      >
                        <b-row class="col-12 d-flex justify-content-start">
                          <b-col class="col-lg-2 col-2">
                              <img class="me-0 mt-1" src="../assets/google2.jpg" height="22" width="22"/>
<!--                            <span
                                class="fa-brands fa-google  "
                                style="color:cornflowerblue; cursor:pointer;font-size: 21px; margin: 3px; margin-right: 3px;" >
                            </span>-->
                          </b-col>
                          <b-col class="col-lg-8 col-10">
                            <p class="mt-1 d-flex justify-content-center" ><strong>Entrar com o Google</strong></p>
                          </b-col>
                          <b-col class="col-lg-2 col-2"></b-col>
                        </b-row>

                      </b-button>

                    </b-col>
                    <b-col class="col-12 d-flex justify-content-center align-content-center ">
                      <b-button
                          style="border-color:#c5d4e3;"
                          variant="transparent"
                          class="custom-button  d-flex justify-content-center align-content-center"
                          @click="loginWithGithub"
                      >
                        <b-row class="d-flex col-12 justify-content-center">
                          <b-col class="col-2 col-lg-2">
                             <span
                                 class="fa-brands fa-github "
                                 style="color:black;">
                             </span>
                          </b-col>
                          <b-col class="col-lg-8 col-10">
                            <p class="mt-1 d-flex justify-content-center" ><strong>Entrar com o GitHub</strong></p>
                          </b-col>
                          <b-col class="col-lg-2 col-2"></b-col>
                        </b-row>

                      </b-button>

                    </b-col>
                    <b-col class="col-12 d-flex justify-content-center  ">
                      <b-button
                          style="border-color:#c5d4e3;"
                          variant="transparent"
                          class="custom-button mt-1 d-flex justify-content-center align-content-center"
                          @click="loginWithFacebook"
                      >
                        <b-row class="d-flex col-12 justify-content-center">
                          <b-col class="col-2 col-lg-2">
                             <span
                                 class="fa-brands fa-facebook-square "
                                 style="color:blue;">
                             </span>
                          </b-col>
                          <b-col class="col-lg-8 col-10">
                            <p class="mt-1 d-flex justify-content-center" ><strong>Entrar com o Facebook</strong></p>
                          </b-col>
                          <b-col class="col-lg-2 col-2"></b-col>
                        </b-row>

                      </b-button>

                    </b-col>

                  </b-row>

                  <b-form-group
                      class="form-group mt-3"
                  >
                    <b-row class="d-flex justify-content-center col-12 ms-0 mb-1" >
                      <b-col><b-row style="margin-top: 12px;"><hr/></b-row></b-col>
                      <b-col class=" col-1 d-flex justify-content-center">
                        <b-row><p><strong>ou</strong></p></b-row>
                      </b-col>
                      <b-col><b-row style="margin-top: 12px;"><hr/></b-row></b-col>

                    </b-row>
                  </b-form-group>
                  <div class="form-group mt-0">
                    <b-form-input v-model="usuario.email" placeholder="Email " class="form-control-lg"></b-form-input>
                  </div>
                  <div class="form-group mt-2">
                    <b-input-group>
                      <b-form-input v-model="usuario.password" :type="passwordInputType" placeholder="Senha"
                                    class="form-control-lg"></b-form-input>
                      <b-input-group-append>
                        <b-input-group-text
                            @mousedown="changeInputType('text')"
                            @mouseup="changeInputType('password')"
                            style="height: 100%;border-radius: 0">
                          <i
                              :class="
                                passwordInputType === 'password'
                                  ? 'far fa-eye'
                                  : 'far fa-eye-slash'
                              "
                          ></i>
                        </b-input-group-text>
                      </b-input-group-append>
                    </b-input-group>

                  </div>
                  <div class="form-group mt-2 ">
                    <b-button variant="primary" block size="lg" class="w-100 mb-1" @click="login"><strong>Entrar</strong></b-button>
                  </div>
  <!--                  <div class="text-center">
                      <b-button variant="transparent" size="lg" class="w-100" @click="cadastrar">Ainda não tem cadastro ?</b-button>
                    </div>-->

                  <hr class="mt-1">
                  <b-row class="d-flex  justify-content-center">
                    <b-col>
                      <router-link to="/">
                        <div class="d-flex justify-content-sm-start">
                          <a href="" class="text-primary ">Não tenho cadastro</a>
                        </div>
                      </router-link>
                    </b-col>
                    <b-col>
                      <router-link to="reset">
                        <div class="d-flex justify-content-sm-end">
                          <a href="" class="text-primary">Esqueci a senha</a>
                        </div>
                      </router-link>
                    </b-col>
                  </b-row>

                </form>



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
      },
      passwordInputType: 'password',
    };
  },
  methods: {
    async login() {
      this.$store.dispatch('efetuarLogin', this.usuario)
          .then(() => {
            //this.getUserInfo()
            this.$router.push({name: 'home'})
          })
          .catch(() => {
            this.erroAutenticacao = true;
          })
    },

    cadastrar() {
      this.$router.push({name: 'cadastroUsuario'})
    },

    changeInputType(type) {
      this.passwordInputType = type;
    },

    loginWithFacebook() {
      const facebookAuthorizationUrl = 'http://localhost:8082/oauth2/authorization/facebook';
      window.location.href = facebookAuthorizationUrl;
    },

    loginGoogle() {
      const googleAuthorizationUrl = 'http://localhost:8082/oauth2/authorization/google';
      window.location.href = googleAuthorizationUrl;
    },

    loginWithGithub() {
      const githubAuthorizationUrl = 'http://localhost:8082/oauth2/authorization/github';
      window.location.href = githubAuthorizationUrl;
    }

  },

};
</script>

<style scoped>
.custom-title {
  color: #1e5f9b;
  margin-left: 15px;
  margin-top: 10px;
}

.custom-button {
  border-color: #c5d4e3;
}

.custom-button span {
  font-size: 21px;
  margin: 3px;
  margin-right: 3px;
}

.text-primary {
  color: #4267B2;
}

.b-card {
  background-color: #f8f9fa;
  border: none;
}

.b-card-body {
  padding: 2rem;
  color: #343a40;
}
.col{
  border: 0px dashed black;
}
.row{
  border: 0px dashed red;
}
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
  width: 100%;
  height: 40px;
  border-radius: 0;
  border-radius: 0;
  font-family: Google Sans,arial,sans-serif;
  font-size: 14px;
  border-color:#c5d4e3;
}

input {
  border-radius: 0;
  border-color:#c5d4e3;
}

section {
  padding: 65px;
  min-height: 100vh;
}

section p{
  text-align: justify;
}

.bemvindo {
  background-image: linear-gradient(to bottom, #79D4F6, #AAE3F9);
  padding-top: 135px;
  padding-bottom: 120px;
  min-height: 100vh;
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
  padding: 10px;
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
    padding: 1px;
  }
  section p{
    text-align: justify;
  }

  section h1,h2,h3,h4,h5{
    text-align: center;
  }

  .bemvindo {
    background-image: linear-gradient(to bottom, #79D4F6, #AAE3F9);
    padding-bottom: 800px;
    padding-top: 100px;
    min-height: 100vh;
  }



}

</style>

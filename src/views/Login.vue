<template>
  <div class="login">
    <section class="bemvindo d-flex flex-column align-items-center justify-content-center">
      <div class="container">
        <div class="row justify-content-center mt-4">
          <div class="col-lg-6 col-12" >
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

          <div class="col-lg-6 col-12 d-flex aling-column justify-content-center align-content-center" >
            
            <b-card class="shadow-lg" style="max-width: 400px;">
              <b-card-title class="custom-title">Seja bem vindo(a) de volta!</b-card-title>
              <b-card-title class="custom-title text-danger d-flex justify-content-start" v-if="erroAutenticacao" >
                  <strong>Ocorreu um erro ao tentar autenticar</strong>
              </b-card-title>
              <b-card-body>
                <div class="text-center mb-1">

                </div>
                <form>
                  
                  <b-form-group
                      class="form-group mt-0"
                  >
                   
                  </b-form-group>
                  <b-form-group 
                    style="font-weight: bold;font-size: 10px;color:black;font-family:'Open Sans', sans-serif;"
                  >
                    <label style="font-weight: bold; font-size: 13px; color: black; font-family: 'Open Sans', sans-serif;">E-MAIL</label>
                    <b-form-input 
                      style="font-family:'Open Sans', sans-serif; font-size: 13px;"
                      v-model="usuario.email" 
                      placeholder="nome@email.com" 
                      class="form-control-lg"
                      :disabled="estaCarregando"
                    >
                    </b-form-input>

                  </b-form-group>
                  <b-form-group class="mt-2">
                    <label style="font-weight: bold; font-size: 13px; color: black; font-family: 'Open Sans', sans-serif;">SENHA</label>
                    <b-input-group>
                      <b-form-input
                        style="font-family:'Open Sans', sans-serif; font-size: 13px;"
                        v-model="usuario.password" 
                        :type="passwordInputType" 
                        placeholder="Insira sua senha"
                        class="form-control-lg"
                        :disabled="estaCarregando"
                        >
                      </b-form-input>
                      <b-input-group-append>
                        <b-input-group-text
                            @mousedown="changeInputType('text')"
                            @mouseup="changeInputType('password')"
                            style="height: 100%;border-radius: 0">
                          <i
                              :class="
                                passwordInputType === 'password'
                                  ? 'far fa-eye-slash'
                                  : 'far fa-eye'
                              "
                          ></i>
                        </b-input-group-text>
                      </b-input-group-append>
                    </b-input-group>
                    <b-row class="d-flex justify-content-start">
                      <div>
                      <router-link to="reset">
                        <div class="d-flex justify-content-sm-start mt-1" 
                          style="font-size: 12px;">
                          <a href="" class="text-primary">Esqueceu a senha?</a>
                        </div>
                      </router-link>
                    </div>

                    </b-row>

                  </b-form-group>
                  <div class="form-group mt-3 ">
                    <b-button 
                      variant="primary" 
                      block size="lg" 
                      class="w-100 " 
                      @click="login"
                      :disabled="estaCarregando"
                    >
                      <strong>Entrar</strong> 
                      <i class="ms-2 fas fa-spinner fa-pulse fa-3x"
                            v-show="estaCarregando"
                            style="font-size: 12px"
                      />
                    </b-button>
                  </div>
                  <b-row class="mt-3 d-flex justify-content-center col-12 ms-0 " >
                      <b-col>
                        <b-row style="margin-top: 12px;"><hr/></b-row>
                      </b-col>
                      <b-col class=" col-1 d-flex justify-content-center">
                        <b-row class="text-secondary">ou</b-row>
                      </b-col>
                      <b-col><b-row style="margin-top: 12px;"><hr/></b-row></b-col>

                  </b-row>

                  <b-row  class="d-flex justify-content-between mt-1">
                    <b-col class="col-12 d-flex justify-content-center align-content-center ">
                      <b-button
                          style="border-color:#c5d4e3;"
                          variant="transparent"
                          class="custom-button-google mt-1 d-flex justify-content-center align-content-center"
                          @click="loginGoogle"
                      >
                        <b-row class="col-12 d-flex justify-content-start">
                          <b-col class="col-1">
                            
                              <span class="fa-brands fa-google  "></span>
                            
                              <!-- <img class="me-0 mt-1" src="../assets/google.png" height="22" width="22"/>-->
                           
                          </b-col>
                          <b-col class="col-10">
                            <div class="mt-1  d-flex justify-content-center" >
                              <strong>Entrar com o Google</strong>
                            </div>
                          </b-col>
                          <b-col class="col-1">
                            
                          </b-col>
                        </b-row>

                      </b-button>

                    </b-col>
                 
                    <b-col class="col-12 d-flex justify-content-center  ">
                      <b-button
                          style="border-color:#c5d4e3;"
                          variant="transparent"
                          class="custom-button-facebook mt-2 d-flex justify-content-center align-content-center"
                          @click="loginWithFacebook"
                      >
                        <b-row class="d-flex col-12 justify-content-center">
                          <b-col class="col-1 ">
                             <span
                                 class="fa-brands fa-facebook-square "
                                 >
                             </span>
                          </b-col>
                          <b-col class="col-10">
                            <div class="mt-1  d-flex justify-content-center" >
                              <strong>Entrar com o Facebook</strong>
                            </div>
                          </b-col>
                          <b-col class=" col-1"></b-col>
                        </b-row>

                      </b-button>

                    </b-col>

                  </b-row>

                  
                  <b-row class="d-flex  justify-content-center mt-4">
                    <b-col>
                      <div 
                        class="d-flex justify-content-sm-center" 
                        style="font-size: 12px;"
                        >
                      <div class="text-secondary">Ainda não tem cadastro? </div>
                        <router-link to="/">
                            <a href="" class="text-primary ms-2">Criar uma conta</a>
                        </router-link>
                      </div>
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
import envVars from '../../env.js';



export default {
  
  components: {},
  data() {
    return {
      estaCarregando : false,
      baseURL : envVars.BASE_URL,
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
      this.estaCarregando = true;
      this.$store.dispatch('efetuarLogin', this.usuario)
          .then(() => {
            //this.getUserInfo()
            this.estaCarregando = false;
            this.$router.push({name: 'home'})
          })
          .catch(() => {
            this.erroAutenticacao = true;
            this.estaCarregando = false;
          })
    },

    cadastrar() {
      this.$router.push({name: 'cadastroUsuario'})
    },

    changeInputType(type) {
      this.passwordInputType = type;
    },

    loginWithFacebook() {
      this.estaCarregando = true;
      const facebookAuthorizationUrl = `${this.baseURL}/oauth2/authorization/facebook`;
      window.location.href = facebookAuthorizationUrl;
    },

    loginGoogle() {
      this.estaCarregando = true;
      const googleAuthorizationUrl = `${this.baseURL}/oauth2/authorization/google`;
      window.location.href = googleAuthorizationUrl;
    },

    loginWithGithub() {
      this.estaCarregando = true;
      const githubAuthorizationUrl = `${this.baseURL}/oauth2/authorization/github`;
      window.location.href = githubAuthorizationUrl;
    }

  },

};
</script>

<style scoped>
a {
    text-decoration: none;
}
.custom-title {
  /*color: #1e5f9b;*/
  color: black;
  margin-left: 15px;
  margin-top: 10px;
}
.custom-button-google{
  color:#212529;
  border: 1px solid #ced4da;
}
.custom-button-facebook{
  color:#212529;
  border: 1px solid #ced4da;
}
.custom-button-google span{
  color:rgb(241, 39, 83);
  font-size: 18px;
  margin: 3px; 
  margin-right: 3px;
}

.custom-button-facebook span{
  color:rgb(42, 39, 241);
  font-size: 20px;
  margin: 3px; 
  margin-right: 3px;
  
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
  height: 40px;
}

section {
  padding: 65px;
  min-height: 100vh;
}

section p{
  text-align: justify;
  font-family: 'Open Sans', sans-serif;
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

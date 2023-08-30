<template>
  <div class="main">
    <section class="bemvindo d-flex flex-column align-items-center justify-content-center" id="inicio">
      <div class="container">
        <div class="row d-flex justify-content-center" v-if="cadastroFinalizado">
          <div class="col-md-6">
            <div class="login-content">
              <h3 class="text-sm-center text-md-start">Obrigado por se cadastrar!</h3>
              <p class="d-flex justify-content-start" style="color: green">
                <strong>Enviamos um link de ativação para o seu e-mail.</strong></p>
              <p class="d-flex justify-content-start">
                Para concluir o processo, por favor, verifique sua caixa de entrada e clique no link de ativação.
                Assim, seu cadastro será efetivado com sucesso.
              </p>
            </div>
          </div>

          <div class="col-md-6">
            <p class="text-danger" v-if="erroCadastro"><strong>{{ erro }}</strong></p>
            <b-card class=" shadow-lg" style="background-color: #dfe0e3">
              <b-card-title>Inscrição</b-card-title>
              <b-card-body>
                <form>
                  <b-form-group
                      class="form-group mt-2"
                      label="Email:"
                      :invalid-feedback="errors.username"
                      :state="errors.state.username"
                      disabled

                  >
                    <b-form-input
                        v-model="usuario.username"
                        autocomplete="false"
                        placeholder="Email"
                        class="form-control-lg"
                        required
                        type="email"
                        disabled
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                      class="form-group mt-2"
                      label="Escolha uma senha:"
                      :invalid-feedback="errors.password"
                      :state="errors.state.password"
                      disabled
                  >
                    <b-input-group>
                      <b-form-input
                          v-model="usuario.password"
                          autocomplete="false"
                          :type="passwordInputType"
                          placeholder="Senha"
                          class="form-control-lg"
                          disabled

                      ></b-form-input>
                      <b-input-group-append>
                        <b-input-group-text
                            @mousedown="changeInputType('text')"
                            @mouseup="changeInputType('password')"
                            disabled
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
                  </b-form-group>

                  <b-form-group
                      class="form-group mt-2"
                      label="Confirmar senha:"
                      :invalid-feedback="errors.confirmPassword"
                      :state="errors.state.confirmPassword"
                      disabled
                  >
                    <b-input-group>
                      <b-form-input
                          v-model="usuario.confirmPassword"
                          autocomplete="false"
                          :type="passwordInputType"
                          placeholder="Confirme a senha"
                          class="form-control-lg"
                          disabled

                          :state="errors.state.confirmPassword"
                          trim
                      ></b-form-input>
                      <b-input-group-append>
                        <b-input-group-text
                            @mousedown="changeInputType('text')"
                            @mouseup="changeInputType('password')"
                            disabled
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
                  </b-form-group>

                  <b-row class="d-flex justify-content-start col-12 ms-0 mt-3">
                    <b-button variant="primary" @click="cadastrar" disabled>
                      Cadastrar
                      <i class="fas fa-hourglass fa-spin fa-3x"
                         v-show="estaCarregando"
                         style="font-size: 12px"
                      />
                    </b-button>
                  </b-row>
                </form>
              </b-card-body>
            </b-card>
          </div>



        </div>
        <div class="row d-flex justify-content-center mt-4" v-else>
          <div class="col-md-6">
            <div class="login-content">
              <h3 class="text-sm-center text-md-start">Bem-vindo ao MemoBeam!</h3>
              <p>
                Você está prestes a entrar em um mundo de possibilidades educacionais.
                Não perca a oportunidade de fazer parte desta jornada de aprendizado única.
              </p>
              <p>
                Ao se inscrever, você terá acesso a uma plataforma poderosa, projetada
                para melhorar seu aprendizado de forma significativa, usando flashcards
                combinados com a técnica de repetição espaçada
              </p>
              <p>
                Explore recursos exclusivos que vão ajudar você a dominar novos tópicos,
                reforçar conceitos importantes e expandir seus horizontes acadêmicos.
              </p>
              <p>
                Chegou a hora de dar um passo adiante em direção ao sucesso educacional.
                Cadastre-se agora e comece sua jornada de aprendizado com os MemoBeam!
              </p>
            </div>
          </div>

          <div class="col-md-6">
            <p class="text-danger" v-if="erroCadastro"><strong>{{ erro }}</strong></p>
            <b-card class=" shadow-lg">
              <b-card-title>Inscrição</b-card-title>
              <b-card-body>
                <form>
                  <b-form-group
                      class="form-group mt-2"
                      label="Email:"
                      :invalid-feedback="errors.username"
                      :state="errors.state.username"

                  >
                    <b-form-input
                        v-model="usuario.username"
                        autocomplete="false"
                        placeholder="Email"
                        class="form-control-lg"
                        required
                        type="email"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                      class="form-group mt-2"
                      label="Escolha uma senha:"
                      :invalid-feedback="errors.password"
                      :state="errors.state.password"
                  >
                    <b-input-group>
                      <b-form-input
                          v-model="usuario.password"
                          autocomplete="false"
                          :type="passwordInputType"
                          placeholder="Senha"
                          class="form-control-lg"

                      ></b-form-input>
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
                  </b-form-group>

                  <b-form-group
                      class="form-group mt-2"
                      label="Confirmar senha:"
                      :invalid-feedback="errors.confirmPassword"
                      :state="errors.state.confirmPassword"
                  >
                    <b-input-group>
                      <b-form-input
                          v-model="usuario.confirmPassword"
                          autocomplete="false"
                          :type="passwordInputType"
                          placeholder="Confirme a senha"
                          class="form-control-lg"

                          :state="errors.state.confirmPassword"
                          trim
                      ></b-form-input>
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
                  </b-form-group>

                  <b-row class="d-flex justify-content-start col-12 ms-0 mt-3">
                    <b-button variant="primary" @click="cadastrar" :disabled="estaCarregando">
                      Cadastrar
                      <i class="fas fa-hourglass fa-spin fa-3x"
                         v-show="estaCarregando"
                         style="font-size: 12px"
                      />
                    </b-button>
                  </b-row>
                </form>
              </b-card-body>
            </b-card>
          </div>
        </div>
      </div>
    </section>

    <section class="d-flex flex-column justify-content-center align-items-center has-cards" style="background: white">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6" align-self="center">
            <img src="../assets/annie-spratt-4-4WPFLVhAY-unsplash.jpg" height="427" width="640"
                 style="margin-top: 30px"
                 class="shadow-lg"
            />
          </div>
          <div class="col-md-6" style="margin-top: 20px">
            <h3 class="text-sm-center text-md-start mt-4">Por que usar a técnica de repetição espaçada?</h3>
            <p>
              Estudos científicos comprovam que a repetição espaçada é uma das estratégias mais eficientes para
              melhorar a retenção de conhecimento a longo prazo. Essa técnica se baseia em revisar o conteúdo em
              intervalos específicos, aproveitando o efeito de espaçamento entre as revisões para fortalecer a
              memória e evitar o esquecimento.
            </p>
            <p>
              A repetição espaçada é utilizada por estudantes, profissionais e pesquisadores para otimizar a
              aprendizagem e a memorização de informações importantes, tornando-se uma aliada indispensável no
              processo de estudo.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="d-flex flex-column justify-content-center align-items-center has-cards-inverse"
             style="background-color: whitesmoke">
      <div class="container">
        <div class="row justify-content-center">

          <div class="col-md-6">
            <h3 class="text-sm-center text-md-start mt-4">Como funciona o método de repetição espaçada?</h3>
            <p>
              O algoritmo de repetição espaçada baseia-se em seis etapas de conhecimento, onde cada questão
              presente na revisão é associada a uma dessas etapas.
              Cada vez que um item é revisado corretamente, ele avança para o próximo nível, ou seja, a próxima etapa. O
              processo funciona da seguinte maneira:
            </p>
            <p>
              Se você responder corretamente, a questão será movida para a próxima etapa e será apresentada novamente
              para revisão após um intervalo de 4 a 180 dias (dependendo da nova etapa).
              Por outro lado, se você errar, a questão voltará algumas etapas e será apresentada novamente no dia
              seguinte.
            </p>
            <p>
              Esse método garante que as perguntas mais fáceis para você sejam movidas para uma etapa mais avançada e,
              consequentemente, sejam revisadas com menos frequência.
              Enquanto isso, as perguntas que você tem mais dificuldade serão revisadas com maior regularidade até que
              você as aprenda bem.
            </p>

          </div>
        </div>
      </div>
    </section>

    <section class="d-flex flex-column justify-content-center align-items-center " style="background-color: white ;">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <h3 class="text-sm-center text-md-start">Crie seus próprios flashcards personalizados</h3>
            <p>
              Com o MemoBeam, você tem total liberdade para criar seus próprios flashcards personalizados,
              focando nos tópicos relevantes e desafiando sua memória de forma específica, potencializando sua
              aprendizagem.
            </p>
            <p>
              Aprenda novos idiomas, estude para provas ou retenha informações importantes com eficiência, usando os
              flashcards personalizados adaptados
              ao seu ritmo de estudo e necessidades específicas. Simplifique sua jornada de aprendizado com nossos
              cartões de memória simples e eficazes.</p>
          </div>

          <div class="col-md-6" align-self="center">
            <div class="row justify-content-center mt-4">
              <div class="col-12">
                <div class="row d-flex justify-content-center">
                  <div id="carousel-1" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                      <!--                      <div class="carousel-item active">
                                              <img src="../assets/s-1-1.png" class="d-block w-100 tilted-slide" alt="Slide 1">
                                            </div>
                                            <div class="carousel-item">
                                              <img src="../assets/s-2-1.png" class="d-block w-100 tilted-slide" alt="Slide 2">
                                            </div>
                                            <div class="carousel-item">
                                              <img src="../assets/s-1.png" class="d-block w-100 tilted-slide" alt="Slide 3">
                                            </div>-->
                      <div class="carousel-item active">
                        <img src="../assets/s-4-1.png" class="d-block w-100 tilted-slide" alt="Slide 1">
                      </div>
                    </div>
                    <a class="carousel-control-prev" href="#carousel-1" role="button" data-bs-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carousel-1" role="button" data-bs-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Next</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>

    <section
        class="d-flex flex-column justify-content-center align-items-center"
        style="background: whitesmoke;">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <h3 class="text-md-start text-sm-center ">Comece a criar seus flashcards!</h3>
            <p style="font-family:Open Sans">
              Não perca tempo! Cadastre-se gratuitamente e desbloqueie todo o potencial da técnica de repetição
              espaçada. Aumente sua retenção de conhecimento e alcance melhores resultados nos seus estudos,
              atividades acadêmicas ou profissionais.
            </p>
          </div>

          <div
              class="col d-flex flex-column justify-content-center align-items-center"
          >
            <b-button
                @click="scrollToSection('inicio')"
                variant="primary"
                style="height: 80px; width:350px ;border-radius: 0 "> Inscreva-se Gratuitamente!
            </b-button>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script>
export default {
  computed: {

    erro() {
      if (this.erroResponse.response && this.erroResponse.response.data && this.erroResponse.response.data.message) {
        return this.erroResponse.response.data.message
      }
      if (this.erroResponse.response && this.erroResponse.response.message)
        return this.erroResponse.response.message

      return "Um erro ocorreu ao tentar cadastrar! Tente mais tarde."
    }
  },

  data() {
    return {
      erroCadastro: false,
      showDismissibleAlert: false,
      messageError: false,
      usuario: {
        username: null,
        password: null,
        confirmPassword: null,
      },

      errors: {
        username: null,
        password: null,
        confirmPassword: null,

        state: {
          username: null,
          password: null,
          confirmPassword: null,
        }
      },
      passwordInputType: 'password',
      erroResponse: {},
      cadastroFinalizado: false,
      estaCarregando: false,

    };
  },

  methods: {
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        // Usando um efeito de rolagem suave
        window.scrollTo({
          behavior: 'smooth',
          top: element.offsetTop,
        });
      }
    },

    changeInputType(type) {
      this.passwordInputType = type;
    },

    validar() {
      let isValid = true;

      if (this.usuario.password !== this.usuario.confirmPassword) {
        this.errors.confirmPassword = 'Campo senha e confirmação de senha devem ser iguais!';
        this.errors.state.confirmPassword = false;
        isValid = false;
      }

      if (this.usuario.password == null || (this.usuario.password && this.usuario.password.length < 6)) {
        this.errors.password = 'Campo senha deve possuir pelo menos 6 caracteres!';
        this.errors.state.password = false;
        isValid = false;
      }

      if (this.usuario.confirmPassword == null || (this.usuario.confirmPassword && this.usuario.confirmPassword.length == 0)) {
        this.errors.confirmPassword = 'Confirmação de senha é obrigatória!';
        this.errors.state.confirmPassword = false;
        isValid = false;
      }

      if (this.usuario.username == null || (this.usuario.username && this.usuario.username.length == 0)) {
        this.errors.username = 'Email é obrigatório';
        this.errors.state.username = false;
        isValid = false;
      }

      if (!this.isValidEmail(this.usuario.username)) isValid = false;
      return isValid;

    },

    isValidEmail(email) {
      this.errors.state.username = null
      let result = null
      if (!email) {
        this.errors.state.username = false
        this.errors.username = 'Email é obrigatório';
      }
      if (email && email.length > 0) {
        const expressao = /^[a-z0-9._]+@[a-z0-9]+(\.[a-z]+){1,2}$/;
        let regex = new RegExp(expressao);
        this.errors.state.username = false;
        result = false
        if (email.match(regex)) {
          this.errors.state.username = null
          result = true
        } else {
          this.errors.state.username = false
          this.errors.username = 'Formato de e-mail é inválido!'
          result = false
        }
      }
      return result
    },

    resetErros() {
      this.errors = {
        username: null,
        password: null,
        confirmPassword: null,

        state: {
          firstName: null,
          lastName: null,
          username: null,
          password: null,
          confirmPassword: null,
        }
      }
    },

    async cadastrar() {
      //this.errors = {}; // Limpar os erros anteriores
      this.estaCarregando = true;
      this.erroCadastro = false;
      if (this.validar()) {
        this.showDismissibleAlert = false;
        await this.$http.post(`api/public/usuario`, this.usuario).then(() => {
          this.cadastroFinalizado = true;
          this.estaCarregando = false;
        }).catch((error) => {
          this.erroResponse = Object.assign({}, error);
          this.erroCadastro = true;
          this.estaCarregando = false;
        })
        this.resetErros();
      }


    },
  },
};
</script>

<style scoped>

.tilted-slide {
  animation: tiltAnimation 1.5s ease-in-out infinite alternate;
  transform-origin: center bottom;
}

@keyframes tiltAnimation {
  from {
    transform: perspective(700px) rotateY(-10deg);
  }
  to {
    transform: perspective(700px) rotateY(-20deg);
  }
}

section {
  padding: 65px;
  min-height: 100vh;
}

section p {
  text-align: justify;
}

section h3,h4,h5 {
  text-align: left;
}
.bemvindo {
  background-image: linear-gradient(to bottom, #79D4F6, #AAE3F9);
  padding-bottom: 120px;
  padding-top: 135px;
}

.bemvindo p {
  margin-right: 5px;
}

.btn {
  width: 100%;
  height: 50px;
  border-radius: 0;
}

input {
  border-radius: 0;
}

.form-control-lg {
  padding: 18px;
  font-size: 16px;
}

.input-group-append {
  border: 0;
}

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /*background-color: rgba(255, 255, 255, 0.8);*/
  z-index: 9999;
}

img {

  max-width: 100%;
}

p {
  font-family: 'Open Sans', sans-serif;
  color: #284f79;

}

h3 {
  font-family: 'Open Sans', sans-serif;
  color: #284f79;
}

.btn {
  border-radius: 0;
}

input {
  border-radius: 0;
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
.card-body h4 {
  text-align: left;
}

.bg-info {
  background-color: #17a2b8;
}

.has-cards-inverse {
  overflow: hidden;
  padding-top: 100px;
  padding-bottom: 100px;

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
    background: #f0f0f5;
    transform: skew(0, 8deg);
  }

  .container {
    pointer-events: auto;
    position: relative;
  }
}

.has-cards {
  overflow: hidden;
  padding-top: 100px;
  padding-bottom: 100px;
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
    background: whitesmoke;
    transform: skew(0, -8deg);
  }

  .container {
    pointer-events: auto;
    position: relative;
  }
}

.carousel {
  max-width: 55%;
  display: block;
  justify-content: center;
  align-content: center;
}

@media screen and (max-width: 960px) {
  .btn {
    width: 100%;
  }
}

.card {
  width: 100%;
}

section {
  padding: 10px;
}

.invalid-feedback {
  color: #cc6262;
}

section p {
  text-align: justify;
}
section h3,h4,h5 {
  text-align: center;
}


</style>

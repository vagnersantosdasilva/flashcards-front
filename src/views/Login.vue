<template>
  <div class="login">
    <section class="bemvindo">
      <b-container>
        <b-row class="justify-content-center">
          <b-col md="6" style="margin-top: 100px; ">
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
              <p>
                Cadastre-se agora e comece a criar seus flashcards!
              </p>
            </div>
          </b-col>

          <b-col md="6" style="margin-top: 100px;margin-bottom: 100px;">
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
                <!--
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
                        <b-button variant="outline-primary" class="w-75 mt-4" @click="loginWithGoogle">
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
                -->
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>

      </b-container>
    </section>
    <section class="mb-4">
      <b-container>
        <b-row class="justify-content-center">
          <b-col md="6" align-self="center" style="margin-top: 100px;margin-bottom: 100px;">
            <img src="../assets/annie-spratt-4-4WPFLVhAY-unsplash.jpg" height="427" width="640"
                 style="margin-top: 30px"/>
          </b-col>
          <b-col md="6" style="margin-top: 100px;margin-bottom: 100px;">
            <h3 class="mt-4">Por que usar a técnica de repetição espaçada?</h3>
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
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="mb-4" style="background-color: whitesmoke">
      <b-container>
        <b-row class="justify-content-center">
<!--          <b-col md="6" align-self="center" style="margin-top: 100px;margin-bottom: 100px;">
            <img src="../assets/annie-spratt-4-4WPFLVhAY-unsplash.jpg" height="427" width="640"
                 style="margin-top: 30px"/>
          </b-col>-->
          <b-col md="6" style="margin-top: 100px;margin-bottom: 100px;">
            <h3 class="mt-4">Como funciona o método de repetição espaçada?</h3>
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
            <p >
              Esse método garante que as perguntas mais fáceis para você sejam movidas para uma etapa mais avançada e,
              consequentemente, sejam revisadas com menos frequência.
              Enquanto isso, as perguntas que você tem mais dificuldade serão revisadas com maior regularidade até que
              você as aprenda bem.
            </p>

          </b-col>
        </b-row>
      </b-container>
    </section>

    <section style="background-color: white">
      <b-container>
        <b-row class="justify-content-center">
          <b-col md="6" style="margin-bottom: 100px; margin-top: 100px">
            <h3>Crie seus próprios flashcards personalizados</h3>
            <p>
              Com o Simples Flashcards, você tem total liberdade para criar seus próprios flashcards personalizados,
              focando nos tópicos relevantes e desafiando sua memória de forma específica, potencializando sua
              aprendizagem.
            </p>
            <p>
              Aprenda novos idiomas, estude para provas ou retenha informações importantes com eficiência, usando os
              flashcards personalizados adaptados
              ao seu ritmo de estudo e necessidades específicas. Simplifique sua jornada de aprendizado com nossos
              cartões de memória simples e eficazes.</p>
          </b-col>

          <b-col md="6" align-self="center" style="margin-bottom: 100px; margin-top: 80px">
            <b-row class="justify-content-center mt-4">
              <b-col md="12">
                <div style="max-height: 400px">
                  <b-carousel
                      id="carousel-1"
                      v-model="slide"
                      :interval="4000"
                      controls
                      indicators
                      fade
                      background="white"
                      img-width="2048"
                      img-height="480"
                      style="text-shadow: 1px 1px 2px #333;"
                      @sliding-start="onSlideStart"
                      @sliding-end="onSlideEnd"
                  >
                    <!-- Text slides with image -->
                    <b-carousel-slide

                        :img-src="require('../assets/s-1.png')"
                    ></b-carousel-slide>

                    <!-- Slides with custom text -->
                    <b-carousel-slide

                        :img-src="require('../assets/s-2.png')">

                    </b-carousel-slide>

                    <!-- Slides with image only -->
                    <b-carousel-slide


                        :img-src="require('../assets/s-3.png')">

                    </b-carousel-slide>

                    <!-- Slides with img slot -->
                    <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
<!--                    <b-carousel-slide>
                      <template #img>
                        <img
                            class="d-block img-fluid w-100"
                            width="1024"
                            height="480"
                            src="https://picsum.photos/1024/480/?image=55"
                            alt="image slot"
                        >
                      </template>
                    </b-carousel-slide>-->

                    <!-- Slide with blank fluid image to maintain slide aspect ratio -->
<!--                    <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
                        a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
                      </p>
                    </b-carousel-slide>-->
                  </b-carousel>
                </div>
              </b-col>

            </b-row>
          </b-col>
        </b-row>

      </b-container>
    </section>

    <section style="background-color: whitesmoke">
      <b-container>
        <b-row class="justify-content-center">
          <b-col md="6" style="margin-bottom: 100px; margin-top: 100px">
            <h3>Comece a criar seus flashcards!</h3>
            <p style="font-family:Open Sans">
              Não perca tempo! Cadastre-se gratuitamente e desbloqueie todo o potencial da técnica de repetição
              espaçada. Aumente sua retenção de conhecimento e alcance melhores resultados nos seus estudos,
              atividades acadêmicas ou profissionais.
            </p>
          </b-col>

          <b-col
              class="d-flex justify-content-center"
              align-self="center"
          >
            <b-button
                variant="primary"
                style="height: 80px;border-radius: 0 "> Inscreva-se Gratuitamente!
            </b-button>
          </b-col>
        </b-row>

      </b-container>
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
.carousel{
  max-width:70%;
  display: flex;
  justify-content: center;
  align-content: center;
}
img {

  max-width: 100%;
}
p{
  font-family: 'Open Sans', sans-serif;
  color: #1f396e;
}
h3{
  font-family: 'Open Sans', sans-serif;
  color: #182c59;
}

.btn {
  border-radius: 0;
}

input {
  border-radius: 0;
}

section {
  min-height: 500px;
}

.bemvindo {
  background-color: whitesmoke;
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

</style>

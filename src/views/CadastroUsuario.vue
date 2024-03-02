<script src="../google.js"></script>
<template>
  <div class="main">
    <section class="bemvindo d-flex flex-column align-items-center justify-content-center" id="inicio">
      <div class="container">
        <div class="row d-flex justify-content-between mt-4" >
          <div class="col-lg-6 col-12">
            <div class="login-content">
              <h3 class="text-sm-center text-md-start">Bem-vindo ao Memo Beam!</h3>
            
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

          <div class="col-lg-6 col-12 d-flex aling-column justify-content-center align-content-center"  align-self="center">
            <b-row class="col-12 d-flex aling-column justify-content-center align-content-center">
              <b-card 
                class=" shadow-lg" 
                :style="estiloCard"
              >
                <div v-if="cadastroFinalizado">
                  
                  <b-card-body class="d-block justify-content-center">
                    <b-row >
                        <i 
                          style="margin-top: 130px; margin-left: 125px;margin-bottom: 100px;" 
                          class="fas fa-check-circle fa-4x text-success animated bounceIn"></i>
                    </b-row>
                    <h4>Parabéns! Seu cadastro foi concluído.</h4>
                    <b-card-text 
                      style="
                      font-size: 13px;
                      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                      color:#222;
                      "
                      
                    >
                      <div >Agora só falta ativar sua conta. Enviamos um e-mail para você contendo um link de ativação. Ao clicar no link seu login será habilitado para acessar ao Memo beam.</div>
                    </b-card-text >
                    
                  </b-card-body>
                </div>
                <div v-else>
                  <b-card-title class="custom-title"><strong>Inscreva-se!</strong></b-card-title>
                  <b-card-title class="custom-title text-danger d-flex justify-content-start" v-if="erroCadastro" >
                  <strong>{{ erro }}</strong>
                  </b-card-title>
                
                  <b-card-body >
                    <div class="text-center ">

                    </div>
                    <form>
                      <b-form-group
                        class="form-group mt-0"
                    >
                    
                    </b-form-group>
                      
                      <b-form-group
                          :invalid-feedback="errors.username"
                          :state="errors.state.username"

                      >
                        <label style="font-weight: bold; font-size: 13px; color: black; font-family: 'Open Sans', sans-serif;">E-MAIL:</label>
                        <b-form-input
                            style="font-family:'Open Sans', sans-serif; font-size: 13px;"
                            v-model="usuario.username"
                            autocomplete="false"
                            placeholder="Informe seu melhor e-mail"
                            class="form-control-lg"
                            required
                            type="email"
                            :disabled="estaCarregando"
                        ></b-form-input>
                      </b-form-group>

                      <b-form-group
                          class="form-group mt-2"
                          :invalid-feedback="errors.password"
                          :state="errors.state.password"
                      >
                      <label style="font-weight: bold; font-size: 13px; color: black; font-family: 'Open Sans', sans-serif;">SENHA:</label>
                        <b-input-group>
                          <b-form-input
                              style="font-family:'Open Sans', sans-serif; font-size: 13px;"
                              v-model="usuario.password"
                              autocomplete="false"
                              :type="passwordInputType"
                              placeholder="Crie uma senha de 6 dígitos"
                              class="form-control-lg"
                              :disabled="estaCarregando"

                          ></b-form-input>
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
                      </b-form-group>

                      <b-form-group
                          class="form-group mt-2"

                          :invalid-feedback="errors.confirmPassword"
                          :state="errors.state.confirmPassword"
                      >
                        <label style="font-weight: bold; font-size: 13px; color: black; font-family: 'Open Sans', sans-serif;">CONFIRMAÇÃO DE SENHA:</label>
                        <b-input-group>
                          <b-form-input
                              style="font-family:'Open Sans', sans-serif; font-size: 13px;"
                              v-model="usuario.confirmPassword"
                              autocomplete="false"
                              :type="passwordInputType"
                              placeholder="Confirme a senha"
                              class="form-control-lg"
                              :disabled="estaCarregando"
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
                                      ? 'far fa-eye-slash'
                                      : 'far fa-eye'
                                  "
                              ></i>
                            </b-input-group-text>
                          </b-input-group-append>
                        </b-input-group>
                      </b-form-group>

                      <b-form-group
                          :invalid-feedback="errors.termos"
                          :state="errors.state.termos"
                          class="mt-1"
                          
                      >
                        <b-form-checkbox
                            id="termos"
                            v-model="aceitouTermos"
                            name="aceitar-termos"
                            required
                            class="mt-2"
                            :disabled="estaCarregando"
                            
                        >
                          <div 
                            class="ms-1" 
                            style="font-size: 16px;" 
                            >
                              Eu li e aceito os <a href="#" v-b-modal.termos>Termos de Uso</a>
                          </div>
                        </b-form-checkbox>
                      </b-form-group>

                      <b-row class="d-flex justify-content-start col-12 ms-0 mt-3">
                        <b-button 
                            variant="primary" 
                            @click="cadastrar" 
                            :disabled="estaCarregando"
                        >
                          <strong>Cadastrar</strong>
                          <i class="ms-2 fas fa-spinner fa-pulse fa-3x"
                            v-show="estaCarregando"
                            style="font-size: 12px"
                          />
                        </b-button>
                      </b-row>

                      <b-form-group
                          class="form-group mt-2"
                      >
                        <b-row class="d-flex justify-content-center col-12 ms-0 mb-1 mt-2" >
                          <b-col><b-row style="margin-top: 12px;"><hr/></b-row></b-col>
                          <b-col class=" col-1 d-flex justify-content-center">
                            <b-row class="text-secondary">ou</b-row>
                          </b-col>
                          <b-col><b-row style="margin-top: 12px;"><hr/></b-row></b-col>

                        </b-row>
                      </b-form-group>


                      <b-row  class="d-flex justify-content-between">
                        <b-col class="col-12 d-flex justify-content-center align-content-center ">
                          <b-button
                              style="border-color:#c5d4e3;"
                              variant="transparent"
                              class="custom-button-google mt-1 mb-1 d-flex justify-content-center align-content-center"
                              @click="loginGoogle"
                              :disabled="estaCarregando"
                          >
                            <b-row class="col-12 d-flex justify-content-center">
                              <b-col class="col-1 d-flex justify-content-center align-content-center" align-self="center">
                                <span class="fa-brands fa-google">
                                </span>
                              </b-col>
                              <b-col class=" col-10">
                                <div class="mt-1 d-flex justify-content-center" >
                                  <strong v-if="isMobile">Com o Google</strong>
                                  <strong v-else>Iscrever-se com o Google</strong>
                                </div>
                              </b-col>
                              <b-col class="col-1"></b-col>
                            </b-row>
                          </b-button>
                        </b-col>
                      
                        <b-col class="col-12 d-flex justify-content-center align-content-center ">
                          <b-button
                              style="border-color:#c5d4e3;"
                              variant="transparent"
                              class="custom-button-facebook mt-1 mb-1 d-flex justify-content-center align-content-center"
                              @click="loginWithFacebook"
                              :disabled="estaCarregando"
                          >
                            <b-row class="d-flex col-12 justify-content-center">
                              <b-col class="col-1 d-flex justify-content-center align-content-center" align-self="center">
                                <span
                                    class="fa-brands fa-facebook-square icone-social-face"
                                    >
                                </span>
                              </b-col>
                              <b-col class="col-10 ">
                                <div class="mt-1 d-flex justify-content-center" >
                                  <strong  v-if="isMobile">Com o Facebook</strong>
                                  <strong  v-else>Inscrever-se com o Facebook</strong>
                                </div>
                              </b-col>
                              <b-col class="col-1 "></b-col>
                            </b-row>
                          </b-button>
                        </b-col>
                      </b-row>
                    </form>
                  </b-card-body>
              </div>
            </b-card>
                
              
          </b-row>
          </div>
        </div>
      </div>
    </section>

    <section class="d-flex flex-column justify-content-center align-items-center has-cards" style="background: white">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6" align-self="center" v-show="!isMobile">
            <img src="../assets/annie-spratt-4-4WPFLVhAY-unsplash.jpg" height="427" width="640"
                 style="margin-top: 30px"
                 class="shadow-lg"
            />
          </div>
          <div class="col-md-6" style="margin-top: 20px">
            <h4 v-show="isMobile" class="text-sm-center text-md-start mt-4">Por que usar a técnica de repetição espaçada?</h4>
            <h3 v-show="!isMobile" class="text-sm-center text-md-start mt-4">Por que usar a técnica de repetição espaçada?</h3>
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
            <h4 v-show="isMobile" class="text-sm-center text-md-start mt-4">Como funciona o algoritmo?</h4>
            <h3 v-show="!isMobile" class="text-sm-center text-md-start mt-4">Como funciona o algoritmo do Memo Beam?</h3>
            <p>
              O algoritmo de repetição espaçada baseia-se em seis etapas de conhecimento, onde cada questão
              presente na revisão é associada a uma dessas etapas.
              Cada vez que um item é revisado corretamente, ele avança para o próximo nível, ou seja, a próxima etapa. O
              processo funciona da seguinte maneira:
            </p>
            <p>
              Se você responder corretamente, a questão será movida para a próxima etapa e será apresentada novamente
              para revisão após um intervalo de 1 a 180 dias (dependendo da nova etapa).
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
            <h4 v-show="isMobile" class="text-sm-center text-md-start">Crie flashcards personalizados</h4>
            <h3 v-show="!isMobile" class="text-sm-center text-md-start">Crie flashcards personalizados</h3>
            <p>
              Com o MemoBeam, você pode  personalizar flashcards com imagens, mudar fontes
              de texto e cores, focando nos tópicos relevantes e desafiando sua memória
              de forma específica, melhorando seu aprendizado.
            </p>
            <p>
              Aprenda novos idiomas, estude para provas ou retenha informações importantes de seu trabalho com eficiência, usando os
              flashcards personalizados. Potencialize sua jornada de aprendizado com nossos cartões de memória simples e eficazes.</p>
          </div>

          <div class="col-md-6" align-self="center">
            <div class="row justify-content-center mt-4">
              <div class="col-12">
                <div class="row d-flex justify-content-center">
                  <div id="carousel-1" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
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
            <h3 v-show="!isMobile" class="text-md-start text-sm-center ">Comece agora sua jornada de aprendizado!</h3>
            <h4 v-show="isMobile" class="text-md-start text-sm-center ">Comece agora sua jornada!</h4>
            <p style="font-family:Open Sans" >
              Não perca mais tempo! Cadastre-se gratuitamente e desbloqueie todo o potencial da técnica de repetição
              espaçada. Aumente sua retenção de conhecimento e alcance melhores resultados nos seus estudos,
              atividades acadêmicas ou profissionais.
            </p>
          </div>

          <div
              class="col d-flex flex-column justify-content-center align-items-center mt-4"
          >
            <b-button
                @click="scrollToSection('inicio')"
                variant="primary"
                style="height: 80px; width:350px ;border-radius: 0 ">
                <strong> Inscreva-se Gratuitamente!</strong>
            </b-button>
          </div>
        </div>

      </div>
    </section>
    <b-modal
        id="termos"
        v-model="showModalTermos"
        title="Termos de uso e Política de Privacidade:"
        size="lg"
        ok-only
    >
      <div>

        <h1>Política de Privacidade</h1>
        <p><strong>Última atualização:</strong> [19/09/2023]</p>
        <p>Esta Política de Privacidade descreve como o <em>Memo Beam</em>, usa e compartilha informações pessoais quando você utiliza
          nosso serviço. Ao utilizar o Serviço, você concorda com as práticas de privacidade descritas nesta política.
        </p>

        <h2>Coleta de Informações</h2>
        <p><strong>Informações Pessoais:</strong></p>
        <ul>
          <li>No momento do registro, coletamos informações pessoais, como seu nome, endereço de e-mail e outras
            informações de contato.
          </li>
        </ul>

        <p><strong>Informações de Uso:</strong></p>
        <ul>
          <li>Coletamos informações sobre como você utiliza o Serviço, incluindo dados sobre os flashcards criados,
            atividades e interações no aplicativo.
          </li>
        </ul>

        <p><strong>Informações de Pagamento:</strong></p>
        <ul>
          <li>Quando você optar por atualizar para planos pagos, podemos coletar informações de pagamento, como
            informações de cartão de crédito, para processar as transações.
          </li>
        </ul>

        <h2>Uso das Informações</h2>
        <p><strong>Fornecimento do Serviço:</strong></p>
        <ul>
          <li>Usamos as informações coletadas para fornecer, manter e melhorar o Serviço.</li>
        </ul>

        <p><strong>Comunicações:</strong></p>
        <ul>
          <li>Podemos usar seu endereço de e-mail para enviar informações importantes sobre sua conta, atualizações do
            Serviço ou outras comunicações relacionadas ao Serviço.
          </li>
        </ul>

        <p><strong>Análises e Personalização:</strong></p>
        <ul>
          <li>Utilizamos informações para analisar o uso do aplicativo e personalizar sua experiência, incluindo o
            fornecimento de recomendações de estudo.
          </li>
        </ul>

        <p><strong>Publicidade:</strong></p>
        <ul>
          <li>Podemos exibir anúncios em nosso Serviço. Não compartilhamos informações pessoais com anunciantes.</li>
        </ul>

        <h2>Compartilhamento de Informações</h2>
        <p><strong>Com Terceiros:</strong></p>
        <ul>
          <li>Não compartilhamos informações pessoais com terceiros sem seu consentimento, exceto quando exigido por
            lei.
          </li>
        </ul>

        <h2>Sua Responsabilidade</h2>
        <p><strong>Conteúdo dos Flashcards:</strong></p>
        <ul>
          <li>Você é responsável pelo conteúdo criado em seus flashcards, incluindo imagens e textos.</li>
        </ul>

        <p><strong>Compartilhamento de Flashcards:</strong></p>
        <ul>
          <li>Você pode compartilhar seus flashcards com terceiros, mas é responsável pela veracidade e originalidade do
            conteúdo.
          </li>
        </ul>

        <p><strong>Material Ofensivo:</strong></p>
        <ul>
          <li>Conteúdo ofensivo pode ser removido, e sua conta pode ser bloqueada, de acordo com nossas políticas.</li>
        </ul>

        <h2>Planos Pagos</h2>
        <p><strong>Planos Futuros:</strong></p>
        <ul>
          <li>No futuro, podemos oferecer planos pagos com recursos adicionais. Os usuários gratuitos podem optar por
            atualizar, se desejarem.
          </li>
        </ul>

        <h2>Remoção de Conteúdo por Inatividade</h2>
        <p>Em casos de inatividade do usuário, onde não houve login ou atividade na conta por um período de três meses
          consecutivos, reservamos o direito de remover ou arquivar o conteúdo associado à conta. Essa medida é tomada
          levando em consideração dois fatores críticos para o funcionamento do nosso serviço:</p>

        <ol>
          <li>A renda do nosso site é proveniente de anúncios exibidos no serviço. A inatividade prolongada de usuários
            pode reduzir a qualidade da experiência do usuário e a eficácia dos anúncios exibidos, o que afeta
            diretamente nossa capacidade de manter o serviço gratuito.
          </li>
          <li>O custo operacional do serviço está diretamente relacionado à quantidade de informações armazenadas.
            Manter grandes volumes de dados de contas inativas pode aumentar significativamente nossos custos de
            armazenamento e manutenção de servidores, impactando a viabilidade do serviço como um todo.
          </li>
        </ol>

        <p>Portanto, a remoção ou arquivamento de conteúdo após um período de inatividade é uma medida necessária para
          garantir a sustentabilidade do serviço e sua disponibilidade para todos os usuários ativos.</p>

        <h2>Alterações na Política de Privacidade</h2>
        <p>Reservamo-nos o direito de atualizar esta política periodicamente. Quaisquer alterações significativas serão
          notificadas aos usuários por meio do Serviço.</p>

      </div>
    </b-modal>
  </div>
</template>

<script>
import {jwtDecode} from "jwt-decode";
import {decode} from "jsonwebtoken";
import router from "../router";
import envVars from '../../env.js';

export default {
  
  computed: {

    erro() {
      if (this.erroResponse.response && this.erroResponse.response.data && this.erroResponse.response.data.message) {
        return this.erroResponse.response.data.message
      }
      if (this.erroResponse.response && this.erroResponse.response.message)
        return this.erroResponse.response.message

      return "Um erro ocorreu ao tentar cadastrar! Tente mais tarde."
    },

    estiloCard(){
      if (this.cadastroFinalizado){
        return "max-width: 410px;height:560px;padding: 2px;border-color: #c0f7c7;";
      }
      return "max-width: 410px;min-height:560px;padding: 2px"
    }
  },

  data() {
    return {
      showBtnGoogle:false,
      aceitouTermos:false,
      showModalTermos:false,
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
        termos:null,

        state: {
          username: null,
          password: null,
          confirmPassword: null,
          termos:null,
        }
      },
      passwordInputType: 'password',
      erroResponse: {},
      cadastroFinalizado: false,
      estaCarregando: false,
      baseURL : envVars.BASE_URL,
      isMobile:false,
    };
  },

  methods: {

    checkIfMobile() {
      this.isMobile = window.innerWidth <= 768; // Altere o valor conforme necessário para determinar quando a tela é considerada um dispositivo móvel
    },
   
    beforeDestroy() {
     window.removeEventListener('resize', this.checkIfMobile);
    },

    loginWithFacebook() {
      this.estaCarregando = true
      const githubAuthorizationUrl = `${this.baseURL}/oauth2/authorization/facebook`;
      window.location.href = githubAuthorizationUrl;
    },

    loginWithGithub(){
      this.estaCarregando = true
      const githubAuthorizationUrl = `${this.baseURL}/oauth2/authorization/github`;
      window.location.href = githubAuthorizationUrl;
    },

     loginGoogle(){
       this.estaCarregando = true
       const githubAuthorizationUrl = `${this.baseURL}/oauth2/authorization/google`;
       window.location.href = githubAuthorizationUrl;
    },

    handleCredentialResponse(response) {

      const tokenGoogle = {
        token:response.credential
      }

      this.$http.post(`${this.baseURL}/api/public/usuarioGoogle`,tokenGoogle).then(() => {
        console.log('TOKEN enviado para o backend')
      }).catch(() => {
        console.log("Erro ao tentar enviar token para backend")
      })

    },

    handlerLoginFacebook(response){
      const token = response.authResponse.accessToken+response.authResponse.signedRequest
      this.$http.post(`${this.baseURL}/api/public/usuarioGoogle`,token).then(() => {
        console.log('TOKEN enviado para o backend')
      }).catch(() => {
        console.log("Erro ao tentar enviar token para backend")
      })
    },

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
      this.resetErros();

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

      if (this.aceitouTermos == null || this.aceitouTermos ==false){
        this.errors.termos = 'Você precisa ler e aceitar os Termos de Uso para continuar.'
        this.errors.state.termos = false;
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
      this.estaCarregando = false;
    },
  },

  async mounted() {

    this.checkIfMobile();
    
    window.addEventListener('resize', this.checkIfMobile);

    if(this.$route.query.page) {
      //const page = this.$route.query.page;
      console.log('valor da query',this.$route.query.page)
      if (this.$route.query.page) {
        const pagina = this.$route.query.page
        if (pagina =='termos') this.$router.push("/termos")
        if (pagina =='privacidade') this.$router.push("/privacidade")
        
      }
      //await  this.$router.push(`/${page}`)
      
    }
    if(this.$route.query.token) {
      const token = this.$route.query.token;
      const jwt_decoded = decode(token);
      this.$store.commit('DEFINIR_USUARIO_LOGADO', {
        token: token,
        usuario: {
          username:jwt_decoded.sub ,
          idUser:jwt_decoded.idUser
        }
      })
      localStorage.setItem('token', token);
      await  this.$router.push("/home")
    }
  }
};
</script>

<style scoped>

.custom-title {
  /*color: #1e5f9b;*/
  color: black;
  margin-left: 15px;
  margin-top: 10px;
  font-size: 19px;
}

.row{
  border:0px dashed red;
}

.col{
  border: 0px dashed black;
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

section h3, h4, h5 {
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
  height: 40px;
  border-radius: 0;
  border-radius: 0;
  font-family: Google Sans,arial,sans-serif;
  font-size: 14px;
  border-color:#c5d4e3;
}

input {
  border-radius: 0;
}

.form-control-lg {
  padding: 10px;
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

h4 {
  font-family: 'Open Sans', sans-serif;
  color: #284f79;
  font-size: 22px;
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

.icone-social-face{
  font-size: 10px;
}

@media screen and (max-width: 960px) {
  .btn {
    width: 100%;
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



  section h3, h4, h5 {
    text-align: center;
  }

  #customBtn {
    display: inline-block;
    background: white;
    color: #444;
    width: 190px;
    border-radius: 5px;
    border: thin solid #888;
    box-shadow: 1px 1px 1px grey;
    white-space: nowrap;
    width: 100%;
  }
  #customBtn:hover {
    cursor: pointer;
  }
  span.label {
    font-family: serif;
    font-weight: normal;
  }
  span.icon {
    background: url('../assets/google2.jpg') transparent 5px 50% no-repeat;
    display: inline-block;
    vertical-align: middle;
    align-content: center;
    width: 42px;
    height: 42px;
  }
  span.buttonText {
    display: inline-block;
    vertical-align: middle;
    padding-left: 0px;
    padding-right: 42px;
    font-size: 14px;
    font-weight: bold;
    /* Use the Roboto font that is loaded in the <head> */
    font-family: 'Roboto', sans-serif;
  }

}



</style>

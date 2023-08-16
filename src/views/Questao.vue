<template>
  <div class="container">

    <div v-if="estaCarregando">
      <b-row class="d-flex justify-content-center mt-4">
        <div class="loader-container md-6 text-center mt-4">
          <i class="fas fa-spinner fa-pulse fa-3x"></i>
        </div>
      </b-row>
    </div>
    <div v-else>
      <b-row class="d-flex justify-content-center mt-4" v-show="showDismissibleAlert">
        <alert-custom
            :show="showDismissibleAlert"
            :alert="erroResponse"
        />
      </b-row>
      <!-- Listagem de Cateogorias -->
      <b-row
          class="d-flex justify-content-lg-center col-12 "
          style="margin-left: 1px; margin-top: 40px;"
          v-if="!categoriaSelecionada"
      >
        <b-row class="d-flex justify-content-center  ">
          <h4 class="text-center">Escolha a matéria de estudos</h4>
        </b-row>
        <b-row
            class="d-flex justify-content-center ms-0"
        >
          <!--@click="selectTopico(categoria.id)"-->
          <b-card
              v-for="categoria in categorias"
              :key="categoria.id"
              style="height: 200px;"
              class="col-xxl-3 col-xl-3 col-lg-3 col-md-5 col-sm-12 m-1"
          >
            <b-card-title style="font-size: 17px;">{{ categoria.nome }}</b-card-title>

            <b-card-body class="w-100">
              <b-button
                  variant="link"
                  style="border-radius: 0;"
                  class=" d-flex justify-content-start w-100"
                  @click="getPerguntaRevisao(categoria.id)"

              >Revisão espaçada
              </b-button>

              <b-button
                  variant="link"
                  style="border-radius: 0;"
                  class="d-flex justify-content-start w-100 "
                  @click="getPergunta(categoria.id)"
              >Revisar tudo
              </b-button>

            </b-card-body>

          </b-card>


        </b-row>
      </b-row>

      <!-- Listagem de erros e acertos-->
      <b-row v-else-if="questionarioConcluido" style="margin-top: 150px;">
        <b-row class="col-md-12" style="margin-left: 0">
          <h5 class="text-center">{{ mensagemFinalizacao }} {{ nomeUsuario }}</h5>
        </b-row>
        <b-row class="col-md-12 " style="margin-left: 0">
          <b-row class="d-flex justify-content-center " style="margin: 0">
            <p class="text-center">Repostas corretas:</p>
            <p class="text-center" style="font-size: 24px; margin: 0;"> {{ acertos }} </p>
          </b-row>
        </b-row>

        <b-row clas="col-12 d-flex justify-content-center mt-4" style="margin:0; margin-bottom: 30px; " >
          <b-col v-show="listErro.length>0">
            <b-row
                class="d-flex justify-content-end"
                style="margin: 5px;"
            >
              <b-button
                  variant="secondary"
                  style="width: 150px; margin:10px"
                  @click="corrigirErros"
              >
                Corrigir erros!
              </b-button>
            </b-row>
          </b-col>
          <b-col>
            <b-row class="d-flex justify-content-start"
                   style="margin: 5px;"
                   v-if="listErro.length>0"
            >
              <b-button
                  variant="primary"
                  style="width: 150px; margin:10px"
                  @click="voltarParaCategorias"
              >
                Continuar
              </b-button>
            </b-row>

            <b-row class="d-flex justify-content-center"
                   style="margin: 5px;"
                   v-else
            >
              <b-button
                  variant="primary"
                  style="width: 150px; margin:10px"
                  @click="voltarParaCategorias"
              >
                Continuar
              </b-button>
            </b-row>

          </b-col>
        </b-row>


      </b-row>

      <!-- Controle de perguntas e respostas -->
      <b-row
          class="d-flex justify-content-lg-center"
          v-else
          style="margin-top: 50px"
      >

        <div v-if="qtdPerguntas==0">
          <b-row class="col-md-12 mt-4">
            <h5 class="text-center" v-if="isRevisao">Nenhum item para revisar hoje!</h5>
            <h5 class="text-center" v-else="">Nenhuma pergunta cadastrada!</h5>

          </b-row>

        </div>

        <div v-else>
          <b-row class="col-md-12 mt-4">
            <!--
            <h5 class="text-center">{{ questao.pergunta }}</h5>
            -->
          </b-row>
          <b-row class="col-md-12 ">
            <div v-if="!respondeu">
              <b-row class="d-flex justify-content-center ">
                <div class="flashcard"
                     style="cursor: pointer;"
                     @click="respondeu=true"
                >

                  <ckeditor
                      :editor="editor"
                      v-model="questao.pergunta"
                      @ready="onReadyNoToolbar"
                  >
                  </ckeditor>

                </div>
              </b-row>

            </div>

            <div v-else>
              <b-row class="d-flex justify-content-center">
                <b-row class=" d-flex justify-content-center cards">

                  <div class="flashcard" :class="{active:respondeu}">

                    <ckeditor
                        :editor="editor"
                        v-model="questao.resposta"
                        @ready="onReadyNoToolbar"
                        :class="{
                      'ck-content flashcard-acertou': acertou,
                      'ck-content erro': errou}"
                    >
                    </ckeditor>
                  </div>

                </b-row>

                <b-row clas="col-12 d-flex justify-content-center mt-4">
                  <b-col>
                    <b-row class="d-flex justify-content-end">
                      <b-button
                          variant="success"
                          @click="proximaPergunta(questao,true)"
                          class="acertou-button"
                      >
                        Acertou!
                      </b-button>
                    </b-row>
                  </b-col>
                  <b-col>
                    <b-row class="d-flex justify-content-start">
                      <b-button
                          variant="danger"
                          @click="proximaPergunta(questao,false)"
                          class="errou-button"
                      >
                        Errou!
                      </b-button>
                    </b-row>
                  </b-col>
                </b-row>
              </b-row>
            </div>

          </b-row>
        </div>
      </b-row>


    </div>


  </div>
</template>

<script>
import AlertCustom from "../components/AlertCustom.vue";
import DecoupledDocumentEditor from "ckeditor5-build-decoupled-document-base64-imageresize";
import CKEditor from "@ckeditor/ckeditor5-vue2";

export default {

  components: {
    AlertCustom,
    ckeditor: CKEditor.component,
  },

  data() {

    return {
      editor: DecoupledDocumentEditor,
      idCategoria : null,
      isRevisao: false,
      categorias: [],
      categoriaSelecionada: false,
      listPergunta: [],
      listAcerto: [],
      listErro: [],
      respondeu: false,
      questao: {
        id: null,
        pergunta: null,
        resposta: null,
        acerto: null,
        categoriaId: null,
        usuarioId: null,
      },
      questionarioConcluido: false,
      qtdPerguntas: null,
      acertou: null,
      errou: null,
      correcao: false,
      showDismissibleAlert: false,
      erroResponse: {},
      estaCarregando: false,
    }
  },

  computed: {


    acertos() {
      return this.listAcerto.length + "/" + this.qtdPerguntas;
    },

    mensagemFinalizacao() {
      if (this.listAcerto.length && this.qtdPerguntas) {
        if ((this.listAcerto.length / this.qtdPerguntas) > 0.8) return 'Fantástico,'
        if ((this.listAcerto.length / this.qtdPerguntas) > 0.6) return 'Muito bem,'
        if ((this.listAcerto.length / this.qtdPerguntas) <= 0.6) return 'Continue praticando,'
      }
      return 'OK,'
    },

    nomeUsuario() {
      return `${this.$store.state.usuario.username}!`.split("@")[0];
    }
  },

  methods: {


    async onReadyNoToolbar(editor) {
      editor.isReadOnly = true;
      editor.ui.getEditableElement().parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
      );
      editor.ui.view.toolbar.element.style.display = 'none';
    },

    async getCategorias() {
      const usuario = this.$store.state.usuario
      this.showDismissibleAlert = false;
      this.estaCarregando = true
      await this.$http.get(`api/usuario/${usuario.idUser}/categoria`).then((response) => {
        this.categorias = response.data
      }).catch((error) => {
        console.log(error);
        this.showDismissibleAlert = true;
        this.erroResponse = Object.assign({}, error);
      });
      this.estaCarregando = false;
    },

    selectTopico(idCategoria) {
      console.log(idCategoria)
      this.categoriaSelecionada = true;
      this.getPergunta(idCategoria);
    },

    async getPerguntaRevisao(idCategoria) {
      this.idCategoria = idCategoria;
      this.categoriaSelecionada = true;
      this.isRevisao = true;
      this.estaCarregando = true;
      const idUsuario = this.$store.state.usuario.idUser
      this.questao.usuarioId = idUsuario;
      this.showDismissibleAlert = false;
      await this.$http.get(`api/usuario/${idUsuario}/categoria/${idCategoria}/questao/revisao`)
          .then((response) => {
            console.log(response);
            this.listPergunta = response.data;
            this.qtdPerguntas = this.listPergunta.length
            this.questao = this.listPergunta.pop();
          }).catch((error) => {
            this.erroResponse = Object.assign({}, error);
            this.showDismissibleAlert = true;
          });
      this.estaCarregando = false;
    },

    async getPergunta(idCategoria) {
      this.idCategoria = idCategoria;
      this.categoriaSelecionada = true;
      this.isRevisao = false;
      this.estaCarregando = true;
      const idUsuario = this.$store.state.usuario.idUser
      this.questao.usuarioId = idUsuario;
      this.showDismissibleAlert = false;
      await this.$http.get(`api/usuario/${idUsuario}/categoria/${idCategoria}/questao`)
          .then((response) => {
            console.log(response);
            this.listPergunta = response.data;
            this.qtdPerguntas = this.listPergunta.length
            this.questao = this.listPergunta.pop();
          }).catch((error) => {
            this.erroResponse = Object.assign({}, error);
            this.showDismissibleAlert = true;
          });
      this.estaCarregando = false;
    },

    async proximaPergunta(questao, acerto) {
      const idUsuario = this.$store.state.usuario.idUser
      questao.acerto = acerto;
      questao.usuarioId = idUsuario;
      if (acerto) {
        this.acertou = true
        this.errou = false
      } else {
        this.acertou = false
        this.errou = true
      }

      if (this.correcao == false && this.isRevisao) {
        this.showDismissibleAlert = false;
        await this.$http.put(`api/usuario/${idUsuario}/questao/responder`, questao)
            .then(() => {
              setTimeout(() => {
                this.atualiza(questao);
              }, 300)
            }).catch((erro) => {
              this.showDismissibleAlert = true;
              this.erroResponse = Object.assign(erro);
            })
      } else {
        setTimeout(() => {
          this.atualiza(questao);
        }, 300)
      }
    },

    atualiza(questao) {
      if (this.questao.acerto) this.listAcerto.push(questao)
      else this.listErro.push(questao);

      if (this.listPergunta.length > 0) {
        this.questao = this.listPergunta.pop();
      } else {
        this.questionarioConcluido = true
        console.log('aproveitamento :', this.listAcerto.length / this.qtdPerguntas)
      }

      this.respondeu = false;
      this.acertou = null
      this.errou = null
    },

    corrigirErros() {
      this.correcao = true;
      this.listPergunta = [];
      this.listAcerto = [];
      this.qtdPerguntas = this.listErro.length;
      this.listPergunta = Object.assign([], this.listErro);
      this.listErro = [];
      this.questao = this.listPergunta.pop();
      this.questionarioConcluido = false;
    },

    voltarParaCategorias() {
      this.correcao = false;
      this.listPergunta = [];
      this.listAcerto = [];
      this.qtdPerguntas = null;
      this.listPergunta = [];
      this.listErro = [];
      this.questao = {
        id: null,
        pergunta: null,
        resposta: null,
        acerto: null,
        categoriaId: null,
      }
      this.categoriaSelecionada = false;
      this.questionarioConcluido = false;
      console.log('Tele resetada');
    },

  },
  mounted() {
    this.getCategorias()
  }


}
</script>


<style scoped>
.flashcard {
  padding: 30px;
  display: block;
  /*border: 1px solid #cfdccf;*/
  align-content: center;
  background-color: white;
  cursor: pointer;
  margin: 1px;
  max-width: 414px;
  min-width: 414px;

  height: 400px;
  border-radius: 0;
  font-family: 'Open Sans', sans-serif;
}

.ck-content {
  display: block;
  align-content: center;
  background-color: white;
  border: 1px solid #cfdccf;

  height: 90%;
  border-radius: 0;
  margin-right: 0;

}

.ck-content:hover {
  /*background-color: #f4f5f6;
  box-shadow: inset 0 0 1px 1px #b2caee;*/
  /*box-shadow: 0px 0px 3px 3px #a7a9af;*/
  box-shadow: 0px 0px 3px 3px #AAE3F9;

}

.flashcard-acertou {
  margin: 2px;
  padding: 9px;
  border: 2px solid #a0e7a0; /* Cor verde para as bordas */
  transition: border-color 0.3s ease; /* Transição suave das bordas */
}

.erro {
  margin: 2px;
  padding: 9px;
  border: 2px solid rgba(187, 143, 143, 0.96); /* Cor vermelha para as bordas */
  transition: border-color 0.3s ease; /* Transição suave das bordas */
}

.acertou-button {
  background-color: rgba(0, 255, 0, 0.3);
  width: 100px;
  margin: 10px;
  color: #222;
}

.errou-button {
  background-color: rgba(255, 0, 0, 0.3);
  color: #222;
  width: 100px;
  margin: 10px;
}

.card-resposta :hover {
  box-shadow: 0px 0px 3px 3px #a7a9af;
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

@media screen and (max-width: 960px) {

}
</style>
<template>
  <section style="padding-top: 100px">
    <div>
      <div class="sidebar-overlay" v-if="transparencia"></div>

      <b-sidebar
          id="sidebar-1" shadow
          backdrop-variant="secondary"
          backdrop
          @hidden="transparencia=false"
      >
        <div class="mt-0 titulo-sidebar ">
          <h4 style="color:#476493">
            <strong>{{ tituloFlashcard }}</strong>
          </h4>
        </div>
        <b-row class="justify-content-center">
          <alert-custom
              :show="showDismissibleAlert"
              :alert="erroResponseSalvar"
          />
        </b-row>
        <div v-if="mostrarSucesso" class="sidebar-overlay d-block justify-content-center">
          <div style="margin-top: 65%; margin-left: 45%;">
            <i class="fas fa-check-circle fa-4x text-success animated bounceIn"></i>
          </div>
        </div>

        <div v-else-if="carregando" class="sidebar-overlay d-block justify-content-center">
          <div style="margin-top:65% ; margin-left: 45%">
            <i class="fas fa-spinner fa-pulse fa-3x"></i>
          </div>
        </div>

        <div v-if="!carregando && !mostrarSucesso" class="px-4 py-2">
          <div class="row mt-4 ">
            <h5 style="color:#476493">Elabore a pergunta (Frente)</h5>
          </div>
          <div class="flashcard-editor row">
            <ckeditor
                :editor="editor"
                v-model="pergunta"
                @ready="onReady"
                :config="editorConfig"
                :disabled="isEditorDisabledPergunta"
            >
            </ckeditor>
            <div v-if="isLimitSizeImagePergunta" class="limit-message">
              Tamanho da imagem máxima : {{sizeImageLimit}}KB
            </div>
            <div v-else-if="isLimitReachedPergunta" class="limit-message">
              Limite de caracteres alcançado!
            </div>
            <div v-else class="char-count">
              Tamanho: {{ charCount }} / {{ characterLimit }}
            </div>
          </div>
          <div class="row mt-4">
            <h5 style="color:#476493">Elabore a resposta (Verso)</h5>
          </div>
          <div class="flashcard-editor row">
            <ckeditor
                :editor="editor"
                v-model="resposta"
                @ready="onReady"
                :config="editorConfig"
                :disabled="isEditorDisabledResposta"
            >
            </ckeditor>
            <div v-if="isLimitSizeImageResposta" class="limit-message">
              Tamanho máximo de imagem:{{sizeImageLimit}}KB
            </div>
            <div v-else-if="isLimitReachedResposta" class="limit-message">
              Limite de caracteres alcançado!
            </div>
            <div v-else class="char-count">
              Tamanho : {{ charCount2 }} / {{ characterLimit }}
            </div>
          </div>

          <div>
            <hr style="margin: 10px"/>
            <b-button
                :variant="btnSalvarVariant"
                :disabled="btnSalvarEstado"
                class="w-100 mt-2"
                @click="salvarQuestao"
            >
              Salvar
              <b-icon icon="save"></b-icon>
            </b-button>
          </div>
        </div>
      </b-sidebar>

    </div>
    <div v-if="edicao" class="container">

      <div class="loader-container md-6 text-center mt-4" v-if="estaCarregando">
        <b-row class="mt-4">
          <i class="fas fa-spinner fa-pulse fa-3x"></i>
        </b-row>
      </div>

      <div v-else class="d-block flex-column align-content-center justify-content-center">

        <b-row class="d-flex justify-content-center mt-4" v-show="showDismissibleAlert">
          <alert-custom
              :show="showDismissibleAlert"
              :alert="erroResponse"
          />
        </b-row>
        <b-row class="d-flex justify-content-between ml-4">
          <b-button style="max-width: 10px; margin-left: 0px" variant="link" @click="voltar">
            <b-icon icon="arrow-left">
            </b-icon>
          </b-button>
        </b-row>
        <b-card>
          <b-card-title>
            <b-row class="col-12">
              <div class="col-12 col-md-6">
                <b-form-input
                    placeholder="Qual é a matéria de estudo?"
                    v-model="categoria.nome"
                    style="border: 0; min-width:300px; "
                >
                </b-form-input>
              </div>
              <div class="col-12 col-md-6 d-flex justify-content-md-end justify-content-sm-start">
                <b-button variant="link" class="btn-categoria" v-b-modal.dataRevisao>
                  <b-icon icon="calendar"></b-icon>
                </b-button>
<!--                <b-button variant="link" disabled class="btn-categoria">
                  <b-icon icon="share"></b-icon>
                </b-button>
                <b-button variant="link" disabled class="btn-categoria">
                  <b-icon icon="download"></b-icon>
                </b-button>-->
                <b-button variant="link" v-show="categoria.isLoading" disabled class="btn-categoria">
                  <i class="fas fa-spinner fa-pulse fa-3x" style="font-size: 14px;"></i>
                </b-button>
                <b-button variant="link" :disabled="categoria.isLoading" class="btn-categoria">
                  <b-icon
                      icon="trash"
                      @click="showMsgBoxTwo(
                    'Atenção!',
                    'A matéria e todos as questões serão apagadas. Você tem certeza ?',
                    'categoria',
                    null
                    )">
                  </b-icon>
                </b-button>
                <b-button variant="link" :disabled="categoria.isLoading" class="btn-categoria">
                  <b-icon icon="save" @click="salvarCategoria()"></b-icon>
                </b-button>

              </div>
            </b-row>
          </b-card-title>
          <hr style="margin: 10px"/>
          <b-row class="d-flex justify-content-start" style="margin-left: -5px;margin-right: 10px;">
            <b-button
                variant="primary"
                v-b-toggle.sidebar-1
                @click="verConteudo"
                class="btn-novo-flashcard  d-flex align-items-center justify-content-center"

            >
              <b-icon icon="plus-circle" class="me-1"></b-icon>
              Novo Flashcard
            </b-button>
          </b-row>
          <b-card
              style="margin-left: 8px;margin-right: 8px;background: #FDFDFE;"
              class="mt-3" v-for="(q,index) in questoes" :key="index">
            <b-card-title class="d-flex justify-content-between">
              <div style="font-size: 16px; margin-left: 11px;color:#476493">Flashcard {{ index + 1 }}:</div>
              <div>
                <b-button variant="link" disabled v-show="q.isLoading">
                  <i class="fas fa-spinner fa-pulse fa-2x ms-4" style="font-size: 14px;"></i>
                </b-button>
                <b-button
                    v-b-toggle.sidebar-1
                    variant="link"
                    :disabled="q.isLoading"
                    @click="verConteudo(q,index)"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-button>
                <b-button variant="link" :disabled="q.isLoading" @click="deleteQuestao(q)">
                  <b-icon icon="trash"></b-icon>
                </b-button>

              </div>
            </b-card-title>

            <b-row class="mt-2 ms-1">
              <b-col class="col-sm-1 col-3  ms-1" align-self="center">
                Frente
              </b-col>
              <b-col align-self="center">

                <div class="resumo">
                  {{ q.pergunta | sanitizeContent(true) }}
                </div>
              </b-col>
              <b-col class="col-1"></b-col>
            </b-row>
            <b-row class="mt-2 ms-1">
              <b-col class="col-sm-1 col-3  ms-1" align-self="center">
                Verso
              </b-col>
              <b-col class="col" align-self="center">
                <div class="resumo">{{ q.resposta | sanitizeContent(true) }}</div>
              </b-col>
              <b-col class="col-1"></b-col>

            </b-row>


          </b-card>

        </b-card>
      </div>
    </div>
    <div v-else class="container">

      <div class="loader-container md-6 text-center mt-4" v-if="estaCarregando">
        <b-row class="mt-4">
          <i class="fas fa-spinner fa-pulse fa-3x"></i>
        </b-row>
      </div>
      <div v-else>
        <b-row class="d-flex justify-content-center mt-4" v-show="showDismissibleAlert">
          <alert-custom
              :show="showDismissibleAlert"
              :alert="erroResponse"
          />
        </b-row>
        <b-row class="d-flex justify-content-between ml-4">
          <b-button style="max-width: 10px; margin-left: 0px" variant="link" @click="voltar">
            <b-icon icon="arrow-left">
            </b-icon>
          </b-button>
        </b-row>
        <b-card>
          <b-card-title class="d-flex justify-content-between">
            <div style="font-size: 16px; margin-left: 11px;margin-top: 7px">Assuntos de estudo:</div>
            <div>
              
              <b-button disabled variant="link" @click="novoAssuntoMethod">
                <!--                <b-icon icon="upload"></b-icon>-->
              </b-button>
            </div>
          </b-card-title>
          <hr style="margin: 10px;"/>

          <b-row class="d-flex justify-content-lg-start" style="margin-left: 10px;margin-right: 10px;">
            <b-button
                class="btn-novo-flashcard  d-flex align-items-center justify-content-center g-0 m-0"
                variant="primary"
                @click="novoAssuntoMethod"
            >
              <b-icon
                  icon="plus-circle"
                  class="me-1"
              />
              Novo Assunto
            </b-button>
          </b-row>
          <div>
            <b-row
                class="d-flex justify-content-lg-center "
                style="margin-left: 10px;margin-right: 10px"
                v-if="novoAssunto"
            >
              <b-card
                  class="col-especial-cadastro text-center mt-2"
              >
                <b-row>
                  <b-col>
                    <b-form-group>
                      <b-form-input
                          v-model="categoria.nome"
                          placeholder="Digite aqui qual será o novo assunto para estudo"
                      >
                      </b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col class="col-1">
                    <b-button
                        variant="link"
                        v-if="categoria.isLoading"
                        disabled
                    >
                      <i class="fas fa-spinner fa-pulse fa-3x" style="font-size: 14px;"></i>
                    </b-button>
                    <b-button
                        variant="link"
                        class="primary"
                        @click="salvarCategoria"
                        v-else
                    >
                      <b-icon icon="save"></b-icon>
                    </b-button>
                  </b-col>
                </b-row>

              </b-card>
            </b-row>
            <b-row
                class="d-flex justify-content-lg-center "
                style="margin: 10px;"
                v-for="cat in categorias"
                :key="cat.id"
            >
              <b-card
                  class="col-especial-cadastro text-center mt-2"
                  @click="editarCategoria(cat)"
                  style="background: #FDFDFE"
              >
                <b-card-text>
                  {{ cat.nome }}
                  <i class="fas fa-spinner fa-pulse fa-2x ms-4"
                     style="font-size: 14px;" v-show="cat.isLoading"/>
                </b-card-text>

              </b-card>

            </b-row>

          </div>

        </b-card>
      </div>
    </div>

    <b-modal
        id="dataRevisao"
        v-model="showModalRevisao"
        title="Revisões pendentes:"
        size="md"
        ok-only
    >
      <div style="height: 350px" class="mt-4">
        <div v-for="(d,index) in listaRevisaoCategoriaCorrente" :key="index">
          <p class="text-center">
            {{ d }}
          </p>
        </div>
      </div>
    </b-modal>

  </section>

</template>

<script>
import AlertCustom from "../components/AlertCustom.vue";
import CKEditor from "@ckeditor/ckeditor5-vue2";
import DecoupledDocumentEditor from "ckeditor5-build-decoupled-document-base64-imageresize"
import {hide} from "@popperjs/core";

export default {
  computed: {
    hide() {
      return hide
    },
    btnSalvarEstado() {
      if (this.resposta && this.resposta.length > 0 && this.calculateCharCount(this.resposta) <= this.characterLimit &&
          this.pergunta && this.pergunta.length > 0 && this.calculateCharCount(this.pergunta) <= this.characterLimit &&
          this.calculateSizeImage(this.pergunta)<this.sizeImageLimit && this.calculateSizeImage(this.resposta)<this.sizeImageLimit
      ) return false;
      return true;
    },

    btnSalvarVariant() {
      if (this.resposta && this.resposta.length > 0 && this.calculateCharCount(this.resposta) <= this.characterLimit &&
          this.pergunta && this.pergunta.length > 0 && this.calculateCharCount(this.pergunta) <= this.characterLimit &&
          this.calculateSizeImage(this.pergunta)<this.sizeImageLimit && this.calculateSizeImage(this.resposta)<this.sizeImageLimit
      ) return "primary";
      return "secondary";
    },

    isEditorDisabledPergunta() {
      return this.charCount >= this.characterLimit;
    },

    isEditorDisabledResposta() {
      return this.charCount2 >= this.characterLimit;
    },

    isLimitReachedPergunta() {
      return this.charCount >= this.characterLimit;
    },

    isLimitReachedResposta() {
      return this.charCount2 >= this.characterLimit;
    },

    isLimitSizeImagePergunta(){
      return this.sizeImagePergunta >= this.sizeImageLimit;
    },
    isLimitSizeImageResposta(){
      return this.sizeImageResposta >= this.sizeImageLimit;
    },


    porcentagemLimitePergunta() {
      return (this.charCount / this.characterLimit) * 100
    },

    porcentagemLimiteResposta() {
      return (this.charCount2 / this.characterLimit) * 100
    }

  },

  components: {
    AlertCustom,
    ckeditor: CKEditor.component,
  },

  watch: {
    pergunta: function (newContent) {
      this.charCount = this.calculateCharCount(newContent);
      this.sizeImagePergunta = this.calculateSizeImage(newContent);
    },

    resposta: function (newContent) {
      this.charCount2 = this.calculateCharCount(newContent);
      this.sizeImageResposta = this.calculateSizeImage(newContent);
    },
  },

  data() {

    return {
      showModalRevisao: false,
      listaRevisaoCategoriaCorrente: [],
      pergunta: '',
      resposta: '',
      charCount: 0,
      charCount2: 0,
      sizeImagePergunta:0,
      sizeImageResposta:0,
      sizeImageLimit:20,
      characterLimit: 300, // Limite de caracteres desejado
      mostrarSucesso: false,
      carregando: false,
      transparencia: false,
      tituloFlashcard: null,
      htmlCard: '',
      categorias: [],
      questoes: [],
      categoria: {
        id: null,
        isLoading: false,
      },
      edicao: false,
      idCard: 0,
      novoAssunto: false,
      questao: {
        id: null,
        pergunta: '',
        resposta: '',
        categoriaId: null,
        isLoading: false
      },
      showDismissibleAlert: false,
      erroResponse: {},
      erroResponseSalvar: {},
      estaCarregando: false,
      editorConfig: {
        maxLines: 8,
        toolbar: [
          'fontSize',
          'fontFamily',
          'fontBackgroundColor',
          'fontColor',
          'alignment',
          '|',
          'bold',
          'italic',
          '|',
          'bulletedList',
          'numberedList',
          '|',
          'imageUpload',
          'imageStyle:alignLeft',
          'imageStyle:alignCenter',
          'imageStyle:alignRight',
          '|',
          'undo',
          'redo'

        ],
        fontSize: {
          options: [9, 10, 11, 12, 14, 'default', 18, 24, 36],
        },
        fontFamily: {
          options: [
            'default',
            'Arial, Helvetica, sans-serif',
            'Georgia, serif',
            'Impact, Charcoal, sans-serif',
            'Tahoma, Geneva, sans-serif',
            // Adicione mais opções de fonte conforme necessário
          ],
        },
        alignment: {
          options: ['left', 'center', 'right', 'justify'],
        },
        fontColor: {
          colors: [
            {
              color: 'black',
              label: 'Black',
            },
            {
              color: 'red',
              label: 'Red',
            },
            {
              color: 'blue',
              label: 'Blue',
            },
            {
              color: 'green',
              label: 'Green',
            },
            {
              color: 'orange',
              label: 'Orange',
            },

            // Adicione mais cores conforme necessário
          ],
        },
        fontBackgroundColor: {
          colors: [
            {
              color: '#FFFF00',
              label: 'Yellow',
            },
            {
              color: '#FF0000',
              label: 'Red',
            },
            {
              color: '#00FF00',
              label: 'Green',
            },
            // Adicione mais cores de fundo de texto conforme necessário
          ],
        },
        table: {
          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'image'],
        },
        image: {
          toolbar: ['imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight'],
          styles: ['alignLeft', 'alignCenter', 'alignRight'],
        },

      },
      editor: DecoupledDocumentEditor,
      questaoEspecial: {
        pergunta: '',
        resposta: '',
        id: null,
      }
    }
  },

  methods: {
    formatDate(date) {
      if (date) {
        return date.split('-')[2] + '/' + date.split('-')[1] + '/' + date.split('-')[0];
      }
    },

    async obterDatasRevisao() {

      if (this.categoria.id) {
        const usuario = this.$store.state.usuario
        await this.$http.get(`api/usuario/${usuario.idUser}/categoria/${this.categoria.id}/questao/datas`)
            .then((response) => {
              this.listaRevisaoCategoriaCorrente = response.data
                  .map(item => this.formatDate(item))
                  .sort((a, b) => {
                    const dateA = new Date(a);
                    const dateB = new Date(b);
                    return dateA - dateB;
                  });
            })
            .catch((response) => {
              this.erroResponse = Object.assign({}, response);
            });
      }
    },

    calculateSizeImage(text){
      const base64ImageMatches = text.match(/data:image\/[^;]+;base64[^"]+/g) || [];
      let imagemsize = 0;
      base64ImageMatches.forEach((base64Image) => {
        const img = new Image();
        img.onload = function () {
        };

        // Define o atributo 'src' da imagem para a representação base64
        img.src = base64Image;
        const base64Data = base64Image.split(',')[1];
        const bytes = atob(base64Data);
        const fileSizeInKB = bytes.length / 1024;
        //console.log('tamanho imagem...',fileSizeInKB);
        imagemsize = fileSizeInKB;

      });
      return imagemsize;
    },

    calculateCharCount(text) {
      // Remove as tags HTML para contar apenas o texto
      const textWithoutTags = text.replace(/<\/?[^>]+(>|$)/g, '');
      return textWithoutTags.length;
    },

    resetFormulario() {
      this.transparencia = false;
      this.questao = {
        id: null,
        categoriaId: null,
        pertunta: '',
        resposta: '',
        isLoading: false,
      }
    },

    verConteudo(q, index) {
      this.transparencia = true;
      this.pergunta = '';
      this.resposta = '';

      if (index != null) {
        const indice = Number(index) + 1
        this.tituloFlashcard = 'Flashcard ' + indice;
      } else this.tituloFlashcard = 'Novo Flashcard';

      if (q) {
        this.questao = Object.assign({}, q)
        if (q.pergunta) this.pergunta = q.pergunta;
        if (q.resposta) this.resposta = q.resposta;
      }
    },

    onReady(editor) {
      editor.ui.getEditableElement().parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
      );
    },
    showMsgBoxTwo(titulo, mensagem, funcao, objeto) {
      this.showDismissibleAlert = false;
      this.$bvModal.msgBoxConfirm(mensagem, {
        title: titulo,
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        cancelVariant: 'primary',
        okTitle: 'SIM',
        cancelTitle: 'NÃO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
          .then(value => {
            if (value && funcao == 'categoria') {
              this.removerCategoria()
            }

            if (value && funcao == 'questao') {
              this.deleteQuestao(objeto);
            }

          })
          .catch(err => {
            this.showDismissibleAlert = true;
            this.erroResponse = Object.assign({}, err);
          })
    },


    voltar() {
      if (this.edicao) {
        this.edicao = false;
        this.categoria = {};
      } else this.$router.push({name: 'home'});
    },

    async deleteQuestao(questao) {
      this.showDismissibleAlert = false;
      if (questao.id) {
        const idUser = this.$store.state.usuario.idUser;
        questao.isLoading = true;
        await this.$http.delete(`api/usuario/${idUser}/categoria/${questao.categoriaId}/questao/${questao.id}`)
            .then(() => {
              //this.getQuestoes(questao.categoriaId,true)
              questao.isLoading = false;
              const index = this.questoes.findIndex((i) => i.id === questao.id);
              if (index !== -1) {
                this.questoes.splice(index, 1);
              }
            }).catch((erro) => {
              this.showDismissibleAlert = true;
              this.erroResponse = Object.assign({}, erro);
              questao.isLoading = false;
            })
      }
    },

    async salvarQuestao() {
      this.showDismissibleAlert = false;
      this.carregando = true;
      this.questao.categoriaId = this.categoria.id;
      this.questao.categoria = this.categoria;
      this.questao.usuarioId = this.$store.state.usuario.idUser;
      this.questao.pergunta = this.pergunta;
      this.questao.resposta = this.resposta;
      this.questao.isLoading = true;

      if (this.questao.id) {
        if (this.questao.pergunta.length && this.questao.pergunta.length > 0 && this.questao.resposta.length && this.questao.resposta.length > 0) {
          await this.$http.put(`api/usuario/${this.questao.usuarioId}/questao`, this.questao)
              .then(() => {
                this.carregando = true;
                setTimeout(() => {
                  this.carregando = false;
                  this.mostrarSucesso = true;
                  // Após alguns segundos, redefina para exibir o formulário novamente
                  setTimeout(() => {
                    this.mostrarSucesso = false;
                  }, 1000); // Tempo em milissegundos (3 segundos)
                }, 20); // Tempo em milissegundos (2 segundos)
                this.questao.isLoading = false;
                const index = this.questoes.findIndex(item => item.id === this.questao.id);
                if (index !== -1) {
                  this.questoes[index] = {...this.questao};
                  this.getQuestoes(this.questao.categoriaId);
                }


              })
              .catch((erro) => {
                this.showDismissibleAlert = true;
                this.erroResponseSalvar = Object.assign({}, erro);
                this.questao.isLoading = false;
                this.carregando = false;
              })
        }
      } else {
        if (this.questao.pergunta.length && this.questao.pergunta.length > 0 && this.questao.resposta.length && this.questao.resposta.length > 0) {
          await this.$http.post(`api/usuario/${this.questao.usuarioId}/questao`, this.questao)
              .then((response) => {
                this.carregando = true;
                setTimeout(() => {
                  this.carregando = false;
                  this.mostrarSucesso = true;

                  // Após alguns segundos, redefina para exibir o formulário novamente
                  setTimeout(() => {
                    this.mostrarSucesso = false;
                  }, 1000); // Tempo em milissegundos (3 segundos)
                }, 200); // Tempo em milissegundos (2 segundos)
                this.questoes.push(
                    {
                      ...response.data,
                      isLoading: false
                    }
                );
                this.questao = {
                  id: null,
                  pergunta: '',
                  resposta: '',
                  categoriaId: null,
                  isLoading: false
                }
                this.resposta = '';
                this.pergunta = '';


              })
              .catch((erro) => {
                this.showDismissibleAlert = true;
                this.erroResponseSalvar = Object.assign({}, erro);
                this.questao.isLoading = false;
                this.carregando = false;
              })
        }
      }

    },

    novoAssuntoMethod() {
      this.novoAssunto = !this.novoAssunto;
    },

    async removerCategoria() {
      this.showDismissibleAlert = false;
      if (this.categoria.id) {

        await this.$http.delete(`api/usuario/${this.categoria.usuarioId}/categoria/${this.categoria.id}`)
            .then(() => {
              this.categoria = {isLoading: false};
              this.edicao = false;
              this.getCategorias();
            })
            .catch((erro) => {
              this.showDismissibleAlert = true;
              this.erroResponse = Object.assign({}, erro);
            })
      }
    },

    async salvarCategoria() {
      this.showDismissibleAlert = false;
      this.idCard = null;
      this.categoria.usuarioId = this.$store.state.usuario.idUser;
      this.categoria.isLoading = true;
      if (this.categoria.nome && this.categoria.id == null) {
        await this.$http.post("api/categoria", this.categoria)
            .then((response) => {
              const categoriaNova = {
                isLoading: false,
                ...response.data
              };
              this.categorias.push(categoriaNova)
              this.categoria = {isLoading: false};

              this.categoria.isLoading = false;
              this.novoAssunto = false;
            })
            .catch((erro) => {
              this.showDismissibleAlert = true;
              this.erroResponse = Object.assign({}, erro);
              this.categoria.isLoading = false;
              this.novoAssunto = false;

            });
      } else {
        if (this.categoria.nome) {

          await this.$http.put("api/categoria", this.categoria)
              .then(() => {
                this.categoria.isLoading = false;
                this.novoAssunto = false;
              }).catch((erro) => {
                this.showDismissibleAlert = true;
                this.erroResponse = Object.assign({}, erro);
                this.categoria.isLoading = false;
                this.novoAssunto = false;
              })
        }
      }
    },

    async getQuestoes(idCategoria) {
      this.showDismissibleAlert = false;
      const idUsuario = this.$store.state.usuario.idUser;
      await this.$http.get(`api/usuario/${idUsuario}/categoria/${idCategoria}/questao`).then((response) => {
        this.questoes = response.data.map((questao) => {
          return {...questao, isLoading: false};
        });
        this.estaCarregando = false;
      }).catch((erro) => {
        this.showDismissibleAlert = true;
        this.erroResponse = Object.assign({}, erro);
        this.estaCarregando = false;
      })
    },

    async editarCategoria(assunto) {
      assunto.isLoading = true;
      this.categoria = assunto
      this.questao.categoriaId = this.categoria.id;
      await this.getQuestoes(assunto.id)
      await this.obterDatasRevisao(assunto.id);
      assunto.isLoading = false;
      this.edicao = true;

    },

    async getCategorias() {
      this.showDismissibleAlert = false;
      this.estaCarregando = true;
      const usuario = this.$store.state.usuario;
      await this.$http.get(`api/usuario/${usuario.idUser}/categoria`).then((response) => {
        this.categorias = response.data.map((categoria) => {
          return {...categoria, isLoading: false};
        });
        this.estaCarregando = false;
        this.novoAssunto = false;
      }).catch((error) => {
        this.showDismissibleAlert = true;
        this.erroResponse = Object.assign({}, error);
        this.estaCarregando = false;
      });
    },
  },
  mounted() {
    this.getCategorias();
  },

  created() {


  },
  filters: {
    sanitizeContent: function (value, sanitize) {
      if (sanitize) {
        // Cria um elemento div temporário
        const tempDiv = document.createElement("p");
        tempDiv.innerHTML = value;

        // Remove tags <img> com formato base64
        const images = tempDiv.querySelectorAll("img[src^='data:']");
        images.forEach((img) => {
          img.remove();
        });

        // Retorna o texto resultante
        return tempDiv.textContent || tempDiv.innerText || "";
      } else {
        return value; // Retorna o valor sem alterações
      }
    },
  },
}

</script>

<style >

section{
   height: 100vh;
 }
.titulo-sidebar {
  position: fixed;
  top: 10px;
  left: 5px;
  color: #476493;
}

.btn-categoria {
  width: 5%;
  margin-left: 10px;
}

.char-count {
  color: blue;
  font-size: 10px;
}

.limit-message {
  color: red;
  font-size: 10px;
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(244, 245, 246, 0.8); /* Defina a opacidade desejada aqui */
  z-index: 1030; /* Coloque o z-index menor que o z-index do sidebar */
}

.btn-novo-flashcard {
  width: 200px;
  max-width: 100%;
  margin-left: 14px;
}

.sidebar-open {
  transform: translateX(0); /* Slide para a direita ao abrir */
}

.shadow {
  /* Suas outras propriedades ... */
  transition: box-shadow 0.3s ease-out;
}

.b-sidebar-outer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  overflow: visible;
  z-index: 1035;
}

.b-sidebar {
  display: flex;
  flex-direction: column;
  width: 485px;
  max-width: 100%;
  max-height: 100%;
  margin: 0;
  outline: 0;
  transform: translateX(0);
}

.b-sidebar {
  position: fixed;
  top: 0;
  height: 100vh;
  transition: transform 0.3s ease-out;

}

.shadow {
  box-shadow: 0 .5rem 1rem rgb(0, 0, 0, .15) !important;
  transition: transform 0.3s ease-out;
}

.b-sidebar > .b-sidebar-body {
  flex-grow: 1;
  height: 100%;
  overflow-y: auto;
}

.b-sidebar > .b-sidebar-header {
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: row;
  flex-grow: 0;
  align-items: center;
  color: #476493;
}

.b-sidebar:not(.b-sidebar-right) > .b-sidebar-header .close {
  margin-left: auto;
}

.b-sidebar > .b-sidebar-header .close {
  float: none;
  font-size: 1.5rem;
}

b-sidebar-header {
  color: #476493;
}

button.close {
  padding: 0;
  background-color: transparent;
  border: 0;
}

.close {
  float: right;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: .5;
}

.b-sidebar, .b-sidebar-backdrop {
  position: fixed;
  top: 0;
  height: 100vh;
}

.b-sidebar-backdrop {
  left: 0;
  z-index: -1;
  width: 100vw;
  opacity: .6;
}

.bg-secondary {
  background-color: #6c757d !important;
}

*, :after, :before {
  box-sizing: border-box;
}


.ck-content {
  display: block;
  border: 1px solid #cfdccf;
  align-content: center;
  background-color: white;

  height: 90%;
  border-radius: 0;
  margin-right: 0;
}

.ck.ck-editor__editable_inline {
  overflow: auto;
  padding: 0 var(--ck-spacing-standard);
  border: 1px solid #cfdccf;
}

.flashcard-editor {
  padding: 30px;
  display: block;
  border: 1px solid #cfdccf;
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

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0px;
  left: 0;
  width: 100%;
  height: 100%;
//background-color: rgba(255, 255, 255, 0.8); z-index: 9999;
}

.controle label {
  display: block;
  font-weight: bold;
}

.controle label + input, .controle textarea {
  width: 100%;
  font-size: inherit;
  border-radius: 5px
}


.col-especial-cadastro {
  display: block;
  border: 1px solid #cfdccf;
  align-content: center;
  background-color: #ffffff;
  cursor: pointer;
  min-width: 200px;

}

.col-especial-cadastro:hover {
  /*background-color: #f4f5f6;
  box-shadow: inset 0 0 1px 1px #b2caee;*/
  /*box-shadow: 0px 0px 3px 3px #a7a9af;*/
  box-shadow: 0px 0px 3px 3px #AAE3F9;
}

.resumo {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #FFF;
  background-clip: padding-box;
  border: 1px solid #ccd4da;
  -webkit-appearance: none;
  appearance: none;
  border-radius: 0;
  -moz-appearance: none;
  -webkit-transition: border-color .15s ease-in-out, webkit-box-shadow .15s ease-in-out;
  transition: border-color .15s ease-in-out, box-sahdow .15s ease-in-out;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out, -webkit-shadow .15s ease-in-out;
  text-align: left;
}

.resumo p {
  text-align: left;
}
</style>

<template>
  <div>
    <div>
      <div class="sidebar-overlay" v-if="transparencia"></div>

      <b-sidebar
          id="sidebar-1" shadow :title="tituloFlashcard"
          backdrop-variant="secondary"
          backdrop
          @hidden="transparencia=false"
      >
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
            <h5>Elabore a pergunta</h5>
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
            <div v-if="isLimitReachedPergunta" class="limit-message">
              Limite de caracteres alcançado!
            </div>
            <div v-else class="char-count">
              Tamanho: {{ charCount }} / {{ characterLimit }}
            </div>
          </div>
          <div class="row mt-4">
            <h5>Elabore a resposta</h5>
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
            <div v-if="isLimitReachedResposta" class="limit-message">
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
          <b-card-title >
            <b-row class="col-12">
              <div class="col-12 col-md-6">
                <b-form-input
                    placeholder="Qual é a matéria de estudo?"
                    v-model="categoria.nome"
                    style="border: 0; min-width:300px; "
                >
                </b-form-input>
              </div>
              <div class="col-12 col-md-6 d-flex justify-content-md-end justify-content-sm-start" >
                  <b-button variant="link" disabled class="btn-categoria">
                    <b-icon icon="share"></b-icon>
                  </b-button>
                  <b-button variant="link" disabled class="btn-categoria">
                    <b-icon icon="download"></b-icon>
                  </b-button>
                  <b-button variant="link" v-show="categoria.isLoading" disabled class="btn-categoria">
                    <i class="fas fa-spinner fa-pulse fa-3x" style="font-size: 14px;"></i>
                  </b-button>
                  <b-button variant="link" :disabled="categoria.isLoading"  class="btn-categoria">
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
          <b-card style="margin-left: 8px;margin-right: 8px;" class="mt-3" v-for="(q,index) in questoes" :key="index">
            <b-card-title class="d-flex justify-content-between">
              <div style="font-size: 16px; margin-left: 11px;color:dodgerblue">Flashcard {{ index + 1 }}:</div>
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
                <!--                <b-button variant="link" @click="salvarQuestao(q)" :disabled="q.isLoading">
                                  <b-icon icon="save"></b-icon>
                                </b-button>-->
              </div>
            </b-card-title>

            <b-row class="mt-2">
              <b-col class="col-3" align-self="center">
                P.
              </b-col>
              <b-col align-self="center">
                <!--              <b-form-input
                                  style="border: 0"
                                  placeholder="Adicione uma pergunta"
                                  class="col-especial-cadastro col-8 mt-2"
                                  v-model="q.pergunta"
                                  disabled
                              >
                              </b-form-input>-->
                <div class="resumo">
                  {{ q.pergunta | sanitizeContent(true) }}
                </div>
              </b-col>
              <b-col class="col-1"></b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col class="col-3" align-self="center">
                R.
              </b-col>
              <b-col class="col" align-self="center">
                <!--              <b-form-input
                                  placeholder="Adicione a resposta para a pergunta"
                                  class="col-especial-cadastro col-8"
                                  v-model="q.resposta"
                                  style="border: 0"
                                  disabled
                              >

                              </b-form-input>-->
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
<!--              <b-button variant="link" @click="novoAssuntoMethod">
                <b-icon icon="plus-circle"></b-icon>
              </b-button>-->
              <b-button disabled variant="link" @click="novoAssuntoMethod">
                <b-icon icon="upload"></b-icon>
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
                  icon = "plus-circle"
                  class="me-1"
              /> Novo Assunto
            </b-button>
          </b-row>
          <div >
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

  </div>

</template>

<script>
import AlertCustom from "../components/AlertCustom.vue";
import CKEditor from "@ckeditor/ckeditor5-vue2";
import DecoupledDocumentEditor from "ckeditor5-build-decoupled-document-base64-imageresize"

export default {
  computed: {
    btnSalvarEstado() {
      if (this.resposta && this.resposta.length > 0 && this.resposta.length <= 255 &&
          this.pergunta && this.pergunta.length > 0 && this.pergunta.length <= 255
      ) return false;
      return true;
    },

    btnSalvarVariant() {
      if (this.resposta && this.resposta.length > 0 && this.resposta.length <= 255 &&
          this.pergunta && this.pergunta.length > 0 && this.pergunta.length <= 255
      ) return "primary";
      return "secondary";
    },

    isEditorDisabledPergunta() {
      return this.charCount >= this.characterLimit;
    },

    isEditorDisabledResposta() {
      return this.charCount >= this.characterLimit;
    },

    isLimitReachedPergunta() {
      return this.charCount >= this.characterLimit;
    },

    isLimitReachedResposta() {
      return this.charCount2 >= this.characterLimit;
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
    },

    resposta: function (newContent) {
      this.charCount2 = this.calculateCharCount(newContent);
    },
  },

  data() {

    return {
      pergunta: '',
      resposta: '',
      charCount: 0,
      charCount2: 0,
      characterLimit: 255, // Limite de caracteres desejado
      mostrarSucesso: false,
      carregando: false,
      transparencia: false,
      tituloFlashcard: null,
      htmlCard: '',
      categorias: [],
      questoes: [],
      categoria: {
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
    calculateCharCount(text) {
      // Remove as tags HTML para contar apenas o texto
      /* const textWithoutTags = text.replace(/<\/?[^>]+(>|$)/g, '');
       const base64ImageMatches = text.match(/data:image\/[^;]+;base64[^"]+/g) || [];

       console.log(base64ImageMatches)

       const totalImageCharacters = base64ImageMatches.reduce((total, image) => {
         const imageData = image.split(',')[1]; // Obtém a parte da base64 após a vírgula
         return total + imageData.length;
       }, 0);
       //textWithoutTags.length +totalImageCharacters;*/
      return text.length;


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
            console.log(err);
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

    async salvarQuestao(questao) {
      this.showDismissibleAlert = false;
      this.carregando = true;
      this.questao.categoriaId = this.categoria.id;
      this.questao.categoria = this.categoria;
      this.questao.usuarioId = this.$store.state.usuario.idUser;
      this.questao.pergunta = this.pergunta;
      this.questao.resposta = this.resposta;
      this.questao.isLoading = true;
      console.log(questao)

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
                  }, 3000); // Tempo em milissegundos (3 segundos)
                }, 2000); // Tempo em milissegundos (2 segundos)
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
          console.log(this.questao)
          await this.$http.post(`api/usuario/${this.questao.usuarioId}/questao`, this.questao)
              .then((response) => {
                this.carregando = true;
                setTimeout(() => {
                  this.carregando = false;
                  this.mostrarSucesso = true;

                  // Após alguns segundos, redefina para exibir o formulário novamente
                  setTimeout(() => {
                    this.mostrarSucesso = false;
                  }, 3000); // Tempo em milissegundos (3 segundos)
                }, 2000); // Tempo em milissegundos (2 segundos)
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
                console.log(erro)
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
<style scoped>
.col {
  border: 0px dashed deeppink;
}
.row{
  border:0px dashed orange;
}
.btn-categoria{
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
  margin-left:14px;
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
}

.b-sidebar:not(.b-sidebar-right) > .b-sidebar-header .close {
  margin-left: auto;
}

.b-sidebar > .b-sidebar-header .close {
  float: none;
  font-size: 1.5rem;
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
  box-shadow: 0px 0px 3px 3px #a7a9af;
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

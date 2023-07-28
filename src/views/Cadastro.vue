<template>
  <div v-if="edicao" class="container">

    <div class="loader-container md-6 text-center mt-4"  v-if="estaCarregando" >
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
          <div>
            <b-form-input
                placeholder="Qual é a matéria de estudo?"
                v-model="categoria.nome"
                style="border: 0; min-width:300px; "
            >
            </b-form-input>
          </div>

          <div>
            <b-button variant="link" v-show="categoria.isLoading" disabled>
              <i class="fas fa-spinner fa-pulse fa-3x" style="font-size: 14px;"></i>
            </b-button>
            <b-button variant="link"  :disabled = "categoria.isLoading">
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
            <b-button variant="link" :disabled = "categoria.isLoading">
              <b-icon icon="save" @click="salvarCategoria()"></b-icon>
            </b-button>
          </div>
        </b-card-title>


        <b-card class="mt-1">

          <b-card-title class="d-flex justify-content-between">
            <div style="font-size: 16px; margin-left: 11px; color:dodgerblue">
              Novo flashcard :
            </div>

            <div>
              <b-button variant="link" disabled v-show="questao.isLoading">
                <i class="fas fa-spinner fa-pulse fa-2x ms-4" style="font-size: 14px;" />
              </b-button>
              <b-button variant="link" :disabled="questao.isLoading">
                <b-icon icon="save" @click="salvarQuestao()"></b-icon>
              </b-button>
            </div>
          </b-card-title>

          <b-row class="mt-2">
            <b-col class="col-3" align-self="center">
              P.
            </b-col>
            <b-col align-self="center">
              <b-form-input
                  style="border: 0"
                  placeholder="Adicione uma pergunta"
                  class="col-especial-cadastro col-8 mt-2"
                  v-model="questao.pergunta"
              >
              </b-form-input>
            </b-col>
            <b-col class="col-1"></b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col class="col-3" align-self="center">
              R.
            </b-col>
            <b-col class="col" align-self="center">
              <b-form-input
                  placeholder="Adicione a resposta para a pergunta"
                  class="col-especial-cadastro col-8"
                  v-model="questao.resposta"
                  style="border: 0"
              >
              </b-form-input>
            </b-col>
            <b-col class="col-1"></b-col>
          </b-row>
        </b-card>

        <b-card class="mt-1" v-for="(q,index) in questoes" :key="index">
          <b-card-title class="d-flex justify-content-between">
            <div style="font-size: 16px; margin-left: 11px;color:dodgerblue">Flashcard {{ index + 1 }}:</div>
            <div>
              <b-button variant="link" disabled v-show="q.isLoading">
                <i class="fas fa-spinner fa-pulse fa-2x ms-4" style="font-size: 14px;" ></i>
              </b-button>
              <b-button variant="link" :disabled="q.isLoading" @click="deleteQuestao(q)">
                <b-icon icon="trash" ></b-icon>
              </b-button>
              <b-button variant="link" @click="salvarQuestao(q)" :disabled="q.isLoading">
                <b-icon icon="save"></b-icon>
              </b-button>
            </div>
          </b-card-title>

          <b-row class="mt-2">
            <b-col class="col-3" align-self="center">
              P.
            </b-col>
            <b-col align-self="center">
              <b-form-input
                  style="border: 0"
                  placeholder="Adicione uma pergunta"
                  class="col-especial-cadastro col-8 mt-2"
                  v-model="q.pergunta"
              >
              </b-form-input>
            </b-col>
            <b-col class="col-1"></b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col class="col-3" align-self="center">
              R.
            </b-col>
            <b-col class="col" align-self="center">
              <b-form-input
                  placeholder="Adicione a resposta para a pergunta"
                  class="col-especial-cadastro col-8"
                  v-model="q.resposta"
                  style="border: 0"
              >

              </b-form-input>
            </b-col>
            <b-col class="col-1"></b-col>

          </b-row>


        </b-card>

      </b-card>
    </div>
  </div>
  <div v-else class="container">
    <div class="loader-container md-6 text-center mt-4"  v-if="estaCarregando" >
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
            <b-button variant="link" @click="novoAssuntoMethod">
              <b-icon icon="plus-circle"></b-icon>
            </b-button>

          </div>
        </b-card-title>

        <div>
          <b-row
              class="d-flex justify-content-lg-center "
              style="margin: 10px;"
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


</template>

<script>




import AlertCustom from "../components/AlertCustom.vue";

export default {
  computed: {

  },

  components: {
    AlertCustom

  },

  data() {

    return {
      categorias :[],
      questoes:[],
      categoria :{
        isLoading:false,
      },
      edicao:false,
      idCard : 0,
      novoAssunto:false,
      questao:{
        id:null,
        pergunta:null,
        resposta:null,
        categoriaId:null,
        isLoading:false
      },
      showDismissibleAlert:false,
      erroResponse:{},
      estaCarregando:false,
    }
  },

  methods: {

    showMsgBoxTwo(titulo,mensagem, funcao , objeto) {
      this.showDismissibleAlert=false;
      this.$bvModal.msgBoxConfirm(mensagem, {
        title: titulo,
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        cancelVariant:'primary',
        okTitle: 'SIM',
        cancelTitle: 'NÃO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
          .then(value => {
            if (value && funcao == 'categoria'){
              this.removerCategoria()
            }

            if (value && funcao == 'questao'){
              this.deleteQuestao(objeto);
            }

          })
          .catch(err => {
            console.log(err);
            this.showDismissibleAlert=true;
            this.erroResponse = Object.assign({},err);
          })
    },


    voltar(){
      if (this.edicao) {
        this.edicao = false;
        this.categoria = {};
      }

      else this.$router.push({name:'home'});
    },

    async deleteQuestao(questao){
      this.showDismissibleAlert=false;
      if (questao.id){
        const idUser = this.$store.state.usuario.idUser;
        questao.isLoading = true;
        await this.$http.delete(`api/usuario/${idUser}/categoria/${questao.categoriaId}/questao/${questao.id}`)
            .then(()=>{
              //this.getQuestoes(questao.categoriaId,true)
              questao.isLoading = false;
              const index = this.questoes.findIndex((i) => i.id === questao.id);
                if (index !== -1) {
                  this.questoes.splice(index, 1);
              }
            }).catch((erro)=>{
              this.showDismissibleAlert=true;
              this.erroResponse = Object.assign({},erro);
              questao.isLoading = false;
            })
      }
    },

    async salvarQuestao(questao){
      this.showDismissibleAlert=false;
      if (questao){
        console.log(questao)
        questao.isLoading = true
        if (questao.pergunta && questao.resposta && questao.id){
          questao.categoriaId = this.categoria.id
          questao.usuarioId = this.$store.state.usuario.idUser;

          await this.$http.put(`api/usuario/${questao.usuarioId}/questao`,questao)
              .then(()=>{
                questao.isLoading=false;
              })
              .catch((erro)=>{
                this.showDismissibleAlert=true;
                this.erroResponse = Object.assign({},erro);
                questao.isLoading=false;
              })
        }
      }
      if (this.questao.pergunta && this.questao.resposta){
        this.questao.categoria = this.categoria
        this.questao.categoriaId = this.categoria.id
        this.questao.usuarioId = this.$store.state.usuario.idUser;
        this.questao.isLoading = true;
        await this.$http.post(`api/usuario/${this.questao.usuarioId}/questao`,this.questao)
            .then((response)=>{
              this.questoes.push(
                  {
                    ...response.data,
                    isLoading:false
                  }
              );
              this.questao = {
                id:null,
                pergunta:null,
                resposta:null,
                categoriaId:null,
                isLoading:false
              }
            })
            .catch((erro)=>{
              this.showDismissibleAlert=true;
              this.erroResponse = Object.assign({},erro);
              this.questao.isLoading=false;
            })
      }
    },

    novoAssuntoMethod(){
      this.novoAssunto=!this.novoAssunto;
    },

    async removerCategoria(){
      this.showDismissibleAlert=false;
      if (this.categoria.id){

        await this.$http.delete(`api/usuario/${this.categoria.usuarioId}/categoria/${this.categoria.id}`)
            .then(()=>{
              this.categoria = {isLoading: false};
              this.edicao =false;
              this.getCategorias();
            })
            .catch((erro)=>{
              this.showDismissibleAlert=true;
              this.erroResponse = Object.assign({},erro);
            })
      }
    },

    async salvarCategoria() {
      this.showDismissibleAlert=false;
      this.idCard = null;
      this.categoria.usuarioId = this.$store.state.usuario.idUser;
      this.categoria.isLoading = true;
      if (this.categoria.nome && this.categoria.id ==null) {
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
              this.showDismissibleAlert=true;
              this.erroResponse = Object.assign({},erro);
              this.categoria.isLoading = false;
              this.novoAssunto = false;

            });
      }
      else{
        if (this.categoria.nome){

          await this.$http.put("api/categoria",this.categoria)
              .then(()=>{
                this.categoria.isLoading = false;
                this.novoAssunto = false;
              }).catch((erro)=>{
                this.showDismissibleAlert=true;
                this.erroResponse = Object.assign({},erro);
                this.categoria.isLoading = false;
                this.novoAssunto =false;
              })
        }
      }
    },

    async getQuestoes(idCategoria ){
      this.showDismissibleAlert=false;
      const idUsuario = this.$store.state.usuario.idUser;
      await this.$http.get(`api/usuario/${idUsuario}/categoria/${idCategoria}/questao`).then((response)=>{
        this.questoes = response.data.map((questao) => {
          return { ...questao, isLoading: false };
        });
        this.estaCarregando=false;
      }).catch((erro)=>{
        this.showDismissibleAlert=true;
        this.erroResponse = Object.assign({},erro);
        this.estaCarregando=false;
      })
    },

    async editarCategoria(assunto){
      assunto.isLoading =true;
      this.categoria = assunto
      this.questao.categoriaId = this.categoria.id;
      await this.getQuestoes(assunto.id)
      assunto.isLoading =false;
      this.edicao = true;

    },

    async getCategorias(){
      this.showDismissibleAlert=false;
      this.estaCarregando=true;
      const usuario = this.$store.state.usuario;
      await this.$http.get(`api/usuario/${usuario.idUser}/categoria`).then((response)=>{
        this.categorias = response.data.map((categoria)=>{
          return {...categoria,isLoading:false};
        });
        this.estaCarregando=false;
        this.novoAssunto=false;
      }).catch((error) => {
        this.showDismissibleAlert=true;
        this.erroResponse = Object.assign({},error);
        this.estaCarregando=false;
      });
    },
  },
  mounted() {
    this.getCategorias();
  },

  created() {


  }
}

</script>
<style scoped>


.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0px;
  left: 0;
  width: 100%;
  height: 100%;
  //background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
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
  cursor:pointer;
  min-width: 200px;

}
.col-especial-cadastro:hover{
  /*background-color: #f4f5f6;
  box-shadow: inset 0 0 1px 1px #b2caee;*/
  box-shadow: 0px 0px 3px 3px #a7a9af;
}

</style>

<template>
  <div v-if="edicao" class="container">
    <b-row class="d-flex justify-content-between ml-4">
      <b-button style="max-width: 10px; margin-left: 0px" variant="link" @click="voltar">
        <b-icon icon="arrow-left" >
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
          <b-button variant="link" >
            <b-icon icon="trash" @click="removerCategoria"></b-icon>
          </b-button>
          <b-button variant="link" >
            <b-icon icon="save" @click="salvarCategoria()"></b-icon>
          </b-button>
        </div>
      </b-card-title>



      <b-card class="mt-1" >

        <b-card-title class="d-flex justify-content-between">
          <div style="font-size: 16px; margin-left: 11px; color:dodgerblue" >Novo flashcard :</div>
          <div>
            <b-button variant="link" >
              <b-icon icon="trash" ></b-icon>
            </b-button>
            <b-button variant="link" >
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
        </b-row >
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
        <b-card-title class="d-flex justify-content-between" >
          <div style="font-size: 16px; margin-left: 11px;color:dodgerblue">Flashcard {{index+1}}:</div>
          <div>
            <b-button variant="link">
              <b-icon icon="trash" @click="deleteQuestao(q)"></b-icon>
            </b-button>
            <b-button variant="link" @click="salvarQuestao(q)">
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
        </b-row >
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
  <div v-else class="container">
    <b-row class="d-flex justify-content-between ml-4">
      <b-button style="max-width: 10px; margin-left: 0px" variant="link" @click="voltar">
        <b-icon icon="arrow-left" >
        </b-icon>
      </b-button>
    </b-row>
    <b-card>
      <b-card-title class="d-flex justify-content-between">
        <div style="font-size: 16px; margin-left: 11px;margin-top: 7px" >Assuntos de estudo:</div>
        <div>
          <b-button   variant="link" @click="novoAssuntoMethod">
            <b-icon icon="plus-circle"></b-icon>
          </b-button>

        </div>
      </b-card-title>

      <div >
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
                <b-button variant="link" class="primary" @click="salvarCategoria">
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
            <b-card-text > {{ cat.nome }} </b-card-text>
          </b-card>
        </b-row>

      </div>

    </b-card>
  </div>


</template>

<script>




export default {
  computed: {

  },

  components: {

  },

  data() {

    return {
      categorias :[],
      questoes:[],
      categoria :{},
      edicao:false,
      idCard : 0,
      novoAssunto:false,
      questao:{
        id:null,
        pergunta:null,
        resposta:null,
        categoriaId:null
      }
    }
  },

  methods: {

    voltar(){
      if (this.edicao) this.edicao = false;
      else this.$router.push({name:'home'});
    },

    listaCategoriaSair(){

    },

    selecaoCategoriaSair(){
      this.edicao = !this.edicao;
      this.categoria = {}
      this.questao = {
        id:null,
        pergunta:null,
        resposta:null,
        categoriaId:null
      }
    },
    async deleteQuestao(questao){
      console.log('questao:',questao);
      if (questao.id){
        await this.$http.delete(`api/questao/${questao.id}`)
            .then(()=>{
              this.getQuestoes(questao.categoriaId)
            }).catch((erro)=>{
              console.log(erro)
            })
      }
    },

    async salvarQuestao(questao){
      if (questao){
        console.log(questao)
        if (questao.pergunta && questao.resposta && questao.id){
          questao.categoriaId = this.categoria.id
          await this.$http.put(`api/questao`,questao)
              .then((response)=>{
                console.log(response.data)
              })
              .catch((erro)=>{
                console.log(erro)
              })
        }
      }
      if (this.questao.pergunta && this.questao.resposta){
        this.questao.categoria = this.categoria
        this.questao.categoriaId = this.categoria.id
        await this.$http.post(`api/questao`,this.questao)
            .then((response)=>{
              this.questoes.push(response.data)
              this.questao = {
                id:null,
                pergunta:null,
                resposta:null,
                categoriaId:null
              }
            })
            .catch((erro)=>{
              console.log(erro)
            })
      }
    },

    novoAssuntoMethod(){
      this.novoAssunto=!this.novoAssunto;
    },
    editarAssunto2(cat) {
      this.edicao = true;
      this.idCard = cat.id;
      this.$nextTick(() => {
        this.$refs.title.focus();
      });
    },

    async removerCategoria(){
      if (this.categoria.id){
        await this.$http.delete(`api/categoria/${this.categoria.id}`)
            .then(()=>{
              this.categoria = {}
              this.edicao =false;
              this.getCategorias();
            })
            .catch((erro)=>{console.log(erro)})
      }
    },

    async salvarCategoria() {
      this.idCard = null;
      this.novoAssunto = !this.novoAssunto;
      this.categoria.usuarioId = this.$store.state.usuario.id;
      if (this.categoria.nome && this.categoria.id ==null) {
        await this.$http.post("api/categoria", this.categoria)
            .then((response) => {
              this.categoria = response.data
              console.log('para salvar :', this.categoria);
              this.categorias.push(this.categoria)
            })
            .catch((erro) => {
              console.log(erro)
            });
      }
      else{
        if (this.categoria.nome){
          await this.$http.put("api/categoria",this.categoria)
              .then((response)=>{
                console.log(response)
              }).catch((erro)=>{
                console.log(erro)
              })
        }
      }
    },

    async getQuestoes(idCategoria){
      await this.$http.get(`api/categoria/${idCategoria}/questao`).then((response)=>{
        this.questoes = response.data;
      }).catch((erro)=>{
        console.log(erro)
      })
    },

    async editarCategoria(assunto){
      this.categoria = assunto
      this.edicao = true;
      this.questao.categoriaId = this.categoria.id;
      await this.getQuestoes(assunto.id)

    },

    async getCategorias(){
      const usuario = this.$store.state.usuario
      console.log('Usuario !!',usuario)
      await this.$http.get(`api/usuario/${usuario.id}/categoria`).then((response)=>{
        this.categorias = response.data
      }).catch((error) => {
        console.log(error);
      });

    },

    async createCategoria(){
      await this.$http.post("api/categoria").then((response)=>{
        this.categoria = response.data
      });
    }

  },
  mounted() {
    this.getCategorias();
  },

  created() {


  }
}

</script>
<style scoped>

.centralizado {
  text-align: center;
}
.controle {
  font-size: 1.2em;
  margin-bottom: 20px;

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

.centralizado {
  text-align: center;
}

.assunto{
  width: 300px;
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
.row {
  border: 0px dashed;
}


</style>
>
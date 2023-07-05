<template>
  <div class="container">
    <!-- Listagem de Cateogorias -->
    <b-row
        class="d-flex justify-content-lg-center col-12 "
        style="margin-left: 1px; margin-top: 40px;"
        v-if="!categoriaSelecionada"
    >
      <b-row class="d-flex justify-content-center  ">
        <h4 class="text-center">Escolha a matéria de estudos</h4>
      </b-row>

      <div
          class="col-especial text-center mt-2 linha"
          @click = "selectTopico(categoria.id)"
          v-for="categoria in categorias"
          :key="categoria.id"
      >
        <div style="margin: 40px">
          <em>{{categoria.nome}}</em>
        </div>
      </div>

    </b-row>

    <!-- Listagem de erros e acertos-->
    <b-row v-else-if="questionarioConcluido" style="margin-top: 150px;" >
      <b-row class="col-md-12" style="margin-left: 0">
        <h5 class="text-center">{{mensagemFinalizacao}} {{nomeUsuario}}</h5>
      </b-row>
      <b-row class="col-md-12 " style="margin-left: 0">
          <b-row class="d-flex justify-content-center " style="margin: 0">
            <p class="text-center" >Repostas corretas:</p>
            <p class="text-center" style="font-size: 24px; margin: 0;"> {{acertos}} </p>
          </b-row>
      </b-row>

      <b-row clas="col-12 d-flex justify-content-center mt-4" style="margin:0" >
        <b-col v-show="listErro.length>0">
          <b-row
              class="d-flex justify-content-end"
              style="margin: 5px;"
          >
            <b-button
                variant = "secondary"
                style="width: 150px; margin:10px"
                @click  = "corrigirErros"
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
        style="margin-top: 150px"
    >
      <b-row class="col-md-12 mt-4">
        <h5 class="text-center">{{ questao.pergunta }}</h5>
      </b-row>
      <b-row class="col-md-12 " >
          <div v-if="!respondeu">
            <b-row class="d-flex justify-content-center">
              <div class="flashcard"  @click="respondeu=true">
                <b-row class="d-flex text-center" style="margin-top: 80px" >
                  <strong>?</strong>
                </b-row>
              </div>
            </b-row>
          </div>

          <div v-else>
            <b-row class="d-flex justify-content-center">

              <div class="flashcard"
                     :class="{
                      'flashcard-acertou': acertou,
                      'erro': errou}"
                >
                  <b-row class="d-flex justify-content-start resposta" v-if="questao.resposta.length<170">
                    <strong>{{questao.resposta}}</strong>
                  </b-row>

                  <div class="resposta" v-else>
                      <strong>{{questao.resposta}}</strong>
                  </div>
                </div>

              <b-row clas="col-12 d-flex justify-content-center mt-4" >
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
                        variant = "danger"
                        @click="proximaPergunta(questao,false)"
                        class="errou-button"
                    >
                      Errou!
                    </b-button>
                  </b-row>
                </b-col>
              </b-row>
            </b-row >
          </div>

      </b-row>
    </b-row>



  </div>
</template>

<script>
export default {

  components: {

  },

  data() {

    return {
      categorias:[],
      categoriaSelecionada:false,
      listPergunta : [],
      listAcerto :[],
      listErro:[],
      respondeu:false,
      questao:{
        id:null,
        pergunta:null,
        resposta:null,
        acerto:null,
        categoriaId:null,
      },
      questionarioConcluido:false,
      qtdPerguntas:null,
      acertou:null,
      errou:null,
    }
  },

  computed: {

    acertos(){
      return this.listAcerto.length+"/"+this.qtdPerguntas;
    },

    mensagemFinalizacao(){
      if (this.listAcerto.length && this.qtdPerguntas){
        if ((this.listAcerto.length / this.qtdPerguntas) > 0.8 )return 'Fantástico,'
        if ((this.listAcerto.length / this.qtdPerguntas) > 0.6 )return 'Muito bem,'
        if ((this.listAcerto.length / this.qtdPerguntas) <=  0.6 )return 'Continue praticando,'
      }
      return 'OK,'
    },

    nomeUsuario(){
      return `${this.$store.state.usuario.firstName}!`;
    }
  },

  methods: {
    async getCategorias(){
      const usuario = this.$store.state.usuario
      console.log('Usuario !!',usuario)
      await this.$http.get(`api/usuario/${usuario.idUser}/categoria`).then((response)=>{
        this.categorias = response.data
      }).catch((error) => {
        console.log(error);
      });

    },

    selectTopico(idCategoria){
      console.log(idCategoria)
      this.categoriaSelecionada = true;
      this.getPergunta(idCategoria);
    },

    async getPergunta(idCategoria){
      await this.$http.get(`api/categoria/${idCategoria}/questao`).then((response)=>{
        console.log(response);
        this.listPergunta = response.data;
        this.qtdPerguntas = this.listPergunta.length
        this.questao = this.listPergunta.pop();

      })
    },

    async proximaPergunta(questao, acerto){
      //await this.$http.put(``)

      questao.acerto = acerto
      if (acerto) {
        this.acertou = true
        this.errou = false
      }else{
        this.acertou = false
        this.errou = true
      }
      setTimeout(()=>{
        if (this.questao.acerto) this.listAcerto.push(questao)
        else this.listErro.push(questao);

        if (this.listPergunta.length>0) {
          this.questao = this.listPergunta.pop();
        }
        else this.questionarioConcluido = true
        console.log('aproveitamento :', this.listAcerto.length / this.qtdPerguntas)

        this.respondeu=false;
        this.acertou=null
        this.errou =null
      },300)
      console.log('atualizacao de questao antes da proxima pergunta!!!',questao)

    },

    corrigirErros(){
      this.listPergunta =[];
      this.listAcerto =[];
      this.qtdPerguntas = this.listErro.length;
      this.listPergunta = Object.assign([],this.listErro);
      this.listErro=[];
      this.questao = this.listPergunta.pop();
      this.questionarioConcluido = false;
    },

    voltarParaCategorias(){
      this.listPergunta =[];
      this.listAcerto =[];
      this.qtdPerguntas = null;
      this.listPergunta = [];
      this.listErro=[];
      this.questao={
            id:null,
            pergunta:null,
            resposta:null,
            acerto:null,
            categoriaId:null,
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

.linha{
  width: 50%;

}
.acertou-button {
  background-color: rgba(0, 255, 0, 0.3);
  width: 100px;
  margin: 10px;
  color:#222;
}

.errou-button {
  background-color: rgba(255, 0, 0, 0.3);
  color:#222;
  width: 100px;
  margin: 10px;
}

.pergunta {
  text-align:center;
  word-wrap: break-word;
}

.resposta {
  height: 50px;
  margin-top: 30px;
  text-align: justify;
  word-wrap: break-word;
  font-size: 16px;
}
.card-resposta{
  display: block;
  border: 1px solid #cfdccf;
  align-items: center;
  background-color: #ffffff;
  cursor:pointer;
  height: 200px;
  max-width: 300px;
  min-width: 300px;

}

.card-resposta :hover{
  box-shadow: 0px 0px 3px 3px #a7a9af;
}

body{
  background-color: #e2e8e2;
}
.layout {
  margin:40px
}

.col-especial {
  display: block;
  border: 1px solid #cfdccf;
  align-content: center;
  background-color: #ffffff;
  cursor:pointer;
  margin: 30px;
  max-width: 350px;
  min-width: 350px;

}

.col-especial:hover{
  /*background-color: #f4f5f6;
  box-shadow: inset 0 0 1px 1px #b2caee;*/
  box-shadow: 0px 0px 3px 3px #a7a9af;
}

.flashcard {
  display: block;
  border: 1px solid #cfdccf;
  align-content: center;
  background-color: #ffffff;
  cursor:pointer;
  margin: 30px;
  max-width: 400px;
  min-width: 300px;
  height: 200px;

}

.flashcard:hover{
  /*background-color: #f4f5f6;
  box-shadow: inset 0 0 1px 1px #b2caee;*/
  box-shadow: 0px 0px 3px 3px #a7a9af;
}


.centralizado {
  margin-top: 150px;

  text-align: center;
}
.col {
  border:0px dashed red;
}
.row {
  border:0px dashed blue;
}

.flashcard-acertou {
  border: 2px solid #32cd32; /* Cor verde para as bordas */
  transition: border-color 0.3s ease; /* Transição suave das bordas */
}
.erro {
  border: 2px solid #ff0000; /* Cor vermelha para as bordas */
  transition: border-color 0.3s ease; /* Transição suave das bordas */
}
@media screen and (max-width: 960px) {
  .linha {
    width: 100%;

  }

  .col-especial {
    display: block;
    border: 1px solid #cfdccf;
    text-align: center;
    background-color: #ffffff;
    cursor:pointer;
    max-width: 87%;
    min-width: 85%;
  }

  .row{
    border: 0px dashed gray;
  }

  .col{
    border: 0px dashed red;
  }

}
</style>
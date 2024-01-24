<template>
  <section>
    <div >

      <b-card no-body>

        <b-tabs
            pills
            card
            vertical
            style="height: 90vh;background-color: whitesmoke"
        >

          <b-tab v-for="(item,index) in listaCadastro" :key="index" :title="item.nomeCategoria" @click="handlerTab(item)">
            <b-card-text  >
              <div class="container">
                <h4 class="ms-2 mt-4 mb-4 d-flex justify-content-start">{{item.nomeCategoria}}</h4>
                <b-row class="col-12 d-flex justify-content-center mb-3 ">
                  <b-col class="col-lg-4 col-12 mt-3">
                    <b-card
                        class="ms-2"
                        bg-variant="white"
                        style="width: 100%;height: 150px; border-radius: 0">
                      <b-card-title >Questões</b-card-title>

                      <b-card-body>
                        <div class="container d-flex flex-column align-content-center justify-content-center mt-1" >
                          <h3 class="d-flex justify-content-center">{{ item.totalQuestoes }}</h3>
                        </div>
                      </b-card-body>
                    </b-card>
                  </b-col>
                  <b-col class="col-lg-4 col-12 mt-3">
                    <b-card
                        class="ms-2"
                        bg-variant="white"
                        style="width: 100%;height: 150px;border-radius: 0">
                      <b-card-title>Proficiência</b-card-title>
                      <b-card-body>
                        <div class="container d-flex flex-column align-content-center justify-content-center mt-1" >
                          <h4 class="d-flex justify-content-center">{{ item.nivel }}</h4>
                        </div>
                      </b-card-body>
                    </b-card>
                  </b-col>
                  <b-col class="col-lg-4 col-12 mt-3">
                    <b-card
                        class="ms-2"
                        bg-variant="white"
                        style="width: 100%;height: 150px;border-radius: 0">
                      <b-card-title>Aproveitamento</b-card-title>
                      <b-card-body>
                        <div class="container d-flex flex-column align-content-center justify-content-center mt-1" >
                          <h4 class="d-flex justify-content-center">{{aproveitamento}} </h4>
                        </div>
                      </b-card-body>
                    </b-card>
                  </b-col>
                  <!--
                  <b-col class="col-lg-3 col-12 mt-3">
                    <b-card
                        class="ms-2"
                        bg-variant="white"
                        style="width: 100%;height: 150px;border-radius: 0">
                      <b-card-title>Maior Atraso</b-card-title>
                      <b-card-body>
                        <div class="container d-flex flex-column align-content-center justify-content-center mt-1" >
                          <h4 class="d-flex justify-content-center">Moderado</h4>
                        </div>
                      </b-card-body>
                    </b-card>
                  </b-col>
                -->

                </b-row>
                <b-row class="col-12 d-flex justify-content-center mb-3">
                  <b-col class="col-lg-6 col-sm-12 mt-3"><lines-chart :performance="acertosCategoria" :key="item.idCategoria"/></b-col>
                  <b-col class="col-lg-6 col-sm-12 mt-3"><donut-chart :contagem="extrairContagem(item)"/></b-col>
                </b-row>
              </div>
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>

  </section>

</template>
<style>
.card-title{
  font-size: 17px;
  color: #1e5f9b;
}
h1,h2,h3,h4{
  color: #1e5f9b;
}
.row{
  border: 0px dashed red;
}
.col{
  border: 0px dashed blue;

}

section {
  padding-top: 75px;
}

</style>

<script>

import DonutChart from "../components/DonutChart.vue";
import LinesChart from '../components/LinesChart.vue';
export default {
    components:{
      DonutChart,
      LinesChart,
    },
    data() {
        return {
          listaCadastro:[],
          listaCategoriaAcertos:[],
          isMobile: false,
          proficiencia:['Iniciante','Básico','Intermediário','Avançado','Fluente'],
          aproveitamento:['Baixo','Regular','Bom','Excelente'],
          ritmo:['Baixo','Moderado','Intenso'],
          quantidadeQuestao:0,
          contagem:{
            labels:[],
            data:[]
          },

          acertosCategoria:{
            acertos:null,
            etapa:null,
            tentativas:null,
            aproveitamento:null
          }
        };
    },

    methods:{

      extrairContagem(item){

        let contagem = {
          labels:[],
          data:[]
        }
        if(item.etapa0){
          contagem.labels.push('Etapa 0')
          contagem.data.push(item.etapa0)
        }
        if(item.etapa1){
          contagem.labels.push('Etapa 1')
          contagem.data.push(item.etapa1)
        }
        if(item.etapa2){
          contagem.labels.push('Etapa 2')
          contagem.data.push(item.etapa2)
        }
        if(item.etapa3){
          contagem.labels.push('Etapa 3')
          contagem.data.push(item.etapa3)
        }
        if(item.etapa4){
          contagem.labels.push('Etapa 4')
          contagem.data.push(item.etapa4)
        }
        if(item.etapa5){
          contagem.labels.push('Etapa 5')
          contagem.data.push(item.etapa5)
        }
        if(item.etapa6){
          contagem.labels.push('Etapa 6')
          contagem.data.push(item.etapa6)
        }
        return contagem;
      },

      obterAproveitamento(acertoCategoria){
        if (acertoCategoria && acertoCategoria.acertosPorEtapa){
          let cont  = 0
          let ap = 0
          let media = 0 
          acertoCategoria.acertosPorEtapa.forEach((e)=>{
          cont++;
            ap = ap+e.aproveitamento
            
          })
          if (cont>0){
            media = (ap / cont)
            console.log('media:',media)
          
            if (media <= 6) this.aproveitamento =  'Baixo';
            if (media >6 && media <=7) this.aproveitamento =  'Regular'
            if (media>7 && media<=8) this.aproveitamento =  'Bom'
            if (media>8 && media<=9) this.aproveitamento =  'Muito Bom' 
            if (media>9 ) this.aproveitamento =  'Excelente' 
          }
          else this.aproveitamento=""
          
           
        }
        else this.aproveitamento =  "";
      },

      checkMobile() {
        // Verificar o tamanho da tela e atualizar isMobile
        this.isMobile = window.innerWidth <= 768; // 768px é um ponto de quebra comum para dispositivos móveis
      },

      getListaCadastro(){
            const usuario = this.$store.state.usuario
            this.$http.get(`/api/usuario/${usuario.idUser}/categoria/etapas`).then((response)=>{
                this.listaCadastro = Object.assign([],response.data);
            }).catch(()=>{

            })
        },

      handlerTab(item){
        if (item && item.idCategoria && item.idCategoria !==null) {
          this.acertosCategoria = this.listaCategoriaAcertos.filter(e=>
            e.idCategoria == item.idCategoria
          )[0];


        }
      },
      async getListaCategoriaAcertos(lista) {
        for (let e of lista) {
          await this.getAcertosPorCategoria(e);
        }
        let copiaLista = [...this.listaCategoriaAcertos];
        this.acertosCategoria = Object.assign({},copiaLista[0]);
        
      },

      async getAcertosPorCategoria(item){

        const usuario = this.$store.state.usuario;
        await this.$http.get(`api/usuario/${usuario.idUser}/categoria/${item.idCategoria}/acertos`).then((response)=>{
          let acertosCategoria = {
            idCategoria:item.idCategoria,
            acertosPorEtapa: response.data
          }
          this.listaCategoriaAcertos.push(acertosCategoria);
          

        }).catch(()=>{

        })
      },

    },
    watch:{
      listaCadastro: function (newContent) {
       this.getListaCategoriaAcertos(newContent);
      },

      acertosCategoria:function(newContent){
        this.obterAproveitamento(newContent)
      },

    },
    async mounted() {
      await this.getListaCadastro();
    },

    created() {
      // Verificar se o usuário está em um dispositivo móvel
      this.checkMobile();
      // Adicionar um ouvinte de redimensionamento para verificar continuamente
      window.addEventListener('resize', this.checkMobile);
    },
    beforeDestroy() {
      // Remover o ouvinte de redimensionamento ao destruir o componente
      window.removeEventListener('resize', this.checkMobile);
    },
}
</script>

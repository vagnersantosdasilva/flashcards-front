<template>
  <section >
    <div class="container">
      <b-row class="d-flex justify-content-lg-center col-12 ">
        <h3 class="centralizado"></h3>

      </b-row>
      <b-row class="d-flex justify-content-lg-center col-12">
        <div class="col-especial text-center linha">
          <router-link to="questao">
            <b-row style="margin: 20px">
              <b-col class="col-12 col-md-3" align-self="center">


                <img src="../assets/estudante.jpg" height="50" width="50"/>
                <!--<img src="../assets/3813681.png" height="50" width="50"/>-->
              </b-col>

              <b-col class="col-12 col-md-9 ml-3" align-self="center">
                <em>Estudar Agora</em>
              </b-col>
            </b-row>
          </router-link>
        </div>
      </b-row>
      <b-row class="d-flex justify-content-lg-center col-12 mt-1">

        <div class="col-especial text-center linha">
          <router-link to="cadastro">
            <b-row style="margin: 20px">
              <b-col class="col-12 col-md-3">

                <img src="../assets/configurar.jpg" height="50" width="50"/>
                <!-- <img src="../assets/1792388.png" height="50" width="50"/>-->
              </b-col>
              <b-col class="col-12 col-md-9 ml-3" align-self="center">
                <em>Gerenciar Cartões...</em>
              </b-col>
            </b-row>
          </router-link>
        </div>
      </b-row>

    </div>


  </section>
</template>
<script>


import {decode} from "jsonwebtoken";

export default {
  computed: {},

  components: {},

  data() {

    return {
    }
  },

  methods: {


  },
  mounted() {
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
    }
  },
}

</script>


<style scoped>
.adsensestyle{
  background: transparent;
  padding-top:60px;
  text-align: center;
  border: 1px dashed;
  margin-top: 20px;
  margin-left: 10px;
}
section {
  padding-bottom: 100px;
  padding-top: 100px;
  height: 100vh;
}

body {
  background-color: #CCC;
}

.linha {
  width: 35%;

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

.pergunta {
  text-align: center;
  word-wrap: break-word;
}

.resposta {
  height: 50px;
  margin-top: 80px;
  text-align: center;
  word-wrap: break-word;
  font-size: 16px;
}

.card-resposta {
  display: block;
  border: 1px solid #cfdccf;
  align-items: center;
  background-color: #ffffff;
  cursor: pointer;
  height: 200px;
  max-width: 300px;
  min-width: 300px;

}

.card-resposta :hover {
  box-shadow: 0px 0px 3px 3px #a7a9af;
}


.layout {
  margin: 40px
}

.col-especial {
  display: block;
  border: 1px solid #cfdccf;
  align-content: center;
  background-color: #ffffff;
  cursor: pointer;
  min-width: 230px;
  margin-left: 10px;

}

.col-especial:hover {
  /*background-color: #f4f5f6;
  box-shadow: inset 0 0 1px 1px #b2caee;*/
  box-shadow: 0px 0px 3px 3px #AAE3F9;
}


.centralizado {
  margin-top: 150px;

  text-align: center;
}

@media screen and (max-width: 960px) {
  .linha {
    width: 100%;

  }

  .col-especial {
    margin-left: 10px;
    border: 1px solid #cfdccf;
    align-content: center;
    background-color: #ffffff;
    cursor: pointer;
    min-width: 300px;
  }

  .row {
    border: 0px dashed gray;
  }

  .col {
    border: 0px dashed red;
  }

}
</style>
<script>
</script>
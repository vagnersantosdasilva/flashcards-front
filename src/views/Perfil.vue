<template>
  <section class="d-flex flex-column justify-content-center align-items-center">
    <div class="container">
      <b-row>
        <b-card class="mt-4 w-100" style="border-radius: 0;">
          <b-card-title style="font-size: 20px; ">
            Informações de acesso:
          </b-card-title>
          <b-card-body>
            <b-row>
              <b-col class="col-12 col-md-6">
                <b-card-text><b>Username :</b> {{ usuario.username }}</b-card-text>
                <b-card-text><b>ID:</b> {{ usuario.idUsuario }}</b-card-text>
              </b-col>
              <b-col
                  class="col-12 col-md-6 d-flex justify-content-end"
                  align-self="end"
              >
                <b-button
                    variant="secondary"
                    class="col-12 col-md-6 mt-2 align-content-end"
                    style="height: 60px;border-radius: 0"
                    @click="$router.push('resetPrivado')"
                > Alterar Senha
                </b-button>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-row>

      <b-row>
        <b-card class="mt-4 w-100" style="border-radius: 0;">
          <b-card-title style="font-size: 20px; color:gray;">
            Plano:
          </b-card-title>
          <b-card-body>
            <b-row style="color: gray">
              <b-col class="col-12 col-md-6">
                <b-card-text>Tipo de plano: <b> Básico</b></b-card-text>
                <b-card-text><b>Valor Mensal :</b> R$0,00</b-card-text>
              </b-col>
              <b-col
                  class="col-12 col-md-6 d-flex justify-content-end"
                  align-self="end"
              >
                <b-button
                    variant="secondary"
                    class="col-12 col-md-6 mt-2 align-content-end"
                    style="height: 60px;border-radius: 0"
                    disabled
                >Mudar Plano
                </b-button>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-row>
    
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      usuario: {
        username: null,
        idUsuario: null
      },

    };
  },

  mounted() {
    const usuario = this.$store.state.usuario;
    this.usuario.username = usuario.username;
    this.usuario.idUsuario = usuario.idUser;
  }
}
</script>
<style scoped>
  section{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding-top: 100px;
    padding-bottom: 100px;
  }

  @media screen and (max-width: 960px) {
    section{
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 100px 10px 50px 10px ;
    }
  }
</style>
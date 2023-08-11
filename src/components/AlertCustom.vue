<template>
  <b-container>
    <b-row class="d-flex justify-content-center">
      <b-col class="col-12 col-md-6">
        <b-alert v-model="show"
                 :variant="typeMessage"
                 class="d-flex justify-content-between align-items-center">
          {{message}}
          <b-button
              variant="outline-secondary-system"
              :style="decoracaoBtnClose"
              @click="show=!show"
          > X </b-button>

        </b-alert>
      </b-col>
    </b-row>
  </b-container>

</template>
<script>
export default {
  props:{
    show:Boolean,
    alert:{},
    typeAlert:String,
    messageAlert:String,
  },

  computed:{
    typeMessage(){
      if (this.typeAlert!=null) return this.typeAlert;
      if (this.alert && this.alert.response ==null && this.alert.code =="ERR_NETWORK") return "danger";
      if (this.alert.response && this.alert.response.status && this.alert.response.status >=400 && this.alert.response.status <500){
        return "warning";
      }
      if (this.alert.response && this.alert.response.status && this.alert.response.status >=500 )
        return "danger";
      return "info";
    },

    message(){
      if (this.messageAlert ==null && this.alert.response && this.alert.response.data && this.alert.response.data.length>0  ){
        return "Erro no campo "+this.alert.response.data[0].field+" - "+this.alert.response.data[0].message;
      }
      if (this.messageAlert ==null && this.alert.response && this.alert.response.data && this.alert.response.data.message !=null) return this.alert.response.data.message ;
      if (this.messageAlert ==null && this.alert.response ==null && this.alert.code =='ERR_NETWORK') return "Erro de conexão. Se o problema persistir entre em contato com o administrador."
      if (this.messageAlert ==null &&  this.alert.response.status && this.alert.response.status==403 && this.alert.code =='ERR_BAD_REQUEST')
        return "Sua permissão de acesso expirou! Faça novamente login para continuar tendo acesso ao sistema."
      if (this.messageAlert ==null && this.alert.message!=null) return this.alert.message
      if (this.messageAlert !=null) return this.messageAlert;

      return "";
    },

    decoracaoBtnClose(){

      if(this.typeAlert ==null) {

        if (this.alert.response && this.alert.response.status && this.alert.response.status >= 400 && this.alert.response.status < 500) {
          return 'text-decoration: none; color:darkorange';
        }
        if (this.alert.response && this.alert.response.status && this.alert.response.status >= 500)
          return 'text-decoration: none; color:darkred';

        if (this.alert.code =='ERR_NETWORK') {
          return 'text-decoration: none; color:darkred';
        }
      }

      if (this.typeAlert == 'danger') return 'text-decoration: none; color:darkred'
      if (this.typeAlert == 'warning') return 'text-decoration: none; color:darkorange';
      if (this.typeAlert == 'info') return 'text-decoration: none; color:darkblue';
      if (this.typeAlert == 'success') return 'text-decoration: none; color:darkgreen';
      return 'text-decoration: none; color:balck';
    }


  }
}
</script>

<style scoped>

</style>
<template>
  <div id="app">
    <BarraNavegacao/>
    <router-view/>
  </div>
</template>

<style >

.navbar {
  background: #7FD6F6;

}
/*.navbar-bytebank a {
  color: #fff;
}
.navbar-bytebank a:hover {
  color: #000;
}*/

</style>
<script>
import BarraNavegacao from "./components/BarraNavegacao.vue";

export default {
  components: {BarraNavegacao}
}
</script>
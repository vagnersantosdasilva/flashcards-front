<template>
  <div>
    <b-card bg-variant="white"
            class="d-flex justify-content-center ms-2 custom-card"
    >
      <b-card-title>Distribuição de questões</b-card-title>
      <b-card-body>
        <div class="container d-flex flex-column align-content-center justify-content-center" >
          <canvas  ref="donutChart"></canvas>
        </div>
      </b-card-body>
    </b-card>

  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  props:{
    contagem:Object
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            data: [], // Substitua esses valores pelos seus dados
            backgroundColor: ['#8e2fff','#36A2EB', '#FF6384', '#a2e7c0', '#c71125', '#8e21b0','black'], // Cores para cada Etapa do anel
            //backgroundColor: ['yellow', 'orange','red','purple', 'brown','black'], // Cores para cada Etapa do anel
          },
        ],
      },
      chartOptions: {
        cutoutPercentage: 75, // Controle o tamanho do anel ajustando este valor
        circumference: 2 * Math.PI,
      },
    };
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      this.chartData.labels = Object.assign([],this.contagem.labels);
      this.chartData.datasets[0].data = Object.assign([],this.contagem.data);
      const ctx = this.$refs.donutChart.getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: this.chartData,
        options: this.chartOptions,
      });
    },
  },
};
</script>


<style scoped>
.custom-card{
  height: 350px;
  width: 100%;
  border-radius: 0;
}
/* Adicione estilos adicionais conforme necessário */
</style>


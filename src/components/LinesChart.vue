<template>
  <div>
    <b-card
        bg-variant="white"
        class="d-flex justify-content-center ms-2 custom-card"
    >
      <b-card-title>Taxas de acerto por etapa</b-card-title>
      <b-card-body>
        <div class="container d-flex flex-column align-content-center justify-content-center">
          <canvas ref="linesChart"></canvas>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  props: {
    performance: Object
  },
  data() {
    return {
      chart: null,
      chartData: {
        /*labels: ['Etapa 1', 'Etapa 2', 'Etapa 3', 'Etapa 4', 'Etapa 5', 'Etapa 6'],*/
        labels: [],
        datasets: [
          {
            label: 'Taxa de Acerto',
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            /*data: [90, 95, 92, 88, 94, 80],*/
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
          },
        },
      },
    };
  },
  watch: {
    performance: {
      handler() {
        this.renderChart();
      },
      deep: true,
    },
  },
  mounted() {
    this.renderChart();
  },
  beforeDestroy() {
    // Destrói a instância do gráfico antes de destruir o componente
    if (this.chart) {
      this.chart.destroy();
    }
  },
  methods: {
    renderChart() {
      this.chartData.labels =[]
      this.chartData.datasets[0].data =[]
      if (this.performance.acertosPorEtapa && this.performance.acertosPorEtapa!=null) {
        //this.performance.acertosPorEtapa.sort((a, b) => (a.etapa < b.etapa) ? 1 : ((b.etapa < a.etapa) ? -1 : 0));
        this.performance.acertosPorEtapa.forEach(e => {
          this.chartData.labels.push(e.etapa);
          const taxaAcertos = e.aproveitamento == null ? 0 : e.aproveitamento;
          this.chartData.datasets[0].data.push(taxaAcertos);
        });
      }

      const ctx = this.$refs.linesChart.getContext('2d');

      // Destrói a instância anterior do gráfico, se existir
      if (this.chart) {
        this.chart.destroy();
      }

      // Cria uma nova instância do gráfico
      this.chart = new Chart(ctx, {
        type: 'line',
        data: this.chartData,
        options: this.chartOptions,
      });

    },
  },
};
</script>

<style scoped>
.custom-card {
  height: 350px;
  width: 100%;
  border-radius: 0;
}

/* Adicione estilos adicionais conforme necessário */
</style>

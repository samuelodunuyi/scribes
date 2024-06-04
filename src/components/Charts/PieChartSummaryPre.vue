<script setup>
import { watch, markRaw, ref, onMounted } from 'vue';
import { Chart as ChartJS, registerables } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getChartLabelPlugin } from 'chart.js-plugin-labels-dv'
ChartJS.register(getChartLabelPlugin(), ...registerables);

const props = defineProps({
  doughnut: {
    type: Boolean,
    default: false,
  },
  chartId: {
    type: [String, Number],
    required: true,
  },
  chartData: {
    type: [Object, Array],
    required: false,
    default: [],

  },
  label: {
    default: true,
    type: Boolean,
    required: false,
  },
  fontColor: {
    default: '#000',
    type: String,
    required: false,
  },
});
// const { chartId, chartData,  } = defineProps(["chartId", "chartData"])

const chartRef = ref();
const pieChartId = `pie-${props.chartId}`;
var createdChart = null

onMounted(() => {
  if (props.chartData.length > 0) {
    if (createdChart) {
      createdChart.clear();
      createdChart.destroy();
    }
    var dataChart = props.chartData
    const ctx = document.getElementById(pieChartId);
    const data = {
      labels: [` ${dataChart[0].number} Submitted`, ` ${dataChart[1].number} Not Submitted`],
    datasets: [
      {
        label: `${props.chartId}`,
        data: [dataChart[0].amount, dataChart[1].amount],
          backgroundColor: ["#47B65C", "#E57717"],
          datalabels: {
            anchor: "center",
          },
          hoverOffset: 4,
          weight: 0.05,
          borderWidth: 0,
          hoverOffset: 4
        },
      ],
    };
    const options = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          align: "center",
          labels: {
            boxWidth: 6,
            usePointStyle: true,
            color: "black",
            font: {
              weight: "normal",
            },
          },
        },

        title: {
          display: false,
          text: "Chart.js Pie Chart",
        },
        datalabels: {
          display: false,
        },
      },
    };
    const config = {
      type: "doughnut",
      data: data,
      options: options,
      plugins: [ChartDataLabels],
    };

    createdChart = new ChartJS(ctx, config);
    chartRef.value = markRaw(createdChart)
  }
});

watch(() => props.chartData, (first, second) => {
  if (createdChart) {
    createdChart.clear();
    createdChart.destroy();
  }
  var dataChart = props.chartData
  const ctx = document.getElementById(pieChartId);
  const data = {
    labels: [` ${data[0].number} Submitted`, ` ${data[1].number} Not Submitted`],
    datasets: [
      {
        label: `${props.chartId}`,
        data: [dataChart[0].amount, dataChart[1].amount],
        backgroundColor: ["#47B65C", "#E57717"],
        datalabels: {
          anchor: "center",
        },
        hoverOffset: 4,
        weight: 0.05,
        borderWidth: 0,
        hoverOffset: 4
      },
    ],
  };
  const options = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          align: "center",
          labels: {
            boxWidth: 6,
            usePointStyle: true,
            color: "black",
            font: {
              weight: "normal",
            },
          },
        },

        title: {
          display: false,
          text: "Chart.js Pie Chart",
        },
        datalabels: {
          display: false,
        },
      },
    };
  const config = {
    type: "doughnut",
    data: data,
    options: options,
    plugins: [ChartDataLabels],
  };

  createdChart = new ChartJS(ctx, config);
  chartRef.value = markRaw(createdChart)
});

</script>

<template>
  <div>
    <canvas :id="pieChartId"></canvas>
  </div>
</template>

<style scoped>
div {
  position: relative;
  height: 100%;
  max-height: 400px;
}
</style>
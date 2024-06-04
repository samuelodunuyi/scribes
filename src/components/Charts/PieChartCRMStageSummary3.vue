<script setup>
import { watch, markRaw, ref, onMounted } from 'vue';
import { Chart as ChartJS } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getChartLabelPlugin } from 'chart.js-plugin-labels-dv'
ChartJS.register(getChartLabelPlugin())

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
        var dataChart = props.chartData
        console.log(props.chartData)

  if (createdChart) {
        createdChart.clear();
        createdChart.destroy();
    }
    var dataChart = props.chartData
  const ctx = document.getElementById(pieChartId);
  const data = {
    labels: [` ${dataChart[0].amount} (${dataChart[0].percentage}%) EUR`, ` ${dataChart[1].amount} (${dataChart[1].percentage}%) USD`],
    datasets: [
      {
        label: `${props.chartId}`,
        data: [dataChart[0].amount, dataChart[1].amount],
        backgroundColor: ["#D8A41D", "#6CB70C"],
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
                     position: 'bottom',
                     align: 'center',
                     labels: {
                      boxWidth: 6,
                      usePointStyle: true,
                        color: 'black',
                        font: {
                           weight: 'normal'
                        },
                     }
                  },

            title: {
                display: false,
                text: 'Chart.js Pie Chart'
            },
            datalabels: {
                display: false,
            }
        }
  };
  const config = {
    type: props.doughnut ? "doughnut" : "pie",
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
    labels: [` ${dataChart[0].amount} (${dataChart[0].percentage}%) EUR`, ` ${dataChart[1].amount} (${dataChart[1].percentage}%) USD`],
    datasets: [
      {
        label: `${props.chartId}`,
        data: [dataChart[0].amount, dataChart[1].amount],
        backgroundColor: ["#D8A41D", "#6CB70C"],
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
                     position: 'bottom',
                     align: 'center',
                     labels: {
                      boxWidth: 6,
                      usePointStyle: true,
                        color: 'black',
                        font: {
                           weight: 'normal'
                        },
                     }
                  },
            title: {
                display: false,
                text: 'Chart.js Pie Chart'
            },
            datalabels: {
                display: false,
            }
        }
  };
  const config = {
    type: props.doughnut ? "doughnut" : "pie",
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
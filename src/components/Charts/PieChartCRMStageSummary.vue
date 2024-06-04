<script setup>
import { watch, markRaw, ref, onMounted } from "vue";
import { Chart as ChartJS, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { getChartLabelPlugin } from "chart.js-plugin-labels-dv";
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
    default: "#000",
    type: String,
    required: false,
  },
});

const chartRef = ref();
const pieChartId = `pie-${props.chartId}`;
var createdChart = null;

watch(
  () => props.chartData,
  (first, second) => {
    var dataChart = props.chartData;
    if (createdChart) {
      createdChart.clear();
      createdChart.destroy();
    }
    const ctx = document.getElementById(pieChartId);
    const data = {
      labels: [
        `Clean Energy (${dataChart[0].percentageCleanEnergy})%`,
        `Housing(${dataChart[1].percentageaffordableHousing})%`,
        `CRG (${dataChart[3].percentageCRG})%`,
        `Other Mandate (${dataChart[2].percentageOther})%`,
      ],
      datasets: [
        {
          label: `${props.chartId}`,
          data: [dataChart[0].amount, dataChart[1].amount, dataChart[3].amount, dataChart[2].amount],
          backgroundColor: ["#B18001", "#018070", "#B11919", "#410075"],
          datalabels: {
            anchor: "center",
          },
          hoverOffset: 4,
          weight: 0.05,
          borderWidth: 0,
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
    chartRef.value = markRaw(createdChart);
  }
);

onMounted(() => {
  if (props.chartData.length > 0) {
    var dataChart = props.chartData;

    if (createdChart) {
      createdChart.clear();
      createdChart.destroy();
    }
    console.log(dataChart)
    const ctx = document.getElementById(pieChartId);
    const data = {
      labels: [
        `Clean Energy (${dataChart[0].percentageCleanEnergy})%`,
        `Housing(${dataChart[1].percentageaffordableHousing})%`,
        `CRG (${dataChart[3].percentageCRG})%`,
        `Other Mandate (${dataChart[2].percentageOther})%`,
      ],
      datasets: [
        {
          label: `${props.chartId}`,
          data: [dataChart[0].amount, dataChart[1].amount, dataChart[3].amount, dataChart[2].amount],
          backgroundColor: ["#B18001", "#018070", "#B11919", "#410075"],
          datalabels: {
            anchor: "center",
          },
          hoverOffset: 4,
          weight: 0.05,
          borderWidth: 0,
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
    chartRef.value = markRaw(createdChart);
  }
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

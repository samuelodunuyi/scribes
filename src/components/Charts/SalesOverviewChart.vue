<script setup>
import { onMounted, markRaw, ref } from "vue";
import Chart from "chart.js/auto";

const props = defineProps({
  chartId: {
    type: [String, Number],
    required: true,
  },
});
// const { chartId, chartData,  } = defineProps(["chartId", "chartData"])

const chartRef = ref();
const chartId = `pie-${props.chartId}`;

onMounted(() => {
  const ctx = document.getElementById(chartId);
  const data = {
    labels: ["2017", "2018", "2019", "2020", "2021", "2022", "2023"],
    datasets: [
      {
        label: "Dataset one",
        data: [50, 75, 50, 75, 50, 75, 100],
        fill: false,
        borderColor: "#00cccc",
        tension: 0.3,
      },
      {
        label: "Dataset two",
        data: [90, 65, 40, 65, 40, 65, 50],
        fill: false,
        borderColor: "#17a2b8",
        borderWidth: 4,
        tension: 0.3,
      },
    ],
  };

  const config = {
    type: "line",
    data: data,

    options: {
      plugins: {
        legend: false,
        tooltip: {
          displayColors: false,
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      responsive: true,
      borderWidth: 4,
      pointRadius: 2,
      scales: {
        x: {
          display: true,
          grid: {
            display: false,
          },
        },
        y: {
          display: true,
          beginAtZero: true,
          ticks: {
            stepSize: 25,
          },
        },
      },
    },
  };

  const createdChart = new Chart(ctx, config);
  chartRef.value = markRaw(createdChart);
});

const updateChart = () => {
  return new Promise((resolve, reject) => {
    const chart = chartRef.value;
    chart.data.datasets[0].data = [
      newGurantees.value,
      newMandates.value,
      followMandates.value,
    ];
    chart.update("none");
    resolve();
  });
};
</script>

<template>
  <div>
    <canvas :id="chartId"></canvas>
  </div>
</template>

<style scoped>
div {
  position: relative;
  height: 100%;
  padding: 1%;
  /* max-height: 00px; */
}
</style>
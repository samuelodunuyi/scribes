<script setup>
import { onMounted, markRaw, ref } from "vue";
import Chart from "chart.js/auto";

const props = defineProps({
  chartId: {
    type: [String, Number], 
    required: true,
  },
  data: {
    type: [Object, String, Number],
  },
});
// const { chartId, chartData,  } = defineProps(["chartId", "chartData"])

const chartRef = ref();
const chartId = `pie-${props.chartId}`;

onMounted(() => {
  const ctx = document.getElementById(chartId);
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep"],
    datasets: [
      {
        label: "Products",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        fill: false,
        borderColor: "#9854fc",
        tension: 0,
      },
      // {
      //     label: 'My First Dataset',
      //     data: [90, 20, 60,99,30,70, 20,50],
      //     fill: false,
      //     borderColor: 'yellow',
      //     // tension: 0.1
      // }
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
      responsive: true,
      interaction: {
        intersect: false,
        mode: "index",
      },
      borderWidth: 5,
      pointRadius: 0,
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
            stepSize: 30,
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
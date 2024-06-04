<script setup>
import { onMounted, markRaw, ref } from 'vue';
import Chart from 'chart.js/auto';
const props = defineProps({
    chartId: {
        type: [String, Number],
        required: true,
    }
});
// const { chartId, chartData,  } = defineProps(["chartId", "chartData"])
const chartRef = ref()
const chartId = `pie-${props.chartId}`
onMounted(() => {
    const ctx = document.getElementById(chartId);
    const data = {
        labels: ["","","","", "","","",""],
        datasets: [{
            label: 'My Dataset',
            data: [60, 50, 80, 70, 55, 95, 40],
            fill: false,
            borderColor: '#1f1f1f',
            tension: 0.1
        },
        // {
        //     label: 'My First Dataset',
        //     data: [90, 20, 60,99,30,70, 20,50],
        //     fill: false,
        //     borderColor: 'yellow',
        //     // tension: 0.1
        // }
    ]
    };
    const config = {
        type: 'line',
        data: data,
        options: {
            plugins: {
            legend: false,
            },
            y: {
            ticks: {
                stepSize: 25
            }
        }
        },
    };
    const createdChart = new Chart(ctx, config);
    chartRef.value = markRaw(createdChart)
})
const updateChart = () => {
    return new Promise((resolve, reject) => {
        const chart = chartRef.value;
        chart.data.datasets[0].data = [newGurantees.value, newMandates.value, followMandates.value]
        chart.update('none');
        resolve()
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
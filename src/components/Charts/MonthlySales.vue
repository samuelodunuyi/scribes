<script setup>
import { onMounted, markRaw, ref } from 'vue';
import Chart from 'chart.js/auto';

const { title, number, amount, style, chartId, chartData } = defineProps(["title", "number", "amount", "style", "chartId", "chartData"])
const chartRef = ref()
const lineChartId = `line-${chartId}`

onMounted(() => {

    const ctx = document.getElementById(lineChartId);
    const data = {
        labels: ['January', 'Febuary'], //dy
        datasets: [
            {
                label: 'DataSet 1',
                data: [80000, 200000], //dy
                borderColor: 'blue',
                backgroundColor: 'blue'
            }
        ],
        tension: 1
    }
    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Monthly Sales',
                align: 'start'
            }
        },
        elements: {
            point: {
                radius: 0
            }
        },
        maintainAspectRatio: true,
    }
    const config = {
        type: 'line',
        data: data,
        options: options
    };

    const createdChart = new Chart(ctx, config);
    chartRef.value = markRaw(createdChart)

})


</script>

<template>
    <div class="line-chart" id="line-chart">
        <canvas :id="lineChartId"></canvas>
    </div>
</template>
<script setup>
import { watch, markRaw, ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
    yAxis: {
        type: Boolean,
        default: false,
    },
    stacked: {
        type: Boolean,
        default: true,
    },
    chartId: {
        type: [String, Number],
        required: true,
    },
    chartData: {
        type: [Object,
            Array],
        default: [],
        required: true
    }
});

const barChartId = `bar-${props.chartId}`
const chartRef = ref()

var createdChart = null
watch(() => props.chartData, (first, second) => {

    var data = props.chartData
    if (createdChart) {
        createdChart.clear();
        createdChart.destroy();
    }
    const ctx = document.getElementById(barChartId);

    const options = {
        indexAxis: props.yAxis ? 'y' : 'x',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: props.stacked ? true : false,
            },
            y: {
                stacked: props.stacked ? true : false,
                ticks: {
                    stepSize: 250
                }
            }
        },
        plugins: {
            legend: {
                position: 'top'
            }
        }
    }
    const config = {
        type: 'bar',
        data: data,
        options: options
    };

    createdChart = new Chart(ctx, config);
    chartRef.value = markRaw(createdChart)

})

onMounted(() => {
    if (props.chartData.length > 0) {
        var data = props.chartData
        if (createdChart) {
            createdChart.clear();
            createdChart.destroy();
        }
        const ctx = document.getElementById(barChartId);

        const options = {
            indexAxis: props.yAxis ? 'y' : 'x',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: props.stacked ? true : false,
                },
                y: {
                    stacked: props.stacked ? true : false,
                    ticks: {
                        stepSize: 250
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
        const config = {
            type: 'bar',
            data: data,
            options: options
        };

        createdChart = new Chart(ctx, config);
        chartRef.value = markRaw(createdChart)
    }
})

</script>

<template>
    <div>
        <canvas :id="barChartId"></canvas>
    </div>
</template>

<style scoped>
div {
    position: relative;
    height: 100%;
    width: 100%;
}
</style>
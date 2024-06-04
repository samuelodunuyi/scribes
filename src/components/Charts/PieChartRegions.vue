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
        type: [Object,
            Array],
        required: false,
        default: [],
    },
    label: {
        default: true,
        type: Boolean,
        required: false
    }
});
var createdChart = null
const chartRef = ref()
const pieChartId = `pie-${props.chartId}`

watch(() => props.chartData, (first, second) => {
    var dataChart = props.chartData
    console.log(dataChart)
    if (createdChart) {
        createdChart.clear();
        createdChart.destroy();
    }
    const ctx = document.getElementById(pieChartId);
    const data = {
        labels: [`SE ${dataChart[2].percentage}%\n₦${dataChart[2].amount}bn`, `SW ${dataChart[3].percentage}%\n₦${dataChart[3].amount}bn`, `NC ${dataChart[4].percentage}%\n₦${dataChart[4].amount}bn`, `NE ${dataChart[6].percentage}%\n₦${dataChart[5].amount}bn`, `NW ${dataChart[0].percentage}%\n₦${dataChart[0].amount}bn`, `SS ${dataChart[1].percentage}%\n₦${dataChart[1].amount}bn`, `NA ${dataChart[5].percentage}%\n₦${dataChart[5].amount}bn`],
        datasets: [
            {
                label: 'Regions',
                data: [dataChart[2].amount, dataChart[3].amount, dataChart[4].amount, dataChart[6].amount, dataChart[0].amount, dataChart[1].amount, dataChart[5].amount],
                backgroundColor: ["#007115", "#8F88B2", "#580000", "#422F00", "#002846", "#393939", "#253939"],
                datalabels: {
                    anchor: 'center'
                },
                weight: 0.05,
                borderWidth: 0,
                hoverOffset: 4
            }
        ]
    };
    const options = {
        responsive: true,
        maintainAspectRatio: true,
        segmentShowStroke: false,
        plugins: {
            legend: false,
            labels: {
                render: 'label',
                fontColor: '#fff',
                fontSize: 16,
            },
            title: {
                display: false,
                text: 'Chart.js Pie Chart'
            },
            datalabels: {
                display: false,
            }
        }
    }
    const config = {
        type: props.doughnut ? 'doughnut' : 'pie',
        data: data,
        options: options,
        plugins: [ChartDataLabels]
    };

    createdChart = new ChartJS(ctx, config);
    chartRef.value = markRaw(createdChart)

})

onMounted(() => {
    if (props.chartData.length > 0) {
        var dataChart = props.chartData
        console.log(dataChart)
        if (createdChart) {
            createdChart.clear();
            createdChart.destroy();
        }
        const ctx = document.getElementById(pieChartId);
        const data = {
            labels: [`SE ${dataChart[2].percentage}%\n₦${dataChart[2].amount}bn`, `SW ${dataChart[3].percentage}%\n₦${dataChart[3].amount}bn`, `NC ${dataChart[4].percentage}%\n₦${dataChart[4].amount}bn`, `NE ${dataChart[6].percentage}%\n₦${dataChart[5].amount}bn`, `NW ${dataChart[0].percentage}%\n₦${dataChart[0].amount}bn`, `SS ${dataChart[1].percentage}%\n₦${dataChart[1].amount}bn`, `NA ${dataChart[5].percentage}%\n₦${dataChart[5].amount}bn`],
            datasets: [
                {
                    label: 'Regions',
                    data: [dataChart[2].amount, dataChart[3].amount, dataChart[4].amount, dataChart[6].amount, dataChart[0].amount, dataChart[1].amount, dataChart[5].amount],
                    backgroundColor: ["#007115", "#8F88B2", "#580000", "#422F00", "#002846", "#393939", "#253939"],
                    datalabels: {
                        anchor: 'center'
                    },
                    weight: 0.05,
                    borderWidth: 0,
                    hoverOffset: 4
                }
            ]
        };
        const options = {
            responsive: true,
            maintainAspectRatio: true,
            segmentShowStroke: false,
            plugins: {
                legend: false,
                labels: {
                    render: 'label',
                    fontColor: '#fff',
                    fontSize: 16,
                },
                title: {
                    display: false,
                    text: 'Chart.js Pie Chart'
                },
                datalabels: {
                    display: false,
                }
            }
        }
        const config = {
            type: props.doughnut ? 'doughnut' : 'pie',
            data: data,
            options: options,
            plugins: [ChartDataLabels]
        };

        createdChart = new ChartJS(ctx, config);
        chartRef.value = markRaw(createdChart)
    }
})

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
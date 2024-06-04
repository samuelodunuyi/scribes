<script setup>
import { watch, markRaw, ref, onMounted } from 'vue';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS } from 'chart.js'
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
        default: [],
        required: false
    },
    label: {
        default: true,
        type: Boolean,
        required: false
    }
});
const chartRef = ref()
const pieChartId = `pie-${props.chartId}`
var createdChart = null

watch(() => props.chartData, (first, second) => {

    var dataChart = props.chartData
    if (createdChart) {
        createdChart.clear();
        createdChart.destroy();
    }
    const ctx = document.getElementById(pieChartId);
    const data = {
        labels: [`Public Bond ${dataChart[1].percentage}%\n₦${dataChart[1].amount}bn`, `Blended Finance ${dataChart[2].percentage}%\n₦${dataChart[2].amount}bn`, `Private Bond \n(Clean Energy) ${dataChart[5].percentage}%\n₦${dataChart[5].amount}bn`, `Contigent\nRefi. Gte. ${dataChart[3].percentage}%\n₦${dataChart[3].amount}bn`, `Private Bond\n(Other) ${dataChart[4].percentage}%\n₦${dataChart[4].amount}bn`, `Annuity\nPPP ${dataChart[0].percentage}%\n₦${dataChart[0].amount}bn`],
        datasets: [
            {
                label: 'Products',
                data: [dataChart[1].amount, dataChart[2].amount, dataChart[5].amount, dataChart[3].amount, dataChart[4].amount, dataChart[0].amount],
                backgroundColor: ["#B18001", "#018070", "#B11919", "#410075", "#B1B41D", "#326044"],
                datalabels: {
                    anchor: 'center'
                },
                hoverOffset: 4,
                weight: 0.05,
                borderWidth: 0
            }
        ]
    };
    const options = {
        responsive: true,
        segmentShowStroke: false,
        maintainAspectRatio: true,
        plugins: {
            labels: {
                render: 'label',
                fontColor: '#fff',
            },
            legend: false,
            title: {
                display: false,
                text: 'Chart.js Pie Chart'
            },
            datalabels: {
                color: 'white',
                display: false,
                // borderRadius: 25,
                // borderWidth: 2
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
        if (createdChart) {
            createdChart.clear();
            createdChart.destroy();
        }
        const ctx = document.getElementById(pieChartId);
        const data = {
            labels: [`Public Bond ${dataChart[1].percentage}%\n₦${dataChart[1].amount}bn`, `Blended Finance ${dataChart[2].percentage}%\n₦${dataChart[2].amount}bn`, `Private Bond \n(Clean Energy) ${dataChart[5].percentage}%\n₦${dataChart[5].amount}bn`, `Contigent\nRefi. Gte. ${dataChart[3].percentage}%\n₦${dataChart[3].amount}bn`, `Private Bond\n(Other) ${dataChart[4].percentage}%\n₦${dataChart[4].amount}bn`, `Annuity\nPPP ${dataChart[0].percentage}%\n₦${dataChart[0].amount}bn`],
            datasets: [
                {
                    label: 'Products',
                    data: [dataChart[1].amount, dataChart[2].amount, dataChart[5].amount, dataChart[3].amount, dataChart[4].amount, dataChart[0].amount],
                    backgroundColor: ["#B18001", "#018070", "#B11919", "#410075", "#B1B41D", "#326044"],
                    datalabels: {
                        anchor: 'center'
                    },
                    hoverOffset: 4,
                    weight: 0.05,
                    borderWidth: 0
                }
            ]
        };
        const options = {
            responsive: true,
            segmentShowStroke: false,
            maintainAspectRatio: true,
            plugins: {
                labels: {
                    render: 'label',
                    fontColor: '#fff',
                },
                legend: false,
                title: {
                    display: false,
                    text: 'Chart.js Pie Chart'
                },
                datalabels: {
                    color: 'white',
                    display: false,
                    // borderRadius: 25,
                    // borderWidth: 2
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
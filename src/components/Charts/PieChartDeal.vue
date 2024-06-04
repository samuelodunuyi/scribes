<script setup>
import { onMounted, markRaw, ref, watch } from 'vue';
import { Chart as ChartJS } from 'chart.js'
import { getChartLabelPlugin } from 'chart.js-plugin-labels-dv'
import ChartDataLabels from 'chartjs-plugin-datalabels';

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
    },
});
var createdChart = null
const chartRef = ref()
const pieChartId = `pie-${props.chartId}`

watch(() => props.chartData, (first, second) => {
    var dataChart = props.chartData
    if (createdChart) {
        createdChart.clear();
        createdChart.destroy();
    }
    const doughnutLabel = {
        id: 'doughnutLabel',
        beforeDatasetsDraw(chart, args, pluginOptions) {
            const { ctx, data } = chart;

            ctx.save();
            const xCoor = chart.getDatasetMeta(0).data[0].x;
            const yCoor = chart.getDatasetMeta(0).data[0].y;
            ctx.font = '16px sans-serif';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`Total \n₦${dataChart[3].amount}`, xCoor, yCoor);
        }
    }
    const ctx = document.getElementById(pieChartId);
    const data = {
        labels: [`Red: ${dataChart[0].percentage}%\n₦${dataChart[0].amount}bn`, `Amber: ${dataChart[1].percentage}%\n₦${dataChart[1].amount}bn`, `Green: ${dataChart[2].percentage}%\n₦${dataChart[2].amount}bn`],
        datasets: [
            {
                data: [dataChart[0].percentage, dataChart[1].percentage, dataChart[2].percentage],
                label: ['Deals'],
                backgroundColor: ["#D12134", "#DB8A00", "#298729"],
                datalabels: {
                    anchor: 'center'
                },
                hoverOffset: 4,
                weight: 0.05,
                borderWidth: 0,
                cutout: '40%'
            }
        ]
    };
    const options = {
        responsive: true,
        maintainAspectRatio: true,
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
            datalabels: false,
        },
    }
    const config = {
        type: 'doughnut',
        data: data,
        options: options,
        plugins: [ChartDataLabels, doughnutLabel],
        arc: {
            borderWidth: 0
        }
    };
    createdChart = new ChartJS(ctx, config);
    chartRef.value = markRaw(createdChart)

});



onMounted(() => {
    if (props.chartData.length > 0) {
        var dataChart = props.chartData
        if (createdChart) {
            createdChart.clear();
            createdChart.destroy();
        }
        const doughnutLabel = {
            id: 'doughnutLabel',
            beforeDatasetsDraw(chart, args, pluginOptions) {
                const { ctx, data } = chart;

                ctx.save();
                const xCoor = chart.getDatasetMeta(0).data[0].x;
                const yCoor = chart.getDatasetMeta(0).data[0].y;
                ctx.font = '16px sans-serif';
                ctx.fillStyle = 'black';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(`Total \n₦${dataChart[3].amount}`, xCoor, yCoor);
            }
        }
        const ctx = document.getElementById(pieChartId);
        const data = {
            labels: [`Red: ${dataChart[0].percentage}%\n₦${dataChart[0].amount}bn`, `Amber: ${dataChart[1].percentage}%\n₦${dataChart[1].amount}bn`, `Green: ${dataChart[2].percentage}%\n₦${dataChart[2].amount}bn`],
            datasets: [
                {
                    data: [dataChart[0].percentage, dataChart[1].percentage, dataChart[2].percentage],
                    label: ['Deals'],
                    backgroundColor: ["#D12134", "#DB8A00", "#298729"],
                    datalabels: {
                        anchor: 'center'
                    },
                    hoverOffset: 4,
                    weight: 0.05,
                    borderWidth: 0,
                    cutout: '35%'
                }
            ]
        };
        const options = {
            responsive: true,
            maintainAspectRatio: true,
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
                datalabels: false,
            },
        }
        const config = {
            type: 'doughnut',
            data: data,
            options: options,
            plugins: [ChartDataLabels, doughnutLabel],
            arc: {
                borderWidth: 0
            }
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
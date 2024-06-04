<script setup>
import { onMounted, markRaw, ref, watch } from 'vue';
import { Chart as ChartJS } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getChartLabelPlugin } from 'chart.js-plugin-labels-dv'

ChartJS.register(getChartLabelPlugin())
const props = defineProps({
    chartId: {
        type: [String, Number],
        required: true,
    },
    chartData: {
        type: [Object, Array, Number],
        required: false
    },
    chartColor: {
        type: [String],
    },
    text: {
        type: [String],
    },
    percentage: {
        type: [String, Number],
    }
});
 
var createdChart = null
const chartRef = ref()
const pieChartId = `pie-${props.chartId}`


watch(() => props.chartData, (first, second) => {
    let dataChart = props.chartData
    if (createdChart) {
        createdChart.clear();
        createdChart.destroy();
    }
    const doughnutLabel = {
        id: pieChartId,
        beforeDatasetsDraw(chart, args, pluginOptions) {
            const { ctx, data } = chart;
            ctx.save(); 
            const xCoor = chart.getDatasetMeta(0).data[0].x;
            const yCoor = chart.getDatasetMeta(0).data[0].y;
            ctx.font = '16px sans-serif';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`Total \n₦${dataChart}bn`, xCoor, yCoor);
        }
    }
    const ctx = document.getElementById(pieChartId);
    const data = {
        labels: [`Origination ${props.percentage}%`],
        datasets: [
            {
                data: [`${props.percentage}`],
                backgroundColor: [`${props.chartColor}`],
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
        }
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
    let dataChart = props.chartData
    if (createdChart) {
        createdChart.clear();
        createdChart.destroy();
    }
    const doughnutLabel = {
        id: pieChartId,
        beforeDatasetsDraw(chart, args, pluginOptions) {
            const { ctx, data } = chart;
            ctx.save();
            const xCoor = chart.getDatasetMeta(0).data[0].x;
            const yCoor = chart.getDatasetMeta(0).data[0].y;
            ctx.font = '16px sans-serif';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`Total \n₦${dataChart}bn`, xCoor, yCoor);
        }
    }
    const ctx = document.getElementById(pieChartId);
    const data = {
        labels: [`Origination ${props.percentage}%`],
        datasets: [
            {
                data: [`${props.percentage}`],
                backgroundColor: [`${props.chartColor}`],
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
        }
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
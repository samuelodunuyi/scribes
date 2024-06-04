<script setup>
import { onMounted, markRaw, ref, watch } from 'vue';
import { Chart as ChartJS, registerables } from 'chart.js'
import { getChartLabelPlugin } from 'chart.js-plugin-labels-dv'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import QuickChart from 'quickchart-js'

const myChart = new QuickChart();


ChartJS.register(getChartLabelPlugin(), ...registerables)
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
var pieChartId = ref()

watch(() => props.chartData, (first, second) => {
    var dataChart = props.chartData
    myChart.setConfig({
        type: 'outlabeledDoughnut',
        data: {
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
                    cutout: '47%'
                }
            ]
        },
        options: {
            plugins: {
                legend: false,
                outlabels: {
                    text: '%l',
                    color: 'white',
                    stretch: 35,
                    font: {
                        resizable: true,
                        minSize: 12,
                        maxSize: 18,
                    },
                },
                doughnutlabel: {
                    labels: [
                        {
                            text: `₦${dataChart[3].amount}bn`,
                            color: 'black',
                            font: {
                                weight: 'bold'
                            },
                        },
                        {
                            text: 'Total',
                        },
                    ],
                },
            },
        },
    })
    pieChartId.value = myChart.getUrl();

});



onMounted(() => {
    if (props.chartData.length > 0) {
        var dataChart = props.chartData
        myChart.setConfig({
            type: 'outlabeledDoughnut',
            data: {
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
                        cutout: '47%'
                    }
                ]

            },
            options: {
                plugins: {
                    legend: false,
                    outlabels: {
                        text: '%l',
                        color: 'white',
                        stretch: 35,
                        font: {
                            resizable: true,
                            minSize: 12,
                            maxSize: 18,
                        },
                    },
                    doughnutlabel: {
                        labels: [
                            {
                                text: `₦${dataChart[3].amount}bn`,
                                color: 'black',
                                font: {
                                    weight: 'bold',
                                },
                            },
                            {
                                text: 'Total',
                                color: 'black',

                            },
                        ],
                    },
                },
            },
        }).setBackgroundColor('transparent');
        pieChartId.value = myChart.getUrl();
    }
})
</script>

<template>
    <div class="ml-40">
        <img :src="pieChartId" />
    </div>
</template>

<style scoped></style>
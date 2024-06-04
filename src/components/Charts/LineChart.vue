<script setup>
import { onMounted, ref, watch } from 'vue';

const props = defineProps(["title", "number", "amount", "style", "chartId", "chartData", "tooltiptext", "textBelow"])

const amounts = ref('')
watch(() => props.amount, (first, second) => {
    if(props.amount!='' || props.amount!=undefined || props.amount!=null){
        amounts.value = props.amount 
    }

});
onMounted(() =>  {
    if(props.amount!='' || props.amount!=undefined || props.amount!=null){
        amounts.value = parseFloat(props.amount).toFixed(2)
    }

});

</script>

<template>
    <div class="card mb-3 tooltips" :style="{ backgroundColor: style }">
        <div class="card-header">
            {{ title }}
            <v-icon icon="mdi-dots-vertical" size="large" class="dots" />
        </div>
        <div class="card-body">
            <h5 class="card-title">{{ number }} Deals</h5>
            <h5 class="card-text"> <span class="pr-0"> ₦ </span>{{ amounts }}bn
            </h5>
        </div>
        <div class="card-footer" style="top: 10%; transform: translateY(25%);">
            <div class="small-text d-flex align-center pr-1">
                <p style="width: 255px">{{ textBelow }}</p>
            </div>
        </div>
        <span class="tooltiptext" style="font-size: 12px;">{{ tooltiptext }}</span>
    </div>
</template>
<style scoped>
.card {
    max-width: 250px;
    min-width: 230px;
    color: #fff;
    position: relative;
}

.tooltips {
    position: relative;
    display: inline-block;
}

.tooltips .tooltiptext {
    visibility: hidden;
    width: 150px;
    background-color: rgb(220, 220, 220);
    color: #000000;
    text-align: center;
    border-radius: 6px;
    padding: 5px 3px;
    position: absolute;
    z-index: 1;
    bottom: 105%;
    left: 50%;
    margin-left: -60px;
}

.tooltips .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
}

.tooltips:hover .tooltiptext {
    visibility: visible;
}

.dots {
    position: absolute;
    top: 10px;
    right: 12px;
    cursor: pointer;
}

.small-text {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
}

.card-footer,
.card-header {
    border: none;
    background-color: transparent;
}

.line-chart {
    position: absolute;
    bottom: 10px;
    right: 12px;
    cursor: pointer;
    width: 72px;
    height: 38px;
}

.green {
    color: green;
}

.red {
    color: red;
}
</style>
<script setup>
const props = defineProps(['target', 'actual', 'variance', 'percentage', 'sign', 'targetComment']);

</script>

<template>
    <div class="card text-white border-0 border-0" style="background-color: #237CBF">
        <div class="card-header">
            Target
            <v-icon icon="mdi-dots-vertical" size="large" class="dots" />
        </div>
        <div class="card-body d-flex">
            <p class="card-title">{{ props.target }}bn </p>
            <b style="font-size: 10px; vertical-align: middle; margin: 20px 10px 10px 10px;">{{ props.targetComment }}</b>
        </div>
    </div>


    <div class="card text-white border-0" style="background-color: #237CBF; cursor: pointer;">
        <div class="card-header">
            Actual
            <v-icon icon="mdi-dots-vertical" size="large" class="dots" />
        </div>
        <div class="card-body">
            <p class="card-title">{{ props.actual}}bn </p>
        </div>
    </div>

    <div class="card text-white border-0" style="background-color: #237CBF;">
        <div class="card-header">
            Variance
            <v-icon icon="mdi-dots-vertical" size="large" class="dots" />
        </div>
        <div class="card-body" v-if="sign==true">
            <h4 style="color: #ffffff; font-weight: 600; font-size: 20px;">
                <v-icon icon="mdi-arrow-up" size="x-small" class="green" />{{ props.variance }}BN <span>&nbsp;</span> <v-icon icon="mdi-arrow-up" size="x-small"
                    class="green" /> {{ percentage }}%</h4>
        </div>
        <div class="card-body" v-else>
            <h4 style="color: #FFBF1A; font-weight: 600; font-size: 20px;">
                <v-icon icon="mdi-arrow-down" size="x-small" class="green" />{{ props.variance }}bn <span>&nbsp;</span> <v-icon icon="mdi-arrow-down" size="x-small"
                    class="green" /> {{ percentage}}%</h4>
        </div>
    </div>
</template>

<style scoped>
.dots {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
}

.card-footer,
.card-header {
    border: none;
    background-color: transparent;
}

.card-body {
    padding: .5rem 1rem;
}

.card-body p:first-child {

    font-size: 32px;
    font-weight: 500;
    margin: 0;

}

.variance {
    color: var(--amber, #FFBF1A);
}
</style>
<script setup>
const { grade } = defineProps(["grade"])
</script>

<template>
    <span v-if="grade === 'RED'" style=" background: #FEE2E2; color: #940505;"
        class="grade-btn d-flex align-items-center justify-content-center gap-1 px-2 py-1">
        <i class="dot " style="background: #f00;"></i>
        Red
    </span>
    <span v-else-if="grade === 'GREEN'" style="background-color: rgb(216, 251, 216); color:green"
        class="grade-btn d-flex align-items-center justify-content-center gap-1 px-2 py-1">
        <i class="dot" style="background: green"></i>
        Green
    </span>
    <span v-else-if="grade === 'AMBER'" style="background-color: rgb(255, 250, 214); color: orange;"
        class="grade-btn d-flex align-items-center justify-content-center gap-1 px-2 py-1">
        <i class="dot" style="background: orange;"></i>
        Amber
    </span> <span v-else-if="grade === 'CLOSED'" style="background-color: rgb(212, 212, 207); color: rgb(102, 99, 94);"
        class="grade-btn d-flex align-items-center justify-content-center gap-1 px-2 py-1">
        <i class="dot" style="background: rgb(102, 99, 94);"></i>
        Closed
    </span>
    <span v-else-if="grade === 'ACTIVE' || grade==='active'" style="background-color: rgb(216, 251, 216); color: green;"
        class="grade-btn d-flex align-items-center justify-content-center gap-1 px-2 py-1">
        <i class="dot" style="background: green;"></i>
        Active
    </span>
    <span v-else-if="grade === 'INACTIVE' || grade==='inactive'" style="background-color: rgb(255, 250, 214); color: orange;"
        class="grade-btn d-flex align-items-center justify-content-center gap-1 px-2 py-1">
        <i class="dot" style="background: orange;"></i>
        Inactive
    </span>
</template>

<style scoped>
.grade-btn {
    min-width: 45px;
    max-width: 65px;
    border-radius: 40px;
}

.dot {
    display: inline-block;
    border-radius: 50%;
    padding: 5px;
}
</style>
<script setup>
import GradeButton from '../GradeButton.vue';
import { computed } from "vue";
import { defineEmits } from 'vue'

import { useDashOptionStore } from "../../stores/dashOption"
import pinia from "../../stores/store";
const props = defineProps(['details', 'data', 'dealSec', 'selectedUserList', 'fundOption'])
const stores = useDashOptionStore(pinia);

const emit = defineEmits(['row-clicked'])


const rowClicked = (value) => {
    emit('row-clicked',value)
}
</script>
<template>
    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col" style="background-color: #227CBF;color: white;">
                        <div class="d-flex align-center gap-1">
                            <span class="noshrink"> S/N</span>
                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>
                        </div>
                    </th>
                    <th scope="col" style="background-color: #227CBF;color: white;">
                        <div class="d-flex align-center gap-1">
                            <span> Client Name </span>
                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>
                        </div>
                    </th>
                    <th scope="col" style="background-color: #227CBF;color: white;">
                        <div class="d-flex align-center gap-1">
                            <span> Transaction Name </span>
                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>
                        </div>
                    </th>
                    <th scope="col" style="background-color: #227CBF;color: white;">
                        <div class="d-flex align-center gap-1">
                            <span> Sector </span>
                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>
                        </div>
                    </th>
                    <th scope="col" style="background-color: #227CBF;color: white;">
                        <div class="d-flex align-center gap-1">
                            <span>Industry </span>
                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>
                        </div>
                    </th>
                    <th scope="col" style="background-color: #227CBF;color: white;">
                        <div class="d-flex align-center gap-1">
                            <span>Project Type </span>
                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>
                        </div>
                    </th>
                    <th scope="col" style="background-color: #227CBF;color: white;">
                        <div class="d-flex align-center gap-1">
                            <span>Status</span>
                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr @click="rowClicked(true)">
                    <td scope="row">1</td>
                    <td >A Client from the west</td>
                    <td>Transaction is valid</td>
                    <td>Greenville</td>
                    <td>Gas</td>
                    <td>Clean Energy</td>
                    <td>
                        <GradeButton grade="ACTIVE" />
                    </td>
                </tr>
                <tr @click="rowClicked(true)">
                    <td scope="row">2</td>
                    <td >A Client from the west</td>
                    <td>Transaction is valid</td>
                    <td>Greenville</td>
                    <td>Gas</td>
                    <td>Clean Energy</td>
                    <td>
                        <GradeButton grade="INACTIVE" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
thead tr th {
    font-size: 12px;
    font-weight: 600;
    line-height: 14.4px;
    padding: 15px;
}

tbody tr td {
    color: var(--grey-dark, #808080);
    /* Caption */
    font-size: 12px;
    font-weight: 400;
    line-height: 14.4px;
    padding: 20px 15px;
    cursor: pointer;
}

npm run dev thead,
tr {
    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}

.noshrink {
    display: flex;
    flex-shrink: 0;
}
</style>
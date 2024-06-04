<script setup>
import GradeButton from '../GradeButton.vue';
import { computed } from "vue";

import { useDashOptionStore } from "../../stores/dashOption"
import pinia from "../../stores/store";
const props = defineProps(['details', 'data', 'dealSec', 'selectedUserList', 'fundOption'])
const stores = useDashOptionStore(pinia);

</script>
<template>
    <div class="table-responsive">
        <table class="table">
            <thead style="cursor: context-menu; " >
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
                            <span> Project Name </span>
                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>
                        </div>
                    </th>
                    
                    <th scope="col" style="background-color: #227CBF;color: white;">
                        <div class="d-flex align-center gap-1">
                            <span> Deal Size </span>
                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>
                        </div>
                    </th>
                    <th scope="col" style="background-color: #227CBF;color: white;">
                        <div class="d-flex align-center gap-1">
                            <span>Sector </span>
                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td scope="row">1</td>
                    <td>Brains and Hammers</td>
                    <td>13.00</td>
                    <td>Housing</td>
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
    font-size: 12px;
    font-weight: 400;
    line-height: 14.4px;
    padding: 20px 15px;
    cursor: pointer;
}

thead,
tr {
    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}

.noshrink {
    display: flex;
    flex-shrink: 0;
}
</style>
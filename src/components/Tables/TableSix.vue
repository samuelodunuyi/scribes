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
                            <span> Development Partner </span>
                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>
                        </div>
                    </th>
                    
                    <th scope="col" style="background-color: #227CBF;color: white;">
                        <div class="d-flex align-center gap-1">
                            <span> Client </span>
                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>
                        </div>
                    </th>
                    <th scope="col" style="background-color: #227CBF;color: white;">
                        <div class="d-flex align-center gap-1">
                            <span>Transaction Name </span>
                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>
                        </div>
                    </th>
                    <th scope="col" style="background-color: #227CBF;color: white;">
                        <div class="d-flex align-center gap-1">
                            <span>Currency </span>
                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>
                        </div>
                    </th>
                    <th scope="col" style="background-color: #227CBF;color: white;">
                        <div class="d-flex align-center gap-1">
                            <span>Grant Type </span>
                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>
                        </div>
                    </th>
                    <th scope="col" style="background-color: #227CBF;color: white;">
                        <div class="d-flex align-center gap-1">
                            <span>Total Grant Amount </span>
                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>
                        </div>
                    </th>
                    <th scope="col" style="background-color: #227CBF;color: white;">
                        <div class="d-flex align-center gap-1">
                            <span>Total Grant Used </span>
                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>
                        </div>
                    </th>
                    <th scope="col" style="background-color: #227CBF;color: white;">
                        <div class="d-flex align-center gap-1">
                            <span>Total Grant Left </span>
                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>
                        </div>
                    </th>
                    <th scope="col" style="background-color: #227CBF;color: white;">
                        <div class="d-flex align-center gap-1">
                            <span>Purpose of Grant </span>
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
                    <td>AFD</td>
                    <td>Viathan Funding Plc</td>
                    <td>Viathan Funding Plc</td>
                    <td>EUR</td>
                    <td>Non-Returnable </td>
                    <td>600,000.00 </td>
                    <td>600,000.00 </td>
                    <td>600,000.00 </td>
                    <td>To finance the cost of expert consultants in developing pre-feasibility and feasibility studies for public-private partnership (PPP) Infrastructure
                        projects in Nigeria which when successful, can be executed under Infracredit's Annuity PPP guarantee programme.</td>
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
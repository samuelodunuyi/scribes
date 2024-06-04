<script setup>
import { ref, watch } from 'vue';
import GradeButton from '../GradeButton.vue';
const props = defineProps(['value', 'total']);
</script>
<template>
    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">
                        <div class="d-flex align-center gap-1">
                            <span> S/N </span>
                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                        </div>
                    </th>
                    <th scope="col">
                        <div class="d-flex align-center gap-1">
                            <span> Deal ID </span>
                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                        </div>
                    </th>
                    <th scope="col">
                        <div class="d-flex align-center gap-1">
                            <span> Client </span>
                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>
                        </div>
                    </th>
                    <th scope="col">
                        <div class="d-flex align-center gap-1">
                            <span> Originator </span>
                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>
                        </div>
                    </th>
                    <th scope="col">
                        <div class="d-flex align-center gap-1">
                            <span> Transactor </span>
                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>
                        </div>
                    </th>
                    <th scope="col">
                        <div class="d-flex align-center gap-1">
                            <span> Industry </span>

                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                        </div>
                    </th>
                    <th scope="col">
                        <div class="d-flex align-center gap-1">
                            <span>Product </span>

                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                        </div>
                    </th>
                    <th scope="col">
                        <div class="d-flex align-center gap-1">
                            <span> Deal Size </span>
                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>
                        </div>
                    </th>
                    <th scope="col">
                        <div class="d-flex align-center gap-1">
                            <span> Status </span>
                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-on:click="$router.push(`/trms/pipelinedeals/detail/${d.dealId}`)" v-for="(d, index) in value">
                    <td scope="row">{{ index+1 }}</td>
                    <td scope="row">{{ d.dealId }}</td>
                    <td>{{ d.companyName }}</td>
                    <td>{{d.originatorName }}</td>
                    <td>{{d.leadTransactorName }}</td>
                    <td>{{ d.industrySector }}</td>
                    <td>{{ d.productDescription }}</td>
                    <td>{{ d.dealSize }}</td>
                    <td>
                        <GradeButton :grade="d.dealCategory" />
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

thead,
tr {
    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}

tr:hover {
    background: #4b4a4a;
    background-color: rgba(0, 0, 0, 0.1);
}

.noshrink {
    display: flex;
    flex-shrink: 0;
}
</style>
<script setup>
import { ref, watch } from 'vue';
const props = defineProps(['pipelineDeals'])


</script>

<template>
    <div class="table-responsive">

        <table class="table">
            <thead>
                <tr>
                    <th scope="col">
                        <div class="d-flex align-center gap-1" >
                            <span class="noshrink"> Deal Id</span>

                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                        </div>
                    </th>
                    <th scope="col">
                        <div class="d-flex align-center gap-1" >
                            <span class="noshrink"> Company Name</span>

                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                        </div>
                    </th>
                    <th scope="col">
                        <div class="d-flex align-center gap-1" >
                            <span class="noshrink"> Name</span>

                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                        </div>
                    </th>
                    <th scope="col">
                        <div class="d-flex align-center gap-1" >
                            <span class="noshrink"> Phone Number</span>
                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>
                        </div>
                    </th>
                    <th scope="col">
                        <div class="d-flex align-center gap-1" >
                            <span class="noshrink"> Email Address </span>

                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                        </div>
                    </th>
                    <th scope="col">
                        <div class="d-flex align-center gap-1" >
                            <span class="noshrink"> Sector</span>

                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in props.pipelineDeals" style="cursor: pointer;" @click="$router.push('/TRMS/pipelinedeals/detail')">
                    <td scope="row">{{ row.dealId }}</td>
                    <td>{{ row.companyName }}</td>
                    <td>{{  }}</td>
                    <td>{{ }}</td>
                    <td>{{ row.companyEmailAddress }}</td>
                    <td>{{ row.industrySector }}</td>
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
    padding: 20px;
}

thead,
tr {
    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}</style>
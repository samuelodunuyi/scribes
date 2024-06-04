<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDashOptionStore } from "../../stores/dashOption"
import pinia from "../../stores/store";
const stores = useDashOptionStore(pinia);
const props = defineProps(['leadType', 'LeadData'])
const router = useRouter()
const searchValue = ref('')
const crmDetails = (id) => {
    stores.selectedLeadID_newPipelineDeal = id
    router.push(`/TRMS/pipelinedeals/detail/new`);
}

const pipelineDeals = computed(() => {
    var pipelineDealList = props.LeadData
    // Process search input
    if (searchValue.value != '' && searchValue.value) {
        pipelineDealList = pipelineDealList.filter((item) => {
            return item.leadId.toLowerCase().includes(searchValue.value.toLowerCase()) ||
                item.primaryContactFirstName.toLowerCase().includes(searchValue.value.toLowerCase()) ||
                item.primaryContactLastName.toLowerCase().includes(searchValue.value.toLowerCase()) ||
                item.companyName.toLowerCase().includes(searchValue.value.toLowerCase())
        })
    }
    return pipelineDealList
})
</script>

<template>
    <div>
        <div class="input-group search-bar">
            <input type="text" class="form-control" placeholder="Search" v-model="searchValue">
            <span class="input-group-text"><v-icon icon="mdi-magnify"></v-icon></span>
        </div>
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span class="noshrink">S/N</span>
                                <span class="d-flex flex-column align-center">
                                    <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                    <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span class="noshrink">Deal Id</span>
                                <span class="d-flex flex-column align-center">
                                    <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                    <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span class="noshrink"> Company Name</span>
                                <span class="d-flex flex-column align-center">
                                    <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                    <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                </span>

                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span class="noshrink"> Name</span>
                                <span class="d-flex flex-column align-center">
                                    <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                    <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span class="noshrink"> Phone Number</span>
                                <span class="d-flex flex-column align-center">
                                    <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                    <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span class="noshrink"> Email Address </span>
                                <span class="d-flex flex-column align-center">
                                    <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                    <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
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
                    <tr v-for="(i, index) in pipelineDeals" style="cursor: pointer;" @click="crmDetails(i.leadId)" :key="i.leadId">
                        <td scope="row">{{ index+1 }}</td>
                        <td>{{ i.leadId }}</td>
                        <td>{{ i.companyName }}</td>
                        <td>{{ i.primaryContactFirstName }} {{ i.primaryContactLastName }}</td>
                        <td>{{ i.primaryContactPhoneNo }}</td>
                        <td>{{ i.primaryContactEmailAddress }}</td>
                        <td>{{ i.leadSourceName }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
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
}
</style>
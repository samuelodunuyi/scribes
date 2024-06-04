<script setup>
import { ref, computed } from 'vue';
import GradeButton from '../GradeButton.vue';
import trmsService from '../../services/trmsService';
import ToolBar from '../../components/ToolBar.vue';
import { useDashOptionStore } from "../../stores/dashOption"
import pinia from "../../stores/store";
import { useRouter } from 'vue-router'

const router = useRouter()
const stores = useDashOptionStore(pinia);
const searchValue = ref('')
const allPipelineDealsData = ref([])
const filterOption = ref('')
const size = ref(2000)
const pageNumber = ref(1)

const navigatePages = (id) => {
    if(stores.signedInUserEmail=='cazubike@infracredit.ng' || stores.signedInUserEmail=='iagunbiade@infracredit.ng' || stores.signedInUserEmail=='conyilimba@infracredit.ng'){
        router.push(`/trms/pipelinedeals_/detail/${id}`);

    }
    else{
        router.push(`/trms/pipelinedeals/detail/${id}`);
    }
}

const onFilterSelected = (isCorrect) => {
    filterOption.value = isCorrect
}

const onSearchValuesEntered = (isCorrect) => {
    searchValue.value = isCorrect
}

const pipelineDeals = computed(() => {
    var deals = null
    next()
    deals = allPipelineDealsData.value;
    // Process search input
    if (searchValue.value != '' && searchValue.value) {
        deals = deals.filter((item) => {
            return item.dealId
                .toLowerCase()
                .includes(searchValue.value.toLowerCase()) ||
                item.companyName.toLowerCase().includes(searchValue.value.toLowerCase()) ||
                item.originator.toLowerCase().includes(searchValue.value.toLowerCase()) ||
                item.leadTransactor.toLowerCase().includes(searchValue.value.toLowerCase())
        })
    }

    // Sort by alphabetical order
    deals = deals.sort((a, b) => {
        if (filterOption.value == '') {
            let fa = a.dealCategory.toLowerCase(), fb = b.dealCategory.toLowerCase()

            if (fa < fb) {
                return 1
            }
            if (fa > fb) {
                return -1
            }
            return 0

        }
        else if (filterOption.value == 'dsc') {
            let fa = a.dealCategory.toLowerCase(), fb = b.dealCategory.toLowerCase()

            if (fa < fb) {
                return 1
            }
            if (fa > fb) {
                return -1
            }
            return 0
        }
    })
    return deals.slice(indexStart.value, indexEnd.value)
})

const indexStart = computed(() => {
    return (pageNumber.value - 1) * size.value;
})

const indexEnd = computed(() => {
    return indexStart.value + size.value;
})

const next = async () => {
    allPipelineDealsData.value = await trmsService.getDeals()
}
</script>
<template>
    <div style="margin-bottom: 10px">
        <ToolBar @filterOptions="onFilterSelected" @searchValues="onSearchValuesEntered" />
    </div>
   
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
                    <th scope="col" style="width: 150px;">
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
                            <span> Transaction Name </span>
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
                <tr v-on:click="navigatePages(d.dealId)" v-for="(d, index) in pipelineDeals">
                    <td scope="row">{{ index+1 }}</td>
                    <td scope="row">{{ d.dealId }}</td>
                    <td>{{ d.companyName }}</td>
                    <td>{{ d.transactionName }}</td>
                    <td>{{d.originatorName }}</td>
                    <td>{{d.leadTransactorName }}</td>
                    <td>{{ d.industrySector }}</td>
                    <td>{{ d.productDescription }}</td>
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
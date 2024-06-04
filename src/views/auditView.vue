<script setup>
import { ref, computed } from 'vue';
import { useDashOptionStore } from "../stores/dashOption"
import transactionSummaryTemplate from '../components/transactionSummaryTemplate'
import TabMenu from '../components/TabMenu.vue';
import { useRouter } from 'vue-router'
import ToolBar from '../components/ToolBar.vue';
import pinia from "../stores/store";
import trmsService from "../services/trmsService"

const router = useRouter()
const stores = useDashOptionStore(pinia);
const firstValue = ref('')
const secondValue = ref('')
const logDetails = ref('')
const totalArrayValue = ref('')
const searchValue = ref('')
const size = ref(20)
const pageNumber = ref(1)
const filterOption = ref('')
const filterOption2 = ref('')


const onFilterSelected = (isCorrect) => {
    filterOption.value = isCorrect
}

const onFilter2Selected = (isCorrect) => {
    filterOption2.value = isCorrect
}

const onSearchValuesEntered = (isCorrect) => {
    searchValue.value = isCorrect
}

const pageMovement = (isCorrect) => {
    if (isCorrect == 'Next') {
        pageNumber.value++;
    }
    else if (isCorrect == 'Previous') {
        pageNumber.value--;
    }
}

const pipelineDeals = computed(() => {
    var deals = null
    next()
    deals = logDetails.value;
    totalArrayValue.value = deals.length
    // Process search input
    if (searchValue.value != '' && searchValue.value) {
        deals = deals.filter((item) => {
            return item.createdBy
                .toLowerCase().includes(searchValue.value.toLowerCase()) ||
                item.lastModifiedBy.toLowerCase().includes(searchValue.value.toLowerCase())
        })
    }

    // Sort by alphabetical order
    deals = deals.sort((a, b) => {
        if (filterOption.value == 'asc') {
            let fa = a.createdBy.toLowerCase(), fb = b.createdBy.toLowerCase()
            if (fa > fb) {
                return 1
            }
            if (fa < fb) {
                return -1
            }
            return 0
        }
        else if (filterOption.value == 'dsc') {
            let fa = a.createdBy.toLowerCase(), fb = b.createdBy.toLowerCase()

            if (fa < fb) {
                return 1
            }
            if (fa > fb) {
                return -1
            }
            return 0
        }
    })

    if (deals.length > 0) {
        deals.forEach((element, index, array) => {
      array[index].count = index + 1
    });

    let ps = deals.slice(indexStart.value, indexEnd.value)
    console.log(ps)
    firstValue.value = ps[0].count;
    secondValue.value = ps[ps.length - 1].count
  }

    return deals.slice(indexStart.value, indexEnd.value)
})

const pageCount = computed(() => {
    let l = totalArrayValue.value,
        s = size.value;
    return Math.ceil(l / s);
})

const indexStart = computed(() => {
    return (pageNumber.value - 1) * size.value;
})

const indexEnd = computed(() => {
    return indexStart.value + size.value;
})

const next = async () => {
    let leadLog = await trmsService.getDealsAuditLog()
    let dealLog = await trmsService.getLeadsAuditLog()
    Array.prototype.push.apply(leadLog,dealLog)
    logDetails.value = leadLog
}
</script>

<template>
    <div class="wrapper">
        <TabMenu />
        <div class="d-flex justify-content-between align-items-center mt-3 intro">
            <h3 class="mt-4">Audit Log</h3>
            <div class="d-flex gap-3">
                <div class="toggleButton">
                    <v-btn class="text-none" color="#2E7D32" @click="showSummary = true">
                        Export Log
                    </v-btn>
                </div>
            </div>

        </div>
        <ToolBar @filterOptions="onFilterSelected" @searchValues="onSearchValuesEntered" :pageCounts="pageCount" :firstVal="firstValue"
        :lastVal="secondValue" :totalValue="totalArrayValue" :pageNum="pageNumber" @pageDetails="pageMovement"/>
        <div class="d-flex justify-content-between mt-4  ">
            <div class="custom-table table-responsive-sm">
                <div class="table-responsive" style="overflow-y: auto; height: 910px;">
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
                                        <span class="noshrink">Record ID</span>
                                        <span class="d-flex flex-column align-center">
                                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                        </span>
                                    </div>
                                </th>
                                <th scope="col">
                                    <div class="d-flex align-center gap-1">
                                        <span class="noshrink">Action</span>
                                        <span class="d-flex flex-column align-center">
                                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                        </span>
                                    </div>
                                </th>
                                <th scope="col">
                                    <div class="d-flex align-center gap-1">
                                        <span class="noshrink"> Date</span>
                                        <span class="d-flex flex-column align-center">
                                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                        </span>
                                    </div>
                                </th>
                                <th scope="col">
                                    <div class="d-flex align-center gap-1">
                                        <span> Action </span>
                                        <span class="d-flex flex-column align-center">
                                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                        </span>
                                    </div>
                                </th>
                                <th scope="col">
                                    <div class="d-flex align-center gap-1">
                                        <span> Date </span>
                                        <span class="d-flex flex-column align-center">
                                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                        </span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in pipelineDeals" :key="item.dealId">
                                <td>{{ item.count }}</td>
                                <td>{{ item.dealId }}{{ item.leadId }}</td>
                                <td>{{ item.createdBy }} created {{ item.dealId }}{{ item.leadId }}</td>
                                <td>{{ item.createdDate }}</td>
                                <td>{{ item.lastModifiedBy }} modified {{ item.dealId }}{{ item.leadId }}</td>
                                <td>{{ item.lastModifiedDate }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.intro h3 {
    font-size: 20px;
    font-weight: 600;
}

.intro p {
    font-size: 12px;
}

.highlight {
    position: sticky !important;
    top: 0 !important;
    background-color: rgb(219, 219, 219) !important;
    color: rgb(0, 0, 0) !important;
}

.side-panel {
    padding: 15px;
    background: #eeeeee;
    width: 36%;
}

.news {
    overflow: auto;
    /* max-width: 428px; */
    max-height: 900px;
}

.custom-table {
    width: 100%;
}

.accordion-button:focus {
    z-index: 3;
    border-color: none;
    outline: 0;
    box-shadow: none;
}

.accordion-body {
    padding: 10px;
}

.collapse.show {
    visibility: visible;
}

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

.noshrink {
    display: flex;
    flex-shrink: 0;
}

.v-btn-toggle {
    border: 1px solid black;
    width: 268px;
    justify-content: center;
    border-radius: 10px;
    background-color: #FFFFFF;
    padding: 3px 0px;
    box-sizing: border-box;
    height: 38px;
    background: #FFFFFF;
    border: 1px solid #D4D4D8;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06);
    border-radius: 5px;
}

.submit-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 35px;
    padding: 10px;
    gap: 10px;
    border-radius: 50px;
    background: var(--gradient, linear-gradient(90deg, #227cbf 0%, #47b65c 100%));
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    line-height: 19.2px;
}

.document-editor__toolbar5 {
    z-index: 1;
    border-bottom: 1px solid var(--ck-color-toolbar-border);
}

.document-editor__toolbar6 {
    z-index: 1;
    border-bottom: 1px solid var(--ck-color-toolbar-border);
}

.ckeditor {
    width: 100% !important;
    min-height: 150px !important;
}

.ckeditor2 {
    width: 100% !important;
    min-height: 400px !important;
}

.document-editor__toolbar5 .ck-toolbar {
    border: 0;
    border-radius: 0;
}

.document-editor__toolbar6 .ck-toolbar {
    border: 0;
    border-radius: 0;
}

.document-editor__editable-container {
    border: 1px hsl(0, 0%, 23%) solid;
}

.document-editor__editable-container .ck-editor__editable {
    margin-top: 0px;
    border: 1px hsl(0, 0%, 82.7%) solid;
    background: white;
    box-shadow: 0 0 5px hsla(0, 0%, 0%, .1);
}

.checkEditor {
    height: 150px !important;
    border-radius: 8px;
}

.checkEditor2 {
    height: 400px !important;
    border-radius: 8px;
}
</style>
        
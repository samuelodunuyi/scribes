<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useDashOptionStore } from "../../stores/dashOption"
import { useRoute, useRouter } from 'vue-router'
import Breadcrumb from '../../components/Breadcrumb.vue';
import 'vue3-toastify/dist/index.css';
import pinia from "../../stores/store";
import TRMSService from '../../services/trmsService'
import crmService from "../../services/crmService";

const route = useRoute()
const router = useRouter()
const stores = useDashOptionStore(pinia);
const dealOpened = ref([])
const allDeals = ref([])
const idx = ref('')
const companyName = ref('')
const companyId = ref('')
const dealId = ref('')
const isUser = ref(false)
const NBCFoucsAreaLines = ref([])
const dealGrade = ref('')
const selectedDealId = ref('')
const updateLastUser = ref('')
const updateLastUserDate = ref('')
const nextDeal = ref('')
const dealDocumentUrl = ref('')
const previousDeal = ref('')
idx.value = route.params.id2

onMounted(async () => {
    selectedDealId.value = idx.value
});

const next2 = async () => {
    allDeals.value = await TRMSService.getDeals()
    allDeals.value = allDeals.value.filter(o=>o.dealCategory!="CLOSED")
    dealOpened.value = allDeals.value.find(o => o.dealId === idx.value)
    const index = allDeals.value.map(object => object.dealId).indexOf(dealOpened.value.dealId)
    if (index > 0) {
        previousDeal.value = allDeals.value[index - 1].dealId
    }

    if (index < allDeals.value.length - 1) {
        nextDeal.value = allDeals.value[index + 1].dealId
    }

    if (allDeals.value != undefined) {
        NBCFoucsAreaLines.value = await TRMSService.getDealsNBCFocusAreasByDealID(dealOpened.value.dealId)
        let AllActivities = await crmService.getActivities()
        let selectedActivity = AllActivities.filter(o=>o.regardingRecordId==dealOpened.value.dealId).slice(-1)
        updateLastUser.value = selectedActivity[0].lastModifiedBy
        updateLastUserDate.value = selectedActivity[0].lastModifiedDate
        console.log(NBCFoucsAreaLines)
    }
    console.log(typeof(dealOpened.value.sharePointFileLink))
    if(typeof(dealOpened.value.sharePointFileLink)!= "null"){
    dealDocumentUrl.value = (dealOpened.value.sharePointFileLink).toString()
    }
}

const changeRoute = async () => {
    router.replace(`/trms/pipelinedeals_/detail/${selectedDealId.value}`)
    setTimeout(async () => {
        location.reload()
    }, 500);
}

const nextDeals = async () => {
    router.replace(`/trms/pipelinedeals_/detail/${nextDeal.value}`)
    setTimeout(async () => {
        location.reload()
    }, 500);
}

const previousDeals = async () => {
    if (previousDeal.value != '') {
        router.replace(`/trms/pipelinedeals_/detail/${previousDeal.value}`)
        setTimeout(async () => {
            location.reload()
        }, 500);
    }
}

const allDealsSelected = computed(() => {
    next2()
    if (dealOpened.value != undefined) {
        companyName.value = dealOpened.value.companyName
        dealId.value = dealOpened.value.dealId
        companyId.value = dealOpened.value.companyId
        dealGrade.value = dealOpened.value.dealCategory

        if (stores.signedInUserEmail === dealOpened.value.transactorLegal
            || stores.signedInUserEmail === dealOpened.value.coTransactor
            || stores.signedInUserEmail === dealOpened.value.originator
            || stores.signedInUserEmail === dealOpened.value.leadTransactor) {
            isUser.value = false
        }
        else {
            isUser.value = true
        }
        if (stores.signedInUserLevel == 'MANAGEMENT' || stores.signedInUserLevel == 'IT') {
            isUser.value = false
        }
    }
    if (dealOpened.value == undefined) {
        companyName.value = 'New'
    }
    return dealOpened.value
})

</script>

<template>
    <div class="wrapper grid-wrapper">
        <div class="sub mb-3">
            <Breadcrumb menu="TRMS" submenu="Pipeline Deals" :title="companyName" :grade="dealGrade" />
            <div class="d-flex justify-content-between align-center">
                <div class="d-flex align-center gap-1">
                    <h4> {{ companyName }}</h4>
                </div>
                <div style="flex-direction: row; display: flex">
                    <small style="margin-right: 20px; margin-top: 10px"> {{ dealId }}</small>
                    <select class="form-select" v-model="selectedDealId" @change="changeRoute" style="width: 250px">
                        <option :value=deals.dealId v-for="deals in allDeals" :key="deals.dealId">{{
                            deals.dealId }} - {{ deals.companyName }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="d-flex justify-content-between align-center mt-3" style="margin-bottom: -20px">
                <div class="d-flex align-center gap-1" style="cursor: pointer" @click="previousDeals()">
                    <v-icon>mdi-chevron-left</v-icon>Previous
                </div>
                <div style="cursor: pointer" @click="nextDeals()">
                    Next<v-icon>mdi-chevron-right</v-icon>
                </div>
            </div>
        </div>
        <div></div>
        <div class="details box-padded">
            <h4> Deal Team </h4>
            <hr>
            <div class="row g-2">
                <div class="col-4">
                    <b>Company Name</b>
                    <p>{{ allDealsSelected.companyName }}</p>
                </div>
                <div class="col-4">
                    <b>Originator </b>
                    <p>{{ allDealsSelected.originatorName }}</p>
                </div>
                <div class="col-4">
                    <b>Lead Transactor</b>
                    <p>{{ allDealsSelected.leadTransactorName }}</p>
                </div>

                <div class="col-4">
                    <b>Co-Transactor</b>
                    <p>{{ allDealsSelected.coTransactorName }}</p>
                </div>
                <div class="col-4">
                    <b>Transactor Legal</b>
                    <p>{{ allDealsSelected.transactorLegalName }}</p>
                </div>

                <div class="col-4">
                    <b>Transaction Phase</b>
                    <p>{{ allDealsSelected.transactionPhase }}</p>
                </div>

                <div class="col-4">
                    <b>Lead ID</b>
                    <p>{{ allDealsSelected.leadId }}</p>
                </div>
            </div>
        </div>
        <div class="checklist box-padded">
            <h4> Deal Description </h4>
            <hr>
            <div class="row g-2">
                <div class="col-6">
                    <b>Transaction Name</b>
                    <p>{{ allDealsSelected.transactionName }}</p>
                </div>
                <div class="col-6">
                    <b>Description </b>
                    <p style="word-wrap: break-word;">{{ allDealsSelected.transactionDescription }}</p>
                </div>

                <div class="col-6">
                    <b>Deal Status</b>
                    <span v-if="allDealsSelected.dealCategory === 'RED'" style="background: #FEE2E2; color: #940505; border-radius: 15px; width: 150px;"
                        class="grade-btn d-flex align-items-center justify-content-center gap-1 px-2 py-1">
                        <i class="dot" style="background: #f00;"></i>
                        Red
                    </span>
                    <span v-else-if="allDealsSelected.dealCategory === 'GREEN'" style="background-color: rgb(216, 251, 216); color:green; border-radius: 15px; width: 150px;" 
                        class="grade-btn d-flex align-items-center justify-content-center gap-1 px-2 py-1">
                        <i class="dot" style="background: green"></i>
                        Green
                    </span>
                    <span v-else-if="allDealsSelected.dealCategory === 'AMBER'" style="background-color: rgb(255, 250, 214); color: orange; border-radius: 15px; width: 150px;" 
                        class="grade-btn d-flex align-items-center justify-content-center gap-1 px-2 py-1">
                        <i class="dot" style="background: orange;"></i>
                        Amber
                    </span> <span v-else-if="allDealsSelected.dealCategory === 'CLOSED'"
                        style="background-color: rgb(212, 212, 207); color: rgb(102, 99, 94); border-radius: 15px; width: 150px;" 
                        class="grade-btn d-flex align-items-center justify-content-center gap-1 px-2 py-1">
                        <i class="dot" style="background: rgb(102, 99, 94);"></i>
                        Closed
                    </span>
                </div>

                <div class="col-6">
                    <b>Deal Size</b>
                    <p>₦{{ allDealsSelected.dealSize }}bn</p>
                </div>
            </div>
        </div>
        <div class="dealteam box-padded">
            <h4 class="mb-3"> NBC Focus Issues </h4>
            <h6>Key Issues</h6>
            <div class="row g-2 mb-2 pb-2" v-for="i in NBCFoucsAreaLines">
                <div class="col-12">
                    <ul>
                        <li style="list-style-type:square">{{ i.original }}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="otherdetails box-padded">
            <h4> Latest Transaction Updates </h4>
            <hr>
            <div class="row g-2">
                <div v-html="allDealsSelected.latestTransactionUpdate"></div>
            </div>
            <small><b>Last Modified By:</b> {{ updateLastUser }} at {{ updateLastUserDate }}</small>
        </div>
        <div class="otherdetails2 box-padded">
            <h4>View Transaction Document </h4>
            <hr>
            <div class="otherdetails2 box-padded">
                    <a :href="dealDocumentUrl" rel="noreferrer" target="_blank" style="text-decoration: none; justify-content: center; cursor: pointer; text-align: center; color: white; background-color: green; padding: 10px; border-radius: 10px; width: 200px;">View Documents</a>
            </div>
        </div>
    </div>
</template>


<style scoped>
.box-padded {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background: #FFFFFF;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}

div h4 {
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    margin: 0;
}

.grid-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(5, auto);
    grid-template-areas:
        "sub sub sub "
        "det chk fe"
        "dt  zk fe"
        "oth oth fe"
        ". . fe"
    ;
    gap: 20px;
}

.sub {
    grid-area: sub;
}

.details {
    grid-area: det;
}

.checklist {
    grid-area: chk;
}

.dealteam {
    grid-area: dt;
}

.fees {
    grid-area: fe;
}

.otherdetails {
    grid-area: zk;
}


.otherdetails2 {
    grid-area: oth;
}</style>
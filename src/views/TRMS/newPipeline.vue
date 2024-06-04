<script setup>
import Breadcrumb from '../../components/Breadcrumb.vue';
import trmsService from '../../services/trmsService';
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router'
import TransactionUpdate from '../../components/Cards/TransactionUpdate.vue'
import DealProfile from '../../components/Cards/DealProfile.vue'
import Fees from '../../components/Cards/Fees.vue'
import Stepper from 'bs-stepper'
import TRMSService from '../../services/trmsService'

const route = useRoute()
const dealOpened = ref([])
const num1 = ref(1)
const step1 = ref(null)
const idx = ref('')
const companyName = ref('')
const companyId = ref('')
const dealId = ref('')
const saveFees = ref('')
const loader = ref(false)
const saveDealProfile = ref('')
const saveTransactionUpdate = ref('')
var stepper1 = ref('')

idx.value = route.params.id2
onMounted(async () => {
    var stepper1Node = document.querySelector('#stepper1')
    stepper1.value = new Stepper(step1.value, {
        linear: false,
        animation: true
    })
    stepper1Node.addEventListener('show.bs-stepper', function (event) {
        console.warn('show.bs-stepper', event)
    })
    stepper1Node.addEventListener('shown.bs-stepper', function (event) {
        console.warn('shown.bs-stepper', event)
    })

    let allDeals = await TRMSService.getDeals()
    dealOpened.value = allDeals.find(o => o.dealId === idx.value)
    if (dealOpened.value != undefined) {
        companyName.value = dealOpened.value.companyName
        dealId.value = dealOpened.value.dealId
        companyId.value = dealOpened.value.companyId
    }
    if (dealOpened.value == undefined) {
        dealId.value = 'New'
    }
});

const next = (id) => {
    stepper1.value.next()  
      if (id == 2) {
        saveTransactionUpdate.value = true
    }
    else if (id == 3) {
        saveDealProfile.value = true
    }
    else if (id == 4) {
        saveFees.value = true
    }
}
const previous = () => {
    stepper1.value.previous()
}
const styleBackground = () => {
    if (num1.value > 1) {
        return 'background-color: #007BFF'
    }
}
const styleBackground2 = () => {
    if (num1.value > 2) {
        return 'background-color: #007BFF'
    }
}
const styleBackground3 = () => {
    if (num1.value > 3) {
        return 'background-color: #007BFF'
    }
}

const onSaveNewChanged = (isCorrect) => {
    loader.value = isCorrect
}
</script>
 

<template>
    <div class="wrapper">
        <div class="Breadcrumb">
            <Breadcrumb menu="TRMS" submenu="Pipeline Deals" title="new" style="margin-left: -50px;" />
            <div class="d-flex justify-content-between align-center">
                <div class="d-flex align-center gap-1">
                    <h4> New </h4>
                </div>
                <small> </small>
            </div>
        </div>
    </div>
    <div class="wrapper" style="margin-top: -35px;">
        <div id="stepper1" class="bs-stepper" ref="step1">
            <div class="bs-stepper-header mb-2" style="overflow: auto;" id="style-4">
                <div class="step" data-target="#test-l-1" @click="num1 = 1">
                    <button type="button" class="btn step-trigger">
                        <span class="bs-stepper-circle" :style="styleBackground()">
                            <v-icon style="padding-bottom: 10px !important;">mdi-card-account-mail</v-icon>
                        </span>
                        <span class="bs-stepper-label">Transaction Team Info</span>
                    </button>
                </div>
                <div class="line" v-if="num1 < 2"></div>
                <div class="line" style="background-color: #024a97; border: 1px solid #007BFF; border-radius: 10px;" v-else>
                </div>
                <div class="step" data-target="#test-l-2" @click="num1 = 2">
                    <button type="button" class="btn step-trigger">
                        <span class="bs-stepper-circle" :style="styleBackground2()">
                            <v-icon style="padding-bottom: 10px !important;">mdi-microsoft-teams</v-icon>
                        </span>
                        <span class="bs-stepper-label">Deal Profile</span>
                    </button>
                </div>

                <div class="line" v-if="num1 < 3"></div>
                <div class="line" style="background-color: #007BFF; border: 1px solid #007BFF; border-radius: 10px;" v-else>
                </div>
                <div class="step" data-target="#test-l-3" @click="num1 = 3;">
                    <button type="button" class="btn step-trigger">
                        <span class="bs-stepper-circle" :style="styleBackground3()">
                            <v-icon style="padding-bottom: 10px !important;">mdi-cash-check</v-icon>
                        </span>
                        <span class="bs-stepper-label">Fees</span>
                    </button>
                </div>
            </div>
            <div class="bs-stepper-content" style="margin-left: -20px; margin-right: -20px;">
                <div id="test-l-1" class="content">
                    <v-card title="Transaction Team Info">
                        <div class="details box-padded">
                            <TransactionUpdate column="col-6" :button="false" :selectedDealDetails="dealOpened" :saveValue="saveTransactionUpdate" :isNew="dealId" />
                        </div>
                    </v-card>
                    <div class="d-flex justify-content-end mt-3 gap-3">
                        <button class="submit-button" @click="next(2); num1 = 2">Update/Next</button>
                    </div>
                </div>
                <div id="test-l-2" class="content">
                    <v-card title="Deal Profile" flat>
                        <div class="dealteam box-padded">
                            <DealProfile column="col-3" :selectedDealDetails="dealOpened" :saveValue="saveDealProfile" :isNew="dealId" />
                        </div>
                    </v-card>
                    <div class="d-flex justify-content-end mt-3 gap-3">
                        <button class="submit-button-back" @click="previous(); num1 = 1">Previous</button>
                        <button class="submit-button" @click="next(3); num1 = 3">Update/Next</button>
                    </div>
                </div>
                <div id="test-l-3" class="content">
                    <v-card title="Fees" flat>
                        <div class="otherdetails box-padded">
                            <Fees column="col-6" :button="false" :selectedDealDetails="dealOpened" :saveValue="saveFees" :isNew="dealId" 
                            @saveNew="onSaveNewChanged" />
                        </div>
                    </v-card>
                    <div class="d-flex justify-content-end mt-3 gap-3">
                        <v-btn class="submit-button-back" @click="previous(); num1 = 2">Previous</v-btn>
                        <v-btn class="submit-button" @click="next(4); num1 = 4; loader=true" :loading="loader">Create Deal</v-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.wrapper {
    padding: 20px 50px;
    background: #fafafb;
}

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
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: repeat(5, auto);
    grid-template-areas:
        "det chk fe"
        "dt  dt fe"
        "oth oth fe"
        ". . fe"
    ;
    gap: 20px;
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

#style-4::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background: #fff;
}

#style-4::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    border-radius: 25px;
    position: absolute;
    z-index: -1;
}

#style-4::-webkit-scrollbar-thumb {
    background: #555;
    position: absolute;
    border-radius: 10px;
    z-index: -1;
}

.otherdetails {
    grid-area: oth;
}
</style>
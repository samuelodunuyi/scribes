<script setup>
import Breadcrumb from '../../components/Breadcrumb.vue';
import { ref, onMounted, computed } from "vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useDashOptionStore } from "../../stores/dashOption"
import pinia from "../../stores/store";
import { useRoute } from 'vue-router'
import TransactionUpdate from '../../components/Cards/TransactionUpdate.vue'
import DealCategory from '../../components/Cards/DealCategory.vue'
import DealProfile from '../../components/Cards/DealProfile.vue'
import NBCFocusArea from '../../components/Cards/NBCFocusArea.vue'
import FundOptions from '../../components/Cards/FundOptions.vue'
import Fees from '../../components/Cards/Fees.vue'
import TransactionParties from '../../components/Cards/TransactionParties.vue'
import PerformanceIndicators from '../../components/Cards/PerformanceIndicators.vue'
import OtherConditions from '../../components/Cards/OtherConditions.vue'
import KeyDealsFactors from '../../components/Cards/KeyDealsFactors.vue'
import Amortization from '../../components/Cards/Amortization.vue'
import TimeLineCardTRMS from '../../components/Cards/TimeLineCardTRMS.vue'
import OtherFocusAreas from '../../components/Cards/OtherFocusAreas.vue';
import CreditCommitteeFocusAreas from '../../components/Cards/CreditCommitteeFocusAreas.vue';
import Stepper from 'bs-stepper'
import TRMSService from '../../services/trmsService'
import crmService from '../../services/crmService';
import DecoupledDocument from '@ckeditor/ckeditor5-build-decoupled-document';
import transactionSummaryTemplate from '../../components/transactionSummaryTemplate'

const dialogTimeline = ref(false)
const route = useRoute()
var editorConfig = {
    toolbar: ['bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'outdent', 'indent', '|', 'insertTable', 'undo', 'redo', 'alignment', 'fontColor', 'fontFamily', 'fontSize',
        'underline'],
}
const editor = DecoupledDocument
const stores = useDashOptionStore(pinia);
const dealOpened = ref([])
const num1 = ref(1)
const step1 = ref(null)
var stepper1 = ref('')
const idx = ref('')
const companyName = ref('')
const companyId = ref('')
const dealId = ref('')
const saveTransactionUpdate = ref(false)
const saveDealProfile = ref(false)
const saveFees = ref(false)
const saveDealCategory = ref(false)
const saveNBCFocusArea = ref(false)
const saveFundOptions = ref(false)
const saveOtherFocusArea = ref(false)
const saveccFocusAreas = ref(false)
const loadingButton = ref(false)
const saveTransactionParties = ref(false)
const savePerformanceIndicators = ref(false)
const saveOtherConditions = ref(false)
const saveKeyDealFactors = ref(false)
const activityDetails = ref('')
const saveAmoritization = ref(false)
const addLineNBCFocusArea = ref(false)
const addLineOtherFocusArea = ref(false)
const addLineCreditCommitteeFocusArea = ref(false)
const addLineTransactionParties = ref(false)
const addLinePerformanceIndicators = ref(false)
const addLineOtherconditions = ref(false)
const addLineKeyDealFactors = ref(false)
const isUser = ref(false)
const addLineAmortization = ref(false)
const showIframe = ref(false)
const dealGrade = ref('')
idx.value = route.params.id2

const onSaveValueChanged = (isCorrect) => {
    saveTransactionUpdate.value = isCorrect
    saveDealProfile.value = isCorrect
    saveFees.value = isCorrect
    saveDealCategory.value = isCorrect
    saveNBCFocusArea.value = isCorrect
    saveFundOptions.value = isCorrect
    saveOtherFocusArea.value = isCorrect
    saveccFocusAreas.value = isCorrect
    saveTransactionParties.value = isCorrect
    savePerformanceIndicators.value = isCorrect
    saveOtherConditions.value = isCorrect
    saveKeyDealFactors.value = isCorrect
    saveAmoritization.value = isCorrect
}
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

});

const next2 = async () => {
    let allDeals = await TRMSService.getDeals()
    dealOpened.value = allDeals.find(o => o.dealId === idx.value)
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

const executeSummaryDownload = () => {
    showIframe.value = true
    transactionSummaryTemplate.exportPdfTemplate(dealId.value)
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
const styleBackground4 = () => {
    if (num1.value > 4) {
        return 'background-color: #007BFF'
    }
}
const styleBackground5 = () => {
    if (num1.value > 5) {
        return 'background-color: #007BFF'
    }
}
const styleBackground6 = () => {
    if (num1.value > 6) {
        return 'background-color: #007BFF'
    }
}
const styleBackground7 = () => {
    if (num1.value > 7) {
        return 'background-color: #007BFF'
    }
}
const styleBackground8 = () => {
    if (num1.value > 8) {
        return 'background-color: #007BFF'
    }
}
const styleBackground9 = () => {
    if (num1.value > 9) {
        return 'background-color: #007BFF'
    }
}
const styleBackground10 = () => {
    if (num1.value > 10) {
        return 'background-color: #007BFF'
    }
}
const styleBackground11 = () => {
    if (num1.value > 11) {
        return 'background-color: #007BFF'
    }
}
const styleBackground12 = () => {
    if (num1.value > 12) {
        return 'background-color: #007BFF'
    }
}
const styleBackground13 = () => {
    if (num1.value > 13) {
        return 'background-color: #007BFF'
    }
}

const styleBackground14 = () => {
    if (num1.value > 14) {
        return 'background-color: #007BFF'
    }
}
const next = (id, value) => {
    if (value != 'trigger') {
        stepper1.value.next()
    }
    if (id == 2) {
        saveTransactionUpdate.value = true;
    }
    else if (id == 3) {
        saveDealProfile.value = true
    }
    else if (id == 4) {
        saveFees.value = true
    }
    else if (id == 5) {
        saveDealCategory.value = true
    }
    else if (id == 6) {
        saveFundOptions.value = true
    }
    else if (id == 8) {
        saveNBCFocusArea.value = true
    }
    else if (id == 15) {
        saveAmoritization.value = true
    }
}
const onOptionSelected = (isCorrect) => {
    addLineNBCFocusArea.value = isCorrect;
    addLineOtherFocusArea.value = isCorrect
    addLineCreditCommitteeFocusArea.value = isCorrect
    addLineTransactionParties.value = isCorrect
    addLinePerformanceIndicators.value = isCorrect
    addLineOtherconditions.value = isCorrect
    addLineKeyDealFactors.value = isCorrect
    addLineAmortization.value = isCorrect
}
const saveActivityType = async () => {
    loadingButton.value = true;

    let ps = await crmService.createActivitys(1, 'Transaction Update', companyId.value, 'CONT100001', dealId.value, dealId.value, 'Deal Activity', activityDetails.value, 'Completed', stores.signedInUserEmail, stores.signedInUserEmail, new Date().toJSON(), new Date().toJSON(), stores.signedInUserEmail)
    if (ps == true) {
        toast.success("Update Added to Transaction")
        setTimeout(async () => {
            dialogTimeline.value = false;
            loadingButton.value = false;
            activityDetails.value = ''
        }, 1500);
    }
    else {
        toast.error("An error occured")
        loadingButton.value = false;
    }
}
const onReady5 = (editor) => {
    const toolbarContainer = document.querySelector('.document-editor__toolbar5');
    toolbarContainer.appendChild(editor.ui.view.toolbar.element);
}
</script>
 

<template>
    <div class="wrapper">
        <div class="Breadcrumb">
            <Breadcrumb menu="TRMS" submenu="Pipeline Deals" :title="companyName" style="margin-left: -50px;"
                :grade="dealGrade" />
            <div class="d-flex justify-content-between align-center">
                <div class="d-flex align-center gap-1">
                    <h4> {{ companyName }}</h4>
                </div>
                <div
                    >
                    <small style="margin-right: 20px;"> {{ dealId }}</small>
                </div>
            </div>
        </div>
    </div>
    <div class="wrapper" style="margin-top: -35px;">
        <v-dialog v-model="dialogTimeline" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="text-h5 ml-3">Add new Update </span>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <div class="ckeditor">
                                <div class="document-editor__toolbar5"></div>
                                <div class="document-editor__editable-container">
                                    <ckeditor :editor="editor" :config="editorConfig" @ready="onReady5"
                                        v-model="activityDetails" class="checkEditor"></ckeditor>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="dialogTimeline = false">
                        Cancel
                    </v-btn>
                    <v-btn color="blue-darken-1" :loading="loadingButton" variant="text" @click="saveActivityType">Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="showIframe">
            <v-card>
                <v-card-title>
                    <span class="text-h5 ml-3">Transaction Summary </span>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <iframe :src="stores.transactionSummary" height="550px%" width="100%" title="Preview Template"></iframe>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="showIframe = false">
                        Cancel
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <div id="stepper1" class="bs-stepper d-flex" ref="step1">
            <div class="bs-stepper-header mb-2 d-flex"
                style="overflow: auto; flex-direction: column; max-height: 710px; border-bottom: 1px solid black; width: 390px"
                id="style-4">
                <div class="step alignToLeft" data-target="#test-l-1" @click="num1 = 1;">
                    <button type="button" class="btn step-trigger" style="margin-left: -22px">
                        <span class="bs-stepper-circle" :style="styleBackground()">
                            <v-icon style="padding-bottom: 10px !important;">mdi-card-account-mail</v-icon>
                        </span>
                        <span class="bs-stepper-label">Transaction Team Info</span>
                    </button>
                </div>
                <div class="line alignToLeft2" v-if="num1 < 2"></div>
                <div class="line alignToLeft2"
                    style="background-color: #024a97; border: 1px solid #007BFF; border-radius: 10px;" v-else>
                </div>
                <div class="step alignToLeft" data-target="#test-l-2" @click="num1 = 2; next(2, 'trigger')">
                    <button type="button" class="btn step-trigger" style="margin-left: -22px">
                        <span class="bs-stepper-circle" :style="styleBackground2()">
                            <v-icon style="padding-bottom: 10px !important;">mdi-microsoft-teams</v-icon>
                        </span>
                        <span class="bs-stepper-label">Deal Profile</span>
                    </button>
                </div>

                <div class="line alignToLeft2" v-if="num1 < 3"></div>
                <div class="line alignToLeft2"
                    style="background-color: #007BFF; border: 1px solid #007BFF; border-radius: 10px;" v-else>
                </div>
                <div class="step alignToLeft" data-target="#test-l-3" @click="num1 = 3; next(3, 'trigger')">
                    <button type="button" class="btn step-trigger" style="margin-left: -22px">
                        <span class="bs-stepper-circle" :style="styleBackground3()">
                            <v-icon style="padding-bottom: 10px !important;">mdi-cash-check</v-icon>
                        </span>
                        <span class="bs-stepper-label">Fees</span>
                    </button>
                </div>

                <div class="line alignToLeft2" v-if="num1 < 4"></div>
                <div class="line alignToLeft2"
                    style="background-color: #007BFF; border: 1px solid #007BFF; border-radius: 10px;" v-else>
                </div>
                <div class="step alignToLeft" data-target="#test-l-4" @click="num1 = 4; next(4, 'trigger')">
                    <button type="button" class="btn step-trigger" style="margin-left: -22px">
                        <span class="bs-stepper-circle" :style="styleBackground4()">
                            <v-icon style="padding-bottom: 10px !important;">mdi-handshake</v-icon>
                        </span>
                        <span class="bs-stepper-label">Deal Category</span>
                    </button>
                </div>

                <div class="line alignToLeft2" v-if="num1 < 5"></div>
                <div class="line alignToLeft2"
                    style="background-color: #007BFF; border: 1px solid #007BFF; border-radius: 10px;" v-else>
                </div>
                <div class="step alignToLeft" data-target="#test-l-5" @click="num1 = 5; next(5, 'trigger')">
                    <button type="button" class="btn step-trigger" style="margin-left: -22px">
                        <span class="bs-stepper-circle" :style="styleBackground5()">
                            <v-icon style="padding-bottom: 10px !important;">mdi-cash</v-icon>
                        </span>
                        <span class="bs-stepper-label">Funding Options</span>
                    </button>
                </div>

                <div class="line alignToLeft2" v-if="num1 < 6"></div>
                <div class="line alignToLeft2"
                    style="background-color: #007BFF; border: 1px solid #007BFF; border-radius: 10px;" v-else>
                </div>
                <div class="step alignToLeft" data-target="#test-l-6" @click="num1 = 6; next(6, 'trigger')">
                    <button type="button" class="btn step-trigger" style="margin-left: -22px">
                        <span class="bs-stepper-circle" :style="styleBackground6()">
                            <v-icon style="padding-bottom: 10px !important;">mdi-update</v-icon>
                        </span>
                        <span class="bs-stepper-label">Transaction Updates</span>
                    </button>
                </div>

                <div class="line alignToLeft2" v-if="num1 < 7"></div>
                <div class="line alignToLeft2"
                    style="background-color: #007BFF; border: 1px solid #007BFF; border-radius: 10px;" v-else>
                </div>
                <div class="step alignToLeft" data-target="#test-l-7" @click="num1 = 7; next(7, 'trigger')">
                    <button type="button" class="btn step-trigger" style="margin-left: -22px">
                        <span class="bs-stepper-circle" :style="styleBackground7()">
                            <v-icon style="padding-bottom: 10px !important;">mdi-magnify-expand</v-icon>
                        </span>
                        <span class="bs-stepper-label">NBC Focus Area</span>
                    </button>
                </div>

                <div class="line alignToLeft2" v-if="num1 < 8"></div>
                <div class="line alignToLeft2"
                    style="background-color: #007BFF; border: 1px solid #007BFF; border-radius: 10px;" v-else>
                </div>
                <div class="step alignToLeft" data-target="#test-l-8" @click="num1 = 8; next(8, 'trigger')">
                    <button type="button" class="btn step-trigger" style="margin-left: -22px">
                        <span class="bs-stepper-circle" :style="styleBackground8()">
                            <v-icon style="padding-bottom: 10px !important;">mdi-magnify</v-icon>
                        </span>
                        <span class="bs-stepper-label">Other Focus Areas</span>
                    </button>
                </div>

                <div class="line alignToLeft2" v-if="num1 < 9"></div>
                <div class="line alignToLeft2"
                    style="background-color: #007BFF; border: 1px solid #007BFF; border-radius: 10px;" v-else>
                </div>
                <div class="step alignToLeft" data-target="#test-l-9" @click="num1 = 9; next(9, 'trigger')">
                    <button type="button" class="btn step-trigger" style="margin-left: -22px">
                        <span class="bs-stepper-circle" :style="styleBackground9()">
                            <v-icon style="padding-bottom: 10px !important;">mdi-account-credit-card</v-icon>
                        </span>
                        <span class="bs-stepper-label">Credit Committee Focus Area</span>
                    </button>
                </div>

                <div class="line alignToLeft2" v-if="num1 < 10"></div>
                <div class="line alignToLeft2"
                    style="background-color: #007BFF; border: 1px solid #007BFF; border-radius: 10px;" v-else>
                </div>
                <div class="step alignToLeft" data-target="#test-l-10" @click="num1 = 10; next(10, 'trigger')">
                    <button type="button" class="btn step-trigger" style="margin-left: -22px">
                        <span class="bs-stepper-circle" :style="styleBackground10()">
                            <v-icon style="padding-bottom: 10px !important;">mdi-account-group</v-icon>
                        </span>
                        <span class="bs-stepper-label">Transaction Parties
                        </span>
                    </button>
                </div>

                <div class="line alignToLeft2" v-if="num1 < 11"></div>
                <div class="line alignToLeft2"
                    style="background-color: #007BFF; border: 1px solid #007BFF; border-radius: 10px;" v-else>
                </div>
                <div class="step alignToLeft" data-target="#test-l-11" @click="num1 = 11; next(11, 'trigger')">
                    <button type="button" class="btn step-trigger" style="margin-left: -22px">
                        <span class="bs-stepper-circle" :style="styleBackground11()">
                            <v-icon style="padding-bottom: 10px !important;">mdi-poll</v-icon>
                        </span>
                        <span class="bs-stepper-label">Performance Indicators</span>
                    </button>
                </div>

                <div class="line alignToLeft2" v-if="num1 < 12"></div>
                <div class="line alignToLeft2"
                    style="background-color: #007BFF; border: 1px solid #007BFF; border-radius: 10px;" v-else>
                </div>
                <div class="step alignToLeft" data-target="#test-l-12" @click="num1 = 12; next(12, 'trigger')">
                    <button type="button" class="btn step-trigger" style="margin-left: -22px">
                        <span class="bs-stepper-circle" :style="styleBackground12()">
                            <v-icon style="padding-bottom: 10px !important;">mdi-check-all</v-icon>
                        </span>
                        <span class="bs-stepper-label">Other Conditions</span>
                    </button>
                </div>

                <div class="line alignToLeft2" v-if="num1 < 13"></div>
                <div class="line alignToLeft2"
                    style="background-color: #007BFF; border: 1px solid #007BFF; border-radius: 10px;" v-else>
                </div>
                <div class="step alignToLeft" data-target="#test-l-13" @click="num1 = 13; next(13, 'trigger')">
                    <button type="button" class="btn step-trigger" style="margin-left: -22px">
                        <span class="bs-stepper-circle" :style="styleBackground13()">
                            <v-icon style="padding-bottom: 10px !important;">mdi-key-alert</v-icon>
                        </span>
                        <span class="bs-stepper-label">Key Deals Factors</span>
                    </button>
                </div>

                <div class="line alignToLeft2" v-if="num1 < 14"></div>
                <div class="line alignToLeft2"
                    style="background-color: #007BFF; border: 1px solid #007BFF; border-radius: 10px;" v-else>
                </div>
                <div class="step alignToLeft" data-target="#test-l-14" @click="num1 = 14; next(14, 'trigger')">
                    <button type="button" class="btn step-trigger" style="margin-left: -22px">
                        <span class="bs-stepper-circle" :style="styleBackground14()">
                            <v-icon style="padding-bottom: 10px !important;">mdi-sign-text</v-icon>
                        </span>
                        <span class="bs-stepper-label">Amortization</span>
                    </button>
                </div>
            </div>
            <div class="bs-stepper-content" style="margin-left: -20px; margin-right: -20px; width: 100%">
                <div id="test-l-1" class="content">
                    <v-card title="Transaction Team Info">
                        <div class="details box-padded">
                            <TransactionUpdate column="col-6" :button="false" :selectedDealDetails="allDealsSelected"
                                :saveValue="saveTransactionUpdate" :isNew="dealId" @saveValue="onSaveValueChanged"
                                :not-edit="isUser" />
                        </div>
                    </v-card>
                    <div class="d-flex justify-content-end mt-3 gap-3">
                        <button class="submit-button" @click="next(2); num1 = 2">Update</button>
                    </div>
                </div>
                <div id="test-l-2" class="content">
                    <v-card title="Deal Profile" flat>
                        <div class="dealteam box-padded">
                            <DealProfile column="col-3" :selectedDealDetails="allDealsSelected" :saveValue="saveDealProfile"
                                :isNew="dealId" @saveValue="onSaveValueChanged" :not-edit="isUser" />
                        </div>
                    </v-card>
                    <div class="d-flex justify-content-end mt-3 gap-3">
                        <button class="submit-button-back" @click="previous(); num1 = 1">Previous</button>
                        <button class="submit-button" @click="next(3); num1 = 3">Update</button>
                    </div>
                </div>
                <div id="test-l-3" class="content">
                    <v-card title="Fees" flat>
                        <div class="otherdetails box-padded">
                            <Fees column="col-6" :button="false" :selectedDealDetails="allDealsSelected"
                                :saveValue="saveFees" @saveValue="onSaveValueChanged" :not-edit="isUser" />
                        </div>
                    </v-card>
                    <div class="d-flex justify-content-end mt-3 gap-3">
                        <button class="submit-button-back" @click="previous(); num1 = 2">Previous</button>
                        <button class="submit-button" @click="next(4); num1 = 4">Update</button>
                    </div>
                </div>
                <div id="test-l-4" class="content">
                    <v-card title="Deal Category" flat>
                        <div class="otherdetails box-padded">
                            <DealCategory :button="false" :selectedDealDetails="dealOpened" :saveValue="saveDealCategory"
                                :isNew="dealId" @saveValue="onSaveValueChanged" :not-edit="isUser" />
                        </div>
                    </v-card>
                    <div class="d-flex justify-content-end mt-3 gap-3">
                        <button class="submit-button-back" @click="previous(); num1 = 3">Previous</button>
                        <button class="submit-button" @click="next(5); num1 = 5">Update</button>
                    </div>
                </div>
                <div id="test-l-5" class="content">
                    <v-card title="Funding Options" flat>
                        <div class="otherdetails box-padded">
                            <FundOptions :button="false" :selectedDealDetails="dealOpened" :saveValue="saveFundOptions"
                                :isNew="dealId" @saveValue="onSaveValueChanged" :not-edit="isUser" />
                        </div>
                    </v-card>
                    <div class="d-flex justify-content-end mt-3 gap-3">
                        <button class="submit-button-back" @click="previous(); num1 = 4">Previous</button>
                        <button class="submit-button" @click="next(6); num1 = 6">Update</button>
                    </div>
                </div>
                <div id="test-l-6" class="content">
                    <v-card title="Updates" flat>
                        <div class="otherdetails box-padded">
                            <TimeLineCardTRMS :selectedDealDetails="dealOpened" :isNew="dealId" />
                            <div class="col-12">
                                <div class="input-group" style="justify-content: flex-end;">
                                    <button class="btn btn-success" @click="dialogTimeline = true" :disabled="isUser"> Add
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </v-card>
                    <div class="d-flex justify-content-end mt-3 gap-3">
                        <button class="submit-button-back" @click="previous(); num1 = 5">Previous</button>
                        <button class="submit-button" @click="next(0); num1 = 7">Update</button>
                    </div>
                </div>
                <div id="test-l-7" class="content">
                    <v-card title="NBC Focus Area" flat>
                        <div class="d-flex justify-content-end" style="margin-top: -30px; font-size: 13px; cursor: pointer">
                            <span class="mr-2 d-flex align-center" style="color: #47B65C;"
                                @click="addLineNBCFocusArea = true">
                                Add <v-icon style="margin-top: -2px;" icon="mdi-plus-circle-outline"></v-icon>
                            </span>

                        </div>
                        <div class="otherdetails box-padded">
                            <NBCFocusArea column="col-6" :button="false" :selectedDealDetails="allDealsSelected"
                                :saveValue="saveNBCFocusArea" :isNew="dealId" :newLine="addLineNBCFocusArea"
                                @close="onOptionSelected" @saveValue="onSaveValueChanged" :not-edit="isUser" />
                        </div>
                    </v-card>
                    <div class="d-flex justify-content-end mt-3 gap-3">
                        <button class="submit-button-back" @click="previous(); num1 = 6">Previous</button>
                        <button class="submit-button" @click="next(8); num1 = 8">Update</button>
                    </div>
                </div>
                <div id="test-l-8" class="content">
                    <v-card title="Other Focus Area" flat>
                        <div class="d-flex justify-content-end" style="margin-top: -30px; font-size: 13px; cursor: pointer">
                            <span class="mr-2 d-flex align-center" style="color: #47B65C;"
                                @click="addLineOtherFocusArea = true">
                                Add <v-icon style="margin-top: -2px;" icon="mdi-plus-circle-outline"></v-icon>
                            </span>

                        </div>
                        <div class="otherdetails box-padded">
                            <OtherFocusAreas column="col-6" :button="false" :selectedDealDetails="dealOpened"
                                :isNew="dealId" :newLine="addLineOtherFocusArea" @close="onOptionSelected"
                                :not-edit="isUser" />
                        </div>
                    </v-card>
                    <div class="d-flex justify-content-end mt-3 gap-3">
                        <button class="submit-button-back" @click="previous(); num1 = 7">Previous</button>
                        <button class="submit-button" @click="next(0); num1 = 9">Update</button>
                    </div>
                </div>
                <div id="test-l-9" class="content">
                    <v-card title="Credit Committee Focus Area" flat>
                        <div class="d-flex justify-content-end" style="margin-top: -30px; font-size: 13px; cursor: pointer">
                            <span class="mr-2 d-flex align-center" style="color: #47B65C;"
                                @click="addLineCreditCommitteeFocusArea = true">
                                Add <v-icon style="margin-top: -2px;" icon="mdi-plus-circle-outline"></v-icon>
                            </span>

                        </div>
                        <div class="otherdetails box-padded">
                            <CreditCommitteeFocusAreas column="col-6" :button="false" :selectedDealDetails="dealOpened"
                                :isNew="dealId" :newLine="addLineCreditCommitteeFocusArea" @close="onOptionSelected"
                                :not-edit="isUser" />
                        </div>
                    </v-card>
                    <div class="d-flex justify-content-end mt-3 gap-3">
                        <button class="submit-button-back" @click="previous(); num1 = 8">Previous</button>
                        <button class="submit-button" @click="next(0); num1 = 10">Update</button>
                    </div>
                </div>
                <div id="test-l-10" class="content">
                    <v-card title="Transaction Parties" flat>
                        <div class="d-flex justify-content-end" style="margin-top: -30px; font-size: 13px; cursor: pointer">
                            <span class="mr-2 d-flex align-center" style="color: #47B65C;"
                                @click="addLineTransactionParties = true">
                                Add <v-icon style="margin-top: -2px;" icon="mdi-plus-circle-outline"></v-icon>
                            </span>

                        </div>
                        <div class="otherdetails box-padded">
                            <TransactionParties column="col-6" :button="false" :selectedDealDetails="dealOpened"
                                :isNew="dealId" :newLine="addLineTransactionParties" @close="onOptionSelected"
                                :not-edit="isUser" />
                        </div>
                    </v-card>
                    <div class="d-flex justify-content-end mt-3 gap-3">
                        <button class="submit-button-back" @click="previous(); num1 = 9">Previous</button>
                        <button class="submit-button" @click="next(0); num1 = 11">Update</button>
                    </div>
                </div>
                <div id="test-l-11" class="content">
                    <v-card title="Performance Indicators" flat>
                        <div class="d-flex justify-content-end" style="margin-top: -30px; font-size: 13px; cursor: pointer">
                            <span class="mr-2 d-flex align-center" style="color: #47B65C;"
                                @click="addLinePerformanceIndicators = true">
                                Add <v-icon style="margin-top: -2px;" icon="mdi-plus-circle-outline"></v-icon>
                            </span>
                        </div>
                        <div class="otherdetails box-padded">
                            <PerformanceIndicators column="col-6" :button="false" :selectedDealDetails="dealOpened"
                                :isNew="dealId" :newLine="addLinePerformanceIndicators" @close="onOptionSelected"
                                :not-edit="isUser" />
                        </div>
                    </v-card>
                    <div class="d-flex justify-content-end mt-3 gap-3">
                        <button class="submit-button-back" @click="previous(); num1 = 10">Previous</button>
                        <button class="submit-button" @click="next(0); num1 = 12">Update</button>
                    </div>
                </div>
                <div id="test-l-12" class="content">
                    <v-card title="Other Conditions Precedent" flat>
                        <div class="d-flex justify-content-end" style="margin-top: -30px; font-size: 13px; cursor: pointer">
                            <span class="mr-2 d-flex align-center" style="color: #47B65C;"
                                @click="addLineOtherconditions = true">
                                Add <v-icon style="margin-top: -2px;" icon="mdi-plus-circle-outline"></v-icon>
                            </span>

                        </div>
                        <div class="otherdetails box-padded">
                            <OtherConditions column="col-6" :button="false" :selectedDealDetails="dealOpened"
                                :isNew="dealId" :newLine="addLineOtherconditions" @close="onOptionSelected"
                                :not-edit="isUser" />
                        </div>
                    </v-card>
                    <div class="d-flex justify-content-end mt-3 gap-3">
                        <button class="submit-button-back" @click="previous(); num1 = 11">Previous</button>
                        <button class="submit-button" @click="next(0); num1 = 13">Update</button>
                    </div>
                </div>
                <div id="test-l-13" class="content">
                    <v-card title="Key Deals Factors" flat>
                        <div class="d-flex justify-content-end" style="margin-top: -30px; font-size: 13px; cursor: pointer">
                            <span class="mr-2 d-flex align-center" style="color: #47B65C;"
                                @click="addLineKeyDealFactors = true">
                                Add <v-icon style="margin-top: -2px;" icon="mdi-plus-circle-outline"></v-icon>
                            </span>

                        </div>
                        <div class="otherdetails box-padded">
                            <KeyDealsFactors column="col-6" :button="false" :selectedDealDetails="dealOpened"
                                :isNew="dealId" :newLine="addLineKeyDealFactors" @close="onOptionSelected"
                                :not-edit="isUser" />
                        </div>
                    </v-card>
                    <div class="d-flex justify-content-end mt-3 gap-3">
                        <button class="submit-button-back" @click="previous(); num1 = 12">Previous</button>
                        <button class="submit-button" @click="next(0); num1 = 14">Update</button>
                    </div>
                </div>
                <div id="test-l-14" class="content">
                    <v-card title="Amortization" flat>
                        <div class="d-flex justify-content-end" style="margin-top: -30px; font-size: 13px; cursor: pointer">
                        </div>
                        <div class="otherdetails box-padded">
                            <Amortization column="col-6" :button="false" :selectedDealDetails="dealOpened"
                                :saveValue="saveAmoritization" :isNew="dealId" @saveValue="onSaveValueChanged"
                                :not-edit="isUser" />
                        </div>
                    </v-card>
                    <div class="d-flex justify-content-end mt-3 gap-3">
                        <button class="submit-button-back" @click="previous(); num1 = 13">Previous</button>
                        <button class="submit-button" @click="next(15); num1 = 15">Finish Update</button>
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
    width: 7px;
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

.document-editor__toolbar5 {
    z-index: 1;
    border-bottom: 1px solid var(--ck-color-toolbar-border);
}

.ckeditor {
    width: 100% !important;
    min-height: 200px !important;
}

.document-editor__toolbar5 .ck-toolbar {
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

.alignToLeft {
    margin-left: 0;
    margin-right: auto;
}

.alignToLeft2 {
    margin-left: 15px;
    margin-right: auto;
}

.checkEditor {
    height: 200px !important;
    border-radius: 8px;
}
</style>
<script setup>
import { ref, watch } from 'vue';
import Toggle from '../Toggle.vue';
import trmsService from '../../services/trmsService';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useDashOptionStore } from "../../stores/dashOption"
import pinia from "../../stores/store";
const emit = defineEmits(["saveValue"])

const emitSaveValue = (isCorrects) => {
    emit("saveValue", isCorrects)
}
const props = defineProps(['column', 'button', 'saveValue', 'selectedDealDetails', 'notEdit'])
const stores = useDashOptionStore(pinia);
const mandateLetterSigned = ref(false)
const dueDilligenceOngoing = ref(false)
const pendingCcAppvoal = ref(false)
const feeLetter_In_8weeks = ref(false)
const materialCpswithClient = ref(false)
const executedFeeLetterDocumentation = ref(false)
const obtainedCcApproval = ref(false)
const guaranteeDocument = ref(false)
const partiesToBondSelected = ref(false)
const filedSEC = ref(false)
const cpToFinancialCloseMetByClient = ref(false)
const financialCloseIn6months = ref(false)
const transactionFinancialClose = ref(false)
const lastModifiedBy = ref('')
const lastModifiedDate = ref('')


watch(() => props.selectedDealDetails, (first, second) => {
    if (JSON.stringify(first) !== JSON.stringify(second)) {
        let deals = props.selectedDealDetails
        if (deals != undefined) {
            if (deals.dealCategory == 'RED') {
                mandateLetterSigned.value = true

            } else {
                mandateLetterSigned.value = deals.mandateLetterSigned
            }
            dueDilligenceOngoing.value = deals.dueDiligenceOngoing
            pendingCcAppvoal.value = deals.creditCommitteeApprovalPending
            feeLetter_In_8weeks.value = deals.documentationExpectedToSignInEightWks
            materialCpswithClient.value = deals.materialsCPsWithTimelinesAgreed
            executedFeeLetterDocumentation.value = deals.executedDocumentation
            obtainedCcApproval.value = deals.creditCommitteeApprovalObtained
            guaranteeDocument.value = deals.guaranteeDocumentInAgreedForm
            partiesToBondSelected.value = deals.professionalPartiesAppointed
            filedSEC.value = deals.filingWithSEC
            cpToFinancialCloseMetByClient.value = deals.materialsCPsToFinancialCloseIsSatisfactory
            financialCloseIn6months.value = deals.financialCloseExpectedWithinSixMonths
            transactionFinancialClose.value = deals.financialCloseReached
            lastModifiedDate.value = deals.lastModifiedDate.slice(0, 10).replace(/-/g, '-')
            lastModifiedBy.value = deals.lastModifiedBy
        }
    }
});

watch(() => props.saveValue, async (first, second) => {
    let allData = props.selectedDealDetails;
    emitSaveValue(false)
    if (props.saveValue == true && allData.dealCategory != null) {
        let ps = await trmsService.updateDealCategory(allData.dealId, mandateLetterSigned.value, dueDilligenceOngoing.value, pendingCcAppvoal.value, obtainedCcApproval.value, partiesToBondSelected.value, feeLetter_In_8weeks.value, materialCpswithClient.value, executedFeeLetterDocumentation.value, guaranteeDocument.value, filedSEC.value, cpToFinancialCloseMetByClient.value, financialCloseIn6months.value, transactionFinancialClose.value, stores.signedInUserEmail, new Date().toJSON())
    }
});

const checkFeeLette8Wks = () => {
    if (pendingCcAppvoal.value !== true || dueDilligenceOngoing.value !== true || mandateLetterSigned.value !== true || obtainedCcApproval.value !== true) {
        toast.warn('Items above still pending');
        feeLetter_In_8weeks.value = false
    }
}
const checkCCApproval = () => {
    if (pendingCcAppvoal.value !== true || dueDilligenceOngoing.value !== true || mandateLetterSigned.value !== true) {
        toast.warn('Items above still pending');
        obtainedCcApproval.value = false
    }
}

const executedFeeLetterCheck = () => {
    if (obtainedCcApproval.value !== true || materialCpswithClient.value !== true || feeLetter_In_8weeks.value !== true) {
        toast.warn('Items above still pending')
        executedFeeLetterDocumentation.value = false

    }
}

const checkGuaranteeDocAgreedForm = () => {
    if (obtainedCcApproval.value !== true || materialCpswithClient.value !== true || feeLetter_In_8weeks.value !== true || executedFeeLetterDocumentation.value !== true) {
        toast.warn('Items above still pending')
        guaranteeDocument.value = false

    }
}
const checkFinancialClose = () => {
    if (financialCloseIn6months.value !== true || cpToFinancialCloseMetByClient.value !== true || filedSEC.value !== true || partiesToBondSelected.value !== true || guaranteeDocument.value !== true || executedFeeLetterDocumentation.value !== true) {
        toast.warn('Items above still pending')
        transactionFinancialClose.value = false

    }
}
const update = async () => {
    let allData = props.selectedDealDetails
    let ps = await trmsService.updateDealCategory(allData.dealId, mandateLetterSigned.value, dueDilligenceOngoing.value, pendingCcAppvoal.value, obtainedCcApproval.value, partiesToBondSelected.value, feeLetter_In_8weeks.value, materialCpswithClient.value, executedFeeLetterDocumentation.value, guaranteeDocument.value, filedSEC.value, cpToFinancialCloseMetByClient.value, financialCloseIn6months.value, transactionFinancialClose.value, stores.signedInUserEmail, new Date().toJSON())
    if (ps == 200) {
        toast.success('Transaction Updated')
    }

}
</script>
<template>
    <div class="d-flex flex-column gap-2">
        <h6 style="color: red"> Red Category </h6>
        <div class="form-group d-flex justify-content-between">
            <span> Mandate Letter signed: </span>

            <Toggle v-model:model-value="mandateLetterSigned" :disabled2="notEdit" key="5" />
        </div>
        <div class="form-group d-flex justify-content-between">
            <span> Due diligence ongoing: </span>

            <Toggle v-model:model-value="dueDilligenceOngoing" :disabled2="notEdit" />
        </div>
        <div class="form-group d-flex justify-content-between">
            <span> Pending Credit Committee approval: </span>
            <Toggle v-model:model-value="pendingCcAppvoal" :disabled2="notEdit" />
        </div>

        <div class="form-group d-flex justify-content-between">
            <span> Transaction has obtained Credit Committee approval: </span>

            <Toggle v-model:model-value="obtainedCcApproval" :disabled2="notEdit" @change="checkCCApproval" />
        </div>
        <hr>

        <h6 style="color: #FFBF1A"> Amber Category </h6>

        <div class="form-group d-flex justify-content-between">
            <span> Fee Letter and/or Guarantee Documentation expected to be negotiated and/or signed within 8 weeks: </span>

            <Toggle v-model:model-value="feeLetter_In_8weeks" :disabled2="notEdit" @change="checkFeeLette8Wks" />
        </div>
        <div class="form-group d-flex justify-content-between">
            <span> All Materials CPs with timelines for completion agreed with the client: </span>
            <Toggle v-model:model-value="materialCpswithClient" :disabled2="notEdit" />
        </div>

        <div class="form-group d-flex justify-content-between">
            <span> Executed Fee Letter and/or Guarantee Documentation </span>
            <Toggle v-model:model-value="executedFeeLetterDocumentation" :disabled2="notEdit"
                @change="executedFeeLetterCheck" />
        </div>
        <hr>

        <h6 style="color: #298729"> Green Category </h6>

        <div class="form-group d-flex justify-content-between">
            <span> Guarantee Document in agreed form: </span>

            <Toggle v-model:model-value="guaranteeDocument" :disabled2="notEdit" @change="checkGuaranteeDocAgreedForm" />
        </div>
        <div class="form-group d-flex justify-content-between">
            <span> Professional Parties to the Bond Issue appointed or selected: </span>

            <Toggle v-model:model-value="partiesToBondSelected" :disabled2="notEdit" />
        </div>
        <div class="form-group d-flex justify-content-between">
            <span> Already filed or expected filing with SEC (or equivalent Exchange) within 6 weeks: </span>

            <Toggle v-model:model-value="filedSEC" :disabled2="notEdit" />
        </div>
        <div class="form-group d-flex justify-content-between">
            <span> All Materials CPs to Financial Close have been satisfactorily met or committed by the Client for
                completion on or before Financial Close: </span>

            <Toggle v-model:model-value="cpToFinancialCloseMetByClient" :disabled2="notEdit" />
        </div>
        <div class="form-group d-flex justify-content-between">
            <span> Financial Close expected within 3-6 months: </span>

            <Toggle v-model:model-value="financialCloseIn6months" :disabled2="notEdit" />
        </div>

        <div class="form-group d-flex justify-content-between">
            <span> Transaction has reached financial close(executed deed of guarantee and/or disbursement) </span>

            <Toggle v-model:model-value="transactionFinancialClose" :disabled2="notEdit" @change="checkFinancialClose" />
        </div>

        <div class="d-flex justify-content-end mr-2 mt-3">
            <button type="submit" class="submit-button" v-if="button == true" @click.prevent="update">Update</button>
        </div>
        <small>Last Modified By: {{ lastModifiedBy }} at {{ lastModifiedDate }}</small>
    </div>
</template>

<style scoped>
input[type=checkbox] {
    accent-color: blue;
}

.form-group span:first-child {
    font-size: 12px;
    font-weight: 400;
    line-height: 14.4px;
    max-width: 85%;
}

input,
select {
    padding: 10px 20px 10px 10px;
    align-items: center;

    font-size: 14px;
    font-weight: 400;
    line-height: 14.4px;
}
</style>
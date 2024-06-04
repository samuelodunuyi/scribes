<script setup>
import { ref, watch } from 'vue';
import { useDashOptionStore } from "../../stores/dashOption"
import pinia from "../../stores/store";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useRouter } from 'vue-router';
import trmsService from '../../services/trmsService';
import crmService from '../../services/crmService';

const stores = useDashOptionStore(pinia);
const router = useRouter();
const props = defineProps(['details', 'selectedDealDetails', 'column', 'button', 'saveValue', 'isNew', 'notEdit'])
const emit = defineEmits(["saveValue", "saveNew"])
const amountInMN = ref(0)
const advanceInMN = ref(0)
const advancePercent = ref(0)
const finalPercent = ref(0)
const guaranteePercent = ref(0)
const monitoringInMN = ref(0)
const allData = ref([])
const reimbursableInMN = ref(0)
const lastModifiedBy = ref('')
const lastModifiedDate = ref('')

const emitSaveValue = (isCorrects) => {
    emit("saveValue", isCorrects)
}

const emitSaveNew = (isCorrects) => {
    emit("saveNew", isCorrects)
}

watch(() => props.selectedDealDetails, (first, second) => {
    if (JSON.stringify(first) !== JSON.stringify(second)) {
        let deals = props.selectedDealDetails
        allData.value = props.selectedDealDetails
        if (deals != undefined) {
            amountInMN.value = deals.amountInMN
            advanceInMN.value = deals.advanceInMN
            advancePercent.value = deals.advancePercent
            finalPercent.value = deals.finalPercent
            guaranteePercent.value = deals.guaranteePercent
            monitoringInMN.value = deals.monitoringInMN
            reimbursableInMN.value = deals.reimbursableInMN
            lastModifiedDate.value = deals.lastModifiedDate.slice(0, 10).replace(/-/g, '-')
            lastModifiedBy.value = deals.lastModifiedBy
        }
    }
});
watch(() => props.saveValue, async (first, second) => {
    let saveValue = props.saveValue
    allData.value = props.selectedDealDetails
    emitSaveValue(false)
    if (saveValue == true && props.isNew != 'New' && allData.value.dealCategory != null) {
        let ps = await trmsService.editDeal(allData.value.dealId, allData.value.leadId, allData.value.companyId, allData.value.companyDescription, allData.value.originator, allData.value.leadTransactor, allData.value.coTransactor,
            allData.value.transactorLegal, allData.value.administrator, allData.value.createdBy, stores.signedInUserEmail, allData.value.createdDate, new Date().toJSON(), stores.signedInUserEmail,
            allData.value.transactionPhase, allData.value.transactionDescription, allData.value.industryId, allData.value.productId, allData.value.regionCode, allData.value.dealSize, allData.value.couponPercent, allData.value.tenorInYrs,
            allData.value.moratoriumInYrs, allData.value.repaymentFrequency, allData.value.amortisationStyle, allData.value.mandateLetterDate, allData.value.creditApprovalDate, allData.value.feeLetterDate, allData.value.expectedCloseDate,
            allData.value.actualCloseDate, allData.value.nbcApprovalDate, allData.value.nbcSubmissionDate, allData.value.ccSubmissionDate, amountInMN.value, advanceInMN.value, advancePercent.value, finalPercent.value,
            guaranteePercent.value, monitoringInMN.value, reimbursableInMN.value, allData.value.mrocPreNBCApprovalDocLink, allData.value.mrocPreNBCApprovalDocLinkDate, allData.value.mrocPreNBCMinutesDocLink, allData.value.mrocPreNBCMinutesDocLinkDate, allData.value.nbcApprovalDocLink, allData.value.nbcApprovalDocLinkDate,
            allData.value.nbcMinutesDocLink, allData.value.nbcMinutesDocLinkDate, allData.value.mandateLetterOnboardingDocumentLink, allData.value.mandateLetterOnboardingDocumentLinkDate, allData.value.nbcSize, allData.value.nbcMandatedSize, allData.value.nbcMandatedDate, allData.value.financialYearName, allData.value.transactionName, allData.value.dealStatus)
    }
    else if (saveValue == true && props.isNew == 'New') {
        let financialYear = `FY${new Date().getFullYear()}`
        let allLeads = await crmService.getLeads()
        stores.newValuesDeals.push(amountInMN.value, advanceInMN.value, advancePercent.value, finalPercent.value, guaranteePercent.value, monitoringInMN.value, reimbursableInMN.value)
        let ps = await trmsService.createDeals(stores.newValuesDeals[0], stores.newValuesDeals[1], stores.newValuesDeals[2], stores.newValuesDeals[3], stores.newValuesDeals[4], stores.newValuesDeals[5], stores.newValuesDeals[6],
            stores.newValuesDeals[7], stores.newValuesDeals[8], stores.newValuesDeals[9], stores.newValuesDeals[10], stores.newValuesDeals[11], stores.newValuesDeals[12], stores.newValuesDeals[13], stores.newValuesDeals[14],
            stores.newValuesDeals[15], stores.newValuesDeals[16], stores.newValuesDeals[17], stores.newValuesDeals[18], stores.newValuesDeals[19], stores.newValuesDeals[20], stores.newValuesDeals[21], stores.newValuesDeals[22], stores.newValuesDeals[23],
            stores.newValuesDeals[24], stores.newValuesDeals[25], stores.newValuesDeals[26], stores.newValuesDeals[27], stores.newValuesDeals[28], stores.newValuesDeals[29], stores.newValuesDeals[30], stores.newValuesDeals[31],
            stores.newValuesDeals[32], stores.newValuesDeals[33], stores.newValuesDeals[34], stores.newValuesDeals[35], stores.newValuesDeals[36], stores.newValuesDeals[37], stores.newValuesDeals[38], stores.newValuesDeals[39], stores.newValuesDeals[40],stores.newValuesDeals[41],'RED', financialYear)

        if (typeof (ps) == "undefined"){
                emitSaveNew(false)
                toast.error(`An error occured, Error: ${ps}, please try again`)
            }
            else {
                emitSaveNew(false)
                if (stores.newValuesDeals[0].length > 2) {
                    var leads = null
                    leads = allLeads.find(o => o.leadId == stores.newValuesDeals[0])
                }
                toast.success(`Deal ${ps.dealId} Created Successfully`)
                if (leads !== undefined) {
                    let psww = await trmsService.createDealsClientContact(ps.dealId, ps.companyId, '', leads.primaryContactFirstName, leads.primaryContactLastName, leads.primaryContactPhoneNo, '', leads.primaryContactEmailAddress, 'Staff', stores.signedInUserEmail, stores.signedInUserEmail, new Date().toJSON(), new Date().toJSON())
                    if (leads.secondaryContactFirstName.length > 0) {
                        await trmsService.createDealsClientContact(ps.dealId, ps.companyId, '', leads.secondaryContactFirstName, leads.secondaryContactLastName, leads.secondaryContactPhoneNo, '', leads.secondaryContactEmailAddress, 'Staff', stores.signedInUserEmail, stores.signedInUserEmail, new Date().toJSON(), new Date().toJSON())
                    }
                }
                setTimeout(async () => {
                    router.replace(`/TRMS/pipelinedeals/`)
                }, 1300);
            }
    }
});
const update = async () => {
    allData.value = props.selectedDealDetails
    let ps = await trmsService.editDeal(allData.value.dealId, allData.value.leadId, allData.value.companyId, allData.value.companyDescription, allData.value.originator, allData.value.leadTransactor, allData.value.coTransactor,
        allData.value.transactorLegal, allData.value.administrator, allData.value.createdBy, stores.signedInUserEmail, allData.value.createdDate, new Date().toJSON(), stores.signedInUserEmail,
        allData.value.transactionPhase, allData.value.transactionDescription, allData.value.industryId, allData.value.productId, allData.value.regionCode, allData.value.dealSize, allData.value.couponPercent, allData.value.tenorInYrs,
        allData.value.moratoriumInYrs, allData.value.repaymentFrequency, allData.value.amortisationStyle, allData.value.mandateLetterDate, allData.value.creditApprovalDate, allData.value.feeLetterDate, allData.value.expectedCloseDate,
        allData.value.actualCloseDate, allData.value.nbcApprovalDate, allData.value.nbcSubmissionDate, allData.value.ccSubmissionDate, amountInMN.value, advanceInMN.value, advancePercent.value, finalPercent.value,
        guaranteePercent.value, monitoringInMN.value, reimbursableInMN.value, allData.value.mrocPreNBCApprovalDocLink, allData.value.mrocPreNBCApprovalDocLinkDate, allData.value.mrocPreNBCMinutesDocLink, allData.value.mrocPreNBCMinutesDocLinkDate, allData.value.nbcApprovalDocLink, allData.value.nbcApprovalDocLinkDate,
        allData.value.nbcMinutesDocLink, allData.value.nbcMinutesDocLinkDate, allData.value.mandateLetterOnboardingDocumentLink, allData.value.mandateLetterOnboardingDocumentLinkDate, allData.value.nbcSize, allData.value.nbcMandatedSize, allData.value.nbcMandatedDate, allData.value.financialYearName, allData.value.transactionName, allData.value.dealStatus)
    if (ps == 200) {
        toast.success('Transaction Updated')
    }

}
</script>

<template>
    <form>
        <div class="row g-2">
            <div :class="column">
                <label class="form-label">Amount (₦'MN)
                </label>
                <input type="number" class="form-control" v-model="amountInMN" :disabled="notEdit">
            </div>
            <div :class="column">
                <label class="form-label">Advance (₦'MN)
                </label>
                <input type="number" class="form-control" v-model="advanceInMN" :disabled="notEdit">
            </div>
            <div :class="column">
                <label class="form-label">Advance (%)
                </label>
                <input type="number" class="form-control" v-model="advancePercent" :disabled="notEdit">
            </div>
            <div :class="column">
                <label class="form-label">Final (%)
                </label>
                <input type="number" class="form-control" v-model="finalPercent" :disabled="notEdit">
            </div>
            <div :class="column">
                <label class="form-label">Guarantee (%)
                </label>
                <input type="number" class="form-control" v-model="guaranteePercent" :disabled="notEdit">
            </div>
            <div :class="column">
                <label class="form-label">Monitoring (₦'MN)
                </label>
                <input type="number" class="form-control" v-model="monitoringInMN" :disabled="notEdit">
            </div>

            <div :class="column">
                <label class="form-label">Reimbursable (₦'MN)
                </label>
                <input type="number" class="form-control" v-model="reimbursableInMN" :disabled="notEdit">
            </div>
            <small>Last Modified By: {{ lastModifiedBy }} at {{ lastModifiedDate }}</small>

            <div class="d-flex justify-content-end mr-2 mt-3">
                <button type="submit" class="submit-button" v-if="button == true" @click.prevent="update">Update</button>
            </div>
        </div>
    </form>
</template>
<style scoped>
label.form-label {
    /* Capion Bold */
    font-size: 14px;
    font-weight: 700;
    line-height: 14.4px;
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

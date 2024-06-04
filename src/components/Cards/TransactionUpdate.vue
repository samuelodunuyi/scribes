<script setup>
import { ref, watch, onMounted } from 'vue';
import { useDashOptionStore } from "../../stores/dashOption"
import pinia from "../../stores/store";
import trmsService from '../../services/trmsService';
import crmServices from '../../services/crmService';
import administrationsService from '../../services/administrationsService';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const stores = useDashOptionStore(pinia);
const props = defineProps(['details', 'selectedDealDetails', 'button', 'column', 'saveValue', 'isNew', 'notEdit'])
const emit = defineEmits(["saveValue"])
const emitSaveValue = (isCorrects) => {
    emit("saveValue", isCorrects)
}
const selectedTransactionPhase = ref('')
const selectedTransactorLegalUser = ref('')
const selectedCoTransactorUser = ref('')
const selectedAdministratorUser = ref('')
const selectedOriginatorUser = ref('')
const selectedLeadTransactorUser = ref('')
const selectedCompany = ref('')
const transactionPhase = ref('')
const companyDescription = ref('')
const leadId = ref('')
const originatorUser = ref([]);
const adminUser = ref([]);
const transactorUser = ref([]);
const coTransactorUser = ref([]);
const transactorLegalUser = ref([]);
const companyList = ref([]);
const users = ref([]);
const disableCompanyChange = ref(false);
const newValueDetails = ref([]);
const allData = ref([])
const lastModifiedBy = ref('')
const lastModifiedDate = ref('')
watch(() => props.selectedDealDetails, async (first, second) => {
    if (JSON.stringify(first) !== JSON.stringify(second)) {
        let deals = props.selectedDealDetails
        allData.value = props.selectedDealDetails
        if (deals != undefined) {
            selectedCompany.value = deals.companyId
            selectedTransactorLegalUser.value = deals.transactorLegal
            selectedCoTransactorUser.value = deals.coTransactor
            selectedOriginatorUser.value = deals.originator
            selectedLeadTransactorUser.value = deals.leadTransactor
            selectedTransactionPhase.value = deals.transactionPhase
            lastModifiedDate.value = deals.lastModifiedDate.slice(0, 10).replace(/-/g, '-')
            lastModifiedBy.value = deals.lastModifiedBy
            leadId.value = deals.leadId
            if (leadId.value.length > 4) {
                disableCompanyChange.value = true
            }
        }
        if (leadId.value.length > 4 && props.isNew == 'New') {
            let allLeads = await crmServices.getLeads()
            let selectedLead = allLeads.find(o => o.leadId == leadId.value)
            disableCompanyChange.value = true
            selectedCompany.value = selectedLead.companyId
            companyDescription.value = selectedLead.companyDescription
            selectedTransactorLegalUser.value = selectedLead.transactorLegal
            selectedAdministratorUser.value = selectedLead.administrator
            selectedCoTransactorUser.value = selectedLead.coTransactor
            selectedOriginatorUser.value = selectedLead.originator
            selectedLeadTransactorUser.value = selectedLead.leadTransactor
            transactionPhase.value = selectedLead.transactionPhase
        }
    }
});

watch(() => props.saveValue, async (first, second) => {
    let saveValue = props.saveValue
    allData.value = props.selectedDealDetails
    emitSaveValue(false)
    if (saveValue == true && props.isNew != 'New' && allData.value.dealCategory != null) {
        let ps = await trmsService.editDeal(allData.value.dealId, allData.value.leadId, selectedCompany.value, companyDescription.value, selectedOriginatorUser.value, selectedLeadTransactorUser.value, selectedCoTransactorUser.value,
            selectedTransactorLegalUser.value, selectedAdministratorUser.value, stores.signedInUserEmail, stores.signedInUserEmail, allData.value.createdDate, new Date().toJSON(), stores.signedInUserEmail,
            selectedTransactionPhase.value, allData.value.transactionDescription, allData.value.industryId, allData.value.productId, allData.value.regionCode, allData.value.dealSize, allData.value.couponPercent, allData.value.tenorInYrs,
            allData.value.moratoriumInYrs, allData.value.repaymentFrequency, allData.value.amortisationStyle, allData.value.mandateLetterDate, allData.value.creditApprovalDate, allData.value.feeLetterDate, allData.value.expectedCloseDate,
            allData.value.actualCloseDate, allData.value.nbcApprovalDate, allData.value.nbcSubmissionDate, allData.value.ccSubmissionDate, allData.value.amountInMN, allData.value.advanceInMN, allData.value.advancePercent, allData.value.finalPercent,
            allData.value.guaranteePercent, allData.value.monitoringInMN, allData.value.reimbursableInMN, allData.value.mrocPreNBCApprovalDocLink, allData.value.mrocPreNBCApprovalDocLinkDate, allData.value.mrocPreNBCMinutesDocLink, allData.value.mrocPreNBCMinutesDocLinkDate, allData.value.nbcApprovalDocLink, allData.value.nbcApprovalDocLinkDate,
            allData.value.nbcMinutesDocLink, allData.value.nbcMinutesDocLinkDate, allData.value.mandateLetterOnboardingDocumentLink, allData.value.mandateLetterOnboardingDocumentLinkDate, allData.value.nbcSize, allData.value.nbcMandatedSize, allData.value.nbcMandatedDate, allData.value.financialYearName, allData.value.transactionName, allData.value.dealStatus)
    }
    else if (saveValue == true && props.isNew == 'New') {
        stores.newValuesDeals = []
        newValueDetails.value.push(leadId.value, selectedCompany.value, companyDescription.value, selectedOriginatorUser.value, selectedLeadTransactorUser.value,
            selectedCoTransactorUser.value, selectedTransactorLegalUser.value, selectedAdministratorUser.value, stores.signedInUserEmail, stores.signedInUserEmail, new Date().toJSON(), new Date().toJSON(),
            stores.signedInUserEmail, selectedTransactionPhase.value)
        stores.newValuesDeals = newValueDetails.value
    }
});

onMounted(async () => {
    leadId.value = stores.selectedLeadID_newPipelineDeal
    companyList.value = await crmServices.getCompanies()
    users.value = await administrationsService.getUserRoles()
    transactorUser.value = users.value.filter(o => o.roleName === "Transactor" || o.roleName === "Co-Transactor" || o.roleName ==='Originator&Transactor' || o.roleName==='Transaction Analyst' || o.roleName==='Lead Transactor' || o.roleName==='Lead & Co Transactors')
    adminUser.value = users.value.filter(o => o.roleName === "Administrator")
    originatorUser.value = users.value.filter(o => o.roleName === "Originator" || o.roleName ==='Originator&Transactor')
    transactorLegalUser.value = users.value.filter(o => o.roleName === "Transaction Legal")
});

const update = async () => {
    allData.value = props.selectedDealDetails
    let ps = await trmsService.editDeal(allData.value.dealId, allData.value.leadId, selectedCompany.value, companyDescription.value, selectedOriginatorUser.value, selectedLeadTransactorUser.value, selectedCoTransactorUser.value,
        selectedTransactorLegalUser.value, selectedAdministratorUser.value, stores.signedInUserEmail, stores.signedInUserEmail, allData.value.createdDate, new Date().toJSON(), stores.signedInUserEmail,
        selectedTransactionPhase.value, allData.value.transactionDescription, allData.value.industryId, allData.value.productId, allData.value.regionCode, allData.value.dealSize, allData.value.couponPercent, allData.value.tenorInYrs,
        allData.value.moratoriumInYrs, allData.value.repaymentFrequency, allData.value.amortisationStyle, allData.value.mandateLetterDate, allData.value.creditApprovalDate, allData.value.feeLetterDate, allData.value.expectedCloseDate,
        allData.value.actualCloseDate, allData.value.nbcApprovalDate, allData.value.nbcSubmissionDate, allData.value.ccSubmissionDate, allData.value.amountInMN, allData.value.advanceInMN, allData.value.advancePercent, allData.value.finalPercent,
        allData.value.guaranteePercent, allData.value.monitoringInMN, allData.value.reimbursableInMN, allData.value.mrocPreNBCApprovalDocLink, allData.value.mrocPreNBCApprovalDocLinkDate, allData.value.mrocPreNBCMinutesDocLink, allData.value.mrocPreNBCMinutesDocLinkDate, allData.value.nbcApprovalDocLink, allData.value.nbcApprovalDocLinkDate,
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
                <v-autocomplete label="Company Name" density="compact" variant="outlined" v-model="selectedCompany"
                    :items="companyList" item-title="companyName" item-value="companyId" :disabled="disableCompanyChange">
                </v-autocomplete>
            </div>
            <div :class="column">
                <v-autocomplete label="Originator" density="compact" v-model="selectedOriginatorUser"
                    :items="originatorUser" variant="outlined" item-title="userFullName" item-value="userId" :readonly="notEdit">
                </v-autocomplete>
            </div>
            <div :class="column">
                <v-autocomplete label="Lead Transactor" density="compact" v-model="selectedLeadTransactorUser"
                    :items="transactorUser" variant="outlined" item-title="userFullName" :readonly="notEdit"
                    item-value="userId"></v-autocomplete>
            </div>

            <div :class="column">
                <v-autocomplete label="Co-Transactor" density="compact" v-model="selectedCoTransactorUser"
                    :items="transactorUser" variant="outlined" item-title="userFullName" :readonly="notEdit"
                    item-value="userId"></v-autocomplete>
            </div>
            <div :class="column">
                <v-autocomplete label="Transactor Legal" density="compact" item-title="userFullName" item-value="userId"
                    v-model="selectedTransactorLegalUser" :items="transactorLegalUser" variant="outlined" :readonly="notEdit"></v-autocomplete>
            </div>

            <div :class="column">
                <v-select label="Transaction Phase" :readonly="notEdit"
                    :items="['Mandate Phase', 'Due Dilligence Phase', 'Credit Approval Phase', 'Post Credit Approval Phase']"
                    density="compact" variant="outlined" v-model="selectedTransactionPhase"></v-select>
            </div>

            <div :class="column">
                <v-text-field label="Lead ID" density="compact" variant="outlined" v-model="leadId" :disabled="true"
                    v-if="disableCompanyChange"></v-text-field>
            </div>
            <small>Last Modified By: {{ lastModifiedBy }} at {{ lastModifiedDate }}</small>

            <div class="d-flex justify-content-end mr-2 mt-4">
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
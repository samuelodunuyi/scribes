<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useDashOptionStore } from "../../stores/dashOption"
import pinia from "../../stores/store";
import trmsService from '../../services/trmsService';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import settingsServices from '../../services/settingsServices';
import crmServices from '../../services/crmService';

const stores = useDashOptionStore(pinia);
const props = defineProps(['details', 'selectedDealDetails', 'column', 'button', 'saveValue', 'isNew', 'notEdit'],)
const emit = defineEmits(["saveValue"])
const emitSaveValue = (isCorrects) => {
    emit("saveValue", isCorrects)
}
const selectedIndustry = ref('')
const selectedProduct = ref('')
const selectedRegion = ref('')
const dealSize_NBN = ref('')
const couponpercentage = ref('')
const tenor = ref('')
const moratorium = ref('')
const repaymentFrequency = ref('')
const amorizationStyle = ref('')
const mandateLetterDate = ref('')
const creditApproval = ref('')
const projectDescription = ref('')
const transactionStatus = ref('')
const sharePointFileLink = ref('')
const transactionName = ref('')
const feeLetter = ref('')
const actualClose = ref('')
const expectedClose = ref('')
const nbcApproval = ref('')
const ccSubmission = ref('')
const nbcSubmission = ref('')
const transactionPhase = ref('')
const products = ref([]);
const region = ref([]);
const industries = ref([]);
const leadId = ref('')
const allData = ref([])
const lastModifiedBy = ref('')
const lastModifiedDate = ref('')

watch(() => props.selectedDealDetails, async (first, second) => {
    if (JSON.stringify(first) !== JSON.stringify(second)) {
        let deals = props.selectedDealDetails
        allData.value = props.selectedDealDetails
        if (deals != undefined) {
            selectedIndustry.value = deals.industryId
            selectedProduct.value = deals.productId
            selectedRegion.value = deals.regionCode
            dealSize_NBN.value = deals.dealSize
            couponpercentage.value = deals.couponPercent
            tenor.value = deals.tenorInYrs
            moratorium.value = deals.moratoriumInYrs
            repaymentFrequency.value = deals.repaymentFrequency
            amorizationStyle.value = deals.amortisationStyle
            lastModifiedDate.value = deals.lastModifiedDate.slice(0, 10).replace(/-/g, '-')
            lastModifiedBy.value = deals.lastModifiedBy
            projectDescription.value = deals.transactionDescription
            transactionStatus.value = deals.dealStatus
            sharePointFileLink.value = deals.sharePointFileLink
            transactionName.value = deals.transactionName
            sharePointFileLink.value = deals.sharePointFileLink

            if (deals.mandateLetterDate != null) {
                mandateLetterDate.value = deals.mandateLetterDate.slice(0, 10).replace(/-/g, '-')
                if (mandateLetterDate.value == '1996-01-01') {
                    mandateLetterDate.value = ''
                }
            }
            if (deals.creditApprovalDate != null) {
                creditApproval.value = deals.creditApprovalDate.slice(0, 10).replace(/-/g, '-')
                if (creditApproval.value == '1996-01-01') {
                    creditApproval.value = ''
                }
            }
            if (deals.feeLetterDate != null) {
                feeLetter.value = deals.feeLetterDate.slice(0, 10).replace(/-/g, '-')
                if (feeLetter.value == '1996-01-01') {
                    feeLetter.value = ''
                }
            }
            if (deals.actualCloseDate != null) {
                actualClose.value = deals.actualCloseDate.slice(0, 10).replace(/-/g, '-')
                if (actualClose.value == '1996-01-01') {
                    actualClose.value = ''
                }
            }
            if (deals.expectedCloseDate != null) {
                expectedClose.value = deals.expectedCloseDate.slice(0, 10).replace(/-/g, '-')
                if (expectedClose.value == '1996-01-01') {
                    expectedClose.value = ''
                }
            }
            if (deals.nbcApprovalDate != null) {
                nbcApproval.value = deals.nbcApprovalDate.slice(0, 10).replace(/-/g, '-')
                if (nbcApproval.value == '1996-01-01') {
                    nbcApproval.value = ''
                }
            }
            if (deals.ccSubmissionDate != null) {
                ccSubmission.value = deals.ccSubmissionDate.slice(0, 10).replace(/-/g, '-')
                if (ccSubmission.value == '1996-01-01') {
                    ccSubmission.value = ''
                }
            }
            if (deals.nbcSubmissionDate != null) {
                nbcSubmission.value = deals.nbcSubmissionDate.slice(0, 10).replace(/-/g, '-')
                if (nbcSubmission.value == '1996-01-01') {
                    nbcSubmission.value = ''
                }
            }
            transactionPhase.value = deals.transactionPhase
            leadId.value = deals.leadId
        }
        if (leadId.value.length > 4 && props.isNew == 'New') {
            let allLeads = await crmServices.getLeads()
            let selectedLead = allLeads.find(o => o.leadId == leadId.value)
            selectedIndustry.value = selectedLead.leadIndustrySectorId
            selectedProduct.value = selectedLead.productId
            dealSize_NBN.value = selectedLead.totalProjectSize_Indicative
            projectDescription.value = selectedLead.leadProjectDescription
        }
    }
});
watch(() => props.saveValue, async (first, second) => {
    let saveValue = props.saveValue
    allData.value = props.selectedDealDetails
    emitSaveValue(false)
    if (saveValue == true && props.isNew != 'New' && allData.value.dealCategory != null) {
        if (mandateLetterDate.value == '' && !mandateLetterDate.value) {
            mandateLetterDate.value = "1996-01-01T00:00:00.000Z"
        }
        if (creditApproval.value == '' && !creditApproval.value) {
            creditApproval.value = "1996-01-01T00:00:00.000Z"
        }
        if (feeLetter.value == '' && !feeLetter.value) {
            feeLetter.value = "1996-01-01T00:00:00.000Z"
        }
        if (expectedClose.value == '' && !expectedClose.value) {
            expectedClose.value = "1996-01-01T00:00:00.000Z"
        }
        if (nbcApproval.value == '' && !nbcApproval.value) {
            nbcApproval.value = "1996-01-01T00:00:00.000Z"
        }
        if (actualClose.value == '' && !actualClose.value) {
            actualClose.value = "1996-01-01T00:00:00.000Z"
        }
        if (nbcSubmission.value == '' && !nbcSubmission.value) {
            nbcSubmission.value = "1996-01-01T00:00:00.000Z"
        }
        if (ccSubmission.value == '' && !ccSubmission.value) {
            ccSubmission.value = "1996-01-01T00:00:00.000Z"
        }
        let ps = await trmsService.editDeal(allData.value.dealId, allData.value.leadId, allData.value.companyId, allData.value.companyDescription, allData.value.originator, allData.value.leadTransactor, allData.value.coTransactor,
            allData.value.transactorLegal, allData.value.administrator, allData.value.createdBy, stores.signedInUserEmail, allData.value.createdDate, new Date().toJSON(), stores.signedInUserEmail,
            allData.value.transactionPhase, projectDescription.value, selectedIndustry.value, selectedProduct.value, selectedRegion.value, dealSize_NBN.value, couponpercentage.value, tenor.value,
            moratorium.value, repaymentFrequency.value, amorizationStyle.value, mandateLetterDate.value, creditApproval.value, feeLetter.value, expectedClose.value,
            actualClose.value, nbcApproval.value, nbcSubmission.value, ccSubmission.value, allData.value.amountInMN, allData.value.advanceInMN, allData.value.advancePercent, allData.value.finalPercent,
            allData.value.guaranteePercent, allData.value.monitoringInMN, allData.value.reimbursableInMN, allData.value.mrocPreNBCApprovalDocLink, allData.value.mrocPreNBCApprovalDocLinkDate, allData.value.mrocPreNBCMinutesDocLink, allData.value.mrocPreNBCMinutesDocLinkDate, allData.value.nbcApprovalDocLink, allData.value.nbcApprovalDocLinkDate,
            allData.value.nbcMinutesDocLink, allData.value.nbcMinutesDocLinkDate, allData.value.mandateLetterOnboardingDocumentLink, allData.value.mandateLetterOnboardingDocumentLinkDate, allData.value.nbcSize, allData.value.nbcMandatedSize, allData.value.nbcMandatedDate, allData.value.financialYearName, transactionName.value, transactionStatus.value, sharePointFileLink.value)
    }
    else if (saveValue == true && props.isNew == 'New') {
        if (mandateLetterDate.value == '' && !mandateLetterDate.value) {
            mandateLetterDate.value = "1996-01-01T00:00:00.000Z"
        }
        if (creditApproval.value == '' && !creditApproval.value) {
            creditApproval.value = "1996-01-01T00:00:00.000Z"
        }
        if (feeLetter.value == '' && !feeLetter.value) {
            feeLetter.value = "1996-01-01T00:00:00.000Z"
        }
        if (expectedClose.value == '' && !expectedClose.value) {
            expectedClose.value = "1996-01-01T00:00:00.000Z"
        }
        if (nbcApproval.value == '' && !nbcApproval.value) {
            nbcApproval.value = "1996-01-01T00:00:00.000Z"
        }
        if (actualClose.value == '' && !actualClose.value) {
            actualClose.value = "1996-01-01T00:00:00.000Z"
        }
        if (nbcSubmission.value == '' && !nbcSubmission.value) {
            nbcSubmission.value = "1996-01-01T00:00:00.000Z"
        }
        if (ccSubmission.value == '' && !ccSubmission.value) {
            ccSubmission.value = "1996-01-01T00:00:00.000Z"
        }
        //starts from 14  transactionName.value, transactionStatus.value, sharePointFileLink.value,
        stores.newValuesDeals.push(projectDescription.value, selectedIndustry.value, selectedProduct.value, selectedRegion.value, dealSize_NBN.value, couponpercentage.value, tenor.value, moratorium.value, repaymentFrequency.value, amorizationStyle.value, mandateLetterDate.value, creditApproval.value, feeLetter.value, expectedClose.value, actualClose.value, nbcApproval.value, nbcSubmission.value, ccSubmission.value, transactionName.value, transactionStatus.value, sharePointFileLink.value)
    }
});
onMounted(async () => {
    leadId.value = stores.selectedLeadID_newPipelineDeal
    region.value = await settingsServices.getRegions()
    industries.value = await settingsServices.getIndustries()
    products.value = await settingsServices.getProducts()
});

const update = async () => {
    allData.value = props.selectedDealDetails
    if (mandateLetterDate.value == '' && !mandateLetterDate.value) {
        mandateLetterDate.value = "1996-01-01T00:00:00.000Z"
    }
    if (creditApproval.value == '' && !creditApproval.value) {
        creditApproval.value = "1996-01-01T00:00:00.000Z"
    }
    if (feeLetter.value == '' && !feeLetter.value) {
        feeLetter.value = "1996-01-01T00:00:00.000Z"
    }
    if (expectedClose.value == '' && !expectedClose.value) {
        expectedClose.value = "1996-01-01T00:00:00.000Z"
    }
    if (nbcApproval.value == '' && !nbcApproval.value) {
        nbcApproval.value = "1996-01-01T00:00:00.000Z"
    }
    if (actualClose.value == '' && !actualClose.value) {
        actualClose.value = "1996-01-01T00:00:00.000Z"
    }
    if (nbcSubmission.value == '' && !nbcSubmission.value) {
        nbcSubmission.value = "1996-01-01T00:00:00.000Z"
    }
    if (ccSubmission.value == '' && !ccSubmission.value) {
        ccSubmission.value = "1996-01-01T00:00:00.000Z"
    }
    let ps = await trmsService.editDeal(allData.value.dealId, allData.value.leadId, allData.value.companyId, allData.value.companyDescription, allData.value.originator, allData.value.leadTransactor, allData.value.coTransactor,
        allData.value.transactorLegal, allData.value.administrator, allData.value.createdBy, stores.signedInUserEmail, allData.value.createdDate, new Date().toJSON(), stores.signedInUserEmail,
        allData.value.transactionPhase, projectDescription.value, selectedIndustry.value, selectedProduct.value, selectedRegion.value, dealSize_NBN.value, couponpercentage.value, tenor.value,
        moratorium.value, repaymentFrequency.value, amorizationStyle.value, mandateLetterDate.value, creditApproval.value, feeLetter.value, expectedClose.value,
        actualClose.value, nbcApproval.value, nbcSubmission.value, ccSubmission.value, allData.value.amountInMN, allData.value.advanceInMN, allData.value.advancePercent, allData.value.finalPercent,
        allData.value.guaranteePercent, allData.value.monitoringInMN, allData.value.reimbursableInMN, allData.value.mrocPreNBCApprovalDocLink, allData.value.mrocPreNBCApprovalDocLinkDate, allData.value.mrocPreNBCMinutesDocLink, allData.value.mrocPreNBCMinutesDocLinkDate, allData.value.nbcApprovalDocLink, allData.value.nbcApprovalDocLinkDate,
        allData.value.nbcMinutesDocLink, allData.value.nbcMinutesDocLinkDate, allData.value.mandateLetterOnboardingDocumentLink, allData.value.mandateLetterOnboardingDocumentLinkDate, allData.value.nbcSize, allData.value.nbcMandatedSize, allData.value.nbcMandatedDate, allData.value.financialYearName, transactionName.value, transactionStatus.value, sharePointFileLink.value)
    if (ps == 200) {
        toast.success('Transaction Updated')
    }

}
</script>

<template>
    <form>
        <div class="row g-2">
            <div :class="column">
                <label class="form-label">Transaction Name
                </label>
                <input class="form-control" v-model="transactionName" :disabled="notEdit">
            </div>
            <div :class="column">
                <label class="form-label">Project Status
                </label>
                <select class="form-select" v-model="transactionStatus" :disabled="notEdit">
                    <option :value=true>Active</option>
                    <option :value=false>Inactive</option>
                </select>
            </div>
            <div :class="column">
                <label class="form-label">Industry
                </label>
                <select class="form-control" v-model="selectedIndustry" :disabled="notEdit">
                    <option :value=user.id v-for="user in industries" :key="user.id">{{
                        user.description }}
                    </option>
                </select>
            </div>
            <div :class="column">
                <label class="form-label">Products
                </label>

                <select class="form-select" v-model="selectedProduct" :disabled="notEdit">
                    <option :value=user.id v-for="user in products" :key="user.id">{{
                        user.description }}
                    </option>
                </select>
            </div>
            <div :class="column">
                <label class="form-label">Region
                </label>
                <select class="form-select" v-model="selectedRegion" :disabled="notEdit">
                    <option :value=user.regionCode v-for="user in region" :key="user.regionCode">{{
                        user.regionName }}
                    </option>
                </select>
            </div>
            <div :class="column">
                <label class="form-label">* Deal Size (₦'BN)
                </label>
                <input type="number" class="form-control" v-model="dealSize_NBN" :disabled="notEdit">
            </div>
            <div :class="column">
                <label class="form-label">* Coupon%
                </label>
                <input type="number" class="form-control" v-model="couponpercentage" :disabled="notEdit">
            </div>
            <div :class="column">
                <label class="form-label">* Tenor(yrs)
                </label>
                <input type="number" class="form-control" v-model="tenor" :disabled="notEdit">
            </div>
            <div :class="column">
                <label class="form-label">* Moratorium(yrs)
                </label>
                <input type="number" class="form-control" v-model="moratorium" :disabled="notEdit">
            </div>

            <div :class="column">
                <label class="form-label">Repayment Frequency
                </label>
                <select class="form-select" v-model="repaymentFrequency" :disabled="notEdit">
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Semi-Annually">Semi-Annually</option>
                    <option value="Annually">Annually</option>
                </select>
            </div>
            <div :class="column">
                <label class="form-label">Amorization Style
                </label>
                <select class="form-select" v-model="amorizationStyle" :disabled="notEdit">
                    <option value="Straight Line">Straight Line</option>
                    <option value="Annuity">Annuity</option>
                    <option value="Any Other">Any Other</option>
                </select>
            </div>
            <div :class="column">
                <label class="form-label">Mandate Letter
                </label>
                <input type="date" class="form-control" v-model="mandateLetterDate" :disabled="notEdit">
            </div>

            <div :class="column">
                <label class="form-label">Credit Approval
                </label>
                <input type="date" class="form-control" v-model="creditApproval" :disabled="notEdit">
            </div>
            <div :class="column">
                <label class="form-label">Fee Letter
                </label>
                <input type="date" class="form-control" v-model="feeLetter" :disabled="notEdit">
            </div>
            <div :class="column">
                <label class="form-label">Expected Close
                </label>
                <input type="date" class="form-control" v-model="expectedClose" :disabled="notEdit">
            </div>
            <div :class="column">
                <label class="form-label">Actual Close
                </label>
                <input type="date" class="form-control" v-model="actualClose" :disabled="notEdit">
            </div>
            <div :class="column">
                <label class="form-label">NBC Approval
                </label>
                <input type="date" class="form-control" v-model="nbcApproval" :disabled="notEdit">
            </div>
            <div :class="column">
                <label class="form-label">CC Submission
                </label>
                <input type="date" class="form-control" v-model="ccSubmission" :disabled="notEdit">
            </div>
            <div :class="column">
                <label class="form-label">NBC Submission
                </label>
                <input type="date" class="form-control" v-model="nbcSubmission" :disabled="notEdit">
            </div>
            <div :class="column">
                <label class="form-label">NBC Document Link
                </label>
                <input type="url" class="form-control" v-model="sharePointFileLink" :disabled="notEdit">
            </div>
            <div :class="12">
                <label class="form-label">Project Description 
                </label>
                <textarea class="form-control" v-model="projectDescription" :disabled="notEdit" style="resize: none;"></textarea>
            </div>
            <small>Last Modified By: {{ lastModifiedBy }} at {{ lastModifiedDate }}</small>
        </div>

        <div class="d-flex justify-content-end mr-2 mt-3">
            <button type="submit" class="submit-button" v-if="button == true" @click.prevent="update">Update</button>
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
 
<script setup>
import { ref, watch, computed } from 'vue';
import trmsService from '../../services/trmsService';
import { toast } from 'vue3-toastify';
import { useDashOptionStore } from "../../stores/dashOption"
import pinia from "../../stores/store";
import 'vue3-toastify/dist/index.css';
const props = defineProps(['column', 'button', 'saveValue', 'notEdit', 'selectedDealDetails', 'newLine'])
const stores = useDashOptionStore(pinia);

const emit = defineEmits(["close", "saveValue"])
const emitSelectedButton = (isCorrects) => {
    emit("close", isCorrects)
}
const emitSaveValue = (isCorrects) => {
    emit("saveValue", isCorrects)
}
const original = ref('')
const methodology = ref('')
const concerns = ref('')
const concernsDate = ref('')
const mroc_pre_nbc_approval = ref('')
const mroc_pre_nbc_approval_date = ref('')
const nbc_Approval = ref('')
const nbc_approval_date = ref('')
const mandateLetterIndicativeTermSheet = ref('')
const mandateLetterIndicativeTermSheetDate = ref('')
const NBC_ApprovalDate = ref('')
const NBC_MandatedDate = ref('')
const mroc_nbc_minutes = ref('')
const mroc_nbc_date = ref('')
const nbc_minutes = ref('')
const nbc_minutes_date = ref('')
const nbc_size = ref('')
const nbc_submittedDate = ref('')
const nbc_mandatedSize = ref('')
const disableDeleteButton = ref(false)
const dialog = ref(false)
const loading = ref(false)
const disableCancel = ref(false)
const NBCFoucsAreaLines = ref([])
const allData = ref([])
const lastModifiedBy = ref('')
const lastModifiedDate = ref('')

const clearModal = () => {
    original.value = ''
    methodology.value = ''
    concerns.value = ''
    concernsDate.value = ''
}
const removeLine = async (dealId, id) => {
    let ps = await trmsService.deleteDealsNBCFocusAreas(dealId, id)
    disableDeleteButton.value = true
    setTimeout(async () => {
        disableDeleteButton.value = false
    }, 1300);
    NBCFoucsAreaLines.value = await trmsService.getDealsNBCFocusAreasByDealID(dealId)
}
const editLine = async (values) => {
    let ps = await trmsService.editDealsNBCFocusAreas(values.dealId, values.id, values.original, values.concerns, values.date, values.methodology, values.createdBy, stores.signedInUserEmail, values.createdDate, new Date().toJSON())
    if (ps == 200) {
        NBCFoucsAreaLines.value = await trmsService.getDealsNBCFocusAreasByDealID(values.dealId)
        toast.success('Edit Successful')
    }
    setTimeout(async () => {
        disableDeleteButton.value = false
    }, 1300);
}
const openInNewTab = (url) => {
    window.open(url, '_blank', 'noreferrer');
}
const createNBCFocusAreaLine = async () => {
    loading.value = true
    disableCancel.value = true
    let ps = await trmsService.createNBCFocusArea(props.selectedDealDetails.dealId, original.value, concerns.value, concernsDate.value, methodology.value, stores.signedInUserEmail, stores.signedInUserEmail, new Date().toJSON(), new Date().toJSON())
    if (ps == true) {
        toast.success('NBC Added Successfully')
        setTimeout(async () => {
            emitSelectedButton(false)
            dialog.value = false
            loading.value = false
        }, 1300);
        NBCFoucsAreaLines.value = await trmsService.getDealsNBCFocusAreasByDealID(props.selectedDealDetails.dealId)
        disableCancel.value = false
        clearModal()
    }
    else {
        toast.error('An error Occured, Please try again')
        setTimeout(async () => {
            loading.value = false
        }, 1300);
        disableCancel.value = false
    }
}

const update = async () => {
    allData.value = props.selectedDealDetails
    if (allData.value.dealCategory != null) {
        let ps2 = await trmsService.editDeal(allData.value.dealId, allData.value.leadId, allData.value.companyId, allData.value.companyDescription, allData.value.originator, allData.value.leadTransactor, allData.value.coTransactor,
            allData.value.transactorLegal, allData.value.administrator, allData.value.createdBy, allData.value.lastModifiedBy, allData.value.createdDate, new Date().toJSON(), allData.value.recordOwner,
            allData.value.transactionPhase, allData.value.transactionDescription, allData.value.industryId, allData.value.productId, allData.value.regionCode, allData.value.dealSize, allData.value.couponPercent, allData.value.tenorInYrs,
            allData.value.moratoriumInYrs, allData.value.repaymentFrequency, allData.value.amortisationStyle, allData.value.mandateLetterDate, allData.value.creditApprovalDate, allData.value.feeLetterDate, allData.value.expectedCloseDate,
            allData.value.actualCloseDate, allData.value.nbcApprovalDate, nbc_submittedDate.value, allData.value.ccSubmissionDate, allData.value.amountInMN, allData.value.advanceInMN, allData.value.advancePercent, allData.value.finalPercent,
            allData.value.guaranteePercent, allData.value.monitoringInMN, allData.value.reimbursableInMN, mroc_pre_nbc_approval.value, mroc_pre_nbc_approval_date.value, mroc_nbc_minutes.value, mroc_nbc_date.value, nbc_Approval.value, nbc_approval_date.value, nbc_minutes.value, nbc_minutes_date.value, mandateLetterIndicativeTermSheet.value,
            mandateLetterIndicativeTermSheetDate.value, nbc_size.value, nbc_mandatedSize.value, NBC_MandatedDate.value, allData.value.financialYearName, allData.value.transactionName, allData.value.dealStatus)
        if (ps2 == 200) {
            toast.success('Transaction Updated')
        }
    }
}

watch(() => props.newLine, (first, second) => {
    if (props.newLine == true) {
        dialog.value = props.newLine
    }
});

watch(() => props.selectedDealDetails, async (first, second) => {
    if (JSON.stringify(first) !== JSON.stringify(second)) {
        let deals = props.selectedDealDetails
        allData.value = props.selectedDealDetails
        if (deals != undefined) {
            NBCFoucsAreaLines.value = await trmsService.getDealsNBCFocusAreasByDealID(deals.dealId)
            mroc_pre_nbc_approval.value = deals.mrocPreNBCApprovalDocLink
            lastModifiedDate.value = deals.lastModifiedDate.slice(0, 10).replace(/-/g, '-')
            lastModifiedBy.value = deals.lastModifiedBy
            if (deals.mrocPreNBCApprovalDocLinkDate != null) {
                mroc_pre_nbc_approval_date.value = deals.mrocPreNBCApprovalDocLinkDate.slice(0, 10).replace(/-/g, '-')
            }
            mroc_nbc_minutes.value = deals.mrocPreNBCMinutesDocLink
            if (deals.mrocPreNBCMinutesDocLinkDate != null) {
                mroc_nbc_date.value = deals.mrocPreNBCMinutesDocLinkDate.slice(0, 10).replace(/-/g, '-')
            }
            nbc_Approval.value = deals.nbcApprovalDocLink
            if (deals.nbcApprovalDocLinkDate != null) {
                nbc_approval_date.value = deals.nbcApprovalDocLinkDate.slice(0, 10).replace(/-/g, '-')
            }
            nbc_minutes.value = deals.nbcMinutesDocLink
            if (deals.nbcMinutesDocLinkDate != null) {
                nbc_minutes_date.value = deals.nbcMinutesDocLinkDate.slice(0, 10).replace(/-/g, '-')
            }
            mandateLetterIndicativeTermSheet.value = deals.mandateLetterOnboardingDocumentLink
            if (deals.mandateLetterOnboardingDocumentLinkDate != null) {
                mandateLetterIndicativeTermSheetDate.value = deals.mandateLetterOnboardingDocumentLinkDate.slice(0, 10).replace(/-/g, '-')
            }
            nbc_size.value = deals.nbcSize
            nbc_mandatedSize.value = deals.nbcMandatedSize
            if (deals.nbcMandatedDate != null) {
                NBC_MandatedDate.value = deals.nbcMandatedDate.slice(0, 10).replace(/-/g, '-')
            }
            if (deals.nbcSubmissionDate != null) {
                nbc_submittedDate.value = deals.nbcSubmissionDate.slice(0, 10).replace(/-/g, '-')
            }

        }
    }
});

watch(() => props.saveValue, async (first, second) => {
    emitSaveValue(false)
    if (props.saveValue == true && allData.value.dealCategory !== null) {
        let ps2 = await trmsService.editDeal(allData.value.dealId, allData.value.leadId, allData.value.companyId, allData.value.companyDescription, allData.value.originator, allData.value.leadTransactor, allData.value.coTransactor,
            allData.value.transactorLegal, allData.value.administrator, allData.value.createdBy, allData.value.lastModifiedBy, allData.value.createdDate, new Date().toJSON(), allData.value.recordOwner,
            allData.value.transactionPhase, allData.value.transactionDescription, allData.value.industryId, allData.value.productId, allData.value.regionCode, allData.value.dealSize, allData.value.couponPercent, allData.value.tenorInYrs,
            allData.value.moratoriumInYrs, allData.value.repaymentFrequency, allData.value.amortisationStyle, allData.value.mandateLetterDate, allData.value.creditApprovalDate, allData.value.feeLetterDate, allData.value.expectedCloseDate,
            allData.value.actualCloseDate, allData.value.nbcApprovalDate, nbc_submittedDate.value, allData.value.ccSubmissionDate, allData.value.amountInMN, allData.value.advanceInMN, allData.value.advancePercent, allData.value.finalPercent,
            allData.value.guaranteePercent, allData.value.monitoringInMN, allData.value.reimbursableInMN, mroc_pre_nbc_approval.value, mroc_pre_nbc_approval_date.value, mroc_nbc_minutes.value, mroc_nbc_date.value, nbc_Approval.value, nbc_approval_date.value, nbc_minutes.value, nbc_minutes_date.value, mandateLetterIndicativeTermSheet.value,
            mandateLetterIndicativeTermSheetDate.value, nbc_size.value, nbc_mandatedSize.value, NBC_MandatedDate.value, allData.value.financialYearName, allData.value.transactionName, allData.value.dealStatus)
    }
});


</script>

<template>
    <div>
        <v-dialog v-model="dialog" width="564" height="580" transition="dialog-right-transition"
            @click:outside="dialog = false; emitSelectedButton(false)">
            <v-card id="style-4">
                <v-card-title>
                    <div class="d-flex justify-content-between mt-3">
                        <span class="text-h5 ml-5">Add New NBC Focus Area</span>
                        <p class="mr-5" style="cursor: pointer;" @click="dialog = false; emitSelectedButton(false)">X</p>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-container style="margin-top: -20px">
                        <div class="row g-2 mb-2 pb-2">
                            <div :class="column">
                                <label class="form-label">Original
                                </label>
                                <textarea type="text" class="form-control" v-model="original" rows="5"
                                    :disabled="notEdit"></textarea>
                            </div>
                            <div :class="column">
                                <label for="lead-source" class="form-label">Methodology </label>
                                <textarea type="text" class="form-control" v-model="methodology" rows="5"
                                    :disabled="notEdit"></textarea>
                            </div>
                            <div :class="column">
                                <label class="form-label">Concerns
                                </label>
                                <select class="form-select" v-model="concerns" :disabled="notEdit">
                                    <option :value=false>No</option>
                                    <option :value=true>Yes</option>
                                </select>
                            </div>

                            <div :class="column">
                                <label class="form-label">Date
                                </label>
                                <input type="date" class="form-control" v-model="concernsDate" :disabled="notEdit">
                            </div>
                        </div>
                    </v-container>
                    <div class="mt-4 d-flex justify-content-end gap-2">
                        <v-btn class="rfqbtn" @click="createNBCFocusAreaLine()" :loading="loading" :disabled="notEdit">Create</v-btn>
                        <v-btn class="rfqbtn" @click="dialog = false; emitSelectedButton(false)"
                            :disabled="disableCancel">Cancel</v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
        <form>
            <div class="row g-2 mb-2 pb-2" v-for="i in NBCFoucsAreaLines"
                style="border-bottom: 1px solid rgb(172, 172, 172) ;">
                <div :class="column">
                    <label class="form-label">Original
                    </label>
                    <textarea type="text" class="form-control" v-model="i.original" :disabled="notEdit" rows="3"></textarea>
                </div>
                <div :class="column">
                    <label for="lead-source" class="form-label">Methodology </label>
                    <textarea type="text" class="form-control" v-model="i.methodology" :disabled="notEdit" rows="3"></textarea>
                </div>
                <div :class="column">
                    <label class="form-label">Concerns
                    </label>
                    <select class="form-select" v-model="i.concerns" :disabled="notEdit">
                        <option :value=false>No</option>
                        <option :value=true>Yes</option>
                    </select>
                </div>

                <div :class="column">
                    <label class="form-label">Date
                    </label>
                    <input type="date" class="form-control" :value="i.date.slice(0, 10).replace(/-/g, '-')"
                        @input="i.date = $event.target.value" :disabled="notEdit">
                </div>
                <small>Last Modified By: {{ i.lastModifiedBy }} at {{ i.lastModifiedDate }}</small>

                <div class="editdeleteadd">
                    <div class="d-flex justify-content-end mt-2">
                        <span class="mr-2 d-flex align-center" style="color: #0a38a3; cursor: pointer;"
                            @click="editLine(i)">
                            Edit/Save <v-icon icon="mdi-file-document-edit"></v-icon>
                        </span>
                        <span class="d-flex align-center" style="color: #F00; cursor: pointer;"
                            @click="removeLine(i.dealId, i.id)" :disabled="disableDeleteButton">
                            Delete <v-icon icon="mdi-trash-can-outline"></v-icon>
                        </span>
                    </div>
                </div>
            </div>
            <div class="row g-2">
                <h6>NBC Paper (Link to Doc)<small>**double click text to open link</small> </h6>

                <label class="form-label mb-0">MROC Pre_NBC Approval ( Link to Doc)</label>
                <div :class="column" v-on:dblclick="openInNewTab(mroc_pre_nbc_approval)">
                    <input type="text" class="form-control" v-model="mroc_pre_nbc_approval" :disabled="notEdit">
                </div>

                <div :class="column">
                    <input type="date" class="form-control" v-model="mroc_pre_nbc_approval_date" :disabled="notEdit">
                </div>

                <label class="form-label mb-0">MROC Pre_NBC Minutes ( Link to Doc)</label>
                <div :class="column" v-on:dblclick="openInNewTab(mroc_nbc_minutes)">
                    <input type="text" class="form-control" v-model="mroc_nbc_minutes" :disabled="notEdit">
                </div>

                <div :class="column">
                    <input type="date" class="form-control" v-model="mroc_nbc_date" :disabled="notEdit">
                </div>

                <label class="form-label mb-0">NBC Approval ( Link to Doc)</label>
                <div :class="column" v-on:dblclick="openInNewTab(nbc_Approval)">
                    <input type="text" class="form-control" v-model="nbc_Approval" :disabled="notEdit">
                </div>

                <div :class="column">
                    <input type="date" class="form-control" v-model="nbc_approval_date" :disabled="notEdit">
                </div>

                <label class="form-label mb-0">NBC Minutes ( Link to Doc)</label>
                <div :class="column" v-on:dblclick="openInNewTab(nbc_minutes)">
                    <input type="text" class="form-control" v-model="nbc_minutes" :disabled="notEdit">
                </div>

                <div :class="column">
                    <input type="date" class="form-control" v-model="nbc_minutes_date" :disabled="notEdit">
                </div>
                <label class="form-label mb-0">Mandate Letter with Indicative Term Sheet On-Boarding Documents</label>
                <div :class="column" v-on:dblclick="openInNewTab(mandateLetterIndicativeTermSheet)">
                    <input type="text" class="form-control" v-model="mandateLetterIndicativeTermSheet" :disabled="notEdit">
                </div>

                <div :class="column">
                    <input type="date" class="form-control" v-model="mandateLetterIndicativeTermSheetDate"
                        :disabled="notEdit">
                </div>

                <label class="form-label mb-0">NBC Size</label>
                <div :class="column">
                    <input type="number" class="form-control" v-model="nbc_size" :disabled="notEdit">
                </div>

                <div :class="column" style="margin-top: -15px;">
                    <label class="form-label mb-0">NBC Mandated Size</label>
                    <input type="number" class="form-control" v-model="nbc_mandatedSize" :disabled="notEdit">
                </div>

                <label class="form-label mb-0">NBC Mandated Date</label>
                <div :class="column"> <input type="date" class="form-control" v-model="NBC_MandatedDate"
                        :disabled="notEdit">
                </div>
                <div :class="column" style="margin-top: -15px;">
                    <label class="form-label mb-0">NBC Submitted Date</label>
                    <input type="date" class="form-control" v-model="nbc_submittedDate" :disabled="notEdit">
                </div>
                <small>Last Modified By: {{ lastModifiedBy }} at {{ lastModifiedDate }}</small>

                <div class="d-flex justify-content-end mr-2 mt-3">
                    <button type="submit" class="submit-button" v-if="button == true"
                        @click.prevent="update">Update</button>
                </div>

            </div>
        </form>
    </div>
</template>

<style scoped>
label.form-label {
    /* Capion Bold */
    font-size: 14px;
    font-weight: 700;
    line-height: 14.4px;
}

.editdeleteadd {
    font-size: 14px;
    font-weight: 400;
    line-height: 14.4px;
}

textarea {
    resize: none;
}

.rfqbtn {
    font-family: 'Inter';
    font-size: 14px;
    color: #FFFFFF;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 35px;
    background: #3949AB;
    border-radius: 10px;
    text-transform: none;
}

.rfqbtn:hover {
    color: #000000;
    width: 80px;
    height: 35px;
    border: 1px solid #3949AB;
    background: #ffffff;
    transition: 0.7s;
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
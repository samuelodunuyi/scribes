<script setup>

import { ref, onMounted, watch } from 'vue';
import administrationsService from '../../services/administrationsService';
import Toggle from '../Toggle.vue';
import CRMService from '../../services/crmService'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const props = defineProps(['selectedLeadDetails'])
const users = ref([]);
const transactorUser = ref([]);
const adminUser = ref([]);
const originatorUser = ref([]);
const transactorLegalUser = ref([]);
const selectedLeadTransactorUser = ref('');
const selectedCoTransactorUser = ref('');
const selectedAdminUser = ref('');
const selectedOriginatorUser = ref('');
const selectedTransactorLegalUser = ref('');
const lastModifiedBy = ref('')
const lastModifiedDate = ref('')

watch(() => props.selectedLeadDetails, (first, second) => {
    let newTransct = props.selectedLeadDetails
    selectedOriginatorUser.value = newTransct.originator
    selectedAdminUser.value = newTransct.administrator
    selectedLeadTransactorUser.value = newTransct.leadTransactor
    selectedCoTransactorUser.value = newTransct.coTransactor
    selectedTransactorLegalUser.value = newTransct.transactorLegal
    lastModifiedDate.value = newTransct.lastModifiedDate.slice(0, 10).replace(/-/g, '-')
    lastModifiedBy.value = newTransct.lastModifiedBy
});
onMounted(async () => {
    users.value = await administrationsService.getUserRoles()
    transactorUser.value = users.value.filter(o => o.roleName === "Transactor" || o.roleName === "Co-Transactor" || o.roleName ==='Originator&Transactor' || o.roleName==='Transaction Analyst' || o.roleName==='Lead Transactor' || o.roleName==='Lead & Co Transactors')
    adminUser.value = users.value.filter(o => o.roleName === "Administrator")
    originatorUser.value = users.value.filter(o => o.roleName === "Originator")
    transactorLegalUser.value = users.value.filter(o => o.roleName === "Transaction Legal")
});

const updateLead = async () => {
    let allData = props.selectedLeadDetails
    let ps = await CRMService.editLead(allData.leadId, allData.companyId, allData.companyDescription, allData.primaryContactId, allData.primaryContactFirstName, allData.primaryContactLastName, allData.primaryContactPhoneNo,
        allData.primaryContactEmailAddress, allData.secondaryContactId, allData.secondaryContactFirstName, allData.secondaryContactLastName, allData.secondaryContactPhoneNo, allData.secondaryContactEmailAddress, allData.leadTopic, allData.leadIndustrySectorId,
        allData.productId, allData.leadSourceId, allData.leadRating, allData.leadStatus, allData.createdBy, allData.lastModifiedBy, allData.createdDate, new Date().toJSON(), allData.recordOwner, selectedOriginatorUser.value,
        selectedLeadTransactorUser.value, selectedCoTransactorUser.value, selectedTransactorLegalUser.value, selectedAdminUser.value, allData.leadProjectDescription, allData.leadProjectStatusComment, allData.leadProjectNextStepActionPlan, allData.projectPreparatorySupportRequired,
        allData.projectPreparatorySupportDetails, allData.useOfProceeds, allData.leadIssuesAndChallenges, allData.leadProjectType, allData.leadProjectStage, allData.leadCategorization, allData.totalProjectSize_Indicative,
        allData.debtSize_Indicative, allData.initialContactDate, allData.lastContactDate, allData.companyAnniversaryDate, allData.initialInfo_PIC, allData.leadFactSheet, allData.mandatedLead, allData.ndaRequired,
        allData.ndaSent, allData.ndaExecuted, allData.piC_PIDSent, allData.piC_PIDExecuted, allData.grlSent, allData.grlExecuted, allData.projectViability, allData.commenceInitialKYC_IDD, allData.eS_AssessmentCommmenced,
        allData.assessmentOutcomeUpdated, allData.mrocApproval, allData.draftNBCPaperSent, allData.draftMandateLetterSent, allData.mandateSigned, allData.nbcApproved, allData.nbcNumber, allData.natureOfLastInteraction, allData.financialYearName)
    if (ps == 200) {
        toast.success('Update Successful')
    }
    else{
            toast.error(`An error occured, Error: ${ps}, please try again`)
        }
};
</script>

<template>
    <form>
        <div class="row g-2">

            <div class="col-6">
                <label for="lead-source" class="form-label">Originator</label>
                <select class="form-select" id="lead-source" v-model="selectedOriginatorUser">
                    <option :value=user.userId v-for="user in originatorUser" :key="user.userId">{{
                        user.userFullName }}
                    </option>
                </select>
            </div>

            <div class="col-6">
                <label for="lead-source" class="form-label">Administrator </label>
                <select class="form-select" id="lead-source" v-model="selectedAdminUser">
                    <option :value=user.userId v-for="user in adminUser" :key="user.userId">{{
                        user.userFullName }}
                    </option>
                </select>
            </div>

            <div class="col-6">
                <label for="lead-source" class="form-label">Lead Transactor </label>
                <select class="form-select" id="lead-source" v-model="selectedLeadTransactorUser">
                    <option :value=user.userId v-for="user in transactorUser" :key="user.userId">{{
                        user.userFullName }}
                    </option>
                </select>
            </div>

            <div class="col-6">
                <label for="lead-source" class="form-label">Co-Transactor </label>
                <select class="form-select" id="lead-source" v-model="selectedCoTransactorUser">
                    <option :value=user.userId v-for="user in transactorUser" :key="user.userId">{{
                        user.userFullName }}
                    </option>
                </select>
            </div>

            <div class="col-6">
                <label for="lead-source" class="form-label">Transactor Legal </label>
                <select class="form-select" id="lead-source" v-model="selectedTransactorLegalUser">
                    <option :value=user.userId v-for="user in transactorLegalUser" :key="user.userId">{{
                        user.userFullName }}
                    </option>
                </select>
            </div>
            <small>Last Modified By: {{ lastModifiedBy }} at {{ lastModifiedDate }}</small>

        </div>
        <div class="d-flex justify-content-end mr-2">

            <button type="submit" class="submit-button" @click.prevent="updateLead()">Update</button>
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

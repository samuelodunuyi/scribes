<script setup>

import { ref, watch } from 'vue';
import { toast } from 'vue3-toastify';
import crmService from '../../services/crmService';
import 'vue3-toastify/dist/index.css';
const props = defineProps(['selectedLeadDetails', 'saveValue'])
const projectDescription = ref('');
const projectType = ref('');
const projectStage = ref('');
const categorization = ref('');
const initialInfo_PIC = ref('');
const statusComment = ref('');
const nextStepActionPlan = ref('');
const totalProjectSize_Indicative = ref('');
const debtSize_Indicative = ref('');
const projectPreparatoryRequired = ref('');
const preparatorySupport_TechAssist = ref('');
const useofProceeds = ref('');
const initialContactDate = ref('');
const dayofLastContact = ref('');
const anniversaryDate = ref('');
const natureofLastInteraction = ref('');
const leadFactSheet = ref('');
const leadIssues = ref('');

watch(() => props.selectedLeadDetails, (first, second) => {
    let newwer = first
    let newwers = second
    let newTransct = props.selectedLeadDetails
    projectDescription.value = newTransct.leadProjectDescription
    projectType.value = newTransct.leadProjectType
    projectStage.value = newTransct.leadProjectStage
    categorization.value = newTransct.leadCategorization
    initialInfo_PIC.value = newTransct.initialInfo_PIC
    statusComment.value = newTransct.leadProjectStatusComment
    nextStepActionPlan.value = newTransct.leadProjectNextStepActionPlan
    totalProjectSize_Indicative.value = newTransct.totalProjectSize_Indicative
    debtSize_Indicative.value = newTransct.debtSize_Indicative
    projectPreparatoryRequired.value = newTransct.projectPreparatorySupportRequired
    preparatorySupport_TechAssist.value = newTransct.projectPreparatorySupportDetails
    useofProceeds.value = newTransct.useOfProceeds
    initialContactDate.value = newTransct.initialContactDate.slice(0, 10).replace(/-/g, '-')
    dayofLastContact.value = newTransct.lastContactDate.slice(0, 10).replace(/-/g, '-')
    anniversaryDate.value = newTransct.companyAnniversaryDate.slice(0, 10).replace(/-/g, '-')
    natureofLastInteraction.value = newTransct.natureOfLastInteraction
    leadFactSheet.value = newTransct.leadFactSheet
    leadIssues.value = newTransct.leadIssuesAndChallenges
});

watch(() => props.saveValue, async (first, second) => {
    let saveValue = props.saveValue
    let allData = props.selectedLeadDetails
    if (saveValue == true) {
        let ps = await crmService.editLead(allData.leadId, allData.companyId, allData.companyDescription, allData.primaryContactId, allData.primaryContactFirstName, allData.primaryContactLastName, allData.primaryContactPhoneNo,
            allData.primaryContactEmailAddress, allData.secondaryContactId, allData.secondaryContactFirstName, allData.secondaryContactLastName, allData.secondaryContactPhoneNo, allData.secondaryContactEmailAddress, allData.leadTopic, allData.leadIndustrySectorId,
            allData.leadSourceId, allData.leadRating, allData.leadStatus, allData.createdBy, allData.lastModifiedBy, allData.createdDate, new Date().toJSON(), allData.recordOwner, allData.originator,
            allData.leadTransactor, allData.coTransactor, allData.transactorLegal, allData.administrator, projectDescription.value, statusComment.value, nextStepActionPlan.value, projectPreparatoryRequired.value,
            preparatorySupport_TechAssist.value, useofProceeds.value, leadIssues.value, projectType.value, projectStage.value, categorization.value, totalProjectSize_Indicative.value,
            debtSize_Indicative.value, initialContactDate.value, dayofLastContact.value, anniversaryDate.value, initialInfo_PIC.value, leadFactSheet.value, allData.mandatedLead, allData.ndaRequired,
            allData.ndaSent, allData.ndaExecuted, allData.piC_PIDSent, allData.piC_PIDExecuted, allData.grlSent, allData.grlExecuted, allData.projectViability, allData.commenceInitialKYC_IDD, allData.eS_AssessmentCommmenced,
            allData.assessmentOutcomeUpdated, allData.mrocApproval, allData.draftNBCPaperSent, allData.draftMandateLetterSent, allData.mandateSigned, allData.nbcApproved, allData.nbcNumber, natureofLastInteraction.value, allData.financialYearName)
        if (ps == 200) {
            toast.success('Project Updated')

            setTimeout(async () => {
                router.replace(`/TRMS/pipelinedeals/`)
            }, 1300);
        }
    }
});

const updateLead = async () => {
    let allData = props.selectedLeadDetails
    let ps = await crmService.editLead(allData.leadId, allData.companyId, allData.companyDescription, allData.primaryContactId, allData.primaryContactFirstName, allData.primaryContactLastName, allData.primaryContactPhoneNo,
        allData.primaryContactEmailAddress, allData.secondaryContactId, allData.secondaryContactFirstName, allData.secondaryContactLastName, allData.secondaryContactPhoneNo, allData.secondaryContactEmailAddress, allData.leadTopic, allData.leadIndustrySectorId,
        allData.leadSourceId, allData.leadRating, allData.leadStatus, allData.createdBy, allData.lastModifiedBy, allData.createdDate, new Date().toJSON(), allData.recordOwner, allData.originator,
        allData.leadTransactor, allData.coTransactor, allData.transactorLegal, allData.administrator, projectDescription.value, statusComment.value, nextStepActionPlan.value, projectPreparatoryRequired.value,
        preparatorySupport_TechAssist.value, useofProceeds.value, leadIssues.value, projectType.value, projectStage.value, categorization.value, totalProjectSize_Indicative.value,
        debtSize_Indicative.value, initialContactDate.value, dayofLastContact.value, anniversaryDate.value, initialInfo_PIC.value, leadFactSheet.value, allData.mandatedLead, allData.ndaRequired,
        allData.ndaSent, allData.ndaExecuted, allData.piC_PIDSent, allData.piC_PIDExecuted, allData.grlSent, allData.grlExecuted, allData.projectViability, allData.commenceInitialKYC_IDD, allData.eS_AssessmentCommmenced,
        allData.assessmentOutcomeUpdated, allData.mrocApproval, allData.draftNBCPaperSent, allData.draftMandateLetterSent, allData.mandateSigned, allData.nbcApproved, allData.nbcNumber, natureofLastInteraction.value, allData.financialYearName)
    if (ps == 200) {
        toast.success('Update Successful')
    }
};
</script>

<template>
    <form>
        <div class="row g-2">
            <div class="col-12 mb-1">
                <label class="form-label">Project Description
                </label>
                <textarea class="form-control" rows="2" v-model="projectDescription"></textarea>
            </div>
            <div class="col-6">
                <label class="form-label">Project Type
                </label>
                <select class="form-select" aria-label="Default select example" v-model="projectType">
                    <option value="BrownField">Brown Field</option>
                    <option value="GreenField">Green Field</option>
                </select>
            </div>
            <div class="col-6">
                <label class="form-label">Project Stage
                </label>
                <select class="form-select" aria-label="Default select example" v-model="projectStage">
                    <option value="Concept">Concept</option>
                    <option value="Early Stage">Early Stage</option>
                    <option value="Mid Stage">Mid Stage</option>
                    <option value="Commercial Operation">Commercial Operation</option>
                </select>
            </div>
            <div class="col-6">
                <label class="form-label">Categorization
                </label>
                <select class="form-select" aria-label="Default select example" v-model="categorization">
                    <option value="Core Assets">Core Assets</option>
                    <option value="Value-Add Assets">Value-Add Assets</option>
                    <option value="Core Plus Assets">Core Plus Assets</option>
                    <option value="Opportunistic">Opportunistic</option>
                </select>
            </div>
            <div class="col-6">
                <label class="form-label">Initial Info/PIC
                </label>
                <select class="form-select" aria-label="Default select example" v-model="initialInfo_PIC">
                    <option :value=false>No</option>
                    <option :value=true>Yes</option>
                </select>
            </div>

            <div class="col-12 mb-1">
                <label class="form-label">Status Comment
                </label>
                <textarea class="form-control" rows="2" v-model="statusComment"></textarea>
            </div>
            <div class="col-12 mb-1">
                <label class="form-label">Next Steps/Action Plan
                </label>
                <textarea class="form-control" rows="2" v-model="nextStepActionPlan"></textarea>
            </div>


            <div class="col-6">
                <label class="form-label">Total Project Size (Indicative)
                </label>
                <input type="number" class="form-control" v-model="totalProjectSize_Indicative">
            </div>

            <div class="col-6">
                <label class="form-label">Debt Size (Indicative)
                </label>
                <input type="number" class="form-control" v-model="debtSize_Indicative">
            </div>

            <div class="col-6">
                <label class="form-label">Project Prep. Support Required
                </label>
                <!-- /*change below to true and false for posr too work */ -->
                <select class="form-select" aria-label="Default select example" v-model="projectPreparatoryRequired">
                    <option :value=false>No</option>
                    <option :value=true>Yes</option>
                </select>
            </div>
            <div class="col-6">
                <label class="form-label">Lead Fact Sheet
                </label>
                <select class="form-select" aria-label="Default select example" v-model="leadFactSheet">
                    <option :value=false>No</option>
                    <option :value=true>Yes</option>
                </select>
            </div>
            <div class="col-12 mb-1">
                <label class="form-label">Details of project preparatory support/Tech Assist
                </label>
                <textarea class="form-control" rows="2" v-model="preparatorySupport_TechAssist"></textarea>
            </div>

            <div class="col-12 mb-1">
                <label class="form-label">Use of Proceeds
                </label>
                <textarea class="form-control" rows="2" v-model="useofProceeds"></textarea>
            </div>

            <div class="col-6">
                <label class="form-label">Initial Contact Date
                </label>
                <input type="date" class="form-control" v-model="initialContactDate">
            </div>

            <div class="col-6">
                <label class="form-label">Day of Last Contact
                </label>
                <input type="date" class="form-control" v-model="dayofLastContact">
            </div>

            <div class="col-6">
                <label class="form-label">Company Anniversary Date
                </label>
                <input type="date" class="form-control" v-model="anniversaryDate">
            </div>

            <div class="col-6">
                <label class="form-label">Nature of Last Interaction
                </label>
                <select class="form-select" aria-label="Default select example" v-model="natureofLastInteraction">
                    <option value="Email">Email</option>
                    <option value="Formal Meeting">Formal Meeting</option>
                    <option value="Informal Meeting">Informal Meeting</option>
                    <option value="Conference Call">Conference Call</option>
                    <option value="Phone Call">Phone Call</option>
                </select>
            </div>


            <div class="col-12 mb-1">
                <label class="form-label">Lead Issues/Challenges
                </label>
                <textarea class="form-control" rows="2" v-model="leadIssues"></textarea>
            </div>

            <div class="d-flex justify-content-end mr-2 mt-3">
                <button type="submit" class="submit-button" @click.prevent="updateLead()">Update</button>
            </div>

        </div>
    </form>
</template>



<style scoped>
label.form-label {
    font-size: 14px;
    font-weight: 700;
    line-height: 14.4px;
}

textarea {
    font-size: 14px;
    resize: none;
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

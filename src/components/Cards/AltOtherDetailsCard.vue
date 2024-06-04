<script setup>
import { ref, watch } from 'vue';
import crmService from '../../services/crmService';
const props = defineProps(['buttons', 'leadDetails', 'saveValue'])
const emit = defineEmits(["saveValue"])
const emitSaveValue = (isCorrects) => {
    emit("saveValue", isCorrects)
}
const projectDescription = ref('')
const statusComment = ref('')
const nextStepActionPlan = ref('')
const preparatorySupport_TechAssist = ref('')
const useofProceeds = ref('')
const initialContactDate = ref('')
const dayofLastContact = ref('')
const leadIssues = ref('')
const anniversaryDate = ref('')
const natureofLastInteraction = ref('')
const projectPreparatoryRequired = ref('')
const meetingMinutesHighlight = ref('')
const projectType = ref('')
const projectStage = ref('')
const categorization = ref('')
const initialInfo_PIC = ref('')
const totalProjectSize_Indicative = ref('')
const debtSize_Indicative = ref('')
const mandatedClient = ref('')
const leadFactSheet = ref('')
const lastModifiedBy = ref('')
const lastModifiedDate = ref('')

watch(() => props.leadDetails, (first, second) => {
    if (JSON.stringify(first) !== JSON.stringify(second)) {
        let sector = props.leadDetails
        if (sector != undefined) {
            projectDescription.value = sector.leadProjectDescription
            statusComment.value = sector.leadProjectStatusComment
            nextStepActionPlan.value = sector.leadProjectNextStepActionPlan
            preparatorySupport_TechAssist.value = sector.projectPreparatorySupportDetails
            useofProceeds.value = sector.useOfProceeds
            initialContactDate.value = sector.initialContactDate.slice(0, 10).replace(/-/g, '-')
            dayofLastContact.value = sector.lastContactDate.slice(0, 10).replace(/-/g, '-')
            leadIssues.value = sector.leadIssuesAndChallenges
            anniversaryDate.value = sector.companyAnniversaryDate.slice(0, 10).replace(/-/g, '-')
            projectPreparatoryRequired.value = sector.projectPreparatorySupportRequired
            natureofLastInteraction.value = sector.natureOfLastInteraction
            meetingMinutesHighlight.value = sector.transactorLegal
            projectType.value = sector.leadProjectType
            projectStage.value = sector.leadProjectStage
            categorization.value = sector.leadCategorization
            initialInfo_PIC.value = sector.initialInfo_PIC
            totalProjectSize_Indicative.value = sector.totalProjectSize_Indicative
            debtSize_Indicative.value = sector.debtSize_Indicative
            mandatedClient.value = sector.mandatedLead
            leadFactSheet.value = sector.leadFactSheet
            lastModifiedDate.value = sector.lastModifiedDate.slice(0, 10).replace(/-/g, '-')
            lastModifiedBy.value = sector.lastModifiedBy
        }
    }
});

watch(() => props.saveValue, async (first, second) => {
    let saveValue = props.saveValue
    let allData = props.leadDetails
    emitSaveValue(false)
    if (saveValue == true && totalProjectSize_Indicative.value.toString().length > 0) {
        let ps = await crmService.editLead(allData.leadId, allData.companyId, allData.companyDescription, allData.primaryContactId, allData.primaryContactFirstName, allData.primaryContactLastName, allData.primaryContactPhoneNo,
            allData.primaryContactEmailAddress, allData.secondaryContactId, allData.secondaryContactFirstName, allData.secondaryContactLastName, allData.secondaryContactPhoneNo, allData.secondaryContactEmailAddress, allData.leadTopic, allData.leadIndustrySectorId,
            allData.productId, allData.leadSourceId, allData.leadRating, allData.leadStatus, allData.createdBy, allData.lastModifiedBy, allData.createdDate, new Date().toJSON(), allData.recordOwner, allData.originator,
            allData.leadTransactor, allData.coTransactor, allData.transactorLegal, allData.administrator, projectDescription.value, statusComment.value, nextStepActionPlan.value, projectPreparatoryRequired.value,
            preparatorySupport_TechAssist.value, useofProceeds.value, leadIssues.value, projectType.value, projectStage.value, categorization.value, totalProjectSize_Indicative.value,
            debtSize_Indicative.value, initialContactDate.value, dayofLastContact.value, anniversaryDate.value, initialInfo_PIC.value, leadFactSheet.value, allData.mandatedLead, allData.ndaRequired,
            allData.ndaSent, allData.ndaExecuted, allData.piC_PIDSent, allData.piC_PIDExecuted, allData.grlSent, allData.grlExecuted, allData.projectViability, allData.commenceInitialKYC_IDD, allData.eS_AssessmentCommmenced,
            allData.assessmentOutcomeUpdated, allData.mrocApproval, allData.draftNBCPaperSent, allData.draftMandateLetterSent, allData.mandateSigned, allData.nbcApproved, allData.nbcNumber, natureofLastInteraction.value, allData.financialYearName)

        console.log(ps)
    }
});
</script>

<template>
    <form>
        <div class="row g-2">
            <div class="col-8">
                <div class="col-12 mb-1">
                    <label class="form-label">Project Description
                    </label>
                    <textarea class="form-control" rows="2" v-model="projectDescription"></textarea>
                </div>
                <div class="row">
                    <div class="col-6 mb-1">
                        <label class="form-label">Status Comment
                        </label>
                        <textarea class="form-control" rows="2" v-model="statusComment"></textarea>
                    </div>
                    <div class="col-6 mb-1">
                        <label class="form-label">Next Steps/Action Plan
                        </label>
                        <textarea class="form-control" rows="2" v-model="nextStepActionPlan"></textarea>
                    </div>
                    <div class="col-6 mb-1">
                        <label class="form-label">Details of project preparatory support/Tech Assist
                        </label>
                        <textarea class="form-control" rows="2" v-model="preparatorySupport_TechAssist"></textarea>
                    </div>

                    <div class="col-6 mb-1">
                        <label class="form-label">Use of Proceeds
                        </label>
                        <textarea class="form-control" rows="2" v-model="useofProceeds"></textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="row">

                            <div class="col-6">
                                <label class="form-label">Initial Contact Date
                                </label>
                                <input type="date" class="form-control" v-model="initialContactDate"
                                    style="font-size: 12px;">
                            </div>

                            <div class="col-6">
                                <label class="form-label">Day of Last Contact
                                </label>
                                <input type="date" class="form-control" v-model="dayofLastContact">
                            </div>
                        </div>
                        <div class="col-12 mb-1">
                            <label class="form-label">Lead Issues/Challenges
                            </label>
                            <textarea class="form-control" rows="2" v-model="leadIssues"></textarea>
                        </div>
                    </div>
                    <div class="col-6">
                        <!-- nature of -->
                        <div class="row">

                            <div class="col-6">
                                <label class="form-label">Company Anniversary Date
                                </label>
                                <input type="date" class="form-control" v-model="anniversaryDate">
                            </div>

                            <div class="col-6">
                                <label class="form-label">Nature of Last Interaction
                                </label>
                                <select class="form-select" aria-label="Default select example"
                                    v-model="natureofLastInteraction">
                                    <option value="Email">Email</option>
                                    <option value="Formal Meeting">Formal Meeting</option>
                                    <option value="Informal Meeting">Informal Meeting</option>
                                    <option value="Conference Call">Conference Call</option>
                                    <option value="Phone Call">Phone Call</option>
                                </select>
                            </div>
                            <div class="col-6">
                                <label class="form-label">Project Preparatory Support Required
                                </label>
                                <select class="form-select" aria-label="Default select example"
                                    v-model="projectPreparatoryRequired">
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
                        </div>
                    </div>
                </div>

            </div>

            <div class="col-4">
                <div class="row">

                    <div class="col-6">
                        <label class="form-label">Currency
                        </label>
                        <input type="text" class="form-control" value="NGN Naira">
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
                </div>

            </div>
            <small>Last Modified By: {{ lastModifiedBy }} at {{ lastModifiedDate }}</small>
            <div class="d-flex justify-content-end mr-2 mt-3">
                <button type="submit" class="submit-button" v-if="buttons == true">Update</button>
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

textarea {
    resize: none;
    font-size: 14px;
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

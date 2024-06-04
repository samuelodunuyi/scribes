<script setup>
import { ref, watch } from 'vue';
import crmService from '../../services/crmService';
import Toggle from '../Toggle.vue';
import { toast } from 'vue3-toastify';
import {useRouter} from 'vue-router'
import 'vue3-toastify/dist/index.css';
const props = defineProps(['buttons', 'selectedLeadDetails', 'saveValue'])
const dialogLoad = ref(false)
const dialogConfirmation = ref(false)
const NDARequired = ref(false)
const PICPIDSent = ref(false)
const PICPIDExecuted = ref(false)
const GRLSent = ref(false)
const GRLExecuted = ref(false)
const NDASent = ref(false)
const NDAExecuted = ref(false)
const projectViability = ref(false)
const initialKYCIDD = ref(false)
const ESAssessmentCommenced = ref(false)
const ESKYCAssessmentUpdated = ref(false)
const MROCApproval = ref(false)
const NBCPaperSent = ref(false)
const DraftMandateLetter = ref(false)
const NBCApproved = ref(false)
const NBCNumber = ref('')
const mandateSignedSelected = ref(false)
const mandateSigned = ref(false)
const router = useRouter()
const lastModifiedBy = ref('')
const lastModifiedDate = ref('')

const newLead = () => {
    dialogLoad.value = true
    setTimeout(async () => {
        dialogLoad.value = false
        toast.success('Project Created Successfully');
    }, 2000);
}
const checkStatus = () => {
    if (mandateSignedSelected.value == true) {
    //     if(NDARequired.value!==true || PICPIDSent.value!==true || PICPIDExecuted.value!==true || GRLSent.value!==true|| GRLExecuted.value!==true|| projectViability.value!==true|| initialKYCIDD.value!==true|| ESAssessmentCommenced.value!==true|| ESKYCAssessmentUpdated.value!==true || MROCApproval.value!==true|| NBCPaperSent.value!==true|| DraftMandateLetter.value!==true|| NBCApproved.value!==true|| NBCNumber.value!==true){
    //     toast.warn('Items above still pending');
    //      mandateSignedSelected.value=false
    
    // }
        dialogConfirmation.value = true
    }
    if (mandateSigned.value == true && mandateSignedSelected.value == false) {
        toast.warn('Cannot Change Mandate Signed Status');
        mandateSignedSelected.value = true
    }
}

watch(() => props.selectedLeadDetails, (first, second) => {
    if (JSON.stringify(first) !== JSON.stringify(second)) {
    let newTransct = props.selectedLeadDetails
    if (newTransct != undefined) {
        NDARequired.value = newTransct.ndaRequired
        NDASent.value = newTransct.ndaSent
        NDAExecuted.value = newTransct.ndaExecuted
        PICPIDSent.value = newTransct.piC_PIDSent
        PICPIDExecuted.value = newTransct.piC_PIDExecuted
        GRLSent.value = newTransct.grlSent
        GRLExecuted.value = newTransct.grlExecuted
        projectViability.value = newTransct.projectViability
        initialKYCIDD.value = newTransct.commenceInitialKYC_IDD
        ESKYCAssessmentUpdated.value = newTransct.assessmentOutcomeUpdated
        ESAssessmentCommenced.value = newTransct.eS_AssessmentCommmenced
        MROCApproval.value = newTransct.mrocApproval
        NBCPaperSent.value = newTransct.draftNBCPaperSent
        DraftMandateLetter.value = newTransct.draftMandateLetterSent
        NBCApproved.value = newTransct.nbcApproved
        NBCNumber.value = newTransct.nbcNumber
        mandateSigned.value = newTransct.mandateSigned
        mandateSignedSelected.value = newTransct.mandateSigned
            lastModifiedDate.value = newTransct.lastModifiedDate.slice(0, 10).replace(/-/g, '-')
            lastModifiedBy.value = newTransct.lastModifiedBy
    }}
});

watch(() => props.saveValue, async (first, second) => {
    let saveValue = props.saveValue
    let allData = props.selectedLeadDetails
    console.log(allData)
    if (saveValue == true) {
        let ps = await crmService.editLead(allData.leadId, allData.companyId, allData.companyDescription, allData.primaryContactId, allData.primaryContactFirstName, allData.primaryContactLastName, allData.primaryContactPhoneNo,
            allData.primaryContactEmailAddress, allData.secondaryContactId, allData.secondaryContactFirstName, allData.secondaryContactLastName, allData.secondaryContactPhoneNo, allData.secondaryContactEmailAddress, allData.leadTopic, allData.leadIndustrySectorId,
            allData.productId, allData.leadSourceId, allData.leadRating, allData.leadStatus, allData.createdBy, allData.lastModifiedBy, allData.createdDate, new Date().toJSON(), allData.recordOwner, allData.originator,
            allData.leadTransactor, allData.coTransactor, allData.transactorLegal, allData.administrator, allData.leadProjectDescription, allData.leadProjectStatusComment, allData.leadProjectNextStepActionPlan, allData.projectPreparatorySupportRequired,
            allData.projectPreparatorySupportDetails, allData.useOfProceeds, allData.leadIssuesAndChallenges, allData.leadProjectType, allData.leadProjectStage, allData.leadCategorization, allData.totalProjectSize_Indicative,
            allData.debtSize_Indicative, allData.initialContactDate, allData.lastContactDate, allData.companyAnniversaryDate, allData.initialInfo_PIC, allData.leadFactSheet, allData.mandatedLead, NDARequired.value,
            NDASent.value, NDAExecuted.value, PICPIDSent.value, PICPIDExecuted.value, GRLSent.value, GRLExecuted.value, projectViability.value, initialKYCIDD.value, ESAssessmentCommenced.value,
            ESKYCAssessmentUpdated.value, MROCApproval.value, NBCPaperSent.value, DraftMandateLetter.value, mandateSignedSelected.value, NBCApproved.value, NBCNumber.value, allData.natureOfLastInteraction, allData.financialYearName)
      
      
            if (ps == 200) {
            toast.success('Project Updated')
       
              setTimeout(async () => {
                router.replace(`/crm/pipelineprojects/`)
            }, 1300); }
    }
});


const updateLead = async () => {
    let allData = props.selectedLeadDetails
    let ps = await crmService.editLead(allData.leadId, allData.companyId, allData.companyDescription, allData.primaryContactId, allData.primaryContactFirstName, allData.primaryContactLastName, allData.primaryContactPhoneNo,
            allData.primaryContactEmailAddress, allData.secondaryContactId, allData.secondaryContactFirstName, allData.secondaryContactLastName, allData.secondaryContactPhoneNo, allData.secondaryContactEmailAddress, allData.leadTopic, allData.leadIndustrySectorId,
            allData.productId, allData.leadSourceId, allData.leadRating, allData.leadStatus, allData.createdBy, allData.lastModifiedBy, allData.createdDate, new Date().toJSON(), allData.recordOwner, allData.originator,
            allData.leadTransactor, allData.coTransactor, allData.transactorLegal, allData.administrator, allData.leadProjectDescription, allData.leadProjectStatusComment, allData.leadProjectNextStepActionPlan, allData.projectPreparatorySupportRequired,
            allData.projectPreparatorySupportDetails, allData.useOfProceeds, allData.leadIssuesAndChallenges, allData.leadProjectType, allData.leadProjectStage, allData.leadCategorization, allData.totalProjectSize_Indicative,
            allData.debtSize_Indicative, allData.initialContactDate, allData.lastContactDate, allData.companyAnniversaryDate, allData.initialInfo_PIC, allData.leadFactSheet, allData.mandatedLead, NDARequired.value,
            NDASent.value, NDAExecuted.value, PICPIDSent.value, PICPIDExecuted.value, GRLSent.value, GRLExecuted.value, projectViability.value, initialKYCIDD.value, ESAssessmentCommenced.value,
            ESKYCAssessmentUpdated.value, MROCApproval.value, NBCPaperSent.value, DraftMandateLetter.value, mandateSignedSelected.value, NBCApproved.value, NBCNumber.value, allData.natureOfLastInteraction, allData.financialYearName)
       if (ps == 200) {
        toast.success('Update Successful')
    }
};
</script>

<template>
    <div class="d-flex flex-column gap-2">
        <v-dialog v-model="dialogConfirmation" transition="slide-y-transition" width="500">
            <v-card style="padding: 20px;">
                Are you sure you have completed this process? - 'Mandate Signed'
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="dialogConfirmation = false; mandateSignedSelected=false">
                        No
                    </v-btn>
                    <v-btn color="blue-darken-1" variant="text"
                        @click="dialogConfirmation = false; mandateSignedSelected = true">Yes
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogLoad" transition="slide-y-transition">
            <div class="d-flex justify-content-center">
                <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </v-dialog>
        <div class="form-group d-flex justify-content-between">
            <span> NDA Required </span>
            <Toggle v-model:model-value="NDARequired" />
        </div>
        <div class="form-group d-flex justify-content-between">
            <span> NDA Sent? </span>
            <Toggle v-model:model-value="NDASent" />
        </div>
        <div class="form-group d-flex justify-content-between">
            <span> NDA Executed? </span>
            <Toggle v-model:model-value="NDAExecuted" />
        </div>

        <div class="form-group d-flex justify-content-between align-items-center">
            <span> PIC/PID Sent? </span>
            <Toggle v-model:model-value="PICPIDSent" />
        </div>

        <div class="form-group d-flex justify-content-between align-items-center">
            <span> PIC/PID Executed? </span>
            <Toggle v-model:model-value="PICPIDExecuted" />
        </div>

        <div class="form-group d-flex justify-content-between align-items-center">
            <span> GRL Sent? </span>
            <Toggle v-model:model-value="GRLSent" />
        </div>

        <div class="form-group d-flex justify-content-between align-items-center">
            <span> GRL Executed? </span>
            <Toggle v-model:model-value="GRLExecuted" />

        </div>
        <div class="form-group d-flex justify-content-between">
            <span> Project Viability </span>
            <Toggle v-model:model-value="projectViability" />
        </div>

        <div class="form-group d-flex justify-content-between">
            <span> Commence Initial KYC/IDD </span>
            <Toggle v-model:model-value="initialKYCIDD" />
        </div>

        <div class="form-group d-flex justify-content-between">
            <span> E&S Assessment Commmenced </span>
            <Toggle v-model:model-value="ESAssessmentCommenced" />
        </div>

        <div class="form-group d-flex justify-content-between">
            <span> Outcome of E&S and
                initial KYC assessment Updated? </span>
            <Toggle v-model:model-value="ESKYCAssessmentUpdated" />
        </div>

        <div class="form-group d-flex justify-content-between">
            <span> MROC Approval </span>
            <Toggle v-model:model-value="MROCApproval" />
        </div>

        <div class="form-group d-flex justify-content-between">
            <span> Draft NBC Paper Sent? </span>
            <Toggle v-model:model-value="NBCPaperSent" />
        </div>

        <div class="form-group d-flex justify-content-between">
            <span> Draft Mandate Letter Sent? </span>
            <Toggle v-model:model-value="DraftMandateLetter" />
        </div>

        <div class="form-group d-flex justify-content-between">
            <span> NBC Approved? </span>
            <Toggle v-model:model-value="NBCApproved" />
        </div>

        <div class="form-group d-flex justify-content-between">
            <span> NBC Number </span>               
            <input class="form-control" type="text" v-model="NBCNumber" style="width: 100px;">
        </div>

        <div class="form-group d-flex justify-content-between">
            <span> Mandate Signed? </span>
            <div class="form-check form-check-inline form-switch">
                <input class="form-check-input" type="checkbox" v-model="mandateSignedSelected" @change="checkStatus()">
            </div>
        </div>
        <small>Last Modified By: {{ lastModifiedBy }} at {{ lastModifiedDate }}</small>

        <div class="d-flex justify-content-end mr-2 mt-3">
            <button type="submit" class="submit-button" v-if="buttons == true" @click="updateLead()">Update</button>
        </div>
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
    max-width: 180px;
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
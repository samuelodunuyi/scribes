<script setup>
import { ref, onMounted, watch } from 'vue';
import Toggle from '../Toggle.vue';
import { toast } from 'vue3-toastify';
import settingsServices from '../../services/settingsServices'
import CRMService from '../../services/crmService'
import 'vue3-toastify/dist/index.css';
const props = defineProps(['details', 'selectedLeadDetails'])
const leadSources = ref([])
const regions = ref([])
const industries = ref([])
const sectors = ref([])
const selectedProduct = ref('');
const company = ref([])
const products = ref([])
const selectedLeadSource = ref('');
const selectedSector = ref('');
const referredSourceName = ref('');
const companyDescription = ref('');
const selectedCompany = ref('');
const primaryContactPhone = ref('');
const primaryContactEmail = ref('');
const primaryContactLastName = ref('');
const primaryContactFirstName = ref('');
const secondaryContactFirstName = ref('');
const secondaryContactLastName = ref('');
const secondaryContactPhone = ref('');
const secondaryContactEmail = ref('');
const selectedCompanyId = ref('');
const lastModifiedBy = ref('')
const lastModifiedDate = ref('')
onMounted(async () => {
    sectors.value = await settingsServices.getIndustries()
    company.value = await CRMService.getCompanies()
    leadSources.value = await settingsServices.getLeadSources()
    industries.value = await settingsServices.getIndustries()
    products.value = await settingsServices.getProducts()
});

watch(() => props.selectedLeadDetails, (first, second) => {
    let newTransct = props.selectedLeadDetails
    selectedCompany.value = newTransct.companyName
    selectedCompanyId.value = newTransct.companyId
    selectedProduct.value = newTransct.productId
    selectedSector.value = newTransct.leadIndustrySectorId
    selectedLeadSource.value = newTransct.leadSourceId
    referredSourceName.value = newTransct.leadTopic
    companyDescription.value = newTransct.companyDescription
    primaryContactFirstName.value = newTransct.primaryContactFirstName
    primaryContactLastName.value = newTransct.primaryContactLastName
    primaryContactPhone.value = newTransct.primaryContactPhoneNo
    primaryContactEmail.value = newTransct.primaryContactEmailAddress
    secondaryContactFirstName.value = newTransct.secondaryContactFirstName
    secondaryContactLastName.value = newTransct.secondaryContactLastName
    secondaryContactPhone.value = newTransct.secondaryContactPhoneNo
    secondaryContactEmail.value = newTransct.secondaryContactEmailAddress
    lastModifiedDate.value = newTransct.lastModifiedDate.slice(0, 10).replace(/-/g, '-')
    lastModifiedBy.value = newTransct.lastModifiedBy
});

const updateLead = async () => {
    let allData = props.selectedLeadDetails
    let ps = await CRMService.editLead(allData.leadId, selectedCompanyId.value, companyDescription.value, allData.primaryContactId, primaryContactFirstName.value, primaryContactLastName.value, primaryContactPhone.value,
        primaryContactEmail.value, allData.secondaryContactId, secondaryContactFirstName.value, secondaryContactLastName.value, secondaryContactPhone.value, secondaryContactEmail.value, referredSourceName.value, selectedSector.value,
        selectedProduct.value, selectedLeadSource.value, allData.leadRating, allData.leadStatus, allData.createdBy, allData.lastModifiedBy, allData.createdDate, new Date().toJSON(), allData.recordOwner, allData.originator,
        allData.leadTransactor, allData.coTransactor, allData.transactorLegal, allData.administrator, allData.leadProjectDescription, allData.leadProjectStatusComment, allData.leadProjectNextStepActionPlan, allData.projectPreparatorySupportRequired,
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
}

</script>
<template>
    <form>
        <div class="row g-2">
            <div class="col-12">
                <label class="form-label">Company Name
                </label>
                <input type="text" class="form-control" v-model="selectedCompany" disabled>
            </div>
            <div class="col-6">
                <label class="form-label">Sector
                </label>
                <select class="form-select" id="lead-source" v-model="selectedSector">
                    <option :value=i.id v-for="i in sectors" :key="i.id">{{
                        i.description }}
                    </option>
                </select>
            </div>
            <div class="col-6">
                <label class="form-label">Product
                </label>
                <select class="form-select" id="lead-source" v-model="selectedProduct">
                    <option :value=i.id v-for="i in products" :key="i.id">{{
                        i.description }}
                    </option>
                </select>
            </div>
            <div class="col-6">
                <label class="form-label">Referred Source Name
                </label>
                <input type="text" class="form-control" v-model="referredSourceName">
            </div>
            <div class="col-6">
                <label for="lead-source" class="form-label">Lead Source </label>
                <select class="form-select" id="lead-source" v-model="selectedLeadSource">
                    <option :value=i.id v-for="i in leadSources" :key="i.id">{{
                        i.leadSourceName }}
                    </option>
                </select>
            </div>
            <div class="col-12">
                <label for="lead-source" class="form-label" style="font-size: 12px;">Company Description</label>
                <textarea class="form-control" rows="2" style="resize: none;" v-model="companyDescription"></textarea>
            </div>
        </div>
        <p></p>
        <label class="form-label">Primay Contact </label>
        <div class="row g-2">
            <div class="col-6">
                <label class="form-label">First Name
                    <input type="text" class="form-control" v-model="primaryContactFirstName">
                </label>
            </div>
            <div class="col-6">
                <label class="form-label">Last Name
                    <input type="text" class="form-control" v-model="primaryContactLastName">
                </label>
            </div>
            <div class="col-6">
                <label class="form-label">Phone Number
                    <input type="text" class="form-control" v-model="primaryContactPhone">
                </label>
            </div>
            <div class="col-6">
                <label class="form-label">Email
                    <input type="email" class="form-control" v-model="primaryContactEmail">
                </label>
            </div>
        </div>
        <p></p>
        <label class="form-label">Secondary Contact </label>
        <div class="row g-2">
            <div class="col-6">
                <label class="form-label">First Name
                    <input type="text" class="form-control" v-model="secondaryContactFirstName">
                </label>
            </div>
            <div class="col-6">
                <label class="form-label">Last Name
                    <input type="text" class="form-control" v-model="secondaryContactLastName">
                </label>
            </div>
            <div class="col-6">
                <label class="form-label">Phone Number
                    <input type="text" class="form-control" v-model="secondaryContactPhone">
                </label>
            </div>
            <div class="col-6">
                <label class="form-label">Email
                    <input type="email" class="form-control" v-model="secondaryContactEmail">
                </label>
            </div>
        </div>
        <small>Last Modified By: {{ lastModifiedBy }} at {{ lastModifiedDate }}</small>

        <div class="d-flex justify-content-end mr-2 mt-3">
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

textarea {
    font-size: 14px;
}

input,
select {
    padding: 10px 20px 10px 10px;
    align-items: center;

    font-size: 12px;
    font-weight: 400;
    line-height: 14.4px;
}
</style>

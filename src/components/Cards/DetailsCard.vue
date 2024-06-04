<script setup>
import { ref, watch, onMounted } from 'vue';
import crmService from '../../services/crmService';
import { useDashOptionStore } from "../../stores/dashOption"
import pinia from "../../stores/store";
const stores = useDashOptionStore(pinia);
const props = defineProps(['buttons', 'leadSource', 'sectorList', 'productList', 'companyList', 'leadDetails', 'saveValue', 'isNew'])
const emit = defineEmits(["saveValue"])
const emitSaveValue = (isCorrects) => {
    emit("saveValue", isCorrects)
}
const newValueDetails = ref([])
const selectedLeadSource = ref('');
const selectedSector = ref('');
const selectedProduct = ref('');
const selectedCompany = ref('');
const primaryContactPhone = ref('');
const primaryContactEmail = ref('');
const primaryContactLastName = ref('');
const primaryContactFirstName = ref('');
const secondaryContactFirstName = ref('');
const secondaryContactLastName = ref('');
const secondaryContactPhone = ref('');
const secondaryContactEmail = ref('');
const primaryContactId = ref('');
const secondaryContactId = ref('');
const companyDescription = ref('');
const selectedCompanyId = ref('');
const companyEmail = ref('');
const disableSelectCompany = ref(false);
const lastModifiedBy = ref('')
const lastModifiedDate = ref('')

watch(() => selectedCompany.value, (first, second) => {
    var sector = props.leadDetails
    if (props.isNew == 'New') {
        selectedSector.value = selectedCompany.value.industrySectorId
        selectedLeadSource.value = selectedCompany.value.leadSourceId
        companyDescription.value = selectedCompany.value.businessDescription
        primaryContactId.value = selectedCompany.value.primaryContactId
        primaryContactPhone.value = selectedCompany.value.primaryContactPhoneNo
        primaryContactEmail.value = selectedCompany.value.primaryContactEmailAddress
        primaryContactLastName.value = selectedCompany.value.primaryContactLastName
        primaryContactFirstName.value = selectedCompany.value.primaryContactFirstName
        secondaryContactFirstName.value = selectedCompany.value.secondaryContactFirstName
        secondaryContactLastName.value = selectedCompany.value.secondaryContactLastName
        secondaryContactPhone.value = selectedCompany.value.secondaryContactPhoneNo
        secondaryContactEmail.value = selectedCompany.value.secondaryContactEmailAddress
        companyEmail.value = selectedCompany.value.companyEmailAddress
    }
    else if (props.isNew != 'New' && sector != undefined) {
        selectedSector.value = sector.leadIndustrySectorId
        selectedProduct.value = sector.productId
        selectedLeadSource.value = sector.leadSourceId
        companyDescription.value = sector.companyDescription
        primaryContactId.value = sector.primaryContactId
        primaryContactPhone.value = sector.primaryContactPhoneNo
        primaryContactEmail.value = sector.primaryContactEmailAddress
        primaryContactLastName.value = sector.primaryContactLastName
        primaryContactFirstName.value = sector.primaryContactFirstName
        secondaryContactId.value = sector.secondaryContactId
        secondaryContactFirstName.value = sector.secondaryContactFirstName
        secondaryContactLastName.value = sector.secondaryContactLastName
        secondaryContactPhone.value = sector.secondaryContactPhoneNo
        secondaryContactEmail.value = sector.secondaryContactEmailAddress
        companyEmail.value = sector.companyEmailAddress
    }
});

watch(() => props.leadDetails, (first, second) => {
    if (JSON.stringify(first) !== JSON.stringify(second)) {
        let sectors = props.leadDetails
        if (sectors != undefined) {
            disableSelectCompany.value = true
            selectedCompany.value = sectors.companyName
            selectedCompanyId.value = sectors.companyId
            lastModifiedDate.value = sectors.lastModifiedDate.slice(0, 10).replace(/-/g, '-')
            lastModifiedBy.value = sectors.lastModifiedBy
        }
    }
});

watch(() => props.saveValue, async (first, second) => {
    let saveValue = props.saveValue
    let allData = props.leadDetails
    emitSaveValue(false)
    if (saveValue == true && props.isNew != 'New') {
        let ps = await crmService.editLead(allData.leadId, selectedCompanyId.value, companyDescription.value, primaryContactId.value, primaryContactFirstName.value, primaryContactLastName.value, primaryContactPhone.value,
            primaryContactEmail.value, secondaryContactId.value, secondaryContactFirstName.value, secondaryContactLastName.value, secondaryContactPhone.value, secondaryContactEmail.value, allData.leadTopic, selectedSector.value, selectedProduct.value,
            selectedLeadSource.value, allData.leadRating, allData.leadStatus, allData.createdBy, allData.lastModifiedBy, allData.createdDate, new Date().toJSON(), allData.recordOwner, allData.originator,
            allData.leadTransactor, allData.coTransactor, allData.transactorLegal, allData.administrator, allData.leadProjectDescription, allData.leadProjectStatusComment, allData.leadProjectNextStepActionPlan, allData.projectPreparatorySupportRequired,
            allData.projectPreparatorySupportDetails, allData.useOfProceeds, allData.leadIssuesAndChallenges, allData.leadProjectType, allData.leadProjectStage, allData.leadCategorization, allData.totalProjectSize_Indicative,
            allData.debtSize_Indicative, allData.initialContactDate, allData.lastContactDate, allData.companyAnniversaryDate, allData.initialInfo_PIC, allData.leadFactSheet, allData.mandatedLead, allData.ndaRequired,
            allData.ndaSent, allData.ndaExecuted, allData.piC_PIDSent, allData.piC_PIDExecuted, allData.grlSent, allData.grlExecuted, allData.projectViability, allData.commenceInitialKYC_IDD, allData.eS_AssessmentCommmenced,
            allData.assessmentOutcomeUpdated, allData.mrocApproval, allData.draftNBCPaperSent, allData.draftMandateLetterSent, allData.mandateSigned, allData.nbcApproved, allData.nbcNumber, allData.natureOfLastInteraction, allData.financialYearName)
    }
    else if (saveValue == true && props.isNew == 'New') {
        stores.newValues = []
        newValueDetails.value.push(selectedCompany.value.companyId, companyDescription.value, primaryContactId.value, primaryContactFirstName.value, primaryContactLastName.value, primaryContactPhone.value,
            primaryContactEmail.value, secondaryContactId.value, secondaryContactFirstName.value, secondaryContactLastName.value, secondaryContactPhone.value, secondaryContactEmail.value, '', selectedSector.value, selectedProduct.value,
            selectedLeadSource.value, 1, 1, stores.signedInUserEmail, stores.signedInUserEmail, new Date().toJSON(), new Date().toJSON(), stores.signedInUserEmail)
        stores.newValues = newValueDetails.value
    }
});
</script>
<template>
    <div>
        <form>
            <b>Company Details</b>
            <v-row style="margin-top: 0px;">
                <v-col cols="12" md="12">
                    <v-autocomplete label="Company Name" density="compact" variant="outlined" v-model="selectedCompany"
                        :items="companyList" item-title="companyName" item-value="companyId" return-object
                        :readonly="disableSelectCompany">
                    </v-autocomplete>
                </v-col>

                <v-col cols="12" md="6">
                    <v-autocomplete label="Sector" density="compact" variant="outlined" v-model="selectedSector"
                        :items="sectorList" item-title="description" item-value="id">
                    </v-autocomplete>
                </v-col>
                <v-col cols="12" md="6">
                    <v-autocomplete label="Product" density="compact" variant="outlined" v-model="selectedProduct"
                        :items="productList" item-title="description" item-value="id">
                    </v-autocomplete>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field label="Company Email" density="compact" hide-details required variant="outlined"
                        v-model="companyEmail"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-autocomplete label="Lead Sources" density="compact" variant="outlined" v-model="selectedLeadSource"
                        :items="leadSource" item-title="leadSourceName" item-value="id">
                    </v-autocomplete>
                </v-col>
                <v-col cols="12" md="12">
                    <v-textarea label="Company Description" density="compact" variant="outlined"
                        v-model="companyDescription">
                    </v-textarea>
                </v-col>
            </v-row>
            <div>&nbsp;</div>
            <v-divider></v-divider>
            <b style="margin-bottom: 20px;">Primary Contact</b>
            <v-row style="margin-top: 0px;">
                <v-col cols="12" md="3">
                    <v-text-field label="First name" density="compact" hide-details variant="outlined"
                        v-model="primaryContactFirstName"></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                    <v-text-field label="Last Name" density="compact" hide-details required variant="outlined"
                        v-model="primaryContactLastName"></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                    <v-text-field label="Phone Number" density="compact" hide-details required variant="outlined"
                        v-model="primaryContactPhone"></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                    <v-text-field label="E-mail" density="compact" hide-details required variant="outlined"
                        v-model="primaryContactEmail"></v-text-field>
                </v-col>
            </v-row>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
            <b style="margin-bottom: 20px;">Secondary Contact</b>
            <v-row>
                <v-col cols="12" md="3">
                    <v-text-field label="First name" density="compact" required hide-details variant="outlined"
                        v-model="secondaryContactFirstName"></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                    <v-text-field label="Last Name" hide-details density="compact" required variant="outlined"
                        v-model="secondaryContactLastName"></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                    <v-text-field label="Phone Number" hide-details density="compact" required variant="outlined"
                        v-model="secondaryContactPhone"></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                    <v-text-field label="E-mail" hide-details density="compact" required variant="outlined"
                        v-model="secondaryContactEmail"></v-text-field>
                </v-col>
            </v-row>

            <small>Last Modified By: {{ lastModifiedBy }} at {{ lastModifiedDate }}</small>

            <div class="d-flex justify-content-end mr-2 mt-3">
                <button type="submit" class="submit-button" v-if="buttons == true">Update</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
label.form-label {
    font-size: 14px;
    font-weight: 700;
    line-height: 14.4px;
}

.v-field__outline {
    --v-field-border-opacity: unset;
    opacity: unset
}

.v-field__input {
    opacity: unset
}

input,
select {
    padding: 10px 20px 10px 10px;
    align-items: center;
    font-size: 12px;
    font-weight: 400;
    line-height: 14.4px;
}</style>

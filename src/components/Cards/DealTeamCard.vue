<script setup>
import { ref, onMounted, watch } from 'vue';
import crmService from '../../services/crmService';
import administrationsService from '../../services/administrationsService'
import { useDashOptionStore } from "../../stores/dashOption"
import pinia from "../../stores/store";
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const route = useRoute()
const router = useRouter()
const props = defineProps(['buttons', 'leadDetails', 'saveValue', 'isNew'])
const emit = defineEmits(["saveValue", "saveNew"])
const stores = useDashOptionStore(pinia);
const newValueDetails = ref([])
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

onMounted(async () => {
    users.value = await administrationsService.getUserRoles()
    transactorUser.value = users.value.filter(o => o.roleName === "Transactor" || o.roleName === "Co-Transactor" || o.roleName ==='Originator&Transactor' || o.roleName==='Transaction Analyst' || o.roleName==='Lead Transactor' || o.roleName==='Lead & Co Transactors')
    adminUser.value = users.value.filter(o => o.roleName === "Administrator")
    originatorUser.value = users.value.filter(o => o.roleName === "Originator" || o.roleName ==='Originator&Transactor')
    transactorLegalUser.value = users.value.filter(o => o.roleName === "Transaction Legal")
});

watch(() => props.leadDetails, (first, second) => {
    if (JSON.stringify(first) !== JSON.stringify(second)) {
        let sector = props.leadDetails
        if (sector != undefined) {
            selectedLeadTransactorUser.value = sector.leadTransactor
            selectedCoTransactorUser.value = sector.coTransactor
            selectedAdminUser.value = sector.administrator
            selectedOriginatorUser.value = sector.originator
            selectedTransactorLegalUser.value = sector.transactorLegal
            lastModifiedDate.value = sector.lastModifiedDate.slice(0, 10).replace(/-/g, '-')
            lastModifiedBy.value = sector.lastModifiedBy
        }
    }
});

const emitSaveValue = (isCorrects) => {
    emit("saveValue", isCorrects)
}
const emitSaveNew = (isCorrects) => {
    emit("saveNew", isCorrects)
}

watch(() => props.saveValue, async (first, second) => {
    let saveValue = props.saveValue
    let allData = props.leadDetails
    emitSaveValue(false)
    if (saveValue == true && props.isNew != 'New') {
        let ps = await crmService.editLead(allData.leadId, allData.companyId, allData.companyDescription, allData.primaryContactId, allData.primaryContactFirstName, allData.primaryContactLastName, allData.primaryContactPhoneNo,
            allData.primaryContactEmailAddress, allData.secondaryContactId, allData.secondaryContactFirstName, allData.secondaryContactLastName, allData.secondaryContactPhoneNo, allData.secondaryContactEmailAddress, allData.leadTopic, allData.leadIndustrySectorId,
            allData.productId, allData.leadSourceId, allData.leadRating, allData.leadStatus, allData.createdBy, allData.lastModifiedBy, allData.createdDate, new Date().toJSON(), allData.recordOwner, selectedOriginatorUser.value,
            selectedLeadTransactorUser.value, selectedCoTransactorUser.value, selectedTransactorLegalUser.value, selectedAdminUser.value, allData.leadProjectDescription, allData.leadProjectStatusComment, allData.leadProjectNextStepActionPlan, allData.projectPreparatorySupportRequired,
            allData.projectPreparatorySupportDetails, allData.useOfProceeds, allData.leadIssuesAndChallenges, allData.leadProjectType, allData.leadProjectStage, allData.leadCategorization, allData.totalProjectSize_Indicative,
            allData.debtSize_Indicative, allData.initialContactDate, allData.lastContactDate, allData.companyAnniversaryDate, allData.initialInfo_PIC, allData.leadFactSheet, allData.mandatedLead, allData.ndaRequired,
            allData.ndaSent, allData.ndaExecuted, allData.piC_PIDSent, allData.piC_PIDExecuted, allData.grlSent, allData.grlExecuted, allData.projectViability, allData.commenceInitialKYC_IDD, allData.eS_AssessmentCommmenced,
            allData.assessmentOutcomeUpdated, allData.mrocApproval, allData.draftNBCPaperSent, allData.draftMandateLetterSent, allData.mandateSigned, allData.nbcApproved, allData.nbcNumber, allData.natureOfLastInteraction, allData.financialYearName)
    }
    else if (saveValue == true && props.isNew == 'New') {
        stores.newValues.push(selectedOriginatorUser.value, selectedLeadTransactorUser.value, selectedCoTransactorUser.value, selectedTransactorLegalUser.value, selectedAdminUser.value, '', '', '', false,
            '', '', '', 'BrownField', 'Commercial Operation', 'Core Plus Assets', 0, 0, '2023-01-15T00:00:00', '2023-01-15T00:00:00', '2023-01-15T00:00:00', false, false, false, false,
            false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, '', 'Formal Meeting')


        let financialYear = `FY${new Date().getFullYear()}`
        let ps = await crmService.createLeads(stores.newValues[0], stores.newValues[1], stores.newValues[2], stores.newValues[3], stores.newValues[4], stores.newValues[5], stores.newValues[6],
            stores.newValues[7], stores.newValues[8], stores.newValues[9], stores.newValues[10], stores.newValues[11], stores.newValues[12], stores.newValues[13], stores.newValues[14],
            stores.newValues[15], stores.newValues[16], stores.newValues[17], stores.newValues[18], stores.newValues[19], stores.newValues[20], stores.newValues[21], stores.newValues[22], stores.newValues[23],
            stores.newValues[24], stores.newValues[25], stores.newValues[26], stores.newValues[27], stores.newValues[28], stores.newValues[29], stores.newValues[30], stores.newValues[31],
            stores.newValues[32], stores.newValues[33], stores.newValues[34], stores.newValues[35], stores.newValues[36], stores.newValues[37], stores.newValues[38],
            stores.newValues[39], stores.newValues[40], stores.newValues[41], stores.newValues[42], stores.newValues[43], stores.newValues[44], stores.newValues[45],
            stores.newValues[46], stores.newValues[47], stores.newValues[48], stores.newValues[49], stores.newValues[50], stores.newValues[51], stores.newValues[52], stores.newValues[53], stores.newValues[54],
            stores.newValues[55], stores.newValues[56], stores.newValues[57], stores.newValues[58], stores.newValues[59], stores.newValues[60], stores.newValues[61], stores.newValues[62], stores.newValues[63], financialYear)

      let jl =JSON.stringify(ps)
        if (typeof(ps)== "undefined") {
            emitSaveNew(false)
            toast.error(`An error occured, Error: ${ps}, please try again`)
        }
        else {
            toast.success(`Project ${ps.leadId} Created Successfully`)
            emitSaveNew(false)
            setTimeout(async () => {
                router.replace(`/crm/pipelineprojects`)
            }, 1300);
        }
    }
});
</script>
<template>
    <form>
        <div>&nbsp;</div>
        <v-row>
            <v-col cols="12" md="6">
                <v-autocomplete label="Originator" prepend-inner-icon="mdi-magnify" density="compact"
                    v-model="selectedOriginatorUser" :items="originatorUser" variant="outlined" item-title="userFullName"
                    item-value="userId">
                </v-autocomplete>
            </v-col>

            <v-col cols="12" md="6">
                <v-autocomplete label="Administrator" prepend-inner-icon="mdi-magnify" density="compact" :items="adminUser"
                    variant="outlined" item-title="userFullName" item-value="userId" v-model="selectedAdminUser">
                </v-autocomplete>
            </v-col>
        </v-row>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <v-row>
            <v-col cols="12" md="6">
                <v-autocomplete label="Lead Transactor" prepend-inner-icon="mdi-magnify" density="compact"
                    v-model="selectedLeadTransactorUser" :items="transactorUser" variant="outlined"
                    item-title="userFullName" item-value="userId"></v-autocomplete> </v-col>
            <v-col cols="12" md="6">
                <v-autocomplete label="Co-Transactor" prepend-inner-icon="mdi-magnify" density="compact"
                    v-model="selectedCoTransactorUser" :items="transactorUser" variant="outlined" item-title="userFullName"
                    item-value="userId"></v-autocomplete>
            </v-col>
        </v-row>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <v-row>
            <v-col cols="12" md="6">
                <v-autocomplete label="Transactor Legal" prepend-inner-icon="mdi-magnify" density="compact"
                    item-title="userFullName" item-value="userId" v-model="selectedTransactorLegalUser"
                    :items="transactorLegalUser" variant="outlined"></v-autocomplete>
            </v-col>
        </v-row>
        <div>&nbsp;</div>
        <small>Last Modified By: {{ lastModifiedBy }} at {{ lastModifiedDate }}</small>
        <div>&nbsp;</div>
        <div class="d-flex justify-content-end mr-2">
            <button type="submit" class="submit-button" v-if="buttons == true">Update</button>
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

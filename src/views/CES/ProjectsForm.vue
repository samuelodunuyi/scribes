<script setup>
import { ref, computed, onMounted } from "vue";
import { useDashOptionStore } from "../../stores/dashOption";
import pinia from "../../stores/store";
import ToolBarCES from "../../components/ToolBarCES2.vue";
import SubHeader1 from "../../components/SubHeaderCES.vue";
import crmService from "../../services/crmService";
import cesService from "../../services/cesService";
import administrationsService from "../../services/administrationsService";
import { useRoute, useRouter } from 'vue-router'
import 'vue3-toastify/dist/index.css';
import { toast } from 'vue3-toastify';

const stores = useDashOptionStore(pinia);
const props = defineProps(["data"]);
const openDialog = ref(false);
const openDialog2 = ref(false);
const isEdit = ref(false);
const router = useRouter()
const disableEditValue = ref(false);
const header = ref("");
const idx = ref("");
const transaction = ref("");
const lastModifidBy = ref("");
const lastModifiedDateTime = ref("");
const clientName = ref("");
const projectName = ref("");
const mandatedDealSize = ref("");
const initalDealSize = ref("");
const nextDeal = ref("");
const previousDeal = ref("");
const allDeals = ref("");
const transactionLead = ref("");
const loading = ref(false);
const transactionAnalyst = ref("");
const ccApprovalDate = ref("");
const feeLetterDate = ref("");
const expectedClosingDate = ref("");
const mandateLetterDate = ref("");
const sectorSelected = ref("");
const projectStatus = ref("");
const categorySelected = ref("");
const productSelected = ref("");
const fundOptionSelected = ref("");
const transactionStage = ref("");
const supportSelected = ref("");
const nbc = ref("");
const nbcStartDate = ref("");
const nbcExpectedEnd = ref("");
const nbcActualEnd = ref("");
const nbcDaysLeft = ref("");
const nbcDocument = ref("");
const firstInstallmentAmount = ref("");
const secondInstallmentAmount = ref("");
const firstInstallmentComment = ref("");
const secondInstallmentComment = ref("");
const legalDDConsultant = ref("");
const legalDDAmount = ref("");
const legalDDprojectStatus = ref("");
const LegalDDStartDate = ref("");
const LegalDDExpectedDate = ref("");
const LegalDDActualEndDate = ref("");
const LegalDDDaysLeft = ref("");
const E_S_Consultant = ref("");
const E_S_Amount = ref("");
const E_S_Status = ref("");
const E_S_StartDate = ref("");
const E_S_ExpectedDate = ref("");
const E_S_ActualEnd = ref("");
const E_S_DaysLeft = ref("");
const TechComConsultant = ref("");
const TechComAmount = ref("");
const TechComProjectStatus = ref("");
const TechComStartDate = ref("");
const TechComExpectedEnd = ref("");
const TechComActualEnd = ref("");
const TechComDaysLeft = ref("");
const embeddedAdvisorConsultant = ref("");
const embeddedAdvisorAmount = ref("");
const embeddedAdvisorProjectStatus = ref("");
const embeddedAdvisorStartDate = ref("");
const embeddedAdvisorExpectedEndDate = ref("");
const embeddedAdvisorActualEndDate = ref("");
const embeddedAdvisorDaysLeft = ref("");
const financialModel = ref("");
const riskRating = ref("");
const TAfundingRequired = ref("");
const TAAmount = ref("");
const TARefunded = ref("");
const ccPaperApproval = ref("");
const ccStartDate = ref("");
const ccexpectedEnd = ref("");
const ccActualEnd = ref("");
const ccdaysLeft = ref("");
const feeLetter = ref("");
const feeLetterStartDate = ref("");
const feeLetterExpectedEndDate = ref("");
const feeLetterActualEndDate = ref("");
const feeLetterDaysLeft = ref("");
const signCRGDeed = ref("");
const bridgeToBondDisbursement = ref("");
const transactionDescription = ref("");
const engagementSolictorBridge = ref("");
const keyIssues = ref("");
const statusUpdate = ref("");
const nextSteps = ref("");
const transactorUser = ref("");
const cleanEnergyTransactionList = ref("");
const analystUser = ref("");
const original = ref("");
const selectedActivity = ref([]);
const typeIssue = ref("");
const issues = ref([]);
const allCleanEnergyTransactions = ref([]);
const filteredIssues = ref([]);
const route = useRoute()

const openNewDialog = async (news) => {
  original.value = ''
  openDialog.value = true;
  header.value = `Add ${news}`;
  typeIssue.value = news
  loading.value = false
  disableEditValue.value = false;
};

const saveDialog = async (news, type) => {
  loading.value = true
  openDialog.value = false
  let ps = await crmService.createActivitys(1, 'Transaction Update', 2003, 'CONT100001', transaction.value.uuid, transaction.value.uuid, typeIssue.value, original.value, 'Completed', stores.signedInUserEmail, stores.signedInUserEmail, new Date().toJSON(), new Date().toJSON(), stores.signedInUserEmail)
  if (ps == true) {
    issues.value = await crmService.getActivities()
    toast.success(`${typeIssue.value} saved successfully`)
  }
}


const editDialog = async (news, type) => {
  loading.value = true
  openDialog.value = false
  let ps = await crmService.editActivity(selectedActivity.value[0].activityId, selectedActivity.value[0].activityId, selectedActivity.value[0].activityId, selectedActivity.value[0].activityId, 'CONT100001', transaction.value.uuid, transaction.value.uuid, typeIssue.value, original.value, 'Completed', stores.signedInUserEmail, stores.signedInUserEmail, new Date().toJSON(), new Date().toJSON(), stores.signedInUserEmail)
  if (ps == true) {
    issues.value = await crmService.getActivities()
    toast.success(`${typeIssue.value} edited successfully`)
  }
}

const viewDialog = async (news) => {
  openDialog2.value = true;
  filteredIssues.value = issues.value.filter(o => o.description == news)
  loading.value = false;
  typeIssue.value = news;
  header.value = `View ${news}`;
  disableEditValue.value = true;
};

const showView = async (news) => {
  openDialog.value = true;
  loading.value = false;
  header.value = `View ${typeIssue.value}`;
  original.value = filteredIssues.value.filter(o => o.activityId == news)[0].notes
  selectedActivity.value = filteredIssues.value.filter(o => o.activityId == news)[0]
  disableEditValue.value = true;
};

const submitNew = async () => {
  let ps = cesService.createProjects(projectName.value, clientName.value, '', sectorSelected.value, sectorSelected.value, statusUpdate.value, mandatedDealSize.value, initalDealSize.value, transactionLead.value,
    transactionAnalyst.value, ccApprovalDate.value, feeLetterDate.value, expectedClosingDate.value, transactionStage.value, nbcStartDate.value, expectedClosingDate.value, nbcActualEnd.value, nbcDaysLeft.value, nbcDocument.value, keyIssues.value,
    firstInstallmentAmount.value, secondInstallmentAmount.value, legalDDConsultant.value, legalDDAmount.value, legalDDprojectStatus.value, LegalDDStartDate.value, LegalDDExpectedDate.value, LegalDDActualEndDate.value,
    LegalDDDaysLeft.value, '', E_S_Consultant.value, E_S_Amount.value, E_S_Status.value, E_S_StartDate.value, E_S_ExpectedDate.value, E_S_ActualEnd.value, E_S_DaysLeft.value, '', TechComConsultant.value,
    TechComAmount.value, TechComProjectStatus.value, TechComStartDate.value, TechComExpectedEnd.value, TechComActualEnd.value, TechComDaysLeft.value, '', embeddedAdvisorConsultant.value, embeddedAdvisorAmount.value,
    embeddedAdvisorProjectStatus.value, embeddedAdvisorStartDate.value, embeddedAdvisorExpectedEndDate.value, embeddedAdvisorActualEndDate.value, embeddedAdvisorDaysLeft.value, '', financialModel.value,
    riskRating.value, TAfundingRequired.value, '', ccStartDate.value, ccexpectedEnd.value, ccActualEnd.value, ccdaysLeft.value, '', feeLetter.value, feeLetterStartDate.value, feeLetterExpectedEndDate.value, feeLetterActualEndDate.value,
    feeLetterDaysLeft.value, '', keyIssues.value, statusUpdate.value, nextSteps.value, stores.signedInUserEmail, new Date().toJSON())
};

const editExs = async () => {
  let ps = cesService.createProjects(projectName.value, clientName.value, '', sectorSelected.value, sectorSelected.value, statusUpdate.value, mandatedDealSize.value, initalDealSize.value, transactionLead.value,
    transactionAnalyst.value, ccApprovalDate.value, feeLetterDate.value, expectedClosingDate.value, transactionStage.value, nbcStartDate.value, expectedClosingDate.value, nbcActualEnd.value, nbcDaysLeft.value, nbcDocument.value, keyIssues.value,
    firstInstallmentAmount.value, secondInstallmentAmount.value, legalDDConsultant.value, legalDDAmount.value, legalDDprojectStatus.value, LegalDDStartDate.value, LegalDDExpectedDate.value, LegalDDActualEndDate.value,
    LegalDDDaysLeft.value, '', E_S_Consultant.value, E_S_Amount.value, E_S_Status.value, E_S_StartDate.value, E_S_ExpectedDate.value, E_S_ActualEnd.value, E_S_DaysLeft.value, '', TechComConsultant.value,
    TechComAmount.value, TechComProjectStatus.value, TechComStartDate.value, TechComExpectedEnd.value, TechComActualEnd.value, TechComDaysLeft.value, '', embeddedAdvisorConsultant.value, embeddedAdvisorAmount.value,
    embeddedAdvisorProjectStatus.value, embeddedAdvisorStartDate.value, embeddedAdvisorExpectedEndDate.value, embeddedAdvisorActualEndDate.value, embeddedAdvisorDaysLeft.value, '', financialModel.value,
    riskRating.value, TAfundingRequired.value, '', ccStartDate.value, ccexpectedEnd.value, ccActualEnd.value, ccdaysLeft.value, '', feeLetter.value, feeLetterStartDate.value, feeLetterExpectedEndDate.value, feeLetterActualEndDate.value,
    feeLetterDaysLeft.value, '', keyIssues.value, statusUpdate.value, nextSteps.value, stores.signedInUserEmail, new Date().toJSON())
};

const onTransactionSelectedChanged = async () => {
  router.replace(`/ces/projectForm/exs/${cleanEnergyTransactionList.value}`)
  setTimeout(async () => {
    location.reload()
  }, 500);
};

onMounted(async () => {
  let users = await administrationsService.getUserRoles()
  issues.value = await crmService.getActivities()
  transactorUser.value = users.filter(o => o.roleName === "Transactor" || o.roleName === "Co-Transactor" || o.roleName === 'Originator&Transactor' || o.roleName === 'Transaction Analyst' || o.roleName === 'Lead Transactor' || o.roleName === 'Lead & Co Transactors')
  analystUser.value = users.filter(o => o.roleName === "Analyst")

  let transact = await cesService.getProjects()
  allCleanEnergyTransactions.value = transact.data

  if (route.params.id4 == 'new') {
    let ps = await crmService.getLeads()
    transaction.value = ps.filter(o => o.leadId == route.params.id5)
    clientName.value = transaction.value[0].companyName
    projectName.value = transaction.value[0].companyName
    transactionDescription.value = transaction.value[0].leadProjectDescription
    mandatedDealSize.value = transaction.value[0].totalProjectSize_Indicative
    initalDealSize.value = transaction.value[0].totalProjectSize_Indicative
    transactionLead.value = transaction.value[0].leadTransactor
    cleanEnergyTransactionList.value = []
  }

  else if (route.params.id4 == 'exs') {
    let ps = await cesService.getProjects()
    transaction.value = ps.data.filter(o => o.uuid == route.params.id5)
    cleanEnergyTransactionList.value = transaction.value[0].uuid
    const index = allCleanEnergyTransactions.value.map(object => object.uuid).indexOf(cleanEnergyTransactionList.value)
    if (index > 0) {
      previousDeal.value = allCleanEnergyTransactions.value[index - 1].uuid
    }


    if (index < allCleanEnergyTransactions.value.length - 1) {
      nextDeal.value = allCleanEnergyTransactions.value[index + 1].uuid
    }

    clientName.value = transaction.value[0].client_name
    projectName.value = transaction.value[0].project_name
    mandatedDealSize.value = transaction.value[0].mandated_deal_size
    initalDealSize.value = transaction.value[0].initial_deal_size
    transactionLead.value = transaction.value[0].transaction_lead
    transactionAnalyst.value = transaction.value[0].transaction_analyst
    ccApprovalDate.value = transaction.value[0].credit_commitee_approval
    feeLetterDate.value = transaction.value[0].fee_letter_date
    expectedClosingDate.value = transaction.value[0].expected_closing_date
    mandateLetterDate.value = ''
    sectorSelected.value = transaction.value[0].sector
    projectStatus.value = transaction.value[0].status
    categorySelected.value = transaction.value[0].category
    productSelected.value = ''
    fundOptionSelected.value = ''
    transactionStage.value = transaction.value[0].transaction_stage
    transactionDescription.value = transaction.value[0].transaction_name
    nbc.value = transaction.value[0].NBC
    nbcStartDate.value = transaction.value[0].start_date
    nbcExpectedEnd.value = transaction.value[0].expected_end_date
    nbcActualEnd.value = transaction.value[0].actual_end_date
    nbcDaysLeft.value = transaction.value[0].days_left
    nbcDocument.value = transaction.value[0].NBC_document
    firstInstallmentAmount.value = transaction.value[0].SFU_first_installment_amount
    secondInstallmentAmount.value = transaction.value[0].SFU_second_installment_amount
    firstInstallmentComment.value = 'transaction.value[0].leadTransactor'
    secondInstallmentComment.value = 'transaction.value[0].leadTransactor'
    legalDDConsultant.value = transaction.value[0].DDW_preliminary_legal_DD_consultant
    legalDDAmount.value = transaction.value[0].DDW_preliminary_legal_DD_amount
    legalDDprojectStatus.value = transaction.value[0].DDW_preliminary_legal_DD_status
    LegalDDStartDate.value = transaction.value[0].DDW_preliminary_legal_DD_start_date
    LegalDDExpectedDate.value = transaction.value[0].DDW_preliminary_legal_DD_expected_end_date
    LegalDDActualEndDate.value = transaction.value[0].DDW_preliminary_legal_DD_actual_end_date
    LegalDDDaysLeft.value = transaction.value[0].DDW_preliminary_legal_DD_days_left
    E_S_Consultant.value = transaction.value[0].DDW_preliminary_E_and_S_consultant
    E_S_Amount.value = transaction.value[0].DDW_preliminary_E_and_S_amount
    E_S_Status.value = transaction.value[0].DDW_preliminary_E_and_S_status
    E_S_StartDate.value = transaction.value[0].DDW_preliminary_E_and_S_start_date
    E_S_ExpectedDate.value = transaction.value[0].DDW_preliminary_E_and_S_expected_end_date
    E_S_ActualEnd.value = transaction.value[0].DDW_preliminary_E_and_S_actual_end_date
    E_S_DaysLeft.value = transaction.value[0].DDW_preliminary_E_and_S_days_left
    TechComConsultant.value = transaction.value[0].DDW_tech_and_com_consultant
    TechComAmount.value = transaction.value[0].DDW_tech_and_com_amount
    TechComProjectStatus.value = transaction.value[0].DDW_tech_and_com_status
    TechComStartDate.value = transaction.value[0].DDW_tech_and_com_start_date
    TechComExpectedEnd.value = transaction.value[0].DDW_tech_and_com_expected_end_date
    TechComActualEnd.value = transaction.value[0].DDW_tech_and_com_actual_end_date
    TechComDaysLeft.value = transaction.value[0].DDW_tech_and_com_days_left
    embeddedAdvisorConsultant.value = transaction.value[0].DDW_embedded_advisor_consultant
    embeddedAdvisorAmount.value = transaction.value[0].DDW_embedded_advisor_amount
    embeddedAdvisorProjectStatus.value = transaction.value[0].DDW_embedded_advisor_status
    embeddedAdvisorStartDate.value = transaction.value[0].DDW_embedded_advisor_start_date
    embeddedAdvisorExpectedEndDate.value = transaction.value[0].DDW_embedded_advisor_expected_end_date
    embeddedAdvisorActualEndDate.value = transaction.value[0].DDW_embedded_advisor_actual_end_date
    embeddedAdvisorDaysLeft.value = transaction.value[0].DDW_embedded_advisor_days_left
    financialModel.value = transaction.value[0].CAS_status_financial_model
    riskRating.value = transaction.value[0].CAS_status_risk_rating
    TAfundingRequired.value = transaction.value[0].CAS_status_TA_funding_required
    TAAmount.value = 'transaction.value[0].CAS_status_credit_paper'
    TARefunded.value = 'transaction.value[0].leadTransactor'
    ccPaperApproval.value = transaction.value[0].CAS_status_credit_paper
    ccStartDate.value = transaction.value[0].CAS_status_credit_paper_start_date
    ccexpectedEnd.value = transaction.value[0].CAS_status_credit_paper_expected_end_date
    ccActualEnd.value = transaction.value[0].CAS_status_credit_paper_actual_end_date
    ccdaysLeft.value = transaction.value[0].CAS_status_credit_paper_days_left
    feeLetter.value = transaction.value[0].CAS_status_fee_letter
    feeLetterStartDate.value = transaction.value[0].CAS_status_fee_letter_start_date
    feeLetterExpectedEndDate.value = transaction.value[0].CAS_status_fee_letter_expected_end_date
    feeLetterActualEndDate.value = transaction.value[0].CAS_status_fee_letter_actual_end_date
    feeLetterDaysLeft.value = transaction.value[0].CAS_status_fee_letter_days_left
    signCRGDeed.value = transaction.value[0].sign_DRG_deed
    bridgeToBondDisbursement.value = transaction.value[0].bridge_to_bond_disbursement
    engagementSolictorBridge.value = transaction.value[0].engagement_of_solicitor_for_bridge_to_bond
    keyIssues.value = transaction.value[0].key_issues
    statusUpdate.value = transaction.value[0].status_update
    nextSteps.value = transaction.value[0].next_steps
    lastModifidBy.value = transaction.value[0].last_modified_by
    lastModifiedDateTime.value = transaction.value[0].modification_date
  }
})

const nextDeals = async () => {
  router.replace(`/ces/projectForm/exs/${nextDeal.value}`)
  setTimeout(async () => {
    location.reload()
  }, 500);
}

const previousDeals = async () => {
  if (previousDeal.value != '') {
    router.replace(`/ces/projectForm/exs/${previousDeal.value}`)
    setTimeout(async () => {
      location.reload()
    }, 500);
  }
}

</script>

<template>
  <div class="wrapper mt-3">
    <div class="Breadcrumb">
      <SubHeader1 title="leadType" companyName="companyName" :companyName2="clientName" />
      <div class="intro-text">
        <div class="d-flex justify-content-between align-center">
          <div class="d-flex align-center gap-1">
            <h4></h4>
          </div>
          <small>{{ idx }}</small>
        </div>
      </div>
    </div>

    <div class="mandated-transaction-heading mt-3">
      <h3 class="title"><b>Clean Energy Transaction Update</b></h3>
      <div class="search-box d-flex" style="width: 410px; height: 100%" v-if="route.params.id4 == 'exs'">
        <select class="form-select" v-model="cleanEnergyTransactionList" @change="onTransactionSelectedChanged"
          style="width: 250px">
          <option :value=deals.uuid v-for="deals in allCleanEnergyTransactions" :key="deals.uuid">{{
            deals.client_name }}
          </option>
        </select>
        <button class="edit">Edit</button>
      </div>
    </div>
    <div class="mt-3">
      <ToolBarCES />
    </div>
    <v-dialog v-model="openDialog" width="564" height="580" transition="dialog-right-transition"
      @click:outside="openDialog = false">
      <v-card id="style-4">
        <v-card-title>
          <div class="d-flex justify-content-between mt-3">
            <span class="text-h5 ml-5">{{ header }}</span>
            <p class="mr-5" style="cursor: pointer" @click="openDialog = false">
              X
            </p>
          </div>
        </v-card-title>
        <v-card-text>
          <v-container style="margin-top: -20px">
            <div class="row g-2 mb-2 pb-2">
              <div>
                <label class="form-label">Issues</label>
                <textarea type="text" class="form-control" v-model="original" rows="5" style="resize: none"></textarea>
              </div>
            </div>
          </v-container>
          <div class="mt-4 d-flex justify-content-end gap-2">
            <v-btn class="rfqbtn" @click="saveDialog(original, typeIssue)" :loading="loading" v-if="isEdit==false">Save</v-btn>
            <v-btn class="rfqbtn" @click="editDialog(original, typeIssue)" :loading="loading" v-else="isEdit==true">Save</v-btn>
            <v-btn class="rfqbtn" @click="openDialog = false; loading = false">Cancel</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="openDialog2" width="564" height="580" transition="dialog-right-transition"
      @click:outside="openDialog2 = false">
      <v-card id="style-4">
        <v-card-title>
          <div class="d-flex justify-content-between mt-3">
            <span class="text-h5 ml-5">{{ header }}</span>
            <p class="mr-5" style="cursor: pointer" @click="openDialog2 = false">
              X
            </p>
          </div>
        </v-card-title>
        <v-card-text>
          <v-container style="margin-top: -20px">
            <div class="row g-2 mb-2 pb-2">
              <div>
                <label class="form-label">View Issues</label>
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col" style="background-color: #227CBF;color: white;">
                          <div class="d-flex align-center gap-1">
                            <span class="noshrink"> S/N</span>
                            <span class="d-flex flex-column align-center">
                              <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                              <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>
                          </div>
                        </th>
                        <th scope="col" style="background-color: #227CBF;color: white;">
                          <div class="d-flex align-center gap-1">
                            <span> Subject </span>
                            <span class="d-flex flex-column align-center">
                              <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                              <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr @click="showView(i.activityId); isEdit=true" v-for="(i, index) in filteredIssues">
                        <td scope="row">{{ index + 1 }}</td>
                        <td>{{ i.activitySubject }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </v-container>
          <div class="mt-4 d-flex justify-content-end gap-2">
            <v-btn class="rfqbtn" @click="openDialog2 = false; loading = false">Cancel</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <div class="mandated-transaction-heading mt-3" v-if="route.params.id4 == 'exs'">
      <small class="d-flex align-items-center cursor-pointer" @click="previousDeals()">
        <v-icon>mdi-chevron-left</v-icon>
        Previous Page
      </small>
      <small class="d-flex align-items-center cursor-pointer" @click="nextDeals()">
        Next Page
        <v-icon>mdi-chevron-right</v-icon>
      </small>
    </div>

    <div class="summary box-padded">
      <h3><b>Transaction Summary</b></h3>
      <v-row class="mt-3">
        <v-col cols="4" sm="3">
          <label>Client Name</label>
          <v-text-field variant="outlined" density="compact" v-model="clientName"></v-text-field>
        </v-col>

        <v-col cols="4" sm="3">
          <label>Project Name</label>
          <v-text-field variant="outlined" density="compact" v-model="projectName"></v-text-field>
        </v-col>

        <v-col cols="4" sm="3">
          <label>Mandated Deal Size (NGN'b)</label>
          <v-text-field variant="outlined" density="compact" v-model="mandatedDealSize"></v-text-field>
        </v-col>

        <v-col cols="4" sm="3">
          <label>Initial Deal Size (NGN'b)</label>
          <v-text-field variant="outlined" density="compact" v-model="initalDealSize"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4" sm="3">
          <label>Transaction Lead</label>
          <v-select :items="transactorUser" density="compact" variant="outlined" v-model="transactionLead"
            item-title="userFullName" item-value="userId"></v-select>
        </v-col>

        <v-col cols="4" sm="3">
          <label>Transaction Analyst</label>
          <v-select :items="analystUser" density="compact" variant="outlined" v-model="transactionAnalyst"
            item-title="userFullName" item-value="userId"></v-select>
        </v-col>

        <v-col cols="4" sm="3">
          <label>Credit Committee Approval </label>
          <v-text-field append-inner-icon="mdi-calendar-range" type="date" variant="outlined" density="compact"
            v-model="ccApprovalDate"></v-text-field>
        </v-col>

        <v-col cols="4" sm="3">
          <label>Fee Letter Date</label>
          <v-text-field append-inner-icon="mdi-calendar-range" variant="outlined" type="date" density="compact"
            @click:append-inner-icon="openDropdown()" v-model="feeLetterDate"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4" sm="3">
          <label>Expected Closing Date</label>
          <v-text-field variant="outlined" density="compact" type="date" v-model="expectedClosingDate"></v-text-field>
        </v-col>

        <v-col cols="4" sm="3">
          <label>Mandate Letter date</label>
          <v-text-field append-inner-icon="mdi-calendar-range" variant="outlined" type="date" density="compact"
            v-model="mandateLetterDate"></v-text-field>
        </v-col>

        <v-col cols="4" sm="3">
          <div>
            <label>Sector</label>
            <v-select :items="['Clean Energy', 'CRG', 'Housing', 'Other']" density="compact" variant="outlined"
              v-model="sectorSelected" item-title="name" item-value="key"></v-select>
          </div>
        </v-col>

        <v-col cols="4" sm="3">
          <div>
            <label>Project Status</label>
            <v-select :items="[
              { name: 'Inactive', key: false },
              { name: 'Active', key: true },
            ]" density="compact" variant="outlined" v-model="projectStatus" item-title="name"
              item-value="key"></v-select>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4" sm="3">
          <label>Category</label>
          <v-select :items="[
            'Mini-Grid',
            'Interconnected Grid',
            'Mesh Grid',
            'C & I',
            'Stand-alone for Home and Business',
            'Productive Use Equipment',
            'Battery as a Service',
            'SHS',
            'Stand-alone for Telecommunication Towers',
          ]" density="compact" variant="outlined" v-model="categorySelected" item-title="name"
            item-value="key"></v-select>
        </v-col>

        <v-col cols="4" sm="3">
          <label>Product</label>
          <v-select :items="['Direct Guarantee', 'CRG', 'BOI']" density="compact" variant="outlined"
            v-model="productSelected" item-title="name" item-value="key"></v-select>
        </v-col>

        <v-col cols="4" sm="3">
          <label>Fund Option</label>
          <v-select :items="['DCM', 'PCB', 'BOI']" density="compact" variant="outlined" v-model="fundOptionSelected"
            item-title="name" item-value="key"></v-select>
        </v-col>

        <v-col cols="4" sm="3">
          <div>
            <label>Transaction Stage</label>
            <v-select :items="['Green', 'Amber', 'Red']" density="compact" variant="outlined" v-model="transactionStage"
              item-title="name" item-value="key"></v-select>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="12">
          <label>Transaction Description</label>
          <v-textarea variant="outlined" rows="3" no-resize v-model="transactionDescription"></v-textarea>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4" sm="3">
          <label>NBC (30 Days SLA from NDA Execution)</label>
          <v-text-field variant="outlined" density="compact" v-model="nbc"></v-text-field>
        </v-col>

        <v-col cols="1" sm="1">
          <div class="">
            <label>Start Date</label>
            <v-text-field append-inner-icon="mdi-calendar-range" variant="outlined" density="compact" type="date"
              v-model="nbcStartDate"></v-text-field>
          </div>
        </v-col>

        <v-col cols="1" sm="1">
          <div class="">
            <label>Expected End</label>
            <v-text-field append-inner-icon="mdi-calendar-range" variant="outlined" type="date" density="compact"
              v-model="nbcExpectedEnd"></v-text-field>
          </div>
        </v-col>

        <v-col cols="2" sm="1">
          <div class="">
            <label>Actual End</label>
            <v-text-field append-inner-icon="mdi-calendar-range" variant="outlined" density="compact" type="date"
              v-model="nbcActualEnd"></v-text-field>
          </div>
        </v-col>

        <v-col cols="2" sm="1">
          <div class="">
            <label>Days Left/Slip</label>
            <v-text-field variant="outlined" density="compact" type="number" v-model="nbcDaysLeft"></v-text-field>
          </div>
        </v-col>

        <v-col cols="2" sm="1">
          <div class="">
            <label>NBC Doc.</label>
            <v-text-field variant="outlined" density="compact" v-model="nbcDocument"></v-text-field>
          </div>
        </v-col>

        <v-col cols="3" sm="2">
          <div class="field">
            <label>NBC Issues</label>
            <div class="input-with-icon" style="width: 215px">
              <input type="text" class="form-control" disabled />
              <div class="icon">
                <span style="color: #47b65c" class="cursor-pointer" @click="openNewDialog('NBC Issues')">Add</span>
                |
                <span style="color: #227cbf" class="cursor-pointer" @click="viewDialog('NBC Issues')">View</span>
              </div>
            </div>
          </div>
        </v-col>

        <v-col cols="3" sm="2">
          <div class="field">
            <label>Timeline Issues</label>
            <div class="input-with-icon" style="width: 210px; height: 44px">
              <input type="text" class="form-control" disabled />
              <div class="icon">
                <span style="color: #47b65c" class="cursor-pointer"
                  @click="openNewDialog('NBC Timeline Issues')">Add</span>
                |
                <span style="color: #227cbf" class="cursor-pointer" @click="viewDialog('NBC Timeline Issues')">View</span>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>

    <div class="box-padded mt-4">
      <h3><b>Structuring Fee Updates</b></h3>

      <v-row>
        <v-col cols="12" sm="6">
          <label>First Installment Amount</label>
          <v-text-field variant="outlined" density="compact" type="number"
            v-model="firstInstallmentAmount"></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <label>Second Installment Amount</label>
          <v-text-field variant="outlined" density="compact" type="number"
            v-model="secondInstallmentAmount"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6">
          <label>First Installment Comment</label>
          <v-textarea variant="outlined" no-resize rows="3" v-model="firstInstallmentComment"></v-textarea>
        </v-col>

        <v-col cols="12" sm="6">
          <label>Second Installment Comment</label>
          <v-textarea variant="outlined" rows="3" no-resize v-model="secondInstallmentComment"></v-textarea>
        </v-col>
      </v-row>
    </div>

    <div class="summary workstream box-padded">
      <h3><b>Due Dilligence Workstream (3 Weeks SLA)</b></h3>

      <v-row class="mt-2">
        <v-col cols="3" sm="2">
          <div class="">
            <label>Preliminary Legal DD Consultant</label>
            <v-text-field variant="outlined" density="compact" v-model="legalDDConsultant"></v-text-field>
          </div>
        </v-col>

        <v-col cols="" sm="2">
          <div class="">
            <label>Preliminary Legal DD Amount</label>
            <v-text-field variant="outlined" density="compact" type="number" v-model="legalDDAmount"></v-text-field>
          </div>
        </v-col>

        <v-col cols="1" sm="1">
          <div class="">
            <label>Status</label>
            <v-select :items="[
              { name: 'Inactive', key: false },
              { name: 'Active', key: true },
            ]" density="compact" variant="outlined" v-model="legalDDprojectStatus" item-title="name"
              item-value="key"></v-select>
          </div>
        </v-col>

        <v-col cols="1" sm="1">
          <div class="">
            <label>Start Date</label>
            <v-text-field append-inner-icon="mdi-calendar-range" variant="outlined" density="compact" type="date"
              v-model="LegalDDStartDate"></v-text-field>
          </div>
        </v-col>

        <v-col cols="1" sm="1">
          <div class="">
            <label>Expected End</label>
            <v-text-field append-inner-icon="mdi-calendar-range" variant="outlined" type="date" density="compact"
              v-model="LegalDDExpectedDate"></v-text-field>
          </div>
        </v-col>
        <v-col cols="1" sm="1">
          <div class="">
            <label>Actual End</label>
            <v-text-field append-inner-icon="mdi-calendar-range" variant="outlined" density="compact" type="date"
              v-model="LegalDDActualEndDate"></v-text-field>
          </div>
        </v-col>

        <v-col cols="1" sm="1">
          <div class="">
            <label>Days Left/Slip</label>
            <v-text-field variant="outlined" density="compact" type="number" v-model="LegalDDDaysLeft"></v-text-field>
          </div>
        </v-col>

        <v-col cols="2" sm="1" class="mr-15">
          <div class="field">
            <label>Legal DD Issues</label>
            <div class="input-with-icon" style="width: 150px">
              <input type="text" class="form-control" disabled />
              <div class="icon">
                <span style="color: #47b65c" class="cursor-pointer" @click="openNewDialog('Legal DD Issues')">Add</span>
                |
                <span style="color: #227cbf" class="cursor-pointer" @click="viewDialog('Legal DD Issues')">View</span>
              </div>
            </div>
          </div>
        </v-col>

        <v-col cols="2" sm="1">
          <div class="field">
            <label>Timeline Issues</label>
            <div class="input-with-icon" style="width: 150px; height:">
              <input type="text" class="form-control" disabled />
              <div class="icon">
                <span style="color: #47b65c" class="cursor-pointer"
                  @click="openNewDialog('Legal Timeline Issues')">Add</span>
                |
                <span style="color: #227cbf" class="cursor-pointer"
                  @click="viewDialog('Legal Timeline Issues')">View</span>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3" sm="2">
          <div class="">
            <label>Preliminary E&S Consultant</label>
            <v-text-field variant="outlined" density="compact" v-model="E_S_Consultant"></v-text-field>
          </div>
        </v-col>

        <v-col cols="3" sm="2">
          <div class="">
            <label>Preliminary E&S Amount</label>
            <v-text-field variant="outlined" density="compact" type="number" v-model="E_S_Amount"></v-text-field>
          </div>
        </v-col>

        <v-col cols="1" sm="1">
          <div class="">
            <label>Status</label>
            <v-select :items="[
              { name: 'Inactive', key: false },
              { name: 'Active', key: true },
            ]" density="compact" variant="outlined" item-title="name" item-value="key" v-model="E_S_Status"></v-select>
          </div>
        </v-col>

        <v-col cols="1" sm="1">
          <div class="">
            <label>Start Date</label>
            <v-text-field append-inner-icon="mdi-calendar-range" variant="outlined" density="compact" type="date"
              v-model="E_S_StartDate"></v-text-field>
          </div>
        </v-col>

        <v-col cols="1" sm="1">
          <div class="">
            <label>Expected End</label>
            <v-text-field append-inner-icon="mdi-calendar-range" variant="outlined" type="date" density="compact"
              v-model="E_S_ExpectedDate"></v-text-field>
          </div>
        </v-col>

        <v-col cols="1" sm="1">
          <div class="">
            <label>Actual End</label>
            <v-text-field append-inner-icon="mdi-calendar-range" variant="outlined" density="compact" type="date"
              v-model="E_S_ActualEnd"></v-text-field>
          </div>
        </v-col>

        <v-col cols="1" sm="1">
          <div class="">
            <label>Days Left/Slip</label>
            <v-text-field variant="outlined" density="compact" type="number" v-model="E_S_DaysLeft"></v-text-field>
          </div>
        </v-col>

        <v-col cols="2" sm="1" class="mr-15">
          <div class="field">
            <label>E&S Issues</label>
            <div class="input-with-icon" style="width: 150px">
              <input type="text" class="form-control" disabled />
              <div class="icon">
                <span style="color: #47b65c" class="cursor-pointer"
                  @click="openNewDialog('Preliminary E&S Issues')">Add</span>
                |
                <span style="color: #227cbf" class="cursor-pointer"
                  @click="viewDialog('Preliminary E&S Issues')">View</span>
              </div>
            </div>
          </div>
        </v-col>

        <v-col cols="2" sm="1">
          <div class="field">
            <label>Timeline Issues</label>
            <div class="input-with-icon" style="width: 150px">
              <input type="text" class="form-control" disabled />
              <div class="icon">
                <span style="color: #47b65c" class="cursor-pointer"
                  @click="openNewDialog('E&S Timeline Issues')">Add</span>
                |
                <span style="color: #227cbf" class="cursor-pointer" @click="viewDialog('E&S Timeline Issues')">View</span>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3" sm="2">
          <div class="">
            <label>Tech & Com Consultant</label>
            <v-text-field variant="outlined" density="compact" v-model="TechComConsultant"></v-text-field>
          </div>
        </v-col>

        <v-col cols="" sm="2">
          <div class="">
            <label>Tech & Com Amount</label>
            <v-text-field variant="outlined" density="compact" type="number" v-model="TechComAmount"></v-text-field>
          </div>
        </v-col>

        <v-col cols="1" sm="1">
          <div class="">
            <label>Status</label>
            <v-select :items="[
              { name: 'Inactive', key: false },
              { name: 'Active', key: true },
            ]" density="compact" variant="outlined" v-model="TechComProjectStatus" item-title="name"
              item-value="key"></v-select>
          </div>
        </v-col>

        <v-col cols="1" sm="1">
          <div class="">
            <label>Start Date</label>
            <v-text-field append-inner-icon="mdi-calendar-range" variant="outlined" density="compact" type="date"
              v-model="TechComStartDate"></v-text-field>
          </div>
        </v-col>

        <v-col cols="1" sm="1">
          <div class="">
            <label>Expected End</label>
            <v-text-field append-inner-icon="mdi-calendar-range" variant="outlined" density="compact" type="date"
              v-model="TechComExpectedEnd"></v-text-field>
          </div>
        </v-col>

        <v-col cols="1" sm="1">
          <div class="">
            <label>Actual End</label>
            <v-text-field append-inner-icon="mdi-calendar-range" variant="outlined" density="compact" type="date"
              v-model="TechComActualEnd"></v-text-field>
          </div>
        </v-col>

        <v-col cols="1" sm="1">
          <div class="">
            <label>Days Left/Slip</label>
            <v-text-field variant="outlined" density="compact" type="number" v-model="TechComDaysLeft"></v-text-field>
          </div>
        </v-col>

        <v-col cols="2" sm="1" class="mr-15">
          <div class="field">
            <label>Tech & Com Issues</label>
            <div class="input-with-icon" style="width: 150px">
              <input type="text" class="form-control" disabled />
              <div class="icon">
                <span style="color: #47b65c" class="cursor-pointer" @click="openNewDialog('Tech & Com Issues')">Add</span>
                |
                <span style="color: #227cbf" class="cursor-pointer" @click="viewDialog('Tech & Com Issues')">View</span>
              </div>
            </div>
          </div>
        </v-col>

        <v-col cols="2" sm="1">
          <div class="field">
            <label>Timeline Issues</label>
            <div class="input-with-icon" style="width: 150px">
              <input type="text" class="form-control" disabled />
              <div class="icon">
                <span style="color: #47b65c" class="cursor-pointer"
                  @click="openNewDialog('Tech & Com Timeline Issues')">Add</span>
                |
                <span style="color: #227cbf" class="cursor-pointer"
                  @click="viewDialog('Tech & Com Timeline Issues')">View</span>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3" sm="2">
          <div class="">
            <label>Embedded Advisor Consultant</label>
            <v-text-field variant="outlined" density="compact" v-model="embeddedAdvisorConsultant"></v-text-field>
          </div>
        </v-col>

        <v-col cols="" sm="2">
          <div class="">
            <label>Embedded Advisor Amount</label>
            <v-text-field variant="outlined" density="compact" type="number"
              v-model="embeddedAdvisorAmount"></v-text-field>
          </div>
        </v-col>

        <v-col cols="1" sm="1">
          <div class="">
            <label>Status</label>
            <v-select :items="[
              { name: 'Inactive', key: false },
              { name: 'Active', key: true },
            ]" density="compact" variant="outlined" v-model="embeddedAdvisorProjectStatus" item-title="name"
              item-value="key"></v-select>
          </div>
        </v-col>

        <v-col cols="1" sm="1">
          <div class="">
            <label>Start Date</label>
            <v-text-field append-inner-icon="mdi-calendar-range" variant="outlined" density="compact" type="date"
              v-model="embeddedAdvisorStartDate"></v-text-field>
          </div>
        </v-col>

        <v-col cols="1" sm="1">
          <div class="">
            <label>Expected End</label>
            <v-text-field append-inner-icon="mdi-calendar-range" variant="outlined" type="date" density="compact"
              v-model="embeddedAdvisorExpectedEndDate"></v-text-field>
          </div>
        </v-col>
        <v-col cols="1" sm="1">
          <div class="">
            <label>Actual End</label>
            <v-text-field append-inner-icon="mdi-calendar-range" variant="outlined" density="compact" type="date"
              v-model="embeddedAdvisorActualEndDate"></v-text-field>
          </div>
        </v-col>

        <v-col cols="1" sm="1">
          <div class="">
            <label>Days Left/Slip</label>
            <v-text-field variant="outlined" density="compact" type="number"
              v-model="embeddedAdvisorDaysLeft"></v-text-field>
          </div>
        </v-col>

        <v-col cols="2" sm="1" class="mr-15">
          <div class="field">
            <label>Advisor Issues</label>
            <div class="input-with-icon" style="width: 150px">
              <input type="text" class="form-control" disabled />
              <div class="icon">
                <span style="color: #47b65c" class="cursor-pointer"
                  @click="openNewDialog('Embedded Advisor Issues')">Add</span>
                |
                <span style="color: #227cbf" class="cursor-pointer"
                  @click="viewDialog('Embedded Advisor Issues')">View</span>
              </div>
            </div>
          </div>
        </v-col>

        <v-col cols="2" sm="1">
          <div class="field">
            <label>Timeline Issues</label>
            <div class="input-with-icon" style="width: 150px">
              <input type="text" class="form-control" disabled />
              <div class="icon">
                <span style="color: #47b65c" class="cursor-pointer"
                  @click="openNewDialog('Embedded Advisor Timeline Issues')">Add</span>
                |
                <span style="color: #227cbf" class="cursor-pointer"
                  @click="viewDialog('Embedded Advisor Timeline Issues')">View</span>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>

    <div class="summary workstream box-padded">
      <h3><b>Credit Analysis and Structuring Status</b></h3>

      <v-row class="mt-2">
        <v-col cols="4" sm="3">
          <label>Financial Model</label>
          <v-select :items="[
            { name: 'Not Done', key: false },
            { name: 'Done', key: true },
          ]" density="compact" variant="outlined" v-model="financialModel" item-title="name"
            item-value="key"></v-select>
        </v-col>

        <v-col cols="4" sm="3">
          <label>Risk Rating</label>
          <v-select :items="[
            { name: 'Not Done', key: false },
            { name: 'Done', key: true },
          ]" density="compact" variant="outlined" v-model="riskRating" item-title="name" item-value="key"></v-select>
        </v-col>

        <v-col cols="4" sm="2">
          <label>TA Funding Required?</label>
          <v-select :items="[
            { name: 'Yes', key: false },
            { name: 'No', key: true },
          ]" density="compact" variant="outlined" v-model="TAfundingRequired" item-title="name"
            item-value="key"></v-select>
        </v-col>
        <v-col cols="3" sm="2">
          <label>TA Amount</label>
          <v-text-field variant="outlined" density="compact" type="number" v-model="TAAmount"></v-text-field>
        </v-col>
        <v-col cols="3" sm="2">
          <label>TA Refunded?</label>
          <v-select :items="[
            { name: 'Yes', key: true },
            { name: 'No', key: false },
          ]" density="compact" variant="outlined" v-model="TARefunded" item-title="name" item-value="key"></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3" sm="2">
          <label>Credit Paper Approval</label>
          <v-select :items="[
            { name: 'Not Done', key: false },
            { name: 'Done', key: true },
          ]" density="compact" variant="outlined" v-model="ccPaperApproval" item-title="name" item-value="key"></v-select>        </v-col>

        <v-col cols="2" sm="2">
          <div>
            <label>Start Date</label>
            <v-text-field append-inner-icon="mdi-calendar-range" variant="outlined" density="compact" type="date"
              v-model="ccStartDate"></v-text-field>
          </div>
        </v-col>

        <v-col cols="2" sm="2">
          <div>
            <label>Expected End</label>
            <v-text-field append-inner-icon="mdi-calendar-range" variant="outlined" density="compact" type="date"
              v-model="ccexpectedEnd"></v-text-field>
          </div>
        </v-col>

        <v-col cols="2" sm="2">
          <div class="">
            <label>Actual End</label>
            <v-text-field append-inner-icon="mdi-calendar-range" variant="outlined" density="compact" type="date"
              v-model="ccActualEnd"></v-text-field>
          </div>
        </v-col>

        <v-col cols="1" sm="1">
          <div>
            <label>Days Left/Slip</label>
            <v-text-field variant="outlined" density="compact" type="number" v-model="ccdaysLeft"></v-text-field>
          </div>
        </v-col>

        <v-col cols="2" sm="1" class="mr-14">
          <div class="field">
            <label>Credit Paper Issues</label>
            <div class="input-with-icon" style="width: 150px">
              <input type="text" class="form-control" disabled />
              <div class="icon">
                <span style="color: #47b65c" class="cursor-pointer"
                  @click="openNewDialog('Credit Paper Issues')">Add</span>
                |
                <span style="color: #227cbf" class="cursor-pointer" @click="viewDialog('Credit Paper Issues')">View</span>
              </div>
            </div>
          </div>
        </v-col>

        <v-col cols="2" sm="1">
          <div class="field">
            <label>Timeline Issues</label>
            <div class="input-with-icon" style="width: 150px">
              <input type="text" class="form-control" disabled />
              <div class="icon">
                <span style="color: #47b65c" class="cursor-pointer"
                  @click="openNewDialog('Credit Paper Timeline Issues')">Add</span>
                |
                <span style="color: #227cbf" class="cursor-pointer"
                  @click="viewDialog('Credit Paper Timeline Issues')">View</span>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3" sm="2">
          <label style="font-size: 13px">Fee Letter (X Weeks SLA)</label>
          <v-select :items="[
            { name: 'Not Done', key: false },
            { name: 'Done', key: true },
          ]" density="compact" variant="outlined" v-model="feeLetter" item-title="name" item-value="key"></v-select>        </v-col>

        <v-col cols="2" sm="2">
          <div>
            <label>Start Date</label>
            <v-text-field append-inner-icon="mdi-calendar-range" variant="outlined" density="compact" type="date"
              v-model="feeLetterStartDate"></v-text-field>
          </div>
        </v-col>

        <v-col cols="2" sm="2">
          <div>
            <label>Expected End</label>
            <v-text-field append-inner-icon="mdi-calendar-range" variant="outlined" density="compact" type="date"
              v-model="feeLetterExpectedEndDate"></v-text-field>
          </div>
        </v-col>

        <v-col cols="2" sm="2">
          <div class="">
            <label>Actual End</label>
            <v-text-field append-inner-icon="mdi-calendar-range" variant="outlined" density="compact" type="date"
              v-model="feeLetterActualEndDate"></v-text-field>
          </div>
        </v-col>

        <v-col cols="1" sm="1">
          <div>
            <label>Days Left/Slip</label>
            <v-text-field variant="outlined" density="compact" type="number" v-model="feeLetterDaysLeft"></v-text-field>
          </div>
        </v-col>

        <v-col cols="2" sm="1" class="mr-14">
          <div class="field">
            <label>Fee Letter Issues</label>
            <div class="input-with-icon" style="width: 150px">
              <input type="text" class="form-control" disabled />
              <div class="icon">
                <span style="color: #47b65c" class="cursor-pointer" @click="openNewDialog('Fee Letter Issues')">Add</span>
                |
                <span style="color: #227cbf" class="cursor-pointer" @click="viewDialog('Fee Letter Issues')">View</span>
              </div>
            </div>
          </div>
        </v-col>

        <v-col cols="2" sm="1">
          <div class="field">
            <label>Timeline Issues</label>
            <div class="input-with-icon" style="width: 150px">
              <input type="text" class="form-control" disabled />
              <div class="icon">
                <span style="color: #47b65c" class="cursor-pointer"
                  @click="openNewDialog('Fee Letter Timeline Issues')">Add</span>
                |
                <span style="color: #227cbf" class="cursor-pointer"
                  @click="viewDialog('Fee Letter Timeline Issues')">View</span>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>

    <div class="structuring box-padded mt-4">
      <h3><b>Other Key Workstreams</b></h3>

      <v-row class="mt-2">
        <v-col cols="6" sm="4">
          <label>Sign CRG Deed</label>
          <v-text-field variant="outlined" density="compact" v-model="signCRGDeed"></v-text-field>
        </v-col>

        <v-col cols="6" sm="4">
          <label>Bridge to Bond Disbursement</label>
          <v-text-field variant="outlined" density="compact" v-model=bridgeToBondDisbursement></v-text-field>
        </v-col>

        <v-col cols="6" sm="4">
          <label>Engagement of Solicitor for Bridge to Bond</label>
          <v-text-field variant="outlined" density="compact" v-model="engagementSolictorBridge"></v-text-field>
        </v-col>
      </v-row>
    </div>

    <div class="structuring box-padded mt-4">
      <h3><b>Others</b></h3>

      <v-row class="mt-2">
        <v-col cols="6" sm="4">
          <label>Key Issues</label>
          <v-textarea variant="outlined" no-resize rows="3" v-model="keyIssues"></v-textarea>
        </v-col>

        <v-col cols="6" sm="4">
          <label>Status Update</label>
          <v-textarea variant="outlined" no-resize rows="3" v-model="statusUpdate"></v-textarea>
        </v-col>

        <v-col cols="6" sm="4">
          <label>Next Steps</label>
          <v-textarea variant="outlined" no-resize rows="3" v-model="nextSteps"></v-textarea>
        </v-col>
      </v-row>
    </div>

    <div class="mt-4 modified">
      Last Modified by {{ lastModifidBy }} at {{ lastModifiedDateTime }}
    </div>

    <div class="d-flex" style="width: 100%; height: 100%; justify-content: end">
      <button class="buttons" v-if="route.params.id4 == 'new'" @click="submitNew()">Submit</button>
      <button class="buttons" v-else @click="editExs()">Submit</button>
    </div>
  </div>
</template>

<style>
.wrapper {
  padding: 20px 50px;
  background: #fafafb;
}

thead tr th {
  font-size: 12px;
  font-weight: 600;
  line-height: 14.4px;
  padding: 25px;
}

tbody tr td {
  color: var(--grey-dark, #808080);
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
  padding: 25px 15px;
  cursor: pointer;
}

thead,
tr {
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}

tbody tr:last-child {
  td {
    font-weight: 600;
    color: #000;
  }
}

.noshrink {
  display: flex;
  flex-shrink: 0;
}

.v-select {
  background-color: #eeeeee !important;
  height: 42px;
  border-radius: 5px;
  border-color: #e4e4e7 !important;
  min-height: 42px !important;
}

.v-text-field {
  background-color: #eeeeee !important;
  height: 42px;
  border-color: #e4e4e7 !important;
  border-radius: 5px;
  min-height: 42px !important;
}

.v-field__input {
  min-height: 42px !important;
}

.v-text-field input.v-field__input {
  padding-bottom: 2px !important;
}

.v-textarea {
  height: 102px;
}

.mandated-transaction-heading {
  display: flex;
  justify-content: space-between;

  .search-box {
    button {
      background: linear-gradient(90deg, #227cbf, #71c480);
      color: #fff;
      height: 42px;
      width: 100px;
      padding: 0.3rem 1rem;
      margin-left: 0.5rem;
      border-radius: 0.3rem;
    }
  }
}

.buttons {
  background: linear-gradient(90deg, #227cbf, #71c480);
  color: #fff;
  height: 42px;
  width: 100px;
  padding: 0.3rem 1rem;
  margin-left: 0.5rem;
  border-radius: 0.3rem;
}

.modified {
  color: #888;
}

.material-symbols-outlined {
  font-size: 20px;
}

.summary .transaction-info {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 25% 25% 25% auto;
  gap: 20px;
  width: 100%;
  position: relative;
  place-items: center;
  margin-top: 1rem;

  &:last-child {
    grid-template-columns: 25% auto 25%;

    .summary-final {
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: auto;
      gap: 20px;
    }
  }
}

.summary.credit,
.summary.workstream {
  .transaction-info {
    grid-template-columns: 33% auto;

    &.final {
      grid-template-columns: 25% auto 25%;
    }

    &.work-final {
      grid-template-columns: 15% 15% auto 15%;
    }

    .summary-final {
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: auto;
      gap: 10px;
    }
  }
}

.transaction-infos {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.transaction-infos_ {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.structuring .structuring-info {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 33% auto;
  gap: 20px;
  width: 100%;
  position: relative;
  place-items: center;
  margin-top: 1rem;

  &.installment {
    grid-template-columns: 50% auto;
  }
}

.structurings {
  display: flex;
  flex-direction: row !important;
  justify-content: space-between;
  width: 100%;
}

.field {
  display: flex;
  flex-direction: column;
  width: 300px;

  label {
    font-weight: bold;
    font-size: 12px;
    margin-top: 6px;
  }
}

.box-title {
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
}

.box-padded {
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-top: 20px;
  background: #ffffff;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  h3 {
    font-size: 16px;
  }

  label {
    font-size: 12px;
    font-weight: bold;
  }
}

.targets {
  width: 24%;
}

.chart-box-3 {
  width: 32%;
}

.chart-container {
  min-height: 400px;
}

h3.title {
  margin-left: 10px;
  margin-top: 30px;
  font-size: 20px;
}

.sel {
  width: 150px !important;
}

.input-with-icon {
  position: relative;
}

.input-with-icon .form-control {
  border-radius: 5px;
  background-color: #eeeeee;
}

.input-with-icon .icon {
  position: absolute;
  right: 1.5rem;
  top: 0.2rem;
  width: 2.6rem;
  height: 2.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

.input-with-icon .form-control {
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
}</style>

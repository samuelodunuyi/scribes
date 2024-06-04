<script setup>
import { ref, computed } from 'vue';
import TabMenu from '../../components/TabMenu.vue';
import ToolBar from '../../components/ToolBar2.vue';
import TransactionTeamInfo from '../../components/Cards/TransactionUpdate.vue';
import DealProfile from '../../components/Cards/DealProfile.vue';
import Fees from '../../components/Cards/Fees.vue';
import DealCategory from '../../components/Cards/DealCategory.vue';
import NBCFocusArea from '../../components/Cards/NBCFocusArea.vue';
import TimeLineCardTRMS from '../../components/Cards/TimeLineCardTRMS.vue';
import TransactionParties from '../../components/Cards/TransactionParties.vue';
import PerformanceIndicators from '../../components/Cards/PerformanceIndicators.vue';
import OtherConditions from '../../components/Cards/OtherConditions.vue';
import KeyDealsFactors from '../../components/Cards/KeyDealsFactors.vue';
import Amortization from '../../components/Cards/Amortization.vue';
import FundOptions from '../../components/Cards/FundOptions.vue';
import ClientContact from '../../components/Cards/ClientContact.vue';
import OtherFocusAreas from '../../components/Cards/OtherFocusAreas.vue';
import CreditCommitteeFocusAreas from '../../components/Cards/CreditCommitteeFocusAreas.vue';
import TableCreateDeals from '../../components/Tables/TableCreateDeals.vue'
import TableOne from '../../components/Tables/TableOne.vue'
import TableSummary from '../../components/Tables/TableSummary.vue'
import trmsService from '../../services/trmsService';
import GradeButton from '../../components/GradeButton.vue';
import crmService from '../../services/crmService';
import DecoupledDocument from '@ckeditor/ckeditor5-build-decoupled-document';
import { useDashOptionStore } from "../../stores/dashOption"
import pinia from "../../stores/store";
import transactionSummaryTemplate from '../../components/transactionSummaryTemplate'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useRouter } from 'vue-router'

const router = useRouter()
const dialog = ref(false)
const transactSummary = ref(null)
const dialogTimeline = ref(false)
const stores = useDashOptionStore(pinia);
const dialog2 = ref(false)
var editorConfig = {
  toolbar: ['bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'outdent', 'indent', '|', 'insertTable', 'undo', 'redo', 'alignment', 'fontColor', 'fontFamily', 'fontSize',
    'underline'],
}
var editorConfig2 = {
  toolbar: ['bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'outdent', 'indent', '|', 'insertTable', 'undo', 'redo', 'alignment', 'fontColor', 'fontFamily', 'fontSize',
    'underline'],
}
const editor = DecoupledDocument
const dialogPipeline = ref(false)
const loadingButton = ref(false)
const showSummary = ref(false)
const isPipeline = ref(false)
const allPipelineDealsData = ref([]);
const myPipelineDealsData = ref([]);
const selectedDealSidebar = ref([]);
const allMandatedLeadsData = ref([]);
const addLineNBCFocusArea = ref(false)
const addLineClientContacts = ref(false)
const addLineOtherFocusArea = ref(false)
const addLineCreditCommitteeFocusArea = ref(false)
const addLineTransactionParties = ref(false)
const addLinePerformanceIndicators = ref(false)
const addLineOtherconditions = ref(false)
const activityDetailsStatus = ref('')
const activityDetailsKeyIssues = ref('')
const activityDetailsKeyComments = ref('')
const activityDetailsNextSteps = ref('')
const activityTypes = ref([])
const addLineKeyDealFactors = ref(false)
const addLineAmortization = ref(false)
const isUser = ref(false)
const searchValue = ref('')
const filterOption = ref('')
const filterOption2 = ref('')
const size = ref(20)
const pageNumber = ref(1)
const text = ref("allPipelineDeals")
const selectedrow = ref('')
const totalArrayValue = ref('')
const firstValue = ref('')
const secondValue = ref('')

const onFilterSelected = (isCorrect) => {
  filterOption.value = isCorrect
}

const onFilter2Selected = (isCorrect) => {
  filterOption2.value = isCorrect
}

const onSearchValuesEntered = (isCorrect) => {
  searchValue.value = isCorrect
}
const navigatePages = (id) => {
    if(stores.signedInUserEmail=='cazubike@infracredit.ng' || stores.signedInUserEmail=='iagunbiade@infracredit.ng' || stores.signedInUserEmail=='conyilimba@infracredit.ng'){
        router.push(`/trms/pipelinedeals_/detail/${id}`);

    }
    else{
        router.push(`/trms/pipelinedeals/detail/${id}`);
    }
}
const pageMovement = (isCorrect) => {
  if (isCorrect == 'Next') {
    pageNumber.value++;
  }
  else if (isCorrect == 'Previous') {
    pageNumber.value--;
  }
}

const pipelineDeals = computed(() => {
  var deals = null
  next()

  if (text.value == 'myPipelineDeals') {
    deals = myPipelineDealsData.value;
    totalArrayValue.value = deals.length
  }
  else if (text.value == 'allPipelineDeals') {
    deals = allPipelineDealsData.value;
    totalArrayValue.value = deals.length
  }
  // Process search input
  if (searchValue.value != '' && searchValue.value) {
    deals = deals.filter((item) => {
      return item.dealId
        .toLowerCase()
        .includes(searchValue.value.toLowerCase()) ||
        item.companyName.toLowerCase().includes(searchValue.value.toLowerCase()) ||
        item.originator.toLowerCase().includes(searchValue.value.toLowerCase()) ||
        item.originatorName.toLowerCase().includes(searchValue.value.toLowerCase()) ||
        item.coTransactor.toLowerCase().includes(searchValue.value.toLowerCase()) ||
        item.leadTransactorName.toLowerCase().includes(searchValue.value.toLowerCase())
    })
  }

  // Process Filter
  if (filterOption.value != '' && filterOption.value && filterOption2.value == '' && !filterOption2.value) {
    deals = deals.filter((item) => {
      return item.dealCategory
        .includes(filterOption.value)
    })
  }

  // Process Filter
  if (filterOption2.value != '' && filterOption2.value && filterOption.value == '' && !filterOption.value) {
    if (filterOption2.value == 'BOI') {
      deals = deals.filter((item) => {
        return item.fundOptionBOI === true
      })
    }
    else if (filterOption2.value == 'DCM') {
      deals = deals.filter((item) => {
        return item.fundOptionDCM === true
      })
    }
    else if (filterOption2.value == 'PCB') {
      deals = deals.filter((item) => {
        return item.fundOptionPCB === true
      })
    }
  }

  // Process Filter
  if (filterOption.value != '' && filterOption.value && filterOption2.value != '' && filterOption2.value) {
    deals = deals.filter((item) => {
      if (filterOption2.value == 'BOI') {
        return item.dealCategory.includes(filterOption.value) &&
          item.fundOptionBOI === true
      }
      else if (filterOption2.value == 'DCM') {
        return item.dealCategory.includes(filterOption.value) &&
          item.fundOptionDCM === true
      }
      if (filterOption2.value == 'PCB') {
        return item.dealCategory.includes(filterOption.value) &&
          item.fundOptionPCB === true
      }
    })
  }
  // Sort by alphabetical order
  deals = deals.sort((a, b) => {
    if (filterOption.value == 'asc') {
      let fa = a.dealId.toLowerCase(), fb = b.dealId.toLowerCase()

      if (fa > fb) {
        return 1
      }
      if (fa < fb) {
        return -1
      }
      return 0
    }
    else if (filterOption.value == 'dsc') {
      let fa = a.dealId.toLowerCase(), fb = b.dealId.toLowerCase()

      if (fa < fb) {
        return 1
      }
      if (fa > fb) {
        return -1
      }
      return 0
    }
  })

  if (deals.length > 0) {
    deals.forEach((element, index, array) => {
      array[index].count = index + 1
    });

    let ps = deals.slice(indexStart.value, indexEnd.value)
    firstValue.value = ps[0].count;
    secondValue.value = ps[ps.length - 1].count
  }

  return deals.slice(indexStart.value, indexEnd.value)
})

const pageCount = computed(() => {
  let l = totalArrayValue.value,
    s = size.value;
  return Math.ceil(l / s);
})

const indexStart = computed(() => {
  return (pageNumber.value - 1) * size.value;
})

const indexEnd = computed(() => {
  return indexStart.value + size.value;
})

const selectRow = async (id) => {
  selectedrow.value = id
}
const selectDeal = (selectedDeal) => {
  selectedDealSidebar.value = selectedDeal
  if (stores.signedInUserEmail === selectedDealSidebar.value.transactorLegal
    || stores.signedInUserEmail === selectedDealSidebar.value.coTransactor
    || stores.signedInUserEmail === selectedDealSidebar.value.originator
    || stores.signedInUserEmail === selectedDealSidebar.value.leadTransactor) {
    isUser.value = false
  }
  else{
    isUser.value = true
  }
  if (stores.signedInUserLevel == 'MANAGEMENT' || stores.signedInUserLevel == 'IT') {
    isUser.value = false
  }

}
const next = async () => {
  let allTotalDeals = await trmsService.getDeals()
  let allTotalLeads = await crmService.getLeads()
  activityTypes.value = await crmService.getActivityTypes()
  allPipelineDealsData.value = allTotalDeals.filter(o => o.dealCategory === 'CLOSED')
  myPipelineDealsData.value = allTotalDeals.filter(o =>
    o.dealCategory == 'CLOSED' && o.originator == stores.signedInUserEmail || o.dealCategory == 'CLOSED' && o.leadTransactor == stores.signedInUserEmail || o.dealCategory == 'CLOSED' && o.transactorLegal == stores.signedInUserEmail || o.dealCategory == 'CLOSED' && o.administrator == stores.signedInUserEmail || o.dealCategory == 'CLOSED' && o.coTransactor === stores.signedInUserEmail ||
    o.dealCategory == 'CLOSED' && o.originator == stores.signedInUserEmail || o.dealCategory == 'CLOSED' && o.leadTransactor == stores.signedInUserEmail || o.dealCategory == 'CLOSED' && o.transactorLegal == stores.signedInUserEmail || o.dealCategory == 'CLOSED' && o.administrator == stores.signedInUserEmail || o.dealCategory == 'CLOSED' && o.coTransactor == stores.signedInUserEmail ||
    o.dealCategory == 'CLOSED' && o.originator == stores.signedInUserEmail || o.dealCategory == 'CLOSED' && o.leadTransactor == stores.signedInUserEmail || o.dealCategory == 'CLOSED' && o.transactorLegal == stores.signedInUserEmail || o.dealCategory == 'CLOSED' && o.administrator == stores.signedInUserEmail || o.dealCategory == 'CLOSED' && o.coTransactor == stores.signedInUserEmail)
  allMandatedLeadsData.value = allTotalLeads.filter(o => o.mandateSigned == true)

}
const onOptionSelected = (isCorrect) => {
  addLineNBCFocusArea.value = isCorrect;
  addLineClientContacts.value = isCorrect;
  addLineCreditCommitteeFocusArea.value = isCorrect;
  addLineOtherFocusArea.value = isCorrect;
  addLineOtherFocusArea.value = isCorrect
  addLineCreditCommitteeFocusArea.value = isCorrect
  addLineTransactionParties.value = isCorrect
  addLinePerformanceIndicators.value = isCorrect
  addLineOtherconditions.value = isCorrect
  addLineKeyDealFactors.value = isCorrect
  addLineAmortization.value = isCorrect
}
const saveActivityType = async () => {
  loadingButton.value = true;
  let stats = "<b>Status</b>\n"
  let activityDets = stats.concat(activityDetailsStatus.value, "\n<b>Comments</b>\n", activityDetailsKeyComments.value, "\n<b>Key Transaction Issues</b>\n", activityDetailsKeyIssues.value, "\n<b>Next Steps/Action Plan</b>\n", activityDetailsNextSteps.value)
  console.log(activityDets)
  let ps = await crmService.createActivitys(1, 'Transaction Update', selectedDealSidebar.value.companyId, 'CONT100001', 'DEALS', selectedDealSidebar.value.dealId, 'Deal Activity', activityDets, 'Completed', stores.signedInUserEmail, stores.signedInUserEmail, new Date().toJSON(), new Date().toJSON(), stores.signedInUserEmail)
  if (ps == true) {
    toast.success("Update Added to Transaction")
    setTimeout(async () => {
      dialogTimeline.value = false;
      loadingButton.value = false;
      activityDetailsKeyIssues.value = ''
      activityDetailsStatus.value = ''
      activityDetailsKeyComments.value = ''
      activityDetailsNextSteps.value = ''
    }, 1500);
  }
  else {
    toast.error("An error occured")
    loadingButton.value = false;
  }
}

const onReady5 = (editor) => {
  const toolbarContainer = document.querySelector('.document-editor__toolbar5');
  toolbarContainer.appendChild(editor.ui.view.toolbar.element);
}

const onReady6 = (editor) => {
  const toolbarContainer = document.querySelector('.document-editor__toolbar6');
  toolbarContainer.appendChild(editor.ui.view.toolbar.element);
}
const onReady7 = (editor) => {
  const toolbarContainer = document.querySelector('.document-editor__toolbar7');
  toolbarContainer.appendChild(editor.ui.view.toolbar.element);
}
const onReady8 = (editor) => {
  const toolbarContainer = document.querySelector('.document-editor__toolbar8');
  toolbarContainer.appendChild(editor.ui.view.toolbar.element);
}

const downloadSummary = () => {
  console.log(transactSummary.value)
  transactionSummaryTemplate.exportPdfTemplate(transactSummary.value)
}
</script>

<template>
  <div class="wrapper">
    <v-dialog v-model="dialogTimeline" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5 ml-3">Add new Update </span>
        </v-card-title>
        <v-card-text>
          <v-row> 
            <v-col cols="12">
              <div class="ckeditor">
               <b>Status</b> 
                <div class="document-editor__toolbar5"></div>
                <div class="document-editor__editable-container">
                  <ckeditor :editor="editor" :config="editorConfig" @ready="onReady5" v-model="activityDetailsStatus"
                    class="checkEditor"></ckeditor>
                </div>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="ckeditor">
                <b>Comments</b>
                <div class="document-editor__toolbar6"></div>
                <div class="document-editor__editable-container">
                  <ckeditor :editor="editor" :config="editorConfig2" @ready="onReady6" v-model="activityDetailsKeyComments"
                    class="checkEditor"></ckeditor>
                </div>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="ckeditor">
                <b> Key Issues</b>
                <div class="document-editor__toolbar7"></div>
                <div class="document-editor__editable-container">
                  <ckeditor :editor="editor" :config="editorConfig2" @ready="onReady7" v-model="activityDetailsKeyIssues"
                    class="checkEditor"></ckeditor>
                </div>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="ckeditor">
                <b>Next Step/Action Points</b>
                <div class="document-editor__toolbar8"></div>
                <div class="document-editor__editable-container">
                  <ckeditor :editor="editor" :config="editorConfig2" @ready="onReady8" v-model="activityDetailsNextSteps"
                    class="checkEditor"></ckeditor>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialogTimeline = false">
            Cancel
          </v-btn>
          <v-btn color="blue-darken-1" :loading="loadingButton" variant="text" @click="saveActivityType">Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <TabMenu />
    <div class="d-flex justify-content-between align-items-center mt-3 intro">
      <h3 class="mt-4">Portfolio Deals</h3>
      <div class="d-flex gap-3">
        <div class="toggleButton">
          <v-btn-toggle color='#298729' v-model="text" group mandatory variant="elevated">
            <v-btn size="x-small" density="compact" value="myPipelineDeals" v-on:click="text = 'myPipelineDeals'">
              My Portfolio Deals
            </v-btn>
            <v-btn size="x-small" density="compact" value="allPipelineDeals" v-on:click="text = 'allPipelineDeals'">
              All Portfolio Deals
            </v-btn>
          </v-btn-toggle>
        </div>
       
      </div>
    
    </div>
    <ToolBar @filterOptions="onFilterSelected" @filterOptions2="onFilter2Selected" @searchValues="onSearchValuesEntered"
      @pageDetails="pageMovement" :totalValue="totalArrayValue" :pageNum="pageNumber" :pageCounts="pageCount"
      :firstVal="firstValue" :lastVal="secondValue" />
    <div class="d-flex justify-content-between mt-4  ">
      <div class="custom-table table-responsive-sm">
        <div class="table-responsive" style="overflow-y: auto; height: 910px;">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">
                  <div class="d-flex align-center gap-1">
                    <span class="noshrink"> S/N</span>
                    <span class="d-flex flex-column align-center">
                      <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                      <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                    </span>
                  </div>
                </th>
                <th scope="col">
                  <div class="d-flex align-center gap-1">
                    <span class="noshrink"> Deal Id</span>
                    <span class="d-flex flex-column align-center">
                      <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                      <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                    </span>
                  </div>
                </th>
                <th scope="col">
                  <div class="d-flex align-center gap-1">
                    <span> Client </span>

                    <span class="d-flex flex-column align-center">
                      <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                      <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                    </span>

                  </div>
                </th>
                <th scope="col">
                  <div class="d-flex align-center gap-1">
                    <span> Originator </span>
                    <span class="d-flex flex-column align-center">
                      <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                      <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                    </span>

                  </div>
                </th>
                <th scope="col">
                  <div class="d-flex align-center gap-1">
                    <span> Transactor</span>

                    <span class="d-flex flex-column align-center">
                      <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                      <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                    </span>

                  </div>
                </th>
                <th scope="col">
                  <div class="d-flex align-center gap-1">
                    <span>Industry </span>

                    <span class="d-flex flex-column align-center">
                      <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                      <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                    </span>

                  </div>
                </th>
                <th scope="col">

                  <div class="d-flex align-center gap-1">
                    <span> Product </span>
                    <span class="d-flex flex-column align-center">
                      <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                      <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                    </span>

                  </div>
                </th>
                <th scope="col">

                  <div class="d-flex align-center gap-1">
                    <span>Status</span>

                    <span class="d-flex flex-column align-center">
                      <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                      <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                    </span>

                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-on:dblclick="navigatePages(item.dealId)" v-for="item in pipelineDeals"
                :key="item.dealId" @click="selectDeal(item); selectRow(item.dealId)">
                <td :class="{ 'highlight': (item.dealId == selectedrow) }">{{ item.count }}</td>
                <td :class="{ 'highlight': (item.dealId == selectedrow) }">{{ item.dealId }}</td>
                <td :class="{ 'highlight': (item.dealId == selectedrow) }">{{ item.companyName }}</td>
                <td :class="{ 'highlight': (item.dealId == selectedrow) }">{{ item.originatorName }}</td>
                <td :class="{ 'highlight': (item.dealId == selectedrow) }">{{ item.leadTransactorName }}</td>
                <td :class="{ 'highlight': (item.dealId == selectedrow) }">{{ item.industrySector }} </td>
                <td :class="{ 'highlight': (item.dealId == selectedrow) }">{{ item.productDescription }}</td>
                <td :class="{ 'highlight': (item.dealId == selectedrow) }">
                  <GradeButton :grade="item.dealCategory" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="side-panel">
        <div class=news>
          <h4> Details </h4>
          <div class="accordion" id="accordionPanelsStayOpenExample">
            <div class="accordion-item">

              <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseOne">
                  Transactions Team Info
                </button>
              </h2>
              <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingOne">
                <div class="accordion-body">
                  <TransactionTeamInfo :selectedDealDetails="selectedDealSidebar" :button="true" :not-edit="isUser"/>
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseTwo">
                  Transaction Updates
                </button>
              </h2>
              <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingTwo">
                <div class="accordion-body">
                  <TimeLineCardTRMS column="col-6" :selectedDealDetails="selectedDealSidebar" :button="true" />
                  <div class="col-12">
                    <div class="input-group" style="justify-content: flex-end;">
                      <button class="btn btn-success" @click="dialogTimeline = true" > Add Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseThree">
                  Deal Profile
                </button>
              </h2>
              <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingThree">
                <div class="accordion-body">
                  <DealProfile column="col-6" :selectedDealDetails="selectedDealSidebar" :button="true"  :not-edit="isUser"/>
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingFour">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseFour">
                  Fees
                </button>
              </h2>
              <div id="panelsStayOpen-collapseFour" class="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingFour">
                <div class="accordion-body">
                  <Fees column="col-6" :selectedDealDetails="selectedDealSidebar" :button="true" :not-edit="isUser" />
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingTwelve">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseTwelve" aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseTwelve">
                  Client Contact
                </button>
              </h2>
              <div id="panelsStayOpen-collapseTwelve" class="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingTwelve">
                <div class="accordion-body">
                  <span class="mr-2 d-flex align-center justify-content-end" style="color: #47B65C; cursor: pointer"
                    @click="addLineClientContacts = true">
                    Add <v-icon style="margin-top: 2px;" icon="mdi-plus-circle-outline"></v-icon>
                  </span>
                  <ClientContact column="col-6" :selectedDealDetails="selectedDealSidebar" :button="true"
                    :newLine="addLineClientContacts" @close="onOptionSelected" :not-edit="isUser" />
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingFive">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseFive " aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseFive">
                  Deal Category
                </button>
              </h2>
              <div id="panelsStayOpen-collapseFive" class="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingFive">
                <div class="accordion-body">
                  <DealCategory column="col-6" :selectedDealDetails="selectedDealSidebar" :button="true" :not-edit="isUser" />
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingSix">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseSix" aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseSix">
                  NBC Focus Areas
                </button>
              </h2>
              <div id="panelsStayOpen-collapseSix" class="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingSix">
                <div class="accordion-body">
                  <span class="mr-2 d-flex align-center justify-content-end" style="color: #47B65C; cursor: pointer"
                    @click="addLineNBCFocusArea = true">
                    Add <v-icon style="margin-top: 2px;" icon="mdi-plus-circle-outline"></v-icon>
                  </span>
                  <NBCFocusArea column="col-6" :selectedDealDetails="selectedDealSidebar" :button="true"
                    :newLine="addLineNBCFocusArea" @close="onOptionSelected" :not-edit="isUser" />
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingSeven">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseSeven" aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseSeven">
                  Transaction Parties
                </button>
              </h2>
              <div id="panelsStayOpen-collapseSeven" class="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingSeven">
                <div class="accordion-body">
                  <span class="mr-2 d-flex align-center justify-content-end" style="color: #47B65C; cursor: pointer"
                    @click="addLineTransactionParties = true">
                    Add <v-icon style="margin-top: 2px;" icon="mdi-plus-circle-outline"></v-icon>
                  </span>
                  <TransactionParties column="col-6" :selectedDealDetails="selectedDealSidebar" :button="true"
                    :newLine="addLineTransactionParties" @close="onOptionSelected" :not-edit="isUser" />
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingEight">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseEight" aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseEight">
                  Performance Linked Indicators
                </button>
              </h2>
              <div id="panelsStayOpen-collapseEight" class="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingEight">
                <div class="accordion-body">
                  <span class="mr-2 d-flex align-center justify-content-end" style="color: #47B65C; cursor: pointer"
                    @click="addLinePerformanceIndicators = true">
                    Add <v-icon style="margin-top: 2px;" icon="mdi-plus-circle-outline"></v-icon>
                  </span>
                  <PerformanceIndicators column="col-6" :selectedDealDetails="selectedDealSidebar" :button="true"
                    :newLine="addLinePerformanceIndicators" @close="onOptionSelected" :not-edit="isUser" />
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingNine">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseNine" aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseNine">
                  Other Conditions Precedent
                </button>
              </h2>
              <div id="panelsStayOpen-collapseNine" class="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingNine">
                <div class="accordion-body">
                  <span class="mr-2 d-flex align-center justify-content-end" style="color: #47B65C; cursor: pointer"
                    @click="addLineOtherconditions = true">
                    Add <v-icon style="margin-top: 2px;" icon="mdi-plus-circle-outline"></v-icon>
                  </span>
                  <OtherConditions column="col-6" :selectedDealDetails="selectedDealSidebar" :button="true"
                    :newLine="addLineOtherconditions" @close="onOptionSelected" :not-edit="isUser" />

                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingTen">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseTen" aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseTen">
                  Key Deals Factors
                </button>
              </h2>
              <div id="panelsStayOpen-collapseTen" class="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingTen">
                <div class="accordion-body">
                  <span class="mr-2 d-flex align-center justify-content-end" style="color: #47B65C; cursor: pointer"
                    @click="addLineKeyDealFactors = true">
                    Add <v-icon style="margin-top: 2px;" icon="mdi-plus-circle-outline"></v-icon>
                  </span>
                  <KeyDealsFactors column="col-6" :selectedDealDetails="selectedDealSidebar" :button="true"
                    :newLine="addLineKeyDealFactors" @close="onOptionSelected" :not-edit="isUser" />

                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingEleven">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseEleven" aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseEleven">
                  Amortization
                </button>
              </h2>
              <div id="panelsStayOpen-collapseEleven" class="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingEleven">
                <div class="accordion-body">
                  <Amortization column="col-6" :selectedDealDetails="selectedDealSidebar" :button="true" :not-edit="isUser" />
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingFifteen">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseFifteen" aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseFifteen">
                  Funding Options
                </button>
              </h2>
              <div id="panelsStayOpen-collapseFifteen" class="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingFifteen">
                <div class="accordion-body">
                  <FundOptions column="col-6" :selectedDealDetails="selectedDealSidebar" :button="true" :not-edit="isUser" />
                </div>
              </div>
            </div>


            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingThirteen">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseThirteen" aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseThirteen">
                  Other Focus Area
                </button>
              </h2>
              <div id="panelsStayOpen-collapseThirteen" class="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingThirteen">
                <div class="accordion-body">
                  <span class="mr-2 d-flex align-center justify-content-end" style="color: #47B65C; cursor: pointer"
                    @click="addLineOtherFocusArea = true">
                    Add <v-icon style="margin-top: 2px;" icon="mdi-plus-circle-outline"></v-icon>
                  </span>
                  <OtherFocusAreas column="col-6" :selectedDealDetails="selectedDealSidebar" :button="true"
                    :newLine="addLineOtherFocusArea" @close="onOptionSelected" :not-edit="isUser" />

                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingFourteen">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseFourteen" aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseFourteen">
                  Credit Committee Focus Area
                </button>
              </h2>
              <div id="panelsStayOpen-collapseFourteen" class="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingFourteen">
                <div class="accordion-body">
                  <span class="mr-2 d-flex align-center justify-content-end" style="color: #47B65C; cursor: pointer"
                    @click="addLineCreditCommitteeFocusArea = true">
                    Add <v-icon style="margin-top: 2px;" icon="mdi-plus-circle-outline"></v-icon>
                  </span>
                  <CreditCommitteeFocusAreas column="col-6" :selectedDealDetails="selectedDealSidebar" :button="true"
                    :newLine="addLineCreditCommitteeFocusArea" @close="onOptionSelected" :not-edit="isUser" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.intro h3 {
  font-size: 20px;
  font-weight: 600;
}

.intro p {
  font-size: 12px;
}

.highlight {
  position: sticky !important;
  top: 0 !important;
  background-color: rgb(219, 219, 219) !important;
  color: rgb(0, 0, 0) !important;
}

.side-panel {
  padding: 15px;
  background: #eeeeee;
  width: 36%;
}

.news {
  overflow: auto;
  /* max-width: 428px; */
  max-height: 900px;
}

.custom-table {
  width: 64%;
}

.accordion-button:focus {
  z-index: 3;
  border-color: none;
  outline: 0;
  box-shadow: none;
}

.accordion-body {
  padding: 10px;
}

.collapse.show {
  visibility: visible;
}

thead tr th {
  font-size: 12px;
  font-weight: 600;
  line-height: 14.4px;
  padding: 15px;
}

tbody tr td {
  color: var(--grey-dark, #808080);
  /* Caption */
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
  padding: 20px 15px;
  cursor: pointer;
}

thead,
tr {
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}

.noshrink {
  display: flex;
  flex-shrink: 0;
}

.v-btn-toggle {
  border: 1px solid black;
  width: 295px;
  justify-content: center;
  border-radius: 10px;
  background-color: #FFFFFF;
  padding: 3px 0px;
  box-sizing: border-box;
  height: 38px;
  background: #FFFFFF;
  border: 1px solid #D4D4D8;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
}

.submit-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 35px;
  padding: 10px;
  gap: 10px;
  border-radius: 50px;
  background: var(--gradient, linear-gradient(90deg, #227cbf 0%, #47b65c 100%));

  color: #fff;
  /* Body Text */
  font-size: 16px;
  font-weight: 400;
  line-height: 19.2px;
}

.document-editor__toolbar5 {
  z-index: 1;
  border-bottom: 1px solid var(--ck-color-toolbar-border);
}

.document-editor__toolbar6 {
  z-index: 1;
  border-bottom: 1px solid var(--ck-color-toolbar-border);
}

.ckeditor {
  width: 100% !important;
  min-height: 150px !important;
}

.document-editor__toolbar5 .ck-toolbar {
  border: 0;
  border-radius: 0;
}


.document-editor__toolbar6 .ck-toolbar {
  border: 0;
  border-radius: 0;
}

.document-editor__editable-container {
  border: 1px hsl(0, 0%, 23%) solid;
}

.document-editor__editable-container .ck-editor__editable {
  margin-top: 0px;
  border: 1px hsl(0, 0%, 82.7%) solid;
  background: white;
  box-shadow: 0 0 5px hsla(0, 0%, 0%, .1);
}

.checkEditor {
  height: 150px !important;
  border-radius: 8px;
}
</style>
        
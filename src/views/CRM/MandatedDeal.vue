<script setup>
import { ref, computed, onMounted } from 'vue';
import TabMenu from '../../components/TabMenu.vue';
import ToolBar from '../../components/ToolBar.vue';
import DetailsCard from '../../components/Cards/DetailsCardSidebar.vue';
import DealTeamCard from '../../components/Cards/DealTeamCardSidebar.vue';
import CheckList from '../../components/Cards/CheckList.vue';
import FileCard from '../../components/Cards/FileCard.vue';
import TimeLineCard from '../../components/Cards/TimeLineCard.vue';
import OtherDetailsCard from '../../components/Cards/OtherDetailsCard.vue';
import CRMService from '../../services/crmService';
import { useDashOptionStore } from "../../stores/dashOption"
import pinia from "../../stores/store";
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import DecoupledDocument from '@ckeditor/ckeditor5-build-decoupled-document';

const activityDetails = ref('')
const activityDescription = ref('')
const activityTypes = ref([])
const selectedActivityType = ref([])
const dialogTimeline = ref(false)
const loadingButton = ref(false)
const selectedActivityId = ref('')
const companyId = ref('')
const contactId = ref('')
const leadId = ref('')
const totalArrayValue = ref('')
const firstValue = ref('')
const secondValue = ref('')
const isEdit = ref(false)
const selectedActivityStatus = ref('')
const searchValue = ref('')
const filterOption = ref('')
const size = ref(20)
const pageNumber = ref(1)
const stores = useDashOptionStore(pinia);
const router = useRouter()
const editor = DecoupledDocument
const myMandatedLeadsData = ref([])
const allMandatedLeadsData = ref([])
const text = ref("allMandatedLeads")
const selectedLeadSidebar = ref([])
const selectedrow = ref('')
const crmDetails = (id) => {
    router.push(`/crm/details/mandatedLeads/${id}`);
}
const selectLead = (selectedLead) => {
    selectedLeadSidebar.value = selectedLead
}
var editorConfig = {
    toolbar: ['bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'outdent', 'indent', '|', 'insertTable', 'undo', 'redo', 'alignment', 'fontColor', 'fontFamily', 'fontSize',
        'underline'],
}
const onFilterSelected = (isCorrect) => {
    filterOption.value = isCorrect
}

const onSearchValuesEntered = (isCorrect) => {
    searchValue.value = isCorrect
}

const MandatedLeads = computed(() => {
    next()
    var mandatedDealList = null
    if (text.value == 'myMandatedLeads') {
        mandatedDealList = myMandatedLeadsData.value;
        totalArrayValue.value = mandatedDealList.length
    }
    else if (text.value == 'allMandatedLeads') {
        mandatedDealList = allMandatedLeadsData.value;
        totalArrayValue.value = mandatedDealList.length
    }
    // Process search input
    if (searchValue.value != '' && searchValue.value) {
        mandatedDealList = mandatedDealList.filter((item) => {
            return item.leadId
                .toLowerCase()
                .includes(searchValue.value.toLowerCase()) ||
                item.primaryContactFirstName.toLowerCase().includes(searchValue.value.toLowerCase()) ||
                item.primaryContactLastName.toLowerCase().includes(searchValue.value.toLowerCase()) ||
                item.companyName.toLowerCase().includes(searchValue.value.toLowerCase())
        })
    }
    // Sort by alphabetical order
    mandatedDealList = mandatedDealList.sort((a, b) => {
        if (filterOption.value == 'asc') {
            let fa = a.leadId.toLowerCase(), fb = b.leadId.toLowerCase()

            if (fa > fb) {
                return 1
            }
            if (fa < fb) {
                return -1
            }
            return 0

        }
        else if (filterOption.value == 'dsc') {
            let fa = a.leadId.toLowerCase(), fb = b.leadId.toLowerCase()

            if (fa < fb) {
                return 1
            }
            if (fa > fb) {
                return -1
            }
            return 0

        }
    })

    
    if (mandatedDealList.length > 0) {
        mandatedDealList.forEach((element, index, array) => {
      array[index].count = index + 1
    });

    let ps = mandatedDealList.slice(indexStart.value, indexEnd.value)
    firstValue.value = ps[0].count;
    secondValue.value = ps[ps.length - 1].count
  }

    return mandatedDealList.slice(indexStart.value, indexEnd.value)
})

const onOptionSelected = (isCorrect) => {
    if (isCorrect) {
        dialogTimeline.value = true
        selectedActivityId.value = isCorrect.activityId
        selectedActivityType.value = isCorrect.activityTypeId
        activityDescription.value = isCorrect.activitySubject
        activityDetails.value = isCorrect.notes
        companyId.value = isCorrect.companyId
        contactId.value = isCorrect.contactId
        leadId.value = isCorrect.regardingEntity
        selectedActivityStatus.value = isCorrect.activityStatus
        isEdit.value = true
    }
}
const saveActivityType = async () => {
    loadingButton.value = true;
    let ps = await CRMService.createActivitys(selectedActivityType.value, activityDescription.value, selectedLeadSidebar.value.companyId, selectedLeadSidebar.value.primaryContactId, selectedLeadSidebar.value.leadId, selectedLeadSidebar.value.leadId, activityDescription.value, activityDetails.value, selectedActivityStatus.value, stores.signedInUserEmail, stores.signedInUserEmail, new Date().toJSON(), new Date().toJSON(), stores.signedInUserEmail)
    if (ps == true) {
        toast.success("Activity Added to Timeline")
        setTimeout(async () => {
            dialogTimeline.value = false;
            loadingButton.value = false;
            selectedActivityType.value = ''
            activityDescription.value = ''
            activityDetails.value = ''
            selectedActivityStatus.value = ''
        }, 1500);
    }
    else {
        toast.error("An error occured")
        loadingButton.value = false;
    }
}
const editActivityType = async () => {
    loadingButton.value = true;
    let ps = await CRMService.editActivity(selectedActivityId.value, selectedActivityType.value, activityDescription.value, companyId.value, contactId.value, leadId.value, leadId.value, activityDescription.value, activityDetails.value, selectedActivityStatus.value, stores.signedInUserEmail, stores.signedInUserEmail, new Date().toJSON(), new Date().toJSON(), stores.signedInUserEmail)
    if (ps == 200) {
        toast.success("Activity Edited")
        setTimeout(async () => {
            dialogTimeline.value = false;
            loadingButton.value = false;
            selectedActivityType.value = ''
            activityDescription.value = ''
            activityDetails.value = ''
            selectedActivityStatus.value = ''
        }, 1500);
    }
    else {
        toast.error("An error occured")
        loadingButton.value = false;
    }
}
const openTimeLineDialog = async () => {
    isEdit.value = false
    dialogTimeline.value = true
}

onMounted(async () => {
    activityTypes.value = await CRMService.getActivityTypes()
});

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
const pageMovement = (isCorrect) => {
  if (isCorrect == 'Next') {
    pageNumber.value++;
  }
  else if (isCorrect == 'Previous') {
    pageNumber.value--;
  }
}
const close = async () => {
    dialogTimeline.value = false;
    loadingButton.value = false;
    selectedActivityType.value = ''
    activityDescription.value = ''
    activityDetails.value = ''
    selectedActivityStatus.value = ''
}

const next = async () => {
    let allTotalLeads = await CRMService.getLeads()
    // allTotalLeads = allTotalLeads.filter(o => o.financialYearName == stores.financialYear)

    let allPersonalLeads = await CRMService.getLeads()
    // allPersonalLeads = allPersonalLeads.filter(o => o.financialYearName == stores.financialYear)

    allMandatedLeadsData.value = allTotalLeads.filter(o => o.mandateSigned == true)
    myMandatedLeadsData.value = allPersonalLeads.filter(o => o.mandateSigned == true && o.originator == stores.signedInUserEmail || o.mandateSigned == true && o.leadTransactor == stores.signedInUserEmail || o.mandateSigned == true && o.coTransactor == stores.signedInUserEmail || o.mandateSigned == true && o.transactorLegal == stores.signedInUserEmail || o.mandateSigned == true && o.administrator == stores.signedInUserEmail)
}

const selectRow = async (id) => {
    selectedrow.value = id
}

const onReady5 = (editor) => {
    const toolbarContainer = document.querySelector('.document-editor__toolbar5');
    toolbarContainer.appendChild(editor.ui.view.toolbar.element);
}
</script>

<template>
    <div class="wrapper">
        <v-dialog v-model="dialogTimeline" max-width="500px" @click:outside="close">
            <v-card>
                <v-card-title>
                    <span class="text-h5 ml-3">Add to TimeLine </span>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-select :items="activityTypes" density="compact" variant="outlined" label="Activity Type"
                                item-title="name" item-value="id" v-model="selectedActivityType"
                                :readonly="isEdit"></v-select>
                            <v-text-field v-model="activityDescription" label="Subject" variant="outlined"
                                :readonly="isEdit"></v-text-field>
                            <div class="ckeditor">
                                <div class="document-editor__toolbar5"></div>
                                <div class="document-editor__editable-container">
                                    <ckeditor :editor="editor" :config="editorConfig" @ready="onReady5"
                                        v-model="activityDetails" class="checkEditor" :disabled="isEdit"></ckeditor>
                                </div>
                            </div>
                            <v-select :items="['Pending', 'Completed']" density="compact" variant="outlined"
                                label="Activity Status" v-model="selectedActivityStatus" class="mt-4"></v-select>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="close">
                        Cancel
                    </v-btn>
                    <v-btn color="blue-darken-1" variant="text" :loading="loadingButton" @click="editActivityType()"
                        v-if="isEdit == true">Save
                    </v-btn>
                    <v-btn color="blue-darken-1" :loading="loadingButton" variant="text" @click="saveActivityType"
                        v-else>Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <TabMenu />
        <div class="d-flex justify-content-between align-center mt-3 mb-3">
            <div class="intro mt-4 ">
                <h3> CRM Mandated Clients </h3>
            </div>

            <div class="toggleButton">
                <v-btn-toggle color='#298729' v-model="text" group mandatory variant="elevated">
                    <v-btn size="x-small" density="compact" value="myMandatedLeads" v-on:click="text = 'myMandatedLeads'">
                        My Mandated Clients
                    </v-btn>
                    <v-btn size="x-small" density="compact" value="allMandatedLeads" v-on:click="text = 'allMandatedLeads'">
                        All Mandated Clients
                    </v-btn>
                </v-btn-toggle>
            </div>
        </div>
        <ToolBar @filterOptions="onFilterSelected" @searchValues="onSearchValuesEntered" :pageCounts="pageCount"
            :firstVal="firstValue" :lastVal="secondValue" :totalValue="totalArrayValue" :pageNum="pageNumber"
            @pageDetails="pageMovement" />
        <div class="d-flex justify-content-between mt-4">
            <div class="custom-table table-responsive-sm">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">
                                    <div class="d-flex align-center gap-1">
                                        <span class="noshrink">S/N</span>
                                        <span class="d-flex flex-column align-center">
                                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                        </span>
                                    </div>
                                </th>
                                <th scope="col">
                                    <div class="d-flex align-center gap-1">
                                        <span class="noshrink">Deal Id</span>

                                        <span class="d-flex flex-column align-center">
                                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                        </span>
                                    </div>
                                </th>
                                <th scope="col">
                                    <div class="d-flex align-center gap-1">
                                        <span class="noshrink"> Company Name</span>
                                        <span class="d-flex flex-column align-center">
                                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                        </span>

                                    </div>
                                </th>
                                <th scope="col">
                                    <div class="d-flex align-center gap-1">
                                        <span class="noshrink"> Name</span>

                                        <span class="d-flex flex-column align-center">
                                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                        </span>

                                    </div>
                                </th>
                                <th scope="col">
                                    <div class="d-flex align-center gap-1">
                                        <span class="noshrink"> Phone Number</span>
                                        <span class="d-flex flex-column align-center">
                                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                        </span>
                                    </div>
                                </th>
                                <th scope="col">
                                    <div class="d-flex align-center gap-1">
                                        <span class="noshrink"> Email Address </span>

                                        <span class="d-flex flex-column align-center">
                                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                        </span>

                                    </div>
                                </th>
                                <th scope="col">
                                    <div class="d-flex align-center gap-1">
                                        <span class="noshrink"> Sector</span>

                                        <span class="d-flex flex-column align-center">
                                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                        </span>

                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="i in MandatedLeads" style="cursor: pointer;"
                                @click="selectLead(i); selectRow(i.leadId)" v-on:dblclick="crmDetails(i.leadId)"
                                :key="i.leadId">
                                <td scope="row" :class="{ 'highlight': (i.leadId == selectedrow) }">{{ i.count }}</td>
                                <td :class="{ 'highlight': (i.leadId == selectedrow) }">{{ i.leadId }}</td>
                                <td :class="{ 'highlight': (i.leadId == selectedrow) }">{{ i.companyName }}</td>
                                <td :class="{ 'highlight': (i.leadId == selectedrow) }">{{ i.primaryContactFirstName }} {{
                                    i.primaryContactLastName }}</td>
                                <td :class="{ 'highlight': (i.leadId == selectedrow) }">{{ i.primaryContactPhoneNo }}</td>
                                <td :class="{ 'highlight': (i.leadId == selectedrow) }">{{ i.primaryContactEmailAddress }}
                                </td>
                                <td :class="{ 'highlight': (i.leadId == selectedrow) }">{{ i.industrySector }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="side-panel">
                <h4> Details </h4>
                <div class="accordion" id="accordionPanelsStayOpenExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="false"
                                aria-controls="panelsStayOpen-collapseOne">
                                Contact Details
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse"
                            aria-labelledby="panelsStayOpen-headingOne">
                            <div class="accordion-body">
                                <DetailsCard :selectedLeadDetails="selectedLeadSidebar" />
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false"
                                aria-controls="panelsStayOpen-collapseTwo">
                                Deal Team
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse"
                            aria-labelledby="panelsStayOpen-headingTwo">
                            <div class="accordion-body">
                                <DealTeamCard :selectedLeadDetails="selectedLeadSidebar" />
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false"
                                aria-controls="panelsStayOpen-collapseThree">
                                Checklist
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse"
                            aria-labelledby="panelsStayOpen-headingThree">
                            <div class="accordion-body">
                                <CheckList :selectedLeadDetails="selectedLeadSidebar" :buttons="true" />
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingFour">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-collapseFour " aria-expanded="false"
                                aria-controls="panelsStayOpen-collapseFour">
                                Other Details
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseFour" class="accordion-collapse collapse"
                            aria-labelledby="panelsStayOpen-headingFour">
                            <div class="accordion-body">
                                <OtherDetailsCard :selectedLeadDetails="selectedLeadSidebar" />
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingFive">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-collapseFive" aria-expanded="false"
                                aria-controls="panelsStayOpen-collapseFive">
                                Files
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseFive" class="accordion-collapse collapse"
                            aria-labelledby="panelsStayOpen-headingFive">
                            <div class="accordion-body">
                                <FileCard :selectedLeadDetails="selectedLeadSidebar" />

                            </div>
                        </div>
                    </div>


                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingSix">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-collapseSix" aria-expanded="false"
                                aria-controls="panelsStayOpen-collapseSix">
                                Activity Timeline
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseSix" class="accordion-collapse collapse"
                            aria-labelledby="panelsStayOpen-headingSix">
                            <div class="accordion-body">
                                <TimeLineCard :selectedLeadDetails="selectedLeadSidebar" @edit="onOptionSelected" />
                                <div class="col-12">
                                    <div class="input-group" style="justify-self: flex-end;">
                                        <button class="btn btn-success" @click="openTimeLineDialog"> Add To Timeline
                                        </button>
                                    </div>
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
    padding: 20px;
}

thead,
tr {
    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}

.intro p {
    font-size: 12px;
}

.custom-table {
    width: 70%;
}

.side-panel {
    padding: 20px;
    background: #eeeeee;
    width: 35%;
    max-width: 428px;
}

.add-button {
    padding: 5px 5px 8px 5px;
    border-radius: 50%;
    text-align: center;
    margin-bottom: 8px;
    background: var(--gradient, linear-gradient(90deg, #227CBF 0%, #47B65C 100%));
    cursor: pointer;
    color: #FFF;
}

.collapse.show {
    visibility: visible;
}

.accordion-body {
    padding: 10px;
}

.highlight {
    background-color: rgb(219, 219, 219) !important;
    color: rgb(0, 0, 0) !important;
}

.accordion-button:focus {
    z-index: 3;
    border-color: none;
    outline: 0;
    box-shadow: none;
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
    background: var(--gradient, linear-gradient(90deg, #227CBF 0%, #47B65C 100%));
    color: #FFF;
    /* Body Text */
    font-size: 16px;
    font-weight: 400;
    line-height: 19.2px;
}

.v-btn-toggle {
    border: 1px solid black;
    width: 300px;
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


.document-editor__toolbar5 {
    z-index: 1;
    border-bottom: 1px solid var(--ck-color-toolbar-border);
}

.ckeditor {
    width: 100% !important;
    min-height: 200px !important;
}

.document-editor__toolbar5 .ck-toolbar {
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
    height: 200px !important;
    border-radius: 8px;
}
</style>
        
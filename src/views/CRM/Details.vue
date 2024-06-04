<script setup>
import { ref, onMounted, computed } from "vue";
import Stepper from 'bs-stepper'
import settingsServices from '../../services/settingsServices'
import CRMService from '../../services/crmService'
import { useRoute } from 'vue-router'
import { useDashOptionStore } from "../../stores/dashOption"
import pinia from "../../stores/store";
import SubHeader1 from '../../components/SubHeaderCRM.vue'
import Details from '../../components/Cards/DetailsCard.vue'
import CheckList from '../../components/Cards/CheckList.vue'
import DealTeamCard from '../../components/Cards/DealTeamCard.vue'
import FileCard from '../../components/Cards/FileCard.vue'
import TimeLineCard from '../../components/Cards/TimeLineCard.vue'
import AltOtherDetailsCard from '../../components/Cards/AltOtherDetailsCard.vue'
import DecoupledDocument from '@ckeditor/ckeditor5-build-decoupled-document';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const stores = useDashOptionStore(pinia);
const route = useRoute()
const leadType = ref('')

if (route.params.id == 'pipelineLeads') {
    leadType.value = 'Pipeline Projects'
}
else if (route.params.id == 'mandatedLeads') {
    leadType.value = 'Mandated Clients'
}

const num1 = ref(1)
const dialogTimeline = ref(false)
const step1 = ref(null)
var stepper1 = ref('')
const leadSources = ref([])
const regions = ref([])
const industries = ref([])
const sectors = ref([])
const products = ref([])
const company = ref([])
const leadOpened = ref([])
const companyName = ref('')
const companyName2 = ref('')
const leadId = ref('')
const activityDescription = ref('')
const companyId = ref('')
const contactId = ref('')
const selectedActivityId = ref('')
const idx = ref('')
const selectedActivityStatus = ref('')
const activityDetails = ref('')
const saveDetails = ref(false)
const saveDealTeam = ref(false)
const saveOtherDetails = ref(false)
const saveFile = ref(false)
const saveTimeLine = ref(false)
const isEdit = ref(false)
const loadingButton = ref(false)
const saveCheckList = ref(false)
const recheckValue = ref(0)
const activityTypes = ref([])
const selectedActivityType = ref([])
var editorConfig = {
  toolbar: ['bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'outdent', 'indent', '|', 'insertTable', 'undo', 'redo', 'alignment', 'fontColor', 'fontFamily', 'fontSize',
    'underline'],
}
const editor = DecoupledDocument

idx.value = route.params.id2
onMounted(async () => {
    var stepper1Node = document.querySelector('#stepper1')
    stepper1.value = new Stepper(step1.value, {
        linear: false,
        animation: true
    })
    stepper1Node.addEventListener('show.bs-stepper', function (event) {
    })
    stepper1Node.addEventListener('shown.bs-stepper', function (event) {
    })

});

const onSaveValueChanged = (isCorrect) => {
    saveDetails.value = isCorrect
    saveDealTeam.value = isCorrect
    saveOtherDetails.value = isCorrect
    saveFile.value = isCorrect
    saveTimeLine.value = isCorrect
    saveCheckList.value = isCorrect
}

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

const next2 = async () => {
    let allLeads = await CRMService.getLeads()
    leadOpened.value = allLeads.find(o => o.leadId === idx.value)

    for (recheckValue.value; recheckValue.value < 2; recheckValue.value++) {
        sectors.value = await settingsServices.getIndustries()
        products.value = await settingsServices.getProducts()
        company.value = await CRMService.getCompanies()
        leadSources.value = await settingsServices.getLeadSources()
        industries.value = await settingsServices.getIndustries()
        regions.value = await settingsServices.getLeadSources()
        activityTypes.value = await CRMService.getActivityTypes()
    }
}

const allLeadsSelected = computed(() => {
    next2()
    if (leadOpened.value != undefined) {
        companyName.value = leadOpened.value.leadId
        companyName2.value = leadOpened.value.companyName;
        leadId.value = leadOpened.value.leadId
        companyId.value = leadOpened.value.companyId
        contactId.value = leadOpened.value.primaryContactId
    }
    if (leadOpened.value == undefined) {
        companyName.value = 'New'
    }
    return leadOpened.value
})
const next = (id, value) => {
    if (value != 'trigger') {
        stepper1.value.next()
    }
    if (id == 2) {
        saveDetails.value = true
    }
    else if (id == 3) {
        saveDealTeam.value = true
    }
    else if (id == 4) {
        saveOtherDetails.value = true
    }
    else if (id == 5) {
        saveFile.value = true
    }
    else if (id == 6) {
        saveTimeLine.value = true
    }
    else if (id == 7 && value != 'trigger') {
        saveCheckList.value = true
    }
}
const saveActivityType = async () => {
    loadingButton.value = true;
    let ps = await CRMService.createActivitys(selectedActivityType.value, activityDescription.value, companyId.value, contactId.value, 'LEADS', leadId.value, activityDescription.value, activityDetails.value, selectedActivityStatus.value, stores.signedInUserEmail, stores.signedInUserEmail, new Date().toJSON(), new Date().toJSON(), stores.signedInUserEmail)
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
const close = async () => {
            dialogTimeline.value = false;
            loadingButton.value = false;
            selectedActivityType.value = ''
            activityDescription.value = ''
            activityDetails.value = ''
            selectedActivityStatus.value = ''
    }
const editActivityType = async () => {
    loadingButton.value = true;
    let ps = await CRMService.editActivity(selectedActivityId.value, selectedActivityType.value, activityDescription.value, companyId.value, contactId.value, 'LEADS', leadId.value, activityDescription.value, activityDetails.value, selectedActivityStatus.value, stores.signedInUserEmail, stores.signedInUserEmail, new Date().toJSON(), new Date().toJSON(), stores.signedInUserEmail)
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
const previous = () => {
    stepper1.value.previous()
}
const styleBackground = () => {
    if (num1.value > 1) {
        return 'background-color: #007BFF'
    }
}
const styleBackground2 = () => {
    if (num1.value > 2) {
        return 'background-color: #007BFF'
    }
}
const styleBackground3 = () => {
    if (num1.value > 3) {
        return 'background-color: #007BFF'
    }
}
const styleBackground4 = () => {
    if (num1.value > 4) {
        return 'background-color: #007BFF'
    }
}
const styleBackground5 = () => {
    if (num1.value > 5) {
        return 'background-color: #007BFF'
    }
}
const styleBackground6 = () => {
    if (num1.value > 6) {
        return 'background-color: #007BFF'
    }
}

const onReady5 = (editor) => {
  const toolbarContainer = document.querySelector('.document-editor__toolbar5');
  toolbarContainer.appendChild(editor.ui.view.toolbar.element);
}
</script>

<template>
    <div>
        <div class="wrapper grid-wrapper">
            <div class="Breadcrumb">
                <SubHeader1 :title="leadType" :companyName="companyName" :companyName2="companyName2" />
                <div class="intro-text">
                    <div class="d-flex justify-content-between align-center">
                        <div class="d-flex align-center gap-1">
                            <h4> </h4>
                        </div>
                        <small>{{ idx }}</small>
                    </div>
                </div>
            </div>
        </div>
        <div class="wrapper" style="margin-top: -35px;">
            <v-dialog v-model="dialogTimeline" max-width="500px" @click:outside="close">
                <v-card>
                    <v-card-title>
                        <span class="text-h5 ml-3">Add to TimeLine </span>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <v-select :items="activityTypes" density="compact" variant="outlined" label="Activity Type"
                                :readonly="isEdit"  item-title="name" item-value="id" v-model="selectedActivityType"></v-select>
                                <v-text-field v-model="activityDescription" label="Subject"
                                :readonly="isEdit"   variant="outlined"></v-text-field>
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
                        <v-btn color="blue-darken-1" variant="text" :loading="loadingButton" @click="editActivityType"
                            v-if="isEdit == true">Save
                        </v-btn>
                        <v-btn color="blue-darken-1" :loading="loadingButton" variant="text" @click="saveActivityType"
                            v-else>Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <div id="stepper1" class="bs-stepper" ref="step1">
                <div class="bs-stepper-header mb-2" style="overflow: auto;">
                    <div class="step" data-target="#test-l-1" @click="num1 = 1">
                        <button type="button" class="btn step-trigger">
                            <span class="bs-stepper-circle" :style="styleBackground()">
                                <v-icon style="padding-bottom: 10px !important;">mdi-card-account-mail</v-icon>
                            </span>
                            <span class="bs-stepper-label">Contact Details</span>
                        </button>
                    </div>
                    <div class="line" v-if="num1 < 2"></div>
                    <div class="line" style="background-color: #024a97; border: 1px solid #007BFF; border-radius: 10px;"
                        v-else>
                    </div>
                    <div class="step" data-target="#test-l-2" @click="num1 = 2; next(2, 'trigger')">
                        <button type="button" class="btn step-trigger">
                            <span class="bs-stepper-circle" :style="styleBackground2()">
                                <v-icon style="padding-bottom: 10px !important;">mdi-microsoft-teams</v-icon>
                            </span>
                            <span class="bs-stepper-label">Deal Team</span>
                        </button>
                    </div>
                    <div class="line" v-if="num1 < 3"></div>
                    <div class="line" style="background-color: #007BFF; border: 1px solid #007BFF; border-radius: 10px;"
                        v-else>
                    </div>
                    <div class="step" data-target="#test-l-3" @click="num1 = 3; next(3, 'trigger')"
                        v-if="companyName != 'New'">
                        <button type="button" class="btn step-trigger">
                            <span class="bs-stepper-circle" :style="styleBackground3()">
                                <v-icon style="padding-bottom: 10px !important;">mdi-book-open-outline</v-icon>
                            </span>
                            <span class="bs-stepper-label">Other Details</span>
                        </button>
                    </div>

                    <div class="line" v-if="num1 < 4"></div>
                    <div class="line" style="background-color: #007BFF; border: 1px solid #007BFF; border-radius: 10px;"
                        v-else>
                    </div>
                    <div class="step" data-target="#test-l-4" @click="num1 = 4; next(4, 'trigger')"
                        v-if="companyName != 'New'">
                        <button type="button" class="btn step-trigger">
                            <span class="bs-stepper-circle" :style="styleBackground4()">
                                <v-icon style="padding-bottom: 10px !important;">mdi-folder-upload</v-icon>
                            </span>
                            <span class="bs-stepper-label">Files</span>
                        </button>
                    </div>

                    <div class="line" v-if="num1 < 5"></div>
                    <div class="line" style="background-color: #007BFF; border: 1px solid #007BFF; border-radius: 10px;"
                        v-else>
                    </div>
                    <div class="step" data-target="#test-l-5" @click="num1 = 5; next(5, 'trigger')"
                        v-if="companyName != 'New'">
                        <button type="button" class="btn step-trigger">
                            <span class="bs-stepper-circle" :style="styleBackground5()">
                                <v-icon style="padding-bottom: 10px !important;">mdi-email-multiple-outline</v-icon>
                            </span>
                            <span class="bs-stepper-label">Activities</span>
                        </button>
                    </div>
                    <div class="line" v-if="num1 < 6"></div>
                    <div class="line" style="background-color: #007BFF; border: 1px solid #007BFF; border-radius: 10px;"
                        v-else>
                    </div>
                    <div class="step" data-target="#test-l-6" @click="num1 = 6; next(6, 'trigger')"
                        v-if="companyName != 'New'">
                        <button type="button" class="btn step-trigger">
                            <span class="bs-stepper-circle" :style="styleBackground6()">
                                <v-icon style="padding-bottom: 10px !important;">mdi-check-all</v-icon>
                            </span>
                            <span class="bs-stepper-label">CheckList</span>
                        </button>
                    </div>
                </div>
                <div class="bs-stepper-content">
                    <div id="test-l-1" class="content">
                        <v-card title=" Contact Details">
                            <div class="details box-padded">
                                <Details columns='3' :buttons="false" :leadSource="leadSources" :sectorList="sectors" :product-list="products"
                                    :companyList="company" :leadDetails="allLeadsSelected" :saveValue="saveDetails"
                                    :isNew="companyName" @saveValue="onSaveValueChanged" />
                            </div>
                        </v-card>
                        <div class="d-flex justify-content-end mt-3 gap-3">
                            <button class="submit-button-back" @click="next(2); num1 = 2">Next</button>
                        </div>
                    </div>
                    <div id="test-l-2" class="content">
                        <v-card title="Deal Team" flat>
                            <div class="dealteam box-padded">
                                <DealTeamCard columns='3' :buttons="false" :leadDetails="allLeadsSelected"
                                    :saveValue="saveDealTeam" :isNew="companyName" @saveValue="onSaveValueChanged" />
                            </div>
                        </v-card>
                        <div class="d-flex justify-content-end mt-3 gap-3">
                            <button class="submit-button-back" @click="previous(); num1 = 1">Previous</button>
                            <button class="submit-button-back" @click="next(3); num1 = 3" v-if="companyName == 'New'">Create
                                Project</button>
                            <button class="submit-button-back" @click="next(3); num1 = 3" v-else>Next</button>
                        </div>
                    </div>
                    <div id="test-l-3" class="content">
                        <v-card title="OtherDetails" flat>
                            <div class="otherdetails box-padded">
                                <AltOtherDetailsCard :buttons="false" :leadDetails="allLeadsSelected"
                                    :saveValue="saveOtherDetails" :isNew="companyName" @saveValue="onSaveValueChanged" />
                            </div>
                        </v-card>
                        <div class="d-flex justify-content-end mt-3 gap-3">
                            <button class="submit-button-back" @click="previous(); num1 = 2">Previous</button>
                            <button class="submit-button-back" @click="next(4); num1 = 4">Next</button>
                        </div>
                    </div>
                    <div id="test-l-4" class="content">
                        <v-card title="Files" flat>
                            <div class="otherdetails box-padded">
                                <FileCard :buttons="false" :leadDetails="allLeadsSelected" :saveValue="saveFile"
                                    :isNew="companyName" @saveValue="onSaveValueChanged" />
                            </div>
                        </v-card>
                        <div class="d-flex justify-content-end mt-3 gap-3">
                            <button class="submit-button-back" @click="previous(); num1 = 3">Previous</button>
                            <button class="submit-button-back" @click="next(5); num1 = 5">Next</button>
                        </div>
                    </div>
                    <div id="test-l-5" class="content">
                        <v-card title="Activities" flat>
                            <div class="otherdetails box-padded">
                                <TimeLineCard :selectedLeadDetails="allLeadsSelected" :saveValue="saveTimeLine"
                                    :isNew="companyName" @edit="onOptionSelected" />
                                <div class="col-12">
                                    <div class="input-group" style="justify-self: flex-end;">
                                        <button class="btn btn-success" @click="openTimeLineDialog"> Add To Timeline
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </v-card>
                        <div class="d-flex justify-content-end mt-3 gap-3">
                            <button class="submit-button-back" @click="previous(); num1 = 4">Previous</button>
                            <button class="submit-button-back" @click="next(6); num1 = 6">Next</button>
                        </div>
                    </div>
                    <div id="test-l-6" class="content">
                        <v-card title="CheckList" flat>
                            <div class="otherdetails box-padded">
                                <CheckList class="" :buttons="false" :selectedLeadDetails="allLeadsSelected"
                                    :saveValue="saveCheckList" :isNew="companyName" @saveValue="onSaveValueChanged" />
                            </div>
                        </v-card>
                        <div class="d-flex justify-content-end mt-3 gap-3">
                            <button class="submit-button-back" @click="previous(); num1 = 5">Previous</button>
                            <button class="submit-button-back" @click="next(7)">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Details',
    data() {
        return {
            id: '',
        };
    },
    async created() {
        this.id = this.$route.params.id
    },
};
</script>
<style scoped>
.box-padded {
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 5px;
}

.wrapper {
    padding: 5px 50px;
    background: #fafafb;
}

div h4 {
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    margin: 0;
}

.grid-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(5, auto);
    grid-template-areas:
        "sub sub "
        "det  chk"
        "dt  chk"
        "oth oth"
        "file time"
    ;
    gap: 20px;
}

.Breadcrumb {
    grid-area: sub;
}

.details {
    grid-area: det;
}

.checklist {
    grid-area: chk;
}

.dealteam {
    grid-area: dt;
}

.filecard {
    grid-area: file;
}

.timecard {
    grid-area: time;
}

.otherdetails {
    grid-area: oth;
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
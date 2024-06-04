<script setup>
import { ref, onMounted, watch, computed } from "vue";
import TabMenu from '../../components/TabMenu.vue';
import DashboardProjects from './DashboardProjects.vue';
import GradeButton from '../../components/GradeButton.vue';
import { useRouter } from 'vue-router'
import { useDashOptionStore } from '../../stores/dashOption';
import TableCreateDeals from '../../components/Tables/TableCreateDeals.vue'
import TableOne from '../../components/Tables/TableOne.vue'
import pinia from "../../stores/store";
import CRMService from '../../services/crmService';
import settingsService from '../../services/settingsServices';
import trmsService from "../../services/trmsService";
import administrationsService from "../../services/administrationsService";
import crmService from "../../services/crmService";
import DashboardSummary from "./DashboardSummary.vue";
import DashboardGrantUtilization from "./DashboardGrantUtilization.vue";

const router = useRouter()
const stores = useDashOptionStore(pinia);
const text = ref('projects')
const text2 = ref('myTransaction')
const selectedUser = ref('')
const dialog = ref(false)
const dialog2 = ref(false)
const dialogPipeline = ref(false)
const isPipeline = ref(false)
const showPreview = ref(false)
const dialogCES = ref(false)
const allMandatedLeadsData = ref([])
const allDealsData = ref([])
const userListTransactors = ref([])
const prospectList = ref([])
const targetList = ref([])
const priorityList = ref([])
const teamTargetSize_Board = ref('')
const files = ref('')
const allPipelineLeadsData  = ref('')
const myPipelineLeadsData  = ref('')
const userName = ref('')
const fileRead = ref('')
const individualTarget_Board = ref('')
const TargetAchieved_Board = ref('')
const PercentageAchieved_Board = ref('')
const teamTargetSize_Mgt = ref('')
const individualTarget_Mgt = ref('')
const TargetAchieved_Mgt = ref('')
const PercentageAchieved_Mgt = ref('')
const MPR_Month = ref('')
const MPR_Year = ref('')

onMounted(async () => {
    let allTotalLeads = await CRMService.getLeads()
    let allUsers = await administrationsService.getUserRoles()
    userListTransactors.value = allUsers.filter(o => o.creditCommitteeApprovalTarget > 0 || o.mandateOriginatedTarget > 0)
    allDealsData.value = await trmsService.getDeals()
    allMandatedLeadsData.value = allTotalLeads.filter(o => o.mandateSigned == true)
    selectedUser.value = stores.signedInUserEmail

});

watch(() => selectedUser.value, async (first, second) => {
    targetList.value = await settingsService.getMPRTargets()
    let users = await administrationsService.getUserRoles()
    var allFiles = await crmService.getCRMFiles()
    console.log(targetList.value)
    targetList.value = targetList.value.filter(o => o.recordOwner == selectedUser.value)
    console.log(selectedUser.value)
    console.log(targetList.value)
    let thisUser = users.filter(o => o.userId == selectedUser.value)
    userName.value = thisUser[0].userFullName
    files.value = allFiles.filter(o => o.fileDescription === selectedUser.value)
    files.value = files.value.slice(-1)
    if (files.value.length != 0) {
        console.log("ran")
        checkUrl(files.value[0].fileURL)
    }
    else {
        checkUrl("")
    }

    if (targetList.value.length > 0) {
        teamTargetSize_Board.value = targetList.value[0].teamTargetSize_Board
        individualTarget_Board.value = targetList.value[0].individualTarget_Board
        TargetAchieved_Board.value = targetList.value[0].targetAchieved_Board
        PercentageAchieved_Board.value = targetList.value[0].percentageAchieved_Board
        teamTargetSize_Mgt.value = targetList.value[0].teamTargetSize_Mgt
        individualTarget_Mgt.value = targetList.value[0].individualTarget_Mgt
        TargetAchieved_Mgt.value = targetList.value[0].targetAchieved_Mgt
        PercentageAchieved_Mgt.value = targetList.value[0].percentageAchieved_Mgt
    }

    else if (targetList.value.length <= 0) {
        teamTargetSize_Board.value = 0
        individualTarget_Board.value = 0
        TargetAchieved_Board.value = 0
        PercentageAchieved_Board.value = 0
        teamTargetSize_Mgt.value = 0
        individualTarget_Mgt.value = 0
        TargetAchieved_Mgt.value = 0
        PercentageAchieved_Mgt.value = 0
    }

    next()
    next2()
    const date = new Date();
    MPR_Month.value = date.toLocaleString('default', { month: 'long' });
    MPR_Year.value = date.getFullYear();
});

const checkUrl = async (Url) => {
    let response = await fetch(`https://ctpmsapi.infracredit.ng/infraUpload/DownloadCRMFiles?filename=${Url}`);
    let data = await response.blob();
    let metadata = {
        type: 'image/jpeg'
    }
    let file = new File([data], "application.jpeg", metadata);
    var reader = new FileReader();
    reader.onload = function () {
        fileRead.value = reader.result;
    }.bind(this)
    reader.readAsDataURL(file);
}

const next = async () => {
    prospectList.value = await settingsService.getMPRProspects()
    prospectList.value = prospectList.value.filter(o => o.recordOwner == selectedUser.value)
}

const next2 = async () => {
    priorityList.value = await settingsService.getMPRPriorityDeals()
    priorityList.value = priorityList.value.filter(o => o.recordOwner == selectedUser.value)
}

const pipelineDeals_ = computed(() => {
  next3()
  var pipelineDealList = null
  pipelineDealList = allPipelineLeadsData.value;

  return pipelineDealList
})

const next3 = async () => {
  let allTotalLeads = await crmService.getLeads()

  let allPersonalLeads = await crmService.getLeads()

  allPipelineLeadsData.value = allTotalLeads
  myPipelineLeadsData.value = allPersonalLeads.filter(o => o.originator == stores.signedInUserEmail || o.leadTransactor == stores.signedInUserEmail || o.coTransactor == stores.signedInUserEmail || o.transactorLegal == stores.signedInUserEmail || o.administrator == stores.signedInUserEmail)
}

const rowClicked = async (event) => {
  router.push(`/ces/projectForm/new/${event}`)
}
</script>

<template>
    <div class="wrapper">
        <div class="d-flex justify-content-between align-items-center mt-3">
            <h3 class="intro mt-4">Hi, {{ stores.signedInUserName }}</h3>

            <div class="dropdown">
                <div data-bs-toggle="dropdown" aria-expanded="false"
                    style="flex-direction: row; display: flex; align-items: center;">
                    <v-btn class="text-none" color="#2E7D32" prepend-icon="mdi-plus">
                        Create
                    </v-btn>
                </div>
                <ul class="dropdown-menu">
                    <li style="cursor: pointer;"><a class="dropdown-item"
                            @click="$router.push('/crm/details/pipelineLeads/new')">New Lead (CRM)</a></li>
                    <li style="cursor: pointer;"><a class="dropdown-item" @click="dialog = true">New Deal (TRMS)</a>
                    </li>
                    <li style="cursor: pointer;"><a class="dropdown-item">New Portfolio</a></li>
                    <li style="cursor: pointer;"><a class="dropdown-item" @click="dialogCES = true">New Clean Energy</a>
                    </li>
                </ul>
            </div>
        </div>

        <v-dialog v-model="dialog" width="700px">
            <v-card>
                <v-card-text style="text-align: center;">
                    <h4> Is this an existing Transaction or would you like to create a new one?</h4>
                    <div class="d-flex justify-content-center align-items gap-4 my-4">
                        <!-- here -->
                        <button type="button" class="btn btn-success"
                            @click="dialog = false; dialogPipeline = true; isPipeline = true">
                            Yes, I have an existing transaction
                        </button>
                        <button type="button" class="btn btn-success" @click="dialog2 = true; dialog = false">
                            No, this is a new transaction
                        </button>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog2" width="700px">
            <v-card>
                <v-card-text style="text-align: center;">
                    <h4> Create New Deal</h4>
                    <div class="d-flex justify-content-center align-items gap-4 my-4">
                        <!-- here -->
                        <button type="button" class="btn btn-success"
                            @click="dialog2 = false; dialogPipeline = true; isPipeline = false">
                            With Entries from CRM
                        </button>
                        <button type="button" class="btn btn-success"
                            @click="dialog2 = false; stores.selectedLeadID_newPipelineDeal = ''; $router.push('/TRMS/pipelinedeals/detail/new')">
                            Manually
                        </button>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogPipeline" persistent width="80%">
            <v-card>
                <v-card-text class="pt-4 pb-5">
                    <div class="d-flex justify-space-between align-center">
                        <div class="d-flex justify-space-between">
                            <h5 v-if="isPipeline" style="width: 100%; margin-top: 10px;"> Select from Pipeline Projects
                            </h5>
                            <h5 v-else style="width: 100%; margin-top: 10px;"> Select from Mandated Clients </h5>
                        </div>
                        <v-icon @click="dialogPipeline = false" icon="mdi-close" size="large"></v-icon>
                    </div>
                    <TableCreateDeals v-if="isPipeline" />
                    <TableOne v-else leadType="Mandated Deal" :LeadData="allMandatedLeadsData" />
                    <div class="d-flex justify-content-end mr-2 mt-3">
                        <button @click="dialogPipeline = false" class="submit-button">Cancel</button>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogCES" persistent width="80%">
            <v-card>
                <v-card-text class="pt-4 pb-5">
                    <div class="d-flex justify-space-between align-center">
                        <div class="d-flex justify-space-between">
                            <h5 style="width: 100%; margin-top: 10px;"> Select from CRM Transactions </h5>
                        </div>
                        <v-icon @click="dialogPipeline = false" icon="mdi-close" size="large"></v-icon>
                    </div>
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
                                            <span> Client Name </span>
                                            <span class="d-flex flex-column align-center">
                                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                            </span>
                                        </div>
                                    </th>
                                    <th scope="col" style="background-color: #227CBF;color: white;">
                                        <div class="d-flex align-center gap-1">
                                            <span> Transaction Name </span>
                                            <span class="d-flex flex-column align-center">
                                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                            </span>
                                        </div>
                                    </th>
                                    <th scope="col" style="background-color: #227CBF;color: white;">
                                        <div class="d-flex align-center gap-1">
                                            <span>Industry </span>
                                            <span class="d-flex flex-column align-center">
                                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                            </span>
                                        </div>
                                    </th>
                                    <th scope="col" style="background-color: #227CBF;color: white;">
                                        <div class="d-flex align-center gap-1">
                                            <span>Project Type </span>
                                            <span class="d-flex flex-column align-center">
                                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                            </span>
                                        </div>
                                    </th>
                                    <th scope="col" style="background-color: #227CBF;color: white;">
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
                                <tr @click="rowClicked(i.leadId)" v-for="(i, index) in pipelineDeals_" style="cursor: pointer;">
                                    <td scope="row">{{ index + 1 }}</td>
                                    <td>{{ i.companyName }}</td>
                                    <td></td>
                                    <td>{{ i.industrySector }}</td>
                                    <td v-if="i.mandateSigned == true">Mandated</td>
                                    <td v-else="i.mandateSigned==false">Pre-Mandated</td>
                                    <td>
                                        <GradeButton :grade="i.industrySector" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="d-flex justify-content-end mr-2 mt-3">
                        <button @click="dialogPipeline = false" class="submit-button">Cancel</button>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="showPreview" max-width="1500px">
            <v-card>
                <v-card-title style="padding-top: 20px;">
                    <div class="d-flex justify-content-between align-items-center mt-3 intro">
                        <span class="text-h5 ml-3"
                            style="color:black; font-weight: bold; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">Origination
                            and Structuring - MPR </span>
                        <img src="../../assets/images/InfraCredit.svg" style="width: 10%; height: 10%;">
                    </div>
                    <img src="../../assets/images/Picture1.png" style="height: 50px; width: 99%; margin-left: 8px;">

                    <div style="flex-direction: row; display: flex; justify-content: space-between;">
                        <p style="margin-left: 12px; margin-top: 35px; margin-bottom: -10px;">{{ userName }}</p>
                        <img :src="fileRead" style="margin-top: 10px; width: 100px; height: 100px; border-radius: 50%;">
                    </div>
                </v-card-title>
                <v-card-text style="margin-top: -20px">
                    <div class="table-responsive">
                        <table class="table table-bordered border-black" style="background-color: white;">
                            <thead>
                                <tr>
                                    <th scope="col" style="color:black; font-size: 15px; line-height: 20px;">
                                        <div class="d-flex align-center gap-1">
                                            <span>S/N</span>
                                        </div>
                                    </th>
                                    <th scope="col" style="color:black; font-size: 15px; line-height: 20px;">
                                        <div class="d-flex align-center gap-1">
                                            <span>Details</span>
                                        </div>
                                    </th>
                                    <th scope="col" style="color:black; font-size: 15px; line-height: 20px;">
                                        <div class="d-flex align-center gap-1">
                                            <span>Team Target Size</span>
                                        </div>
                                    </th>
                                    <th scope="col" style="color:black; font-size: 15px; line-height: 20px;">
                                        <div class="d-flex align-center gap-1">
                                            <span>Individual Target</span>
                                        </div>
                                    </th>
                                    <th scope="col" style="color:black; font-size: 15px; line-height: 20px;">
                                        <div class="d-flex align-center gap-1">
                                            <span> Target achieved {{ MPR_Month }} {{ MPR_Year }} </span>
                                        </div>
                                    </th>
                                    <th scope="col" style="color:black; font-size: 15px; line-height: 20px;">
                                        <div class="d-flex align-center gap-1">
                                            <span> Percentage Achieved vs Individual Target </span>
                                        </div>
                                    </th>
                                    <th scope="col" style="color:black; font-size: 15px; line-height: 20px;">
                                        <div class="d-flex align-center gap-1">
                                            <span> Exp. Close </span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="color:black; font-size: 12.5px;">
                                    <td style="color:black; font-size: 12.5px;">1 </td>
                                    <td style="color:black; font-size: 12.5px; font-weight: bold;">Targets </td>
                                    <td style="color:black; font-size: 12.5px;">Board: {{ teamTargetSize_Board
                                    }}bn<br><br>Mgt:
                                        {{ teamTargetSize_Mgt }}bn</td>
                                    <td style="color:black; font-size: 12.5px;">Board: {{ individualTarget_Board
                                    }}bn<br><br>Mgt: {{ individualTarget_Mgt }}bn</td>
                                    <td style="color:black; font-size: 12.5px;">Board: {{ TargetAchieved_Board
                                    }}bn<br><br>Mgt:
                                        {{
                                            TargetAchieved_Mgt }}bn</td>
                                    <td style="color:black; font-size: 12.5px;">Board: {{ PercentageAchieved_Board }}%
                                        <br><br>Mgt:
                                        {{ PercentageAchieved_Mgt }}%
                                    </td>
                                    <td></td>
                                </tr>
                                <tr v-for="items in priorityList" :key="items.id">
                                    <td style="color:black; font-size: 12.5px;">2</td>
                                    <td style="color:black; font-size: 13px; font-weight: bold;">Priority Transactions
                                    </td>
                                    <td style="color:black; font-size: 12.5px;">{{ items.expectedDealSize }}bn</td>
                                    <td style="color:black; font-size: 12.5px;" colspan="3">
                                        <p style="font-weight: bold; text-decoration: underline">{{ items.companyName }}
                                        </p>
                                        <div class="card-text" v-html="items.remarks"></div>
                                    </td>
                                    <td style="color:black; font-size: 12.5px;">{{ items.expectedCloseDate }}</td>
                                </tr>
                                <tr v-for="items in prospectList" :key="items.id">
                                    <td style="color:black; font-size: 12.5px;">3 </td>
                                    <td style="color:black; font-size: 13px; font-weight: bold;">Prospect </td>
                                    <td style="color:black; font-size: 12.5px;">{{ items.expectedDealSize }}bn</td>
                                    <td style="color:black; font-size: 12.5px;" colspan="3">
                                        <b style="text-decoration: underline;">{{ items.companyName }}</b>
                                        <br> <br>
                                        <div class="card-text" v-html="items.remarks"></div>
                                    </td>
                                    <td style="color:black; font-size: 12.5px;">{{ items.expectedCloseDate }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="showPreview = false">
                        Cancel
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <TabMenu />

        <div class="welcome d-flex justify-content-between align-items-center mt-3">

            <div class="d-flex justify-space-between align-items-center box-padded-1 gap-3 mt-2 mb-3 h4"><b>
                    Clean Energy Transaction Update</b>
            </div>
        </div>

        <div class="d-flex justify-content-between">
            <v-btn-toggle v-model="text" color='#298729' group mandatory variant="elevated">
                <v-btn size="x-small" density="compact" value="projects" v-on:click="text = 'projects'">
                    Projects
                </v-btn>
                <v-btn size="x-small" density="compact" value="summary" v-on:click="text = 'summary'">
                    Summary
                </v-btn>
                <v-btn size="x-small" density="compact" value="grant" v-on:click="text = 'grant'">
                    Grant Utilization
                </v-btn>
            </v-btn-toggle>
            <v-btn-toggle class="bews" v-model="text2" color='#298729' group mandatory variant="elevated">
                <v-btn size="x-small" density="compact" value="myTransaction" v-on:click="text = 'myTransaction'">
                    My Transaction
                </v-btn>
                <v-btn size="x-small" density="compact" value="allTransaction" v-on:click="text = 'allTransaction'">
                    All Transaction
                </v-btn>
            </v-btn-toggle>
        </div>

        <DashboardProjects :data="allDealsData" v-if="text == 'projects'" :dealSec="text" :selectedUserList="selectedUser" />
        <DashboardSummary :data="allDealsData" v-if="text == 'summary'" :dealSec="text2" :selectedUserList="selectedUser" />
        <DashboardGrantUtilization :data="allDealsData" v-if="text == 'grant'" :dealSec="text2"
            :selectedUserList="selectedUser" />


    </div>
</template>

<style scoped>
.intro {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    flex-shrink: 0;
}

.box-padded {
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin-top: 20PX;
    background: #FFFFFF;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}

.box-padded-1 {
    min-width: 35%;
}

.box-padded-1 select {
    flex-grow: 0;
}

.v-btn-toggle {
    bordlefter: 1px solid black;
    width: 290px;
    justify-content: center;
    border-radius: 10px;
    background-color: #FFFFFF;
    padding: 3px 0px;
    box-sizing: border-box;
    height: 33px;
    background: #FFFFFF;
    border: 1px solid #D4D4D8;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06);
    border-radius: 5px;
}

.bews {
    bordlefter: 1px solid black;
    width: 250px;
    justify-content: center;
    border-radius: 10px;
    background-color: #FFFFFF;
    padding: 3px 0px;
    box-sizing: border-box;
    height: 33px;
    background: #FFFFFF;
    border: 1px solid #D4D4D8;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06);
    border-radius: 5px;
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
</style>
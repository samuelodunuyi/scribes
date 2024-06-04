<script setup>
import { ref, onMounted, watch } from "vue";
import TabMenu from '../../components/TabMenu.vue';
import DashboardUser from './DashboardUser.vue';
import DashboardManagement from './DashboardManagement.vue';
import { useDashOptionStore } from '../../stores/dashOption';
import TableCreateDeals from '../../components/Tables/TableCreateDeals.vue'
import TableOne from '../../components/Tables/TableOne.vue'
import pinia from "../../stores/store";
import CRMService from '../../services/crmService';
import settingsService from '../../services/settingsServices';
import TableTwo from '../../components/Tables/TableTwo.vue';
import trmsService from "../../services/trmsService";
import administrationsService from "../../services/administrationsService";
import crmService from "../../services/crmService";

const stores = useDashOptionStore(pinia);
const dashboardOpt = ref('user')
const text = ref('myDeals')
const selectedUser = ref('')
const selectedFundOption = ref('')
const dialog = ref(false)
const dialog2 = ref(false)
const dialogPipeline = ref(false)
const isPipeline = ref(false)
const showPreview = ref(false)
const allMandatedLeadsData = ref([])
const allDealsData = ref([])
const userListTransactors = ref([])
const prospectList = ref([])
const targetList = ref([])
const priorityList = ref([])
const companies = ref([])
const teamTargetSize_Board = ref('')
const files = ref('')
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
    if (stores.signedInUserLevel == 'MANAGEMENT') {
        dashboardOpt.value = 'management'
    }
    else {
        dashboardOpt.value = 'user'
    }
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
                    <li style="cursor: pointer;"><a class="dropdown-item" @click="dialog = true">New Deal (TRMS)</a></li>
                    <li style="cursor: pointer;"><a class="dropdown-item">New Portfolio</a></li>
                    <li style="cursor: pointer;"><a class="dropdown-item">New Clean Energy</a></li>
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
                                    <td style="color:black; font-size: 13px; font-weight: bold;">Priority Transactions </td>
                                    <td style="color:black; font-size: 12.5px;">{{ items.expectedDealSize }}bn</td>
                                    <td style="color:black; font-size: 12.5px;" colspan="3">
                                        <p style="font-weight: bold; text-decoration: underline">{{ items.companyName }}</p>
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

            <div class="d-flex justify-space-between align-items-center box-padded-1 gap-3">
                <span class="intro" v-if="stores.signedInUserLevel == 'MANAGEMENT'"> Dashboard: </span>
                <select v-model="dashboardOpt" class="form-select border-0" aria-label="Default select example"
                    v-if="stores.signedInUserLevel == 'MANAGEMENT'">
                    <option value="user"> User </option>
                    <option value='management' selected> Management </option>
                </select>

                <span class="intro"> Funding Option: </span>
                <select class="form-select" aria-label="Default select example" v-model="selectedFundOption">
                    <option value=""> All </option>
                    <option value="BOI"> BOI </option>
                    <option value="DCM"> DCM </option>
                    <option value="PCB"> PCB </option>
                </select>


                <span class="intro" v-if="dashboardOpt == 'user'"> MPR:</span>
                <small style="cursor: pointer; background-color: green; color: white; border-radius: 8px; padding: 10px;"
                    v-if="dashboardOpt == 'user'" @click="showPreview = true"><b>PRESENT</b></small>
            </div>
            <div>
                <div class="toggleButton" v-if="dashboardOpt == 'user' && stores.signedInUserLevel != 'MANAGEMENT'">
                    <v-btn-toggle color='#298729' v-model="text" group mandatory variant="elevated">
                        <v-btn size="x-small" density="compact" value="myDeals">
                            My Deals
                        </v-btn>
                        <v-btn size="x-small" density="compact" value="allDeals">
                            All Deals
                        </v-btn>
                    </v-btn-toggle>
                </div>
                <div v-else-if="dashboardOpt == 'user' && stores.signedInUserLevel == 'MANAGEMENT'" class="d-flex gap-2"
                    style="width: 100%; margin-bottom: 15px;">
                    <span class="intro mt-1"> Staff: </span>
                    <select name="selectUser" v-model="selectedUser" class="form-select border-0">
                        <option :value=sources.userId v-for="sources in userListTransactors" :key="sources.userId">{{
                            sources.userFullName }}
                        </option>
                    </select>
                </div>
                <small style="cursor: pointer; background-color: green; color: white; border-radius: 8px; padding: 10px;"
                    @click="$router.push('/administration')"><b>No of Deal Transactors: {{ userListTransactors.length
                    }}</b></small>
            </div>
        </div>
        <DashboardUser v-if="dashboardOpt == 'user'" :data="allDealsData" :dealSec="text" :fundOption="selectedFundOption"
            :selectedUserList="selectedUser" />
        <DashboardManagement v-else="dashboardOpt == 'management'" :data="allDealsData" :dealSec="text"
            :selectedUserList="selectedUser" :fundOption="selectedFundOption" />
        <div class="box-padded">
            <TableTwo :data="allDealsData" :dealSec="text" v-if="dashboardOpt == 'user'" :selectedUserList="selectedUser"
                :fundOption="selectedFundOption" />
            <TableTwo :data="allDealsData" dealSec="allDeals" v-else="dashboardOpt == 'management'"
                :fundOption="selectedFundOption" />
        </div>
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
</style>
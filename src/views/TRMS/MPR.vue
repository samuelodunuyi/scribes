<script setup>
import { ref, computed, onMounted } from 'vue';
import TabMenu from '../../components/TabMenu.vue';
import DecoupledDocument from '@ckeditor/ckeditor5-build-decoupled-document';
import { useDashOptionStore } from "../../stores/dashOption"
import pinia from "../../stores/store";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import trmsService from '../../services/trmsService';
import settingsService from '../../services/settingsServices';
import administrationsService from '../../services/administrationsService';

const dialog = ref(false)
const dialogTimeline = ref(false)
const dialogTimelineProspect = ref(false)
const stores = useDashOptionStore(pinia);
var editorConfig = {
    toolbar: ['bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'outdent', 'indent', '|', 'insertTable', 'undo', 'redo', 'alignment', 'fontColor', 'fontFamily', 'fontSize',
        'underline'],
}
const editor = DecoupledDocument
const loadingButtonProspect = ref(false)
const loadingButton = ref(false)
const activityDetailsRemarks = ref('')
const sizeProspect = ref('')
const activityDetailsProspects = ref('')
const expCloseProspect = ref('')
const expClosePriorityTransact = ref('')
const sizePriorityTransact = ref('')
const loadingButtonPriority = ref(false)
const showPreview = ref(false)
const prospectList = ref([])
const targetList = ref([])
const priorityList = ref([])
const companies = ref([])
const teamTargetSize_Board = ref('')
const individualTarget_Board = ref('')
const TargetAchieved_Board = ref('')
const PercentageAchieved_Board = ref('')
const teamTargetSize_Mgt = ref('')
const individualTarget_Mgt = ref('')
const TargetAchieved_Mgt = ref('')
const PercentageAchieved_Mgt = ref('')
const companyPriorityTransact = ref('')
const companyProspect = ref('')
const MPR_Month = ref('')
const MPR_Year = ref('')
const targetId = ref('')
const isEdit = ref(false)
const userName = ref("")
const userEmail = ref("")


onMounted(async () => {
    targetList.value = await settingsService.getMPRTargets()
    let users = await administrationsService.getUserRoles()
    let thisUser = users.filter(o => o.userId == stores.signedInUserEmail)
    // let thisUser = users.filter(o => o.userId == "eigbinedion@infracredit.ng")
    userName.value = thisUser[0].userFullName
    userEmail.value = thisUser[0].userId
    targetList.value = targetList.value.filter(o => o.recordOwner == userEmail.value)
    if (targetList.value.length > 0) {
        isEdit.value = true
        teamTargetSize_Board.value = targetList.value[0].teamTargetSize_Board
        individualTarget_Board.value = targetList.value[0].individualTarget_Board
        TargetAchieved_Board.value = targetList.value[0].targetAchieved_Board
        PercentageAchieved_Board.value = targetList.value[0].percentageAchieved_Board
        teamTargetSize_Mgt.value = targetList.value[0].teamTargetSize_Mgt
        individualTarget_Mgt.value = targetList.value[0].individualTarget_Mgt
        TargetAchieved_Mgt.value = targetList.value[0].targetAchieved_Mgt
        PercentageAchieved_Mgt.value = targetList.value[0].percentageAchieved_Mgt
        targetId.value = targetList.value[0].id
    }
    companies.value = await trmsService.getDeals()
    next()
    next2()
    const date = new Date();
    MPR_Month.value = date.toLocaleString('default', { month: 'long' });
    MPR_Year.value = date.getFullYear();
});

const savePriorityTransactions = async () => {
    loadingButtonPriority.value = true;
    let companyNameValue = companyPriorityTransact.value.companyName
    let ps = await settingsService.createMPRPriorityDeals(stores.signedInUserEmail, companyNameValue, expClosePriorityTransact.value, sizePriorityTransact.value, activityDetailsRemarks.value, stores.signedInUserEmail, stores.signedInUserEmail, new Date().toJSON(), new Date().toJSON())
    if (ps == true) {
        toast.success("Update Added to Transaction")
        setTimeout(async () => {
            dialogTimeline.value = false;
            loadingButtonPriority.value = false;
            expClosePriorityTransact.value = '';
            companyPriorityTransact.value = '';
            sizePriorityTransact.value = '';
            activityDetailsRemarks.value = ''
            activityDetailsProspects.value = ''
            next2()
        }, 1500);
    }
    else {
        toast.error("An error occured, try again")
    }
}

const saveProspect = async () => {
    loadingButtonProspect.value = true;
    let companyNameValue = companyProspect.value
    let ps = await settingsService.createMPRProspects(stores.signedInUserEmail, companyNameValue, expCloseProspect.value, sizeProspect.value, activityDetailsRemarks.value, stores.signedInUserEmail, stores.signedInUserEmail, new Date().toJSON(), new Date().toJSON())
    if (ps == true) {
        toast.success("Update Added to Transaction")
        setTimeout(async () => {
            dialogTimeline.value = false;
            dialogTimelineProspect.value = false;
            loadingButton.value = false;
            activityDetailsRemarks.value = ''
            sizeProspect.value = ''
            expCloseProspect.value = ''
            companyProspect.value = ''
            activityDetailsProspects.value = ''
            next()
        }, 1500);
    }
    else {
        toast.error("An error occured, try again")
    }
}

const cancel = async () => {
    dialogTimeline.value = false;
    dialogTimelineProspect.value = false;
    loadingButton.value = false;
    activityDetailsRemarks.value = ''
    sizeProspect.value = ''
    expCloseProspect.value = ''
    companyProspect.value = ''
    activityDetailsProspects.value = ''
}

const onReady5 = (editor) => {
    const toolbarContainer = document.querySelector('.document-editor__toolbar5');
}

const onReady6 = (editor) => {
    const toolbarContainer = document.querySelector('.document-editor__toolbar6');
}

const onReady7 = (editor) => {
    const toolbarContainer = document.querySelector('.document-editor__toolbar7');
    toolbarContainer.appendChild(editor.ui.view.toolbar.element);
}

const onReady8 = (editor) => {
    const toolbarContainer = document.querySelector('.document-editor__toolbar8');
    toolbarContainer.appendChild(editor.ui.view.toolbar.element);
}

const next = async () => {
    let list = await settingsService.getMPRProspects()
    console.log(list)
    prospectList.value = list.filter(o => o.recordOwner == userEmail.value)
}

const next2 = async () => {
    let list = await settingsService.getMPRPriorityDeals()
    console.log(list)
    priorityList.value = list.filter(o => o.recordOwner == userEmail.value)
}

const checkValuePriority = (value) => {
    sizePriorityTransact.value = value.dealSize
    var closeDate = value.expectedCloseDate.slice(0, 10).replace(/-/g, '-')
    expClosePriorityTransact.value = closeDate
}
const editTarget = async () => {
    let ps = await settingsService.editMPRTargets(targetId.value, stores.signedInUserEmail, PercentageAchieved_Board.value, PercentageAchieved_Mgt.value, TargetAchieved_Board.value, TargetAchieved_Mgt.value,
        individualTarget_Board.value, individualTarget_Mgt.value, teamTargetSize_Board.value, teamTargetSize_Mgt.value, "", stores.signedInUserEmail, stores.signedInUserEmail, new Date().toJSON(), new Date().toJSON())
        if (ps == 200) {
        toast.success("Targets Saved")
    }
}

const saveTarget = async () => {
    let ps = await settingsService.createMPRTargets(stores.signedInUserEmail, PercentageAchieved_Board.value, PercentageAchieved_Mgt.value, TargetAchieved_Board.value, TargetAchieved_Mgt.value,
        individualTarget_Board.value, individualTarget_Mgt.value, teamTargetSize_Board.value, teamTargetSize_Mgt.value, "", stores.signedInUserEmail, stores.signedInUserEmail, new Date().toJSON(), new Date().toJSON())
    if (ps == true) {
        toast.success("Targets Saved")
    }
}

const editLinePriority = async (value) => {
    let ps = await settingsService.editMPRPriorityDeals(value.priorityDealId, stores.signedInUserEmail,
        value.companyName, value.expectedCloseDate, value.expectedDealSize, value.remarks, stores.signedInUserEmail, stores.signedInUserEmail, new Date().toJSON(), new Date().toJSON())
    console.log(ps)
    
        if (ps == 200) {
        toast.success("Edit Saved")
        setTimeout(async () => {
            next2()
        }, 1500);
    }
}

const editLineProspect = async (value) => {
    let ps = await settingsService.editMPRProspects(value.mprProspectId, stores.signedInUserEmail,
        value.companyName, value.expectedCloseDate, value.expectedDealSize, value.remarks, stores.signedInUserEmail, stores.signedInUserEmail, new Date().toJSON(), new Date().toJSON())
    if (ps == 200) {
        toast.success("Edit Saved")
        setTimeout(async () => {
            next()
        }, 1500);
    }
}

const removeLine = async (type, value) => {
    if (type == "Priority Transactions") {
        await settingsService.deleteMPRPriorityDeals(value.priorityDealId)
        setTimeout(async () => {
            toast.success("Delete Successful")
            next2()
        }, 1000);
    }
    else if (type == 'Prospects') {
        await settingsService.deleteMPRProspects(value.mprProspectId)
        setTimeout(async () => {
            toast.success("Delete Successful")
            next()
        }, 1000);
    }
}
</script>

<template>
    <div class="wrapper">
        <v-dialog v-model="showPreview" max-width="1500px">
            <v-card>
                <v-card-title style="padding-top: 20px;">
                    <div class="d-flex justify-content-between align-items-center mt-3 intro">
                        <span class="text-h5 ml-3"
                            style="color:black; font-weight: bold; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">Origination
                            and Structuring - MPR </span>
                        <img src="../../assets/images/InfraCredit.svg" style="width: 10%; height: 10%;">
                    </div>
                    <img src="../../assets/images/Picture1.png" style="height: 50px; width: 99%; margin-left: 8px;" >

                    <div style="flex-direction: row; display: flex; justify-content: space-between;">
                        <p style="margin-left: 12px; margin-top: 35px; margin-bottom: -10px;">{{ userName }}</p>
                        <img :src="stores.profilePictureUrl"
                            style="margin-top: 10px; width: 100px; height: 100px; border-radius: 50%;">
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

        <v-dialog v-model="dialogTimeline" max-width="650px">
            <v-card>
                <v-card-title>
                    <span class="text-h5 ml-3">Add Priority Transactions </span>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="4">
                            <div class="ckeditor">
                                <b>Company Name</b>
                                <div>
                                    <select class="form-select" id="lead-source" v-model="companyPriorityTransact"
                                        @change="checkValuePriority(companyPriorityTransact)">
                                        <option :value=conp v-for="conp in companies" :key="conp.companyId">{{
                                            conp.companyName }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="4">
                            <div class="ckeditor">
                                <b>Size</b>
                                <div>
                                    <input class="form-control" type="number" v-model="sizePriorityTransact" />
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="4">
                            <div class="ckeditor">
                                <b>Exp. Close</b>
                                <div>
                                    <input class="form-control" type="date" v-model="expClosePriorityTransact" />
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="12">
                            <div class="ckeditor2">
                                <b>Remarks</b>
                                <div class="document-editor__toolbar7"></div>
                                <div class="document-editor__editable-container">
                                    <ckeditor :editor="editor" :config="editorConfig" @ready="onReady7"
                                        v-model="activityDetailsRemarks" class="checkEditor"></ckeditor>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="cancel">
                        Cancel
                    </v-btn>
                    <v-btn color="blue-darken-1" :loading="loadingButton" variant="text"
                        @click="savePriorityTransactions">Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <v-dialog v-model="dialogTimelineProspect" max-width="650px">
            <v-card>
                <v-card-title>
                    <span class="text-h5 ml-3">Add Prospects </span>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="4">
                            <div class="ckeditor">
                                <b>Company Name</b>
                                <div>
                                    <input class="form-control" id="lead-source" v-model="companyProspect" />
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="4">
                            <div class="ckeditor">
                                <b>Size</b>
                                <div>
                                    <input class="form-control" type="number" v-model="sizeProspect" />
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="4">
                            <div class="ckeditor">
                                <b>Exp. Close</b>
                                <div>
                                    <input class="form-control" type="date" v-model="expCloseProspect" />
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="12">
                            <div class="ckeditor2">
                                <b>Remarks</b>
                                <div class="document-editor__toolbar8"></div>
                                <div class="document-editor__editable-container">
                                    <ckeditor :editor="editor" :config="editorConfig" @ready="onReady8"
                                        v-model="activityDetailsRemarks" class="checkEditor"></ckeditor>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="cancel">
                        Cancel
                    </v-btn>
                    <v-btn color="blue-darken-1" :loading="loadingButton" variant="text" @click="saveProspect">Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <TabMenu />
        <div class="d-flex justify-content-between align-items-center mt-3 intro">
            <h3 class="mt-4">MPR Update</h3>
            <button class="btn btn-success" @click="showPreview = true">PRESENT</button>
        </div>
        <br>
        <h6>Targets</h6>
        <div class="d-flex justify-content-between mt-4 table-responsive">
            <table class="table" style="background-color: white;">
                <thead>
                    <tr>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span></span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Team Target Size</span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Individual Target</span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Target achieved {{ MPR_Month }} {{ MPR_Year }} </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Percentage Achieved vs Individual Target </span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="color:black; padding-top: 34px; font-size: 16px;">Board: </td>
                        <td><input class="form-control" v-model="teamTargetSize_Board" type="number" /></td>
                        <td><input class="form-control" v-model="individualTarget_Board" type="number" /></td>
                        <td><input class="form-control" v-model="TargetAchieved_Board" type="number" /></td>
                        <td><input class="form-control" v-model="PercentageAchieved_Board" type="number" /></td>
                    </tr>
                    <tr>
                        <td style="color:black; padding-top: 34px; font-size: 16px;">Mgt: </td>
                        <td><input class="form-control" v-model="teamTargetSize_Mgt" type="number" /></td>
                        <td><input class="form-control" v-model="individualTarget_Mgt" type="number" /></td>
                        <td><input class="form-control" v-model="TargetAchieved_Mgt" type="number" /></td>
                        <td><input class="form-control" v-model="PercentageAchieved_Mgt" type="number" /></td>
                    </tr>
                    <tr>
                        <td> <button class="btn btn-primary" v-if="isEdit" @click="editTarget">Save</button>
                            <button class="btn btn-primary" v-else @click="saveTarget">Save</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <br>
        <h6>Priority Transactions</h6>
        <div class="d-flex justify-content-between mt-4" style="background-color: white;!important">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Company Name</span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Size</span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Remarks</span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Exp. Close*</span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span class="d-flex" style="color: #47B65C; cursor: pointer;"
                                    @click="dialogTimeline = true"> Add <v-icon icon="mdi-plus-circle-outline"
                                        style="margin-top: -1px;"></v-icon>
                                </span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in priorityList" :key="item.id" style="padding-bottom: 150px;">
                        <td>
                            <input class="form-control" id="lead-source" v-model="item.companyName" />
                        </td>
                        <td><input class="form-control" type="number" v-model="item.expectedDealSize" /></td>
                        <td>
                            <div class="document-editor__editable-container">
                                <ckeditor :editor="editor" :config="editorConfig" @ready="onReady6" v-model="item.remarks"
                                    class="checkEditor"></ckeditor>
                            </div>
                        </td>
                        <td v-if="item.expectedCloseDate!=null"><input class="form-control" type="date" 
                                :value="item.expectedCloseDate.slice(0, 10).replace(/-/g, '-')"
                                @input="item.expectedCloseDate = $event.target.value" /></td>

                                
                                <td v-else="item.expectedCloseDate==null"><input class="form-control" type="date" 
                                :value="item.expectedCloseDate"
                                @input="item.expectedCloseDate = $event.target.value" /></td>
                        <td><span class="mr-2 d-flex align-center" style="color: #0a38a3; cursor: pointer;"
                                @click="editLinePriority(item)">
                                Edit/Save <v-icon icon="mdi-file-document-edit"></v-icon>
                            </span>
                            <span class="d-flex align-center" style="color: #F00; cursor: pointer;"
                                @click="removeLine('Priority Transactions', item)">
                                Delete <v-icon icon="mdi-trash-can-outline"></v-icon>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <br>
        <h6>Prospects</h6>
        <div class="d-flex justify-content-between mt-4" style="background-color: white;!important">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Company Name</span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Size</span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Remarks</span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Exp. Close*</span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span class="d-flex" style="color: #47B65C; cursor: pointer;"
                                    @click="dialogTimelineProspect = true"> Add <v-icon icon="mdi-plus-circle-outline"
                                        style="margin-top: -1px;"></v-icon>
                                </span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="items in prospectList" :key="items.id">
                        <td>
                            <input class="form-control" id="lead-source" v-model="items.companyName" />
                        </td>
                        <td><input class="form-control" type="number" v-model="items.expectedDealSize" /></td>
                        <td>
                            <div class="document-editor__editable-container">
                                <ckeditor :editor="editor" :config="editorConfig" @ready="onReady5" v-model="items.remarks"
                                    class="checkEditor"></ckeditor>
                            </div>
                        </td>

                        <td v-if="items.expectedCloseDate!=null"><input class="form-control" type="date" 
                            :value="items.expectedCloseDate.slice(0, 10).replace(/-/g, '-')"
                                @input="items.expectedCloseDate = $event.target.value" /></td>

                                
                                <td v-else="items.expectedCloseDate==null"><input class="form-control" type="date" 
                                :value="items.expectedCloseDate"
                                @input="items.expectedCloseDate = $event.target.value" /></td>

                        <td><span class="mr-2 d-flex align-center" style="color: #0a38a3; cursor: pointer;"
                                @click="editLineProspect(items)">
                                Edit/Save <v-icon icon="mdi-file-document-edit"></v-icon>
                            </span> <span class="d-flex align-center" style="color: #F00; cursor: pointer;"
                                @click="removeLine('Prospects', items)">
                                Delete <v-icon icon="mdi-trash-can-outline"></v-icon>
                            </span></td>
                    </tr>
                </tbody>
            </table>
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
    width: 268px;
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
    font-size: 16px;
    font-weight: 400;
    line-height: 19.2px;
}

.document-editor__toolbar5 {
    z-index: 1;
    border-bottom: 1px solid var(--ck-color-toolbar-border);
}

.ckeditor {
    width: 100% !important;
    min-height: 150px !important;
}

.ckeditor2 {
    width: 100% !important;
    min-height: 150px !important;
    margin-top: -60px !important;
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
    height: 150px !important;
    border-radius: 8px;
}
</style>
        
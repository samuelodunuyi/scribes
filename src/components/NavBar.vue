<script setup>
import { ref, onMounted } from 'vue';
import authenticationService from '../services/authenticationService';
import crmService from '../services/crmService';
import notificationServices from '../services/notificationServices';
import { useDashOptionStore } from "../stores/dashOption"
import fileUploadServices from '../services/fileUploadServices'
import pinia from "../stores/store";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const stores = useDashOptionStore(pinia);
const notifications = ref([])
const account = ref([])
const userFullName = ref('')
const dialogUpload = ref(false)
const loadingUpload = ref(false)
const example = ref('')
const pictureUploadUrl = ref('')
const existingPictureUrl = ref('')
const errorMessage = ref('')
const selectedLeadId = ref('')
const fileName = ref('')
const fileRead = ref('')
const fileInput = ref(null)
const files = ref([])
const notificationsLength = ref([])
const emit = defineEmits(["selectOption"])
const emitSelectedOption = (isCorrect) => {
    emit("selectOption", isCorrect)
}
const { modalValue } = defineProps(['modalValue'])

const accounts = authenticationService.msalInstance.getAllAccounts();
// console.log(accounts)
// account.value = accounts[0];
// if (account.value.name.split(" ")[2] == undefined) {
//     userFullName.value = account.value.name.split(" ")[0] + " " + account.value.name.split(" ")[1];
//     stores.signedInUserName = userFullName.value;
// }
// else {
//     userFullName.value = account.value.name.split(" ")[0] + " " + account.value.name.split(" ")[2];
//     stores.signedInUserName = userFullName.value;
// }

const signOut = () => {
    return authenticationService.SignOut();
}

onMounted(async () => {
    userFullName.value = stores.signedInUserName
    var allFiles = await crmService.getCRMFiles()
    files.value = allFiles.filter(o => o.fileDescription === stores.signedInUserEmail)
    files.value = files.value.slice(-1)
    checkUrl(files.value[0].fileURL)
    notifications.value = await notificationServices.getNotifications(stores.signedInUserEmail)
    notificationsLength.value = notifications.value.length
    if (stores.notificationLengths != notificationsLength.value) {
        stores.notificationLengths = notificationsLength.value
    }
})

const clearModal = () => {
    fileName.value = ''
    pictureUploadUrl.value = ''
    dialogUpload.value = false
    loadingUpload.value = false
}

const clearModal_ = () => {
    fileName.value = ''
    pictureUploadUrl.value = ''
    loadingUpload.value = false
}


const submitFile = async () => {
    example.value = fileInput.value.files[0];
    errorMessage.value = ''
    loadingUpload.value = true
    let contractUpload = await fileUploadServices.UploadCRMFile(fileInput.value.files[0])
    if (contractUpload.length > 5) {
        pictureUploadUrl.value = contractUpload
        loadingUpload.value = false
    }
};

const uploadProfilePicture = async () => {
    if (pictureUploadUrl.value.length < 3) {
        return errorMessage.value = "Invalid file uploaded"
    }
    errorMessage.value = ""
    let ps = await crmService.createCRMFile("Profile", "LEAD0000030", pictureUploadUrl.value, stores.signedInUserEmail.toString(), stores.signedInUserEmail, stores.signedInUserEmail, new Date().toJSON(), new Date().toJSON())
    if (ps == true) {
        toast.success('Upload Successful')
        setTimeout(async () => {
            clearModal()
            var allFiles = await crmService.getCRMFiles()
            files.value = allFiles.filter(o => o.fileDescription === stores.signedInUserEmail)
            files.value = files.value.slice(-1)
            checkUrl(files.value[0].fileURL)
        }, 1000);

    }
};
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
        stores.profilePictureUrl = fileRead.value
    }.bind(this)
    reader.readAsDataURL(file);
}
</script>


<template>
    <div class="pageheader d-flex justify-content-between align-items-center">
        <div class="logo" @click="$router.push('/TRMS')" style="cursor: pointer;">
            SCribe
        </div>
        <div class="brand">
            <img src="../assets/images/InfraCredit.svg" alt="brand_logo">
        </div>
        <div class="subheader d-flex align-center gap-4">
            <div class="text-none dropdown mt-2" @click="emitSelectedOption(true)" style="color: black; cursor: pointer;">
                <v-badge :content=stores.notificationLengths color="#47B65C" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <v-icon size="large" color="black">mdi-bell-outline</v-icon>
                </v-badge>
                <ul class="dropdown-menu" style="border: none;">
                    <li class="">
                        <div class="dropdown-menu notifications show" data-popper-placement="bottom-end"
                            style="position: absolute; inset: 0px 0px auto auto; margin: 0px; transform: translate(-120px, 22px);">
                            <div class="topnav-dropdown-header" style="background-color: #f6f6f6;">
                                <span class="notification-title">Notifications</span>
                                <a href="javascript:void(0)" class="clear-noti"> Clear All </a>
                            </div>
                            <div class="noti-content">
                                <ul class="notification-list">
                                    <li class="notification-message">
                                        <a href="#" class="dropdown-item">
                                            <div class="media d-flex gap-2">
                                                <span class="avatar flex-shrink-0">
                                                    <v-icon color="black">mdi-email</v-icon>
                                                </span>
                                                <div class="media-body flex-grow-1">
                                                    <p class="noti-details">John Doe added new task Patient appointment
                                                        booking</p>
                                                    <p class="noti-time">4 mins ago</p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="topnav-dropdown-footer">
                                <a href="#">View all Notifications</a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="avatar dropdown">
                <div data-bs-toggle="dropdown" aria-expanded="false"
                    style="flex-direction: row; display: flex; align-items: center; gap: 10px;">
                    <img v-if="fileRead.length < 5" src="../assets/images/ellipse.png" alt="" class="profile-image">
                    <img v-else :src="fileRead" alt="" class="profile-image" />
                    <span style="font-weight: 500;"> {{ userFullName }}</span>
                </div>
                <ul class="dropdown-menu" style="">
                    <li><a class="dropdown-item" @click="dialogUpload = true">Change Profile Picture</a></li>
                </ul>
            </div>
            <div class="logout" @click="signOut()">
                <img src="../assets/images/frame67.svg" alt="">
                <span> Logout </span>
            </div>
        </div>

        <v-dialog v-model="dialogUpload" transition="slide-y-transition" width="600">
            <v-card style="padding: 20px;">
                <div class="topUpload">
                    <img v-if="fileRead.length < 5" src="../assets/images/ellipse.png" alt="" width="300" height="400"
                        class="profile-image">
                    <img v-else :src="fileRead" alt="" width="300" height="400" />
                    <div class="upload">
                        <v-btn :loading="loadingUpload" height="48" rounded="xl" size="small"
                            onclick="document.getElementById('getFile').click()" variant="text" class="new"
                            style="text-decoration: underline; font-weight: bold; color: blue;">Select file</v-btn>
                        <input type='file' id="getFile" style="display:none" @change="submitFile()" accept="image/jpeg"
                            ref="fileInput">
                    </div>
                    <div class="fileUploaded" v-if="pictureUploadUrl != ''">
                        <p style="text-decoration: underline; font-weight: bold; cursor: context-menu;">{{ example.name }}
                        </p>
                        <p :style="{ cursor: 'pointer' }" @click="clearModal_()">X</p>
                    </div>
                </div>
                <b v-if="errorMessage">{{ errorMessage }}</b>
                <div class="bottomUpload">
                    <div>
                        <div class="topBotton3">
                            <button class="topButton" @click="clearModal()">Cancel</button>
                            <button class="topButton" @click="uploadProfilePicture()">Upload</button>
                        </div>
                    </div>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>

<style scoped>
.pageheader {

    background: #fff;
    padding: 20px 50px;
}

.pageheader .brand {
    height: 45.62px;
    width: 150px;
}

.subheader {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
}

.avatar,
.logout {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
}

.avatar .profile-image {
    width: 45px;
    height: 45px;
    border-radius: 50%;
}

.logo {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 30px;
    line-height: 24px;
    background: linear-gradient(90deg, #227CBF 0%, #47B65C 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.notifications {
    padding: 0;
    background-color: white;
}

.topnav-dropdown-header,
.topnav-dropdown-footer {
    font-size: 12px;
    height: 32px;
    line-height: 32px;
    padding-left: 12px;
    padding-right: 12px;
}

.topnav-dropdown-header .clear-noti {
    color: #f83f37;
    float: right;
    font-size: 11px;
    text-transform: uppercase;
}

input,
button,
a {
    transition: all 0.4s ease;
    -webkit-transition: all 0.4s ease;
}

a,
a:hover,
a:active,
a:focus {
    text-decoration: none;
    outline: none;
}

.topBotton3 {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    gap: 7px;
    flex-direction: row;
    padding: 20px 20px 0px 0px;
}

.topButton {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 15px;
    width: 200px;
    height: 40px;
    background: #FFFFFF;
    border: 1px solid #227CBF;
    border-radius: 50px;
    font-weight: 400;
    font-size: 14px;
    color: #227CBF;
}

.topButton:hover {
    background-color: #47B65C;
    color: #FFFFFF;
    border: none;
}

.notifications .noti-content {
    height: 290px;
    overflow-y: auto;
    position: relative;
}

.notifications .media:last-child {
    border-bottom: none;
}

.notifications .media {
    margin-top: 0;
}

.noti-details {
    color: #989c9e;
    min-width: 300px;
    margin-bottom: 0;
}

.noti-time {
    margin: 0;
}

.topnav-dropdown-footer {
    border-top: 1px solid #eee;
}

.topnav-dropdown-header,
.topnav-dropdown-footer {
    font-size: 12px;
    height: 32px;
    line-height: 32px;
    padding-left: 12px;
    padding-right: 12px;
}

.topnav-dropdown-footer a {
    display: block;
    text-align: center;
    color: #333;
}

.notifications ul.notification-list>li {
    margin-top: 0;
    border-bottom: 1px solid #dedede;
}

.ordinary-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.notification-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.notifications ul.notification-list>li a {
    display: block;
    padding: 12px;
    border-radius: 2px;
}

.topnav-dropdown-header .notification-title {
    color: #333;
    display: block;
    float: left;
    font-size: 14px;
}

.topnav-dropdown-header {
    border-bottom: 1px solid #eee;
    text-align: center;
}

.dropdown-menu {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    transform-origin: left top 0;
    box-shadow: inherit;
    background-color: #fff;
    font-size: 13px;
}

::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    border-radius: 25px;
    position: absolute;
    z-index: -1;
}

::-webkit-scrollbar-thumb {
    background: #ccc;
    position: absolute;
    z-index: -1;
}

::-webkit-scrollbar-track {
    background: #fff;
}

header .dropdown-toggle::after {
    display: none;
}
</style>


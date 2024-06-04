<script setup>

import { ref, watch, computed, onMounted } from 'vue';
import { useDashOptionStore } from "../../stores/dashOption"
import pinia from "../../stores/store";
import { toast } from 'vue3-toastify';
import trmsService from '../../services/trmsService';
import 'vue3-toastify/dist/index.css';
const props = defineProps(['column', 'button', 'saveValue', 'notEdit', 'selectedDealDetails', 'newLine'])
const stores = useDashOptionStore(pinia);
const emit = defineEmits(["close"])
const emitSelectedButton = (isCorrects) => {
    emit("close", isCorrects)
}


const lastName = ref('')
const firstName = ref('')
const phoneNumber = ref('')
const designation = ref('')
const emailAddress = ref('')
const loading = ref(false)
const disableCancel = ref(false)
const altPhoneNo = ref('')
const disableDeleteButton = ref(false)
const clientContact = ref([]);
const dialog = ref(false)

const removeLine = async (line) => {
    let ps = await trmsService.deleteDealsClientContacts(line.dealId, line.id)
    if (ps == 200) {
        disableDeleteButton.value = false
    }
    setTimeout(async () => {
        disableDeleteButton.value = false
    }, 1300);
        clientContact.value = await trmsService.getDealsClientContactsByDealId(line.dealId)
}
const clearModal = () => {
    firstName.value = ''
    lastName.value = ''
    emailAddress.value = ''
    phoneNumber.value = ''
    altPhoneNo.value = ''
    designation.value = ''
}
const createClientContact = async () => {
    loading.value = true    
    disableCancel.value = true
    let ps = await trmsService.createDealsClientContact(props.selectedDealDetails.dealId, props.selectedDealDetails.companyId, '', firstName.value, lastName.value, phoneNumber.value, altPhoneNo.value, emailAddress.value, designation.value, stores.signedInUserEmail, stores.signedInUserEmail, new Date().toJSON(), new Date().toJSON())
    if (ps == true) {
        toast.success('Client Contact Added Successfully')
        setTimeout(async () => {
            emitSelectedButton(false)
            dialog.value = false
            loading.value = false
        }, 1300);
        clientContact.value = await trmsService.getDealsClientContactsByDealId(props.selectedDealDetails.dealId)
        disableCancel.value = false
        clearModal()
    }
    else {
        toast.success('An error Occured, Please try again')
        setTimeout(async () => {
            loading.value = false
        }, 1300);
        disableCancel.value = false
    }
}

const editLine = async (values) => {
    let ps = await trmsService.editDealsClientContacts(values.dealId, values.id, values.companyId, values.contactId, values.contactFirstName, values.contactLastName, values.contactPhoneNo, values.contactAltPhoneNo, values.contactEmailAddress, values.contactDesignation, values.createdBy, stores.signedInUserEmail, values.createdDate, new Date().toJSON() )
    if (ps == 200) {
        clientContact.value = await trmsService.getDealsClientContactsByDealId(values.dealId)
        toast.success('Edit Successful')
    }
}

watch(() => props.newLine, (first, second) => {
    if (props.newLine == true) {
        dialog.value = props.newLine
    }
});


watch(() => props.selectedDealDetails, async (first, second) => {
    let deals = props.selectedDealDetails
    if (deals != undefined) {
        clientContact.value = await trmsService.getDealsClientContactsByDealId(deals.dealId)
    }
});
       

</script>

<template>
    <div>
        <v-dialog v-model="dialog" width="524" height="450" transition="dialog-right-transition"
            @click:outside="dialog = false; emitSelectedButton(false)">
            <v-card id="style-4">
                <v-card-title>
                    <div class="d-flex justify-content-between mt-3">
                        <span class="text-h5 ml-5">Add new Client Contact</span>
                        <p class="mr-5" style="cursor: pointer;" @click="dialog = false; emitSelectedButton(false)">X</p>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-container style="margin-top: -20px">
                        <div class="row g-2">
                            <div class="col-6">
                                <label class="form-label">First Name
                                </label>
                                <input type="text" class="form-control" v-model="firstName" :disabled="notEdit">
                            </div>
                            <div class="col-6">
                                <label class="form-label">Last Name
                                </label>
                                <input type="text" class="form-control" v-model="lastName" :disabled="notEdit">
                            </div>
                            <div class="col-6">
                                <label class="form-label">Phone Number
                                </label>
                                <input type="text" class="form-control" v-model="phoneNumber" :disabled="notEdit">
                            </div>
                            <div class="col-6">
                                <label class="form-label">Alt. Phone Number
                                </label>
                                <input type="text" class="form-control" v-model="altPhoneNo" :disabled="notEdit">
                            </div>
                            <div class="col-6">
                                <label class="form-label">Email Address
                                </label>
                                <input type="email" class="form-control" v-model="emailAddress" :disabled="notEdit">
                            </div>
                            <div class="col-6">
                                <label class="form-label">Designation
                                </label>
                                <input type="text" class="form-control" v-model="designation" :disabled="notEdit">
                            </div>
                        </div>
                    </v-container>
                    <div class="mt-4 d-flex justify-content-end gap-3">
                        <v-btn class="rfqbtn" @click="createClientContact()" :loading="loading" :disabled="notEdit">Create</v-btn>
                        <v-btn class="rfqbtn" @click="dialog = false; emitSelectedButton(false)" :disabled="disableCancel">Cancel</v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
        <form>
            <div class="row g-2" v-for="i in clientContact" :key="i.id">
                <div class="col-6">
                    <label class="form-label">First Name
                    </label>                  
                    <input type="text" class="form-control" v-model="i.contactFirstName" :disabled="notEdit">
                </div>
                <div class="col-6">
                    <label class="form-label">Last Name
                    </label>
                    <input type="text" class="form-control" v-model="i.contactLastName" :disabled="notEdit">
                </div>
                <div class="col-6">
                    <label class="form-label">Phone Number
                    </label>
                    <input type="text" class="form-control" v-model="i.contactPhoneNo" :disabled="notEdit">
                </div>
                <div class="col-6">
                    <label class="form-label">Alt. Phone Number
                    </label>
                    <input type="text" class="form-control" v-model="i.contactAltPhoneNo" :disabled="notEdit">
                </div>
                <div class="col-6">
                    <label class="form-label">Email Address
                    </label>
                    <input type="email" class="form-control" v-model="i.contactEmailAddress" :disabled="notEdit">
                </div>
                <div class="col-6">
                    <label class="form-label">Designation
                    </label>
                    <input type="text" class="form-control" v-model="i.contactDesignation" :disabled="notEdit">
                </div>
                <div class="editdeleteadd mb-3">
                    <div class="d-flex justify-content-end mt-2">
                        <span class="mr-2 d-flex align-center" style="color: #0a38a3;" @click="editLine(i)">
                            Edit/Save <v-icon icon="mdi-file-document-edit"></v-icon>
                        </span>
                        <span class="d-flex align-center" style="color: #F00;" @click="removeLine(i)">
                            Delete <v-icon icon="mdi-trash-can-outline"></v-icon>
                        </span>
                    </div>
                </div>
                <small>Last Modified By: {{ i.lastModifiedBy }} at {{ i.lastModifiedDate }}</small>
            </div>
        </form>
    </div>
</template>

<style scoped>
label.form-label {
    /* Capion Bold */
    font-size: 14px;
    font-weight: 700;
    line-height: 14.4px;
}

span {
    cursor: pointer;
}

.rfqbtn {
    font-family: 'Inter';
    font-size: 14px;
    color: #FFFFFF;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 35px;
    text-transform: none !important;
    background: #3949AB;
    border-radius: 10px;
}

.rfqbtn:hover {
    color: #000000;
    width: 80px;
    height: 35px;
    border: 1px solid #3949AB;
    background: #ffffff;
    transition: 0.7s;
}

.editdeleteadd {
    font-size: 14px;
    font-weight: 400;
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

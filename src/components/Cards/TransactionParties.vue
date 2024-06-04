<script setup>
import { ref, watch, computed } from 'vue';
import { toast } from 'vue3-toastify';
import trmsService from '../../services/trmsService';
import 'vue3-toastify/dist/index.css';
import { useDashOptionStore } from "../../stores/dashOption"
import pinia from "../../stores/store";
const props = defineProps(['column', 'button', 'notEdit', 'selectedDealDetails', 'newLine'])
const stores = useDashOptionStore(pinia);
const emit = defineEmits(["close"])
const emitSelectedButton = (isCorrects) => {
    emit("close", isCorrects)
}
const transactionPartyRole = ref('')
const transactionPartyAppointed = ref('')
const transactionPartyLeadIssuingHouse = ref('')
const transactionPartyStatus = ref('')
const disableDeleteButton = ref(false)
const dialog = ref(false)
const loading = ref(false)
const disableCancel = ref(false)
const TransactionPartiesLines = ref([])



const removeLine = async (line) => {
    let ps = await trmsService.deleteDealsTransactionParties(line.dealId, line.id)
    disableDeleteButton.value = true

    if (ps == 200) {
        disableDeleteButton.value = false
    }
    setTimeout(async () => {
        disableDeleteButton.value = false
    }, 1300);
    TransactionPartiesLines.value = await trmsService.getDealsTransactionPartiesByDealId(line.dealId)
}
const clearModal = () => {
    transactionPartyRole.value = ''
    transactionPartyAppointed.value = ''
    transactionPartyLeadIssuingHouse.value = ''
    transactionPartyStatus.value = ''
}
const createTransactionParties = async () => {
    loading.value = true
    disableCancel.value = true
    let ps = await trmsService.createDealsTransactionParties(props.selectedDealDetails.dealId, transactionPartyRole.value, transactionPartyAppointed.value, transactionPartyLeadIssuingHouse.value, transactionPartyStatus.value, stores.signedInUserEmail, stores.signedInUserEmail, new Date().toJSON(), new Date().toJSON())
    if (ps == true) {
        toast.success('Transaction Party Added Successfully')
        setTimeout(async () => {
            emitSelectedButton(false)
            dialog.value = false
            loading.value = false
        }, 1300);
        TransactionPartiesLines.value = await trmsService.getDealsTransactionPartiesByDealId(props.selectedDealDetails.dealId)
        disableCancel.value = false
        clearModal()
    } else {
        toast.error('An error Occured, Please try again')
        setTimeout(async () => {
            loading.value = false
        }, 1300);
        disableCancel.value = false
    }
}

const editLine = async (values) => {
    let ps = await trmsService.editDealsTransactionParties(values.dealId, values.id, values.role, values.appointed, values.party, values.status, values.createdBy, stores.signedInUserEmail, values.createdDate, new Date().toJSON())
    if (ps == 200) {
        TransactionPartiesLines.value = await trmsService.getDealsTransactionPartiesByDealId(values.dealId)
        toast.success('Edit Successful')
    }
}

watch(() => props.newLine, (first, second) => {
    if (props.newLine == true) {
        dialog.value = props.newLine
    }
});

watch(() => props.selectedDealDetails, async (first, second) => {
    if (JSON.stringify(first) !== JSON.stringify(second)) {
        let deals = props.selectedDealDetails
        if (deals != undefined) {
            TransactionPartiesLines.value = await trmsService.getDealsTransactionPartiesByDealId(deals.dealId)
        }
    }
});

</script>
<template>
    <div>
        <v-dialog v-model="dialog" width="564" height="580" transition="dialog-right-transition"
            @click:outside="dialog = false; emitSelectedButton(false)">
            <v-card id="style-4">
                <v-card-title>
                    <div class="d-flex justify-content-between mt-3">
                        <span class="text-h5 ml-5">Add new Transaction Parties</span>
                        <p class="mr-5" style="cursor: pointer;" @click="dialog = false; emitSelectedButton(false)">X</p>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-container style="margin-top: -20px">
                        <div class="row g-2">
                            <div class="col-12">
                                <label class="form-label">Role </label>
                                <select class="form-select" :disabled="notEdit" v-model="transactionPartyRole">
                                    <option value="Due Dilligence Advisors">Due Dilligence Advisors</option>
                                    <option value="Bond Issuance">Bond Issuance</option>
                                </select>
                            </div>
                            <div :class="column">
                                <label class="form-label">Appointed </label>
                                <select class="form-select" :disabled="notEdit" v-model="transactionPartyAppointed">
                                    <option :value=false>No</option>
                                    <option :value=true>Yes</option>
                                </select>
                            </div>
                            <div :class="column">
                                <label class="form-label"> Party </label>
                                <select class="form-select" :disabled="notEdit" v-model="transactionPartyLeadIssuingHouse">
                                    <option value='Lead Issuing House'>Lead Issuing House</option>
                                    <option value="Trusties">Trusties</option>
                                    <option value="Legal">Legal</option>
                                </select>
                            </div>

                            <div class="col-12">
                                <label class="form-label">Status </label>
                                <textarea type="text" class="form-control" :disabled="notEdit" rows="5"
                                    v-model="transactionPartyStatus"></textarea>
                            </div>
                        </div>
                    </v-container>
                    <div class="mt-4 d-flex justify-content-end gap-3">
                        <v-btn class="rfqbtn" @click="createTransactionParties()" :loading="loading" :disabled="notEdit">Create</v-btn>
                        <v-btn class="rfqbtn" @click="dialog = false; emitSelectedButton(false)"
                            :disabled="disableCancel">Cancel</v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>

        <form>
            <div class="row g-2 mb-2 pb-2" v-for="i in TransactionPartiesLines" :key="i.id">

                <div class="col-12">
                    <label class="form-label">Role </label>
                    <select class="form-select" :disabled="notEdit" v-model="i.role">
                        <option value="Due Dilligence Advisors">Due Dilligence Advisors</option>
                        <option value="Bond Issuance">Bond Issuance</option>
                    </select>
                </div>
                <div :class="column">
                    <label class="form-label">Appointed </label>
                    <select class="form-select" :disabled="notEdit" v-model="i.appointed">
                        <option :value=false>No</option>
                        <option :value=true>Yes</option>
                    </select>
                </div>
                <div :class="column">
                    <label class="form-label"> Party </label>
                    <select class="form-select" :disabled="notEdit" v-model="i.party">
                        <option value='Lead Issuing House'>Lead Issuing House</option>
                        <option value="Trusties">Trusties</option>
                        <option value="Legal">Legal</option>
                    </select>
                </div>

                <div class="col-12">
                    <label class="form-label">Status </label>
                    <textarea type="text" class="form-control" :disabled="notEdit" v-model="i.status" rows="3"></textarea>
                </div>
                <small>Last Modified By: {{ i.lastModifiedBy }} at {{ i.lastModifiedDate }}</small>

                <div class="editdeleteadd">
                    <div class="d-flex justify-content-end mt-2">
                        <span class="mr-2 d-flex align-center" style="color: #0a38a3;" @click="editLine(i)">
                            Edit/Save <v-icon icon="mdi-file-document-edit"></v-icon>
                        </span>
                        <span class="d-flex align-center" style="color: #F00;" @click="removeLine(i)">
                            Delete <v-icon icon="mdi-trash-can-outline"></v-icon>
                        </span>
                    </div>
                </div>
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

.editdeleteadd {
    font-size: 14px;
    font-weight: 400;
    line-height: 14.4px;
}

.rfqbtn {
    font-family: 'Inter';
    font-size: 14px;
    color: #FFFFFF;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 35px;
    background: #3949AB;
    border-radius: 10px;
}

textarea {
    resize: none;
}

.rfqbtn:hover {
    color: #000000;
    width: 80px;
    height: 35px;
    border: 1px solid #3949AB;
    background: #ffffff;
    transition: 0.7s;
}

span {
    cursor: pointer;
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
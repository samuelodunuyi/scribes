<script setup>
import { ref, watch, computed } from 'vue';
import { useDashOptionStore } from "../../stores/dashOption"
import pinia from "../../stores/store";
import { toast } from 'vue3-toastify';
import trmsService from '../../services/trmsService';
import 'vue3-toastify/dist/index.css';
const props = defineProps(['column', 'button', 'notEdit', 'selectedDealDetails', 'newLine'])
const stores = useDashOptionStore(pinia);
const emit = defineEmits(["close"])
const emitSelectedButton = (isCorrects) => {
    emit("close", isCorrects)
}
const otherFocusArea = ref([])
const feeLetterYear = ref('')
const CRGDeedDate = ref('')
const closedDate = ref('')
const closingSize = ref('')
const loading = ref(false)
const disableCancel = ref(false)
const disableDeleteButton = ref(false)
const dialog = ref(false)


const removeLine = async (line) => {
    let ps = await trmsService.deleteDealsOtherFocusAreas(line.dealId, line.id)
    disableDeleteButton.value = true

    if (ps == 200) {
        disableDeleteButton.value = false
    }
    setTimeout(async () => {
        disableDeleteButton.value = false
    }, 1300);
    otherFocusArea.value = await trmsService.getDealsOtherFocusAreasByDealId(line.dealId)
}
const clearModal = () => {
    feeLetterYear.value = ''
    CRGDeedDate.value = ''
    closedDate.value = ''
    closingSize.value = ''
}
const createOtherFocusArea = async () => {
    loading.value = true
    disableCancel.value = true
    let ps = await trmsService.createDealsOtherFocusArea(props.selectedDealDetails.dealId, feeLetterYear.value, CRGDeedDate.value, closedDate.value, closingSize.value, stores.signedInUserEmail, stores.signedInUserEmail, new Date().toJSON(), new Date().toJSON())
    if (ps == true) {
        toast.success('Focus Area Added Successfully')
        setTimeout(async () => {
            emitSelectedButton(false)
            dialog.value = false
            loading.value = false
        }, 1300);
        otherFocusArea.value = await trmsService.getDealsOtherFocusAreasByDealId(props.selectedDealDetails.dealId)
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
    let ps = await trmsService.editDealsOtherFocusAreas(values.dealId, values.id, values.feeLetterDate, values.crgDeedDate, values.closedDate, values.closingSize, values.createdBy, stores.signedInUserEmail, values.createdDate, new Date().toJSON())
    if (ps == 200) {
        otherFocusArea.value = await trmsService.getDealsOtherFocusAreasByDealId(values.dealId)
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
            otherFocusArea.value = await trmsService.getDealsOtherFocusAreasByDealId(deals.dealId)
        }
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
                        <span class="text-h5 ml-5">Add new Other Focus Area</span>
                        <p class="mr-5" style="cursor: pointer;" @click="dialog = false; emitSelectedButton(false)">X</p>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-container style="margin-top: -20px">
                        <div class="row g-2 mb-2 pb-2">
                            <div :class="column">
                                <label class="form-label">Fee Letter Year
                                </label>
                                <input type="date" class="form-control" v-model="feeLetterYear" :disabled="notEdit">
                            </div>
                            <div :class="column">
                                <label for="lead-source" class="form-label">CRG Deed Date</label>
                                <input type="date" class="form-control" v-model="CRGDeedDate" :disabled="notEdit">
                            </div>
                            <div :class="column">
                                <label class="form-label">Closed Date
                                </label>
                                <input type="date" class="form-control" v-model="closedDate" :disabled="notEdit">
                            </div>

                            <div :class="column">
                                <label class="form-label">Closing Size
                                </label>
                                <input type="text" class="form-control" v-model="closingSize" :disabled="notEdit">
                            </div>
                        </div>
                    </v-container>
                    <div class="mt-4 d-flex justify-content-end gap-3">
                        <v-btn class="rfqbtn" @click="createOtherFocusArea()" :loading="loading" :disabled="notEdit">Create</v-btn>
                        <v-btn class="rfqbtn" @click="dialog = false; emitSelectedButton(false)"
                            :disabled="disableCancel">Cancel</v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
        <form>
            <div class="row g-2 mb-2 pb-2" v-for="i in otherFocusArea" :key="i.id">
                <div :class="column">
                    <label class="form-label">Fee Letter Year
                    </label>
                    <input type="date" class="form-control" :value="i.feeLetterDate.slice(0, 10).replace(/-/g, '-')"
                        @input="i.feeLetterDate = $event.target.value" :disabled="notEdit">
                </div>
                <div :class="column">
                    <label for="lead-source" class="form-label">CRG Deed Date</label>
                    <input type="date" class="form-control" :value="i.crgDeedDate.slice(0, 10).replace(/-/g, '-')"
                        @input="i.crgDeedDate = $event.target.value" :disabled="notEdit">
                </div>
                <div :class="column">
                    <label class="form-label">Closed Date
                    </label>
                    <input type="date" class="form-control" :value="i.closedDate.slice(0, 10).replace(/-/g, '-')"
                        @input="i.closedDate = $event.target.value" :disabled="notEdit">
                </div>
                <div :class="column">
                    <label class="form-label">Closing Size
                    </label>
                    <input type="text" class="form-control" v-model="i.closingSize" :disabled="notEdit">
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
    background: #3949AB;
    border-radius: 10px;
    text-transform: none;
}

.editdeleteadd {
    font-size: 14px;
    font-weight: 400;
    line-height: 14.4px;
}


.rfqbtn:hover {
    color: #000000;
    width: 80px;
    height: 35px;
    border: 1px solid #3949AB;
    background: #ffffff;
    transition: 0.7s;
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
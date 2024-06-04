<script setup>
import { ref, watch } from 'vue';
import { useDashOptionStore } from "../../stores/dashOption"
import pinia from "../../stores/store";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useRouter } from 'vue-router';
import trmsService from '../../services/trmsService';
const props = defineProps(['details', 'selectedDealDetails', 'column', 'button', 'saveValue', 'isNew', 'notEdit'])
const emit = defineEmits(["saveValue"])

const stores = useDashOptionStore(pinia);
const emitSaveValue = (isCorrects) => {
    emit("saveValue", isCorrects)
}
const fundOptions = ref('')
const BOI = ref('')
const DCM = ref('')
const PCB = ref('')
const lastModifiedBy = ref('')
const lastModifiedDate = ref('')

watch(() => props.selectedDealDetails, (first, second) => {
    if (JSON.stringify(first) !== JSON.stringify(second)) {
        let deals = props.selectedDealDetails
        if (deals != undefined) {
            BOI.value = deals.fundOptionBOI
            PCB.value = deals.fundOptionPCB
            DCM.value = deals.fundOptionDCM

            lastModifiedDate.value = deals.lastModifiedDate.slice(0, 10).replace(/-/g, '-')
            lastModifiedBy.value = deals.lastModifiedBy
        }
    }
});
watch(() => props.saveValue, async (first, second) => {
    let saveValue = props.saveValue
    emitSaveValue(false)
    let allData = props.selectedDealDetails
    if (saveValue == true && props.isNew != 'New' && allData.dealCategory != null) {
        await trmsService.updateDealFundOptions(allData.dealId, BOI.value, DCM.value, PCB.value, stores.signedInUserEmail, new Date().toJSON())

    }

});
const update = async () => {
    let allData = props.selectedDealDetails
    let ps = await trmsService.updateDealFundOptions(allData.dealId, BOI.value, DCM.value, PCB.value, stores.signedInUserEmail, new Date().toJSON())
    if (ps == 200) {
        toast.success('Transaction Updated')
    }
}
</script>

<template>
    <form>
        <label class="form-label">Funding Options </label>
        <div class="d-flex gap-3">
            <div class="custom-checkbox d-flex justify-content-center align-center">
                <div class="form-check ">
                    <input class="form-check-input" type="checkbox" :value="true" name="flexRadioDefault" id="BOI"
                        v-model="BOI" :disabled="notEdit">
                    <label class="form-check-label" for="BOI">
                        BOI
                    </label>
                </div>
            </div>

            <div class="custom-checkbox d-flex justify-content-center align-center">
                <div class="form-check ">
                    <input class="form-check-input" type="checkbox" :value="true" name="flexRadioDefault" id="DCM"
                        v-model="DCM" :disabled="notEdit">
                    <label class="form-check-label" for="DCM">
                        DCM
                    </label>
                </div>
            </div>

            <div class="custom-checkbox d-flex justify-content-center align-center">
                <div class="form-check ">
                    <input class="form-check-input" type="checkbox" :value="true" name="flexRadioDefault" id="PCB"
                        v-model="PCB" :disabled="notEdit">
                    <label class="form-check-label" for="PCB">
                        PCB
                    </label>
                </div>
            </div>


        </div>
        <small>Last Modified By: {{ lastModifiedBy }} at {{ lastModifiedDate }}</small>

        <div class="d-flex justify-content-end mr-2 mt-3">
            <button type="submit" class="submit-button" @click.prevent="update" v-if="button == true">Update</button>
        </div>
    </form>
</template>


<style scoped>
label.form-label {
    /* Capion Bold */
    font-size: 14px;
    font-weight: 700;
    line-height: 14.4px;
}

.custom-checkbox {
    width: 80px;
    border-radius: 6px;
    border: 1px solid var(--primary, #3478F6);
    padding: 5px 20px 5px 10px;
    gap: 10px;

}</style>
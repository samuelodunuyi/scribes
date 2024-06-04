<script setup>
import { ref, watch } from 'vue';
import trmsService from '../../services/trmsService';
import { useRouter } from 'vue-router'
import { useDashOptionStore } from "../../stores/dashOption"
import pinia from "../../stores/store";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const stores = useDashOptionStore(pinia);
const router = useRouter()
const props = defineProps(['column', 'button', 'saveValue', 'notEdit', 'selectedDealDetails'])
const emit = defineEmits(["saveValue"])
const emitSaveValue = (isCorrects) => {
    emit("saveValue", isCorrects)
}
const discountFactor = ref('')
const takingFirstInterestEarly = ref('')
const guaranteeFeeRate = ref('')
const status = ref('')
const firstCouponDate = ref('')
const issueDate = ref('')
const lastModifiedBy = ref('')
const lastModifiedDate = ref('')


watch(() => props.selectedDealDetails, (first, second) => {
    if (JSON.stringify(first) !== JSON.stringify(second)) {
        let deals = props.selectedDealDetails
        if (deals != undefined) {
            discountFactor.value = deals.amortizationDiscountFactor
            takingFirstInterestEarly.value = deals.amortizationTakingFirstInterestEarly
            guaranteeFeeRate.value = deals.amortizationGuaranteeFeeRate
            status.value = deals.amortizationStatus
            firstCouponDate.value = deals.amortizationFirstCouponDate.slice(0, 10).replace(/-/g, '-')
            issueDate.value = deals.amortizationIssueDate.slice(0, 10).replace(/-/g, '-')
            lastModifiedDate.value = deals.lastModifiedDate.slice(0, 10).replace(/-/g, '-')
            lastModifiedBy.value = deals.lastModifiedBy

        }
    }
});
watch(() => props.saveValue, async (first, second) => {
    let saveValue = props.saveValue
    let allData = props.selectedDealDetails
    emitSaveValue(false)
    if (saveValue == true && allData.dealCategory != null) {
        let ps = await trmsService.updateDealAmortizationDetails(allData.dealId, discountFactor.value, takingFirstInterestEarly.value, guaranteeFeeRate.value, status.value, firstCouponDate.value, issueDate.value, stores.signedInUserEmail, new Date().toJSON())
        if (ps == 200) {
            toast.success('Transaction Submitted Successfully')
            setTimeout(async () => {
                router.push(`/TRMS/pipelinedeals`);
            }, 1300);

        }

    }
});
const update = async () => {
    let allData = props.selectedDealDetails
    let ps = await trmsService.updateDealAmortizationDetails(allData.dealId, discountFactor.value, takingFirstInterestEarly.value, guaranteeFeeRate.value, status.value, firstCouponDate.value, issueDate.value, stores.signedInUserEmail, new Date().toJSON())
    if (ps == 200) {
        toast.success('Transaction Updated')
    }

}
</script>
<template>
    <div>
        <form>
            <div class="row g-2 pb-4 mt-3">
                <div :class="column">
                    <label class="form-label">* Discount Factor </label>
                    <input type="number" class="form-control" v-model="discountFactor" :disabled="notEdit">
                </div>
                <div :class="column">
                    <label class="form-label">* Taking First Interest Early </label>
                    <select class="form-select" v-model="takingFirstInterestEarly" :disabled="notEdit">
                        <option :value=false>No</option>
                        <option :value=true>Yes</option>
                    </select>
                </div>
                <div :class="column">
                    <label class="form-label">* Guarantee Fee Rate </label>
                    <input type="number" class="form-control" v-model="guaranteeFeeRate" :disabled="notEdit">
                </div>
                <div :class="column">
                    <label class="form-label">Status </label>
                    <input type="text" class="form-control" v-model="status" :disabled="notEdit">
                </div>

                <div :class="column">
                    <label class="form-label"> * FirstCouponDate </label>
                    <input type="date" class="form-control" v-model="firstCouponDate" :disabled="notEdit">
                </div>
                <div :class="column">
                    <label class="form-label"> * IssueDate </label>
                    <input type="date" class="form-control" v-model="issueDate" :disabled="notEdit">
                </div>
            </div>
            <div class="d-flex justify-content-end mr-2 mt-3">
                <button type="submit" class="submit-button" v-if="button == true" @click.prevent="update">Update</button>
            </div>
        </form>
        <small>Last Modified By: {{ lastModifiedBy }} at {{ lastModifiedDate }}</small>
    </div>
</template>


<style scoped>
span {
    cursor: pointer;
}

label.form-label {
    /* Capion Bold */
    font-size: 14px;
    font-weight: 700;
    line-height: 14.4px;
}

.editdeleteadd {

    font-size: 12px;
    font-weight: 400;
    line-height: 14.4px;
    /* 120% */
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
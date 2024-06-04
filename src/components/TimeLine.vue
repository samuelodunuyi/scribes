<script setup>
import { ref, watch, computed } from 'vue';
import crmService from '../../services/crmService';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const emit = defineEmits(["edit"])
const emitSelectedButton = (isCorrects) => {
    emit("edit", isCorrects)
} 
const props = defineProps(['selectedDealDetails', 'saveValue', 'isNew'])
const allActivities = ref(false)
const leadActivities = ref(false)
const dealId = ref('')

watch(() => props.selectedDealDetails, (first, second) => {
    let newTransct = props.selectedDealDetails
    if (newTransct != undefined) {
        dealId.value = newTransct.dealId
    }
});

const LeadActivity = computed(() => {
    activityforLead()
    return leadActivities.value;
})
const activityforLead = async () => {
    allActivities.value = await crmService.getActivities()
    leadActivities.value = allActivities.value.filter(o => o.regardingRecordId === dealId.value)
}
</script>

<template>
    <div>
        <div class="d-flex mb-3" v-for="activity in LeadActivity">
            <div class="avatar mr-3">
                <img src="../../assets/images/ellipse.png" alt="" class="profile-image">
            </div>
            <div class="card-container" style="width: 100%;">
                <div class="card shadow-cstm border-0">
                    <div class="card-body">
                        <div class="card-text" v-html="activity.notes"></div>
                        <div class="editdeleteadd">
                        </div>
                    </div>
                </div>
                <p class="mb-0"><small class="text-muted">{{ activity.recordOwnerFullName }} {{
                    activity.lastModifiedDate.slice(0,
                        10).replace(/-/g,
                            '/') }}</small></p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.avatar .profile-image {
    width: 35px;
    height: 35px;
    border-radius: 50%;
}

.editdeleteadd {
    font-size: 12px;
    font-weight: 400;
    line-height: 14.4px;
    /* 120% */
}

span {
    cursor: pointer;
}

.shadow-cstm {
    box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.10);
}

.card-title {
    color: var(--black, #000);
    font-size: 16px;
    font-weight: 700;
    line-height: 19.2px;
}

.card-text {
    color: #000;
    font-size: 12px;
    font-weight: 400;
    line-height: 14.4px;
}

small {
    font-size: 12px;
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
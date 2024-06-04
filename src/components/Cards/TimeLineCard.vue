<script setup>
import { ref, watch, computed } from 'vue';
import crmService from '../../services/crmService';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const emit = defineEmits(["edit"])
const emitSelectedButton = (isCorrects) => {
    emit("edit", isCorrects)
}
const props = defineProps(['selectedLeadDetails', 'saveValue', 'isNew'])
const allActivities = ref(false)
const leadActivities = ref(false)
const dialogDelete = ref(false)
const leadId = ref('')
const itemToDelete = ref('')

watch(() => props.selectedLeadDetails, (first, second) => {
    if (JSON.stringify(first) !== JSON.stringify(second)) {
        let newTransct = props.selectedLeadDetails
        if (newTransct != undefined) {
            leadId.value = newTransct.leadId
        }
    }
});

const LeadActivity = computed(() => {
    activityforLead()
    return leadActivities.value;

})

const deleteActivity = (id) => {
    itemToDelete.value = id
    dialogDelete.value = true
}
const confirmdeleteActivity = async () => {
    dialogDelete.value = true
    let ps = await crmService.deleteActivity(itemToDelete.value)
    if (ps == 200) {
        toast.success('Item deleted Successfully')
        console.log(ps)
        dialogDelete.value = false
    }
}
const activityforLead = async () => {
    allActivities.value = await crmService.getActivities()
    leadActivities.value = allActivities.value.filter(o => o.regardingRecordId === leadId.value)
}
</script>

<template>
    <div>
        <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
                <v-card-title class="text-h5">Are you sure you want to delete this Item?</v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="dialogDelete = false">Cancel</v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="confirmdeleteActivity">OK</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <div class="d-flex mb-3" v-for="activity in LeadActivity">
            <div class="avatar mr-3">
                <img src="../../assets/images/ellipse.png" alt="" class="profile-image">
            </div>
            <div class="card-container" style="width: 100%;">
                <div class="card shadow-cstm border-0">
                    <div class="card-body">
                        <h5 class="card-title">{{ activity.activitySubject }}</h5>
                        <div class="card-text" v-html="activity.notes"></div>
                        <div class="editdeleteadd">
                            <b class="card-text">Status - {{ activity.activityStatus }}</b>
                            <div class="d-flex justify-content-end mt-2">
                                <span class="mr-2 d-flex align-center" style="color: #0a38a3;"
                                    @click="emitSelectedButton(activity)">
                                    Edit/Save <v-icon icon="mdi-file-document-edit" style="margin-top: -3px;"></v-icon>
                                </span>
                                <span class="d-flex align-center" style="color: #F00;"
                                    @click="deleteActivity(activity.activityId)">
                                    Delete <v-icon icon="mdi-trash-can-outline" style="margin-top: -3px;"></v-icon>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="mb-0"><small class="text-muted"> {{ activity.recordOwnerFullName }} {{
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
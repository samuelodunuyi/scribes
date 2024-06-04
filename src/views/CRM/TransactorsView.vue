<script setup>
import TransactorDetails from '../../components/Cards/TransactorDetails.vue';

import { ref, onMounted, computed } from 'vue';
import TabMenu from '../../components/TabMenu.vue';
import ToolBarStrip from '../../components/ToolBarStrip.vue';
import administrationsService from '../../services/administrationsService';
import pinia from "../../stores/store";
import { useDashOptionStore } from "../../stores/dashOption"
const stores = useDashOptionStore(pinia);
const props = defineProps({
    headerType: {
        type: String,
        default: 'access'
    }
})
const transactors = ref([])
const selectedrow = ref('')
const selectedrowId = ref('')
const searchValue = ref('')
const filterOption = ref('')
const size = ref(20)
const pageNumber = ref(1)

const onFilterSelected = (isCorrect) => {
    filterOption.value = isCorrect
}

const onSearchValuesEntered = (isCorrect) => {
    searchValue.value = isCorrect
}

const Transactors = computed(() => {
    next()
    let transactorList = transactors.value
    // Process search input
    if (searchValue.value != '' && searchValue.value) {
        transactorList = transactorList.filter((item) => {
            return item.userId
                .toLowerCase()
                .includes(searchValue.value.toLowerCase()) ||
                item.userFullName.toLowerCase().includes(searchValue.value.toLowerCase() )
        })
    }
    // Sort by alphabetical order
    transactorList = transactorList.sort((a, b) => {
        if (filterOption.value == 'asc') {
            let fa = a.userFullName.toLowerCase(), fb = b.userFullName.toLowerCase()

            if (fa > fb) {
                return 1
            }
            if (fa < fb) {
                return -1
            }
            return 0

        }
        else if (filterOption.value == 'dsc') {
            let fa = a.userFullName.toLowerCase(), fb = b.userFullName.toLowerCase()

            if (fa < fb) {
                return 1
            }
            if (fa > fb) {
                return -1
            }
            return 0

        }
    })

    return transactorList.slice(indexStart.value, indexEnd.value)
})

const indexStart = computed(() => {
    return (pageNumber.value - 1) * size.value;
})

const indexEnd = computed(() => {
    return indexStart.value + size.value;
})  

const next = async () => {
    transactors.value = await administrationsService.getUserRoles()
}
const selectedContact = (userId, user) => {
    selectedrowId.value = userId
    selectedrow.value = user
}

</script>

<template>
    <div class="wrapper">
        <TabMenu />
        <div class="intro mt-4 ">
            <h3> Transactors </h3>
        </div>
        <ToolBarStrip @filterOptions="onFilterSelected" @searchValues="onSearchValuesEntered" />
        <div class="d-flex justify-content-between mt-4  ">
            <div class="custom-table">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">
                                    <div class="d-flex align-center gap-1">
                                        <span class="noshrink"> Name</span>

                                        <span class="d-flex flex-column align-center">
                                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                        </span>

                                    </div>
                                </th>
                                <th scope="col">
                                    <div class="d-flex align-center gap-1">
                                        <span class="noshrink"> Level</span>

                                        <span class="d-flex flex-column align-center">
                                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                        </span>

                                    </div>
                                </th>
                                <th scope="col">
                                    <div class="d-flex align-center gap-1">
                                        <span class="noshrink">Role</span>

                                        <span class="d-flex flex-column align-center">
                                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                        </span>

                                    </div>
                                </th>
                                <th scope="col">
                                    <div class="d-flex align-center gap-1">
                                        <span class="noshrink"> Email Address </span>

                                        <span class="d-flex flex-column align-center">
                                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                        </span>

                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in Transactors" style="cursor: pointer;" :key="row.userId" @click="selectedContact(row.userId, row)">
                                <td :class="{ 'highlight': (row.userId == selectedrowId) }">{{ row.userFullName }}</td>
                                <td :class="{ 'highlight': (row.userId == selectedrowId) }">{{ row.levelDescription  }}</td>
                                <td :class="{ 'highlight': (row.userId == selectedrowId) }">{{ row.roleName  }}</td>
                                <td :class="{ 'highlight': (row.userId == selectedrowId) }">{{ row.userId  }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
            <div class="side-panel">
                <h4> Details </h4>
                <TransactorDetails :topBar="selectedrow" :bottomBar="null"/>
            </div>
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

.custom-table {
    width: 64%;
}

.side-panel {
    padding: 20px;
    background: #eeeeee;
    width: 36%;

}

.highlight {
    background-color: rgb(219, 219, 219) !important;
    color: rgb(0, 0, 0) !important;
}

.accordion-body {
    padding: 10px;
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
    padding: 20px;
}

thead,
tr {
    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
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
    background: var(--gradient, linear-gradient(90deg, #227CBF 0%, #47B65C 100%));

    color: #FFF;
    /* Body Text */
    font-size: 16px;
    font-weight: 400;
    line-height: 19.2px;
}
</style>
        
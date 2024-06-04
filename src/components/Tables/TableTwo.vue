<script setup>
import GradeButton from '../GradeButton.vue';
import { computed } from "vue";

import { useDashOptionStore } from "../../stores/dashOption"
import pinia from "../../stores/store";
const props = defineProps(['details', 'data', 'dealSec', 'selectedUserList', 'fundOption'])
const stores = useDashOptionStore(pinia);

const filteredDealData = computed(() => {
    let dealUserType = props.dealSec
    var allDeals = props.data
    var filteredallDeals = null
    var filteredmyDeals = null
    allDeals = allDeals.filter(o => new Date(o.financialYearName.slice(2)).getFullYear() <= new Date(stores.financialYear.slice(2)).getFullYear())

    // allDeals = allDeals.filter(o=> new Date(o.mandateLetterDate).getFullYear() == stores.financialYear.slice(2, 6) ||
    // new Date(o.creditApprovalDate).getFullYear() == stores.financialYear.slice(2, 6) ||
    // new Date(o.actualCloseDate).getFullYear() == stores.financialYear.slice(2, 6)
    // )   

    let xl = stores.filterTableBelow.replace(' DEALS', '')
    console.log(stores.filterTableBelow)
    if (dealUserType == 'allDeals') {
        if (stores.filterTableBelow.replace(' DEALS', '').length > 0 && xl != 'TOTAL') {
            filteredallDeals = allDeals.filter(o => o.dealCategory == stores.filterTableBelow.replace(' DEALS', '') || o.dealCategory == stores.filterTableBelow.replace(' DEALS', '') || o.dealCategory == stores.filterTableBelow.replace(' DEALS', '') || o.dealCategory == stores.filterTableBelow.replace(' DEALS', ''))
        }
        else {
            filteredallDeals = allDeals.filter(o => o.dealCategory != 'CLOSED')
        }
        if(stores.filterTableBelow.replace(' DEALS', '') ==='CLOSED'){
            filteredallDeals = allDeals.filter(o => o.dealCategory == 'CLOSED' && new Date(o.actualCloseDate).getFullYear() == stores.financialYear.slice(2, 6))

        }

        if (props.fundOption != '' && props.fundOption && props.fundOption == 'BOI') {
            filteredallDeals = filteredallDeals.filter(o => o.fundOptionBOI == true)
        }
        else if (props.fundOption != '' && props.fundOption && props.fundOption == 'DCM') {
            filteredallDeals = filteredallDeals.filter(o => o.fundOptionDCM == true)
        }
        else if (props.fundOption != '' && props.fundOption && props.fundOption == 'PCB') {
            filteredallDeals = filteredallDeals.filter(o => o.fundOptionPCB == true)
        }
        return filteredallDeals
    }

    else if (dealUserType == 'myDeals' && props.selectedUserList.length == 0) {
        var myDeals = null
        if (stores.filterTableBelow.replace(' DEALS', '').length > 0 && xl != 'TOTAL') {
            myDeals = allDeals.filter(o => o.leadTransactor == stores.signedInUserEmail && o.dealCategory == stores.filterTableBelow.replace(' DEALS', '') || o.originator == stores.signedInUserEmail && o.dealCategory == stores.filterTableBelow.replace(' DEALS', '') || o.coTransactor == stores.signedInUserEmail && o.dealCategory == stores.filterTableBelow.replace(' DEALS', ''))
        }
        else {
            myDeals = allDeals.filter(o => o.leadTransactor == stores.signedInUserEmail && o.dealCategory != 'CLOSED' || o.originator == stores.signedInUserEmail && o.dealCategory != 'CLOSED' || o.coTransactor == stores.signedInUserEmail && o.dealCategory != 'CLOSED')
        }
        if(stores.filterTableBelow.replace(' DEALS', '') ==='CLOSED'){
            myDeals = allDeals.filter(o => o.leadTransactor == stores.signedInUserEmail && o.dealCategory == stores.filterTableBelow.replace(' DEALS', '') && new Date(o.actualCloseDate).getFullYear() == stores.financialYear.slice(2, 6)|| o.originator == stores.signedInUserEmail && o.dealCategory == stores.filterTableBelow.replace(' DEALS', '') && new Date(o.actualCloseDate).getFullYear() == stores.financialYear.slice(2, 6)|| o.coTransactor == stores.signedInUserEmail && o.dealCategory == stores.filterTableBelow.replace(' DEALS', '') && new Date(o.actualCloseDate).getFullYear() == stores.financialYear.slice(2, 6)) 
        }

        if (props.fundOption != '' && props.fundOption && props.fundOption == 'BOI') {
            myDeals = myDeals.filter(o => o.fundOptionBOI == true)
        }
        else if (props.fundOption != '' && props.fundOption && props.fundOption == 'DCM') {
            myDeals = myDeals.filter(o => o.fundOptionDCM == true)
        }
        else if (props.fundOption != '' && props.fundOption && props.fundOption == 'PCB') {
            myDeals = myDeals.filter(o => o.fundOptionPCB == true)
        }
        return myDeals
    }
    else if (dealUserType == 'myDeals' && props.selectedUserList.length > 0) {
        var myDeals2 = null
        if (stores.filterTableBelow.replace(' DEALS', '').length > 0 && xl != 'TOTAL') {
            myDeals2 = allDeals.filter(o => o.leadTransactor == props.selectedUserList && o.dealCategory == stores.filterTableBelow.replace(' DEALS', '') || o.originator == props.selectedUserList && o.dealCategory == stores.filterTableBelow.replace(' DEALS', ''))
        }
        else {
            myDeals2 = allDeals.filter(o => o.leadTransactor == props.selectedUserList && o.dealCategory != 'CLOSED' || o.originator == props.selectedUserList && o.dealCategory != 'CLOSED')
        }

        if(stores.filterTableBelow.replace(' DEALS', '') ==='CLOSED'){
            myDeals2 = allDeals.filter(o => o.leadTransactor == props.selectedUserList && o.dealCategory != 'CLOSED' && new Date(o.actualCloseDate).getFullYear() == stores.financialYear.slice(2, 6)|| o.originator == props.selectedUserList && o.dealCategory != 'CLOSED' && new Date(o.actualCloseDate).getFullYear() == stores.financialYear.slice(2, 6))
        }

        if (props.fundOption != '' && props.fundOption && props.fundOption == 'BOI') {
            myDeals2 = myDeals2.filter(o => o.fundOptionBOI == true)
        }
        else if (props.fundOption != '' && props.fundOption && props.fundOption == 'DCM') {
            myDeals2 = myDeals2.filter(o => o.fundOptionDCM == true)
        }
        else if (props.fundOption != '' && props.fundOption && props.fundOption == 'PCB') {
            myDeals2 = myDeals2.filter(o => o.fundOptionPCB == true)
        }
        return myDeals2
    }
})
const navigatePages = (id) => {
    if(stores.signedInUserEmail=='cazubike@infracredit.ng' || stores.signedInUserEmail=='iagunbiade@infracredit.ng' || stores.signedInUserEmail=='conyilimba@infracredit.ng'){
        router.push(`/trms/pipelinedeals_/detail/${id}`);

    }
    else{
        router.push(`/trms/pipelinedeals/detail/${id}`);
    }
}
</script>
<template>
    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">
                        <div class="d-flex align-center gap-1">
                            <span class="noshrink"> S/N</span>

                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                        </div>
                    </th>
                    <th scope="col">
                        <div class="d-flex align-center gap-1">
                            <span class="noshrink"> Deal Id</span>

                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                        </div>
                    </th>
                    <th scope="col"  style="width: 150px;">
                        <div class="d-flex align-center gap-1">
                            <span> Client </span>

                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                        </div>
                    </th>
                    <th scope="col">
                        <div class="d-flex align-center gap-1">
                            <span> Transaction Name </span>

                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                        </div>
                    </th>
                    <th scope="col">
                        <div class="d-flex align-center gap-1">
                            <span> Originator </span>
                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                        </div>
                    </th>
                    <th scope="col">
                        <div class="d-flex align-center gap-1">
                            <span> Transactor</span>

                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                        </div>
                    </th>
                    <th scope="col">
                        <div class="d-flex align-center gap-1">
                            <span>Industry </span>

                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                        </div>
                    </th>
                    <th scope="col">

                        <div class="d-flex align-center gap-1">
                            <span> Product </span>

                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                        </div>
                    </th>
                    <th scope="col">

                        <div class="d-flex align-center gap-1">
                            <span>Status</span>

                            <span class="d-flex flex-column align-center">
                                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                            </span>

                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-on:click="navigatePages(d.dealId)" v-for="(d, index) in filteredDealData">
                    <td scope="row">{{ index+1 }}</td>
                    <td >{{ d.dealId }}</td>
                    <td>{{ d.companyName }}</td>
                    <td>{{ d.transactionName }}</td>
                    <td>{{ d.originatorName }}</td>
                    <td>{{ d.leadTransactorName }}</td>
                    <td>{{ d.industrySector }}</td>
                    <td>{{ d.productDescription }}</td>
                    <td>
                        <GradeButton :grade="d.dealCategory" />
                    </td>
                </tr>

            </tbody>
        </table>
    </div>
</template>

<style scoped>
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
    cursor: pointer;
}

npm run dev thead,
tr {
    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}

.noshrink {
    display: flex;
    flex-shrink: 0;
}
</style>
<script setup>
import { ref, onMounted, watch } from 'vue';
import TabMenu from '../../components/TabMenu.vue';
import ReportSubMenu from '../../components/ReportSubMenu.vue';
import trmsService from '../../services/trmsService';
import { useDashOptionStore } from "../../stores/dashOption"
import pinia from "../../stores/store";

const stores = useDashOptionStore(pinia);
const trmsList = ref([])
const totalSize = ref(0)

onMounted(() => {
    trmsDetails()
})

const trmsDetails = async () => {
    let list = await trmsService.getDeals()
    trmsList.value = list.filter(o => new Date(o.mandateLetterDate).getFullYear() == stores.financialYear.slice(2, 6))

    const cartPricesArrayString = trmsList.value.map(function (item) {
        return item.dealSize;
    });
    totalSize.value = cartPricesArrayString.reduce((partialSum, a) => (partialSum + a), 0);
    totalSize.value = parseFloat(totalSize.value).toFixed(2)
}

watch(() => stores.financialYear, (first, second) => {
    trmsDetails()

});
</script>
<template>
    <div class="wrapper">
        <div>
            <TabMenu />
            <div class="intro mt-4">
                <h3> Report </h3>
                <ReportSubMenu />
            </div>
        </div>
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> S/N </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Infrastructure Entity </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Infrastructure Activity </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Brief Description </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Size(N'b) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>NBC/Mandate Status </span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(i, index) in trmsList" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ i.companyName }}r</td>
                        <td>{{ i.productDescription }} ({{ i.industrySector }})</td>
                        <td>• A real estate dev elopment, brokerage, and marketing company. Whilst the main stay of the
                            business has been marketing and sale of real estate properties, the Company has evolved over the
                            last
                            few years to become a housing dev eloper with a key focus on building EDGE certified (green)
                            affordable residential homes, hostel apartments, and hotels across key cities in Nigeria</td>
                        <td>*N{{ i.dealSize }} </td>
                        <td v-if="i.nbcSubmissionDate == '1996-01-01T00:00:00'">• Awaiting NBC Submission <br>• Approved Nov
                            ’22 <br>• Executed Mandate</td>
                        <td
                            v-if="i.nbcSubmissionDate != '1996-01-01T00:00:00' && i.nbcApprovalDate == '1996-01-01T00:00:00' && i.nbcMandatedDate == null">
                            • Submitted {{ new Date(i.nbcSubmissionDate).getMonth() + 1 }}, {{ new
                                Date(i.nbcSubmissionDate).getFullYear() }} <br>• Awaiting Approval <br>• Awaiting NBC Mandate
                        </td>
                        <td
                            v-if="i.nbcSubmissionDate != '1996-01-01T00:00:00' && i.nbcApprovalDate != '1996-01-01T00:00:00' && i.nbcMandatedDate == null">
                            • Submitted {{ new Date(i.nbcSubmissionDate).getMonth() + 1 }}, {{ new
                                Date(i.nbcSubmissionDate).getFullYear() }} <br>• Approved {{ new
        Date(i.nbcApprovalDate).getMonth() + 1 }}, {{ new Date(i.nbcApprovalDate).getFullYear() }}<br>•
                            Awaiting NBC Mandate</td>
                        <td
                            v-if="i.nbcSubmissionDate != '1996-01-01T00:00:00' && i.nbcApprovalDate != '1996-01-01T00:00:00' && i.nbcMandatedDate != null">
                            • Submitted {{ new Date(i.nbcSubmissionDate).getMonth() + 1 }}, {{ new
                                Date(i.nbcSubmissionDate).getFullYear() }} <br>• Approved {{ new
        Date(i.nbcApprovalDate).getMonth() + 1 }}, {{ new Date(i.nbcApprovalDate).getFullYear() }}<br>•
                            Executed Mandate {{ new Date(i.nbcMandatedDate).getMonth() + 1 }}, {{ new
                                Date(i.nbcMandatedDate).getFullYear() }}</td>
                        <td
                            v-if="i.nbcSubmissionDate != '1996-01-01T00:00:00' && i.nbcApprovalDate == '1996-01-01T00:00:00' && i.nbcMandatedDate != null">
                            • Submitted {{ new Date(i.nbcSubmissionDate).getMonth() + 1 }}, {{ new
                                Date(i.nbcSubmissionDate).getFullYear() }} <br>• Awaiting Approval <br>• Executed Mandate {{ new
        Date(i.nbcMandatedDate).getMonth() + 1 }}, {{ new Date(i.nbcMandatedDate).getFullYear() }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="d-flex justify-content-between bottom">
            <div style="font-size: 24px;font-style: normal; font-weight: 500; line-height: 28.8px;">Aggregate NBC
                Submissions: {{ trmsList.length }}</div>
            <div style="font-size: 24px;font-style: normal; font-weight: 500; line-height: 28.8px;">Total Size:
                ₦{{ totalSize }}
                Billion</div>
        </div>
    </div>
</template>
<style scoped>
.chart-box-3 {
    width: 27%;
    align-items: center;
    margin: 0px auto;
    text-align: center;
    padding: 20px 0px;
}

.bottom {
    margin: -20px 0px 10px 0px;
    padding: 20px;
    border: 1px solid var(--Grey-Light, #EEE);
    background: var(--White, #FFF);
    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}

thead tr th {
    font-size: 12px;
    font-weight: 600;
    line-height: 14.4px;
    padding: 15px;
}

tbody tr td {
    color: var(--grey-dark, #808080);
    font-size: 12px;
    font-weight: 400;
    line-height: 14.4px;
    padding: 20px 15px;
    cursor: pointer;
}

thead,
tr {
    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}

tr:hover {
    background: #4b4a4a;
    background-color: rgba(0, 0, 0, 0.1);
}

.noshrink {
    display: flex;
    flex-shrink: 0;
}
</style>
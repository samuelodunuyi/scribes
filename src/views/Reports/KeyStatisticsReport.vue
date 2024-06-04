<script setup>
import { ref, computed } from 'vue';
import ToolBar from '../../components/ToolBar.vue';
import TabMenu from '../../components/TabMenu.vue';
import ReportSubMenu from '../../components/ReportSubMenu.vue';
import trmsService from '../../services/trmsService';
import { useDashOptionStore } from "../../stores/dashOption"
import pinia from "../../stores/store";

const stores = useDashOptionStore(pinia);
const searchValue = ref('')
const deals_ = ref([])
const SummaryofKeyOrigination_StructuringForTheMonth = ref([])
const periodEndingStatistics = ref([])
const march = ref([])
const newGuarantees = ref('')
const year = ref('')
const month = ref('')


const pipelineDeals = computed(() => {
    var allDeals = null
    next()
    year.value = stores.financialYear.slice(2)
    month.value = new Date(year.value).getMonth()
    var d = new Date();
    var m = d.getMonth();
    d.setMonth(d.getMonth() + 6);
    var diff = (m + 12 - d.getMonth()) % 12;
    if (diff > 6) d.setDate(0)

    allDeals = deals_.value;
    var allDealsPresent = allDeals.filter(o => new Date(o.financialYearName.slice(2)).getFullYear() == new Date(stores.financialYear.slice(2)).getFullYear())
    var allDealsEver = allDeals.filter(o => o.dealCategory != "CLOSED")
    var mandatedDealsPipeline = allDealsPresent.filter(o => o.dealCategory == "RED")
    var newGuarantees = allDealsPresent

    var nbcApprovals = allDealsPresent.filter(o => new Date(o.nbcApprovalDate).getFullYear() == stores.financialYear.slice(2, 6))
    var newSignedMandates = allDealsPresent.filter(o => o.mandateLetterSigned == true && new Date(o.mandateLetterDate).getFullYear() == stores.financialYear.slice(2, 6))
    var ccApprovals = allDealsPresent.filter(o => o.creditCommitteeApprovalObtained == true && new Date(o.creditApprovalDate).getFullYear() == stores.financialYear.slice(2, 6))
    var closedDeals = allDealsPresent.filter(o => o.financialCloseReached == true && new Date(o.actualCloseDate).getFullYear() == stores.financialYear.slice(2, 6))
    var creditApprovedMandatesLessthan6Months = allDealsPresent.filter(o => o.creditCommitteeApprovalObtained == true && d.toJSON().slice(0, 10).replace(/-/g, '-') <= new Date(o.actualCloseDate).toJSON().slice(0, 10).replace(/-/g, '-') && new Date(o.creditApprovalDate).toJSON().slice(0, 10).replace(/-/g, '-') <= new Date().toJSON().slice(0, 10).replace(/-/g, '-'))
    var creditApprovedMandatesGreaterthan6Months = allDealsPresent.filter(o => o.creditCommitteeApprovalObtained == true && d.toJSON().slice(0, 10).replace(/-/g, '-') >= new Date(o.actualCloseDate).toJSON().slice(0, 10).replace(/-/g, '-') && new Date(o.creditApprovalDate).toJSON().slice(0, 10).replace(/-/g, '-') >= new Date().toJSON().slice(0, 10).replace(/-/g, '-'))
    var nbcApprovalsByPresentMonth = nbcApprovals.filter(o => new Date(o.nbcApprovalDate).getMonth() == new Date().getMonth())
    var nbcSubmissionsByPresentMonth = allDealsPresent.filter(o => new Date(o.nbcSubmissionDate).getMonth() == new Date().getMonth())
    var ccSubmissionsByPresentMonth = allDealsPresent.filter(o => new Date(o.ccSubmissionDate).getMonth() == new Date().getMonth())
    var nbcSubmissions = allDealsPresent.filter(o => new Date(o.nbcSubmissionDate).getFullYear() == stores.financialYear.slice(2, 6))
    var feeLetterExecutedPresenetMonth = allDealsPresent.filter(o => new Date(o.feeLetterDate).getMonth() == new Date().getMonth())
    var feeLetterExecuted = allDealsPresent.filter(o => new Date(o.feeLetterDate).getFullYear() == stores.financialYear.slice(2, 6))


    var noOfNewSignedMandates = newSignedMandates.length
    var noOfNewSignedNBC = nbcApprovals.length
    var noOfNewSubmittedNBC = nbcSubmissions.length
    var noOfNewSignedCC = ccApprovals.length
    var noOfGuaranteedDealsEver = allDealsEver.length
    var noOfGuaranteedDeals = allDealsPresent.length
    var noOfNbcApprovalsByPresentMonth = nbcApprovalsByPresentMonth.length


    //nbc Months Deal Size
    const cartPricesArrayNewGuarantees = newGuarantees.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayNBCSubmitperMonth = nbcSubmissionsByPresentMonth.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayFeeLetterExecuted = feeLetterExecuted.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayCCSubmitperMonth = ccSubmissionsByPresentMonth.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayFeeLetterExecutedPerMonth = feeLetterExecutedPresenetMonth.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayNBCSubmissions = nbcSubmissions.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayNewSignedMandates = newSignedMandates.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayNBC = nbcApprovals.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayCC = ccApprovals.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayAllGuaranteeDealsEver = allDealsEver.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArraynbcApprovalsByPresentMonth = nbcApprovalsByPresentMonth.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayccApprovedLessthan6Months = creditApprovedMandatesLessthan6Months.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayccApprovedGreaterthan6Months = creditApprovedMandatesGreaterthan6Months.map(function (item) {
        return item.dealSize;
    });

    var newGuaranteesSum = cartPricesArrayNewGuarantees.reduce((partialSum, a) => (partialSum + a), 0);
    var newMandatesSignedSum = cartPricesArrayNewSignedMandates.reduce((partialSum, a) => (partialSum + a), 0);
    var newNbcSignedSum = cartPricesArrayNBC.reduce((partialSum, a) => (partialSum + a), 0);
    var newCcSignedSum = cartPricesArrayCC.reduce((partialSum, a) => (partialSum + a), 0);
    var allGuaranteeDealsEverSum = cartPricesArrayAllGuaranteeDealsEver.reduce((partialSum, a) => (partialSum + a), 0);
    var nbcApprovalsByPresentMonthSum = cartPricesArraynbcApprovalsByPresentMonth.reduce((partialSum, a) => (partialSum + a), 0);
    var nbcSubmissionsSum = cartPricesArrayNBCSubmissions.reduce((partialSum, a) => (partialSum + a), 0);
    var nbcSubmissionByPresentMonthSum = cartPricesArrayNBCSubmitperMonth.reduce((partialSum, a) => (partialSum + a), 0);
    var ccSubmissionByPresentMonthSum = cartPricesArrayCCSubmitperMonth.reduce((partialSum, a) => (partialSum + a), 0);
    var ccLess6MonthsSum = cartPricesArrayccApprovedLessthan6Months.reduce((partialSum, a) => (partialSum + a), 0);
    var ccGreater6MonthsSum = cartPricesArrayccApprovedGreaterthan6Months.reduce((partialSum, a) => (partialSum + a), 0);
    var feeLetterExecutedPresentMonthSum = cartPricesArrayFeeLetterExecutedPerMonth.reduce((partialSum, a) => (partialSum + a), 0);
    var feeLetterExecutedSum = cartPricesArrayFeeLetterExecuted.reduce((partialSum, a) => (partialSum + a), 0);


    let summaryOfKeyActivities = [
        {
            id: 0,
            name: "New Guarantees Executed ",
            value: noOfGuaranteedDeals
        },
        {
            id: 1,
            name: "Size of New Guarantees Executed ",
            value: `${newGuaranteesSum} billion`,
        },
        {
            id: 2,
            name: "New Mandates Signed (incl. Follow-On Mandates)",
            value: noOfNewSignedMandates,
        },
        {
            id: 3,
            name: "Size of New Mandates Signed",
            value: `${newMandatesSignedSum} billion`,
        },
        {
            id: 4,
            name: "Size of Follow-On Mandates",
            value: `${0} billion`,
        },
        {
            id: 5,
            name: "New Business Committee (NBC) Approvals",
            value: noOfNewSignedNBC,
        },
        {
            id: 6,
            name: "% NBC Approvals Converted to Mandates (#)",
            value: 100,
        },
        {
            id: 7,
            name: "No. of Credit Committee Approved Deals",
            value: noOfNewSignedCC,
        },
        {
            id: 8,
            name: "% NBC Approvals Converted to Mandates (#)",
            value: 80,
        },
        {
            id: 9,
            name: "Size of Credit Approved Deals (Active)",
            value: `${newCcSignedSum} billion`,
        },
        {
            id: 10,
            name: "% of Credit App. Deals converted to Portfolio (value)",
            value: 80,
        },
    ]

    periodEndingStatistics.value = [
        {
            id: 0,
            name: "No. of Guaranteed Transactions Since Inception",
            value: noOfGuaranteedDealsEver

        },
        {
            id: 1,
            name: "Size of Guaranteed Transactions Since Inception",
            value: `${ allGuaranteeDealsEverSum} Billion`,
        },
        {
            id: 2,
            name: "Size of Mandated Deal Pipeline (cum. excl closed)",
            value: `${newMandatesSignedSum} Billion`

        },
        {
            id: 3,
            name: "Credit-Approved Mandates (to close in &lt6 months)",
            value: `${ ccLess6MonthsSum} Billion`,
        },
        {
            id: 4,
            name: "Credit-Approved Mandates (to close in >6 months)",
            value: `${ ccGreater6MonthsSum} Billion`
        }
    ]

    SummaryofKeyOrigination_StructuringForTheMonth.value = [
        {
            id: 0,
            name: 'New Business Committee (NBC) Submissions in the month',
            value: noOfNewSubmittedNBC,
        },
        {
            id: 1,
            name: 'Size of New Business Committee (NBC) Submissions in the month',
            value:  `${nbcSubmissionByPresentMonthSum} Billion`,
        },
        {
            id: 2,
            name: 'Size of New Business Committee (NBC) Submissions in the year',
            value:  `${nbcSubmissionsSum} Billion`,
        },
        {
            id: 3,
            name: 'New Business Committee (NBC) Approvals for the month',
            value:  `${noOfNbcApprovalsByPresentMonth} Billion`,
        },
        {
            id: 4,
            name: 'Size of New Business Committee (NBC) Approvals for the month',
            value:  `${nbcApprovalsByPresentMonthSum} Billion`,
        },
        {
            id: 5,
            name: 'New Mandates Signed (incl. Follow-On Mandates) in the year',
            value:  `${noOfNewSignedMandates} Billion`,
        },
        {
            id: 6,
            name: 'Size of New Mandates Signed in the month',
            value:  `${newMandatesSignedSum} Billion`,
        },
        {
            id: 7,
            name: 'Size of Follow-On Mandates',
            value:  `${0} Billion`,
        },
        {
            id: 8,
            name: 'No. of Credit Committee Submissions in the month',
            value:  `${ccSubmissionByPresentMonthSum} Billion`,
        },
        {
            id: 9,
            name: 'Size of Fee Letters executed in the month ',
            value:  `${feeLetterExecutedPresentMonthSum} Billion`,
        },
        {
            id: 10,
            name: 'Size of Fee Letters executed (Aggregate)',
            value:  `${feeLetterExecutedSum} Billion`,
        }
    ]

    return summaryOfKeyActivities
})

const next = async () => {
    deals_.value = await trmsService.getDeals()
}
 
</script>
<template>
    <div class="wrapper">
        <div>
            <TabMenu />
            <div class="intro mt-4 ">
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
                                <span> SUMMARY OF KEY ACTIVITY </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> {{ year }} </span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="i in pipelineDeals" :key="i.id">
                        <td>{{ i.name }} </td>
                        <td>{{ i.value }} </td>
                    </tr>
                </tbody>
            </table>

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> PERIOD ENDING STATISTICS </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> {{ year }} </span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="i in periodEndingStatistics" :key="i.id">
                        <td>{{i.name}}</td>
                        <td>{{i.value}}</td>
                    </tr>
                </tbody>
            </table>




            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Summary of Key Origination and Structuring Activities for the Month</span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> July {{year}} </span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="i in SummaryofKeyOrigination_StructuringForTheMonth" :key="i.id">
                        <td>{{ i.name }}</td>
                        <td>{{ i.value }}</td>
                    </tr>
                </tbody>
            </table>
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

thead tr th {
    font-size: 12px;
    font-weight: 600;
    color: white;
    background-color: #4472C4;
}

tbody tr td {
    color: black;
    font-size: 12px;
    border: 1px solid #4472C4;
    font-weight: 400;
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
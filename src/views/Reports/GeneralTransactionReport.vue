<script setup>
import { ref, computed, onMounted } from "vue";
import TableThree from '../../components/Tables/TableThree.vue';
import TabMenu from '../../components/TabMenu.vue';
import trmsService from "../../services/trmsService";
import ReportSubMenu from '../../components/ReportSubMenu.vue';
import PieChartDeal from '../../components/Charts/ChartReport.vue';
const allDealsData = ref([])
const dealStats2 = ref([])
const closedTotal = ref(0)

onMounted(async () => {
    allDealsData.value = await trmsService.getDeals()
});

const computedTileData = computed(() => {
    if (allDealsData.value != null && allDealsData.value.length != 0) {
        let allDeals = allDealsData.value
        var red = allDeals.filter(o => o.dealCategory == 'RED')
        var amber = allDeals.filter(o => o.dealCategory == 'AMBER')
        var green = allDeals.filter(o => o.dealCategory == 'GREEN')
        var closed = allDeals.filter(o => o.dealCategory == 'CLOSED')

        let numofRed = red.length
        let numofAmber = amber.length
        let numofGreen = green.length

        let numofTotal = numofRed + numofAmber + numofGreen
        const cartPricesArray = red.map(({ dealId, leadId, companyId, companyDescription, originator, leadTransactor, coTransactor,
            transactorLegal, administrator, createdBy, lastModifiedBy, createdDate, lastModifiedDate, recordOwner, transactionPhase, transactionDescription, industryId, productId, regionCode, amountInMN, couponPercent, tenorInYrs, moratoriumInYrs, repaymentFrequency, amortisationStyle,
            mandateLetterDate, creditApprovalDate, feeLetterDate, expectedCloseDate, actualCloseDate, nbcApprovalDate, nbcSubmissionDate,
            ccSubmissionDate, advanceInMN, advancePercent, finalPercent, guaranteePercent, monitoringInMN, reimbursableInMNcount, ...rest }) => ({ ...rest }))
        const cartPricesArrayString = cartPricesArray.map(function (item) {
            return item.dealSize;
        });
        const cartPricesArray2 = amber.map(({ dealId, leadId, companyId, companyDescription, originator, leadTransactor, coTransactor,
            transactorLegal, administrator, createdBy, lastModifiedBy, createdDate, lastModifiedDate, recordOwner, transactionPhase, transactionDescription, industryId, productId, regionCode, amountInMN, couponPercent, tenorInYrs, moratoriumInYrs, repaymentFrequency, amortisationStyle,
            mandateLetterDate, creditApprovalDate, feeLetterDate, expectedCloseDate, actualCloseDate, nbcApprovalDate, nbcSubmissionDate,
            ccSubmissionDate, advanceInMN, advancePercent, finalPercent, guaranteePercent, monitoringInMN, reimbursableInMNcount, ...rest }) => ({ ...rest }))
        const cartPricesArrayString2 = cartPricesArray2.map(function (item) {
            return item.dealSize;
        });
        const cartPricesArray3 = green.map(({ dealId, leadId, companyId, companyDescription, originator, leadTransactor, coTransactor,
            transactorLegal, administrator, createdBy, lastModifiedBy, createdDate, lastModifiedDate, recordOwner, transactionPhase, transactionDescription, industryId, productId, regionCode, amountInMN, couponPercent, tenorInYrs, moratoriumInYrs, repaymentFrequency, amortisationStyle,
            mandateLetterDate, creditApprovalDate, feeLetterDate, expectedCloseDate, actualCloseDate, nbcApprovalDate, nbcSubmissionDate,
            ccSubmissionDate, advanceInMN, advancePercent, finalPercent, guaranteePercent, monitoringInMN, reimbursableInMNcount, ...rest }) => ({ ...rest }))
        const cartPricesArrayString3 = cartPricesArray3.map(function (item) {
            return item.dealSize;
        });
        const cartPricesArray4 = closed.map(({ dealId, leadId, companyId, companyDescription, originator, leadTransactor, coTransactor,
            transactorLegal, administrator, createdBy, lastModifiedBy, createdDate, lastModifiedDate, recordOwner, transactionPhase, transactionDescription, industryId, productId, regionCode, amountInMN, couponPercent, tenorInYrs, moratoriumInYrs, repaymentFrequency, amortisationStyle,
            mandateLetterDate, creditApprovalDate, feeLetterDate, expectedCloseDate, actualCloseDate, nbcApprovalDate, nbcSubmissionDate,
            ccSubmissionDate, advanceInMN, advancePercent, finalPercent, guaranteePercent, monitoringInMN, reimbursableInMNcount, ...rest }) => ({ ...rest }))
        const cartPricesArrayString4 = cartPricesArray4.map(function (item) {
            return item.dealSize;
        });

        let redTotalDealSize = cartPricesArrayString.reduce((partialSum, a) => (partialSum + a), 0);
        let greenTotalDealSize = cartPricesArrayString3.reduce((partialSum, a) => (partialSum + a), 0);
        let amberTotalDealSize = cartPricesArrayString2.reduce((partialSum, a) => (partialSum + a), 0);
        closedTotal.value = cartPricesArrayString4.reduce((partialSum, a) => (partialSum + a), 0);
        const total = redTotalDealSize + greenTotalDealSize + amberTotalDealSize

        let REDPercentageDealSize = ((redTotalDealSize / total) * 100).toFixed(0)
        let AMBERPercentageDealSize = ((amberTotalDealSize / total) * 100).toFixed(0)
        let GREENPercentageDealSize = ((greenTotalDealSize / total) * 100).toFixed(0)
        return dealStats2.value = [
            {
                "title": "Red Deals",
                "number": numofRed,
                "percentage": REDPercentageDealSize,
                "amount": parseFloat(redTotalDealSize).toFixed(2),
                "chartData": [23, 60, 23, 43, 12, 63],
                "style": "#D12134",
                "tooltip": "Mandate Letter signed"
            },
            {
                "title": "Amber Deals",
                "number": numofAmber,
                "percentage": AMBERPercentageDealSize,
                "amount": parseFloat(amberTotalDealSize).toFixed(2),
                "chartData": [1, 2, 5, 60, 23, 43],
                "style": "#DB8A00",
                "tooltip": "Deal has obtained Credit Committee approval"
            },
            {
                "title": "Green Deals",
                "number": numofGreen,
                "percentage": GREENPercentageDealSize,
                "amount": parseFloat(greenTotalDealSize).toFixed(2),
                "chartData": [1, 2, 23, 43, 12, 9],
                "style": "#298729",
                "tooltip": "Deals that has Executed Fee Letter and/or Guarantee Documentation Guarantee Document in agreed form"
            },
            {
                "title": "Total Deals",
                "number": numofTotal,
                "amount": parseFloat(total).toFixed(2),
                "chartData": [2, 23, 49, 72, 32],
                "style": "#237CBF",
                "tooltip": "All TRMS Deals"
            }
        ]
    }
})

dealStats2.value = [
    {
        "title": "Red Deals",
        "number": 0,
        "amount": `0bn`,
        "chartData": [0, 0, 0, 0, 0, 0],
        "style": "#D12134",
        "tooltip": "Mandate Letter signed"
    },
    {
        "title": "Amber Deals",
        "number": 0,
        "amount": `0bn`,
        "chartData": [0, 0, 0, 0, 0, 0],
        "style": "#DB8A00",
        "tooltip": "Deal has obtained Credit Committee approval"
    },
    {
        "title": "Green Deals",
        "number": 0,
        "amount": `0bn`,
        "chartData": [0, 0, 0, 0, 0, 0],
        "style": "#298729",
        "tooltip": "Deals that has Executed Fee Letter and/or Guarantee Documentation Guarantee Document in agreed form"
    },
    {
        "title": "Total Deals",
        "number": 0,
        "amount": `0bn`,
        "chartData": [0, 0, 0, 0, 0, 0],
        "style": "#237CBF",
        "tooltip": "All TRMS Deals"
    }
]

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
        <div class="chart-box-3 box-padded">
            <h4 class="box-title">Guarantee Pipeline Categorization </h4>
            <div class="d-flex">
                <PieChartDeal chart-id="reportChart" :chartData="computedTileData" />
                <h5 class="new">Closed: ₦{{
                    parseFloat(closedTotal).toFixed(2) }}bn</h5>
            </div>
        </div>
        <TableThree></TableThree>
    </div>
</template>
<style scope>
.new {
    background-color: rgb(212, 212, 207);
    color: rgb(0, 0, 0);
    max-width: 210px;
    padding: 15px 10px 0px 10px;
    height: 50px;
    right: 330px;
    position: relative;
    border-radius: 40px;
    margin-top: 270px;
}

.chart-box-3 {
    align-items: center;
    text-align: center;
    padding: 20px 0px;
}

.wrapper {
    padding: 20px 50px;
    background: #fafafb;
}

.box-padded {
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin: 20px auto;
    background: #FFFFFF;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}
</style>
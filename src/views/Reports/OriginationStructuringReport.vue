<script setup>
import { ref, computed } from 'vue';
import TabMenu from '../../components/TabMenu.vue';
import ReportSubMenu from '../../components/ReportSubMenu.vue';
import trmsService from '../../services/trmsService';
import { useDashOptionStore } from "../../stores/dashOption"
import pinia from "../../stores/store";

const stores = useDashOptionStore(pinia);
const searchValue = ref('')
const deals_ = ref([])
const january = ref([])
const february = ref([])
const march = ref([])
const april = ref([])
const may = ref([])
const june = ref([])
const july = ref([])
const august = ref([])
const september = ref([])
const october = ref([])
const november = ref([])
const december = ref([])
const filterOption = ref('')
const pageNumber = ref(1)
const numofNbcApprovals = ref(1)
const numofSignedMandates = ref(1)
const numofccApprovals = ref(1)
const numofClosedDeals = ref(1)

const onFilterSelected = (isCorrect) => {
    filterOption.value = isCorrect
}

const onSearchValuesEntered = (isCorrect) => {
    searchValue.value = isCorrect
}

const pipelineDeals = computed(() => {
    var allDeals = null
    next()
    var d = new Date(stores.financialYear.slice(2))
    d.setFullYear(d.getFullYear() - 1);
    var lastYear = d.getFullYear()

    allDeals = deals_.value;
    var allDealsPresent = allDeals.filter(o => new Date(o.financialYearName.slice(2)).getFullYear() == new Date(stores.financialYear.slice(2)).getFullYear())
    var allDealsPast = allDeals.filter(o => new Date(o.financialYearName.slice(2)).getFullYear() <= lastYear)


    var nbcApprovals = allDealsPresent.filter(o => new Date(o.nbcApprovalDate).getFullYear() == stores.financialYear.slice(2, 6))
    var signedMandates = allDealsPresent.filter(o => o.mandateLetterSigned == true && new Date(o.mandateLetterDate).getFullYear() == stores.financialYear.slice(2, 6))
    var ccApprovals = allDealsPresent.filter(o => o.creditCommitteeApprovalObtained == true && new Date(o.creditApprovalDate).getFullYear() == stores.financialYear.slice(2, 6))
    var closedDeals = allDealsPresent.filter(o => o.financialCloseReached == true && new Date(o.actualCloseDate).getFullYear() == stores.financialYear.slice(2, 6))

    var nbcApprovals_past = allDealsPast.filter(o => new Date(o.nbcApprovalDate).getFullYear() == stores.financialYear.slice(2, 6))
    var signedMandates_past = allDealsPast.filter(o => o.mandateLetterSigned == true && new Date(o.mandateLetterDate).getFullYear() == stores.financialYear.slice(2, 6))
    var ccApprovals_past = allDealsPast.filter(o => o.creditCommitteeApprovalObtained == true && new Date(o.creditApprovalDate).getFullYear() == stores.financialYear.slice(2, 6))
    var closedDeals_past = allDealsPast.filter(o => o.financialCloseReached == true && new Date(o.actualCloseDate).getFullYear() == stores.financialYear.slice(2, 6))
    
    console.log(lastYear)

    console.log(nbcApprovals_past)

    //nbcApproval By Month
    var nbcApprovals_Jan = nbcApprovals.filter(o => new Date(o.nbcApprovalDate).getMonth() == '1')
    var nbcApprovals_Feb = nbcApprovals.filter(o => new Date(o.nbcApprovalDate).getMonth() == '2')
    var nbcApprovals_March = nbcApprovals.filter(o => new Date(o.nbcApprovalDate).getMonth() == '3')
    var nbcApprovals_Apr = nbcApprovals.filter(o => new Date(o.nbcApprovalDate).getMonth() == '4')
    var nbcApprovals_May = nbcApprovals.filter(o => new Date(o.nbcApprovalDate).getMonth() == '5')
    var nbcApprovals_June = nbcApprovals.filter(o => new Date(o.nbcApprovalDate).getMonth() == '6')
    var nbcApprovals_July = nbcApprovals.filter(o => new Date(o.nbcApprovalDate).getMonth() == '7')
    var nbcApprovals_Aug = nbcApprovals.filter(o => new Date(o.nbcApprovalDate).getMonth() == '8')
    var nbcApprovals_Sept = nbcApprovals.filter(o => new Date(o.nbcApprovalDate).getMonth() == '9')
    var nbcApprovals_Oct = nbcApprovals.filter(o => new Date(o.nbcApprovalDate).getMonth() == '10')
    var nbcApprovals_Nov = nbcApprovals.filter(o => new Date(o.nbcApprovalDate).getMonth() == '11')
    var nbcApprovals_Dec = nbcApprovals.filter(o => new Date(o.nbcApprovalDate).getMonth() == '12')

    var nbcApprovals_Jan_Past = nbcApprovals_past.filter(o => new Date(o.nbcApprovalDate).getMonth() == '1')
    var nbcApprovals_Feb_Past = nbcApprovals_past.filter(o => new Date(o.nbcApprovalDate).getMonth() == '2')
    var nbcApprovals_March_Past = nbcApprovals_past.filter(o => new Date(o.nbcApprovalDate).getMonth() == '3')
    var nbcApprovals_Apr_Past = nbcApprovals_past.filter(o => new Date(o.nbcApprovalDate).getMonth() == '4')
    var nbcApprovals_May_Past = nbcApprovals_past.filter(o => new Date(o.nbcApprovalDate).getMonth() == '5')
    var nbcApprovals_June_Past = nbcApprovals_past.filter(o => new Date(o.nbcApprovalDate).getMonth() == '6')
    var nbcApprovals_July_Past = nbcApprovals_past.filter(o => new Date(o.nbcApprovalDate).getMonth() == '7')
    var nbcApprovals_Aug_Past = nbcApprovals_past.filter(o => new Date(o.nbcApprovalDate).getMonth() == '8')
    var nbcApprovals_Sept_Past = nbcApprovals_past.filter(o => new Date(o.nbcApprovalDate).getMonth() == '9')
    var nbcApprovals_Oct_Past = nbcApprovals_past.filter(o => new Date(o.nbcApprovalDate).getMonth() == '10')
    var nbcApprovals_Nov_Past = nbcApprovals_past.filter(o => new Date(o.nbcApprovalDate).getMonth() == '11')
    var nbcApprovals_Dec_Past = nbcApprovals_past.filter(o => new Date(o.nbcApprovalDate).getMonth() == '12')

    //signedMandates By Month
    var signedMandates_Jan = signedMandates.filter(o => new Date(o.mandateLetterDate).getMonth() == '1')
    var signedMandates_Feb = signedMandates.filter(o => new Date(o.mandateLetterDate).getMonth() == '2')
    var signedMandates_March = signedMandates.filter(o => new Date(o.mandateLetterDate).getMonth() == '3')
    var signedMandates_Apr = signedMandates.filter(o => new Date(o.mandateLetterDate).getMonth() == '4')
    var signedMandates_May = signedMandates.filter(o => new Date(o.mandateLetterDate).getMonth() == '5')
    var signedMandates_June = signedMandates.filter(o => new Date(o.mandateLetterDate).getMonth() == '6')
    var signedMandates_July = signedMandates.filter(o => new Date(o.mandateLetterDate).getMonth() == '7')
    var signedMandates_Aug = signedMandates.filter(o => new Date(o.mandateLetterDate).getMonth() == '8')
    var signedMandates_Sept = signedMandates.filter(o => new Date(o.mandateLetterDate).getMonth() == '9')
    var signedMandates_Oct = signedMandates.filter(o => new Date(o.mandateLetterDate).getMonth() == '10')
    var signedMandates_Nov = signedMandates.filter(o => new Date(o.mandateLetterDate).getMonth() == '11')
    var signedMandates_Dec = signedMandates.filter(o => new Date(o.mandateLetterDate).getMonth() == '12')


    var signedMandates_Jan_Past = signedMandates_past.filter(o => new Date(o.mandateLetterDate).getMonth() == '1')
    var signedMandates_Feb_Past = signedMandates_past.filter(o => new Date(o.mandateLetterDate).getMonth() == '2')
    var signedMandates_March_Past = signedMandates_past.filter(o => new Date(o.mandateLetterDate).getMonth() == '3')
    var signedMandates_Apr_Past = signedMandates_past.filter(o => new Date(o.mandateLetterDate).getMonth() == '4')
    var signedMandates_May_Past = signedMandates_past.filter(o => new Date(o.mandateLetterDate).getMonth() == '5')
    var signedMandates_June_Past = signedMandates_past.filter(o => new Date(o.mandateLetterDate).getMonth() == '6')
    var signedMandates_July_Past = signedMandates_past.filter(o => new Date(o.mandateLetterDate).getMonth() == '7')
    var signedMandates_Aug_Past = signedMandates_past.filter(o => new Date(o.mandateLetterDate).getMonth() == '8')
    var signedMandates_Sept_Past = signedMandates_past.filter(o => new Date(o.mandateLetterDate).getMonth() == '9')
    var signedMandates_Oct_Past = signedMandates_past.filter(o => new Date(o.mandateLetterDate).getMonth() == '10')
    var signedMandates_Nov_Past = signedMandates_past.filter(o => new Date(o.mandateLetterDate).getMonth() == '11')
    var signedMandates_Dec_Past = signedMandates_past.filter(o => new Date(o.mandateLetterDate).getMonth() == '12')


    //ccApprovals By Month
    var ccApprovals_Jan = ccApprovals.filter(o => new Date(o.creditApprovalDate).getMonth() == '1')
    var ccApprovals_Feb = ccApprovals.filter(o => new Date(o.creditApprovalDate).getMonth() == '2')
    var ccApprovals_March = ccApprovals.filter(o => new Date(o.creditApprovalDate).getMonth() == '3')
    var ccApprovals_Apr = ccApprovals.filter(o => new Date(o.creditApprovalDate).getMonth() == '4')
    var ccApprovals_May = ccApprovals.filter(o => new Date(o.creditApprovalDate).getMonth() == '5')
    var ccApprovals_June = ccApprovals.filter(o => new Date(o.creditApprovalDate).getMonth() == '6')
    var ccApprovals_July = ccApprovals.filter(o => new Date(o.creditApprovalDate).getMonth() == '7')
    var ccApprovals_Aug = ccApprovals.filter(o => new Date(o.creditApprovalDate).getMonth() == '8')
    var ccApprovals_Sept = ccApprovals.filter(o => new Date(o.creditApprovalDate).getMonth() == '9')
    var ccApprovals_Oct = ccApprovals.filter(o => new Date(o.creditApprovalDate).getMonth() == '10')
    var ccApprovals_Nov = ccApprovals.filter(o => new Date(o.creditApprovalDate).getMonth() == '11')
    var ccApprovals_Dec = ccApprovals.filter(o => new Date(o.creditApprovalDate).getMonth() == '12')

    var ccApprovals_Jan_Past = ccApprovals_past.filter(o => new Date(o.creditApprovalDate).getMonth() == '1')
    var ccApprovals_Feb_Past = ccApprovals_past.filter(o => new Date(o.creditApprovalDate).getMonth() == '2')
    var ccApprovals_March_Past = ccApprovals_past.filter(o => new Date(o.creditApprovalDate).getMonth() == '3')
    var ccApprovals_Apr_Past = ccApprovals_past.filter(o => new Date(o.creditApprovalDate).getMonth() == '4')
    var ccApprovals_May_Past = ccApprovals_past.filter(o => new Date(o.creditApprovalDate).getMonth() == '5')
    var ccApprovals_June_Past = ccApprovals_past.filter(o => new Date(o.creditApprovalDate).getMonth() == '6')
    var ccApprovals_July_Past = ccApprovals_past.filter(o => new Date(o.creditApprovalDate).getMonth() == '7')
    var ccApprovals_Aug_Past = ccApprovals_past.filter(o => new Date(o.creditApprovalDate).getMonth() == '8')
    var ccApprovals_Sept_Past = ccApprovals_past.filter(o => new Date(o.creditApprovalDate).getMonth() == '9')
    var ccApprovals_Oct_Past = ccApprovals_past.filter(o => new Date(o.creditApprovalDate).getMonth() == '10')
    var ccApprovals_Nov_Past = ccApprovals_past.filter(o => new Date(o.creditApprovalDate).getMonth() == '11')
    var ccApprovals_Dec_Past = ccApprovals_past.filter(o => new Date(o.creditApprovalDate).getMonth() == '12')


    //closedDeals By Month
    var closedDeals_Jan = closedDeals.filter(o => new Date(o.actualCloseDate).getMonth() == '1')
    var closedDeals_Feb = closedDeals.filter(o => new Date(o.actualCloseDate).getMonth() == '2')
    var closedDeals_March = closedDeals.filter(o => new Date(o.actualCloseDate).getMonth() == '3')
    var closedDeals_Apr = closedDeals.filter(o => new Date(o.actualCloseDate).getMonth() == '4')
    var closedDeals_May = closedDeals.filter(o => new Date(o.actualCloseDate).getMonth() == '5')
    var closedDeals_June = closedDeals.filter(o => new Date(o.actualCloseDate).getMonth() == '6')
    var closedDeals_July = closedDeals.filter(o => new Date(o.actualCloseDate).getMonth() == '7')
    var closedDeals_Aug = closedDeals.filter(o => new Date(o.actualCloseDate).getMonth() == '8')
    var closedDeals_Sept = closedDeals.filter(o => new Date(o.actualCloseDate).getMonth() == '9')
    var closedDeals_Oct = closedDeals.filter(o => new Date(o.actualCloseDate).getMonth() == '10')
    var closedDeals_Nov = closedDeals.filter(o => new Date(o.actualCloseDate).getMonth() == '11')
    var closedDeals_Dec = closedDeals.filter(o => new Date(o.actualCloseDate).getMonth() == '12')

    var closedDeals_Jan_Past = closedDeals_past.filter(o => new Date(o.actualCloseDate).getMonth() == '1')
    var closedDeals_Feb_Past = closedDeals_past.filter(o => new Date(o.actualCloseDate).getMonth() == '2')
    var closedDeals_March_Past = closedDeals_past.filter(o => new Date(o.actualCloseDate).getMonth() == '3')
    var closedDeals_Apr_Past = closedDeals_past.filter(o => new Date(o.actualCloseDate).getMonth() == '4')
    var closedDeals_May_Past = closedDeals_past.filter(o => new Date(o.actualCloseDate).getMonth() == '5')
    var closedDeals_June_Past = closedDeals_past.filter(o => new Date(o.actualCloseDate).getMonth() == '6')
    var closedDeals_July_Past = closedDeals_past.filter(o => new Date(o.actualCloseDate).getMonth() == '7')
    var closedDeals_Aug_Past = closedDeals_past.filter(o => new Date(o.actualCloseDate).getMonth() == '8')
    var closedDeals_Sept_Past = closedDeals_past.filter(o => new Date(o.actualCloseDate).getMonth() == '9')
    var closedDeals_Oct_Past = closedDeals_past.filter(o => new Date(o.actualCloseDate).getMonth() == '10')
    var closedDeals_Nov_Past = closedDeals_past.filter(o => new Date(o.actualCloseDate).getMonth() == '11')
    var closedDeals_Dec_Past = closedDeals_past.filter(o => new Date(o.actualCloseDate).getMonth() == '12')

    //nbc Months Deal Size
    const cartPricesArrayNBC_Jan = nbcApprovals_Jan.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayNBC_Feb = nbcApprovals_Feb.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayNBC_March = nbcApprovals_March.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayNBC_April = nbcApprovals_Apr.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayNBC_May = nbcApprovals_May.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayNBC_June = nbcApprovals_June.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayNBC_July = nbcApprovals_July.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayNBC_Aug = nbcApprovals_Aug.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayNBC_Sept = nbcApprovals_Sept.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayNBC_Oct = nbcApprovals_Oct.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayNBC_Nov = nbcApprovals_Nov.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayNBC_Dec = nbcApprovals_Dec.map(function (item) {
        return item.dealSize;
    });

    const cartPricesArrayNBC_Jan_Past = nbcApprovals_Jan_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayNBC_Feb_Past = nbcApprovals_Feb_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayNBC_March_Past = nbcApprovals_March_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayNBC_April_Past = nbcApprovals_Apr_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayNBC_May_Past = nbcApprovals_May_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayNBC_June_Past = nbcApprovals_June_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayNBC_July_Past = nbcApprovals_July_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayNBC_Aug_Past = nbcApprovals_Aug_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayNBC_Sept_Past = nbcApprovals_Sept_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayNBC_Oct_Past = nbcApprovals_Oct_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayNBC_Nov_Past = nbcApprovals_Nov_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayNBC_Dec_Past = nbcApprovals_Dec_Past.map(function (item) {
        return item.dealSize;
    });


    //signedMandates Deal Size
    const cartPricesArrayMandates_Jan = signedMandates_Jan.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayMandates_Feb = signedMandates_Feb.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayMandates_March = signedMandates_March.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayMandates_April = signedMandates_Apr.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayMandates_May = signedMandates_May.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayMandates_June = signedMandates_June.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayMandates_July = signedMandates_July.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayMandates_Aug = signedMandates_Aug.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayMandates_Sept = signedMandates_Sept.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayMandates_Oct = signedMandates_Oct.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayMandates_Nov = signedMandates_Nov.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayMandates_Dec = signedMandates_Dec.map(function (item) {
        return item.dealSize;
    });


    const cartPricesArrayMandates_Jan_Past = signedMandates_Jan_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayMandates_Feb_Past = signedMandates_Feb_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayMandates_March_Past = signedMandates_March_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayMandates_April_Past = signedMandates_Apr_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayMandates_May_Past = signedMandates_May_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayMandates_June_Past = signedMandates_June_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayMandates_July_Past = signedMandates_July_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayMandates_Aug_Past = signedMandates_Aug_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayMandates_Sept_Past = signedMandates_Sept_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayMandates_Oct_Past = signedMandates_Oct_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayMandates_Nov_Past = signedMandates_Nov_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayMandates_Dec_Past = signedMandates_Dec_Past.map(function (item) {
        return item.dealSize;
    });


    //ccApprovals Deal Size
    const cartPricesArrayccApproval_Jan = ccApprovals_Jan.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayccApproval_Feb = ccApprovals_Feb.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayccApproval_March = ccApprovals_March.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayccApproval_April = ccApprovals_Apr.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayccApproval_May = ccApprovals_May.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayccApproval_June = ccApprovals_June.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayccApproval_July = ccApprovals_July.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayccApproval_Aug = ccApprovals_Aug.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayccApproval_Sept = ccApprovals_Sept.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayccApproval_Oct = ccApprovals_Oct.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayccApproval_Nov = ccApprovals_Nov.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayccApproval_Dec = ccApprovals_Dec.map(function (item) {
        return item.dealSize;
    });


    const cartPricesArrayccApproval_Jan_Past = ccApprovals_Jan_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayccApproval_Feb_Past = ccApprovals_Feb_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayccApproval_March_Past = ccApprovals_March_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayccApproval_April_Past = ccApprovals_Apr_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayccApproval_May_Past = ccApprovals_May_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayccApproval_June_Past = ccApprovals_June_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayccApproval_July_Past = ccApprovals_July_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayccApproval_Aug_Past = ccApprovals_Aug_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayccApproval_Sept_Past = ccApprovals_Sept_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayccApproval_Oct_Past = ccApprovals_Oct_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayccApproval_Nov_Past = ccApprovals_Nov_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayccApproval_Dec_Past = ccApprovals_Dec_Past.map(function (item) {
        return item.dealSize;
    });


    //closedDeals Deal Size
    const cartPricesArrayClosed_Jan = closedDeals_Jan.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayClosed_Feb = closedDeals_Feb.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayClosed_March = closedDeals_March.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayClosed_April = closedDeals_Apr.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayClosed_May = closedDeals_May.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayClosed_June = closedDeals_June.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayClosed_July = closedDeals_July.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayClosed_Aug = closedDeals_Aug.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayClosed_Sept = closedDeals_Sept.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayClosed_Oct = closedDeals_Oct.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayClosed_Nov = closedDeals_Nov.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayClosed_Dec = closedDeals_Dec.map(function (item) {
        return item.dealSize;
    });

    const cartPricesArrayClosed_Jan_Past = closedDeals_Jan_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayClosed_Feb_Past = closedDeals_Feb_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayClosed_March_Past = closedDeals_March_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayClosed_April_Past = closedDeals_Apr_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayClosed_May_Past = closedDeals_May_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayClosed_June_Past = closedDeals_June_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayClosed_July_Past = closedDeals_July_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayClosed_Aug_Past = closedDeals_Aug_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayClosed_Sept_Past = closedDeals_Sept_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayClosed_Oct_Past = closedDeals_Oct_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayClosed_Nov_Past = closedDeals_Nov_Past.map(function (item) {
        return item.dealSize;
    });
    const cartPricesArrayClosed_Dec_Past = closedDeals_Dec_Past.map(function (item) {
        return item.dealSize;
    });


    var nbcApprovalSum_Jan = cartPricesArrayNBC_Jan.reduce((partialSum, a) => (partialSum + a), 0);
    var nbcApprovalSum_Feb = cartPricesArrayNBC_Feb.reduce((partialSum, a) => (partialSum + a), 0);
    var nbcApprovalSum_March = cartPricesArrayNBC_March.reduce((partialSum, a) => (partialSum + a), 0);
    var nbcApprovalSum_Apr = cartPricesArrayNBC_April.reduce((partialSum, a) => (partialSum + a), 0);
    var nbcApprovalSum_May = cartPricesArrayNBC_May.reduce((partialSum, a) => (partialSum + a), 0);
    var nbcApprovalSum_June = cartPricesArrayNBC_June.reduce((partialSum, a) => (partialSum + a), 0);
    var nbcApprovalSum_July = cartPricesArrayNBC_July.reduce((partialSum, a) => (partialSum + a), 0);
    var nbcApprovalSum_Aug = cartPricesArrayNBC_Aug.reduce((partialSum, a) => (partialSum + a), 0);
    var nbcApprovalSum_Sept = cartPricesArrayNBC_Sept.reduce((partialSum, a) => (partialSum + a), 0);
    var nbcApprovalSum_Oct = cartPricesArrayNBC_Oct.reduce((partialSum, a) => (partialSum + a), 0);
    var nbcApprovalSum_Nov = cartPricesArrayNBC_Nov.reduce((partialSum, a) => (partialSum + a), 0);
    var nbcApprovalSum_Dec = cartPricesArrayNBC_Dec.reduce((partialSum, a) => (partialSum + a), 0);


    var nbcApprovalSum_Jan_Past = cartPricesArrayNBC_Jan_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var nbcApprovalSum_Feb_Past = cartPricesArrayNBC_Feb_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var nbcApprovalSum_March_Past = cartPricesArrayNBC_March_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var nbcApprovalSum_Apr_Past = cartPricesArrayNBC_April_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var nbcApprovalSum_May_Past = cartPricesArrayNBC_May_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var nbcApprovalSum_June_Past = cartPricesArrayNBC_June_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var nbcApprovalSum_July_Past = cartPricesArrayNBC_July_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var nbcApprovalSum_Aug_Past = cartPricesArrayNBC_Aug_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var nbcApprovalSum_Sept_Past = cartPricesArrayNBC_Sept_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var nbcApprovalSum_Oct_Past = cartPricesArrayNBC_Oct_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var nbcApprovalSum_Nov_Past = cartPricesArrayNBC_Nov_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var nbcApprovalSum_Dec_Past = cartPricesArrayNBC_Dec_Past.reduce((partialSum, a) => (partialSum + a), 0);



    var nbcApprovalVariance_Jan = (nbcApprovalSum_Jan - nbcApprovals_Jan_Past) * 100
    var nbcApprovalVariance_Feb = (nbcApprovalSum_Feb - nbcApprovals_Feb_Past) * 100
    var nbcApprovalVariance_March = (nbcApprovalSum_March - nbcApprovals_March_Past) * 100
    var nbcApprovalVariance_Apr = (nbcApprovalSum_Apr - nbcApprovals_Apr_Past) * 100
    var nbcApprovalVariance_May = (nbcApprovalSum_May - nbcApprovals_May_Past) * 100
    var nbcApprovalVariance_June = (nbcApprovalSum_June - nbcApprovals_June_Past) * 100
    var nbcApprovalVariance_July = (nbcApprovalSum_July - nbcApprovals_July_Past) * 100
    var nbcApprovalVariance_Aug = (nbcApprovalSum_Aug - nbcApprovals_Aug_Past) * 100
    var nbcApprovalVariance_Sept = (nbcApprovalSum_Sept - nbcApprovals_Sept_Past) * 100
    var nbcApprovalVariance_Oct = (nbcApprovalSum_Oct - nbcApprovals_Oct_Past) * 100
    var nbcApprovalVariance_Nov = (nbcApprovalSum_Nov - nbcApprovals_Nov_Past) * 100
    var nbcApprovalVariance_Dec = (nbcApprovalSum_Dec - nbcApprovals_Dec_Past) * 100



    var MandateSum_Jan = cartPricesArrayMandates_Jan.reduce((partialSum, a) => (partialSum + a), 0);
    var MandateSum_Feb = cartPricesArrayMandates_Feb.reduce((partialSum, a) => (partialSum + a), 0);
    var MandateSum_March = cartPricesArrayMandates_March.reduce((partialSum, a) => (partialSum + a), 0);
    var MandateSum_Apr = cartPricesArrayMandates_April.reduce((partialSum, a) => (partialSum + a), 0);
    var MandateSum_May = cartPricesArrayMandates_May.reduce((partialSum, a) => (partialSum + a), 0);
    var MandateSum_June = cartPricesArrayMandates_June.reduce((partialSum, a) => (partialSum + a), 0);
    var MandateSum_July = cartPricesArrayMandates_July.reduce((partialSum, a) => (partialSum + a), 0);
    var MandateSum_Aug = cartPricesArrayMandates_Aug.reduce((partialSum, a) => (partialSum + a), 0);
    var MandateSum_Sept = cartPricesArrayMandates_Sept.reduce((partialSum, a) => (partialSum + a), 0);
    var MandateSum_Oct = cartPricesArrayMandates_Oct.reduce((partialSum, a) => (partialSum + a), 0);
    var MandateSum_Nov = cartPricesArrayMandates_Nov.reduce((partialSum, a) => (partialSum + a), 0);
    var MandateSum_Dec = cartPricesArrayMandates_Dec.reduce((partialSum, a) => (partialSum + a), 0);


    var MandateSum_Jan_Past = cartPricesArrayMandates_Jan_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var MandateSum_Feb_Past = cartPricesArrayMandates_Feb_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var MandateSum_March_Past = cartPricesArrayMandates_March_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var MandateSum_Apr_Past = cartPricesArrayMandates_April_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var MandateSum_May_Past = cartPricesArrayMandates_May_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var MandateSum_June_Past = cartPricesArrayMandates_June_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var MandateSum_July_Past = cartPricesArrayMandates_July_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var MandateSum_Aug_Past = cartPricesArrayMandates_Aug_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var MandateSum_Sept_Past = cartPricesArrayMandates_Sept_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var MandateSum_Oct_Past = cartPricesArrayMandates_Oct_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var MandateSum_Nov_Past = cartPricesArrayMandates_Nov_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var MandateSum_Dec_Past = cartPricesArrayMandates_Dec_Past.reduce((partialSum, a) => (partialSum + a), 0);


    var mandateVariance_Jan = (MandateSum_Jan - MandateSum_Jan_Past) * 100
    var mandateVariance_Feb = (MandateSum_Feb - MandateSum_Feb_Past) * 100
    var mandateVariance_March = (MandateSum_March - MandateSum_March_Past) * 100
    var mandateVariance_Apr = (MandateSum_Apr - MandateSum_Apr_Past) * 100
    var mandateVariance_May = (MandateSum_May - MandateSum_May_Past) * 100
    var mandateVariance_June = (MandateSum_June - MandateSum_June_Past) * 100
    var mandateVariance_July = (MandateSum_July - MandateSum_July_Past) * 100
    var mandateVariance_Aug = (MandateSum_Aug - MandateSum_Aug_Past) * 100
    var mandateVariance_Sept = (MandateSum_Sept - MandateSum_Sept_Past) * 100
    var mandateVariance_Oct = (MandateSum_Oct - MandateSum_Oct_Past) * 100
    var mandateVariance_Nov = (MandateSum_Nov - MandateSum_Nov_Past) * 100
    var mandateVariance_Dec = (MandateSum_Dec - MandateSum_Dec_Past) * 100


    var CCApprovalSum_Jan = cartPricesArrayccApproval_Jan.reduce((partialSum, a) => (partialSum + a), 0);
    var CCApprovalSum_Feb = cartPricesArrayccApproval_Feb.reduce((partialSum, a) => (partialSum + a), 0);
    var CCApprovalSum_March = cartPricesArrayccApproval_March.reduce((partialSum, a) => (partialSum + a), 0);
    var CCApprovalSum_Apr = cartPricesArrayccApproval_April.reduce((partialSum, a) => (partialSum + a), 0);
    var CCApprovalSum_May = cartPricesArrayccApproval_May.reduce((partialSum, a) => (partialSum + a), 0);
    var CCApprovalSum_June = cartPricesArrayccApproval_June.reduce((partialSum, a) => (partialSum + a), 0);
    var CCApprovalSum_July = cartPricesArrayccApproval_July.reduce((partialSum, a) => (partialSum + a), 0);
    var CCApprovalSum_Aug = cartPricesArrayccApproval_Aug.reduce((partialSum, a) => (partialSum + a), 0);
    var CCApprovalSum_Sept = cartPricesArrayccApproval_Sept.reduce((partialSum, a) => (partialSum + a), 0);
    var CCApprovalSum_Oct = cartPricesArrayccApproval_Oct.reduce((partialSum, a) => (partialSum + a), 0);
    var CCApprovalSum_Nov = cartPricesArrayccApproval_Nov.reduce((partialSum, a) => (partialSum + a), 0);
    var CCApprovalSum_Dec = cartPricesArrayccApproval_Dec.reduce((partialSum, a) => (partialSum + a), 0);



    var CCApprovalSum_Jan_Past = cartPricesArrayccApproval_Jan_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var CCApprovalSum_Feb_Past = cartPricesArrayccApproval_Feb_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var CCApprovalSum_March_Past = cartPricesArrayccApproval_March_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var CCApprovalSum_Apr_Past = cartPricesArrayccApproval_April_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var CCApprovalSum_May_Past = cartPricesArrayccApproval_May_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var CCApprovalSum_June_Past = cartPricesArrayccApproval_June_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var CCApprovalSum_July_Past = cartPricesArrayccApproval_July_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var CCApprovalSum_Aug_Past = cartPricesArrayccApproval_Aug_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var CCApprovalSum_Sept_Past = cartPricesArrayccApproval_Sept_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var CCApprovalSum_Oct_Past = cartPricesArrayccApproval_Oct_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var CCApprovalSum_Nov_Past = cartPricesArrayccApproval_Nov_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var CCApprovalSum_Dec_Past = cartPricesArrayccApproval_Dec_Past.reduce((partialSum, a) => (partialSum + a), 0);



    var ccApprovalVariance_Jan = (CCApprovalSum_Jan - CCApprovalSum_Jan_Past) * 100
    var ccApprovalVariance_Feb = (CCApprovalSum_Feb - CCApprovalSum_Feb_Past) * 100
    var ccApprovalVariance_March = (CCApprovalSum_March - CCApprovalSum_March_Past) * 100
    var ccApprovalVariance_Apr = (CCApprovalSum_Apr - CCApprovalSum_Apr_Past) * 100
    var ccApprovalVariance_May = (CCApprovalSum_May - CCApprovalSum_May_Past) * 100
    var ccApprovalVariance_June = (CCApprovalSum_June - CCApprovalSum_June_Past) * 100
    var ccApprovalVariance_July = (CCApprovalSum_July - CCApprovalSum_July_Past) * 100
    var ccApprovalVariance_Aug = (CCApprovalSum_Aug - CCApprovalSum_Aug_Past) * 100
    var ccApprovalVariance_Sept = (CCApprovalSum_Sept - CCApprovalSum_Sept_Past) * 100
    var ccApprovalVariance_Oct = (CCApprovalSum_Oct - CCApprovalSum_Oct_Past) * 100
    var ccApprovalVariance_Nov = (CCApprovalSum_Nov - CCApprovalSum_Nov_Past) * 100
    var ccApprovalVariance_Dec = (CCApprovalSum_Dec - CCApprovalSum_Dec_Past) * 100



    var ClosedSum_Jan = cartPricesArrayClosed_Jan.reduce((partialSum, a) => (partialSum + a), 0);
    var ClosedSum_Feb = cartPricesArrayClosed_Feb.reduce((partialSum, a) => (partialSum + a), 0);
    var ClosedSum_March = cartPricesArrayClosed_March.reduce((partialSum, a) => (partialSum + a), 0);
    var ClosedSum_Apr = cartPricesArrayClosed_April.reduce((partialSum, a) => (partialSum + a), 0);
    var ClosedSum_May = cartPricesArrayClosed_May.reduce((partialSum, a) => (partialSum + a), 0);
    var ClosedSum_June = cartPricesArrayClosed_June.reduce((partialSum, a) => (partialSum + a), 0);
    var ClosedSum_July = cartPricesArrayClosed_July.reduce((partialSum, a) => (partialSum + a), 0);
    var ClosedSum_Aug = cartPricesArrayClosed_Aug.reduce((partialSum, a) => (partialSum + a), 0);
    var ClosedSum_Sept = cartPricesArrayClosed_Sept.reduce((partialSum, a) => (partialSum + a), 0);
    var ClosedSum_Oct = cartPricesArrayClosed_Oct.reduce((partialSum, a) => (partialSum + a), 0);
    var ClosedSum_Nov = cartPricesArrayClosed_Nov.reduce((partialSum, a) => (partialSum + a), 0);
    var ClosedSum_Dec = cartPricesArrayClosed_Dec.reduce((partialSum, a) => (partialSum + a), 0);


    var ClosedSum_Jan_Past = cartPricesArrayClosed_Jan_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var ClosedSum_Feb_Past = cartPricesArrayClosed_Feb_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var ClosedSum_March_Past = cartPricesArrayClosed_March_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var ClosedSum_Apr_Past = cartPricesArrayClosed_April_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var ClosedSum_May_Past = cartPricesArrayClosed_May_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var ClosedSum_June_Past = cartPricesArrayClosed_June_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var ClosedSum_July_Past = cartPricesArrayClosed_July_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var ClosedSum_Aug_Past = cartPricesArrayClosed_Aug_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var ClosedSum_Sept_Past = cartPricesArrayClosed_Sept_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var ClosedSum_Oct_Past = cartPricesArrayClosed_Oct_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var ClosedSum_Nov_Past = cartPricesArrayClosed_Nov_Past.reduce((partialSum, a) => (partialSum + a), 0);
    var ClosedSum_Dec_Past = cartPricesArrayClosed_Dec_Past.reduce((partialSum, a) => (partialSum + a), 0);


    var closedVariance_Jan = (ClosedSum_Jan - ClosedSum_Jan_Past) * 100
    var closedVariance_Feb = (ClosedSum_Feb - ClosedSum_Feb_Past) * 100
    var closedVariance_March = (ClosedSum_March - ClosedSum_March_Past) * 100
    var closedVariance_Apr = (ClosedSum_Apr - ClosedSum_Apr_Past) * 100
    var closedVariance_May = (ClosedSum_May - ClosedSum_May_Past) * 100
    var closedVariance_June = (ClosedSum_June - ClosedSum_June_Past) * 100
    var closedVariance_July = (ClosedSum_July - ClosedSum_July_Past) * 100
    var closedVariance_Aug = (ClosedSum_Aug - ClosedSum_Aug_Past) * 100
    var closedVariance_Sept = (ClosedSum_Sept - ClosedSum_Sept_Past) * 100
    var closedVariance_Oct = (ClosedSum_Oct - ClosedSum_Oct_Past) * 100
    var closedVariance_Nov = (ClosedSum_Nov - ClosedSum_Nov_Past) * 100
    var closedVariance_Dec = (ClosedSum_Dec - ClosedSum_Dec_Past) * 100


    let deals = [
        {
            Month_Year: `January ${stores.financialYear.slice(2)}`,
            noOfNBCApprovals: nbcApprovals_Jan.length,
            sizeofNBCApprovals: `${nbcApprovalSum_Jan} Billion`,
            noOfMandates: signedMandates_Jan.length,
            sizeofMandates: `${MandateSum_Jan} Billion`,
            noOfCCApprovals: ccApprovals_Jan.length,
            sizeofCCApprovals: `${CCApprovalSum_Jan} Billion`,
            noOfClosed: closedDeals_Jan.length,
            sizeofClosed: `${ClosedSum_Jan} Billion`,
        },
        {
            Month_Year: `January ${lastYear}`,
            noOfNBCApprovals: nbcApprovals_Jan_Past.length,
            sizeofNBCApprovals: `${nbcApprovalSum_Jan_Past} Billion`,
            noOfMandates: signedMandates_Jan_Past.length,
            sizeofMandates: `${MandateSum_Jan_Past} Billion`,
            noOfCCApprovals: ccApprovals_Jan_Past.length,
            sizeofCCApprovals: `${CCApprovalSum_Jan_Past} Billion`,
            noOfClosed: closedDeals_Jan_Past.length,
            sizeofClosed: `${ClosedSum_Jan_Past} Billion`,
        },
        {
            Month_Year: `Variance(%)`,
            noOfNBCApprovals: `${(nbcApprovals_Jan.length - nbcApprovals_Jan_Past.length)*100}%`,
            sizeofNBCApprovals: `${nbcApprovalVariance_Jan}%`,
            noOfMandates: `${(signedMandates_Jan.length - signedMandates_Jan_Past.length)*100}%`,
            sizeofMandates: `${mandateVariance_Jan}%`,
            noOfCCApprovals: `${(ccApprovals_Jan.length - ccApprovals_Jan_Past.length)*100}%`,
            sizeofCCApprovals: `${ccApprovalVariance_Jan}%`,
            noOfClosed: `${(closedDeals_Jan.length - closedDeals_Jan_Past.length)*100}%`,
            sizeofClosed: `${closedVariance_Jan}%`,
        }
    ]

    february.value = [
        {
            Month_Year: `February ${stores.financialYear.slice(2)}`,
            noOfNBCApprovals: nbcApprovals_Feb.length,
            sizeofNBCApprovals: `${nbcApprovalSum_Feb} Billion`,
            noOfMandates: signedMandates_Feb.length,
            sizeofMandates: `${ MandateSum_Feb} Billion`,
            noOfCCApprovals: ccApprovals_Feb.length,
            sizeofCCApprovals: `${CCApprovalSum_Feb} Billion`,
            noOfClosed: closedDeals_Feb.length,
            sizeofClosed: `${ClosedSum_Feb} Billion`,
        },
        {
            Month_Year: `February ${lastYear}`,
            noOfNBCApprovals: nbcApprovals_Feb_Past.length,
            sizeofNBCApprovals: `${nbcApprovalSum_Feb_Past} Billion`,
            noOfMandates: signedMandates_Feb_Past.length,
            sizeofMandates: `${MandateSum_Feb_Past} Billion`,
            noOfCCApprovals: ccApprovals_Feb_Past.length,
            sizeofCCApprovals: `${CCApprovalSum_Feb_Past} Billion`,
            noOfClosed: closedDeals_Feb_Past.length,
            sizeofClosed: `${ClosedSum_Feb_Past} Billion`,
        },
        {
            Month_Year: `Variance(%)`,
            noOfNBCApprovals: `${(nbcApprovals_Feb.length - nbcApprovals_Feb_Past.length)*100}%`,
            sizeofNBCApprovals:`${nbcApprovalVariance_Feb}%`,
            noOfMandates: `${(signedMandates_Feb.length - signedMandates_Feb_Past.length)*100}%`,
            sizeofMandates: `${mandateVariance_Feb}%`,
            noOfCCApprovals: `${(ccApprovals_Feb.length - ccApprovals_Feb_Past.length)*100}%`,
            sizeofCCApprovals: `${ccApprovalVariance_Feb}%`,
            noOfClosed: `${(closedDeals_Feb.length - closedDeals_Feb_Past.length)*100}%`,
            sizeofClosed: `${closedVariance_Feb}%`,
        }

    ]

    march.value = [
        {
            Month_Year: `March ${stores.financialYear.slice(2)}`,
            noOfNBCApprovals: nbcApprovals_March.length,
            sizeofNBCApprovals: `${nbcApprovalSum_March} Billion`,
            noOfMandates: signedMandates_March.length,
            sizeofMandates: `${MandateSum_March} Billion`,
            noOfCCApprovals: ccApprovals_March.length,
            sizeofCCApprovals: `${CCApprovalSum_March} Billion`,
            noOfClosed: closedDeals_March.length,
            sizeofClosed: `${ClosedSum_March} Billion`,
        },
        {
            Month_Year: `March ${lastYear}`,
            noOfNBCApprovals: nbcApprovals_March_Past.length,
            sizeofNBCApprovals: `${nbcApprovalSum_March_Past} Billion`,
            noOfMandates: signedMandates_March_Past.length,
            sizeofMandates: `${MandateSum_March_Past} Billion`,
            noOfCCApprovals: ccApprovals_March_Past.length,
            sizeofCCApprovals: `${CCApprovalSum_March_Past} Billion`,
            noOfClosed: closedDeals_March_Past.length,
            sizeofClosed: `${ClosedSum_March_Past} Billion`,
        },
        {
            Month_Year: `Variance(%)`,
            noOfNBCApprovals: `${(nbcApprovals_March.length - nbcApprovals_March_Past.length)*100}%`,
            sizeofNBCApprovals: `${nbcApprovalVariance_March}%`,
            noOfMandates: `${(signedMandates_March.length - signedMandates_March_Past.length)*100}%`,
            sizeofMandates: `${mandateVariance_March}%`,
            noOfCCApprovals: `${(ccApprovals_March.length - ccApprovals_March_Past.length)*100}%`,
            sizeofCCApprovals: `${ccApprovalVariance_March}%`,
            noOfClosed: `${(closedDeals_March.length - closedDeals_March_Past.length)*100}%`,
            sizeofClosed: `${closedVariance_March}%`,
        }

    ]

    april.value = [
        {
            Month_Year: `April ${stores.financialYear.slice(2)}`,
            noOfNBCApprovals: nbcApprovals_Apr.length,
            sizeofNBCApprovals: `${nbcApprovalSum_Apr} Billion`,
            noOfMandates: signedMandates_Apr.length,
            sizeofMandates: `${MandateSum_Apr} Billion`,
            noOfCCApprovals: ccApprovals_Apr.length,
            sizeofCCApprovals: `${CCApprovalSum_Apr} Billion`,
            noOfClosed: closedDeals_Apr.length,
            sizeofClosed: `${ClosedSum_Apr} Billion`,
        },
        {
            Month_Year: `April ${lastYear}`,
            noOfNBCApprovals: nbcApprovals_Apr_Past.length,
            sizeofNBCApprovals: `${nbcApprovalSum_Apr_Past} Billion`,
            noOfMandates: signedMandates_Apr_Past.length,
            sizeofMandates: `${MandateSum_Apr_Past} Billion`,
            noOfCCApprovals: ccApprovals_Apr_Past.length,
            sizeofCCApprovals: `${CCApprovalSum_Apr_Past} Billion`,
            noOfClosed: closedDeals_Apr_Past.length,
            sizeofClosed: `${ClosedSum_Apr_Past} Billion`,
        },
        {
            Month_Year: `Variance(%)`,
            noOfNBCApprovals: `${(nbcApprovals_Apr.length - nbcApprovals_Apr_Past.length)*100}%`,
            sizeofNBCApprovals: `${nbcApprovalVariance_Apr}%`,
            noOfMandates: `${(signedMandates_Apr.length - signedMandates_Apr_Past.length)*100}%`,
            sizeofMandates: `${mandateVariance_Apr}%`,
            noOfCCApprovals: `${(ccApprovals_Apr.length - ccApprovals_Apr_Past.length)*100}%`,
            sizeofCCApprovals: `${ccApprovalVariance_Apr}%`,
            noOfClosed: `${(closedDeals_Apr.length - closedDeals_Apr_Past.length)*100}%`,
            sizeofClosed: `${closedVariance_Apr}%`,
        }
    ]

    may.value = [
        {
            Month_Year: `May ${stores.financialYear.slice(2)}`,
            noOfNBCApprovals: nbcApprovals_May.length,
            sizeofNBCApprovals: `${nbcApprovalSum_May} Billion`,
            noOfMandates: signedMandates_May.length,
            sizeofMandates: `${MandateSum_May} Billion`,
            noOfCCApprovals: ccApprovals_May.length,
            sizeofCCApprovals: `${CCApprovalSum_May} Billion`,
            noOfClosed: closedDeals_May.length,
            sizeofClosed:  `${ClosedSum_May} Billion`,
        },
        {
            Month_Year: `May ${lastYear}`,
            noOfNBCApprovals: nbcApprovals_May_Past.length,
            sizeofNBCApprovals: `${nbcApprovalSum_May_Past} Billion`,
            noOfMandates: signedMandates_May_Past.length,
            sizeofMandates: `${MandateSum_May_Past} Billion`,
            noOfCCApprovals: ccApprovals_May_Past.length,
            sizeofCCApprovals: `${CCApprovalSum_May_Past} Billion`,
            noOfClosed: closedDeals_May_Past.length,
            sizeofClosed: `${ClosedSum_May_Past} Billion`,
        },
        {
            Month_Year: `Variance(%)`,
            noOfNBCApprovals: `${(nbcApprovals_May.length - nbcApprovals_May_Past.length)*100}%`,
            sizeofNBCApprovals: `${nbcApprovalVariance_May}%`,
            noOfMandates: `${(signedMandates_May.length - signedMandates_May_Past.length)*100}%`,
            sizeofMandates: `${mandateVariance_May}%`,
            noOfCCApprovals: `${(ccApprovals_May.length - ccApprovals_May_Past.length)*100}%`,
            sizeofCCApprovals: `${ccApprovalVariance_May}%`,
            noOfClosed: `${(closedDeals_May.length - closedDeals_May_Past.length)*100}%`,
            sizeofClosed: `${closedVariance_May}%`,
        }

    ]

    june.value = [
        {
            Month_Year: `June ${stores.financialYear.slice(2)}`,
            noOfNBCApprovals: nbcApprovals_June.length,
            sizeofNBCApprovals: `${nbcApprovalSum_June} Billion`,
            noOfMandates: signedMandates_June.length,
            sizeofMandates: `${MandateSum_June} Billion`,
            noOfCCApprovals: ccApprovals_June.length,
            sizeofCCApprovals: `${CCApprovalSum_June} Billion`,
            noOfClosed: closedDeals_June.length,
            sizeofClosed: `${ClosedSum_June} Billion`,
        },
        {
            Month_Year: `June ${lastYear}`,
            noOfNBCApprovals: nbcApprovals_June_Past.length,
            sizeofNBCApprovals: `${nbcApprovalSum_June_Past} Billion`,
            noOfMandates: signedMandates_June_Past.length,
            sizeofMandates: `${MandateSum_June_Past} Billion`,
            noOfCCApprovals: ccApprovals_June_Past.length,
            sizeofCCApprovals: `${CCApprovalSum_June_Past} Billion`,
            noOfClosed: closedDeals_June_Past.length,
            sizeofClosed: `${ClosedSum_June_Past} Billion`,
        },
        {
            Month_Year: `Variance(%)`,
            noOfNBCApprovals: `${(nbcApprovals_June.length - nbcApprovals_June_Past.length)*100}%`,
            sizeofNBCApprovals: `${nbcApprovalVariance_June}%`,
            noOfMandates: `${(signedMandates_June.length - signedMandates_June_Past.length)*100}%`,
            sizeofMandates: `${mandateVariance_June}%`,
            noOfCCApprovals: `${(ccApprovals_June.length - ccApprovals_June_Past.length)*100}%`,
            sizeofCCApprovals: `${ccApprovalVariance_June}%`,
            noOfClosed: `${(closedDeals_June.length - closedDeals_June_Past.length)*100}%`,
            sizeofClosed: `${closedVariance_June}%`,
        }

    ]

    july.value = [
        {
            Month_Year: `July ${stores.financialYear.slice(2)}`,
            noOfNBCApprovals: nbcApprovals_July.length,
            sizeofNBCApprovals: `${nbcApprovalSum_July} Billion`,
            noOfMandates: signedMandates_July.length,
            sizeofMandates: `${MandateSum_July} Billion`,
            noOfCCApprovals: ccApprovals_July.length,
            sizeofCCApprovals: `${CCApprovalSum_July} Billion`,
            noOfClosed: closedDeals_July.length,
            sizeofClosed: `${ClosedSum_July} Billion`,
        },
        {
            Month_Year: `July ${lastYear}`,
            noOfNBCApprovals: nbcApprovals_July_Past.length,
            sizeofNBCApprovals: `${nbcApprovalSum_July_Past} Billion`,
            noOfMandates: signedMandates_July_Past.length,
            sizeofMandates: `${MandateSum_July_Past} Billion`,
            noOfCCApprovals: ccApprovals_July_Past.length,
            sizeofCCApprovals: `${CCApprovalSum_July_Past} Billion`,
            noOfClosed: closedDeals_July_Past.length,
            sizeofClosed: `${ClosedSum_July_Past} Billion`,
        },
        {
            Month_Year: `Variance(%)`,
            noOfNBCApprovals: `${(nbcApprovals_July.length - nbcApprovals_July_Past.length)*100}%`,
            sizeofNBCApprovals: `${nbcApprovalVariance_July}%`,
            noOfMandates: `${(signedMandates_July.length - signedMandates_July_Past.length)*100}%`,
            sizeofMandates: `${mandateVariance_July}%`,
            noOfCCApprovals: `${(ccApprovals_July.length - ccApprovals_July_Past.length)*100}%`,
            sizeofCCApprovals: `${ccApprovalVariance_July}%`,
            noOfClosed: `${(closedDeals_July.length - closedDeals_July_Past.length)*100}%`,
            sizeofClosed: `${closedVariance_July}%`,
        }

    ]

    august.value = [
        {
            Month_Year: `August ${stores.financialYear.slice(2)}`,
            noOfNBCApprovals: nbcApprovals_Aug.length,
            sizeofNBCApprovals: `${nbcApprovalSum_Aug} Billion`,
            noOfMandates: signedMandates_Aug.length,
            sizeofMandates: `${MandateSum_Aug} Billion`,
            noOfCCApprovals: ccApprovals_Aug.length,
            sizeofCCApprovals: `${CCApprovalSum_Aug} Billion`,
            noOfClosed: closedDeals_Aug.length,
            sizeofClosed: `${ClosedSum_Aug} Billion`,
        },
        {
            Month_Year: `August ${lastYear}`,
            noOfNBCApprovals: nbcApprovals_Aug_Past.length,
            sizeofNBCApprovals: `${nbcApprovalSum_Aug_Past} Billion`,
            noOfMandates: signedMandates_Aug_Past.length,
            sizeofMandates: `${MandateSum_Aug_Past} Billion`,
            noOfCCApprovals: ccApprovals_Aug_Past.length,
            sizeofCCApprovals: `${CCApprovalSum_Aug_Past} Billion`,
            noOfClosed: closedDeals_Aug_Past.length,
            sizeofClosed: `${ClosedSum_Aug_Past} Billion`,
        },
        {
            Month_Year: `Variance(%)`,
            noOfNBCApprovals: `${(nbcApprovals_Aug.length - nbcApprovals_Aug_Past.length)*100}%`,
            sizeofNBCApprovals: `${nbcApprovalVariance_Aug}%`,
            noOfMandates: `${(signedMandates_Aug.length - signedMandates_Aug_Past.length)*100}%`,
            sizeofMandates: `${mandateVariance_Aug}%`,
            noOfCCApprovals: `${(ccApprovals_Aug.length - ccApprovals_Aug_Past.length)*100}%`,
            sizeofCCApprovals: `${ccApprovalVariance_Aug}%`,
            noOfClosed: `${(closedDeals_Aug.length - closedDeals_Aug_Past.length)*100}%`,
            sizeofClosed: `${closedVariance_Aug}%`,
        }
    ]

    september.value = [
        {
            Month_Year: `September ${stores.financialYear.slice(2)}`,
            noOfNBCApprovals: nbcApprovals_Sept.length,
            sizeofNBCApprovals: `${nbcApprovalSum_Sept} Billion`,
            noOfMandates: signedMandates_Sept.length,
            sizeofMandates: `${MandateSum_Sept} Billion`,
            noOfCCApprovals: ccApprovals_Sept.length,
            sizeofCCApprovals: `${CCApprovalSum_Sept} Billion`,
            noOfClosed: closedDeals_Sept.length,
            sizeofClosed: `${ClosedSum_Sept} Billion`,
        },
        {
            Month_Year: `September ${lastYear}`,
            noOfNBCApprovals: nbcApprovals_Sept_Past.length,
            sizeofNBCApprovals: `${nbcApprovalSum_Sept_Past} Billion`,
            noOfMandates: signedMandates_Sept_Past.length,
            sizeofMandates: `${MandateSum_Sept_Past} Billion`,
            noOfCCApprovals: ccApprovals_Sept_Past.length,
            sizeofCCApprovals: `${CCApprovalSum_Sept_Past} Billion`,
            noOfClosed: closedDeals_Sept_Past.length,
            sizeofClosed: `${ClosedSum_Sept_Past} Billion`,
        },
        {
            Month_Year: `Variance(%)`,
            noOfNBCApprovals: `${(nbcApprovals_Sept.length - nbcApprovals_Sept_Past.length)*100}%`,
            sizeofNBCApprovals: `${nbcApprovalVariance_Sept}%`,
            noOfMandates: `${(signedMandates_Sept.length - signedMandates_Sept_Past.length)*100}%`,
            sizeofMandates: `${mandateVariance_Sept}%`,
            noOfCCApprovals: `${(ccApprovals_Sept.length - ccApprovals_Sept_Past.length)*100}%`,
            sizeofCCApprovals: `${ccApprovalVariance_Sept}%`,
            noOfClosed: `${(closedDeals_Sept.length - closedDeals_Sept_Past.length)*100}%`,
            sizeofClosed: `${closedVariance_Sept}%`,
        }
    ]

    october.value = [
        {
            Month_Year: `October ${stores.financialYear.slice(2)}`,
            noOfNBCApprovals: nbcApprovals_Oct.length,
            sizeofNBCApprovals: `${nbcApprovalSum_Oct} Billion`,
            noOfMandates: signedMandates_Oct.length,
            sizeofMandates: `${MandateSum_Oct} Billion`,
            noOfCCApprovals: ccApprovals_Oct.length,
            sizeofCCApprovals: `${CCApprovalSum_Oct} Billion`,
            noOfClosed: closedDeals_Oct.length,
            sizeofClosed: `${ClosedSum_Oct} Billion`,
        },
        {
            Month_Year: `October ${lastYear}`,
            noOfNBCApprovals: nbcApprovals_Oct_Past.length,
            sizeofNBCApprovals: `${nbcApprovalSum_Oct_Past} Billion`,
            noOfMandates: signedMandates_Oct_Past.length,
            sizeofMandates: `${MandateSum_Oct_Past} Billion`,
            noOfCCApprovals: ccApprovals_Oct_Past.length,
            sizeofCCApprovals: `${CCApprovalSum_Oct_Past} Billion`,
            noOfClosed: closedDeals_Oct_Past.length,
            sizeofClosed: `${ClosedSum_Oct_Past} Billion`,
        },
        {
            Month_Year: `Variance(%)`,
            noOfNBCApprovals: `${(nbcApprovals_Oct.length - nbcApprovals_Oct_Past.length)*100}%`,
            sizeofNBCApprovals: `${nbcApprovalVariance_Oct}%`,
            noOfMandates: `${(signedMandates_Oct.length - signedMandates_Oct_Past.length)*100}%`,
            sizeofMandates: `${mandateVariance_Oct}%`,
            noOfCCApprovals: `${(ccApprovals_Oct.length - ccApprovals_Oct_Past.length)*100}%`,
            sizeofCCApprovals: `${ccApprovalVariance_Oct}%`,
            noOfClosed: `${(closedDeals_Oct_Past.length - closedDeals_Oct.length)*100}%`,
            sizeofClosed: `${closedVariance_Oct}%`,
        }
    ]

    november.value = [
        {
            Month_Year: `November ${stores.financialYear.slice(2)}`,
            noOfNBCApprovals: nbcApprovals_Nov.length,
            sizeofNBCApprovals: `${nbcApprovalSum_Nov} Billion`,
            noOfMandates: signedMandates_Nov.length,
            sizeofMandates: `${MandateSum_Nov} Billion`,
            noOfCCApprovals: ccApprovals_Nov.length,
            sizeofCCApprovals: `${CCApprovalSum_Nov} Billion`,
            noOfClosed: closedDeals_Nov.length,
            sizeofClosed: `${ClosedSum_Nov} Billion`,
        },
        {
            Month_Year: `November ${lastYear}`,
            noOfNBCApprovals: nbcApprovals_Nov_Past.length,
            sizeofNBCApprovals: `${nbcApprovalSum_Nov_Past} Billion`,
            noOfMandates: signedMandates_Nov_Past.length,
            sizeofMandates: `${MandateSum_Nov_Past} Billion`,
            noOfCCApprovals: ccApprovals_Nov_Past.length,
            sizeofCCApprovals: `${CCApprovalSum_Nov_Past} Billion`,
            noOfClosed: closedDeals_Nov_Past.length,
            sizeofClosed: `${ClosedSum_Nov_Past} Billion`,
        },

        {
            Month_Year: `Variance(%)`,
            noOfNBCApprovals: `${(nbcApprovals_Nov.length - nbcApprovals_Nov_Past.length)*100}%`,
            sizeofNBCApprovals: `${nbcApprovalVariance_Nov}%`,
            noOfMandates: `${(signedMandates_Nov.length - signedMandates_Nov_Past.length)*100}%`,
            sizeofMandates: `${mandateVariance_Nov}%`,
            noOfCCApprovals: `${(ccApprovals_Nov.length - ccApprovals_Nov_Past.length)*100}%`,
            sizeofCCApprovals: `${ccApprovalVariance_Nov}%`,
            noOfClosed: `${(closedDeals_Nov.length - closedDeals_Nov_Past.length)*100}%`,
            sizeofClosed: `${closedVariance_Nov}%`,
        }
    ]

    december.value = [
        {
            Month_Year: `December ${stores.financialYear.slice(2)}`,
            noOfNBCApprovals: nbcApprovals_Jan.length,
            sizeofNBCApprovals: `${nbcApprovalSum_Dec} Billion`,
            noOfMandates: signedMandates_Dec.length,
            sizeofMandates: `${MandateSum_Dec} Billion`,
            noOfCCApprovals: ccApprovals_Dec.length,
            sizeofCCApprovals: `${CCApprovalSum_Dec} Billion`,
            noOfClosed: closedDeals_Dec.length,
            sizeofClosed: `${ClosedSum_Dec} Billion`
        },
        {
            Month_Year: `December ${lastYear}`,
            noOfNBCApprovals: nbcApprovals_Dec_Past.length,
            sizeofNBCApprovals: `${nbcApprovalSum_Dec_Past} Billion`,
            noOfMandates: signedMandates_Dec_Past.length,
            sizeofMandates: `${MandateSum_Dec_Past} Billion`,
            noOfCCApprovals: ccApprovals_Dec_Past.length,
            sizeofCCApprovals: `${CCApprovalSum_Dec_Past} Billion`,
            noOfClosed: closedDeals_Dec_Past.length,
            sizeofClosed: `${ClosedSum_Dec_Past} Billion`,
        },
        {
            Month_Year: `Variance(%)`,
            noOfNBCApprovals: `${(nbcApprovals_Jan.length - nbcApprovals_Dec_Past.length)*100}%`,
            sizeofNBCApprovals: `${nbcApprovalVariance_Dec}%`,
            noOfMandates: `${(signedMandates_Dec.length - signedMandates_Dec_Past.length)*100}%`,
            sizeofMandates: `${mandateVariance_Dec}%`,
            noOfCCApprovals: `${(ccApprovals_Dec.length - ccApprovals_Dec_Past.length)*100}%`,
            sizeofCCApprovals: `${ccApprovalVariance_Dec}%`,
            noOfClosed: `${(closedDeals_Dec.length - closedDeals_Dec_Past.length)*100}%`,
            sizeofClosed: `${closedVariance_Dec}%`,
        }
    ]

    return deals
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
                                <span> Summary of Key Activities </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> No of NBC Approvals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Size of NBC Approvals (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> No of Mandate Signed (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Size of Mandate Signed (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>No of CC Approvals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Size of CC Approvals (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>No of Closed deals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Size of Closed deals (NGN) </span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(i, index) in pipelineDeals" :key=index>
                        <td>{{ i.Month_Year }}</td>
                        <td>{{ i.noOfNBCApprovals }}</td>
                        <td>{{ i.sizeofNBCApprovals }}</td>
                        <td>{{ i.noOfMandates }}</td>
                        <td>{{ i.sizeofMandates }} </td>
                        <td>{{ i.noOfCCApprovals }}</td>
                        <td>{{ i.sizeofCCApprovals }}</td>
                        <td>{{ i.noOfClosed }}</td>
                        <td>{{ i.sizeofClosed }}</td>
                    </tr>
                </tbody>
            </table>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Summary of Key Activities </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> No of NBC Approvals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Size of NBC Approvals (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> No of Mandate Signed (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Size of Mandate Signed (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>No of CC Approvals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Size of CC Approvals (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>No of Closed deals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Size of Closed deals (NGN) </span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(i, index) in february" :key=index>
                        <td>{{ i.Month_Year }}</td>
                        <td>{{ i.noOfNBCApprovals }}</td>
                        <td>{{ i.sizeofNBCApprovals }}</td>
                        <td>{{ i.noOfMandates }}</td>
                        <td>{{ i.sizeofMandates }} </td>
                        <td>{{ i.noOfCCApprovals }}</td>
                        <td>{{ i.sizeofCCApprovals }}</td>
                        <td>{{ i.noOfClosed }}</td>
                        <td>{{ i.sizeofClosed }}</td>
                    </tr>
                </tbody>
            </table>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Summary of Key Activities </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> No of NBC Approvals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Size of NBC Approvals (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> No of Mandate Signed (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Size of Mandate Signed (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>No of CC Approvals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Size of CC Approvals (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>No of Closed deals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Size of Closed deals (NGN) </span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(i, index) in march" :key=index>
                        <td>{{ i.Month_Year }}</td>
                        <td>{{ i.noOfNBCApprovals }}</td>
                        <td>{{ i.sizeofNBCApprovals }}</td>
                        <td>{{ i.noOfMandates }}</td>
                        <td>{{ i.sizeofMandates }} </td>
                        <td>{{ i.noOfCCApprovals }}</td>
                        <td>{{ i.sizeofCCApprovals }}</td>
                        <td>{{ i.noOfClosed }}</td>
                        <td>{{ i.sizeofClosed }}</td>
                    </tr>
                </tbody>
            </table>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Summary of Key Activities </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> No of NBC Approvals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Size of NBC Approvals (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> No of Mandate Signed (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Size of Mandate Signed (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>No of CC Approvals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Size of CC Approvals (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>No of Closed deals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Size of Closed deals (NGN) </span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(i, index) in april" :key=index>
                        <td>{{ i.Month_Year }}</td>
                        <td>{{ i.noOfNBCApprovals }}</td>
                        <td>{{ i.sizeofNBCApprovals }}</td>
                        <td>{{ i.noOfMandates }}</td>
                        <td>{{ i.sizeofMandates }} </td>
                        <td>{{ i.noOfCCApprovals }}</td>
                        <td>{{ i.sizeofCCApprovals }}</td>
                        <td>{{ i.noOfClosed }}</td>
                        <td>{{ i.sizeofClosed }}</td>
                    </tr>
                </tbody>
            </table>

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Summary of Key Activities </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> No of NBC Approvals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Size of NBC Approvals (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> No of Mandate Signed (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Size of Mandate Signed (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>No of CC Approvals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Size of CC Approvals (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>No of Closed deals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Size of Closed deals (NGN) </span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(i, index) in may" :key=index>
                        <td>{{ i.Month_Year }}</td>
                        <td>{{ i.noOfNBCApprovals }}</td>
                        <td>{{ i.sizeofNBCApprovals }}</td>
                        <td>{{ i.noOfMandates }}</td>
                        <td>{{ i.sizeofMandates }} </td>
                        <td>{{ i.noOfCCApprovals }}</td>
                        <td>{{ i.sizeofCCApprovals }}</td>
                        <td>{{ i.noOfClosed }}</td>
                        <td>{{ i.sizeofClosed }}</td>
                    </tr>

                </tbody>
            </table>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Summary of Key Activities </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> No of NBC Approvals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Size of NBC Approvals (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> No of Mandate Signed (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Size of Mandate Signed (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>No of CC Approvals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Size of CC Approvals (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>No of Closed deals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Size of Closed deals (NGN) </span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(i, index) in june" :key=index>
                        <td>{{ i.Month_Year }}</td>
                        <td>{{ i.noOfNBCApprovals }}</td>
                        <td>{{ i.sizeofNBCApprovals }}</td>
                        <td>{{ i.noOfMandates }}</td>
                        <td>{{ i.sizeofMandates }} </td>
                        <td>{{ i.noOfCCApprovals }}</td>
                        <td>{{ i.sizeofCCApprovals }}</td>
                        <td>{{ i.noOfClosed }}</td>
                        <td>{{ i.sizeofClosed }}</td>
                    </tr>

                </tbody>
            </table>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Summary of Key Activities </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> No of NBC Approvals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Size of NBC Approvals (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> No of Mandate Signed (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Size of Mandate Signed (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>No of CC Approvals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Size of CC Approvals (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>No of Closed deals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Size of Closed deals (NGN) </span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(i, index) in july" :key=index>
                        <td>{{ i.Month_Year }}</td>
                        <td>{{ i.noOfNBCApprovals }}</td>
                        <td>{{ i.sizeofNBCApprovals }}</td>
                        <td>{{ i.noOfMandates }}</td>
                        <td>{{ i.sizeofMandates }} </td>
                        <td>{{ i.noOfCCApprovals }}</td>
                        <td>{{ i.sizeofCCApprovals }}</td>
                        <td>{{ i.noOfClosed }}</td>
                        <td>{{ i.sizeofClosed }}</td>
                    </tr>

                </tbody>
            </table>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Summary of Key Activities </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> No of NBC Approvals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Size of NBC Approvals (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> No of Mandate Signed (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Size of Mandate Signed (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>No of CC Approvals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Size of CC Approvals (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>No of Closed deals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Size of Closed deals (NGN) </span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(i, index) in august" :key=index>
                        <td>{{ i.Month_Year }}</td>
                        <td>{{ i.noOfNBCApprovals }}</td>
                        <td>{{ i.sizeofNBCApprovals }}</td>
                        <td>{{ i.noOfMandates }}</td>
                        <td>{{ i.sizeofMandates }} </td>
                        <td>{{ i.noOfCCApprovals }}</td>
                        <td>{{ i.sizeofCCApprovals }}</td>
                        <td>{{ i.noOfClosed }}</td>
                        <td>{{ i.sizeofClosed }}</td>
                    </tr>

                </tbody>
            </table>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Summary of Key Activities </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> No of NBC Approvals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Size of NBC Approvals (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> No of Mandate Signed (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Size of Mandate Signed (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>No of CC Approvals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Size of CC Approvals (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>No of Closed deals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Size of Closed deals (NGN) </span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(i, index) in september" :key=index>
                        <td>{{ i.Month_Year }}</td>
                        <td>{{ i.noOfNBCApprovals }}</td>
                        <td>{{ i.sizeofNBCApprovals }}</td>
                        <td>{{ i.noOfMandates }}</td>
                        <td>{{ i.sizeofMandates }} </td>
                        <td>{{ i.noOfCCApprovals }}</td>
                        <td>{{ i.sizeofCCApprovals }}</td>
                        <td>{{ i.noOfClosed }}</td>
                        <td>{{ i.sizeofClosed }}</td>
                    </tr>

                </tbody>
            </table>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Summary of Key Activities </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> No of NBC Approvals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Size of NBC Approvals (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> No of Mandate Signed (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Size of Mandate Signed (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>No of CC Approvals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Size of CC Approvals (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>No of Closed deals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Size of Closed deals (NGN) </span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(i, index) in october" :key=index>
                        <td>{{ i.Month_Year }}</td>
                        <td>{{ i.noOfNBCApprovals }}</td>
                        <td>{{ i.sizeofNBCApprovals }}</td>
                        <td>{{ i.noOfMandates }}</td>
                        <td>{{ i.sizeofMandates }} </td>
                        <td>{{ i.noOfCCApprovals }}</td>
                        <td>{{ i.sizeofCCApprovals }}</td>
                        <td>{{ i.noOfClosed }}</td>
                        <td>{{ i.sizeofClosed }}</td>
                    </tr>

                </tbody>
            </table>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Summary of Key Activities </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> No of NBC Approvals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Size of NBC Approvals (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> No of Mandate Signed (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Size of Mandate Signed (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>No of CC Approvals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Size of CC Approvals (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>No of Closed deals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Size of Closed deals (NGN) </span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(i, index) in november" :key=index>
                        <td>{{ i.Month_Year }}</td>
                        <td>{{ i.noOfNBCApprovals }}</td>
                        <td>{{ i.sizeofNBCApprovals }}</td>
                        <td>{{ i.noOfMandates }}</td>
                        <td>{{ i.sizeofMandates }} </td>
                        <td>{{ i.noOfCCApprovals }}</td>
                        <td>{{ i.sizeofCCApprovals }}</td>
                        <td>{{ i.noOfClosed }}</td>
                        <td>{{ i.sizeofClosed }}</td>
                    </tr>

                </tbody>
            </table>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Summary of Key Activities </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> No of NBC Approvals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Size of NBC Approvals (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> No of Mandate Signed (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Size of Mandate Signed (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>No of CC Approvals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Size of CC Approvals (NGN) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>No of Closed deals (#) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>Size of Closed deals (NGN) </span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(i, index) in december" :key=index>
                        <td>{{ i.Month_Year }}</td>
                        <td>{{ i.noOfNBCApprovals }}</td>
                        <td>{{ i.sizeofNBCApprovals }}</td>
                        <td>{{ i.noOfMandates }}</td>
                        <td>{{ i.sizeofMandates }} </td>
                        <td>{{ i.noOfCCApprovals }}</td>
                        <td>{{ i.sizeofCCApprovals }}</td>
                        <td>{{ i.noOfClosed }}</td>
                        <td>{{ i.sizeofClosed }}</td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
</template>
<style scope>
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
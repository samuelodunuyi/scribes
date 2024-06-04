<script setup>
import LineChart from '../../components/Charts/LineChart.vue';
import Target from '../../components/Charts/Target.vue';
import BarChart from '../../components/Charts/BarChartUser.vue';
import BarChartIncentive from '../../components/Charts/BarChartIncentive.vue';
import TableDashBoard from '../../components/Tables/TableDashBoard.vue';
import PieChartDeal from '../../components/Charts/PieChartDeal.vue';
import PieChartRegionsUsers from '../../components/Charts/PieChartRegionsUser.vue';
import PieChartProducts from '../../components/Charts/PieChartProductsUser.vue';
import sampleData from '../../data/sampleData.json'
import { useDashOptionStore } from "../../stores/dashOption"
import pinia from "../../stores/store";
import { ref, computed } from 'vue';
import trmsService from '../../services/trmsService';
const props = defineProps(['data', 'dealSec', 'fundOption', 'selectedUserList', 'addFilter', 'performance'])
const stores = useDashOptionStore(pinia);
const numofNW = ref('')
const numofSS = ref('')
const numofSE = ref('')
const numofSW = ref('')
const numofNC = ref('')
const numofNA = ref('')
const numofNE = ref('')
const numofTotal = ref('')
const numofTotalRegion = ref('')
const numofRed = ref('')
const numofAmber = ref('')
const numofGreen = ref('')
const numofClosed = ref('')
const numofAnnuityPPP = ref('')
const numofpublicBond = ref('')
const numofblendedFinance = ref('')
const numofcontingentRefinancing = ref('')
const numofprivateBond_Others = ref('')
const numofprivateBond_CleanEnergy = ref('')
const NWTotalDealSize = ref('')
const numofTotalProducts = ref('')
const numofTotalIndustries = ref('')
const SSTotalDealSize = ref('')
const SETotalDealSize = ref('')
const SWTotalDealSize = ref('')
const NCTotalDealSize = ref('')
const NETotalDealSize = ref('')
const NATotalDealSize = ref('')
const AnnuityPPPTotalDealSize = ref('')
const publicBondTotalDealSize = ref('')
const blendedFinanceTotalDealSize = ref('')
const contingentRefinancingTotalDealSize = ref('')
const privateBond_OthersTotalDealSize = ref('')
const privateBond_CleanEnergyTotalDealSize = ref('')
const redTotalDealSize = ref('')
const amberTotalDealSize = ref('')
const greenTotalDealSize = ref('')
const TotalDealSize = ref('')
const TotalProductSize = ref('')
const NWPercentageDealSize = ref('')
const NEPercentageDealSize = ref('')
const SWPercentageDealSize = ref('')
const SSPercentageDealSize = ref('')
const SEPercentageDealSize = ref('')
const NCPercentageDealSize = ref('')
const NAPercentageDealSize = ref('')
const AnnuityPPPPercentageDealSize = ref('')
const publicBondPercentageDealSize = ref('')
const blendedFinancePercentageDealSize = ref('')
const contingentRefinancingPercentageDealSize = ref('')
const privateBond_OthersPercentageDealSize = ref('')
const privateBond_CleanEnergyPercentageDealSize = ref('')
const numofAffordableHousingRED = ref('')
const numofAffordableHousingAMBER = ref('')
const numofAffordableHousingGREEN = ref('')
const numofagricInfraRED = ref('')
const numofagricInfraAMBER = ref('')
const numofagricInfraGREEN = ref('')
const numofeducationInfraRED = ref('')
const numofeducationInfraAMBER = ref('')
const numofeducationInfraGREEN = ref('')
const numofgasToCleanRED = ref('')
const numofgasToCleanAMBER = ref('')
const numofgasToCleanGREEN = ref('')
const numofgasToPowerRED = ref('')
const numofgasToPowerAMBER = ref('')
const numofgasToPowerGREEN = ref('')
const numofHealthcareRED = ref('')
const numofHealthcareAMBER = ref('')
const numofHealthcareGREEN = ref('')
const numofICT_TelcomRED = ref('')
const numofICT_TelcomAMBER = ref('')
const numofICT_TelcomGREEN = ref('')
const numofInfra_LogisticsRED = ref('')
const numofInfra_LogisticsAMBER = ref('')
const numofInfra_LogisticsGREEN = ref('')
const numofinputsToInfraRED = ref('')
const numofinputsToInfraAMBER = ref('')
const numofinputsToInfraGREEN = ref('')
const numoflogisticsRED = ref('')
const numoflogisticsAMBER = ref('')
const numoflogisticsGREEN = ref('')
const numofoffGridPowerRED = ref('')
const numofoffGridPowerAMBER = ref('')
const numofoffGridPowerGREEN = ref('')
const numofonGridPowerRED = ref('')
const numofonGridPowerAMBER = ref('')
const numofonGridPowerGREEN = ref('')
const numofrenewableEnergyRED = ref('')
const numofrenewableEnergyAMBER = ref('')
const numofrenewableEnergyGREEN = ref('')
const numoftransportationRED = ref('')
const numoftransportationAMBER = ref('')
const numoftransportationGREEN = ref('')
const numofwater_wasteRED = ref('')
const numofwater_wasteAMBER = ref('')
const numofwater_wasteGREEN = ref('')
const AffordableHousingTotalRED = ref('')
const AffordableHousingTotalAMBER = ref('')
const AffordableHousingTotalGREEN = ref('')
const agricInfraTotalRED = ref('')
const agricInfraTotalAMBER = ref('')
const agricInfraTotalGREEN = ref('')
const educationInfraTotalRED = ref('')
const educationInfraTotalAMBER = ref('')
const educationInfraTotalGREEN = ref('')
const gasToCleanTotalRED = ref('')
const gasToCleanTotalAMBER = ref('')
const gasToCleanTotalGREEN = ref('')
const gasToPowerTotalRED = ref('')
const gasToPowerTotalAMBER = ref('')
const gasToPowerTotalGREEN = ref('')
const HealthcareTotalRED = ref('')
const HealthcareTotalAMBER = ref('')
const HealthcareTotalGREEN = ref('')
const ICT_TelcomTotalRED = ref('')
const ICT_TelcomTotalAMBER = ref('')
const ICT_TelcomTotalGREEN = ref('')
const Infra_LogisticsTotalRED = ref('')
const Infra_LogisticsTotalAMBER = ref('')
const Infra_LogisticsTotalGREEN = ref('')
const inputsToInfraTotalRED = ref('')
const inputsToInfraTotalAMBER = ref('')
const inputsToInfraTotalGREEN = ref('')
const logisticsTotalRED = ref('')
const logisticsTotalAMBER = ref('')
const logisticsTotalGREEN = ref('')
const offGridPowerTotalRED = ref('')
const offGridPowerTotalAMBER = ref('')
const offGridPowerTotalGREEN = ref('')
const onGridPowerTotalRED = ref('')
const onGridPowerTotalAMBER = ref('')
const onGridPowerTotalGREEN = ref('')
const renewableEnergyTotalRED = ref('')
const renewableEnergyTotalAMBER = ref('')
const renewableEnergyTotalGREEN = ref('')
const transportationTotalRED = ref('')
const transportationTotalAMBER = ref('')
const transportationTotalGREEN = ref('')
const water_wasteTotalRED = ref('')
const water_wasteTotalAMBER = ref('')
const water_wasteTotalGREEN = ref('')
const cumulativeData = sampleData.cumulative
const dealStats2 = ref([])
const dealStats3 = ref([])
const dealStats4 = ref([])
const dealStats5 = ref([])
const userPerformance = ref([])
const allPerformance = ref([])
const filteredUser = ref('')
const varianceMandate = ref('')
const varianceCC = ref('')
const varianceFeeLetter = ref('')
const varianceClosing = ref('')
const percentageClosing = ref('')
const percentageFeeLetter = ref('')
const percentageCC = ref('')
const percentageMandate = ref('')
const closedTotalDealSize = ref('')
const mandateSign = ref(false)
const ccSign = ref(false)
const FeeLetterSign = ref(false)
const FinaicialCloseSign = ref(false)
const ccShow = ref(false)
const feeLetterShow = ref(false)
const closingShow = ref(false)
const originationShow = ref(false)
const dialogTransactionList = ref(false)
const selectedValue = ref([])

const computedTileDataRegions = computed(() => {
    if (props.data != null && props.data.length != 0) {
        if (props.selectedUserList.length > 0) {
            filteredUser.value = props.selectedUserList
        }
        else {
            filteredUser.value = stores.signedInUserEmail
        }
        let allDeals = props.data
        allDeals = allDeals.filter(o => new Date(o.financialYearName.slice(2)).getFullYear() <= new Date(stores.financialYear.slice(2)).getFullYear() && o.dealStatus==true)

        if (props.dealSec == 'myDeals') {
            var NW = allDeals.filter(o => o.regionCode == 'NW' && o.leadTransactor == filteredUser.value && o.dealCategory != 'CLOSED' || o.regionCode == 'NW' && o.originator == filteredUser.value && o.dealCategory != 'CLOSED' || o.regionCode == 'NW' && o.coTransactor == filteredUser.value && o.dealCategory != 'CLOSED')
            var SS = allDeals.filter(o => o.regionCode == 'SS' && o.leadTransactor == filteredUser.value && o.dealCategory != 'CLOSED' || o.regionCode == 'SS' && o.originator == filteredUser.value && o.dealCategory != 'CLOSED' || o.regionCode == 'SS' && o.coTransactor == filteredUser.value && o.dealCategory != 'CLOSED')
            var SE = allDeals.filter(o => o.regionCode == 'SE' && o.leadTransactor == filteredUser.value && o.dealCategory != 'CLOSED' || o.regionCode == 'SE' && o.originator == filteredUser.value && o.dealCategory != 'CLOSED' || o.regionCode == 'SE' && o.coTransactor == filteredUser.value && o.dealCategory != 'CLOSED')
            var SW = allDeals.filter(o => o.regionCode == 'SW' && o.leadTransactor == filteredUser.value && o.dealCategory != 'CLOSED' || o.regionCode == 'SW' && o.originator == filteredUser.value && o.dealCategory != 'CLOSED' || o.regionCode == 'SW' && o.coTransactor == filteredUser.value && o.dealCategory != 'CLOSED')
            var NC = allDeals.filter(o => o.regionCode == 'NC' && o.leadTransactor == filteredUser.value && o.dealCategory != 'CLOSED' || o.regionCode == 'NC' && o.originator == filteredUser.value && o.dealCategory != 'CLOSED' || o.regionCode == 'NC' && o.coTransactor == filteredUser.value && o.dealCategory != 'CLOSED')
            var NE = allDeals.filter(o => o.regionCode == 'NE' && o.leadTransactor == filteredUser.value && o.dealCategory != 'CLOSED' || o.regionCode == 'NE' && o.originator == filteredUser.value && o.dealCategory != 'CLOSED' || o.regionCode == 'NE' && o.coTransactor == filteredUser.value && o.dealCategory != 'CLOSED')
            var NA = allDeals.filter(o => o.regionCode == 'NA' && o.leadTransactor == filteredUser.value && o.dealCategory != 'CLOSED' || o.regionCode == 'NA' && o.originator == filteredUser.value && o.dealCategory != 'CLOSED' || o.regionCode == 'NA' && o.coTransactor == filteredUser.value && o.dealCategory != 'CLOSED')
        }
        else if (props.dealSec == 'allDeals') {
            var NW = allDeals.filter(o => o.regionCode == 'NW')
            var SS = allDeals.filter(o => o.regionCode == 'SS')
            var SE = allDeals.filter(o => o.regionCode == 'SE')
            var SW = allDeals.filter(o => o.regionCode == 'SW')
            var NC = allDeals.filter(o => o.regionCode == 'NC')
            var NE = allDeals.filter(o => o.regionCode == 'NE')
            var NA = allDeals.filter(o => o.regionCode == 'NA')
        }

        if (props.fundOption != '' && props.fundOption && props.fundOption == 'BOI') {
            var NW = NW.filter(o => o.fundOptionBOI == true)
            var SS = SS.filter(o => o.fundOptionBOI == true)
            var SE = SE.filter(o => o.fundOptionBOI == true)
            var SW = SW.filter(o => o.fundOptionBOI == true)
            var NC = NC.filter(o => o.fundOptionBOI == true)
            var NE = NE.filter(o => o.fundOptionBOI == true)
            var NA = NA.filter(o => o.fundOptionBOI == true)
        }

        else if (props.fundOption != '' && props.fundOption && props.fundOption == 'DCM') {
            var NW = NW.filter(o => o.fundOptionDCM == true)
            var SS = SS.filter(o => o.fundOptionDCM == true)
            var SE = SE.filter(o => o.fundOptionDCM == true)
            var SW = SW.filter(o => o.fundOptionDCM == true)
            var NC = NC.filter(o => o.fundOptionDCM == true)
            var NE = NE.filter(o => o.fundOptionDCM == true)
            var NA = NA.filter(o => o.fundOptionDCM == true)
        }
        else if (props.fundOption != '' && props.fundOption && props.fundOption == 'PCB') {
            var NW = NW.filter(o => o.fundOptionPCB == true)
            var SS = SS.filter(o => o.fundOptionPCB == true)
            var SE = SE.filter(o => o.fundOptionPCB == true)
            var SW = SW.filter(o => o.fundOptionPCB == true)
            var NC = NC.filter(o => o.fundOptionPCB == true)
            var NE = NE.filter(o => o.fundOptionPCB == true)
            var NA = NA.filter(o => o.fundOptionPCB == true)
        }
        numofNW.value = NW.length
        numofSS.value = SS.length
        numofSE.value = SE.length
        numofSW.value = SW.length
        numofNC.value = NC.length
        numofNA.value = NA.length
        numofNE.value = NE.length

        let isNW = null
        let isSS = null
        let isSE = null
        let isSW = null
        let isNC = null
        let isNE = null
        let isNA = null

        if (numofNW.value > 0) {
            isNW = 1
        }
        if (numofSS.value > 0) {
            isSS = 1
        }
        if (numofSE.value > 0) {
            isSE = 1
        }
        if (numofSW.value > 0) {
            isSW = 1
        }
        if (numofNC.value > 0) {
            isNC = 1
        }
        if (numofNE.value > 0) {
            isNE = 1
        }
        if (numofNA.value > 0) {
            isNA = 1
        }
        numofTotalRegion.value = isNW + isSS + isSE + isSW + isNC + isNE + isNA
        //    numofTotalRegion.value = numofNW.value + numofSS.value + numofSE.value + numofSW.value + numofNC.value + numofNE.value

        const cartPricesArrays = NC.map(({ actualCloseDate, administrator, advanceInMN, advancePercent, amortisationStyle, amortizationDiscountFactor, amortizationFirstCouponDate, amortizationGuaranteeFeeRate, amortizationIssueDate, amortizationStatus, amortizationTakingFirstInterestEarly, amountInMN, ccSubmissionDate, coTransactor, companyDescription, companyEmailAddress, companyId, companyName, couponPercent, createdBy, createdDate, creditApprovalDate, creditCommitteeApprovalObtained, creditCommitteeApprovalPending, dealCategory, dealFundOption, dealId, documentationExpectedToSignInEightWks, dueDiligenceOngoing, executedDocumentation, expectedCloseDate, feeLetterDate, filingWithSEC, finalPercent, financialCloseExpectedWithinSixMonths, financialCloseReached,
            guaranteeDocumentInAgreedForm, guaranteePercent, industryId, industrySector, lastModifiedBy, lastModifiedDate, leadId, leadTransactor, mandateLetterDate, mandateLetterOnboardingDocumentLink, mandateLetterOnboardingDocumentLinkDate, mandateLetterSigned, materialsCPsToFinancialCloseIsSatisfactory, materialsCPsWithTimelinesAgreed, monitoringInMN, moratoriumInYrs, mrocPreNBCApprovalDocLink,
            mrocPreNBCApprovalDocLinkDate, mrocPreNBCMinutesDocLink, mrocPreNBCMinutesDocLinkDate, nbcApprovalDate, nbcApprovalDocLink, nbcApprovalDocLinkDate, nbcMinutesDocLink, nbcMinutesDocLinkDate, nbcSubmissionDate, originator, productDescription, productId, professionalPartiesAppointed, recordOwner, regionName, reimbursableInMN, repaymentFrequency, tenorInYrs, transactionDescription, transactionPhase, transactorLegal, ...rest }) => ({ ...rest }))
        const cartPricesArrayString = cartPricesArrays.map(function (item) {
            return item.dealSize;
        });
        const cartPricesArrays2 = SE.map(({ dealId, leadId, companyId, companyDescription, originator, leadTransactor, coTransactor,
            transactorLegal, administrator, createdBy, lastModifiedBy, createdDate, lastModifiedDate, recordOwner, transactionPhase, transactionDescription, industryId, productId, dealCategory, amountInMN, couponPercent, tenorInYrs, moratoriumInYrs, repaymentFrequency, amortisationStyle,
            mandateLetterDate, creditApprovalDate, feeLetterDate, expectedCloseDate, actualCloseDate, nbcApprovalDate, nbcSubmissionDate,
            ccSubmissionDate, advanceInMN, advancePercent, finalPercent, guaranteePercent, monitoringInMN, reimbursableInMNcount, ...rest }) => ({ ...rest }))
        const cartPricesArrayString2 = cartPricesArrays2.map(function (item) {
            return item.dealSize;
        });
        const cartPricesArrays3 = SS.map(({ dealId, leadId, companyId, companyDescription, originator, leadTransactor, coTransactor,
            transactorLegal, administrator, createdBy, lastModifiedBy, createdDate, lastModifiedDate, recordOwner, transactionPhase, transactionDescription, industryId, productId, dealCategory, amountInMN, couponPercent, tenorInYrs, moratoriumInYrs, repaymentFrequency, amortisationStyle,
            mandateLetterDate, creditApprovalDate, feeLetterDate, expectedCloseDate, actualCloseDate, nbcApprovalDate, nbcSubmissionDate,
            ccSubmissionDate, advanceInMN, advancePercent, finalPercent, guaranteePercent, monitoringInMN, reimbursableInMNcount, ...rest }) => ({ ...rest }))
        const cartPricesArrayString3 = cartPricesArrays3.map(function (item) {
            return item.dealSize;
        });
        const cartPricesArrays4 = SW.map(({ dealId, leadId, companyId, companyDescription, originator, leadTransactor, coTransactor,
            transactorLegal, administrator, createdBy, lastModifiedBy, createdDate, lastModifiedDate, recordOwner, transactionPhase, transactionDescription, industryId, productId, dealCategory, amountInMN, couponPercent, tenorInYrs, moratoriumInYrs, repaymentFrequency, amortisationStyle,
            mandateLetterDate, creditApprovalDate, feeLetterDate, expectedCloseDate, actualCloseDate, nbcApprovalDate, nbcSubmissionDate,
            ccSubmissionDate, advanceInMN, advancePercent, finalPercent, guaranteePercent, monitoringInMN, reimbursableInMNcount, ...rest }) => ({ ...rest }))
        const cartPricesArrayString4 = cartPricesArrays4.map(function (item) {
            return item.dealSize;
        });
        const cartPricesArray5s = NE.map(({ actualCloseDate, administrator, advanceInMN, advancePercent, amortisationStyle, amortizationDiscountFactor, amortizationFirstCouponDate, amortizationGuaranteeFeeRate, amortizationIssueDate, amortizationStatus, amortizationTakingFirstInterestEarly, amountInMN, ccSubmissionDate, coTransactor, companyDescription, companyEmailAddress, companyId, companyName, couponPercent, createdBy, createdDate, creditApprovalDate, creditCommitteeApprovalObtained, creditCommitteeApprovalPending, dealCategory, dealFundOption, dealId, documentationExpectedToSignInEightWks, dueDiligenceOngoing, executedDocumentation, expectedCloseDate, feeLetterDate, filingWithSEC, finalPercent, financialCloseExpectedWithinSixMonths, financialCloseReached,
            guaranteeDocumentInAgreedForm, guaranteePercent, industryId, industrySector, lastModifiedBy, lastModifiedDate, leadId, leadTransactor, mandateLetterDate, mandateLetterOnboardingDocumentLink, mandateLetterOnboardingDocumentLinkDate, mandateLetterSigned, materialsCPsToFinancialCloseIsSatisfactory, materialsCPsWithTimelinesAgreed, monitoringInMN, moratoriumInYrs, mrocPreNBCApprovalDocLink,
            mrocPreNBCApprovalDocLinkDate, mrocPreNBCMinutesDocLink, mrocPreNBCMinutesDocLinkDate, nbcApprovalDate, nbcApprovalDocLink, nbcApprovalDocLinkDate, nbcMinutesDocLink, nbcMinutesDocLinkDate, nbcSubmissionDate, originator, productDescription, productId, professionalPartiesAppointed, recordOwner, regionName, reimbursableInMN, repaymentFrequency, tenorInYrs, transactionDescription, transactionPhase, transactorLegal, ...rest }) => ({ ...rest }))
        const cartPricesArrayString5 = cartPricesArray5s.map(function (item) {
            return item.dealSize;
        });
        const cartPricesArrays6 = NW.map(({ dealId, leadId, companyId, companyDescription, originator, leadTransactor, coTransactor,
            transactorLegal, administrator, createdBy, lastModifiedBy, createdDate, lastModifiedDate, recordOwner, transactionPhase, transactionDescription, industryId, productId, dealCategory, amountInMN, couponPercent, tenorInYrs, moratoriumInYrs, repaymentFrequency, amortisationStyle,
            mandateLetterDate, creditApprovalDate, feeLetterDate, expectedCloseDate, actualCloseDate, nbcApprovalDate, nbcSubmissionDate,
            ccSubmissionDate, advanceInMN, advancePercent, finalPercent, guaranteePercent, monitoringInMN, reimbursableInMNcount, ...rest }) => ({ ...rest }))
        const cartPricesArrayString6 = cartPricesArrays6.map(function (item) {
            return item.dealSize;
        });
        const cartPricesArrays7 = NA.map(({ dealId, leadId, companyId, companyDescription, originator, leadTransactor, coTransactor,
            transactorLegal, administrator, createdBy, lastModifiedBy, createdDate, lastModifiedDate, recordOwner, transactionPhase, transactionDescription, industryId, productId, dealCategory, amountInMN, couponPercent, tenorInYrs, moratoriumInYrs, repaymentFrequency, amortisationStyle,
            mandateLetterDate, creditApprovalDate, feeLetterDate, expectedCloseDate, actualCloseDate, nbcApprovalDate, nbcSubmissionDate,
            ccSubmissionDate, advanceInMN, advancePercent, finalPercent, guaranteePercent, monitoringInMN, reimbursableInMNcount, ...rest }) => ({ ...rest }))
        const cartPricesArrayString7 = cartPricesArrays7.map(function (item) {
            return item.dealSize;
        });

        NWTotalDealSize.value = cartPricesArrayString6.reduce((partialSum, a) => (partialSum + a), 0);
        NETotalDealSize.value = cartPricesArrayString5.reduce((partialSum, a) => (partialSum + a), 0);
        SWTotalDealSize.value = cartPricesArrayString4.reduce((partialSum, a) => (partialSum + a), 0);
        SSTotalDealSize.value = cartPricesArrayString3.reduce((partialSum, a) => (partialSum + a), 0);
        SETotalDealSize.value = cartPricesArrayString2.reduce((partialSum, a) => (partialSum + a), 0);
        NCTotalDealSize.value = cartPricesArrayString.reduce((partialSum, a) => (partialSum + a), 0);
        NATotalDealSize.value = cartPricesArrayString7.reduce((partialSum, a) => (partialSum + a), 0);
        TotalDealSize.value = NWTotalDealSize.value + NETotalDealSize.value + SWTotalDealSize.value + SSTotalDealSize.value + SETotalDealSize.value + NCTotalDealSize.value + NATotalDealSize.value;

        NWPercentageDealSize.value = ((NWTotalDealSize.value / TotalDealSize.value) * 100).toFixed(0)
        NEPercentageDealSize.value = ((NETotalDealSize.value / TotalDealSize.value) * 100).toFixed(0)
        SWPercentageDealSize.value = ((SWTotalDealSize.value / TotalDealSize.value) * 100).toFixed(0)
        SSPercentageDealSize.value = ((SSTotalDealSize.value / TotalDealSize.value) * 100).toFixed(0)
        SEPercentageDealSize.value = ((SETotalDealSize.value / TotalDealSize.value) * 100).toFixed(0)
        NCPercentageDealSize.value = ((NCTotalDealSize.value / TotalDealSize.value) * 100).toFixed(0)
        NAPercentageDealSize.value = ((NATotalDealSize.value / TotalDealSize.value) * 100).toFixed(0)
        dealStats3.value = [
            {
                "title": "NW",
                "number": numofNW.value,
                "amount": parseFloat(NWTotalDealSize.value).toFixed(3),
                "percentage": `${NWPercentageDealSize.value}`
            },
            {
                "title": "SS",
                "number": numofSS.value,
                "amount": parseFloat(SSTotalDealSize.value).toFixed(3),
                "percentage": `${SSPercentageDealSize.value}`
            },
            {
                "title": "SE",
                "number": numofSE.value,
                "amount": parseFloat(SETotalDealSize.value).toFixed(3),
                "percentage": `${SEPercentageDealSize.value}`
            },
            {
                "title": "SW",
                "number": numofSW.value,
                "amount": parseFloat(SWTotalDealSize.value).toFixed(3),
                "percentage": `${SWPercentageDealSize.value}`
            },
            {
                "title": "NC",
                "number": numofNC.value,
                "amount": parseFloat(NCTotalDealSize.value).toFixed(3),
                "percentage": `${NCPercentageDealSize.value}`
            },
            {
                "title": "NA",
                "number": numofNA.value,
                "amount": parseFloat(NATotalDealSize.value).toFixed(3),
                "percentage": `${NAPercentageDealSize.value}`
            },
            {
                "title": "NE",
                "number": numofNE.value,
                "amount": parseFloat(NETotalDealSize.value).toFixed(3),
                "percentage": `${NEPercentageDealSize.value}`
            },
        ]
        return dealStats3.value
    }
})

const computedTileDataIndustries = computed(() => {
    if (props.data != null && props.data.length != 0) {
        let allDeals = props.data
        allDeals = allDeals.filter(o => new Date(o.financialYearName.slice(2)).getFullYear() <= new Date(stores.financialYear.slice(2)).getFullYear() && o.dealStatus==true)

        if (props.dealSec == 'myDeals') {
            var afforableHousingRED = allDeals.filter(o => o.industrySector == 'Affordable Housing' && o.leadTransactor == filteredUser.value && o.dealCategory == 'RED' || o.industrySector == 'Affordable Housing' && o.originator == filteredUser.value && o.dealCategory == 'RED')
            var afforableHousingAMBER = allDeals.filter(o => o.industrySector == 'Affordable Housing' && o.leadTransactor == filteredUser.value && o.dealCategory == 'AMBER' || o.industrySector == 'Affordable Housing' && o.originator == filteredUser.value && o.dealCategory == 'AMBER')
            var afforableHousingGREEN = allDeals.filter(o => o.industrySector == 'Affordable Housing' && o.leadTransactor == filteredUser.value && o.dealCategory == 'GREEN' || o.industrySector == 'Affordable Housing' && o.originator == filteredUser.value && o.dealCategory == 'GREEN')
            var agricInfraRED = allDeals.filter(o => o.industrySector == 'Agric. Infrastructure' && o.leadTransactor == filteredUser.value && o.dealCategory == 'RED' || o.industrySector == 'Agric. Infrastructure' && o.originator == filteredUser.value && o.dealCategory == 'RED')
            var agricInfraAMBER = allDeals.filter(o => o.industrySector == 'Agric. Infrastructure' && o.leadTransactor == filteredUser.value && o.dealCategory == 'AMBER' || o.industrySector == 'Agric. Infrastructure' && o.originator == filteredUser.value && o.dealCategory == 'AMBER')
            var agricInfraGREEN = allDeals.filter(o => o.industrySector == 'Agric. Infrastructure' && o.leadTransactor == filteredUser.value && o.dealCategory == 'GREEN' || o.industrySector == 'Agric. Infrastructure' && o.originator == filteredUser.value && o.dealCategory == 'GREEN')
            var educationInfraRED = allDeals.filter(o => o.industrySector == 'Education Infrastructure' && o.leadTransactor == filteredUser.value && o.dealCategory == 'RED' || o.industrySector == 'Education Infrastructure' && o.originator == filteredUser.value && o.dealCategory == 'RED')
            var educationInfraAMBER = allDeals.filter(o => o.industrySector == 'Education Infrastructure' && o.leadTransactor == filteredUser.value && o.dealCategory == 'AMBER' || o.industrySector == 'Education Infrastructure' && o.originator == filteredUser.value && o.dealCategory == 'AMBER')
            var educationInfraGREEN = allDeals.filter(o => o.industrySector == 'Education Infrastructure' && o.leadTransactor == filteredUser.value && o.dealCategory == 'GREEN' || o.industrySector == 'Education Infrastructure' && o.originator == filteredUser.value && o.dealCategory == 'GREEN')
            var gasToCleanRED = allDeals.filter(o => o.industrySector == 'Gas-to-Clean' && o.leadTransactor == filteredUser.value && o.dealCategory == 'RED' || o.industrySector == 'Gas-to-Clean' && o.originator == filteredUser.value && o.dealCategory == 'RED')
            var gasToCleanAMBER = allDeals.filter(o => o.industrySector == 'Gas-to-Clean' && o.leadTransactor == filteredUser.value && o.dealCategory == 'AMBER' || o.industrySector == 'Gas-to-Clean' && o.originator == filteredUser.value && o.dealCategory == 'AMBER')
            var gasToCleanGREEN = allDeals.filter(o => o.industrySector == 'Gas-to-Clean' && o.leadTransactor == filteredUser.value && o.dealCategory == 'GREEN' || o.industrySector == 'Gas-to-Clean' && o.originator == filteredUser.value && o.dealCategory == 'GREEN')
            var gasToPowerRED = allDeals.filter(o => o.industrySector == 'Gas-to-Power' && o.leadTransactor == filteredUser.value && o.dealCategory == 'RED' || o.industrySector == 'Gas-to-Power' && o.originator == filteredUser.value && o.dealCategory == 'RED')
            var gasToPowerAMBER = allDeals.filter(o => o.industrySector == 'Gas-to-Power' && o.leadTransactor == filteredUser.value && o.dealCategory == 'AMBER' || o.industrySector == 'Gas-to-Power' && o.originator == filteredUser.value && o.dealCategory == 'AMBER')
            var gasToPowerGREEN = allDeals.filter(o => o.industrySector == 'Gas-to-Power' && o.leadTransactor == filteredUser.value && o.dealCategory == 'GREEN' || o.industrySector == 'Gas-to-Power' && o.originator == filteredUser.value && o.dealCategory == 'GREEN')
            var HealthcareRED = allDeals.filter(o => o.industrySector == 'Healthcare' && o.leadTransactor == filteredUser.value && o.dealCategory == 'RED' || o.industrySector == 'Healthcare' && o.originator == filteredUser.value && o.dealCategory == 'RED')
            var HealthcareAMBER = allDeals.filter(o => o.industrySector == 'Healthcare' && o.leadTransactor == filteredUser.value && o.dealCategory == 'AMBER' || o.industrySector == 'Healthcare' && o.originator == filteredUser.value && o.dealCategory == 'AMBER')
            var HealthcareGREEN = allDeals.filter(o => o.industrySector == 'Healthcare' && o.leadTransactor == filteredUser.value && o.dealCategory == 'GREEN' || o.industrySector == 'Healthcare' && o.originator == filteredUser.value && o.dealCategory == 'GREEN')
            var ICT_TelcomRED = allDeals.filter(o => o.industrySector == 'ICT/Telecoms' && o.leadTransactor == filteredUser.value && o.dealCategory == 'RED' || o.industrySector == 'ICT/Telecoms' && o.originator == filteredUser.value && o.dealCategory == 'RED')
            var ICT_TelcomAMBER = allDeals.filter(o => o.industrySector == 'ICT/Telecoms' && o.leadTransactor == filteredUser.value && o.dealCategory == 'AMBER' || o.industrySector == 'ICT/Telecoms' && o.originator == filteredUser.value && o.dealCategory == 'AMBER')
            var ICT_TelcomGREEN = allDeals.filter(o => o.industrySector == 'ICT/Telecoms' && o.leadTransactor == filteredUser.value && o.dealCategory == 'GREEN' || o.industrySector == 'ICT/Telecoms' && o.originator == filteredUser.value && o.dealCategory == 'GREEN')
            var Infra_LogisticsRED = allDeals.filter(o => o.industrySector == 'Infrastructure/Logistics' && o.leadTransactor == filteredUser.value && o.dealCategory == 'RED' || o.industrySector == 'Infrastructure/Logistics' && o.originator == filteredUser.value && o.dealCategory == 'RED')
            var Infra_LogisticsAMBER = allDeals.filter(o => o.industrySector == 'Infrastructure/Logistics' && o.leadTransactor == filteredUser.value && o.dealCategory == 'AMBER' || o.industrySector == 'Infrastructure/Logistics' && o.originator == filteredUser.value && o.dealCategory == 'AMBER')
            var Infra_LogisticsGREEN = allDeals.filter(o => o.industrySector == 'Infrastructure/Logistics' && o.leadTransactor == filteredUser.value && o.dealCategory == 'GREEN' || o.industrySector == 'Infrastructure/Logistics' && o.originator == filteredUser.value && o.dealCategory == 'GREEN')
            var inputsToInfraRED = allDeals.filter(o => o.industrySector == 'Inputs to Infrastructure' && o.leadTransactor == filteredUser.value && o.dealCategory == 'RED' || o.industrySector == 'Inputs to Infrastructure' && o.originator == filteredUser.value && o.dealCategory == 'RED')
            var inputsToInfraAMBER = allDeals.filter(o => o.industrySector == 'Inputs to Infrastructure' && o.leadTransactor == filteredUser.value && o.dealCategory == 'AMBER' || o.industrySector == 'Inputs to Infrastructure' && o.originator == filteredUser.value && o.dealCategory == 'AMBER')
            var inputsToInfraGREEN = allDeals.filter(o => o.industrySector == 'Inputs to Infrastructure' && o.leadTransactor == filteredUser.value && o.dealCategory == 'GREEN' || o.industrySector == 'Inputs to Infrastructure' && o.originator == filteredUser.value && o.dealCategory == 'GREEN')
            var logisticsRED = allDeals.filter(o => o.industrySector == 'Logistics' && o.leadTransactor == filteredUser.value && o.dealCategory == 'RED' || o.industrySector == 'Logistics' && o.originator == filteredUser.value && o.dealCategory == 'RED')
            var logisticsAMBER = allDeals.filter(o => o.industrySector == 'Logistics' && o.leadTransactor == filteredUser.value && o.dealCategory == 'AMBER' || o.industrySector == 'Logistics' && o.originator == filteredUser.value && o.dealCategory == 'AMBER')
            var logisticsGREEN = allDeals.filter(o => o.industrySector == 'Logistics' && o.leadTransactor == filteredUser.value && o.dealCategory == 'GREEN' || o.industrySector == 'Logistics' && o.originator == filteredUser.value && o.dealCategory == 'GREEN')
            var offGridPowerRED = allDeals.filter(o => o.industrySector == 'Off-grid Power' && o.leadTransactor == filteredUser.value && o.dealCategory == 'RED' || o.industrySector == 'Off-grid Power' && o.originator == filteredUser.value && o.dealCategory == 'RED')
            var offGridPowerAMBER = allDeals.filter(o => o.industrySector == 'Off-grid Power' && o.leadTransactor == filteredUser.value && o.dealCategory == 'AMBER' || o.industrySector == 'Off-grid Power' && o.originator == filteredUser.value && o.dealCategory == 'AMBER')
            var offGridPowerGREEN = allDeals.filter(o => o.industrySector == 'Off-grid Power' && o.leadTransactor == filteredUser.value && o.dealCategory == 'GREEN' || o.industrySector == 'Off-grid Power' && o.originator == filteredUser.value && o.dealCategory == 'GREEN')
            var onGridPowerRED = allDeals.filter(o => o.industrySector == 'On-grid Power' && o.leadTransactor == filteredUser.value && o.dealCategory == 'RED' || o.industrySector == 'On-grid Power' && o.originator == filteredUser.value && o.dealCategory == 'RED')
            var onGridPowerAMBER = allDeals.filter(o => o.industrySector == 'On-grid Power' && o.leadTransactor == filteredUser.value && o.dealCategory == 'AMBER' || o.industrySector == 'On-grid Power' && o.originator == filteredUser.value && o.dealCategory == 'AMBER')
            var onGridPowerGREEN = allDeals.filter(o => o.industrySector == 'On-grid Power' && o.leadTransactor == filteredUser.value && o.dealCategory == 'GREEN' || o.industrySector == 'On-grid Power' && o.originator == filteredUser.value && o.dealCategory == 'GREEN')
            var renewableEnergyRED = allDeals.filter(o => o.industrySector == 'Renewable Energy' && o.leadTransactor == filteredUser.value && o.dealCategory == 'RED' || o.industrySector == 'Renewable Energy' && o.originator == filteredUser.value && o.dealCategory == 'RED')
            var renewableEnergyAMBER = allDeals.filter(o => o.industrySector == 'Renewable Energy' && o.leadTransactor == filteredUser.value && o.dealCategory == 'AMBER' || o.industrySector == 'Renewable Energy' && o.originator == filteredUser.value && o.dealCategory == 'AMBER')
            var renewableEnergyGREEN = allDeals.filter(o => o.industrySector == 'Renewable Energy' && o.leadTransactor == filteredUser.value && o.dealCategory == 'GREEN' || o.industrySector == 'Renewable Energy' && o.originator == filteredUser.value && o.dealCategory == 'GREEN')
            var transportationRED = allDeals.filter(o => o.industrySector == 'Transportation' && o.leadTransactor == filteredUser.value && o.dealCategory == 'RED' || o.industrySector == 'Transportation' && o.originator == filteredUser.value && o.dealCategory == 'RED')
            var transportationAMBER = allDeals.filter(o => o.industrySector == 'Transportation' && o.leadTransactor == filteredUser.value && o.dealCategory == 'AMBER' || o.industrySector == 'Transportation' && o.originator == filteredUser.value && o.dealCategory == 'AMBER')
            var transportationGREEN = allDeals.filter(o => o.industrySector == 'Transportation' && o.leadTransactor == filteredUser.value && o.dealCategory == 'GREEN' || o.industrySector == 'Transportation' && o.originator == filteredUser.value && o.dealCategory == 'GREEN')
            var water_wasteRED = allDeals.filter(o => o.industrySector == 'Water/Waste' && o.leadTransactor == filteredUser.value && o.dealCategory == 'RED' || o.industrySector == 'Water/Waste' && o.originator == filteredUser.value && o.dealCategory == 'RED')
            var water_wasteAMBER = allDeals.filter(o => o.industrySector == 'Water/Waste' && o.leadTransactor == filteredUser.value && o.dealCategory == 'AMBER' || o.industrySector == 'Water/Waste' && o.originator == filteredUser.value && o.dealCategory == 'AMBER')
            var water_wasteGREEN = allDeals.filter(o => o.industrySector == 'Water/Waste' && o.leadTransactor == filteredUser.value && o.dealCategory == 'GREEN' || o.industrySector == 'Water/Waste' && o.originator == filteredUser.value && o.dealCategory == 'GREEN')
        }
        else if (props.dealSec == 'allDeals') {
            var afforableHousingRED = allDeals.filter(o => o.industrySector == 'Affordable Housing' && o.dealCategory == 'RED')
            var afforableHousingAMBER = allDeals.filter(o => o.industrySector == 'Affordable Housing' && o.dealCategory == 'AMBER')
            var afforableHousingGREEN = allDeals.filter(o => o.industrySector == 'Affordable Housing' && o.dealCategory == 'GREEN')
            var agricInfraRED = allDeals.filter(o => o.industrySector == 'Agric. Infrastructure' && o.dealCategory == 'RED')
            var agricInfraAMBER = allDeals.filter(o => o.industrySector == 'Agric. Infrastructure' && o.dealCategory == 'AMBER')
            var agricInfraGREEN = allDeals.filter(o => o.industrySector == 'Agric. Infrastructure' && o.dealCategory == 'GREEN')
            var educationInfraRED = allDeals.filter(o => o.industrySector == 'Education Infrastructure' && o.dealCategory == 'RED')
            var educationInfraAMBER = allDeals.filter(o => o.industrySector == 'Education Infrastructure' && o.dealCategory == 'AMBER')
            var educationInfraGREEN = allDeals.filter(o => o.industrySector == 'Education Infrastructure' && o.dealCategory == 'GREEN')
            var gasToCleanRED = allDeals.filter(o => o.industrySector == 'Gas-to-Clean' && o.dealCategory == 'RED')
            var gasToCleanAMBER = allDeals.filter(o => o.industrySector == 'Gas-to-Clean' && o.dealCategory == 'AMBER')
            var gasToCleanGREEN = allDeals.filter(o => o.industrySector == 'Gas-to-Clean' && o.dealCategory == 'GREEN')
            var gasToPowerRED = allDeals.filter(o => o.industrySector == 'Gas-to-Power' && o.dealCategory == 'RED')
            var gasToPowerAMBER = allDeals.filter(o => o.industrySector == 'Gas-to-Power' && o.dealCategory == 'AMBER')
            var gasToPowerGREEN = allDeals.filter(o => o.industrySector == 'Gas-to-Power' && o.dealCategory == 'GREEN')
            var HealthcareRED = allDeals.filter(o => o.industrySector == 'Healthcare' && o.dealCategory == 'RED')
            var HealthcareAMBER = allDeals.filter(o => o.industrySector == 'Healthcare' && o.dealCategory == 'AMBER')
            var HealthcareGREEN = allDeals.filter(o => o.industrySector == 'Healthcare' && o.dealCategory == 'GREEN')
            var ICT_TelcomRED = allDeals.filter(o => o.industrySector == 'ICT/Telecoms' && o.dealCategory == 'RED')
            var ICT_TelcomAMBER = allDeals.filter(o => o.industrySector == 'ICT/Telecoms' && o.dealCategory == 'AMBER')
            var ICT_TelcomGREEN = allDeals.filter(o => o.industrySector == 'ICT/Telecoms' && o.dealCategory == 'GREEN')
            var Infra_LogisticsRED = allDeals.filter(o => o.industrySector == 'Infrastructure/Logistics' && o.dealCategory == 'RED')
            var Infra_LogisticsAMBER = allDeals.filter(o => o.industrySector == 'Infrastructure/Logistics' && o.dealCategory == 'AMBER')
            var Infra_LogisticsGREEN = allDeals.filter(o => o.industrySector == 'Infrastructure/Logistics' && o.dealCategory == 'GREEN')
            var inputsToInfraRED = allDeals.filter(o => o.industrySector == 'Inputs to Infrastructure' && o.dealCategory == 'RED')
            var inputsToInfraAMBER = allDeals.filter(o => o.industrySector == 'Inputs to Infrastructure' && o.dealCategory == 'AMBER')
            var inputsToInfraGREEN = allDeals.filter(o => o.industrySector == 'Inputs to Infrastructure' && o.dealCategory == 'GREEN')
            var logisticsRED = allDeals.filter(o => o.industrySector == 'Logistics' && o.dealCategory == 'RED')
            var logisticsAMBER = allDeals.filter(o => o.industrySector == 'Logistics' && o.dealCategory == 'AMBER')
            var logisticsGREEN = allDeals.filter(o => o.industrySector == 'Logistics' && o.dealCategory == 'GREEN')
            var offGridPowerRED = allDeals.filter(o => o.industrySector == 'Off-grid Power' && o.dealCategory == 'RED')
            var offGridPowerAMBER = allDeals.filter(o => o.industrySector == 'Off-grid Power' && o.dealCategory == 'AMBER')
            var offGridPowerGREEN = allDeals.filter(o => o.industrySector == 'Off-grid Power' && o.dealCategory == 'GREEN')
            var onGridPowerRED = allDeals.filter(o => o.industrySector == 'On-grid Power' && o.dealCategory == 'RED')
            var onGridPowerAMBER = allDeals.filter(o => o.industrySector == 'On-grid Power' && o.dealCategory == 'AMBER')
            var onGridPowerGREEN = allDeals.filter(o => o.industrySector == 'On-grid Power' && o.dealCategory == 'GREEN')
            var renewableEnergyRED = allDeals.filter(o => o.industrySector == 'Renewable Energy' && o.dealCategory == 'RED')
            var renewableEnergyAMBER = allDeals.filter(o => o.industrySector == 'Renewable Energy' && o.dealCategory == 'AMBER')
            var renewableEnergyGREEN = allDeals.filter(o => o.industrySector == 'Renewable Energy' && o.dealCategory == 'GREEN')
            var transportationRED = allDeals.filter(o => o.industrySector == 'Transportation' && o.dealCategory == 'RED')
            var transportationAMBER = allDeals.filter(o => o.industrySector == 'Transportation' && o.dealCategory == 'AMBER')
            var transportationGREEN = allDeals.filter(o => o.industrySector == 'Transportation' && o.dealCategory == 'GREEN')
            var water_wasteRED = allDeals.filter(o => o.industrySector == 'Water/Waste' && o.dealCategory == 'RED')
            var water_wasteAMBER = allDeals.filter(o => o.industrySector == 'Water/Waste' && o.dealCategory == 'AMBER')
            var water_wasteGREEN = allDeals.filter(o => o.industrySector == 'Water/Waste' && o.dealCategory == 'GREEN')

        }

        if (props.fundOption != '' && props.fundOption && props.fundOption == 'BOI') {
            var afforableHousingRED = afforableHousingRED.filter(o => o.fundOptionBOI == true)
            var afforableHousingAMBER = afforableHousingAMBER.filter(o => o.fundOptionBOI == true)
            var afforableHousingGREEN = afforableHousingGREEN.filter(o => o.fundOptionBOI == true)
            var agricInfraRED = agricInfraRED.filter(o => o.fundOptionBOI == true)
            var agricInfraAMBER = agricInfraAMBER.filter(o => o.fundOptionBOI == true)
            var agricInfraGREEN = agricInfraGREEN.filter(o => o.fundOptionBOI == true)
            var educationInfraRED = educationInfraRED.filter(o => o.fundOptionBOI == true)
            var educationInfraAMBER = educationInfraAMBER.filter(o => o.fundOptionBOI == true)
            var educationInfraGREEN = educationInfraGREEN.filter(o => o.fundOptionBOI == true)
            var gasToCleanRED = gasToCleanRED.filter(o => o.fundOptionBOI == true)
            var gasToCleanAMBER = gasToCleanAMBER.filter(o => o.fundOptionBOI == true)
            var gasToCleanGREEN = gasToCleanGREEN.filter(o => o.fundOptionBOI == true)
            var gasToPowerRED = gasToPowerRED.filter(o => o.fundOptionBOI == true)
            var gasToPowerAMBER = gasToPowerAMBER.filter(o => o.fundOptionBOI == true)
            var gasToPowerGREEN = gasToPowerGREEN.filter(o => o.fundOptionBOI == true)
            var HealthcareRED = HealthcareRED.filter(o => o.fundOptionBOI == true)
            var HealthcareAMBER = HealthcareAMBER.filter(o => o.fundOptionBOI == true)
            var HealthcareGREEN = HealthcareGREEN.filter(o => o.fundOptionBOI == true)
            var ICT_TelcomRED = ICT_TelcomRED.filter(o => o.fundOptionBOI == true)
            var ICT_TelcomAMBER = ICT_TelcomAMBER.filter(o => o.fundOptionBOI == true)
            var ICT_TelcomGREEN = ICT_TelcomGREEN.filter(o => o.fundOptionBOI == true)
            var Infra_LogisticsRED = Infra_LogisticsRED.filter(o => o.fundOptionBOI == true)
            var Infra_LogisticsAMBER = Infra_LogisticsAMBER.filter(o => o.fundOptionBOI == true)
            var Infra_LogisticsGREEN = Infra_LogisticsGREEN.filter(o => o.fundOptionBOI == true)
            var inputsToInfraRED = inputsToInfraRED.filter(o => o.fundOptionBOI == true)
            var inputsToInfraAMBER = inputsToInfraAMBER.filter(o => o.fundOptionBOI == true)
            var inputsToInfraGREEN = inputsToInfraGREEN.filter(o => o.fundOptionBOI == true)
            var logisticsRED = logisticsRED.filter(o => o.fundOptionBOI == true)
            var logisticsAMBER = logisticsAMBER.filter(o => o.fundOptionBOI == true)
            var logisticsGREEN = logisticsGREEN.filter(o => o.fundOptionBOI == true)
            var offGridPowerRED = offGridPowerRED.filter(o => o.fundOptionBOI == true)
            var offGridPowerAMBER = offGridPowerAMBER.filter(o => o.fundOptionBOI == true)
            var offGridPowerGREEN = offGridPowerGREEN.filter(o => o.fundOptionBOI == true)
            var onGridPowerRED = onGridPowerRED.filter(o => o.fundOptionBOI == true)
            var onGridPowerAMBER = onGridPowerAMBER.filter(o => o.fundOptionBOI == true)
            var onGridPowerGREEN = onGridPowerGREEN.filter(o => o.fundOptionBOI == true)
            var renewableEnergyRED = renewableEnergyRED.filter(o => o.fundOptionBOI == true)
            var renewableEnergyAMBER = renewableEnergyAMBER.filter(o => o.fundOptionBOI == true)
            var renewableEnergyGREEN = renewableEnergyGREEN.filter(o => o.fundOptionBOI == true)
            var transportationRED = transportationRED.filter(o => o.fundOptionBOI == true)
            var transportationAMBER = transportationAMBER.filter(o => o.fundOptionBOI == true)
            var transportationGREEN = transportationGREEN.filter(o => o.fundOptionBOI == true)
            var water_wasteRED = water_wasteRED.filter(o => o.fundOptionBOI == true)
            var water_wasteAMBER = water_wasteAMBER.filter(o => o.fundOptionBOI == true)
            var water_wasteGREEN = water_wasteGREEN.filter(o => o.fundOptionBOI == true)
        }
        else if (props.fundOption != '' && props.fundOption && props.fundOption == 'DCM') {
            var afforableHousingRED = afforableHousingRED.filter(o => o.fundOptionDCM == true)
            var afforableHousingAMBER = afforableHousingAMBER.filter(o => o.fundOptionDCM == true)
            var afforableHousingGREEN = afforableHousingGREEN.filter(o => o.fundOptionDCM == true)
            var agricInfraRED = agricInfraRED.filter(o => o.fundOptionDCM == true)
            var agricInfraAMBER = agricInfraAMBER.filter(o => o.fundOptionDCM == true)
            var agricInfraGREEN = agricInfraGREEN.filter(o => o.fundOptionDCM == true)
            var educationInfraRED = educationInfraRED.filter(o => o.fundOptionDCM == true)
            var educationInfraAMBER = educationInfraAMBER.filter(o => o.fundOptionDCM == true)
            var educationInfraGREEN = educationInfraGREEN.filter(o => o.fundOptionDCM == true)
            var gasToCleanRED = gasToCleanRED.filter(o => o.fundOptionDCM == true)
            var gasToCleanAMBER = gasToCleanAMBER.filter(o => o.fundOptionDCM == true)
            var gasToCleanGREEN = gasToCleanGREEN.filter(o => o.fundOptionDCM == true)
            var gasToPowerRED = gasToPowerRED.filter(o => o.fundOptionDCM == true)
            var gasToPowerAMBER = gasToPowerAMBER.filter(o => o.fundOptionDCM == true)
            var gasToPowerGREEN = gasToPowerGREEN.filter(o => o.fundOptionDCM == true)
            var HealthcareRED = HealthcareRED.filter(o => o.fundOptionDCM == true)
            var HealthcareAMBER = HealthcareAMBER.filter(o => o.fundOptionDCM == true)
            var HealthcareGREEN = HealthcareGREEN.filter(o => o.fundOptionDCM == true)
            var ICT_TelcomRED = ICT_TelcomRED.filter(o => o.fundOptionDCM == true)
            var ICT_TelcomAMBER = ICT_TelcomAMBER.filter(o => o.fundOptionDCM == true)
            var ICT_TelcomGREEN = ICT_TelcomGREEN.filter(o => o.fundOptionDCM == true)
            var Infra_LogisticsRED = Infra_LogisticsRED.filter(o => o.fundOptionDCM == true)
            var Infra_LogisticsAMBER = Infra_LogisticsAMBER.filter(o => o.fundOptionDCM == true)
            var Infra_LogisticsGREEN = Infra_LogisticsGREEN.filter(o => o.fundOptionDCM == true)
            var inputsToInfraRED = inputsToInfraRED.filter(o => o.fundOptionDCM == true)
            var inputsToInfraAMBER = inputsToInfraAMBER.filter(o => o.fundOptionDCM == true)
            var inputsToInfraGREEN = inputsToInfraGREEN.filter(o => o.fundOptionDCM == true)
            var logisticsRED = logisticsRED.filter(o => o.fundOptionDCM == true)
            var logisticsAMBER = logisticsAMBER.filter(o => o.fundOptionDCM == true)
            var logisticsGREEN = logisticsGREEN.filter(o => o.fundOptionDCM == true)
            var offGridPowerRED = offGridPowerRED.filter(o => o.fundOptionDCM == true)
            var offGridPowerAMBER = offGridPowerAMBER.filter(o => o.fundOptionDCM == true)
            var offGridPowerGREEN = offGridPowerGREEN.filter(o => o.fundOptionDCM == true)
            var onGridPowerRED = onGridPowerRED.filter(o => o.fundOptionDCM == true)
            var onGridPowerAMBER = onGridPowerAMBER.filter(o => o.fundOptionDCM == true)
            var onGridPowerGREEN = onGridPowerGREEN.filter(o => o.fundOptionDCM == true)
            var renewableEnergyRED = renewableEnergyRED.filter(o => o.fundOptionDCM == true)
            var renewableEnergyAMBER = renewableEnergyAMBER.filter(o => o.fundOptionDCM == true)
            var renewableEnergyGREEN = renewableEnergyGREEN.filter(o => o.fundOptionDCM == true)
            var transportationRED = transportationRED.filter(o => o.fundOptionDCM == true)
            var transportationAMBER = transportationAMBER.filter(o => o.fundOptionDCM == true)
            var transportationGREEN = transportationGREEN.filter(o => o.fundOptionDCM == true)
            var water_wasteRED = water_wasteRED.filter(o => o.fundOptionDCM == true)
            var water_wasteAMBER = water_wasteAMBER.filter(o => o.fundOptionDCM == true)
            var water_wasteGREEN = water_wasteGREEN.filter(o => o.fundOptionDCM == true)
        }
        else if (props.fundOption != '' && props.fundOption && props.fundOption == 'PCB') {
            var afforableHousingRED = afforableHousingRED.filter(o => o.fundOptionPCB == true)
            var afforableHousingAMBER = afforableHousingAMBER.filter(o => o.fundOptionPCB == true)
            var afforableHousingGREEN = afforableHousingGREEN.filter(o => o.fundOptionPCB == true)
            var agricInfraRED = agricInfraRED.filter(o => o.fundOptionPCB == true)
            var agricInfraAMBER = agricInfraAMBER.filter(o => o.fundOptionPCB == true)
            var agricInfraGREEN = agricInfraGREEN.filter(o => o.fundOptionPCB == true)
            var educationInfraRED = educationInfraRED.filter(o => o.fundOptionPCB == true)
            var educationInfraAMBER = educationInfraAMBER.filter(o => o.fundOptionPCB == true)
            var educationInfraGREEN = educationInfraGREEN.filter(o => o.fundOptionPCB == true)
            var gasToCleanRED = gasToCleanRED.filter(o => o.fundOptionPCB == true)
            var gasToCleanAMBER = gasToCleanAMBER.filter(o => o.fundOptionPCB == true)
            var gasToCleanGREEN = gasToCleanGREEN.filter(o => o.fundOptionPCB == true)
            var gasToPowerRED = gasToPowerRED.filter(o => o.fundOptionPCB == true)
            var gasToPowerAMBER = gasToPowerAMBER.filter(o => o.fundOptionPCB == true)
            var gasToPowerGREEN = gasToPowerGREEN.filter(o => o.fundOptionPCB == true)
            var HealthcareRED = HealthcareRED.filter(o => o.fundOptionPCB == true)
            var HealthcareAMBER = HealthcareAMBER.filter(o => o.fundOptionPCB == true)
            var HealthcareGREEN = HealthcareGREEN.filter(o => o.fundOptionPCB == true)
            var ICT_TelcomRED = ICT_TelcomRED.filter(o => o.fundOptionPCB == true)
            var ICT_TelcomAMBER = ICT_TelcomAMBER.filter(o => o.fundOptionPCB == true)
            var ICT_TelcomGREEN = ICT_TelcomGREEN.filter(o => o.fundOptionPCB == true)
            var Infra_LogisticsRED = Infra_LogisticsRED.filter(o => o.fundOptionPCB == true)
            var Infra_LogisticsAMBER = Infra_LogisticsAMBER.filter(o => o.fundOptionPCB == true)
            var Infra_LogisticsGREEN = Infra_LogisticsGREEN.filter(o => o.fundOptionPCB == true)
            var inputsToInfraRED = inputsToInfraRED.filter(o => o.fundOptionPCB == true)
            var inputsToInfraAMBER = inputsToInfraAMBER.filter(o => o.fundOptionPCB == true)
            var inputsToInfraGREEN = inputsToInfraGREEN.filter(o => o.fundOptionPCB == true)
            var logisticsRED = logisticsRED.filter(o => o.fundOptionPCB == true)
            var logisticsAMBER = logisticsAMBER.filter(o => o.fundOptionPCB == true)
            var logisticsGREEN = logisticsGREEN.filter(o => o.fundOptionPCB == true)
            var offGridPowerRED = offGridPowerRED.filter(o => o.fundOptionPCB == true)
            var offGridPowerAMBER = offGridPowerAMBER.filter(o => o.fundOptionPCB == true)
            var offGridPowerGREEN = offGridPowerGREEN.filter(o => o.fundOptionPCB == true)
            var onGridPowerRED = onGridPowerRED.filter(o => o.fundOptionPCB == true)
            var onGridPowerAMBER = onGridPowerAMBER.filter(o => o.fundOptionPCB == true)
            var onGridPowerGREEN = onGridPowerGREEN.filter(o => o.fundOptionPCB == true)
            var renewableEnergyRED = renewableEnergyRED.filter(o => o.fundOptionPCB == true)
            var renewableEnergyAMBER = renewableEnergyAMBER.filter(o => o.fundOptionPCB == true)
            var renewableEnergyGREEN = renewableEnergyGREEN.filter(o => o.fundOptionPCB == true)
            var transportationRED = transportationRED.filter(o => o.fundOptionPCB == true)
            var transportationAMBER = transportationAMBER.filter(o => o.fundOptionPCB == true)
            var transportationGREEN = transportationGREEN.filter(o => o.fundOptionPCB == true)
            var water_wasteRED = water_wasteRED.filter(o => o.fundOptionPCB == true)
            var water_wasteAMBER = water_wasteAMBER.filter(o => o.fundOptionPCB == true)
            var water_wasteGREEN = water_wasteGREEN.filter(o => o.fundOptionPCB == true)
        }
        numofAffordableHousingRED.value = afforableHousingRED.length
        numofAffordableHousingAMBER.value = afforableHousingAMBER.length
        numofAffordableHousingGREEN.value = afforableHousingGREEN.length
        numofagricInfraRED.value = agricInfraRED.length
        numofagricInfraAMBER.value = agricInfraAMBER.length
        numofagricInfraGREEN.value = agricInfraGREEN.length
        numofeducationInfraRED.value = educationInfraRED.length
        numofeducationInfraAMBER.value = educationInfraAMBER.length
        numofeducationInfraGREEN.value = educationInfraGREEN.length
        numofgasToCleanRED.value = gasToCleanRED.length
        numofgasToCleanGREEN.value = gasToCleanGREEN.length
        numofgasToCleanAMBER.value = gasToCleanAMBER.length
        numofgasToPowerRED.value = gasToPowerRED.length
        numofgasToPowerAMBER.value = gasToPowerAMBER.length
        numofgasToPowerGREEN.value = gasToPowerGREEN.length
        numofHealthcareRED.value = HealthcareRED.length
        numofHealthcareAMBER.value = HealthcareAMBER.length
        numofHealthcareGREEN.value = HealthcareGREEN.length
        numofICT_TelcomRED.value = ICT_TelcomRED.length
        numofICT_TelcomAMBER.value = ICT_TelcomAMBER.length
        numofICT_TelcomGREEN.value = ICT_TelcomGREEN.length
        numofInfra_LogisticsRED.value = Infra_LogisticsRED.length
        numofInfra_LogisticsAMBER.value = Infra_LogisticsAMBER.length
        numofInfra_LogisticsGREEN.value = Infra_LogisticsGREEN.length
        numofinputsToInfraRED.value = inputsToInfraRED.length
        numofinputsToInfraAMBER.value = inputsToInfraAMBER.length
        numofinputsToInfraGREEN.value = inputsToInfraGREEN.length
        numoflogisticsRED.value = logisticsRED.length
        numoflogisticsAMBER.value = logisticsAMBER.length
        numoflogisticsGREEN.value = logisticsGREEN.length
        numofoffGridPowerRED.value = offGridPowerRED.length
        numofoffGridPowerAMBER.value = offGridPowerAMBER.length
        numofoffGridPowerGREEN.value = offGridPowerGREEN.length
        numofonGridPowerRED.value = onGridPowerRED.length
        numofonGridPowerAMBER.value = onGridPowerAMBER.length
        numofonGridPowerGREEN.value = onGridPowerGREEN.length
        numofrenewableEnergyRED.value = renewableEnergyRED.length
        numofrenewableEnergyAMBER.value = renewableEnergyAMBER.length
        numofrenewableEnergyGREEN.value = renewableEnergyGREEN.length
        numoftransportationRED.value = transportationRED.length
        numoftransportationAMBER.value = transportationAMBER.length
        numoftransportationGREEN.value = transportationGREEN.length
        numofwater_wasteRED.value = water_wasteRED.length
        numofwater_wasteAMBER.value = water_wasteAMBER.length
        numofwater_wasteGREEN.value = water_wasteGREEN.length


        let AffordableHousing = numofAffordableHousingRED.value + numofAffordableHousingAMBER.value + numofAffordableHousingGREEN.value
        let agricInfra = numofagricInfraRED.value + numofagricInfraAMBER.value + numofagricInfraGREEN.value
        let educationInfra = numofeducationInfraRED.value + numofeducationInfraAMBER.value + numofeducationInfraGREEN.value
        let gasToClean = numofgasToCleanRED.value + numofgasToCleanAMBER.value + numofgasToCleanGREEN.value
        let gasToPower = numofgasToPowerRED.value + numofgasToPowerAMBER.value + numofgasToPowerGREEN.value
        let Healthcare = numofHealthcareRED.value + numofHealthcareAMBER.value + numofHealthcareGREEN.value
        let ICT_Telcom = numofICT_TelcomRED.value + numofICT_TelcomAMBER.value + numofICT_TelcomGREEN.value
        let Infra_Logistics = numofInfra_LogisticsRED.value + numofInfra_LogisticsAMBER.value + numofInfra_LogisticsGREEN.value
        let inputsToInfra = numofinputsToInfraRED.value + numofinputsToInfraAMBER.value + numofinputsToInfraGREEN.value
        let logistics = numoflogisticsRED.value + numoflogisticsAMBER.value + numoflogisticsGREEN.value
        let offGridPower = numofoffGridPowerRED.value + numofoffGridPowerAMBER.value + numofoffGridPowerGREEN.value
        let onGridPower = numofonGridPowerRED.value + numofonGridPowerAMBER.value + numofonGridPowerGREEN.value
        let renewableEnergy = numofrenewableEnergyRED.value + numofrenewableEnergyAMBER.value + numofrenewableEnergyGREEN.value
        let transportation = numoftransportationRED.value + numoftransportationAMBER.value + numoftransportationGREEN.value
        let water_waste = numofwater_wasteRED.value + numofwater_wasteAMBER.value + numofwater_wasteGREEN.value

        let isAffordableHousing = null
        let isagricInfra = null
        let iseducationInfra = null
        let isgasToClean = null
        let isgasToPower = null
        let isHealthcare = null
        let isICT_Telcom = null
        let isInfra_Logistics = null
        let isinputsToInfra = null
        let islogistics = null
        let isoffGridPower = null
        let isonGridPower = null
        let isrenewableEnergy = null
        let istransportation = null
        let iswater_waste = null

        if (AffordableHousing > 0) {
            isAffordableHousing = 1
        }
        if (agricInfra > 0) {
            isagricInfra = 1
        }
        if (educationInfra > 0) {
            iseducationInfra = 1
        }
        if (gasToClean > 0) {
            isgasToClean = 1
        }
        if (gasToPower > 0) {
            isgasToPower = 1
        }
        if (Healthcare > 0) {
            isHealthcare = 1
        }
        if (ICT_Telcom > 0) {
            isICT_Telcom = 1
        }
        if (Infra_Logistics > 0) {
            isInfra_Logistics = 1
        }
        if (inputsToInfra > 0) {
            isinputsToInfra = 1
        }
        if (logistics > 0) {
            islogistics = 1
        }
        if (offGridPower > 0) {
            isoffGridPower = 1
        }
        if (onGridPower > 0) {
            isonGridPower = 1
        }
        if (renewableEnergy > 0) {
            isrenewableEnergy = 1
        }
        if (transportation > 0) {
            istransportation = 1
        }
        if (water_waste > 0) {
            iswater_waste = 1
        }
        numofTotalIndustries.value = isAffordableHousing + isagricInfra + iseducationInfra + isgasToClean + isgasToPower + isHealthcare + isICT_Telcom + isInfra_Logistics + isinputsToInfra + islogistics + isoffGridPower + isonGridPower + isrenewableEnergy + istransportation + iswater_waste


        const cartPricesArrayString = afforableHousingRED.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString2 = afforableHousingAMBER.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString3 = afforableHousingGREEN.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString4 = agricInfraRED.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString5 = agricInfraAMBER.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString6 = agricInfraGREEN.map(function (item) {
            return item.dealSize;
        });
        const cartPricesArrayString7 = educationInfraRED.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString8 = educationInfraAMBER.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString9 = educationInfraGREEN.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString10 = gasToCleanRED.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString11 = gasToCleanGREEN.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString12 = gasToCleanAMBER.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString13 = gasToPowerRED.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString14 = gasToPowerAMBER.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString15 = gasToPowerGREEN.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString16 = HealthcareRED.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString17 = HealthcareAMBER.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString18 = HealthcareGREEN.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString19 = ICT_TelcomRED.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString20 = ICT_TelcomAMBER.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString21 = ICT_TelcomGREEN.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString22 = Infra_LogisticsRED.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString23 = Infra_LogisticsAMBER.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString24 = Infra_LogisticsGREEN.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString25 = inputsToInfraRED.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString26 = inputsToInfraAMBER.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString27 = inputsToInfraGREEN.map(function (item) {
            return item.dealSize;
        });
        const cartPricesArrayString28 = logisticsRED.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString29 = logisticsAMBER.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString30 = logisticsGREEN.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString31 = offGridPowerRED.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString32 = offGridPowerAMBER.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString33 = offGridPowerGREEN.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString34 = onGridPowerRED.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString35 = onGridPowerAMBER.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString36 = onGridPowerGREEN.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString37 = renewableEnergyRED.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString38 = renewableEnergyAMBER.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString39 = renewableEnergyGREEN.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString40 = transportationRED.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString41 = transportationAMBER.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString42 = transportationGREEN.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString43 = water_wasteRED.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString44 = water_wasteAMBER.map(function (item) {
            return item.dealSize;
        });

        const cartPricesArrayString45 = water_wasteGREEN.map(function (item) {
            return item.dealSize;
        });
        AffordableHousingTotalRED.value = cartPricesArrayString.reduce((partialSum, a) => (partialSum + a), 0);
        AffordableHousingTotalAMBER.value = cartPricesArrayString2.reduce((partialSum, a) => (partialSum + a), 0);
        AffordableHousingTotalGREEN.value = cartPricesArrayString3.reduce((partialSum, a) => (partialSum + a), 0);
        agricInfraTotalRED.value = cartPricesArrayString4.reduce((partialSum, a) => (partialSum + a), 0);
        agricInfraTotalAMBER.value = cartPricesArrayString5.reduce((partialSum, a) => (partialSum + a), 0);
        agricInfraTotalGREEN.value = cartPricesArrayString6.reduce((partialSum, a) => (partialSum + a), 0);
        educationInfraTotalRED.value = cartPricesArrayString7.reduce((partialSum, a) => (partialSum + a), 0);
        educationInfraTotalAMBER.value = cartPricesArrayString8.reduce((partialSum, a) => (partialSum + a), 0);
        educationInfraTotalGREEN.value = cartPricesArrayString9.reduce((partialSum, a) => (partialSum + a), 0);
        gasToCleanTotalRED.value = cartPricesArrayString10.reduce((partialSum, a) => (partialSum + a), 0);
        gasToCleanTotalAMBER.value = cartPricesArrayString12.reduce((partialSum, a) => (partialSum + a), 0);
        gasToCleanTotalGREEN.value = cartPricesArrayString11.reduce((partialSum, a) => (partialSum + a), 0);
        gasToPowerTotalRED.value = cartPricesArrayString13.reduce((partialSum, a) => (partialSum + a), 0);
        gasToPowerTotalAMBER.value = cartPricesArrayString14.reduce((partialSum, a) => (partialSum + a), 0);
        gasToPowerTotalGREEN.value = cartPricesArrayString15.reduce((partialSum, a) => (partialSum + a), 0);
        HealthcareTotalRED.value = cartPricesArrayString16.reduce((partialSum, a) => (partialSum + a), 0);
        HealthcareTotalAMBER.value = cartPricesArrayString17.reduce((partialSum, a) => (partialSum + a), 0);
        HealthcareTotalGREEN.value = cartPricesArrayString18.reduce((partialSum, a) => (partialSum + a), 0);
        ICT_TelcomTotalRED.value = cartPricesArrayString19.reduce((partialSum, a) => (partialSum + a), 0);
        ICT_TelcomTotalAMBER.value = cartPricesArrayString20.reduce((partialSum, a) => (partialSum + a), 0);
        ICT_TelcomTotalGREEN.value = cartPricesArrayString21.reduce((partialSum, a) => (partialSum + a), 0);
        Infra_LogisticsTotalRED.value = cartPricesArrayString22.reduce((partialSum, a) => (partialSum + a), 0);
        Infra_LogisticsTotalAMBER.value = cartPricesArrayString23.reduce((partialSum, a) => (partialSum + a), 0);
        Infra_LogisticsTotalGREEN.value = cartPricesArrayString24.reduce((partialSum, a) => (partialSum + a), 0);
        inputsToInfraTotalRED.value = cartPricesArrayString25.reduce((partialSum, a) => (partialSum + a), 0);
        inputsToInfraTotalAMBER.value = cartPricesArrayString26.reduce((partialSum, a) => (partialSum + a), 0);
        inputsToInfraTotalGREEN.value = cartPricesArrayString27.reduce((partialSum, a) => (partialSum + a), 0);
        logisticsTotalRED.value = cartPricesArrayString28.reduce((partialSum, a) => (partialSum + a), 0);
        logisticsTotalAMBER.value = cartPricesArrayString29.reduce((partialSum, a) => (partialSum + a), 0);
        logisticsTotalGREEN.value = cartPricesArrayString30.reduce((partialSum, a) => (partialSum + a), 0);
        offGridPowerTotalRED.value = cartPricesArrayString31.reduce((partialSum, a) => (partialSum + a), 0);
        offGridPowerTotalAMBER.value = cartPricesArrayString32.reduce((partialSum, a) => (partialSum + a), 0);
        offGridPowerTotalGREEN.value = cartPricesArrayString33.reduce((partialSum, a) => (partialSum + a), 0);
        onGridPowerTotalRED.value = cartPricesArrayString34.reduce((partialSum, a) => (partialSum + a), 0);
        onGridPowerTotalAMBER.value = cartPricesArrayString35.reduce((partialSum, a) => (partialSum + a), 0);
        onGridPowerTotalGREEN.value = cartPricesArrayString36.reduce((partialSum, a) => (partialSum + a), 0);
        renewableEnergyTotalRED.value = cartPricesArrayString37.reduce((partialSum, a) => (partialSum + a), 0);
        renewableEnergyTotalAMBER.value = cartPricesArrayString38.reduce((partialSum, a) => (partialSum + a), 0);
        renewableEnergyTotalGREEN.value = cartPricesArrayString39.reduce((partialSum, a) => (partialSum + a), 0);
        transportationTotalRED.value = cartPricesArrayString40.reduce((partialSum, a) => (partialSum + a), 0);
        transportationTotalAMBER.value = cartPricesArrayString41.reduce((partialSum, a) => (partialSum + a), 0);
        transportationTotalGREEN.value = cartPricesArrayString42.reduce((partialSum, a) => (partialSum + a), 0);
        water_wasteTotalRED.value = cartPricesArrayString43.reduce((partialSum, a) => (partialSum + a), 0);
        water_wasteTotalAMBER.value = cartPricesArrayString44.reduce((partialSum, a) => (partialSum + a), 0);
        water_wasteTotalGREEN.value = cartPricesArrayString45.reduce((partialSum, a) => (partialSum + a), 0);


        return dealStats5.value = {
            "labels": [
                "Afforable Housing", "Agric. Infra", "Education Infra", "GasClean", "GasPower", "Healthcare", "ICT/Telecoms", "Infra Logistics", "Input to Infra", "Logistics", "Off Grid Power", "on Grid Power",
                "Renewable Energy", "Transport", "Water/Waste",
            ],
            "datasets": [
                {
                    "label": "Red",
                    "backgroundColor": "#D12134",
                    "data": [AffordableHousingTotalRED.value, agricInfraTotalRED.value, educationInfraTotalRED.value, gasToCleanTotalRED.value, gasToPowerTotalRED.value, HealthcareTotalRED.value, ICT_TelcomTotalRED.value, Infra_LogisticsTotalRED.value, inputsToInfraTotalRED.value, logisticsTotalRED.value, offGridPowerTotalRED.value, onGridPowerTotalRED.value, renewableEnergyTotalRED.value, transportationTotalRED.value, water_wasteTotalRED.value]
                },
                {
                    "label": "Amber",
                    "backgroundColor": "#DB8A00",
                    "data": [AffordableHousingTotalAMBER.value, agricInfraTotalAMBER.value, educationInfraTotalAMBER.value, gasToCleanTotalAMBER.value, gasToPowerTotalAMBER.value, HealthcareTotalAMBER.value, ICT_TelcomTotalAMBER.value, Infra_LogisticsTotalAMBER.value, inputsToInfraTotalAMBER.value, logisticsTotalAMBER.value, offGridPowerTotalAMBER.value, onGridPowerTotalAMBER.value, renewableEnergyTotalAMBER.value, transportationTotalAMBER.value, water_wasteTotalAMBER.value]
                },
                {
                    "label": "Green",
                    "backgroundColor": "#298729",
                    "data": [AffordableHousingTotalGREEN.value, agricInfraTotalGREEN.value, educationInfraTotalGREEN.value, gasToCleanTotalGREEN.value, gasToPowerTotalGREEN.value, HealthcareTotalGREEN.value, ICT_TelcomTotalGREEN.value, Infra_LogisticsTotalGREEN.value, inputsToInfraTotalGREEN.value, logisticsTotalGREEN.value, offGridPowerTotalGREEN.value, onGridPowerTotalGREEN.value, renewableEnergyTotalGREEN.value, transportationTotalGREEN.value, water_wasteTotalGREEN.value]
                }
            ]
        }
    }
});
const computedTileDataProducts = computed(() => {
    if (props.data != null && props.data.length != 0) {
        let allDeals = props.data
        allDeals = allDeals.filter(o => new Date(o.financialYearName.slice(2)).getFullYear() <= new Date(stores.financialYear.slice(2)).getFullYear() && o.dealStatus==true)

        if (props.dealSec == 'myDeals') {
            var AnnuityPPP = allDeals.filter(o => o.productDescription == 'Annuity PPP' && o.leadTransactor == filteredUser.value && o.dealCategory != 'CLOSED' || o.productDescription == 'Annuity PPP' && o.originator == filteredUser.value && o.dealCategory != 'CLOSED' || o.productDescription == 'Annuity PPP' && o.coTransactor == filteredUser.value && o.dealCategory != 'CLOSED')
            var blendedFinance = allDeals.filter(o => o.productDescription == 'Blended Finance' && o.leadTransactor == filteredUser.value && o.dealCategory != 'CLOSED' || o.productDescription == 'Blended Finance' && o.originator == filteredUser.value && o.dealCategory != 'CLOSED' || o.productDescription == 'Blended Finance' && o.coTransactor == filteredUser.value && o.dealCategory != 'CLOSED')
            var contingentRefinancing = allDeals.filter(o => o.productDescription == 'Contingent Refinancing' && o.leadTransactor == filteredUser.value && o.dealCategory != 'CLOSED' || o.productDescription == 'Contingent Refinancing' && o.originator == filteredUser.value && o.dealCategory != 'CLOSED' || o.productDescription == 'Contingent Refinancing' && o.coTransactor == filteredUser.value && o.dealCategory != 'CLOSED')
            var privateBond_Others = allDeals.filter(o => o.productDescription == 'Private Bond (Others)' && o.leadTransactor == filteredUser.value && o.dealCategory != 'CLOSED' || o.productDescription == 'Private Bond (Others)' && o.originator == filteredUser.value && o.dealCategory != 'CLOSED' || o.productDescription == 'Private Bond (Others)' && o.coTransactor == filteredUser.value && o.dealCategory != 'CLOSED')
            var privateBond_CleanEnergy = allDeals.filter(o => o.productDescription == 'Private Bond(Clean Energy)' && o.leadTransactor == filteredUser.value && o.dealCategory != 'CLOSED' || o.productDescription == 'Private Bond(Clean Energy)' && o.originator == filteredUser.value && o.dealCategory != 'CLOSED' || o.productDescription == 'Private Bond(Clean Energy)' && o.coTransactor == filteredUser.value && o.dealCategory != 'CLOSED')
            var publicBond = allDeals.filter(o => o.productDescription == 'Public Bond' && o.leadTransactor == filteredUser.value && o.dealCategory != 'CLOSED' || o.productDescription == 'Public Bond' && o.originator == filteredUser.value && o.dealCategory != 'CLOSED' || o.productDescription == 'Public Bond' && o.coTransactor == filteredUser.value && o.dealCategory != 'CLOSED')
        }
        else if (props.dealSec == 'allDeals') {
            var AnnuityPPP = allDeals.filter(o => o.productDescription == 'Annuity PPP')
            var blendedFinance = allDeals.filter(o => o.productDescription == 'Blended Finance')
            var contingentRefinancing = allDeals.filter(o => o.productDescription == 'Contingent Refinancing')
            var privateBond_Others = allDeals.filter(o => o.productDescription == 'Private Bond (Others)')
            var privateBond_CleanEnergy = allDeals.filter(o => o.productDescription == 'Private Bond(Clean Energy)')
            var publicBond = allDeals.filter(o => o.productDescription == 'Public Bond')
        }
        if (props.fundOption != '' && props.fundOption && props.fundOption == 'BOI') {
            var AnnuityPPP = AnnuityPPP.filter(o => o.fundOptionBOI == true)
            var blendedFinance = blendedFinance.filter(o => o.fundOptionBOI == true)
            var contingentRefinancing = contingentRefinancing.filter(o => o.fundOptionBOI == true)
            var privateBond_Others = privateBond_Others.filter(o => o.fundOptionBOI == true)
            var privateBond_CleanEnergy = privateBond_CleanEnergy.filter(o => o.fundOptionBOI == true)
            var publicBond = publicBond.filter(o => o.fundOptionBOI == true)
        }
        else if (props.fundOption != '' && props.fundOption && props.fundOption == 'DCM') {
            var AnnuityPPP = AnnuityPPP.filter(o => o.fundOptionDCM == true)
            var blendedFinance = blendedFinance.filter(o => o.fundOptionDCM == true)
            var contingentRefinancing = contingentRefinancing.filter(o => o.fundOptionDCM == true)
            var privateBond_Others = privateBond_Others.filter(o => o.fundOptionDCM == true)
            var privateBond_CleanEnergy = privateBond_CleanEnergy.filter(o => o.fundOptionDCM == true)
            var publicBond = publicBond.filter(o => o.fundOptionDCM == true)
        }
        else if (props.fundOption != '' && props.fundOption && props.fundOption == 'PCB') {
            var AnnuityPPP = AnnuityPPP.filter(o => o.fundOptionPCB == true)
            var blendedFinance = blendedFinance.filter(o => o.fundOptionPCB == true)
            var contingentRefinancing = contingentRefinancing.filter(o => o.fundOptionPCB == true)
            var privateBond_Others = privateBond_Others.filter(o => o.fundOptionPCB == true)
            var privateBond_CleanEnergy = privateBond_CleanEnergy.filter(o => o.fundOptionPCB == true)
            var publicBond = publicBond.filter(o => o.fundOptionPCB == true)
        }
        numofAnnuityPPP.value = AnnuityPPP.length
        numofpublicBond.value = publicBond.length
        numofblendedFinance.value = blendedFinance.length
        numofcontingentRefinancing.value = contingentRefinancing.length
        numofprivateBond_Others.value = privateBond_Others.length
        numofprivateBond_CleanEnergy.value = privateBond_CleanEnergy.length

        let isAnnuityPPP = null
        let ispublicBond = null
        let isblendedFinance = null
        let iscontingentRefinancing = null
        let isprivateBond_Others = null
        let isprivateBond_CleanEnergy = null

        if (numofAnnuityPPP.value > 0) {
            isAnnuityPPP = 1
        }
        if (numofpublicBond.value > 0) {
            ispublicBond = 1
        }
        if (numofblendedFinance.value > 0) {
            isblendedFinance = 1
        }
        if (numofcontingentRefinancing.value > 0) {
            iscontingentRefinancing = 1
        }
        if (numofprivateBond_Others.value > 0) {
            isprivateBond_Others = 1
        }
        if (numofprivateBond_CleanEnergy.value > 0) {
            isprivateBond_CleanEnergy = 1
        }

        numofTotalProducts.value = isAnnuityPPP + ispublicBond + isblendedFinance + iscontingentRefinancing + isprivateBond_Others + isprivateBond_CleanEnergy
        // numofTotalProducts.value = numofAnnuityPPP.value + numofpublicBond.value + numofblendedFinance.value + numofcontingentRefinancing.value + numofprivateBond_Others.value + numofprivateBond_CleanEnergy.value

        const cartPricesArrays = AnnuityPPP.map(({ actualCloseDate, administrator, advanceInMN, advancePercent, amortisationStyle, amortizationDiscountFactor, amortizationFirstCouponDate, amortizationGuaranteeFeeRate, amortizationIssueDate, amortizationStatus, amortizationTakingFirstInterestEarly, amountInMN, ccSubmissionDate, coTransactor, companyDescription, companyEmailAddress, companyId, companyName, couponPercent, createdBy, createdDate, creditApprovalDate, creditCommitteeApprovalObtained, creditCommitteeApprovalPending, dealCategory, dealFundOption, dealId, documentationExpectedToSignInEightWks, dueDiligenceOngoing, executedDocumentation, expectedCloseDate, feeLetterDate, filingWithSEC, finalPercent, financialCloseExpectedWithinSixMonths, financialCloseReached,
            guaranteeDocumentInAgreedForm, guaranteePercent, industryId, industrySector, lastModifiedBy, lastModifiedDate, leadId, leadTransactor, mandateLetterDate, mandateLetterOnboardingDocumentLink, mandateLetterOnboardingDocumentLinkDate, mandateLetterSigned, materialsCPsToFinancialCloseIsSatisfactory, materialsCPsWithTimelinesAgreed, monitoringInMN, moratoriumInYrs, mrocPreNBCApprovalDocLink,
            mrocPreNBCApprovalDocLinkDate, mrocPreNBCMinutesDocLink, mrocPreNBCMinutesDocLinkDate, nbcApprovalDate, nbcApprovalDocLink, nbcApprovalDocLinkDate, nbcMinutesDocLink, nbcMinutesDocLinkDate, nbcSubmissionDate, originator, productDescription, productId, professionalPartiesAppointed, recordOwner, regionName, reimbursableInMN, repaymentFrequency, tenorInYrs, transactionDescription, transactionPhase, transactorLegal, ...rest }) => ({ ...rest }))
        const cartPricesArrayString = cartPricesArrays.map(function (item) {
            return item.dealSize;
        });
        const cartPricesArrays2 = publicBond.map(({ dealId, leadId, companyId, companyDescription, originator, leadTransactor, coTransactor,
            transactorLegal, administrator, createdBy, lastModifiedBy, createdDate, lastModifiedDate, recordOwner, transactionPhase, transactionDescription, industryId, productId, dealCategory, amountInMN, couponPercent, tenorInYrs, moratoriumInYrs, repaymentFrequency, amortisationStyle,
            mandateLetterDate, creditApprovalDate, feeLetterDate, expectedCloseDate, actualCloseDate, nbcApprovalDate, nbcSubmissionDate,
            ccSubmissionDate, advanceInMN, advancePercent, finalPercent, guaranteePercent, monitoringInMN, reimbursableInMNcount, ...rest }) => ({ ...rest }))
        const cartPricesArrayString2 = cartPricesArrays2.map(function (item) {
            return item.dealSize;
        });
        const cartPricesArrays3 = blendedFinance.map(({ dealId, leadId, companyId, companyDescription, originator, leadTransactor, coTransactor,
            transactorLegal, administrator, createdBy, lastModifiedBy, createdDate, lastModifiedDate, recordOwner, transactionPhase, transactionDescription, industryId, productId, dealCategory, amountInMN, couponPercent, tenorInYrs, moratoriumInYrs, repaymentFrequency, amortisationStyle,
            mandateLetterDate, creditApprovalDate, feeLetterDate, expectedCloseDate, actualCloseDate, nbcApprovalDate, nbcSubmissionDate,
            ccSubmissionDate, advanceInMN, advancePercent, finalPercent, guaranteePercent, monitoringInMN, reimbursableInMNcount, ...rest }) => ({ ...rest }))
        const cartPricesArrayString3 = cartPricesArrays3.map(function (item) {
            return item.dealSize;
        });
        const cartPricesArrays4 = contingentRefinancing.map(({ dealId, leadId, companyId, companyDescription, originator, leadTransactor, coTransactor,
            transactorLegal, administrator, createdBy, lastModifiedBy, createdDate, lastModifiedDate, recordOwner, transactionPhase, transactionDescription, industryId, productId, dealCategory, amountInMN, couponPercent, tenorInYrs, moratoriumInYrs, repaymentFrequency, amortisationStyle,
            mandateLetterDate, creditApprovalDate, feeLetterDate, expectedCloseDate, actualCloseDate, nbcApprovalDate, nbcSubmissionDate,
            ccSubmissionDate, advanceInMN, advancePercent, finalPercent, guaranteePercent, monitoringInMN, reimbursableInMNcount, ...rest }) => ({ ...rest }))
        const cartPricesArrayString4 = cartPricesArrays4.map(function (item) {
            return item.dealSize;
        });
        const cartPricesArray5s = privateBond_Others.map(({ actualCloseDate, administrator, advanceInMN, advancePercent, amortisationStyle, amortizationDiscountFactor, amortizationFirstCouponDate, amortizationGuaranteeFeeRate, amortizationIssueDate, amortizationStatus, amortizationTakingFirstInterestEarly, amountInMN, ccSubmissionDate, coTransactor, companyDescription, companyEmailAddress, companyId, companyName, couponPercent, createdBy, createdDate, creditApprovalDate, creditCommitteeApprovalObtained, creditCommitteeApprovalPending, dealCategory, dealFundOption, dealId, documentationExpectedToSignInEightWks, dueDiligenceOngoing, executedDocumentation, expectedCloseDate, feeLetterDate, filingWithSEC, finalPercent, financialCloseExpectedWithinSixMonths, financialCloseReached,
            guaranteeDocumentInAgreedForm, guaranteePercent, industryId, industrySector, lastModifiedBy, lastModifiedDate, leadId, leadTransactor, mandateLetterDate, mandateLetterOnboardingDocumentLink, mandateLetterOnboardingDocumentLinkDate, mandateLetterSigned, materialsCPsToFinancialCloseIsSatisfactory, materialsCPsWithTimelinesAgreed, monitoringInMN, moratoriumInYrs, mrocPreNBCApprovalDocLink,
            mrocPreNBCApprovalDocLinkDate, mrocPreNBCMinutesDocLink, mrocPreNBCMinutesDocLinkDate, nbcApprovalDate, nbcApprovalDocLink, nbcApprovalDocLinkDate, nbcMinutesDocLink, nbcMinutesDocLinkDate, nbcSubmissionDate, originator, productDescription, productId, professionalPartiesAppointed, recordOwner, regionName, reimbursableInMN, repaymentFrequency, tenorInYrs, transactionDescription, transactionPhase, transactorLegal, ...rest }) => ({ ...rest }))
        const cartPricesArrayString5 = cartPricesArray5s.map(function (item) {
            return item.dealSize;
        });
        const cartPricesArrays6 = privateBond_CleanEnergy.map(({ dealId, leadId, companyId, companyDescription, originator, leadTransactor, coTransactor,
            transactorLegal, administrator, createdBy, lastModifiedBy, createdDate, lastModifiedDate, recordOwner, transactionPhase, transactionDescription, industryId, productId, dealCategory, amountInMN, couponPercent, tenorInYrs, moratoriumInYrs, repaymentFrequency, amortisationStyle,
            mandateLetterDate, creditApprovalDate, feeLetterDate, expectedCloseDate, actualCloseDate, nbcApprovalDate, nbcSubmissionDate,
            ccSubmissionDate, advanceInMN, advancePercent, finalPercent, guaranteePercent, monitoringInMN, reimbursableInMNcount, ...rest }) => ({ ...rest }))
        const cartPricesArrayString6 = cartPricesArrays6.map(function (item) {
            return item.dealSize;
        });
        AnnuityPPPTotalDealSize.value = cartPricesArrayString.reduce((partialSum, a) => (partialSum + a), 0);
        publicBondTotalDealSize.value = cartPricesArrayString2.reduce((partialSum, a) => (partialSum + a), 0);
        blendedFinanceTotalDealSize.value = cartPricesArrayString3.reduce((partialSum, a) => (partialSum + a), 0);
        contingentRefinancingTotalDealSize.value = cartPricesArrayString4.reduce((partialSum, a) => (partialSum + a), 0);
        privateBond_OthersTotalDealSize.value = cartPricesArrayString5.reduce((partialSum, a) => (partialSum + a), 0);
        privateBond_CleanEnergyTotalDealSize.value = cartPricesArrayString6.reduce((partialSum, a) => (partialSum + a), 0);
        TotalProductSize.value = AnnuityPPPTotalDealSize.value + publicBondTotalDealSize.value + blendedFinanceTotalDealSize.value + contingentRefinancingTotalDealSize.value + privateBond_OthersTotalDealSize.value + privateBond_CleanEnergyTotalDealSize.value;

        AnnuityPPPPercentageDealSize.value = ((AnnuityPPPTotalDealSize.value / TotalProductSize.value) * 100).toFixed(0)
        publicBondPercentageDealSize.value = ((publicBondTotalDealSize.value / TotalProductSize.value) * 100).toFixed(0)
        blendedFinancePercentageDealSize.value = ((blendedFinanceTotalDealSize.value / TotalProductSize.value) * 100).toFixed(0)
        contingentRefinancingPercentageDealSize.value = ((contingentRefinancingTotalDealSize.value / TotalProductSize.value) * 100).toFixed(0)
        privateBond_OthersPercentageDealSize.value = ((privateBond_OthersTotalDealSize.value / TotalProductSize.value) * 100).toFixed(0)
        privateBond_CleanEnergyPercentageDealSize.value = ((privateBond_CleanEnergyTotalDealSize.value / TotalProductSize.value) * 100).toFixed(0)
        return dealStats4.value = [
            {
                "title": "Annuity PPP",
                "number": numofAnnuityPPP.value,
                "amount": parseFloat(AnnuityPPPTotalDealSize.value).toFixed(3),
                "percentage": `${AnnuityPPPPercentageDealSize.value}`
            },
            {
                "title": "Public Bond",
                "number": numofpublicBond.value,
                "amount": parseFloat(publicBondTotalDealSize.value).toFixed(3),
                "percentage": `${publicBondPercentageDealSize.value}`
            },
            {
                "title": "Blended Finance",
                "number": numofblendedFinance.value,
                "amount": parseFloat(blendedFinanceTotalDealSize.value).toFixed(3),
                "percentage": `${blendedFinancePercentageDealSize.value}`
            },
            {
                "title": "Contingent Refinancing",
                "number": numofcontingentRefinancing.value,
                "amount": parseFloat(contingentRefinancingTotalDealSize.value).toFixed(3),
                "percentage": `${contingentRefinancingPercentageDealSize.value}`
            },
            {
                "title": "Private Bond (Others)",
                "number": numofprivateBond_Others.value,
                "amount": parseFloat(privateBond_OthersTotalDealSize.value).toFixed(3),
                "percentage": `${privateBond_OthersPercentageDealSize.value}`
            },
            {
                "title": "Private Bond(Clean Energy)",
                "number": numofprivateBond_CleanEnergy.value,
                "amount": parseFloat(privateBond_CleanEnergyTotalDealSize.value).toFixed(3),
                "percentage": `${privateBond_CleanEnergyPercentageDealSize.value}`
            },
        ]
    }
})

const computedTileData = computed(() => {
    if (props.data != null && props.data.length != 0) {
        let allDeals = props.data
        allDeals = allDeals.filter(o => new Date(o.financialYearName.slice(2)).getFullYear() <= new Date(stores.financialYear.slice(2)).getFullYear() && o.dealStatus==true)

        if (props.dealSec == 'myDeals') {
            var red = allDeals.filter(o => o.dealCategory == 'RED' && o.leadTransactor == filteredUser.value || o.dealCategory == 'RED' && o.originator == filteredUser.value || o.dealCategory == 'RED' && o.coTransactor == filteredUser.value)
            var amber = allDeals.filter(o => o.dealCategory == 'AMBER' && o.leadTransactor == filteredUser.value || o.dealCategory == 'AMBER' && o.originator == filteredUser.value || o.dealCategory == 'AMBER' && o.coTransactor == filteredUser.value)
            var green = allDeals.filter(o => o.dealCategory == 'GREEN' && o.leadTransactor == filteredUser.value || o.dealCategory == 'GREEN' && o.originator == filteredUser.value || o.dealCategory == 'GREEN' && o.coTransactor == filteredUser.value)
            var closed = allDeals.filter(o => o.dealCategory == 'CLOSED' && o.leadTransactor == filteredUser.value || o.dealCategory == 'CLOSED' && o.originator == filteredUser.value || o.dealCategory == 'CLOSED' && o.coTransactor == filteredUser.value)
        }
        else if (props.dealSec == 'allDeals') {
            var red = allDeals.filter(o => o.dealCategory == 'RED')
            var amber = allDeals.filter(o => o.dealCategory == 'AMBER')
            var green = allDeals.filter(o => o.dealCategory == 'GREEN')
            var closed = allDeals.filter(o => o.dealCategory == 'CLOSED')
        }

        if (props.fundOption != '' && props.fundOption && props.fundOption == 'BOI') {
            var red = red.filter(o => o.fundOptionBOI == true)
            var amber = amber.filter(o => o.fundOptionBOI == true)
            var green = green.filter(o => o.fundOptionBOI == true)
            var closed = closed.filter(o => o.fundOptionBOI == true)

        }
        else if (props.fundOption != '' && props.fundOption && props.fundOption == 'DCM') {
            var red = red.filter(o => o.fundOptionDCM == true)
            var amber = amber.filter(o => o.fundOptionDCM == true)
            var green = green.filter(o => o.fundOptionDCM == true)
            var closed = closed.filter(o => o.fundOptionDCM == true)
        }
        else if (props.fundOption != '' && props.fundOption && props.fundOption == 'PCB') {
            var red = red.filter(o => o.fundOptionPCB == true)
            var amber = amber.filter(o => o.fundOptionPCB == true)
            var green = green.filter(o => o.fundOptionPCB == true)
            var closed = closed.filter(o => o.fundOptionPCB == true)
        }



        numofRed.value = red.length
        numofAmber.value = amber.length
        numofGreen.value = green.length
        numofGreen.value = green.length
        numofClosed.value = closed.length

        numofTotal.value = numofRed.value + numofAmber.value + numofGreen.value
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
        redTotalDealSize.value = cartPricesArrayString.reduce((partialSum, a) => (partialSum + a), 0);
        greenTotalDealSize.value = cartPricesArrayString3.reduce((partialSum, a) => (partialSum + a), 0);
        amberTotalDealSize.value = cartPricesArrayString2.reduce((partialSum, a) => (partialSum + a), 0);
        closedTotalDealSize.value = cartPricesArrayString4.reduce((partialSum, a) => (partialSum + a), 0);
        const total = redTotalDealSize.value + greenTotalDealSize.value + amberTotalDealSize.value
        let REDPercentageDealSize = ((redTotalDealSize.value / total) * 100).toFixed(0)
        let AMBERPercentageDealSize = ((amberTotalDealSize.value / total) * 100).toFixed(0)
        let GREENPercentageDealSize = ((greenTotalDealSize.value / total) * 100).toFixed(0)

        if (ccShow.value == true) {
            selectedValue.value = [...amber, ...green, ...closed, { dealId: 'Total', dealSize: `₦${parseFloat(amberTotalDealSize.value + greenTotalDealSize.value + closedTotalDealSize.value).toFixed(2)}BN` }]
        }
        else if (feeLetterShow.value == true) {
            selectedValue.value = [...green, ...closed, { dealId: 'Total', dealSize: `₦${parseFloat(greenTotalDealSize.value + closedTotalDealSize.value).toFixed(2)}BN` }]
        }
        else if (closingShow.value == true) {
            selectedValue.value = [...closed, { dealId: 'Total', dealSize: `₦${parseFloat(closedTotalDealSize.value).toFixed(2)}BN` }]
        }
        else if (originationShow.value == true) {
            selectedValue.value = [...red, ...amber, ...green, ...closed, { dealId: 'Total', dealSize: `₦${parseFloat(redTotalDealSize.value + amberTotalDealSize.value + greenTotalDealSize.value + closedTotalDealSize.value).toFixed(2)}BN` }]
        }

        return dealStats2.value = [
            {
                "title": "Red Deals",
                "title_": "Red Deals",
                "number": numofRed.value,
                "percentage": REDPercentageDealSize,
                "amount": parseFloat(redTotalDealSize.value).toFixed(3),
                "chartData": [23, 60, 23, 43, 12, 63],
                "style": "#D12134",
                "tooltip": "Mandate Letter signed",
                "textBelow": "Mandate Letter signed"
            },
            {
                "title": "Amber Deals",
                "title_": "Amber Deals",
                "number": numofAmber.value,
                "percentage": AMBERPercentageDealSize,
                "amount": parseFloat(amberTotalDealSize.value).toFixed(3),
                "chartData": [1, 2, 5, 60, 23, 43],
                "style": "#DB8A00",
                "tooltip": "Deal has obtained Credit Committee approval",
                "textBelow": "Credit committee approval obtained"
            },
            {
                "title": "Green Deals",
                "title_": "Green Deals",
                "number": numofGreen.value,
                "percentage": GREENPercentageDealSize,
                "amount": parseFloat(greenTotalDealSize.value).toFixed(3),
                "chartData": [1, 2, 23, 43, 12, 9],
                "style": "#298729",
                "tooltip": "Deals that has Executed Fee Letter and/or Guarantee Documentation Guarantee Document in agreed form",
                "textBelow": "Fee letter and/or guarantee doc. executed"
            },
            {
                "title": "Total Pipeline Deals",
                "title_": "Total Deals",
                "number": numofTotal.value,
                "amount": parseFloat(total).toFixed(3),
                "chartData": [2, 23, 49, 72, 32],
                "style": "#237CBF",
                "tooltip": "All Pipeline Deals",
                "textBelow": "All Pipeline Deals"
            },
            {
                "title": "Porfolio Deals",
                "title_": "Closed Deals",
                "number": numofClosed.value,
                "amount": parseFloat(closedTotalDealSize.value).toFixed(3),
                "chartData": [2, 23, 49, 72, 32],
                "style": " rgb(102, 99, 94)",
                "tooltip": "Porfolio Deals",
                "textBelow": "Porfolio Deals"
            }
        ]
    }
})

const computedTransactorPerformance = computed(() => {
    next()
    next3()
    if (props.dealSec == 'myDeals') {
        return userPerformance.value
    }
    else if (props.dealSec == 'allDeals') {
        return allPerformance.value
    }
})
const next = async () => {
    if (filteredUser.value != '' && filteredUser.value) {
        userPerformance.value = await trmsService.getDealPerformanceByTransactor(filteredUser.value)

        if (userPerformance.value[0].mandateOriginatedTarget == null) {
            userPerformance.value[0].mandateOriginatedTarget = 0
        }
        if (userPerformance.value[0].mandateActual == null) {
            userPerformance.value[0].mandateActual = 0
        }
        if (userPerformance.value[0].creditCommitteeApprovalTarget == null) {
            userPerformance.value[0].creditCommitteeApprovalTarget = 0
        }
        if (userPerformance.value[0].creditCommitteeApprovalActual == null) {
            userPerformance.value[0].creditCommitteeApprovalActual = 0
        }
        if (userPerformance.value[0].feeLetterTarget == null) {
            userPerformance.value[0].feeLetterTarget = 0
        }
        if (userPerformance.value[0].feeLetterActual == null) {
            userPerformance.value[0].feeLetterActual = 0
        }
        if (userPerformance.value[0].financialCloseTarget == null) {
            userPerformance.value[0].financialCloseTarget = 0
        }
        if (userPerformance.value[0].financialCloseActual == null) {
            userPerformance.value[0].financialCloseActual = 0
        }
        let mandateValue = ((redTotalDealSize.value + amberTotalDealSize.value + greenTotalDealSize.value + closedTotalDealSize.value) - userPerformance.value[0].mandateOriginatedTarget)
        let ccValue = ((amberTotalDealSize.value + greenTotalDealSize.value + closedTotalDealSize.value) - userPerformance.value[0].creditCommitteeApprovalTarget)
        let FeeLetterValue = ((greenTotalDealSize.value + closedTotalDealSize.value) - userPerformance.value[0].feeLetterTarget)
        let FinancialCloseValue = (closedTotalDealSize - userPerformance.value[0].financialCloseTarget)

        if (props.dealSec == 'myDeals') {
            if (Math.sign(mandateValue) == 1) {
                mandateSign.value = true
            }
            else {
                mandateSign.value = false
            }
            if (Math.sign(ccValue) == 1) {
                ccSign.value = true
            }
            else {
                ccSign.value = false
            }
            if (Math.sign(FeeLetterValue) == 1) {
                FeeLetterSign.value = true
            }
            else {
                FeeLetterSign.value = false
            }
            if (Math.sign(FinancialCloseValue) == 1) {
                FinaicialCloseSign.value = true
            }
            else {
                FinaicialCloseSign.value = false
            }
            varianceMandate.value = parseFloat(Math.abs(userPerformance.value[0].mandateOriginatedTarget - (redTotalDealSize.value + amberTotalDealSize.value + greenTotalDealSize.value + closedTotalDealSize.value))).toFixed(3)
            varianceCC.value = parseFloat(Math.abs(userPerformance.value[0].creditCommitteeApprovalTarget - (amberTotalDealSize.value + greenTotalDealSize.value + closedTotalDealSize.value))).toFixed(3)
            varianceFeeLetter.value = parseFloat(Math.abs(userPerformance.value[0].feeLetterTarget - (greenTotalDealSize.value + closedTotalDealSize.value))).toFixed(3)
            varianceClosing.value = parseFloat(Math.abs(userPerformance.value[0].financialCloseTarget - closedTotalDealSize.value)).toFixed(3)

            percentageMandate.value = (((redTotalDealSize.value + amberTotalDealSize.value + greenTotalDealSize.value + closedTotalDealSize.value) / userPerformance.value[0].mandateOriginatedTarget) * 100).toFixed(3)
            percentageCC.value = (((amberTotalDealSize.value + greenTotalDealSize.value + closedTotalDealSize.value) / userPerformance.value[0].creditCommitteeApprovalTarget) * 100).toFixed(3)
            percentageFeeLetter.value = (((greenTotalDealSize.value + closedTotalDealSize.value) / userPerformance.value[0].feeLetterTarget) * 100).toFixed(3)
            percentageClosing.value = ((closedTotalDealSize.value / userPerformance.value[0].financialCloseTarget) * 100).toFixed(3)
        }
    }
};
const next3 = async () => {
    if (filteredUser.value != '' && filteredUser.value) {
        allPerformance.value = await trmsService.getDealGlobalPerformanceByFinancialYear(stores.financialYear)

        if (allPerformance.value[0].mandateOriginatedTarget == null) {
            allPerformance.value[0].mandateOriginatedTarget = 0
        }
        if (allPerformance.value[0].mandateActual == null) {
            allPerformance.value[0].mandateActual = 0
        }
        if (allPerformance.value[0].creditCommitteeApprovalTarget == null) {
            allPerformance.value[0].creditCommitteeApprovalTarget = 0
        }
        if (allPerformance.value[0].creditCommitteeApprovalActual == null) {
            allPerformance.value[0].creditCommitteeApprovalActual = 0
        }
        if (allPerformance.value[0].feeLetterTarget == null) {
            allPerformance.value[0].feeLetterTarget = 0
        }
        if (allPerformance.value[0].feeLetterActual == null) {
            allPerformance.value[0].feeLetterActual = 0
        }
        if (allPerformance.value[0].financialCloseTarget == null) {
            allPerformance.value[0].financialCloseTarget = 0
        }
        if (allPerformance.value[0].financialCloseActual == null) {
            allPerformance.value[0].financialCloseActual = 0
        }
        let mandateValue = (allPerformance.value[0].mandateActual - allPerformance.value[0].mandateOriginatedTarget)
        let ccValue = (allPerformance.value[0].creditCommitteeApprovalActual - allPerformance.value[0].creditCommitteeApprovalTarget)
        let FeeLetterValue = (allPerformance.value[0].feeLetterActual - allPerformance.value[0].feeLetterTarget)
        let FinancialCloseValue = (allPerformance.value[0].financialCloseActual - allPerformance.value[0].financialCloseTarget)

        if (props.dealSec == 'allDeals') {
            if (Math.sign(mandateValue) == 1) {
                mandateSign.value = true
            }
            else {
                mandateSign.value = false
            }
            if (Math.sign(ccValue) == 1) {
                ccSign.value = true
            }
            else {
                ccSign.value = false     
            }
            if (Math.sign(FeeLetterValue) == 1) {
                FeeLetterSign.value = true
            }
            else {
                FeeLetterSign.value = false
            }
            if (Math.sign(FinancialCloseValue) == 1) {
                FinaicialCloseSign.value = true
            }
            else {
                FinaicialCloseSign.value = false
            }

            varianceMandate.value = parseFloat(Math.abs(allPerformance.value[0].mandateOriginatedTarget - allPerformance.value[0].mandateActual)).toFixed(3)
            varianceCC.value = parseFloat(Math.abs(allPerformance.value[0].creditCommitteeApprovalTarget - allPerformance.value[0].creditCommitteeApprovalActual)).toFixed(3)
            varianceFeeLetter.value = parseFloat(Math.abs(allPerformance.value[0].feeLetterTarget - allPerformance.value[0].feeLetterActual)).toFixed(3)
            varianceClosing.value = parseFloat(Math.abs(allPerformance.value[0].financialCloseTarget - allPerformance.value[0].financialCloseActual)).toFixed(3)

            percentageMandate.value = ((allPerformance.value[0].mandateActual / allPerformance.value[0].mandateOriginatedTarget) * 100).toFixed(3)
            percentageCC.value = ((allPerformance.value[0].creditCommitteeApprovalActual / allPerformance.value[0].creditCommitteeApprovalTarget) * 100).toFixed(3)
            percentageFeeLetter.value = ((allPerformance.value[0].feeLetterActual / allPerformance.value[0].feeLetterTarget) * 100).toFixed(3)
            percentageClosing.value = ((allPerformance.value[0].financialCloseActual / allPerformance.value[0].financialCloseTarget) * 100).toFixed(3)
        }
    }
};
const close = async () => {
    ccShow.value = false
    feeLetterShow.value = false
    closingShow.value = false
    originationShow.value = false
    dialogTransactionList.value = false
};
dealStats2.value = [
    {
        "title": "Red Deals",
        "number": 0,
        "amount": `0bn`,
        "chartData": [0, 0, 0, 0, 0, 0],
        "style": "#D12134",
        "tooltip": "Mandate Letter signed",
        "textBelow": "Mandate Letter signed"
    },
    {
        "title": "Amber Deals",
        "number": 0,
        "amount": `0bn`,
        "chartData": [0, 0, 0, 0, 0, 0],
        "style": "#DB8A00",
        "tooltip": "Deal has obtained Credit Committee approval",
        "textBelow": "Credit committee approval obtained"
    },
    {
        "title": "Green Deals",
        "number": 0,
        "amount": `0bn`,
        "chartData": [0, 0, 0, 0, 0, 0],
        "style": "#298729",
        "tooltip": "Deals that has Executed Fee Letter and/or Guarantee Documentation Guarantee Document in agreed form",
        "textBelow": "Fee letter and/or guarantee doc. executed"
    },
    {
        "title": "Total Pipeline Deals",
        "number": 0,
        "amount": `0bn`,
        "chartData": [0, 0, 0, 0, 0, 0],
        "style": "#237CBF",
        "tooltip": "All Pipeline Deals",
        "textBelow": "All Pipeline Deals"
    },
    {
        "title": "Porfolio Deals",
        "number": 0,
        "amount": `0bn`,
        "chartData": [0, 0, 0, 0, 0, 0],
        "style": " rgb(102, 99, 94)",
        "tooltip": "All Pipeline Deals",
        "textBelow": "All Pipeline Deals"
    }
]

</script> 

<template>
    <div>
        <v-dialog v-model="dialogTransactionList" transition="slide-y-transiion" width="1050" @click:outside="close">
            <v-card style="padding: 20px;">
                <div>
                    <TableDashBoard :value="selectedValue"></TableDashBoard>
                </div>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="close">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <div class="stats box-padded">
            <h3 class="box-title"> Deal Stats</h3>
            <div class="d-flex flex-wrap gap-3 justify-content-center" style="width:100%">
                <LineChart v-for="(card, index) in computedTileData" :title="card.title" :number="card.number"
                    :amount="card.amount" :chartData="card.chartData" :chart-id="index" :style="card.style"
                    :tooltiptext="card.tooltip" :textBelow="card.textBelow"
                    @click="stores.filterTableBelow = card.title_.toUpperCase()" />

            </div>
        </div>
        <div class="d-flex justify-content-between" v-for="i in computedTransactorPerformance" :key="i.userId">
            <div class="targets box-padded">
                <h3 class="box-title"> Origination Target <br>(Mandate)</h3>
                <div class="d-flex flex-column gap-3" @click="originationShow = true; dialogTransactionList = true">
                    <Target :target="i.mandateOriginatedTarget"
                        :actual="parseFloat(redTotalDealSize + amberTotalDealSize + greenTotalDealSize + closedTotalDealSize).toFixed(3)"
                        :variance="parseFloat(varianceMandate).toFixed(3)" :percentage="percentageMandate"
                        :sign="mandateSign" />
                </div>
            </div>
            <div class="targets box-padded">
                <h3 class="box-title"> Execution Target <br>(Credit Committee) </h3>
                <div class="d-flex flex-column gap-3" @click="ccShow = true; dialogTransactionList = true">
                    <Target :target="i.creditCommitteeApprovalTarget"
                        :actual="parseFloat(amberTotalDealSize + greenTotalDealSize + closedTotalDealSize).toFixed(3)"
                        :percentage="percentageCC" :variance="parseFloat(varianceCC).toFixed(3)" :sign="ccSign" />
                </div>
            </div>
            <div class="targets box-padded">
                <h3 class="box-title"> Execution Target <br>(Fee Letter) </h3>
                <div class="d-flex flex-column gap-3" @click="feeLetterShow = true; dialogTransactionList = true">
                    <Target :target="i.feeLetterTarget"
                        :actual="parseFloat(greenTotalDealSize + closedTotalDealSize).toFixed(3)"
                        :variance="parseFloat(varianceFeeLetter).toFixed(3)" :percentage="percentageFeeLetter"
                        :sign="FeeLetterSign" />
                </div>
            </div>
            <div class="targets box-padded">
                <h3 class="box-title"> Execution Target<br> (Closing) </h3>
                <div class="d-flex flex-column gap-3" @click="closingShow = true; dialogTransactionList = true">
                    <Target :target="i.financialCloseTarget" :actual="parseFloat(closedTotalDealSize).toFixed(3)"
                        :variance="parseFloat(varianceClosing).toFixed(3)" :percentage="percentageClosing"
                        :sign="FinaicialCloseSign" />
                </div>
            </div>

        </div>
        <div class="d-flex justify-content-between" style="height: 42vw;">
            <div class="industries box-padded" style="padding-bottom: 50px;">
                <h3 class="box-title"> Industries</h3>
                <BarChart chart-id="industries" :chart-data="computedTileDataIndustries" />
                <h6 style="text-align: center; padding-top: 7px;">No of Industries: {{ numofTotalIndustries }} </h6>
            </div>

            <div class="cumulative box-padded" style="padding-bottom: 50px;">
                <h4 class="box-title">Cumulative Performance Incentive Earned </h4>
                <BarChartIncentive chart-id="cumulative" :chart-data="cumulativeData" />
            </div>
        </div>
        <div class="d-flex justify-content-between align-center ">
            <div class="chart-box-3 box-padded">
                <h4 class="box-title">Deal Category</h4>
                <PieChartDeal chart-id="dealcategory" :doughnut="true" :chartData="computedTileData" />
                <h6 style="text-align: center; padding-top: 7px;">No of Deal Categories: {{ numofTotal }} </h6>
            </div>

            <div class=" chart-box-3 box-padded">
                <h4 class="box-title">Regions</h4>
                <PieChartRegionsUsers chart-id="regions" :chartDatas="computedTileDataRegions" />
                <h6 style="text-align: center; padding-top: 7px;">No of Regions: {{ numofTotalRegion }} </h6>

            </div>
            <div class=" chart-box-3 box-padded">
                <h4 class="box-title">Products</h4>
                <PieChartProducts chart-id="products" :doughnut="true" :chartData="computedTileDataProducts" />
                <h6 style="text-align: center; padding-top: 7px;">No of Industries: {{ numofTotalProducts }} </h6>
            </div>
        </div>
    </div>
</template>

<style scoped>
.intro {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    flex-shrink: 0;
}

.box-title {

    font-size: 20px;
    font-weight: 600;
    line-height: 24px;

}

.box-padded {
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin-top: 20PX;
    background: #FFFFFF;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}

.targets {
    width: 24%;
}

.industries {
    max-height: 600px;
    width: 62%;
}

.cumulative {
    max-height: 600px;
    width: 35%;
}

.chart-box-3 {
    width: 32%;
    min-height: 100%;
}
</style>
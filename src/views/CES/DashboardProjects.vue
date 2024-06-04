<script setup>
import { ref, computed } from "vue";
import LineChart from "../../components/Charts/LineChart.vue";
import TableDashBoard from "../../components/Tables/TableDashBoard.vue";
import Target from "../../components/Charts/Target.vue";
import sampleData from "../../data/sampleData.json";
import { useDashOptionStore } from "../../stores/dashOption";
import pinia from "../../stores/store";
import GradeButton from '../../components/GradeButton.vue';
import { useRouter } from 'vue-router'
import trmsService from "../../services/trmsService";
import ToolBarCES from "../../components/ToolBarCES.vue";
import cesService from "../../services/cesService";

const stores = useDashOptionStore(pinia);

const props = defineProps([
  "data",
  "dealSec",
  "selectedUserList",
  "fundOption",
  "performance",
]);
const router = useRouter()
const numofRed = ref("");
const numofGreen = ref("");
const numofAmber = ref("");
const numofTotal = ref("");
const redTotalDealSize = ref(0);
const amberTotalDealSize = ref(0);
const greenTotalDealSize = ref(0);
const closedTotalDealSize = ref(0);
const redActual_ = ref(0);
const amberActual_ = ref(0);
const greenActual_ = ref(0);
const closedActual_ = ref(0);
const data = ref([]);
const numofNW = ref("");
const numofNA = ref("");
const numofSS = ref("");
const numofSE = ref("");
const numofSW = ref("");
const numofNC = ref("");
const numofNE = ref("");
const numofTotalRegion = ref("");
const numofAnnuityPPP = ref("");
const numofpublicBond = ref("");
const numofblendedFinance = ref("");
const numofcontingentRefinancing = ref("");
const numofprivateBond_Others = ref("");
const numofprivateBond_CleanEnergy = ref("");
const NWTotalDealSize = ref("");
const numofTotalProducts = ref("");
const numofTotalIndustries = ref("");
const SSTotalDealSize = ref("");
const SETotalDealSize = ref("");
const SWTotalDealSize = ref("");
const NCTotalDealSize = ref("");
const NETotalDealSize = ref("");
const NATotalDealSize = ref("");
const AnnuityPPPTotalDealSize = ref("");
const publicBondTotalDealSize = ref("");
const blendedFinanceTotalDealSize = ref("");
const contingentRefinancingTotalDealSize = ref("");
const privateBond_OthersTotalDealSize = ref("");
const privateBond_CleanEnergyTotalDealSize = ref("");
const TotalDealSize = ref("");
const TotalProductSize = ref("");
const NWPercentageDealSize = ref("");
const NEPercentageDealSize = ref("");
const SWPercentageDealSize = ref("");
const SSPercentageDealSize = ref("");
const SEPercentageDealSize = ref("");
const NCPercentageDealSize = ref("");
const NAPercentageDealSize = ref("");
const AnnuityPPPPercentageDealSize = ref("");
const publicBondPercentageDealSize = ref("");
const blendedFinancePercentageDealSize = ref("");
const contingentRefinancingPercentageDealSize = ref("");
const privateBond_OthersPercentageDealSize = ref("");
const privateBond_CleanEnergyPercentageDealSize = ref("");
const numofAffordableHousingRED = ref("");
const numofAffordableHousingAMBER = ref("");
const numofAffordableHousingGREEN = ref("");
const numofagricInfraRED = ref("");
const numofagricInfraAMBER = ref("");
const numofagricInfraGREEN = ref("");
const numofeducationInfraRED = ref("");
const numofeducationInfraAMBER = ref("");
const numofeducationInfraGREEN = ref("");
const numofgasToCleanRED = ref("");
const numofgasToCleanAMBER = ref("");
const numofgasToCleanGREEN = ref("");
const numofgasToPowerRED = ref("");
const numofgasToPowerAMBER = ref("");
const numofgasToPowerGREEN = ref("");
const numofHealthcareRED = ref("");
const numofHealthcareAMBER = ref("");
const numofHealthcareGREEN = ref("");
const numofICT_TelcomRED = ref("");
const numofICT_TelcomAMBER = ref("");
const numofICT_TelcomGREEN = ref("");
const numofInfra_LogisticsRED = ref("");
const numofInfra_LogisticsAMBER = ref("");
const numofInfra_LogisticsGREEN = ref("");
const numofinputsToInfraRED = ref("");
const numofinputsToInfraAMBER = ref("");
const numofinputsToInfraGREEN = ref("");
const numoflogisticsRED = ref("");
const numoflogisticsAMBER = ref("");
const numoflogisticsGREEN = ref("");
const numofoffGridPowerRED = ref("");
const numofoffGridPowerAMBER = ref("");
const numofoffGridPowerGREEN = ref("");
const numofonGridPowerRED = ref("");
const numofonGridPowerAMBER = ref("");
const numofonGridPowerGREEN = ref("");
const numofrenewableEnergyRED = ref("");
const numofrenewableEnergyAMBER = ref("");
const numofrenewableEnergyGREEN = ref("");
const numoftransportationRED = ref("");
const numoftransportationAMBER = ref("");
const numoftransportationGREEN = ref("");
const numofwater_wasteRED = ref("");
const numofwater_wasteAMBER = ref("");
const numofwater_wasteGREEN = ref("");
const AffordableHousingTotalRED = ref("");
const AffordableHousingTotalAMBER = ref("");
const AffordableHousingTotalGREEN = ref("");
const agricInfraTotalRED = ref("");
const agricInfraTotalAMBER = ref("");
const agricInfraTotalGREEN = ref("");
const educationInfraTotalRED = ref("");
const educationInfraTotalAMBER = ref("");
const educationInfraTotalGREEN = ref("");
const gasToCleanTotalRED = ref("");
const gasToCleanTotalAMBER = ref("");
const gasToCleanTotalGREEN = ref("");
const gasToPowerTotalRED = ref("");
const gasToPowerTotalAMBER = ref("");
const gasToPowerTotalGREEN = ref("");
const HealthcareTotalRED = ref("");
const HealthcareTotalAMBER = ref("");
const HealthcareTotalGREEN = ref("");
const ICT_TelcomTotalRED = ref("");
const ICT_TelcomTotalAMBER = ref("");
const ICT_TelcomTotalGREEN = ref("");
const Infra_LogisticsTotalRED = ref("");
const Infra_LogisticsTotalAMBER = ref("");
const Infra_LogisticsTotalGREEN = ref("");
const inputsToInfraTotalRED = ref("");
const inputsToInfraTotalAMBER = ref("");
const inputsToInfraTotalGREEN = ref("");
const logisticsTotalRED = ref("");
const logisticsTotalAMBER = ref("");
const logisticsTotalGREEN = ref("");
const offGridPowerTotalRED = ref("");
const offGridPowerTotalAMBER = ref("");
const offGridPowerTotalGREEN = ref("");
const onGridPowerTotalRED = ref("");
const onGridPowerTotalAMBER = ref("");
const onGridPowerTotalGREEN = ref("");
const renewableEnergyTotalRED = ref("");
const renewableEnergyTotalAMBER = ref("");
const renewableEnergyTotalGREEN = ref("");
const transportationTotalRED = ref("");
const transportationTotalAMBER = ref("");
const transportationTotalGREEN = ref("");
const water_wasteTotalRED = ref("");
const water_wasteTotalAMBER = ref("");
const water_wasteTotalGREEN = ref("");
const guaranteePipelineDeals = ref(false);
const dialogTransactionList = ref(false);
const green_AmberDeals = ref(false);
const greenDeals = ref(false);
const guaranteePipelineActualSize = ref("");
const varianceGuaranteePipeline = ref("");
const varianceGreen_Amber = ref("");
const varianceGreen = ref("");
const percentageGuaranteePipeline = ref("");
const percentageNewDeals = ref("");
const percentageGreen_Amber = ref("");
const percentageGreen = ref("");
const cumulativeData = sampleData.cumulative;
const dealStats2 = ref([]);
const dealStats3 = ref([]);
const dealStats4 = ref([]);
const dealStats5 = ref([]);
const allPerformance = ref([]);
const newDealsActual = ref([]);
const newDealsTarget = ref([]);
const newDealsSign = ref(false);
const guaranteeShow = ref(false);
const green_AmberShow = ref(false);
const greenShow = ref(false);
const originationShow = ref(false);
const selectedValue = ref([]);
const newDealsVariance = ref("");
const targetOriginPercentage = ref("");
const actualOriginPercentage = ref("");
const searchOption = ref("");
const sectorOption = ref("");
const filterOption = ref("");
const categoryOption = ref("");
const project_TypeOption = ref("");
const allPipelineLeadsData = ref("");
const myPipelineLeadsData = ref("");

const computedTileDataRegion = computed(() => {
  if (props.data != null && props.data.length != 0) {
    let allDeals = props.data;
    allDeals = allDeals.filter(
      (o) =>
        new Date(o.financialYearName.slice(2)).getFullYear() <=
        new Date(stores.financialYear.slice(2)).getFullYear() &&
        o.dealStatus == true
    );

    var NW = allDeals.filter(
      (o) =>
        (o.regionCode == "NW" &&
          o.dealCategory != "CLOSED" &&
          new Date(o.mandateLetterDate).getFullYear() ==
          stores.financialYear.slice(2, 6)) ||
        (o.regionCode == "NW" &&
          o.dealCategory != "CLOSED" &&
          new Date(o.creditApprovalDate).getFullYear() ==
          stores.financialYear.slice(2, 6)) ||
        (o.regionCode == "NW" &&
          o.dealCategory != "CLOSED" &&
          new Date(o.actualCloseDate).getFullYear() ==
          stores.financialYear.slice(2, 6))
    );
    var SS = allDeals.filter(
      (o) =>
        (o.regionCode == "SS" &&
          o.dealCategory != "CLOSED" &&
          new Date(o.mandateLetterDate).getFullYear() ==
          stores.financialYear.slice(2, 6)) ||
        (o.regionCode == "SS" &&
          o.dealCategory != "CLOSED" &&
          new Date(o.creditApprovalDate).getFullYear() ==
          stores.financialYear.slice(2, 6)) ||
        (o.regionCode == "SS" &&
          o.dealCategory != "CLOSED" &&
          new Date(o.actualCloseDate).getFullYear() ==
          stores.financialYear.slice(2, 6))
    );
    var SE = allDeals.filter(
      (o) =>
        (o.regionCode == "SE" &&
          o.dealCategory != "CLOSED" &&
          new Date(o.mandateLetterDate).getFullYear() ==
          stores.financialYear.slice(2, 6)) ||
        (o.regionCode == "SE" &&
          o.dealCategory != "CLOSED" &&
          new Date(o.creditApprovalDate).getFullYear() ==
          stores.financialYear.slice(2, 6)) ||
        (o.regionCode == "SE" &&
          o.dealCategory != "CLOSED" &&
          new Date(o.actualCloseDate).getFullYear() ==
          stores.financialYear.slice(2, 6))
    );
    var SW = allDeals.filter(
      (o) =>
        (o.regionCode == "SW" &&
          o.dealCategory != "CLOSED" &&
          new Date(o.mandateLetterDate).getFullYear() ==
          stores.financialYear.slice(2, 6)) ||
        (o.regionCode == "SW" &&
          o.dealCategory != "CLOSED" &&
          new Date(o.creditApprovalDate).getFullYear() ==
          stores.financialYear.slice(2, 6)) ||
        (o.regionCode == "SW" &&
          o.dealCategory != "CLOSED" &&
          new Date(o.actualCloseDate).getFullYear() ==
          stores.financialYear.slice(2, 6))
    );
    var NC = allDeals.filter(
      (o) =>
        (o.regionCode == "NC" &&
          o.dealCategory != "CLOSED" &&
          new Date(o.mandateLetterDate).getFullYear() ==
          stores.financialYear.slice(2, 6)) ||
        (o.regionCode == "NC" &&
          o.dealCategory != "CLOSED" &&
          new Date(o.creditApprovalDate).getFullYear() ==
          stores.financialYear.slice(2, 6)) ||
        (o.regionCode == "NC" &&
          o.dealCategory != "CLOSED" &&
          new Date(o.actualCloseDate).getFullYear() ==
          stores.financialYear.slice(2, 6))
    );
    var NE = allDeals.filter(
      (o) =>
        (o.regionCode == "NE" &&
          o.dealCategory != "CLOSED" &&
          new Date(o.mandateLetterDate).getFullYear() ==
          stores.financialYear.slice(2, 6)) ||
        (o.regionCode == "NE" &&
          o.dealCategory != "CLOSED" &&
          new Date(o.creditApprovalDate).getFullYear() ==
          stores.financialYear.slice(2, 6)) ||
        (o.regionCode == "NE" &&
          o.dealCategory != "CLOSED" &&
          new Date(o.actualCloseDate).getFullYear() ==
          stores.financialYear.slice(2, 6))
    );
    var NA = allDeals.filter(
      (o) =>
        (o.regionCode == "NA" &&
          o.dealCategory != "CLOSED" &&
          new Date(o.mandateLetterDate).getFullYear() ==
          stores.financialYear.slice(2, 6)) ||
        (o.regionCode == "NA" &&
          o.dealCategory != "CLOSED" &&
          new Date(o.creditApprovalDate).getFullYear() ==
          stores.financialYear.slice(2, 6)) ||
        (o.regionCode == "NA" &&
          o.dealCategory != "CLOSED" &&
          new Date(o.actualCloseDate).getFullYear() ==
          stores.financialYear.slice(2, 6))
    );

    var NW = allDeals.filter(
      (o) =>
        (o.regionCode == "NW" && o.dealCategory != "CLOSED") ||
        (o.regionCode == "NW" && o.dealCategory != "CLOSED") ||
        (o.regionCode == "NW" && o.dealCategory != "CLOSED")
    );
    var SS = allDeals.filter(
      (o) =>
        (o.regionCode == "SS" && o.dealCategory != "CLOSED") ||
        (o.regionCode == "SS" && o.dealCategory != "CLOSED") ||
        (o.regionCode == "SS" && o.dealCategory != "CLOSED")
    );
    var SE = allDeals.filter(
      (o) =>
        (o.regionCode == "SE" && o.dealCategory != "CLOSED") ||
        (o.regionCode == "SE" && o.dealCategory != "CLOSED") ||
        (o.regionCode == "SE" && o.dealCategory != "CLOSED")
    );
    var SW = allDeals.filter(
      (o) =>
        (o.regionCode == "SW" && o.dealCategory != "CLOSED") ||
        (o.regionCode == "SW" && o.dealCategory != "CLOSED") ||
        (o.regionCode == "SW" && o.dealCategory != "CLOSED")
    );
    var NC = allDeals.filter(
      (o) =>
        (o.regionCode == "NC" && o.dealCategory != "CLOSED") ||
        (o.regionCode == "NC" && o.dealCategory != "CLOSED") ||
        (o.regionCode == "NC" && o.dealCategory != "CLOSED")
    );
    var NE = allDeals.filter(
      (o) =>
        (o.regionCode == "NE" && o.dealCategory != "CLOSED") ||
        (o.regionCode == "NE" && o.dealCategory != "CLOSED") ||
        (o.regionCode == "NE" && o.dealCategory != "CLOSED")
    );
    var NA = allDeals.filter(
      (o) =>
        (o.regionCode == "NA" && o.dealCategory != "CLOSED") ||
        (o.regionCode == "NA" && o.dealCategory != "CLOSED") ||
        (o.regionCode == "NA" && o.dealCategory != "CLOSED")
    );

    if (
      props.fundOption != "" &&
      props.fundOption &&
      props.fundOption == "BOI"
    ) {
      var NW = NW.filter((o) => o.fundOptionBOI == true);
      var NA = NA.filter((o) => o.fundOptionBOI == true);
      var SS = SS.filter((o) => o.fundOptionBOI == true);
      var SE = SE.filter((o) => o.fundOptionBOI == true);
      var SW = SW.filter((o) => o.fundOptionBOI == true);
      var NC = NC.filter((o) => o.fundOptionBOI == true);
      var NE = NE.filter((o) => o.fundOptionBOI == true);
    } else if (
      props.fundOption != "" &&
      props.fundOption &&
      props.fundOption == "DCM"
    ) {
      var NW = NW.filter((o) => o.fundOptionDCM == true);
      var NA = NA.filter((o) => o.fundOptionDCM == true);
      var SS = SS.filter((o) => o.fundOptionDCM == true);
      var SE = SE.filter((o) => o.fundOptionDCM == true);
      var SW = SW.filter((o) => o.fundOptionDCM == true);
      var NC = NC.filter((o) => o.fundOptionDCM == true);
      var NE = NE.filter((o) => o.fundOptionDCM == true);
    } else if (
      props.fundOption != "" &&
      props.fundOption &&
      props.fundOption == "PCB"
    ) {
      var NW = NW.filter((o) => o.fundOptionPCB == true);
      var NA = NA.filter((o) => o.fundOptionPCB == true);
      var SS = SS.filter((o) => o.fundOptionPCB == true);
      var SE = SE.filter((o) => o.fundOptionPCB == true);
      var SW = SW.filter((o) => o.fundOptionPCB == true);
      var NC = NC.filter((o) => o.fundOptionPCB == true);
      var NE = NE.filter((o) => o.fundOptionPCB == true);
    }

    numofNW.value = NW.length;
    numofNA.value = NW.length;
    numofSS.value = SS.length;
    numofSE.value = SE.length;
    numofSW.value = SW.length;
    numofNC.value = NC.length;
    numofNE.value = NE.length;

    let isNW = null;
    let isSS = null;
    let isSE = null;
    let isSW = null;
    let isNC = null;
    let isNE = null;
    let isNA = null;

    if (numofNW.value > 0) {
      isNW = 1;
    }
    if (numofSS.value > 0) {
      isSS = 1;
    }
    if (numofSE.value > 0) {
      isSE = 1;
    }
    if (numofSW.value > 0) {
      isSW = 1;
    }
    if (numofNC.value > 0) {
      isNC = 1;
    }
    if (numofNE.value > 0) {
      isNE = 1;
    }
    if (numofNA.value > 0) {
      isNA = 1;
    }

    numofTotalRegion.value = isNW + isSS + isSE + isSW + isNC + isNE + isNA;

    const cartPricesArrayString = NC.map(function (item) {
      return item.dealSize;
    });

    const cartPricesArrayString2 = SE.map(function (item) {
      return item.dealSize;
    });

    const cartPricesArrayString3 = SS.map(function (item) {
      return item.dealSize;
    });

    const cartPricesArrayString4 = SW.map(function (item) {
      return item.dealSize;
    });

    const cartPricesArrayString5 = NE.map(function (item) {
      return item.dealSize;
    });

    const cartPricesArrayString6 = NW.map(function (item) {
      return item.dealSize;
    });

    const cartPricesArrayString7 = NA.map(function (item) {
      return item.dealSize;
    });

    NWTotalDealSize.value = cartPricesArrayString6.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    NETotalDealSize.value = cartPricesArrayString5.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    SWTotalDealSize.value = cartPricesArrayString4.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    SSTotalDealSize.value = cartPricesArrayString3.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    SETotalDealSize.value = cartPricesArrayString2.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    NCTotalDealSize.value = cartPricesArrayString.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    NATotalDealSize.value = cartPricesArrayString7.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    TotalDealSize.value =
      NWTotalDealSize.value +
      NETotalDealSize.value +
      SWTotalDealSize.value +
      SSTotalDealSize.value +
      SETotalDealSize.value +
      NCTotalDealSize.value +
      NATotalDealSize.value;

    NWPercentageDealSize.value = (
      (NWTotalDealSize.value / TotalDealSize.value) *
      100
    ).toFixed(0);
    NEPercentageDealSize.value = (
      (NETotalDealSize.value / TotalDealSize.value) *
      100
    ).toFixed(0);
    SWPercentageDealSize.value = (
      (SWTotalDealSize.value / TotalDealSize.value) *
      100
    ).toFixed(0);
    SSPercentageDealSize.value = (
      (SSTotalDealSize.value / TotalDealSize.value) *
      100
    ).toFixed(0);
    SEPercentageDealSize.value = (
      (SETotalDealSize.value / TotalDealSize.value) *
      100
    ).toFixed(0);
    NCPercentageDealSize.value = (
      (NCTotalDealSize.value / TotalDealSize.value) *
      100
    ).toFixed(0);
    NAPercentageDealSize.value = (
      (NATotalDealSize.value / TotalDealSize.value) *
      100
    ).toFixed(0);

    return (dealStats3.value = [
      {
        title: "NW",
        number: numofNW.value,
        amount: parseFloat(NWTotalDealSize.value).toFixed(3),
        percentage: `${NWPercentageDealSize.value}`,
      },
      {
        title: "SS",
        number: numofSS.value,
        amount: parseFloat(SSTotalDealSize.value).toFixed(3),
        percentage: `${SSPercentageDealSize.value}`,
      },
      {
        title: "SE",
        number: numofSE.value,
        amount: parseFloat(SETotalDealSize.value).toFixed(3),
        percentage: `${SEPercentageDealSize.value}`,
      },
      {
        title: "SW",
        number: numofSW.value,
        amount: parseFloat(SWTotalDealSize.value).toFixed(3),
        percentage: `${SWPercentageDealSize.value}`,
      },
      {
        title: "NC",
        number: numofNC.value,
        amount: parseFloat(NCTotalDealSize.value).toFixed(3),
        percentage: `${NCPercentageDealSize.value}`,
      },
      {
        title: "NA",
        number: numofNA.value,
        amount: parseFloat(NATotalDealSize.value).toFixed(3),
        percentage: `${NAPercentageDealSize.value}`,
      },
      {
        title: "NE",
        number: numofNE.value,
        amount: parseFloat(NETotalDealSize.value).toFixed(3),
        percentage: `${NEPercentageDealSize.value}`,
      },
    ]);
  }
});

const computedTileDataIndustries = computed(() => {
  if (props.data != null && props.data.length != 0) {
    let allDeals = props.data;
    allDeals = allDeals.filter(
      (o) =>
        new Date(o.financialYearName.slice(2)).getFullYear() <=
        new Date(stores.financialYear.slice(2)).getFullYear()
    );

    // var afforableHousingRED = allDeals.filter(o => o.industrySector == 'Affordable Housing' && o.dealCategory == 'RED' && new Date(o.mandateLetterDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var afforableHousingAMBER = allDeals.filter(o => o.industrySector == 'Affordable Housing' && o.dealCategory == 'AMBER' && new Date(o.creditApprovalDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var afforableHousingGREEN = allDeals.filter(o => o.industrySector == 'Affordable Housing' && o.dealCategory == 'GREEN' && new Date(o.feeLetterDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var agricInfraRED = allDeals.filter(o => o.industrySector == 'Agric. Infrastructure' && o.dealCategory == 'RED' && new Date(o.mandateLetterDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var agricInfraAMBER = allDeals.filter(o => o.industrySector == 'Agric. Infrastructure' && o.dealCategory == 'AMBER' && new Date(o.creditApprovalDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var agricInfraGREEN = allDeals.filter(o => o.industrySector == 'Agric. Infrastructure' && o.dealCategory == 'GREEN' && new Date(o.feeLetterDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var educationInfraRED = allDeals.filter(o => o.industrySector == 'Education Infrastructure' && o.dealCategory == 'RED' && new Date(o.mandateLetterDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var educationInfraAMBER = allDeals.filter(o => o.industrySector == 'Education Infrastructure' && o.dealCategory == 'AMBER' && new Date(o.creditApprovalDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var educationInfraGREEN = allDeals.filter(o => o.industrySector == 'Education Infrastructure' && o.dealCategory == 'GREEN' && new Date(o.feeLetterDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var gasToCleanRED = allDeals.filter(o => o.industrySector == 'Gas-to-Clean' && o.dealCategory == 'RED' && new Date(o.mandateLetterDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var gasToCleanAMBER = allDeals.filter(o => o.industrySector == 'Gas-to-Clean' && o.dealCategory == 'AMBER' && new Date(o.creditApprovalDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var gasToCleanGREEN = allDeals.filter(o => o.industrySector == 'Gas-to-Clean' && o.dealCategory == 'GREEN' && new Date(o.feeLetterDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var gasToPowerRED = allDeals.filter(o => o.industrySector == 'Gas-to-Power' && o.dealCategory == 'RED' && new Date(o.mandateLetterDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var gasToPowerAMBER = allDeals.filter(o => o.industrySector == 'Gas-to-Power' && o.dealCategory == 'AMBER' && new Date(o.creditApprovalDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var gasToPowerGREEN = allDeals.filter(o => o.industrySector == 'Gas-to-Power' && o.dealCategory == 'GREEN' && new Date(o.feeLetterDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var HealthcareRED = allDeals.filter(o => o.industrySector == 'Healthcare' && o.dealCategory == 'RED' && new Date(o.mandateLetterDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var HealthcareAMBER = allDeals.filter(o => o.industrySector == 'Healthcare' && o.dealCategory == 'AMBER' && new Date(o.creditApprovalDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var HealthcareGREEN = allDeals.filter(o => o.industrySector == 'Healthcare' && o.dealCategory == 'GREEN' && new Date(o.feeLetterDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var ICT_TelcomRED = allDeals.filter(o => o.industrySector == 'ICT/Telecoms' && o.dealCategory == 'RED' && new Date(o.mandateLetterDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var ICT_TelcomAMBER = allDeals.filter(o => o.industrySector == 'ICT/Telecoms' && o.dealCategory == 'AMBER' && new Date(o.creditApprovalDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var ICT_TelcomGREEN = allDeals.filter(o => o.industrySector == 'ICT/Telecoms' && o.dealCategory == 'GREEN' && new Date(o.feeLetterDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var Infra_LogisticsRED = allDeals.filter(o => o.industrySector == 'Infrastructure/Logistics' && o.dealCategory == 'RED' && new Date(o.mandateLetterDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var Infra_LogisticsAMBER = allDeals.filter(o => o.industrySector == 'Infrastructure/Logistics' && o.dealCategory == 'AMBER' && new Date(o.creditApprovalDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var Infra_LogisticsGREEN = allDeals.filter(o => o.industrySector == 'Infrastructure/Logistics' && o.dealCategory == 'GREEN' && new Date(o.feeLetterDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var inputsToInfraRED = allDeals.filter(o => o.industrySector == 'Inputs to Infrastructure' && o.dealCategory == 'RED' && new Date(o.mandateLetterDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var inputsToInfraAMBER = allDeals.filter(o => o.industrySector == 'Inputs to Infrastructure' && o.dealCategory == 'AMBER' && new Date(o.creditApprovalDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var inputsToInfraGREEN = allDeals.filter(o => o.industrySector == 'Inputs to Infrastructure' && o.dealCategory == 'GREEN' && new Date(o.feeLetterDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var logisticsRED = allDeals.filter(o => o.industrySector == 'Logistics' && o.dealCategory == 'RED' && new Date(o.mandateLetterDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var logisticsAMBER = allDeals.filter(o => o.industrySector == 'Logistics' && o.dealCategory == 'AMBER' && new Date(o.creditApprovalDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var logisticsGREEN = allDeals.filter(o => o.industrySector == 'Logistics' && o.dealCategory == 'GREEN' && new Date(o.feeLetterDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var offGridPowerRED = allDeals.filter(o => o.industrySector == 'Off-grid Power' && o.dealCategory == 'RED' && new Date(o.mandateLetterDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var offGridPowerAMBER = allDeals.filter(o => o.industrySector == 'Off-grid Power' && o.dealCategory == 'AMBER' && new Date(o.creditApprovalDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var offGridPowerGREEN = allDeals.filter(o => o.industrySector == 'Off-grid Power' && o.dealCategory == 'GREEN' && new Date(o.feeLetterDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var onGridPowerRED = allDeals.filter(o => o.industrySector == 'On-grid Power' && o.dealCategory == 'RED' && new Date(o.mandateLetterDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var onGridPowerAMBER = allDeals.filter(o => o.industrySector == 'On-grid Power' && o.dealCategory == 'AMBER' && new Date(o.creditApprovalDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var onGridPowerGREEN = allDeals.filter(o => o.industrySector == 'On-grid Power' && o.dealCategory == 'GREEN' && new Date(o.feeLetterDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var renewableEnergyRED = allDeals.filter(o => o.industrySector == 'Renewable Energy' && o.dealCategory == 'RED' && new Date(o.mandateLetterDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var renewableEnergyAMBER = allDeals.filter(o => o.industrySector == 'Renewable Energy' && o.dealCategory == 'AMBER' && new Date(o.creditApprovalDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var renewableEnergyGREEN = allDeals.filter(o => o.industrySector == 'Renewable Energy' && o.dealCategory == 'GREEN' && new Date(o.feeLetterDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var transportationRED = allDeals.filter(o => o.industrySector == 'Transportation' && o.dealCategory == 'RED' && new Date(o.mandateLetterDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var transportationAMBER = allDeals.filter(o => o.industrySector == 'Transportation' && o.dealCategory == 'AMBER' && new Date(o.creditApprovalDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var transportationGREEN = allDeals.filter(o => o.industrySector == 'Transportation' && o.dealCategory == 'GREEN' && new Date(o.feeLetterDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var water_wasteRED = allDeals.filter(o => o.industrySector == 'Water/Waste' && o.dealCategory == 'RED' && new Date(o.mandateLetterDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var water_wasteAMBER = allDeals.filter(o => o.industrySector == 'Water/Waste' && o.dealCategory == 'AMBER' && new Date(o.creditApprovalDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var water_wasteGREEN = allDeals.filter(o => o.industrySector == 'Water/Waste' && o.dealCategory == 'GREEN' && new Date(o.feeLetterDate).getFullYear() == stores.financialYear.slice(2, 6))

    var afforableHousingRED = allDeals.filter(
      (o) => o.industrySector == "Affordable Housing" && o.dealCategory == "RED"
    );
    var afforableHousingAMBER = allDeals.filter(
      (o) =>
        o.industrySector == "Affordable Housing" && o.dealCategory == "AMBER"
    );
    var afforableHousingGREEN = allDeals.filter(
      (o) =>
        o.industrySector == "Affordable Housing" && o.dealCategory == "GREEN"
    );
    var agricInfraRED = allDeals.filter(
      (o) =>
        o.industrySector == "Agric. Infrastructure" && o.dealCategory == "RED"
    );
    var agricInfraAMBER = allDeals.filter(
      (o) =>
        o.industrySector == "Agric. Infrastructure" && o.dealCategory == "AMBER"
    );
    var agricInfraGREEN = allDeals.filter(
      (o) =>
        o.industrySector == "Agric. Infrastructure" && o.dealCategory == "GREEN"
    );
    var educationInfraRED = allDeals.filter(
      (o) =>
        o.industrySector == "Education Infrastructure" &&
        o.dealCategory == "RED"
    );
    var educationInfraAMBER = allDeals.filter(
      (o) =>
        o.industrySector == "Education Infrastructure" &&
        o.dealCategory == "AMBER"
    );
    var educationInfraGREEN = allDeals.filter(
      (o) =>
        o.industrySector == "Education Infrastructure" &&
        o.dealCategory == "GREEN"
    );
    var gasToCleanRED = allDeals.filter(
      (o) => o.industrySector == "Gas-to-Clean" && o.dealCategory == "RED"
    );
    var gasToCleanAMBER = allDeals.filter(
      (o) => o.industrySector == "Gas-to-Clean" && o.dealCategory == "AMBER"
    );
    var gasToCleanGREEN = allDeals.filter(
      (o) => o.industrySector == "Gas-to-Clean" && o.dealCategory == "GREEN"
    );
    var gasToPowerRED = allDeals.filter(
      (o) => o.industrySector == "Gas-to-Power" && o.dealCategory == "RED"
    );
    var gasToPowerAMBER = allDeals.filter(
      (o) => o.industrySector == "Gas-to-Power" && o.dealCategory == "AMBER"
    );
    var gasToPowerGREEN = allDeals.filter(
      (o) => o.industrySector == "Gas-to-Power" && o.dealCategory == "GREEN"
    );
    var HealthcareRED = allDeals.filter(
      (o) => o.industrySector == "Healthcare" && o.dealCategory == "RED"
    );
    var HealthcareAMBER = allDeals.filter(
      (o) => o.industrySector == "Healthcare" && o.dealCategory == "AMBER"
    );
    var HealthcareGREEN = allDeals.filter(
      (o) => o.industrySector == "Healthcare" && o.dealCategory == "GREEN"
    );
    var ICT_TelcomRED = allDeals.filter(
      (o) => o.industrySector == "ICT/Telecoms" && o.dealCategory == "RED"
    );
    var ICT_TelcomAMBER = allDeals.filter(
      (o) => o.industrySector == "ICT/Telecoms" && o.dealCategory == "AMBER"
    );
    var ICT_TelcomGREEN = allDeals.filter(
      (o) => o.industrySector == "ICT/Telecoms" && o.dealCategory == "GREEN"
    );
    var Infra_LogisticsRED = allDeals.filter(
      (o) =>
        o.industrySector == "Infrastructure/Logistics" &&
        o.dealCategory == "RED"
    );
    var Infra_LogisticsAMBER = allDeals.filter(
      (o) =>
        o.industrySector == "Infrastructure/Logistics" &&
        o.dealCategory == "AMBER"
    );
    var Infra_LogisticsGREEN = allDeals.filter(
      (o) =>
        o.industrySector == "Infrastructure/Logistics" &&
        o.dealCategory == "GREEN"
    );
    var inputsToInfraRED = allDeals.filter(
      (o) =>
        o.industrySector == "Inputs to Infrastructure" &&
        o.dealCategory == "RED"
    );
    var inputsToInfraAMBER = allDeals.filter(
      (o) =>
        o.industrySector == "Inputs to Infrastructure" &&
        o.dealCategory == "AMBER"
    );
    var inputsToInfraGREEN = allDeals.filter(
      (o) =>
        o.industrySector == "Inputs to Infrastructure" &&
        o.dealCategory == "GREEN"
    );
    var logisticsRED = allDeals.filter(
      (o) => o.industrySector == "Logistics" && o.dealCategory == "RED"
    );
    var logisticsAMBER = allDeals.filter(
      (o) => o.industrySector == "Logistics" && o.dealCategory == "AMBER"
    );
    var logisticsGREEN = allDeals.filter(
      (o) => o.industrySector == "Logistics" && o.dealCategory == "GREEN"
    );
    var offGridPowerRED = allDeals.filter(
      (o) => o.industrySector == "Off-grid Power" && o.dealCategory == "RED"
    );
    var offGridPowerAMBER = allDeals.filter(
      (o) => o.industrySector == "Off-grid Power" && o.dealCategory == "AMBER"
    );
    var offGridPowerGREEN = allDeals.filter(
      (o) => o.industrySector == "Off-grid Power" && o.dealCategory == "GREEN"
    );
    var onGridPowerRED = allDeals.filter(
      (o) => o.industrySector == "On-grid Power" && o.dealCategory == "RED"
    );
    var onGridPowerAMBER = allDeals.filter(
      (o) => o.industrySector == "On-grid Power" && o.dealCategory == "AMBER"
    );
    var onGridPowerGREEN = allDeals.filter(
      (o) => o.industrySector == "On-grid Power" && o.dealCategory == "GREEN"
    );
    var renewableEnergyRED = allDeals.filter(
      (o) => o.industrySector == "Renewable Energy" && o.dealCategory == "RED"
    );
    var renewableEnergyAMBER = allDeals.filter(
      (o) => o.industrySector == "Renewable Energy" && o.dealCategory == "AMBER"
    );
    var renewableEnergyGREEN = allDeals.filter(
      (o) => o.industrySector == "Renewable Energy" && o.dealCategory == "GREEN"
    );
    var transportationRED = allDeals.filter(
      (o) => o.industrySector == "Transportation" && o.dealCategory == "RED"
    );
    var transportationAMBER = allDeals.filter(
      (o) => o.industrySector == "Transportation" && o.dealCategory == "AMBER"
    );
    var transportationGREEN = allDeals.filter(
      (o) => o.industrySector == "Transportation" && o.dealCategory == "GREEN"
    );
    var water_wasteRED = allDeals.filter(
      (o) => o.industrySector == "Water/Waste" && o.dealCategory == "RED"
    );
    var water_wasteAMBER = allDeals.filter(
      (o) => o.industrySector == "Water/Waste" && o.dealCategory == "AMBER"
    );
    var water_wasteGREEN = allDeals.filter(
      (o) => o.industrySector == "Water/Waste" && o.dealCategory == "GREEN"
    );

    if (
      props.fundOption != "" &&
      props.fundOption &&
      props.fundOption == "BOI"
    ) {
      var afforableHousingRED = afforableHousingRED.filter(
        (o) => o.fundOptionBOI == true
      );
      var afforableHousingAMBER = afforableHousingAMBER.filter(
        (o) => o.fundOptionBOI == true
      );
      var afforableHousingGREEN = afforableHousingGREEN.filter(
        (o) => o.fundOptionBOI == true
      );
      var agricInfraRED = agricInfraRED.filter((o) => o.fundOptionBOI == true);
      var agricInfraAMBER = agricInfraAMBER.filter(
        (o) => o.fundOptionBOI == true
      );
      var agricInfraGREEN = agricInfraGREEN.filter(
        (o) => o.fundOptionBOI == true
      );
      var educationInfraRED = educationInfraRED.filter(
        (o) => o.fundOptionBOI == true
      );
      var educationInfraAMBER = educationInfraAMBER.filter(
        (o) => o.fundOptionBOI == true
      );
      var educationInfraGREEN = educationInfraGREEN.filter(
        (o) => o.fundOptionBOI == true
      );
      var gasToCleanRED = gasToCleanRED.filter((o) => o.fundOptionBOI == true);
      var gasToCleanAMBER = gasToCleanAMBER.filter(
        (o) => o.fundOptionBOI == true
      );
      var gasToCleanGREEN = gasToCleanGREEN.filter(
        (o) => o.fundOptionBOI == true
      );
      var gasToPowerRED = gasToPowerRED.filter((o) => o.fundOptionBOI == true);
      var gasToPowerAMBER = gasToPowerAMBER.filter(
        (o) => o.fundOptionBOI == true
      );
      var gasToPowerGREEN = gasToPowerGREEN.filter(
        (o) => o.fundOptionBOI == true
      );
      var HealthcareRED = HealthcareRED.filter((o) => o.fundOptionBOI == true);
      var HealthcareAMBER = HealthcareAMBER.filter(
        (o) => o.fundOptionBOI == true
      );
      var HealthcareGREEN = HealthcareGREEN.filter(
        (o) => o.fundOptionBOI == true
      );
      var ICT_TelcomRED = ICT_TelcomRED.filter((o) => o.fundOptionBOI == true);
      var ICT_TelcomAMBER = ICT_TelcomAMBER.filter(
        (o) => o.fundOptionBOI == true
      );
      var ICT_TelcomGREEN = ICT_TelcomGREEN.filter(
        (o) => o.fundOptionBOI == true
      );
      var Infra_LogisticsRED = Infra_LogisticsRED.filter(
        (o) => o.fundOptionBOI == true
      );
      var Infra_LogisticsAMBER = Infra_LogisticsAMBER.filter(
        (o) => o.fundOptionBOI == true
      );
      var Infra_LogisticsGREEN = Infra_LogisticsGREEN.filter(
        (o) => o.fundOptionBOI == true
      );
      var inputsToInfraRED = inputsToInfraRED.filter(
        (o) => o.fundOptionBOI == true
      );
      var inputsToInfraAMBER = inputsToInfraAMBER.filter(
        (o) => o.fundOptionBOI == true
      );
      var inputsToInfraGREEN = inputsToInfraGREEN.filter(
        (o) => o.fundOptionBOI == true
      );
      var logisticsRED = logisticsRED.filter((o) => o.fundOptionBOI == true);
      var logisticsAMBER = logisticsAMBER.filter(
        (o) => o.fundOptionBOI == true
      );
      var logisticsGREEN = logisticsGREEN.filter(
        (o) => o.fundOptionBOI == true
      );
      var offGridPowerRED = offGridPowerRED.filter(
        (o) => o.fundOptionBOI == true
      );
      var offGridPowerAMBER = offGridPowerAMBER.filter(
        (o) => o.fundOptionBOI == true
      );
      var offGridPowerGREEN = offGridPowerGREEN.filter(
        (o) => o.fundOptionBOI == true
      );
      var onGridPowerRED = onGridPowerRED.filter(
        (o) => o.fundOptionBOI == true
      );
      var onGridPowerAMBER = onGridPowerAMBER.filter(
        (o) => o.fundOptionBOI == true
      );
      var onGridPowerGREEN = onGridPowerGREEN.filter(
        (o) => o.fundOptionBOI == true
      );
      var renewableEnergyRED = renewableEnergyRED.filter(
        (o) => o.fundOptionBOI == true
      );
      var renewableEnergyAMBER = renewableEnergyAMBER.filter(
        (o) => o.fundOptionBOI == true
      );
      var renewableEnergyGREEN = renewableEnergyGREEN.filter(
        (o) => o.fundOptionBOI == true
      );
      var transportationRED = transportationRED.filter(
        (o) => o.fundOptionBOI == true
      );
      var transportationAMBER = transportationAMBER.filter(
        (o) => o.fundOptionBOI == true
      );
      var transportationGREEN = transportationGREEN.filter(
        (o) => o.fundOptionBOI == true
      );
      var water_wasteRED = water_wasteRED.filter(
        (o) => o.fundOptionBOI == true
      );
      var water_wasteAMBER = water_wasteAMBER.filter(
        (o) => o.fundOptionBOI == true
      );
      var water_wasteGREEN = water_wasteGREEN.filter(
        (o) => o.fundOptionBOI == true
      );
    } else if (
      props.fundOption != "" &&
      props.fundOption &&
      props.fundOption == "DCM"
    ) {
      var afforableHousingRED = afforableHousingRED.filter(
        (o) => o.fundOptionDCM == true
      );
      var afforableHousingAMBER = afforableHousingAMBER.filter(
        (o) => o.fundOptionDCM == true
      );
      var afforableHousingGREEN = afforableHousingGREEN.filter(
        (o) => o.fundOptionDCM == true
      );
      var agricInfraRED = agricInfraRED.filter((o) => o.fundOptionDCM == true);
      var agricInfraAMBER = agricInfraAMBER.filter(
        (o) => o.fundOptionDCM == true
      );
      var agricInfraGREEN = agricInfraGREEN.filter(
        (o) => o.fundOptionDCM == true
      );
      var educationInfraRED = educationInfraRED.filter(
        (o) => o.fundOptionDCM == true
      );
      var educationInfraAMBER = educationInfraAMBER.filter(
        (o) => o.fundOptionDCM == true
      );
      var educationInfraGREEN = educationInfraGREEN.filter(
        (o) => o.fundOptionDCM == true
      );
      var gasToCleanRED = gasToCleanRED.filter((o) => o.fundOptionDCM == true);
      var gasToCleanAMBER = gasToCleanAMBER.filter(
        (o) => o.fundOptionDCM == true
      );
      var gasToCleanGREEN = gasToCleanGREEN.filter(
        (o) => o.fundOptionDCM == true
      );
      var gasToPowerRED = gasToPowerRED.filter((o) => o.fundOptionDCM == true);
      var gasToPowerAMBER = gasToPowerAMBER.filter(
        (o) => o.fundOptionDCM == true
      );
      var gasToPowerGREEN = gasToPowerGREEN.filter(
        (o) => o.fundOptionDCM == true
      );
      var HealthcareRED = HealthcareRED.filter((o) => o.fundOptionDCM == true);
      var HealthcareAMBER = HealthcareAMBER.filter(
        (o) => o.fundOptionDCM == true
      );
      var HealthcareGREEN = HealthcareGREEN.filter(
        (o) => o.fundOptionDCM == true
      );
      var ICT_TelcomRED = ICT_TelcomRED.filter((o) => o.fundOptionDCM == true);
      var ICT_TelcomAMBER = ICT_TelcomAMBER.filter(
        (o) => o.fundOptionDCM == true
      );
      var ICT_TelcomGREEN = ICT_TelcomGREEN.filter(
        (o) => o.fundOptionDCM == true
      );
      var Infra_LogisticsRED = Infra_LogisticsRED.filter(
        (o) => o.fundOptionDCM == true
      );
      var Infra_LogisticsAMBER = Infra_LogisticsAMBER.filter(
        (o) => o.fundOptionDCM == true
      );
      var Infra_LogisticsGREEN = Infra_LogisticsGREEN.filter(
        (o) => o.fundOptionDCM == true
      );
      var inputsToInfraRED = inputsToInfraRED.filter(
        (o) => o.fundOptionDCM == true
      );
      var inputsToInfraAMBER = inputsToInfraAMBER.filter(
        (o) => o.fundOptionDCM == true
      );
      var inputsToInfraGREEN = inputsToInfraGREEN.filter(
        (o) => o.fundOptionDCM == true
      );
      var logisticsRED = logisticsRED.filter((o) => o.fundOptionDCM == true);
      var logisticsAMBER = logisticsAMBER.filter(
        (o) => o.fundOptionDCM == true
      );
      var logisticsGREEN = logisticsGREEN.filter(
        (o) => o.fundOptionDCM == true
      );
      var offGridPowerRED = offGridPowerRED.filter(
        (o) => o.fundOptionDCM == true
      );
      var offGridPowerAMBER = offGridPowerAMBER.filter(
        (o) => o.fundOptionDCM == true
      );
      var offGridPowerGREEN = offGridPowerGREEN.filter(
        (o) => o.fundOptionDCM == true
      );
      var onGridPowerRED = onGridPowerRED.filter(
        (o) => o.fundOptionDCM == true
      );
      var onGridPowerAMBER = onGridPowerAMBER.filter(
        (o) => o.fundOptionDCM == true
      );
      var onGridPowerGREEN = onGridPowerGREEN.filter(
        (o) => o.fundOptionDCM == true
      );
      var renewableEnergyRED = renewableEnergyRED.filter(
        (o) => o.fundOptionDCM == true
      );
      var renewableEnergyAMBER = renewableEnergyAMBER.filter(
        (o) => o.fundOptionDCM == true
      );
      var renewableEnergyGREEN = renewableEnergyGREEN.filter(
        (o) => o.fundOptionDCM == true
      );
      var transportationRED = transportationRED.filter(
        (o) => o.fundOptionDCM == true
      );
      var transportationAMBER = transportationAMBER.filter(
        (o) => o.fundOptionDCM == true
      );
      var transportationGREEN = transportationGREEN.filter(
        (o) => o.fundOptionDCM == true
      );
      var water_wasteRED = water_wasteRED.filter(
        (o) => o.fundOptionDCM == true
      );
      var water_wasteAMBER = water_wasteAMBER.filter(
        (o) => o.fundOptionDCM == true
      );
      var water_wasteGREEN = water_wasteGREEN.filter(
        (o) => o.fundOptionDCM == true
      );
    } else if (
      props.fundOption != "" &&
      props.fundOption &&
      props.fundOption == "PCB"
    ) {
      var afforableHousingRED = afforableHousingRED.filter(
        (o) => o.fundOptionPCB == true
      );
      var afforableHousingAMBER = afforableHousingAMBER.filter(
        (o) => o.fundOptionPCB == true
      );
      var afforableHousingGREEN = afforableHousingGREEN.filter(
        (o) => o.fundOptionPCB == true
      );
      var agricInfraRED = agricInfraRED.filter((o) => o.fundOptionPCB == true);
      var agricInfraAMBER = agricInfraAMBER.filter(
        (o) => o.fundOptionPCB == true
      );
      var agricInfraGREEN = agricInfraGREEN.filter(
        (o) => o.fundOptionPCB == true
      );
      var educationInfraRED = educationInfraRED.filter(
        (o) => o.fundOptionPCB == true
      );
      var educationInfraAMBER = educationInfraAMBER.filter(
        (o) => o.fundOptionPCB == true
      );
      var educationInfraGREEN = educationInfraGREEN.filter(
        (o) => o.fundOptionPCB == true
      );
      var gasToCleanRED = gasToCleanRED.filter((o) => o.fundOptionPCB == true);
      var gasToCleanAMBER = gasToCleanAMBER.filter(
        (o) => o.fundOptionPCB == true
      );
      var gasToCleanGREEN = gasToCleanGREEN.filter(
        (o) => o.fundOptionPCB == true
      );
      var gasToPowerRED = gasToPowerRED.filter((o) => o.fundOptionPCB == true);
      var gasToPowerAMBER = gasToPowerAMBER.filter(
        (o) => o.fundOptionPCB == true
      );
      var gasToPowerGREEN = gasToPowerGREEN.filter(
        (o) => o.fundOptionPCB == true
      );
      var HealthcareRED = HealthcareRED.filter((o) => o.fundOptionPCB == true);
      var HealthcareAMBER = HealthcareAMBER.filter(
        (o) => o.fundOptionPCB == true
      );
      var HealthcareGREEN = HealthcareGREEN.filter(
        (o) => o.fundOptionPCB == true
      );
      var ICT_TelcomRED = ICT_TelcomRED.filter((o) => o.fundOptionPCB == true);
      var ICT_TelcomAMBER = ICT_TelcomAMBER.filter(
        (o) => o.fundOptionPCB == true
      );
      var ICT_TelcomGREEN = ICT_TelcomGREEN.filter(
        (o) => o.fundOptionPCB == true
      );
      var Infra_LogisticsRED = Infra_LogisticsRED.filter(
        (o) => o.fundOptionPCB == true
      );
      var Infra_LogisticsAMBER = Infra_LogisticsAMBER.filter(
        (o) => o.fundOptionPCB == true
      );
      var Infra_LogisticsGREEN = Infra_LogisticsGREEN.filter(
        (o) => o.fundOptionPCB == true
      );
      var inputsToInfraRED = inputsToInfraRED.filter(
        (o) => o.fundOptionPCB == true
      );
      var inputsToInfraAMBER = inputsToInfraAMBER.filter(
        (o) => o.fundOptionPCB == true
      );
      var inputsToInfraGREEN = inputsToInfraGREEN.filter(
        (o) => o.fundOptionPCB == true
      );
      var logisticsRED = logisticsRED.filter((o) => o.fundOptionPCB == true);
      var logisticsAMBER = logisticsAMBER.filter(
        (o) => o.fundOptionPCB == true
      );
      var logisticsGREEN = logisticsGREEN.filter(
        (o) => o.fundOptionPCB == true
      );
      var offGridPowerRED = offGridPowerRED.filter(
        (o) => o.fundOptionPCB == true
      );
      var offGridPowerAMBER = offGridPowerAMBER.filter(
        (o) => o.fundOptionPCB == true
      );
      var offGridPowerGREEN = offGridPowerGREEN.filter(
        (o) => o.fundOptionPCB == true
      );
      var onGridPowerRED = onGridPowerRED.filter(
        (o) => o.fundOptionPCB == true
      );
      var onGridPowerAMBER = onGridPowerAMBER.filter(
        (o) => o.fundOptionPCB == true
      );
      var onGridPowerGREEN = onGridPowerGREEN.filter(
        (o) => o.fundOptionPCB == true
      );
      var renewableEnergyRED = renewableEnergyRED.filter(
        (o) => o.fundOptionPCB == true
      );
      var renewableEnergyAMBER = renewableEnergyAMBER.filter(
        (o) => o.fundOptionPCB == true
      );
      var renewableEnergyGREEN = renewableEnergyGREEN.filter(
        (o) => o.fundOptionPCB == true
      );
      var transportationRED = transportationRED.filter(
        (o) => o.fundOptionPCB == true
      );
      var transportationAMBER = transportationAMBER.filter(
        (o) => o.fundOptionPCB == true
      );
      var transportationGREEN = transportationGREEN.filter(
        (o) => o.fundOptionPCB == true
      );
      var water_wasteRED = water_wasteRED.filter(
        (o) => o.fundOptionPCB == true
      );
      var water_wasteAMBER = water_wasteAMBER.filter(
        (o) => o.fundOptionPCB == true
      );
      var water_wasteGREEN = water_wasteGREEN.filter(
        (o) => o.fundOptionPCB == true
      );
    }
    numofAffordableHousingRED.value = afforableHousingRED.length;
    numofAffordableHousingAMBER.value = afforableHousingAMBER.length;
    numofAffordableHousingGREEN.value = afforableHousingGREEN.length;
    numofagricInfraRED.value = agricInfraRED.length;
    numofagricInfraAMBER.value = agricInfraAMBER.length;
    numofagricInfraGREEN.value = agricInfraGREEN.length;
    numofeducationInfraRED.value = educationInfraRED.length;
    numofeducationInfraAMBER.value = educationInfraAMBER.length;
    numofeducationInfraGREEN.value = educationInfraGREEN.length;
    numofgasToCleanRED.value = gasToCleanRED.length;
    numofgasToCleanGREEN.value = gasToCleanGREEN.length;
    numofgasToCleanAMBER.value = gasToCleanAMBER.length;
    numofgasToPowerRED.value = gasToPowerRED.length;
    numofgasToPowerAMBER.value = gasToPowerAMBER.length;
    numofgasToPowerGREEN.value = gasToPowerGREEN.length;
    numofHealthcareRED.value = HealthcareRED.length;
    numofHealthcareAMBER.value = HealthcareAMBER.length;
    numofHealthcareGREEN.value = HealthcareGREEN.length;
    numofICT_TelcomRED.value = ICT_TelcomRED.length;
    numofICT_TelcomAMBER.value = ICT_TelcomAMBER.length;
    numofICT_TelcomGREEN.value = ICT_TelcomGREEN.length;
    numofInfra_LogisticsRED.value = Infra_LogisticsRED.length;
    numofInfra_LogisticsAMBER.value = Infra_LogisticsAMBER.length;
    numofInfra_LogisticsGREEN.value = Infra_LogisticsGREEN.length;
    numofinputsToInfraRED.value = inputsToInfraRED.length;
    numofinputsToInfraAMBER.value = inputsToInfraAMBER.length;
    numofinputsToInfraGREEN.value = inputsToInfraGREEN.length;
    numoflogisticsRED.value = logisticsRED.length;
    numoflogisticsAMBER.value = logisticsAMBER.length;
    numoflogisticsGREEN.value = logisticsGREEN.length;
    numofoffGridPowerRED.value = offGridPowerRED.length;
    numofoffGridPowerAMBER.value = offGridPowerAMBER.length;
    numofoffGridPowerGREEN.value = offGridPowerGREEN.length;
    numofonGridPowerRED.value = onGridPowerRED.length;
    numofonGridPowerAMBER.value = onGridPowerAMBER.length;
    numofonGridPowerGREEN.value = onGridPowerGREEN.length;
    numofrenewableEnergyRED.value = renewableEnergyRED.length;
    numofrenewableEnergyAMBER.value = renewableEnergyAMBER.length;
    numofrenewableEnergyGREEN.value = renewableEnergyGREEN.length;
    numoftransportationRED.value = transportationRED.length;
    numoftransportationAMBER.value = transportationAMBER.length;
    numoftransportationGREEN.value = transportationGREEN.length;
    numofwater_wasteRED.value = water_wasteRED.length;
    numofwater_wasteAMBER.value = water_wasteAMBER.length;
    numofwater_wasteGREEN.value = water_wasteGREEN.length;

    let AffordableHousing =
      numofAffordableHousingRED.value +
      numofAffordableHousingAMBER.value +
      numofAffordableHousingGREEN.value;
    let agricInfra =
      numofagricInfraRED.value +
      numofagricInfraAMBER.value +
      numofagricInfraGREEN.value;
    let educationInfra =
      numofeducationInfraRED.value +
      numofeducationInfraAMBER.value +
      numofeducationInfraGREEN.value;
    let gasToClean =
      numofgasToCleanRED.value +
      numofgasToCleanAMBER.value +
      numofgasToCleanGREEN.value;
    let gasToPower =
      numofgasToPowerRED.value +
      numofgasToPowerAMBER.value +
      numofgasToPowerGREEN.value;
    let Healthcare =
      numofHealthcareRED.value +
      numofHealthcareAMBER.value +
      numofHealthcareGREEN.value;
    let ICT_Telcom =
      numofICT_TelcomRED.value +
      numofICT_TelcomAMBER.value +
      numofICT_TelcomGREEN.value;
    let Infra_Logistics =
      numofInfra_LogisticsRED.value +
      numofInfra_LogisticsAMBER.value +
      numofInfra_LogisticsGREEN.value;
    let inputsToInfra =
      numofinputsToInfraRED.value +
      numofinputsToInfraAMBER.value +
      numofinputsToInfraGREEN.value;
    let logistics =
      numoflogisticsRED.value +
      numoflogisticsAMBER.value +
      numoflogisticsGREEN.value;
    let offGridPower =
      numofoffGridPowerRED.value +
      numofoffGridPowerAMBER.value +
      numofoffGridPowerGREEN.value;
    let onGridPower =
      numofonGridPowerRED.value +
      numofonGridPowerAMBER.value +
      numofonGridPowerGREEN.value;
    let renewableEnergy =
      numofrenewableEnergyRED.value +
      numofrenewableEnergyAMBER.value +
      numofrenewableEnergyGREEN.value;
    let transportation =
      numoftransportationRED.value +
      numoftransportationAMBER.value +
      numoftransportationGREEN.value;
    let water_waste =
      numofwater_wasteRED.value +
      numofwater_wasteAMBER.value +
      numofwater_wasteGREEN.value;

    let isAffordableHousing = null;
    let isagricInfra = null;
    let iseducationInfra = null;
    let isgasToClean = null;
    let isgasToPower = null;
    let isHealthcare = null;
    let isICT_Telcom = null;
    let isInfra_Logistics = null;
    let isinputsToInfra = null;
    let islogistics = null;
    let isoffGridPower = null;
    let isonGridPower = null;
    let isrenewableEnergy = null;
    let istransportation = null;
    let iswater_waste = null;

    if (AffordableHousing > 0) {
      isAffordableHousing = 1;
    }
    if (agricInfra > 0) {
      isagricInfra = 1;
    }
    if (educationInfra > 0) {
      iseducationInfra = 1;
    }
    if (gasToClean > 0) {
      isgasToClean = 1;
    }
    if (gasToPower > 0) {
      isgasToPower = 1;
    }
    if (Healthcare > 0) {
      isHealthcare = 1;
    }
    if (ICT_Telcom > 0) {
      isICT_Telcom = 1;
    }
    if (Infra_Logistics > 0) {
      isInfra_Logistics = 1;
    }
    if (inputsToInfra > 0) {
      isinputsToInfra = 1;
    }
    if (logistics > 0) {
      islogistics = 1;
    }
    if (offGridPower > 0) {
      isoffGridPower = 1;
    }
    if (onGridPower > 0) {
      isonGridPower = 1;
    }
    if (renewableEnergy > 0) {
      isrenewableEnergy = 1;
    }
    if (transportation > 0) {
      istransportation = 1;
    }
    if (water_waste > 0) {
      iswater_waste = 1;
    }
    numofTotalIndustries.value =
      isAffordableHousing +
      isagricInfra +
      iseducationInfra +
      isgasToClean +
      isgasToPower +
      isHealthcare +
      isICT_Telcom +
      isInfra_Logistics +
      isinputsToInfra +
      islogistics +
      isoffGridPower +
      isonGridPower +
      isrenewableEnergy +
      istransportation +
      iswater_waste;

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
    AffordableHousingTotalRED.value = cartPricesArrayString.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    AffordableHousingTotalAMBER.value = cartPricesArrayString2.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    AffordableHousingTotalGREEN.value = cartPricesArrayString3.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    agricInfraTotalRED.value = cartPricesArrayString4.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    agricInfraTotalAMBER.value = cartPricesArrayString5.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    agricInfraTotalGREEN.value = cartPricesArrayString6.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    educationInfraTotalRED.value = cartPricesArrayString7.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    educationInfraTotalAMBER.value = cartPricesArrayString8.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    educationInfraTotalGREEN.value = cartPricesArrayString9.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    gasToCleanTotalRED.value = cartPricesArrayString10.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    gasToCleanTotalAMBER.value = cartPricesArrayString11.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    gasToCleanTotalGREEN.value = cartPricesArrayString12.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    gasToPowerTotalRED.value = cartPricesArrayString13.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    gasToPowerTotalAMBER.value = cartPricesArrayString14.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    gasToPowerTotalGREEN.value = cartPricesArrayString15.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    HealthcareTotalRED.value = cartPricesArrayString16.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    HealthcareTotalAMBER.value = cartPricesArrayString17.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    HealthcareTotalGREEN.value = cartPricesArrayString18.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    ICT_TelcomTotalRED.value = cartPricesArrayString19.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    ICT_TelcomTotalAMBER.value = cartPricesArrayString20.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    ICT_TelcomTotalGREEN.value = cartPricesArrayString21.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    Infra_LogisticsTotalRED.value = cartPricesArrayString22.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    Infra_LogisticsTotalAMBER.value = cartPricesArrayString23.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    Infra_LogisticsTotalGREEN.value = cartPricesArrayString24.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    inputsToInfraTotalRED.value = cartPricesArrayString25.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    inputsToInfraTotalAMBER.value = cartPricesArrayString26.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    inputsToInfraTotalGREEN.value = cartPricesArrayString27.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    logisticsTotalRED.value = cartPricesArrayString28.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    logisticsTotalAMBER.value = cartPricesArrayString29.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    logisticsTotalGREEN.value = cartPricesArrayString30.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    offGridPowerTotalRED.value = cartPricesArrayString31.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    offGridPowerTotalAMBER.value = cartPricesArrayString32.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    offGridPowerTotalGREEN.value = cartPricesArrayString33.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    onGridPowerTotalRED.value = cartPricesArrayString34.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    onGridPowerTotalAMBER.value = cartPricesArrayString35.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    onGridPowerTotalGREEN.value = cartPricesArrayString36.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    renewableEnergyTotalRED.value = cartPricesArrayString37.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    renewableEnergyTotalAMBER.value = cartPricesArrayString38.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    renewableEnergyTotalGREEN.value = cartPricesArrayString39.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    transportationTotalRED.value = cartPricesArrayString40.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    transportationTotalAMBER.value = cartPricesArrayString41.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    transportationTotalGREEN.value = cartPricesArrayString42.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    water_wasteTotalRED.value = cartPricesArrayString43.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    water_wasteTotalAMBER.value = cartPricesArrayString44.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    water_wasteTotalGREEN.value = cartPricesArrayString45.reduce(
      (partialSum, a) => partialSum + a,
      0
    );

    return (dealStats5.value = {
      labels: [
        "Afforable Housing",
        "Agric. Infra",
        "Education Infra",
        "GasClean",
        "GasPower",
        "Healthcare",
        "ICT/Telecoms",
        "Infra Logistics",
        "Input to Infra",
        "Logistics",
        "Off Grid Power",
        "on Grid Power",
        "Renewable Energy",
        "Transport",
        "Water/Waste",
      ],
      datasets: [
        {
          label: "Red",
          backgroundColor: "#D12134",
          data: [
            AffordableHousingTotalRED.value,
            agricInfraTotalRED.value,
            educationInfraTotalRED.value,
            gasToCleanTotalRED.value,
            gasToPowerTotalRED.value,
            HealthcareTotalRED.value,
            ICT_TelcomTotalRED.value,
            Infra_LogisticsTotalRED.value,
            inputsToInfraTotalRED.value,
            logisticsTotalRED.value,
            offGridPowerTotalRED.value,
            onGridPowerTotalRED.value,
            renewableEnergyTotalRED.value,
            transportationTotalRED.value,
            water_wasteTotalRED.value,
          ],
        },
        {
          label: "Amber",
          backgroundColor: "#DB8A00",
          data: [
            AffordableHousingTotalAMBER.value,
            agricInfraTotalAMBER.value,
            educationInfraTotalAMBER.value,
            gasToCleanTotalAMBER.value,
            gasToPowerTotalAMBER.value,
            HealthcareTotalAMBER.value,
            ICT_TelcomTotalAMBER.value,
            Infra_LogisticsTotalAMBER.value,
            inputsToInfraTotalAMBER.value,
            logisticsTotalAMBER.value,
            offGridPowerTotalAMBER.value,
            onGridPowerTotalAMBER.value,
            renewableEnergyTotalAMBER.value,
            transportationTotalAMBER.value,
            water_wasteTotalAMBER.value,
          ],
        },
        {
          label: "Green",
          backgroundColor: "#298729",
          data: [
            AffordableHousingTotalGREEN.value,
            agricInfraTotalGREEN.value,
            educationInfraTotalGREEN.value,
            gasToCleanTotalGREEN.value,
            gasToPowerTotalGREEN.value,
            HealthcareTotalGREEN.value,
            ICT_TelcomTotalGREEN.value,
            Infra_LogisticsTotalGREEN.value,
            inputsToInfraTotalGREEN.value,
            logisticsTotalGREEN.value,
            offGridPowerTotalGREEN.value,
            onGridPowerTotalGREEN.value,
            renewableEnergyTotalGREEN.value,
            transportationTotalGREEN.value,
            water_wasteTotalGREEN.value,
          ],
        },
      ],
    });
  }
});
const computedTileDataProducts = computed(() => {
  if (props.data != null && props.data.length != 0) {
    let allDeals = props.data;
    allDeals = allDeals.filter(
      (o) =>
        new Date(o.financialYearName.slice(2)).getFullYear() <=
        new Date(stores.financialYear.slice(2)).getFullYear() &&
        o.dealStatus == true
    );
    // var AnnuityPPP = allDeals.filter(o => o.productDescription == 'Annuity PPP' && o.dealCategory != 'CLOSED' && new Date(o.mandateLetterDate).getFullYear() == stores.financialYear.slice(2, 6) || o.productDescription == 'Annuity PPP' && o.dealCategory != 'CLOSED'  && new Date(o.creditApprovalDate).getFullYear() == stores.financialYear.slice(2, 6)|| o.productDescription == 'Annuity PPP' && o.dealCategory != 'CLOSED' && new Date(o.actualCloseDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var blendedFinance = allDeals.filter(o => o.productDescription == 'Blended Finance' && o.dealCategory != 'CLOSED' && new Date(o.mandateLetterDate).getFullYear() == stores.financialYear.slice(2, 6) || o.productDescription == 'Blended Finance' && o.dealCategory != 'CLOSED'  && new Date(o.creditApprovalDate).getFullYear() == stores.financialYear.slice(2, 6)|| o.productDescription == 'Blended Finance' && o.dealCategory != 'CLOSED' && new Date(o.actualCloseDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var contingentRefinancing = allDeals.filter(o => o.productDescription == 'Contingent Refinancing' && o.dealCategory != 'CLOSED' && new Date(o.mandateLetterDate).getFullYear() == stores.financialYear.slice(2, 6) || o.productDescription == 'Contingent Refinancing' && o.dealCategory != 'CLOSED'  && new Date(o.creditApprovalDate).getFullYear() == stores.financialYear.slice(2, 6)|| o.productDescription == 'Contingent Refinancing' && o.dealCategory != 'CLOSED' && new Date(o.actualCloseDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var privateBond_Others = allDeals.filter(o => o.productDescription == 'Private Bond (Others)' && o.dealCategory != 'CLOSED' && new Date(o.mandateLetterDate).getFullYear() == stores.financialYear.slice(2, 6) || o.productDescription == 'Private Bond (Others)' && o.dealCategory != 'CLOSED'  && new Date(o.creditApprovalDate).getFullYear() == stores.financialYear.slice(2, 6)|| o.productDescription == 'Private Bond (Others)' && o.dealCategory != 'CLOSED' && new Date(o.actualCloseDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var privateBond_CleanEnergy = allDeals.filter(o => o.productDescription == 'Private Bond(Clean Energy)' && o.dealCategory != 'CLOSED' && new Date(o.mandateLetterDate).getFullYear() == stores.financialYear.slice(2, 6) || o.productDescription == 'Private Bond(Clean Energy)' && o.dealCategory != 'CLOSED'  && new Date(o.creditApprovalDate).getFullYear() == stores.financialYear.slice(2, 6)|| o.productDescription == 'Private Bond(Clean Energy)' && o.dealCategory != 'CLOSED' && new Date(o.actualCloseDate).getFullYear() == stores.financialYear.slice(2, 6))
    // var publicBond = allDeals.filter(o => o.productDescription == 'Public Bond' && o.dealCategory != 'CLOSED' && new Date(o.mandateLetterDate).getFullYear() == stores.financialYear.slice(2, 6) || o.productDescription == 'Public Bond' && o.dealCategory != 'CLOSED'  && new Date(o.creditApprovalDate).getFullYear() == stores.financialYear.slice(2, 6)|| o.productDescription == 'Public Bond' && o.dealCategory != 'CLOSED' && new Date(o.actualCloseDate).getFullYear() == stores.financialYear.slice(2, 6))

    var AnnuityPPP = allDeals.filter(
      (o) =>
        (o.productDescription == "Annuity PPP" && o.dealCategory != "CLOSED") ||
        (o.productDescription == "Annuity PPP" && o.dealCategory != "CLOSED") ||
        (o.productDescription == "Annuity PPP" && o.dealCategory != "CLOSED")
    );
    var blendedFinance = allDeals.filter(
      (o) =>
        (o.productDescription == "Blended Finance" &&
          o.dealCategory != "CLOSED") ||
        (o.productDescription == "Blended Finance" &&
          o.dealCategory != "CLOSED") ||
        (o.productDescription == "Blended Finance" &&
          o.dealCategory != "CLOSED")
    );
    var contingentRefinancing = allDeals.filter(
      (o) =>
        (o.productDescription == "Contingent Refinancing" &&
          o.dealCategory != "CLOSED") ||
        (o.productDescription == "Contingent Refinancing" &&
          o.dealCategory != "CLOSED") ||
        (o.productDescription == "Contingent Refinancing" &&
          o.dealCategory != "CLOSED")
    );
    var privateBond_Others = allDeals.filter(
      (o) =>
        (o.productDescription == "Private Bond (Others)" &&
          o.dealCategory != "CLOSED") ||
        (o.productDescription == "Private Bond (Others)" &&
          o.dealCategory != "CLOSED") ||
        (o.productDescription == "Private Bond (Others)" &&
          o.dealCategory != "CLOSED")
    );
    var privateBond_CleanEnergy = allDeals.filter(
      (o) =>
        (o.productDescription == "Private Bond(Clean Energy)" &&
          o.dealCategory != "CLOSED") ||
        (o.productDescription == "Private Bond(Clean Energy)" &&
          o.dealCategory != "CLOSED") ||
        (o.productDescription == "Private Bond(Clean Energy)" &&
          o.dealCategory != "CLOSED")
    );
    var publicBond = allDeals.filter(
      (o) =>
        (o.productDescription == "Public Bond" && o.dealCategory != "CLOSED") ||
        (o.productDescription == "Public Bond" && o.dealCategory != "CLOSED") ||
        (o.productDescription == "Public Bond" && o.dealCategory != "CLOSED")
    );

    if (
      props.fundOption != "" &&
      props.fundOption &&
      props.fundOption == "BOI"
    ) {
      var AnnuityPPP = AnnuityPPP.filter((o) => o.fundOptionBOI == true);
      var blendedFinance = blendedFinance.filter(
        (o) => o.fundOptionBOI == true
      );
      var contingentRefinancing = contingentRefinancing.filter(
        (o) => o.fundOptionBOI == true
      );
      var privateBond_Others = privateBond_Others.filter(
        (o) => o.fundOptionBOI == true
      );
      var privateBond_CleanEnergy = privateBond_CleanEnergy.filter(
        (o) => o.fundOptionBOI == true
      );
      var publicBond = publicBond.filter((o) => o.fundOptionBOI == true);
    } else if (
      props.fundOption != "" &&
      props.fundOption &&
      props.fundOption == "DCM"
    ) {
      var AnnuityPPP = AnnuityPPP.filter((o) => o.fundOptionDCM == true);
      var blendedFinance = blendedFinance.filter(
        (o) => o.fundOptionDCM == true
      );
      var contingentRefinancing = contingentRefinancing.filter(
        (o) => o.fundOptionDCM == true
      );
      var privateBond_Others = privateBond_Others.filter(
        (o) => o.fundOptionDCM == true
      );
      var privateBond_CleanEnergy = privateBond_CleanEnergy.filter(
        (o) => o.fundOptionDCM == true
      );
      var publicBond = publicBond.filter((o) => o.fundOptionDCM == true);
    } else if (
      props.fundOption != "" &&
      props.fundOption &&
      props.fundOption == "PCB"
    ) {
      var AnnuityPPP = AnnuityPPP.filter((o) => o.fundOptionPCB == true);
      var blendedFinance = blendedFinance.filter(
        (o) => o.fundOptionPCB == true
      );
      var contingentRefinancing = contingentRefinancing.filter(
        (o) => o.fundOptionPCB == true
      );
      var privateBond_Others = privateBond_Others.filter(
        (o) => o.fundOptionPCB == true
      );
      var privateBond_CleanEnergy = privateBond_CleanEnergy.filter(
        (o) => o.fundOptionPCB == true
      );
      var publicBond = publicBond.filter((o) => o.fundOptionPCB == true);
    }
    numofAnnuityPPP.value = AnnuityPPP.length;
    numofpublicBond.value = publicBond.length;
    numofblendedFinance.value = blendedFinance.length;
    numofcontingentRefinancing.value = contingentRefinancing.length;
    numofprivateBond_Others.value = privateBond_Others.length;
    numofprivateBond_CleanEnergy.value = privateBond_CleanEnergy.length;
    let isAnnuityPPP = null;
    let ispublicBond = null;
    let isblendedFinance = null;
    let iscontingentRefinancing = null;
    let isprivateBond_Others = null;
    let isprivateBond_CleanEnergy = null;

    if (numofAnnuityPPP.value > 0) {
      isAnnuityPPP = 1;
    }
    if (numofpublicBond.value > 0) {
      ispublicBond = 1;
    }
    if (numofblendedFinance.value > 0) {
      isblendedFinance = 1;
    }
    if (numofcontingentRefinancing.value > 0) {
      iscontingentRefinancing = 1;
    }
    if (numofprivateBond_Others.value > 0) {
      isprivateBond_Others = 1;
    }
    if (numofprivateBond_CleanEnergy.value > 0) {
      isprivateBond_CleanEnergy = 1;
    }

    numofTotalProducts.value =
      isAnnuityPPP +
      ispublicBond +
      isblendedFinance +
      iscontingentRefinancing +
      isprivateBond_Others +
      isprivateBond_CleanEnergy;

    // numofTotalProducts.value = numofAnnuityPPP.value + numofpublicBond.value + numofblendedFinance.value + numofcontingentRefinancing.value + numofprivateBond_Others.value + numofprivateBond_CleanEnergy.value

    const cartPricesArrayString = AnnuityPPP.map(function (item) {
      return item.dealSize;
    });
    const cartPricesArrayString2 = publicBond.map(function (item) {
      return item.dealSize;
    });
    const cartPricesArrayString3 = blendedFinance.map(function (item) {
      return item.dealSize;
    });
    const cartPricesArrayString4 = contingentRefinancing.map(function (item) {
      return item.dealSize;
    });
    const cartPricesArrayString5 = privateBond_Others.map(function (item) {
      return item.dealSize;
    });
    const cartPricesArrayString6 = privateBond_CleanEnergy.map(function (item) {
      return item.dealSize;
    });
    AnnuityPPPTotalDealSize.value = cartPricesArrayString.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    publicBondTotalDealSize.value = cartPricesArrayString2.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    blendedFinanceTotalDealSize.value = cartPricesArrayString3.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    contingentRefinancingTotalDealSize.value = cartPricesArrayString4.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    privateBond_OthersTotalDealSize.value = cartPricesArrayString5.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    privateBond_CleanEnergyTotalDealSize.value = cartPricesArrayString6.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    TotalProductSize.value =
      AnnuityPPPTotalDealSize.value +
      publicBondTotalDealSize.value +
      blendedFinanceTotalDealSize.value +
      contingentRefinancingTotalDealSize.value +
      privateBond_OthersTotalDealSize.value +
      privateBond_CleanEnergyTotalDealSize.value;

    AnnuityPPPPercentageDealSize.value = (
      (AnnuityPPPTotalDealSize.value / TotalDealSize.value) *
      100
    ).toFixed(0);
    publicBondPercentageDealSize.value = (
      (publicBondTotalDealSize.value / TotalDealSize.value) *
      100
    ).toFixed(0);
    blendedFinancePercentageDealSize.value = (
      (blendedFinanceTotalDealSize.value / TotalDealSize.value) *
      100
    ).toFixed(0);
    contingentRefinancingPercentageDealSize.value = (
      (contingentRefinancingTotalDealSize.value / TotalDealSize.value) *
      100
    ).toFixed(0);
    privateBond_OthersPercentageDealSize.value = (
      (privateBond_OthersTotalDealSize.value / TotalDealSize.value) *
      100
    ).toFixed(0);
    privateBond_CleanEnergyPercentageDealSize.value = (
      (privateBond_CleanEnergyTotalDealSize.value / TotalDealSize.value) *
      100
    ).toFixed(0);
    return (dealStats4.value = [
      {
        title: "Annuity PPP",
        number: numofAnnuityPPP.value,
        amount: parseFloat(AnnuityPPPTotalDealSize.value).toFixed(2),
        percentage: `${AnnuityPPPPercentageDealSize.value}`,
      },
      {
        title: "Public Bond",
        number: numofpublicBond.value,
        amount: parseFloat(publicBondTotalDealSize.value).toFixed(3),
        percentage: `${publicBondPercentageDealSize.value}`,
      },
      {
        title: "Blended Finance",
        number: numofblendedFinance.value,
        amount: parseFloat(blendedFinanceTotalDealSize.value).toFixed(3),
        percentage: `${blendedFinancePercentageDealSize.value}`,
      },
      {
        title: "Contingent Refinancing",
        number: numofcontingentRefinancing.value,
        amount: parseFloat(contingentRefinancingTotalDealSize.value).toFixed(3),
        percentage: `${contingentRefinancingPercentageDealSize.value}`,
      },
      {
        title: "Private Bond (Others)",
        number: numofprivateBond_Others.value,
        amount: parseFloat(privateBond_OthersTotalDealSize.value).toFixed(3),
        percentage: `${privateBond_OthersPercentageDealSize.value}`,
      },
      {
        title: "Private Bond(Clean Energy)",
        number: numofprivateBond_CleanEnergy.value,
        amount: parseFloat(privateBond_CleanEnergyTotalDealSize.value).toFixed(
          3
        ),
        percentage: `${privateBond_CleanEnergyPercentageDealSize.value}`,
      },
    ]);
  }
});

const computedTileData = computed(() => {
  if (props.data != null && props.data.length != 0) {
    let allDeals = props.data;
    allDeals = allDeals.filter(
      (o) =>
        new Date(o.financialYearName.slice(2)).getFullYear() <=
        new Date(stores.financialYear.slice(2)).getFullYear() &&
        o.dealStatus == true
    );

    var redActual = allDeals.filter(
      (o) =>
        o.dealCategory == "RED" &&
        new Date(o.mandateLetterDate).getFullYear() ==
        stores.financialYear.slice(2, 6)
    );
    var amberActual = allDeals.filter(
      (o) =>
        o.dealCategory == "AMBER" &&
        new Date(o.creditApprovalDate).getFullYear() ==
        stores.financialYear.slice(2, 6)
    );
    var greenActual = allDeals.filter(
      (o) =>
        o.dealCategory == "GREEN" &&
        new Date(o.feeLetterDate).getFullYear() ==
        stores.financialYear.slice(2, 6)
    );
    var closedActual = allDeals.filter(
      (o) =>
        o.dealCategory == "CLOSED" &&
        new Date(o.actualCloseDate).getFullYear() ==
        stores.financialYear.slice(2, 6)
    );

    var red = allDeals.filter((o) => o.dealCategory == "RED");
    var amber = allDeals.filter((o) => o.dealCategory == "AMBER");
    var green = allDeals.filter((o) => o.dealCategory == "GREEN");
    var closed = allDeals.filter((o) => o.dealCategory == "CLOSED");

    if (
      props.fundOption != "" &&
      props.fundOption &&
      props.fundOption == "BOI"
    ) {
      red = red.filter((o) => o.fundOptionBOI == true);
      amber = amber.filter((o) => o.fundOptionBOI == true);
      green = green.filter((o) => o.fundOptionBOI == true);
      closed = closed.filter((o) => o.fundOptionBOI == true);

      redActual = redActual.filter((o) => o.fundOptionBOI == true);
      amberActual = amberActual.filter((o) => o.fundOptionBOI == true);
      greenActual = greenActual.filter((o) => o.fundOptionBOI == true);
      closedActual = closedActual.filter((o) => o.fundOptionBOI == true);
    } else if (
      props.fundOption != "" &&
      props.fundOption &&
      props.fundOption == "DCM"
    ) {
      red = red.filter((o) => o.fundOptionDCM == true);
      amber = amber.filter((o) => o.fundOptionDCM == true);
      green = green.filter((o) => o.fundOptionDCM == true);
      closed = closed.filter((o) => o.fundOptionDCM == true);

      redActual = redActual.filter((o) => o.fundOptionDCM == true);
      amberActual = amberActual.filter((o) => o.fundOptionDCM == true);
      greenActual = greenActual.filter((o) => o.fundOptionDCM == true);
      closedActual = closedActual.filter((o) => o.fundOptionDCM == true);
    } else if (
      props.fundOption != "" &&
      props.fundOption &&
      props.fundOption == "PCB"
    ) {
      red = red.filter((o) => o.fundOptionPCB == true);
      amber = amber.filter((o) => o.fundOptionPCB == true);
      green = green.filter((o) => o.fundOptionPCB == true);
      closed = closed.filter((o) => o.fundOptionPCB == true);

      redActual = redActual.filter((o) => o.fundOptionPCB == true);
      amberActual = amberActual.filter((o) => o.fundOptionPCB == true);
      greenActual = greenActual.filter((o) => o.fundOptionPCB == true);
      closedActual = closedActual.filter((o) => o.fundOptionPCB == true);
    }

    numofRed.value = red.length;
    numofAmber.value = amber.length;
    numofGreen.value = green.length;
    var closedlength = closedActual.length;

    numofTotal.value = numofRed.value + numofAmber.value + numofGreen.value;
    const cartPricesArray = red.map(
      ({
        dealId,
        leadId,
        companyId,
        companyDescription,
        originator,
        leadTransactor,
        coTransactor,
        transactorLegal,
        administrator,
        createdBy,
        lastModifiedBy,
        createdDate,
        lastModifiedDate,
        recordOwner,
        transactionPhase,
        transactionDescription,
        industryId,
        productId,
        regionCode,
        amountInMN,
        couponPercent,
        tenorInYrs,
        moratoriumInYrs,
        repaymentFrequency,
        amortisationStyle,
        mandateLetterDate,
        creditApprovalDate,
        feeLetterDate,
        expectedCloseDate,
        actualCloseDate,
        nbcApprovalDate,
        nbcSubmissionDate,
        ccSubmissionDate,
        advanceInMN,
        advancePercent,
        finalPercent,
        guaranteePercent,
        monitoringInMN,
        reimbursableInMNcount,
        ...rest
      }) => ({ ...rest })
    );
    const cartPricesArrayString = cartPricesArray.map(function (item) {
      return item.dealSize;
    });
    const cartPricesArray2 = amber.map(
      ({
        dealId,
        leadId,
        companyId,
        companyDescription,
        originator,
        leadTransactor,
        coTransactor,
        transactorLegal,
        administrator,
        createdBy,
        lastModifiedBy,
        createdDate,
        lastModifiedDate,
        recordOwner,
        transactionPhase,
        transactionDescription,
        industryId,
        productId,
        regionCode,
        amountInMN,
        couponPercent,
        tenorInYrs,
        moratoriumInYrs,
        repaymentFrequency,
        amortisationStyle,
        mandateLetterDate,
        creditApprovalDate,
        feeLetterDate,
        expectedCloseDate,
        actualCloseDate,
        nbcApprovalDate,
        nbcSubmissionDate,
        ccSubmissionDate,
        advanceInMN,
        advancePercent,
        finalPercent,
        guaranteePercent,
        monitoringInMN,
        reimbursableInMNcount,
        ...rest
      }) => ({ ...rest })
    );
    const cartPricesArrayString2 = cartPricesArray2.map(function (item) {
      return item.dealSize;
    });
    const cartPricesArray3 = green.map(
      ({
        dealId,
        leadId,
        companyId,
        companyDescription,
        originator,
        leadTransactor,
        coTransactor,
        transactorLegal,
        administrator,
        createdBy,
        lastModifiedBy,
        createdDate,
        lastModifiedDate,
        recordOwner,
        transactionPhase,
        transactionDescription,
        industryId,
        productId,
        regionCode,
        amountInMN,
        couponPercent,
        tenorInYrs,
        moratoriumInYrs,
        repaymentFrequency,
        amortisationStyle,
        mandateLetterDate,
        creditApprovalDate,
        feeLetterDate,
        expectedCloseDate,
        actualCloseDate,
        nbcApprovalDate,
        nbcSubmissionDate,
        ccSubmissionDate,
        advanceInMN,
        advancePercent,
        finalPercent,
        guaranteePercent,
        monitoringInMN,
        reimbursableInMNcount,
        ...rest
      }) => ({ ...rest })
    );
    const cartPricesArrayString3 = cartPricesArray3.map(function (item) {
      return item.dealSize;
    });

    const cartPricesArray_ = redActual.map(
      ({
        dealId,
        leadId,
        companyId,
        companyDescription,
        originator,
        leadTransactor,
        coTransactor,
        transactorLegal,
        administrator,
        createdBy,
        lastModifiedBy,
        createdDate,
        lastModifiedDate,
        recordOwner,
        transactionPhase,
        transactionDescription,
        industryId,
        productId,
        regionCode,
        amountInMN,
        couponPercent,
        tenorInYrs,
        moratoriumInYrs,
        repaymentFrequency,
        amortisationStyle,
        mandateLetterDate,
        creditApprovalDate,
        feeLetterDate,
        expectedCloseDate,
        actualCloseDate,
        nbcApprovalDate,
        nbcSubmissionDate,
        ccSubmissionDate,
        advanceInMN,
        advancePercent,
        finalPercent,
        guaranteePercent,
        monitoringInMN,
        reimbursableInMNcount,
        ...rest
      }) => ({ ...rest })
    );
    const cartPricesArrayString_ = cartPricesArray_.map(function (item) {
      return item.dealSize;
    });
    const cartPricesArray2_ = amberActual.map(
      ({
        dealId,
        leadId,
        companyId,
        companyDescription,
        originator,
        leadTransactor,
        coTransactor,
        transactorLegal,
        administrator,
        createdBy,
        lastModifiedBy,
        createdDate,
        lastModifiedDate,
        recordOwner,
        transactionPhase,
        transactionDescription,
        industryId,
        productId,
        regionCode,
        amountInMN,
        couponPercent,
        tenorInYrs,
        moratoriumInYrs,
        repaymentFrequency,
        amortisationStyle,
        mandateLetterDate,
        creditApprovalDate,
        feeLetterDate,
        expectedCloseDate,
        actualCloseDate,
        nbcApprovalDate,
        nbcSubmissionDate,
        ccSubmissionDate,
        advanceInMN,
        advancePercent,
        finalPercent,
        guaranteePercent,
        monitoringInMN,
        reimbursableInMNcount,
        ...rest
      }) => ({ ...rest })
    );
    const cartPricesArrayString2_ = cartPricesArray2_.map(function (item) {
      return item.dealSize;
    });
    const cartPricesArray3_ = greenActual.map(
      ({
        dealId,
        leadId,
        companyId,
        companyDescription,
        originator,
        leadTransactor,
        coTransactor,
        transactorLegal,
        administrator,
        createdBy,
        lastModifiedBy,
        createdDate,
        lastModifiedDate,
        recordOwner,
        transactionPhase,
        transactionDescription,
        industryId,
        productId,
        regionCode,
        amountInMN,
        couponPercent,
        tenorInYrs,
        moratoriumInYrs,
        repaymentFrequency,
        amortisationStyle,
        mandateLetterDate,
        creditApprovalDate,
        feeLetterDate,
        expectedCloseDate,
        actualCloseDate,
        nbcApprovalDate,
        nbcSubmissionDate,
        ccSubmissionDate,
        advanceInMN,
        advancePercent,
        finalPercent,
        guaranteePercent,
        monitoringInMN,
        reimbursableInMNcount,
        ...rest
      }) => ({ ...rest })
    );
    const cartPricesArrayString3_ = cartPricesArray3_.map(function (item) {
      return item.dealSize;
    });

    const cartPricesArray4 = closed.map(
      ({
        dealId,
        leadId,
        companyId,
        companyDescription,
        originator,
        leadTransactor,
        coTransactor,
        transactorLegal,
        administrator,
        createdBy,
        lastModifiedBy,
        createdDate,
        lastModifiedDate,
        recordOwner,
        transactionPhase,
        transactionDescription,
        industryId,
        productId,
        regionCode,
        amountInMN,
        couponPercent,
        tenorInYrs,
        moratoriumInYrs,
        repaymentFrequency,
        amortisationStyle,
        mandateLetterDate,
        creditApprovalDate,
        feeLetterDate,
        expectedCloseDate,
        actualCloseDate,
        nbcApprovalDate,
        nbcSubmissionDate,
        ccSubmissionDate,
        advanceInMN,
        advancePercent,
        finalPercent,
        guaranteePercent,
        monitoringInMN,
        reimbursableInMNcount,
        ...rest
      }) => ({ ...rest })
    );
    const cartPricesArrayString4 = cartPricesArray4.map(function (item) {
      return item.dealSize;
    });

    const cartPricesArray4_ = closedActual.map(
      ({
        dealId,
        leadId,
        companyId,
        companyDescription,
        originator,
        leadTransactor,
        coTransactor,
        transactorLegal,
        administrator,
        createdBy,
        lastModifiedBy,
        createdDate,
        lastModifiedDate,
        recordOwner,
        transactionPhase,
        transactionDescription,
        industryId,
        productId,
        regionCode,
        amountInMN,
        couponPercent,
        tenorInYrs,
        moratoriumInYrs,
        repaymentFrequency,
        amortisationStyle,
        mandateLetterDate,
        creditApprovalDate,
        feeLetterDate,
        expectedCloseDate,
        actualCloseDate,
        nbcApprovalDate,
        nbcSubmissionDate,
        ccSubmissionDate,
        advanceInMN,
        advancePercent,
        finalPercent,
        guaranteePercent,
        monitoringInMN,
        reimbursableInMNcount,
        ...rest
      }) => ({ ...rest })
    );
    const cartPricesArrayString4_ = cartPricesArray4_.map(function (item) {
      return item.dealSize;
    });

    redTotalDealSize.value = cartPricesArrayString.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    greenTotalDealSize.value = cartPricesArrayString3.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    amberTotalDealSize.value = cartPricesArrayString2.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    closedTotalDealSize.value = cartPricesArrayString4.reduce(
      (partialSum, a) => partialSum + a,
      0
    );

    redActual_.value = cartPricesArrayString_.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    greenActual_.value = cartPricesArrayString3_.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    amberActual_.value = cartPricesArrayString2_.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    closedActual_.value = cartPricesArrayString4_.reduce(
      (partialSum, a) => partialSum + a,
      0
    );

    const total =
      redTotalDealSize.value +
      greenTotalDealSize.value +
      amberTotalDealSize.value;

    if (guaranteeShow.value == true) {
      selectedValue.value = [
        ...allDeals,
        {
          dealId: "Total",
          dealSize: `₦${parseFloat(
            redTotalDealSize.value +
            amberTotalDealSize.value +
            greenTotalDealSize.value +
            closedTotalDealSize.value
          ).toFixed(2)}BN`,
        },
      ];
    } else if (green_AmberShow.value == true) {
      selectedValue.value = [
        ...greenActual,
        ...amberActual,
        ...closed,
        {
          dealId: "Total",
          dealSize: `₦${parseFloat(
            amberActual_.value + greenActual_.value + closedActual_.value
          ).toFixed(2)}BN`,
        },
      ];
    } else if (greenShow.value == true) {
      selectedValue.value = [
        ...greenActual,
        ...closed,
        {
          dealId: "Total",
          dealSize: `₦${parseFloat(
            greenActual_.value + closedActual_.value
          ).toFixed(2)}BN`,
        },
      ];
    } else if (originationShow.value == true) {
      selectedValue.value = [
        ...redActual,
        {
          dealId: "Total",
          dealSize: `₦${parseFloat(redActual_.value).toFixed(2)}BN`,
        },
      ];
    }

    let REDPercentageDealSize = (
      (redTotalDealSize.value / total) *
      100
    ).toFixed(0);
    let AMBERPercentageDealSize = (
      (amberTotalDealSize.value / total) *
      100
    ).toFixed(0);
    let GREENPercentageDealSize = (
      (greenTotalDealSize.value / total) *
      100
    ).toFixed(0);
    return (dealStats2.value = [
      {
        title: "Red Deals",
        title_: "Red Deals",
        number: numofRed.value,
        percentage: REDPercentageDealSize,
        amount: parseFloat(redTotalDealSize.value).toFixed(3),
        chartData: [23, 60, 23, 43, 12, 63],
        style: "#D12134",
        tooltip: "Mandate letter signed",
        textBelow: "Mandate letter signed",
      },
      {
        title: "Amber Deals",
        title_: "Amber Deals",
        number: numofAmber.value,
        percentage: AMBERPercentageDealSize,
        amount: parseFloat(amberTotalDealSize.value).toFixed(3),
        chartData: [1, 2, 5, 60, 23, 43],
        style: "#DB8A00",
        tooltip: "Deal has obtained credit committee approval",
        textBelow: "Credit committee approval obtained",
      },
      {
        title: "Green Deals",
        title_: "Green Deals",
        number: numofGreen.value,
        percentage: GREENPercentageDealSize,
        amount: parseFloat(greenTotalDealSize.value).toFixed(3),
        chartData: [1, 2, 23, 43, 12, 9],
        style: "#298729",
        tooltip:
          "Deals that has executed fee letter and/or guarantee documentation guarantee document in agreed form",
        textBelow: "Fee letter and/or guarantee doc. executed",
      },
      {
        title: "Total Pipeline Deals",
        title_: "Total Deals",
        number: numofTotal.value,
        amount: parseFloat(total).toFixed(3),
        chartData: [2, 23, 49, 72, 32],
        style: "#237CBF",
        tooltip: "All Pipeline Deals",
        textBelow: "All Pipeline Deals",
      },
      {
        title: "Porfolio Deals",
        title_: "Closed Deals",
        number: closedlength,
        amount: parseFloat(closedActual_.value).toFixed(3),
        chartData: [2, 23, 49, 72, 32],
        style: " rgb(102, 99, 94)",
        tooltip: "Porfolio Deals",
        textBelow: "Porfolio Deals",
      },
    ]);
  }
});

const computedTransactorPerformance = computed(() => {
  next();

  if (allPerformance.value != "" && allPerformance.value) {
    let performance = allPerformance.value;
    if (performance[0].guaranteePipelineTarget == null) {
      performance[0].guaranteePipelineTarget = 0;
    }
    if (performance[0].creditCommitteeApprovalTarget == null) {
      performance[0].creditCommitteeApprovalTarget = 0;
    }
    if (performance[0].feeLetterTarget == null) {
      performance[0].feeLetterTarget = 0;
    }
    if (performance[0].financialCloseTarget == null) {
      performance[0].financialCloseTarget = 0;
    }
    if (performance[0].originationMandatedTarget == null) {
      performance[0].originationMandatedTarget = 0;
    }

    let guaranteePipelineActual =
      redTotalDealSize.value +
      greenTotalDealSize.value +
      amberTotalDealSize.value +
      closedTotalDealSize.value;
    let green_AmberActual =
      greenActual_.value + amberActual_.value + closedActual_.value;
    guaranteePipelineActualSize.value = guaranteePipelineActual;

    let guaranteePipeline =
      guaranteePipelineActual - performance[0].guaranteePipelineTarget;
    let green_Amber =
      green_AmberActual -
      (performance[0].creditCommitteeApprovalTarget +
        performance[0].feeLetterTarget);
    let green =
      greenActual_.value +
      closedTotalDealSize.value -
      performance[0].feeLetterTarget;

    if (Math.sign(guaranteePipeline) == 1) {
      guaranteePipelineDeals.value = true;
    } else {
      guaranteePipelineDeals.value = false;
    }
    if (Math.sign(green_Amber) == 1) {
      green_AmberDeals.value = true;
    } else {
      green_AmberDeals.value = false;
    }
    if (Math.sign(green) == 1) {
      greenDeals.value = true;
    } else {
      greenDeals.value = false;
    }

    let deals = props.data;
    let presentYear = new Date().getFullYear();
    // let newDeals = deals.filter(o => o.financialYearName === `FY${presentYear}` && o.dealCategory == 'RED')

    // const cartPricesArrayString = newDeals.map(function (item) {
    //     return item.dealSize;
    // });

    // newDealsActual.value = cartPricesArrayString.reduce((partialSum, a) => (partialSum + a), 0);
    newDealsTarget.value = performance[0].originationMandatedTarget;

    varianceGuaranteePipeline.value = parseFloat(
      Math.abs(performance[0].guaranteePipelineTarget - guaranteePipelineActual)
    ).toFixed(2);
    varianceGreen_Amber.value = parseFloat(
      Math.abs(
        performance[0].creditCommitteeApprovalTarget +
        performance[0].feeLetterTarget -
        green_AmberActual
      )
    ).toFixed(2);
    varianceGreen.value = parseFloat(
      Math.abs(
        performance[0].feeLetterTarget -
        (greenActual_.value + closedActual_.value)
      )
    ).toFixed(2);
    newDealsVariance.value = parseFloat(
      Math.abs(performance[0].originationMandatedTarget - redActual_.value)
    ).toFixed(2);

    percentageGuaranteePipeline.value = (
      (guaranteePipelineActual / performance[0].guaranteePipelineTarget) *
      100
    ).toFixed(3);
    percentageGreen_Amber.value = (
      (green_AmberActual /
        (performance[0].creditCommitteeApprovalTarget +
          performance[0].feeLetterTarget)) *
      100
    ).toFixed(3);
    percentageGreen.value = (
      ((greenActual_.value + closedActual_.value) /
        (performance[0].creditCommitteeApprovalTarget +
          performance[0].feeLetterTarget)) *
      100
    ).toFixed(3);
    percentageNewDeals.value = (
      (redActual_.value / performance[0].originationMandatedTarget) *
      100
    ).toFixed(3);

    let newDealsDifference =
      redActual_.value - performance[0].originationMandatedTarget;

    if (Math.sign(newDealsDifference) == 1) {
      newDealsSign.value = true;
    } else {
      newDealsSign.value = false;
    }

    let tots = redActual_.value + performance[0].originationMandatedTarget;
    targetOriginPercentage.value = (
      (performance[0].originationMandatedTarget / tots) *
      100
    ).toFixed(3);
    actualOriginPercentage.value = ((redActual_.value / tots) * 100).toFixed(3);

    return performance;
  }
});

const next = async () => {
  allPerformance.value =
    await trmsService.getDealGlobalPerformanceByFinancialYear(
      stores.financialYear
    );
};
const close = async () => {
  guaranteeShow.value = false;
  green_AmberShow.value = false;
  greenShow.value = false;
  originationShow.value = false;
  dialogTransactionList.value = false;
};
dealStats2.value = [
  {
    title: "Red Deals",
    number: 0,
    amount: `0bn`,
    chartData: [0, 0, 0, 0, 0, 0],
    style: "#D12134",
    tooltip: "Mandate Letter signed",
  },
  {
    title: "Amber Deals",
    number: 0,
    amount: `0bn`,
    chartData: [0, 0, 0, 0, 0, 0],
    style: "#DB8A00",
    tooltip: "Deal has obtained Credit Committee approval",
  },
  {
    title: "Green Deals",
    number: 0,
    amount: `0bn`,
    chartData: [0, 0, 0, 0, 0, 0],
    style: "#298729",
    tooltip:
      "Deals that has Executed Fee Letter and/or Guarantee Documentation Guarantee Document in agreed form",
  },
  {
    title: "Total Deals",
    number: 0,
    amount: `0bn`,
    chartData: [0, 0, 0, 0, 0, 0],
    style: "#237CBF",
    tooltip: "All TRMS Deals",
  },
];

const oneBar = {
  labels: ["2023"],
  datasets: [
    {
      label: "Red",
      backgroundColor: "#FF0000",
      data: [230],
      barThickness: 50,
    },
  ],
};

const twoBar = {
  labels: ["Red", "Green"],
  datasets: [
    {
      label: "",
      backgroundColor: ["#FF0000", "#47B65C"],
      data: [230, 356],
      barThickness: 30,
    },
  ],
};
data.value = [
  {
    title: "Red Deals",
    number: 0,
    amount: `0bn`,
    chartData: [0, 0, 0, 0, 0, 0],
    style: "#D12134",
    tooltip: "Mandate Letter signed",
  },
  {
    title: "Amber Deals",
    number: 0,
    amount: `0bn`,
    chartData: [0, 0, 0, 0, 0, 0],
    style: "#DB8A00",
    tooltip: "Deal has obtained Credit Committee approval",
  },
  {
    title: "Green Deals",
    number: 0,
    amount: `0bn`,
    chartData: [0, 0, 0, 0, 0, 0],
    style: "#298729",
    tooltip:
      "Deals that has Executed Fee Letter and/or Guarantee Documentation Guarantee Document in agreed form",
  },
  {
    title: "Total Deals",
    number: 0,
    amount: `0bn`,
    chartData: [0, 0, 0, 0, 0, 0],
    style: "#237CBF",
    tooltip: "All TRMS Deals",
  },
];

const isShowProjectInfo = ref(false);
const showProjectsInfo = (value) => {
  isShowProjectInfo.value = value;
}
const onFilterSelected = (isCorrect) => {
  console.log(isCorrect)
  filterOption.value = isCorrect
}
const onSectorSelected = (isCorrect) => {
  console.log(isCorrect)
  sectorOption.value = isCorrect
}
const onSearchValuesEntered = (isCorrect) => {
  console.log(isCorrect)
  searchOption.value = isCorrect
}
const onCategorySelected = (isCorrect) => {
  console.log(isCorrect)
  categoryOption.value = isCorrect
}
const onProject_TypeSelected = (isCorrect) => {
  console.log(isCorrect)
  project_TypeOption.value = isCorrect
}
const pipelineDeals = computed(() => {
  next3()
  var pipelineDealList = null
  pipelineDealList = allPipelineLeadsData.value;
  // // Process search input
  if (searchOption.value != '' && searchOption.value) {
    pipelineDealList = pipelineDealList.filter((item) => {
      return item.client_name
        .toLowerCase()
        .includes(searchOption.value.toLowerCase()) ||
        item.industry.toLowerCase().includes(searchOption.value.toLowerCase())||
        item.project_name.toLowerCase().includes(searchOption.value.toLowerCase())
    })
  }

  if (sectorOption.value != '' && sectorOption.value) {
    if (sectorOption.value == "Clean Energy") {
      pipelineDealList = pipelineDealList.filter(o => o.industrySector == "Gas-to-Clean" || o.industrySector == "Off-grid Power" || o.industrySector == "Renewable Energy")
    }
    else {
      pipelineDealList = pipelineDealList.filter(o => o.industrySector == sectorOption.value)

    }
  }
  if (project_TypeOption.value != '' && project_TypeOption.value) {
    if (project_TypeOption.value == "Mandated") {
      pipelineDealList = pipelineDealList.filter(o => o.mandateSigned == true)
    }
    else {
      pipelineDealList = pipelineDealList.filter(o => o.mandateSigned == false)
    }
  }
  return pipelineDealList
})

const next3 = async () => {
  let allTotalCleanProjects = await cesService.getProjects()
  // allTotalLeads = allTotalLeads.filter(o => o.financialYearName == stores.financialYear)
  // myPipelineLeadsData.value = allTotalCleanProjects.filter(o => o.originator == stores.signedInUserEmail || o.leadTransactor == stores.signedInUserEmail || o.coTransactor == stores.signedInUserEmail || o.transactorLegal == stores.signedInUserEmail || o.administrator == stores.signedInUserEmail)
 allPipelineLeadsData.value = allTotalCleanProjects.data
}

const rowClicked = async (event) => {
  router.push(`/ces/projectForm/exs/${event}`)
}

</script>

<template>
  <div>
    <v-dialog v-model="dialogTransactionList" transition="slide-y-transiion" width="1050" @click:outside="close">
      <v-card style="padding: 20px">
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
      <h3 class="box-title">Deal Stats</h3>
      <div class="d-flex flex-wrap gap-3 justify-content-center">
        <LineChart v-for="(card, index) in computedTileData" :title="card.title" :number="card.number"
          :amount="card.amount" :chartData="card.chartData" :chart-id="index" :style="card.style"
          :tooltiptext="card.tooltip" :textBelow="card.textBelow"
          @click="stores.filterTableBelow = card.title_.toUpperCase()" />
      </div>
    </div>
    <div class="d-flex justify-content-between" v-for="i in computedTransactorPerformance" :key="i.id">
      <div class="targets box-padded">
        <h3 class="box-title">Guarantee Pipeline</h3>
        <div class="d-flex flex-column gap-3" @click="
          guaranteeShow = true;
        dialogTransactionList = true;
        ">
          <Target :target="i.guaranteePipelineTarget" :actual="parseFloat(guaranteePipelineActualSize).toFixed(3)"
            :variance="varianceGuaranteePipeline" :percentage="percentageGuaranteePipeline" :sign="guaranteePipelineDeals"
            targetComment="1.5x target of 2023-2024" />
        </div>
      </div>
      <div class="targets box-padded">
        <h3 class="box-title">Green & Amber Deals Pipeline</h3>
        <div class="d-flex flex-column gap-3" @click="
          green_AmberShow = true;
        dialogTransactionList = true;
        ">
          <Target :target="i.creditCommitteeApprovalTarget + i.feeLetterTarget" :actual="parseFloat(greenActual_ + amberActual_ + closedActual_).toFixed(3)
            " :percentage="percentageGreen_Amber" :variance="varianceGreen_Amber" :sign="green_AmberDeals"
            targetComment="1.5x target of 2023" />
        </div>
      </div>
      <div class="targets box-padded">
        <h3 class="box-title">Green Deals Pipeline</h3>
        <div class="d-flex flex-column gap-3" @click="
          greenShow = true;
        dialogTransactionList = true;
        ">
          <Target :target="i.feeLetterTarget" :actual="parseFloat(greenActual_ + closedActual_).toFixed(3)"
            :variance="varianceGreen" :percentage="percentageGreen" :sign="greenDeals"
            targetComment="70% of Green & Amber Deals 2023" />
        </div>
      </div>
      <div class="targets box-padded">
        <h3 class="box-title">New Deals (Origination)</h3>
        <div class="d-flex flex-column gap-3" @click="
          originationShow = true;
        dialogTransactionList = true;
        ">
          <Target :target="i.originationMandatedTarget" :actual="parseFloat(redActual_).toFixed(3)"
            :variance="newDealsVariance" :percentage="percentageNewDeals" :sign="true" />
        </div>
      </div>
    </div>

    <div class="box-padded">
      <div class="mt-3">
        <ToolBarCES @filterOptions="onFilterSelected" @sector="onSectorSelected" @searchValues="onSearchValuesEntered"
          @category="onCategorySelected" @project_Type="onProject_TypeSelected" />
      </div>
      <div class="mt-3">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" style="background-color: #227CBF;color: white;">
                  <div class="d-flex align-center gap-1">
                    <span class="noshrink"> S/N</span>
                    <span class="d-flex flex-column align-center">
                      <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                      <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                    </span>
                  </div>
                </th>
                <th scope="col" style="background-color: #227CBF;color: white;">
                  <div class="d-flex align-center gap-1">
                    <span> Client Name </span>
                    <span class="d-flex flex-column align-center">
                      <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                      <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                    </span>
                  </div>
                </th>
                <th scope="col" style="background-color: #227CBF;color: white;">
                  <div class="d-flex align-center gap-1">
                    <span> Transaction Name </span>
                    <span class="d-flex flex-column align-center">
                      <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                      <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                    </span>
                  </div>
                </th>
                <th scope="col" style="background-color: #227CBF;color: white;">
                  <div class="d-flex align-center gap-1">
                    <span>Industry </span>
                    <span class="d-flex flex-column align-center">
                      <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                      <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                    </span>
                  </div>
                </th>
                <th scope="col" style="background-color: #227CBF;color: white;">
                  <div class="d-flex align-center gap-1">
                    <span>Project Type </span>
                    <span class="d-flex flex-column align-center">
                      <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                      <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                    </span>
                  </div>
                </th>
                <th scope="col" style="background-color: #227CBF;color: white;">
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
              <tr @click="rowClicked(i.uuid)" v-for="(i, index) in pipelineDeals">
                <td scope="row">{{ index + 1 }}</td>
                <td>{{ i.client_name }}</td>
                <td>{{ i.transaction_name }}</td>
                <td>{{ i.sector }}</td>
                <td v-if="i.mandateSigned == true">Mandated</td>
                <td v-else="i.mandateSigned==false">Pre-Mandated</td>
                <td>
                  <GradeButton :grade="i.status" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mandated-transaction-heading {
  display: flex;
  justify-content: space-between;

  .search-box {
    position: relative;

    input {
      background: #fff;
      padding: 0.3rem;
      border-radius: 0.3rem;
      border: 1px solid #ddd;
    }

    button {
      background: linear-gradient(90deg, #227cbf, #71c480);
      color: #fff;
      padding: 0.3rem 1.5rem;
      margin-left: 0.5rem;
      border-radius: 0.3rem;
    }

    .icon {
      position: absolute;
      top: 0.5rem;
      right: 5.5rem;
    }
  }
}

.modified {
  color: #888;
}

.material-symbols-outlined {
  font-size: 20px;
}

.summary .transaction-info {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 25% 25% 25% auto;
  gap: 20px;
  width: 100%;
  position: relative;
  place-items: center;
  margin-top: 1rem;

  &:last-child {
    grid-template-columns: 25% auto 25%;

    .summary-final {
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: auto;
      gap: 20px;
    }
  }
}

.summary.credit,
.summary.workstream {
  .transaction-info {
    grid-template-columns: 33% auto;

    &.final {
      grid-template-columns: 25% auto 25%;
    }

    &.work-final {
      grid-template-columns: 15% 15% auto 15%;
    }

    .summary-final {
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: auto;
      gap: 10px;
    }
  }
}

.transaction-infos {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.transaction-infos_ {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.structuring .structuring-info {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 33% auto;
  gap: 20px;
  width: 100%;
  position: relative;
  place-items: center;
  margin-top: 1rem;

  &.installment {
    grid-template-columns: 50% auto;
  }
}

.structurings {
  display: flex;
  flex-direction: row !important;
  justify-content: space-between;
  width: 100%;
}

.field {
  display: flex;
  flex-direction: column;
  width: 300px;

  label {
    font-weight: bold;
    font-size: 14px;
    margin-top: 10px;
  }

  .field2 {
    display: flex;
    flex-direction: column;
    width: 300px;

    label {
      font-weight: bold;
      font-size: 11px;
      margin-top: 10px;
    }
  }

  .field3 {
    display: flex;
    flex-direction: column;
    width: 150px;

    label {
      font-weight: bold;
      font-size: 11px;
      margin-top: 10px;
    }
  }

  input,
  textarea,
  select {
    background: #eee;
    width: 100%;
    padding: .5rem;
    font-size: 14px;
    margin-top: 0.5rem;
  }
}

.icon {
  position: absolute;
  right: 0.5rem;
  top: 2.3rem;
  font-size: 18px;
  color: #333;

  &.options {
    font-size: 14px;

    span {
      color: #227cbf;
    }

    span:first-child {
      color: #71c480;
    }
  }
}

.box-title {
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
}

.box-padded {
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-top: 20px;
  background: #ffffff;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  h3 {
    font-size: 16px;
  }
}

.targets {
  width: 24%;
}

.chart-box-3 {
  width: 32%;
}

.chart-container {
  min-height: 400px;
}

h3.title {
  font-size: 20px;
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

npm run dev thead,
tr {
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}

.noshrink {
  display: flex;
  flex-shrink: 0;
}

.sel {
  width: 150px !important;
}</style>

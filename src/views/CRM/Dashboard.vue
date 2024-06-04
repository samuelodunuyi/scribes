<script setup>
import { ref, onMounted, computed } from "vue";
import TabMenu from "../../components/TabMenu.vue";
import BarChart from "../../components/Charts/BarChartCRM.vue";
import PieChart from "../../components/Charts/PieChartCRM.vue";
import PieChartStage from "../../components/Charts/PieChartCRMStage.vue";
import PieChartCategorization from "../../components/Charts/PieChartCRMCategorization.vue";
import TableCreateDeals from '../../components/Tables/TableCreateDeals.vue'
import TableOne from '../../components/Tables/TableOne.vue'
import sampleData from "../../data/sampleData.json";
import { useDashOptionStore } from '../../stores/dashOption';
import pinia from "../../stores/store";
import CRMService from '../../services/crmService';
import LineChartCRM from "../../components/Charts/LineChartCRM.vue";

const stores = useDashOptionStore(pinia);
const pastelData = sampleData.pastel;
const dialog = ref(false);
const dialogPipeline = ref(false);
const isPipeline = ref(false);
const dialog2 = ref(false);
const allDeals_ = ref('');
const numofMandatedDeals = ref('');
const numofNBCApprovedDeals = ref('');
const numofPipelineDeals = ref('');
const numofbrownFieldDeals = ref('');
const numofGreenFieldDeals = ref('');
const numofConceptDeals = ref('');
const numofEarlyStageDeals = ref('');
const numofMidStageDeals = ref('');
const numofCommercialDeals = ref('');
const numofCoreAssetsDeals = ref('');
const numofValueAddDeals = ref('');
const numofOpportunisticDeals = ref('');
const numofCorePlusDeals = ref('');
const numofAffordableHousingRED = ref('');
const numofagricInfraRED = ref('');
const numofeducationInfraRED = ref('');
const numofgasToCleanRED = ref('');
const numofgasToPowerRED = ref('');
const numofHealthcareRED = ref('');
const numofICT_TelcomRED = ref('');
const numofInfra_LogisticsRED = ref('');
const numofinputsToInfraRED = ref('');
const numoflogisticsRED = ref('');
const numofoffGridPowerRED = ref('');
const numofonGridPowerRED = ref('');
const numofrenewableEnergyRED = ref('');
const numoftransportationRED = ref('');
const numofwater_wasteRED = ref('');
const mandatedTotalDealSize = ref('');
const nbcApprovedTotalDealSize = ref('');
const pipelineTotalDealSize = ref('');
const brownFieldTotalDealSize = ref('');
const greenFieldTotalDealSize = ref('');
const coreAssetsTotalDealSize = ref('');
const valueAddTotalDealSize = ref('');
const corePlusTotalDealSize = ref('');
const opportunisticTotalDealSize = ref('');
const conceptTotalDealSize = ref('');
const earlyStageTotalDealSize = ref('');
const midStageTotalDealSize = ref('');
const commercialTotalDealSize = ref('');
const AffordableHousingTotalRED = ref('');
const agricInfraTotalRED = ref('');
const educationInfraTotalRED = ref('');
const gasToCleanTotalRED = ref('');
const gasToPowerTotalRED = ref('');
const HealthcareTotalRED = ref('');
const ICT_TelcomTotalRED = ref('');
const Infra_LogisticsTotalRED = ref('');
const inputsToInfraTotalRED = ref('');
const logisticsTotalRED = ref('');
const offGridPowerTotalRED = ref('');
const onGridPowerTotalRED = ref('');
const renewableEnergyTotalRED = ref('');
const transportationTotalRED = ref('');
const water_wasteTotalRED = ref('');
const allMandatedLeadsData = ref('');
const dealStats2 = ref([]);
const dealStats3 = ref([]);
const dealStats4 = ref([]);
const dealStats5 = ref([]);
const dealStats6 = ref([]);

onMounted(async () => {
  allDeals_.value = await CRMService.getLeads()
});

const computedTileData = computed(() => {
  let allDeals = allDeals_.value
  if (allDeals_.value != null && allDeals_.value.length != 0) {
    allDeals = allDeals.filter(o => new Date(o.financialYearName.slice(2)).getFullYear() <= new Date(stores.financialYear.slice(2)).getFullYear())
    var mandatedDeals = allDeals.filter(o => o.mandateSigned == true)
    var nbcApproved = allDeals.filter(o => o.nbcApproved == true)
    var pipeline = allDeals.filter(o => o.mandateSigned == false)

    numofMandatedDeals.value = mandatedDeals.length
    numofNBCApprovedDeals.value = nbcApproved.length
    numofPipelineDeals.value = pipeline.length

    const cartPricesArrayString = mandatedDeals.map(function (item) {
      return item.totalProjectSize_Indicative;
    });

    const cartPricesArrayString2 = nbcApproved.map(function (item) {
      return item.totalProjectSize_Indicative;
    });
    const cartPricesArrayString3 = pipeline.map(function (item) {
      return item.totalProjectSize_Indicative;
    });

    mandatedTotalDealSize.value = cartPricesArrayString.reduce((partialSum, a) => (partialSum + a), 0);
    nbcApprovedTotalDealSize.value = cartPricesArrayString2.reduce((partialSum, a) => (partialSum + a), 0);
    pipelineTotalDealSize.value = cartPricesArrayString3.reduce((partialSum, a) => (partialSum + a), 0);

    const total = mandatedTotalDealSize.value + nbcApprovedTotalDealSize.value + pipelineTotalDealSize.value

    let mandatedPercentageDealSize = ((mandatedTotalDealSize.value / total) * 100).toFixed(0)
    let nbcPercentageDealSize = ((nbcApprovedTotalDealSize.value / total) * 100).toFixed(0)
    let pipelinePercentageDealSize = ((pipelineTotalDealSize.value / total) * 100).toFixed(0)
    return dealStats2.value = [
      {
        "title": "All Prospect",
        "title_": "All Prospect",
        "number": numofPipelineDeals.value,
        "percentage": pipelinePercentageDealSize,
        "amount": parseFloat(pipelineTotalDealSize.value).toFixed(3),
        "chartData": [23, 60, 23, 43, 12, 63],
        "style": "#007bff",
        "tooltip": "All Prospect",
        "textBelow": "All Prospect"
      },
      {
        "title": "NBC Approved Clients",
        "title_": "NBC Approved Clients",
        "number": numofNBCApprovedDeals.value,
        "percentage": nbcPercentageDealSize,
        "amount": parseFloat(nbcApprovedTotalDealSize.value).toFixed(3),
        "chartData": [1, 2, 5, 60, 23, 43],
        "style": "#17a2b8",
        "tooltip": "NBC Approved Clients",
        "textBelow": "NBC Approved Clients"
      },
      {
        "title": "Mandated Clients",
        "title_": "Mandated Clients",
        "number": numofMandatedDeals.value,
        "percentage": mandatedPercentageDealSize,
        "amount": parseFloat(mandatedTotalDealSize.value).toFixed(3),
        "chartData": [1, 2, 23, 43, 12, 9],
        "style": "#D12134",
        "tooltip": "Mandated Clients",
        "textBelow": "Mandated Clients"
      }
    ]
  }
})

const computedProjectStage = computed(() => {
  let allDeals = allDeals_.value
  if (allDeals_.value != null && allDeals_.value.length != 0) {
    allDeals = allDeals.filter(o => new Date(o.financialYearName.slice(2)).getFullYear() <= new Date(stores.financialYear.slice(2)).getFullYear())
    var mandatedDeals = allDeals.filter(o => o.mandateSigned == true)
    var pipeline = allDeals.filter(o => o.mandateSigned == false)

    numofMandatedDeals.value = mandatedDeals.length
    numofPipelineDeals.value = pipeline.length

    const cartPricesArrayString = mandatedDeals.map(function (item) {
      return item.totalProjectSize_Indicative;
    });

    const cartPricesArrayString2 = pipeline.map(function (item) {
      return item.totalProjectSize_Indicative;
    });
    mandatedTotalDealSize.value = cartPricesArrayString.reduce((partialSum, a) => (partialSum + a), 0);
    pipelineTotalDealSize.value = cartPricesArrayString2.reduce((partialSum, a) => (partialSum + a), 0);

    return dealStats5.value = {
      "labels": [
        "Pipeline Projects", "Mandated Clients",
      ],
      "datasets": [
        {
          "label": "Project Stage",
          "backgroundColor": ["#6f42c1", "#007bff"],
          "data": [pipelineTotalDealSize.value, mandatedTotalDealSize.value]
        }
      ],
    }
  }
})

const computedProjectType = computed(() => {
  let allDeals = allDeals_.value
  if (allDeals_.value != null && allDeals_.value.length != 0) {
    allDeals = allDeals.filter(o => new Date(o.financialYearName.slice(2)).getFullYear() <= new Date(stores.financialYear.slice(2)).getFullYear())
    var brownfield = allDeals.filter(o => o.leadProjectType == "BrownField")
    var greenfield = allDeals.filter(o => o.leadProjectType == "GreenField")

    numofbrownFieldDeals.value = brownfield.length
    numofGreenFieldDeals.value = greenfield.length

    const cartPricesArrayString = brownfield.map(function (item) {
      return item.totalProjectSize_Indicative;
    });

    const cartPricesArrayString2 = greenfield.map(function (item) {
      return item.totalProjectSize_Indicative;
    });

    brownFieldTotalDealSize.value = cartPricesArrayString.reduce((partialSum, a) => (partialSum + a), 0);
    greenFieldTotalDealSize.value = cartPricesArrayString2.reduce((partialSum, a) => (partialSum + a), 0);

    const total = brownFieldTotalDealSize.value + greenFieldTotalDealSize.value

    let brownPercentageDealSize = ((brownFieldTotalDealSize.value / total) * 100).toFixed(0)
    let greenPercentageDealSize = ((greenFieldTotalDealSize.value / total) * 100).toFixed(0)
    return dealStats3.value = [
      {
        "title": "Brown Field",
        "number": numofbrownFieldDeals.value,
        "amount": parseFloat(brownFieldTotalDealSize.value).toFixed(3),
        "percentage": `${brownPercentageDealSize}`
      },
      {
        "title": "Green Field",
        "number": numofGreenFieldDeals.value,
        "amount": parseFloat(greenFieldTotalDealSize.value).toFixed(3),
        "percentage": `${greenPercentageDealSize}`
      }
    ]
  }
})

const computedApprovalStage = computed(() => {
  let allDeals = allDeals_.value
  if (allDeals_.value != null && allDeals_.value.length != 0) {
    allDeals = allDeals.filter(o => new Date(o.financialYearName.slice(2)).getFullYear() <= new Date(stores.financialYear.slice(2)).getFullYear())
    var concept = allDeals.filter(o => o.leadProjectStage == "Concept")
    var earlyStage = allDeals.filter(o => o.leadProjectStage == "Early Stage")
    var midStage = allDeals.filter(o => o.leadProjectStage == "Mid Stage")
    var commercial = allDeals.filter(o => o.leadProjectStage == "Commercial Operation")

    numofConceptDeals.value = concept.length
    numofEarlyStageDeals.value = earlyStage.length
    numofMidStageDeals.value = midStage.length
    numofCommercialDeals.value = commercial.length

    const cartPricesArrayString = concept.map(function (item) {
      return item.totalProjectSize_Indicative;
    });

    const cartPricesArrayString2 = earlyStage.map(function (item) {
      return item.totalProjectSize_Indicative;
    });
    const cartPricesArrayString3 = midStage.map(function (item) {
      return item.totalProjectSize_Indicative;
    });
    const cartPricesArrayString4 = commercial.map(function (item) {
      return item.totalProjectSize_Indicative;
    });

    conceptTotalDealSize.value = cartPricesArrayString.reduce((partialSum, a) => (partialSum + a), 0);
    earlyStageTotalDealSize.value = cartPricesArrayString2.reduce((partialSum, a) => (partialSum + a), 0);
    midStageTotalDealSize.value = cartPricesArrayString3.reduce((partialSum, a) => (partialSum + a), 0);
    commercialTotalDealSize.value = cartPricesArrayString4.reduce((partialSum, a) => (partialSum + a), 0);

    const total = conceptTotalDealSize.value + earlyStageTotalDealSize.value + midStageTotalDealSize.value + commercialTotalDealSize.value

    let conceptPercentageDealSize = ((conceptTotalDealSize.value / total) * 100).toFixed(0)
    let earlyPercentageDealSize = ((earlyStageTotalDealSize.value / total) * 100).toFixed(0)
    let midStagePercentageDealSize = ((midStageTotalDealSize.value / total) * 100).toFixed(0)
    let commercialPercentageDealSize = ((commercialTotalDealSize.value / total) * 100).toFixed(0)
    return dealStats3.value = [
      {
        "title": "Concept",
        "number": numofConceptDeals.value,
        "amount": parseFloat(conceptTotalDealSize.value).toFixed(3),
        "percentage": `${conceptPercentageDealSize}`
      },
      {
        "title": "Early Stage",
        "number": numofEarlyStageDeals.value,
        "amount": parseFloat(earlyStageTotalDealSize.value).toFixed(3),
        "percentage": `${earlyPercentageDealSize}`
      },
      {
        "title": "Mid Stage",
        "number": numofMidStageDeals.value,
        "amount": parseFloat(midStageTotalDealSize.value).toFixed(3),
        "percentage": `${midStagePercentageDealSize}`
      },
      {
        "title": "Commercial Operation",
        "number": numofCommercialDeals.value,
        "amount": parseFloat(commercialTotalDealSize.value).toFixed(3),
        "percentage": `${commercialPercentageDealSize}`
      }
    ]
  }
})


const computedCategorization = computed(() => {
  let allDeals = allDeals_.value
  if (allDeals_.value != null && allDeals_.value.length != 0) {
    allDeals = allDeals.filter(o => new Date(o.financialYearName.slice(2)).getFullYear() <= new Date(stores.financialYear.slice(2)).getFullYear())
    var coreAssets = allDeals.filter(o => o.leadCategorization == "Core Assets")
    var valueAdd = allDeals.filter(o => o.leadCategorization == "Value-Add Assets")
    var corePlus = allDeals.filter(o => o.leadCategorization == "Core Plus Assets")
    var opportunistic = allDeals.filter(o => o.leadCategorization == "Opportunistic")

    numofCoreAssetsDeals.value = coreAssets.length
    numofValueAddDeals.value = valueAdd.length
    numofCorePlusDeals.value = corePlus.length
    numofOpportunisticDeals.value = opportunistic.length

    const cartPricesArrayString = coreAssets.map(function (item) {
      return item.totalProjectSize_Indicative;
    });

    const cartPricesArrayString2 = valueAdd.map(function (item) {
      return item.totalProjectSize_Indicative;
    });
    const cartPricesArrayString3 = corePlus.map(function (item) {
      return item.totalProjectSize_Indicative;
    });
    const cartPricesArrayString4 = opportunistic.map(function (item) {
      return item.totalProjectSize_Indicative;
    });
    coreAssetsTotalDealSize.value = cartPricesArrayString.reduce((partialSum, a) => (partialSum + a), 0);
    valueAddTotalDealSize.value = cartPricesArrayString2.reduce((partialSum, a) => (partialSum + a), 0);
    corePlusTotalDealSize.value = cartPricesArrayString3.reduce((partialSum, a) => (partialSum + a), 0);
    opportunisticTotalDealSize.value = cartPricesArrayString4.reduce((partialSum, a) => (partialSum + a), 0);

    const total = coreAssetsTotalDealSize.value + valueAddTotalDealSize.value + corePlusTotalDealSize.value + opportunisticTotalDealSize.value

    let coreAssetsPercentageDealSize = ((coreAssetsTotalDealSize.value / total) * 100).toFixed(0)
    let valueAddPercentageDealSize = ((valueAddTotalDealSize.value / total) * 100).toFixed(0)
    let corePlusPercentageDealSize = ((corePlusTotalDealSize.value / total) * 100).toFixed(0)
    let opportunisticPercentageDealSize = ((opportunisticTotalDealSize.value / total) * 100).toFixed(0)
    return dealStats4.value = [
      {
        "title": "Core Assets",
        "number": numofCoreAssetsDeals.value,
        "amount": parseFloat(coreAssetsTotalDealSize.value).toFixed(3),
        "percentage": `${coreAssetsPercentageDealSize}`
      },
      {
        "title": "Value-Add Assets",
        "number": numofValueAddDeals.value,
        "amount": parseFloat(valueAddTotalDealSize.value).toFixed(3),
        "percentage": `${valueAddPercentageDealSize}`
      },
      {
        "title": "Core Plus Assets",
        "number": numofCorePlusDeals.value,
        "amount": parseFloat(corePlusTotalDealSize.value).toFixed(3),
        "percentage": `${corePlusPercentageDealSize}`
      },
      {
        "title": "Opportunistic",
        "number": numofOpportunisticDeals.value,
        "amount": parseFloat(opportunisticTotalDealSize.value).toFixed(3),
        "percentage": `${opportunisticPercentageDealSize}`
      }
    ]
  }
})

const computedTileDataIndustries = computed(() => {
  let allDeals = allDeals_.value
  if (allDeals_.value != null && allDeals_.value.length != 0) {
    allDeals = allDeals.filter(o => new Date(o.financialYearName.slice(2)).getFullYear() <= new Date(stores.financialYear.slice(2)).getFullYear())  
    var afforableHousingRED = allDeals.filter(o => o.industrySector == 'Affordable Housing')
    var agricInfraRED = allDeals.filter(o => o.industrySector == 'Agric. Infrastructure')
    var educationInfraRED = allDeals.filter(o => o.industrySector == 'Education Infrastructure')
    var gasToCleanRED = allDeals.filter(o => o.industrySector == 'Gas-to-Clean')
    var gasToPowerRED = allDeals.filter(o => o.industrySector == 'Gas-to-Power')
    var HealthcareRED = allDeals.filter(o => o.industrySector == 'Healthcare')
    var ICT_TelcomRED = allDeals.filter(o => o.industrySector == 'ICT/Telecoms')
    var Infra_LogisticsRED = allDeals.filter(o => o.industrySector == 'Infrastructure/Logistics')
    var inputsToInfraRED = allDeals.filter(o => o.industrySector == 'Inputs to Infrastructure')
    var logisticsRED = allDeals.filter(o => o.industrySector == 'Logistics')
    var offGridPowerRED = allDeals.filter(o => o.industrySector == 'Off-grid Power')
    var onGridPowerRED = allDeals.filter(o => o.industrySector == 'On-grid Power')
    var renewableEnergyRED = allDeals.filter(o => o.industrySector == 'Renewable Energy')
    var transportationRED = allDeals.filter(o => o.industrySector == 'Transportation')
    var water_wasteRED = allDeals.filter(o => o.industrySector == 'Water/Waste')


    numofAffordableHousingRED.value = afforableHousingRED.length
    numofagricInfraRED.value = agricInfraRED.length
    numofeducationInfraRED.value = educationInfraRED.length
    numofgasToCleanRED.value = gasToCleanRED.length
    numofgasToPowerRED.value = gasToPowerRED.length
    numofHealthcareRED.value = HealthcareRED.length
    numofICT_TelcomRED.value = ICT_TelcomRED.length
    numofInfra_LogisticsRED.value = Infra_LogisticsRED.length
    numofinputsToInfraRED.value = inputsToInfraRED.length
    numoflogisticsRED.value = logisticsRED.length
    numofoffGridPowerRED.value = offGridPowerRED.length
    numofonGridPowerRED.value = onGridPowerRED.length
    numofrenewableEnergyRED.value = renewableEnergyRED.length
    numoftransportationRED.value = transportationRED.length
    numofwater_wasteRED.value = water_wasteRED.length


    const cartPricesArrayString = afforableHousingRED.map(function (item) {
      return item.totalProjectSize_Indicative;
    });

    const cartPricesArrayString4 = agricInfraRED.map(function (item) {
      return item.totalProjectSize_Indicative;
    });

    const cartPricesArrayString7 = educationInfraRED.map(function (item) {
      return item.totalProjectSize_Indicative;
    });

    const cartPricesArrayString10 = gasToCleanRED.map(function (item) {
      return item.totalProjectSize_Indicative;
    });

    const cartPricesArrayString13 = gasToPowerRED.map(function (item) {
      return item.totalProjectSize_Indicative;
    });

    const cartPricesArrayString16 = HealthcareRED.map(function (item) {
      return item.totalProjectSize_Indicative;
    });

    const cartPricesArrayString19 = ICT_TelcomRED.map(function (item) {
      return item.totalProjectSize_Indicative;
    });

    const cartPricesArrayString22 = Infra_LogisticsRED.map(function (item) {
      return item.totalProjectSize_Indicative;
    });

    const cartPricesArrayString25 = inputsToInfraRED.map(function (item) {
      return item.totalProjectSize_Indicative;
    });
    const cartPricesArrayString28 = logisticsRED.map(function (item) {
      return item.totalProjectSize_Indicative;
    });
    const cartPricesArrayString31 = offGridPowerRED.map(function (item) {
      return item.totalProjectSize_Indicative;
    });
    const cartPricesArrayString34 = onGridPowerRED.map(function (item) {
      return item.totalProjectSize_Indicative;
    });

    const cartPricesArrayString37 = renewableEnergyRED.map(function (item) {
      return item.totalProjectSize_Indicative;
    });
    const cartPricesArrayString40 = transportationRED.map(function (item) {
      return item.totalProjectSize_Indicative;
    });

    const cartPricesArrayString43 = water_wasteRED.map(function (item) {
      return item.totalProjectSize_Indicative;
    });

    AffordableHousingTotalRED.value = cartPricesArrayString.reduce((partialSum, a) => (partialSum + a), 0);
    agricInfraTotalRED.value = cartPricesArrayString4.reduce((partialSum, a) => (partialSum + a), 0);
    educationInfraTotalRED.value = cartPricesArrayString7.reduce((partialSum, a) => (partialSum + a), 0);
    gasToCleanTotalRED.value = cartPricesArrayString10.reduce((partialSum, a) => (partialSum + a), 0);
    gasToPowerTotalRED.value = cartPricesArrayString13.reduce((partialSum, a) => (partialSum + a), 0);
    HealthcareTotalRED.value = cartPricesArrayString16.reduce((partialSum, a) => (partialSum + a), 0);
    ICT_TelcomTotalRED.value = cartPricesArrayString19.reduce((partialSum, a) => (partialSum + a), 0);
    Infra_LogisticsTotalRED.value = cartPricesArrayString22.reduce((partialSum, a) => (partialSum + a), 0);
    inputsToInfraTotalRED.value = cartPricesArrayString25.reduce((partialSum, a) => (partialSum + a), 0);
    logisticsTotalRED.value = cartPricesArrayString28.reduce((partialSum, a) => (partialSum + a), 0);
    offGridPowerTotalRED.value = cartPricesArrayString31.reduce((partialSum, a) => (partialSum + a), 0);
    onGridPowerTotalRED.value = cartPricesArrayString34.reduce((partialSum, a) => (partialSum + a), 0);
    renewableEnergyTotalRED.value = cartPricesArrayString37.reduce((partialSum, a) => (partialSum + a), 0);
    transportationTotalRED.value = cartPricesArrayString40.reduce((partialSum, a) => (partialSum + a), 0);
    water_wasteTotalRED.value = cartPricesArrayString43.reduce((partialSum, a) => (partialSum + a), 0);
    return dealStats5.value = {
      "labels": [
        "Afforable Housing", "Agric. Infra", "Education Infra", "GasClean", "GasPower", "Healthcare", "ICT/Telecoms", "Infra Logistics", "Input to Infra", "Logistics", "Off Grid Power", "on Grid Power",
        "Renewable Energy", "Transport", "Water/Waste",
      ],
      "datasets": [
        {
          "label": "Sector",
          "backgroundColor": ["#17a2b8", "#007bff", "#00cccc", "#6f42c1", "#17a2b8"],
          "data": [AffordableHousingTotalRED.value, agricInfraTotalRED.value, educationInfraTotalRED.value, gasToCleanTotalRED.value, gasToPowerTotalRED.value, HealthcareTotalRED.value, ICT_TelcomTotalRED.value, Infra_LogisticsTotalRED.value, inputsToInfraTotalRED.value, logisticsTotalRED.value, offGridPowerTotalRED.value, onGridPowerTotalRED.value, renewableEnergyTotalRED.value, transportationTotalRED.value, water_wasteTotalRED.value]
        }
      ],
    }
  }
});
</script>

<template>
  <div class="wrapper">
    <div class="d-flex justify-content-between align-items-center mt-3">
      <h3 class="intro mt-4">Hi, {{ stores.signedInUserName }}</h3>

      <div class="dropdown">
        <div data-bs-toggle="dropdown" aria-expanded="false"
          style="flex-direction: row; display: flex; align-items: center;">
          <v-btn class="text-none" color="indigo-darken-1" prepend-icon="mdi-plus">
            Create
          </v-btn>
        </div>
        <ul class="dropdown-menu">
          <li style="cursor: pointer;"><a class="dropdown-item"
              @click="$router.push('/crm/details/pipelineLeads/new')">New Lead (CRM)</a></li>
          <li style="cursor: pointer;"><a class="dropdown-item" @click="dialog = true">New Deal (TRMS)</a></li>
          <li style="cursor: pointer;"><a class="dropdown-item">New Portfolio</a></li>
          <li style="cursor: pointer;"><a class="dropdown-item">New Clean Energy</a></li>
        </ul>
      </div>
    </div>

    <v-dialog v-model="dialog" width="700px">
      <v-card>
        <v-card-text style="text-align: center;">
          <h4> Is this an existing Transaction or would you like to create a new one?</h4>
          <div class="d-flex justify-content-center align-items gap-4 my-4">
            <!-- here -->
            <button type="button" class="btn btn-success"
              @click="dialog = false; dialogPipeline = true; isPipeline = true">
              Yes, I have an existing transaction
            </button>
            <button type="button" class="btn btn-success" @click="dialog2 = true; dialog = false">
              No, this is a new transaction
            </button>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog2" width="700px">
      <v-card>
        <v-card-text style="text-align: center;">
          <h4> Create New Deal</h4>
          <div class="d-flex justify-content-center align-items gap-4 my-4">
            <!-- here -->
            <button type="button" class="btn btn-success"
              @click="dialog2 = false; dialogPipeline = true; isPipeline = false">
              With Entries from CRM
            </button>
            <button type="button" class="btn btn-success"
              @click="dialog2 = false; stores.selectedLeadID_newPipelineDeal = ''; $router.push('/TRMS/pipelinedeals/detail/new')">
              Manually
            </button>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogPipeline" persistent width="80%">
      <v-card>
        <v-card-text class="pt-4 pb-5">
          <div class="d-flex justify-space-between align-center">
            <div class="d-flex justify-space-between">
              <h5 v-if="isPipeline" style="width: 100%; margin-top: 10px;"> Select from Pipeline Projects </h5>
              <h5 v-else style="width: 100%; margin-top: 10px;"> Select from Mandated Clients </h5>
            </div>
            <v-icon @click="dialogPipeline = false" icon="mdi-close" size="large"></v-icon>
          </div>
          <TableCreateDeals v-if="isPipeline" />
          <TableOne v-else leadType="Mandated Deal" :LeadData="allMandatedLeadsData" />
          <div class="d-flex justify-content-end mr-2 mt-3">
            <button @click="dialogPipeline = false" class="submit-button">Cancel</button>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <TabMenu />
    <div class="stats box-padded2">
      <div class="d-flex flex-wrap gap-3 justify-content-center">
        <LineChartCRM v-for="i in computedTileData" :title="i.title_" :number="i.number" :amount="i.amount"
          :tooltiptext="i.tooltip" :textBelow="i.textBelow" :styles="i.style" :chart-data="computedTileData" />
      </div>
    </div>

    <div class="d-flex justify-content-between align-items-center mt-3">
      <div class="box-padded align-items-center">
        <h4 class="box-title align-self-start">Approval Stage</h4>
        <PieChartStage chart-id="Stage" :label="true" :chart-data="computedApprovalStage" />
      </div>

      <div class="box-padded align-items-center">
        <h4 class="box-title align-self-start">Project Type</h4>
        <PieChart chart-id="Type" :label="true" :chart-data="computedProjectType" />
      </div>

      <div class="box-padded align-items-center">
        <h4 class="box-title align-self-start">Project Categories</h4>
        <PieChartCategorization chart-id="Categories" :label="true" :chart-data="computedCategorization" />
      </div>
    </div>

    <div class="d-flex justify-content-between align-items-center mt-3">
      <div class="box-padded align-items-center">
        <h4 class="box-title">Project Sector</h4>
        <BarChart chart-id="Sector" :stacked="false" :chartData="computedTileDataIndustries" />
      </div>

      <div class="box-padded align-items-center">
        <h4 class="box-title align-self-center">Project Stage</h4>
        <BarChart chart-id="ProjectStage" :chart-data="computedProjectStage" :stacked="false" :display-legend="false" />
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

.box-padded {
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-top: 20px;
  background: #ffffff;
  flex-basis: 49%;

  box-shadow: 0px 0px 20px 2px #eaeaea;
  border-radius: 5px;
  height: 380px;
  padding-bottom: 20px;
}

.box-padded2 {
  display: flex;
  flex-direction: column;
  padding: 35px 20px 10px 20px;
  margin-top: 20px;
  background: #ffffff;
  flex-basis: 49%;
  box-shadow: 0px 0px 20px 2px #eaeaea;
  border-radius: 5px;
  height: 250px;
}

.box-title {
  color: #1f1f1f;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 20px;
}
</style>
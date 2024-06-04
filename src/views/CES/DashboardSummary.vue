<script setup>
import pinia from "../../stores/store";
import { ref, computed, onMounted, watch } from "vue";
import PieChartStage from "../../components/Charts/PieChartCRMStageSummary.vue";
import PieChartStagePre from "../../components/Charts/PieChartSummaryPre.vue";
import { useDashOptionStore } from "../../stores/dashOption";
import crmService from "../../services/crmService";
import ToolBarCESSummary from "../../components/ToolBarCESSummary.vue";

const allPipelineLeadsData = ref('')
const myPipelineLeadsData = ref('')
const totalProjects = ref('')
const AllTotalDealSize = ref('')
const CleanTotalDealSize = ref('')
const CRGTotalDealSize = ref('')
const affordableHousingTotalDealSize = ref('')
const percentageCleanEnergy = ref('')
const percentageCRG = ref('')
const percentageaffordableHousing = ref('')
const percentageOther = ref('')
const OtherTotalDealSize = ref('')
const mandateNotSubmittedlength = ref('')
const mandateSubmittedlength = ref('')
const chartData_ = ref([])
const chartData_2 = ref([])
const mandateSubmitted = ref([])
const mandateNotSubmitted = ref([])


const props = defineProps([
  "data",
  "dealSec",
  "fundOption",
  "selectedUserList",
  "addFilter",
  "performance",
]);
const stores = useDashOptionStore(pinia);
const filterOption = ref("Mandated");
const sectorOption = ref("");
const categoryOption = ref("");
const project_TypeOption = ref("");


const onFilterSelected = (isCorrect) => {
  filterOption.value = isCorrect;
};
const onSectorSelected = (isCorrect) => {
  sectorOption.value = isCorrect;
};
const onCategorySelected = (isCorrect) => {
  categoryOption.value = isCorrect;
};


const pipelineDeals = computed(() => {
  next3()
  var pipelineDealList = null
  // if (text.value == 'myPipelineLeads') {
  //     pipelineDealList = myPipelineLeadsData.value;
  //     totalArrayValue.value = pipelineDealList.length
  // }
  // else if (text.value == 'allPipelineLeads') {
  //     pipelineDealList = allPipelineLeadsData.value;
  //     totalArrayValue.value = pipelineDealList.length
  // // }
  pipelineDealList = allPipelineLeadsData.value;

  if (sectorOption.value != '' && sectorOption.value) {
    if (sectorOption.value == "Clean Energy") {
      pipelineDealList = pipelineDealList.filter(o => o.industrySector == "Gas-to-Clean" || o.industrySector == "Off-grid Power" || o.industrySector == "Renewable Energy")
    }
    else {
      pipelineDealList = pipelineDealList.filter(o => o.industrySector == sectorOption.value)

    }
  }

  let cleanEnergyList = pipelineDealList.filter(o => o.industrySector == "Gas-to-Clean" || o.industrySector == "Off-grid Power" || o.industrySector == "Renewable Energy")
  let CRGList = pipelineDealList.filter(o => o.industrySector == "CRG")
  let afforrdableHousing = pipelineDealList.filter(o => o.industrySector == "Affordable Housing")
  let otherList = pipelineDealList.filter(o => o.industrySector == "Others")


  let mandateNotSubmit = pipelineDealList.filter(o => o.draftMandateLetterSent == false)
  let mandateSubmit = pipelineDealList.filter(o => o.draftMandateLetterSent == true)

  mandateNotSubmittedlength.value = mandateNotSubmit.length
  mandateSubmittedlength.value = mandateSubmit.length

  totalProjects.value = pipelineDealList.length
  const cartPricesArrayString = pipelineDealList.map(function (item) {
    return item.totalProjectSize_Indicative;
  });
  const cartPricesArrayString2 = cleanEnergyList.map(function (item) {
    return item.totalProjectSize_Indicative;
  });
  const cartPricesArrayString3 = CRGList.map(function (item) {
    return item.totalProjectSize_Indicative;
  });
  const cartPricesArrayString4 = afforrdableHousing.map(function (item) {
    return item.totalProjectSize_Indicative;
  });
  const cartPricesArrayString5 = otherList.map(function (item) {
    return item.totalProjectSize_Indicative;
  });
  const cartPricesArrayString6 = mandateNotSubmit.map(function (item) {
    return item.totalProjectSize_Indicative;
  });
  const cartPricesArrayString7 = mandateSubmit.map(function (item) {
    return item.totalProjectSize_Indicative;
  });
  AllTotalDealSize.value = cartPricesArrayString.reduce((partialSum, a) => (partialSum + a), 0);
  CleanTotalDealSize.value = cartPricesArrayString2.reduce((partialSum, a) => (partialSum + a), 0);
  CRGTotalDealSize.value = cartPricesArrayString3.reduce((partialSum, a) => (partialSum + a), 0);
  affordableHousingTotalDealSize.value = cartPricesArrayString4.reduce((partialSum, a) => (partialSum + a), 0);
  OtherTotalDealSize.value = cartPricesArrayString5.reduce((partialSum, a) => (partialSum + a), 0);
  mandateNotSubmitted.value = cartPricesArrayString6.reduce((partialSum, a) => (partialSum + a), 0);
  mandateSubmitted.value = cartPricesArrayString7.reduce((partialSum, a) => (partialSum + a), 0);

  AllTotalDealSize.value = parseFloat(AllTotalDealSize.value).toFixed(2);
  CleanTotalDealSize.value = parseFloat(CleanTotalDealSize.value).toFixed(2);
  CRGTotalDealSize.value = parseFloat(CRGTotalDealSize.value).toFixed(2);
  affordableHousingTotalDealSize.value = parseFloat(affordableHousingTotalDealSize.value).toFixed(2);
  OtherTotalDealSize.value = parseFloat(OtherTotalDealSize.value).toFixed(2);
  mandateNotSubmitted.value = parseFloat(mandateNotSubmitted.value).toFixed(2);
  mandateSubmitted.value = parseFloat(mandateSubmitted.value).toFixed(2);


  console.log(mandateSubmitted.value)
  percentageCleanEnergy.value = parseFloat((CleanTotalDealSize.value / AllTotalDealSize.value) * 100).toFixed(2)
  percentageCRG.value = parseFloat((CRGTotalDealSize.value / AllTotalDealSize.value) * 100).toFixed(2)
  percentageaffordableHousing.value = parseFloat((affordableHousingTotalDealSize.value / AllTotalDealSize.value) * 100).toFixed(2)
  percentageOther.value = parseFloat((OtherTotalDealSize.value / AllTotalDealSize.value) * 100).toFixed(2)

  totalProjects.value = pipelineDealList.length

  return pipelineDealList
})


watch(
  () => totalProjects.value,
  (first, second) => {
    chartData_.value = [{ amount: CleanTotalDealSize.value, label: "Clean Energy", background: "#B18001", percentageCleanEnergy: percentageCleanEnergy.value },
    { amount: affordableHousingTotalDealSize.value, label: "Housing", background: "#018070", percentageaffordableHousing: percentageaffordableHousing.value },
    { amount: OtherTotalDealSize.value, label: "Other Mandate", background: "#B11919", percentageOther: percentageOther.value },
    { amount: CRGTotalDealSize.value, label: "CRG", background: "#410075", percentageCRG: percentageCRG.value }]
  }
);


watch(
  () => totalProjects.value,
  (first, second) => {
    chartData_2.value = [{ amount: mandateSubmitted.value, label: "Submitted", background: "#B18001", number: mandateNotSubmittedlength.value },
    { amount: mandateNotSubmitted.value, label: "Not Submitted", background: "#018070", number: mandateSubmittedlength.value }
    ]
  }
);


const next3 = async () => {
  let allTotalLeads = await crmService.getLeads()
  // allTotalLeads = allTotalLeads.filter(o => o.financialYearName == stores.financialYear)

  let allPersonalLeads = await crmService.getLeads()
  // allPersonalLeads = allPersonalLeads.filter(o => o.financialYearName == stores.financialYear)

  allPipelineLeadsData.value = allTotalLeads
  myPipelineLeadsData.value = allPersonalLeads.filter(o => o.originator == stores.signedInUserEmail || o.leadTransactor == stores.signedInUserEmail || o.coTransactor == stores.signedInUserEmail || o.transactorLegal == stores.signedInUserEmail || o.administrator == stores.signedInUserEmail)
}



</script>

<template>
  <div>
    <div v-if="filterOption == 'Mandated' || filterOption == 'all'">
      <div class="d-flex justify-content-between mt-4">
        <h5>Mandated Transaction Update Tracking Summary</h5>
        <ToolBarCESSummary @summaryType="onFilterSelected" @sector="onSectorSelected" @category="onCategorySelected" />
      </div>

      <div class="top-bar-section">
        <div class="chart-box-3 d-flex flex-col">
          <div class="deal-item text-center my-2 p-2 d-flex flex-col justify-content-center">
            <h4>Total Deal Size</h4>
            <h2>₦{{ AllTotalDealSize }}bn</h2>
          </div>
          <div class="deal-item text-center my-2 p-2 d-flex flex-col justify-content-center">
            <h4>Total Projects</h4>
            <h2>{{ totalProjects }}</h2>
          </div>
        </div>
        <div class="piechart box-padded">
          <h4>Deals Size by Sector</h4>
          <div class="deal-size-sector">
            <PieChartStage chart-id="Sector Deal Size" :fontColor="'#000000'" :doughnut="true" :chartData="chartData_" />
          </div>
        </div>
        <div class="w-full">
          <div class="table-responsive">
            <table class="table">
              <thead style="cursor: context-menu; ">
                <tr>
                  <th scope="col" style="background-color: #227CBF;color: white;">
                    <div class="d-flex align-center">
                      <span class="noshrink"> Sector</span>
                      <span class="d-flex flex-column align-center">
                        <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                        <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                      </span>
                    </div>
                  </th>
                  <th scope="col" style="background-color: #227CBF;color: white;">
                    <div class="d-flex align-center">
                      <span> Deal Size </span>
                      <span class="d-flex flex-column align-center">
                        <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                        <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                      </span>
                    </div>
                  </th>

                  <th scope="col" style="background-color: #227CBF;color: white;">
                    <div class="d-flex align-center">
                      <span> Deal Size % </span>
                      <span class="d-flex flex-column align-center">
                        <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                        <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                      </span>
                    </div>
                  </th>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row">Clean Energy</td>
                  <td>{{ CleanTotalDealSize }}bn</td>
                  <td>{{ percentageCleanEnergy }}%</td>
                </tr>
                <tr>
                  <td scope="row">Green Housing</td>
                  <td>{{ affordableHousingTotalDealSize }}bn</td>
                  <td>{{ percentageaffordableHousing }}%</td>
                </tr>
                <tr>
                  <td scope="row">Other Mandated</td>
                  <td>{{ OtherTotalDealSize }}bn</td>
                  <td>{{ percentageOther }}%</td>
                </tr>
                <tr>
                  <td scope="row">CRG</td>
                  <td>{{ CRGTotalDealSize }}bn</td>
                  <td>{{ percentageCRG }}%</td>
                </tr>

                <tr>

                  <td scope="row" style="color: black; font-weight: bold;"><b>Total</b></td>
                  <td style="color: black; font-weight: bold;">{{ parseInt(CleanTotalDealSize) + parseInt(affordableHousingTotalDealSize) +
                    parseInt(CRGTotalDealSize) + parseInt(OtherTotalDealSize) }}bn
                  </td>
                  <td style="color: black; font-weight: bold;">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="mt-5">
        <div class="table-responsive">
          <table class="table">
            <thead style="cursor: context-menu; ">
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
                    <span> Project Name </span>
                    <span class="d-flex flex-column align-center">
                      <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                      <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                    </span>
                  </div>
                </th>

                <th scope="col" style="background-color: #227CBF;color: white;">
                  <div class="d-flex align-center gap-1">
                    <span> Deal Size (BN) </span>
                    <span class="d-flex flex-column align-center">
                      <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                      <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                    </span>
                  </div>
                </th>
                <th scope="col" style="background-color: #227CBF;color: white;">
                  <div class="d-flex align-center gap-1">
                    <span>Sector </span>
                    <span class="d-flex flex-column align-center">
                      <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                      <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(i, index) in pipelineDeals">
                <td scope="row">{{ index + 1 }}</td>
                <td>{{ i.companyName }}</td>
                <td>{{ i.totalProjectSize_Indicative }}</td>
                <td>{{ i.industrySector }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div v-else="filterOption == 'Pre-Mandated'">
      <div class="d-flex justify-content-between mt-4">
        <h5>Pre-Mandated Transaction Update Tracking Summary</h5>
        <ToolBarCESSummary @summaryType="onFilterSelected" @sector="onSectorSelected" @category="onCategorySelected" />
      </div>

      <div class="top-bar-section">
        <div class="chart-box-3 d-flex flex-col">
          <div class="deal-item text-center my-2 p-2 d-flex flex-col justify-content-center">
            <h4>Total Deal Size</h4>
            <h2>₦{{ AllTotalDealSize }}bn</h2>
          </div>
          <div class="deal-item text-center my-2 p-2 d-flex flex-col justify-content-center">
            <h4>Total Projects</h4>
            <h2>{{ totalProjects }}</h2>
          </div>
        </div>
        <div class="piechart box-padded">
          <h4>Pre-Mandated Status</h4>
          <div class="deal-size-sector">
            <PieChartStagePre chart-id="Pre-Mandated" :fontColor="'#000000'" :doughnut="true" :chartData="chartData_2" />
          </div>
        </div>
        <div class="w-full">
          <div class="table-responsive">
            <table class="table">
              <thead style="cursor: context-menu; ">
                <tr>
                  <th scope="col" style="background-color: #227CBF;color: white;">
                    <div class="d-flex align-center">
                      <span class="noshrink"> Sector</span>
                      <span class="d-flex flex-column align-center">
                        <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                        <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                      </span>
                    </div>
                  </th>
                  <th scope="col" style="background-color: #227CBF;color: white;">
                    <div class="d-flex align-center">
                      <span> Deal Size </span>
                      <span class="d-flex flex-column align-center">
                        <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                        <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                      </span>
                    </div>
                  </th>

                  <th scope="col" style="background-color: #227CBF;color: white;">
                    <div class="d-flex align-center">
                      <span> Deal Size % </span>
                      <span class="d-flex flex-column align-center">
                        <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                        <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                      </span>
                    </div>
                  </th>

                </tr>
              </thead>
              <tbody>
                <tr>

                  <td scope="row">Other Mandated</td>
                  <td>{{ OtherTotalDealSize }}bn</td>
                  <td>{{ percentageOther }}%</td>
                </tr>
                <tr>

                  <td scope="row">Housing</td>
                  <td>{{ affordableHousingTotalDealSize }}bn</td>
                  <td>{{ percentageaffordableHousing }}%</td>
                </tr>
                <tr>

                  <td scope="row">CRG</td>
                  <td>{{ CRGTotalDealSize }}bn</td>
                  <td>{{ percentageCRG }}%</td>
                </tr>
                <tr>

                  <td scope="row">Clean Energy</td>
                  <td>{{ CleanTotalDealSize }}bn</td>
                  <td>{{ percentageCleanEnergy }}%</td>
                </tr>
                <tr>

                  <td scope="row">Total</td>
                  <td>{{ parseInt(CleanTotalDealSize) + parseInt(affordableHousingTotalDealSize) +
                    parseInt(CRGTotalDealSize) + parseInt(OtherTotalDealSize) }}bn
                  </td>
                  <td>100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="mt-5">
        <div class="table-responsive">
          <table class="table">
            <thead style="cursor: context-menu; ">
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
                    <span> Project Name </span>
                    <span class="d-flex flex-column align-center">
                      <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                      <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                    </span>
                  </div>
                </th>

                <th scope="col" style="background-color: #227CBF;color: white;">
                  <div class="d-flex align-center gap-1">
                    <span> Deal Size </span>
                    <span class="d-flex flex-column align-center">
                      <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                      <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                    </span>
                  </div>
                </th>
                <th scope="col" style="background-color: #227CBF;color: white;">
                  <div class="d-flex align-center gap-1">
                    <span>Pre-Mandated Status </span>
                    <span class="d-flex flex-column align-center">
                      <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                      <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(i, index) in pipelineDeals">
                <td scope="row">{{ index + 1 }}</td>
                <td>{{ i.companyName }}</td>
                <td>{{ i.totalProjectSize_Indicative }}</td>
                <td v-if="i.draftMandateLetterSent == true">Submitted</td>
                <td v-else="i.draftMandateLetterSent==false">Not Submitted</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

.noshrink {
  display: flex;
  flex-shrink: 0;
}

.box-padded {
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-top: 20px;
  background: #ffffff;
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
  width: 100%;
  min-height: 100%;
}

.top-bar-section {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 20% 25% 55%;
}

.deal-item {
  background: var(--primary);
  color: var(--white);
  height: 156.8px;
  width: 100%;
  border-radius: 0.5rem;

  h4 {
    font-size: 16px;
    font-weight: 400;
  }
}

.piechart {
  margin: 0rem 1rem 0rem 1rem;
  justify-content: center;
  height: 100%;

  h4 {
    font-size: 16px;
    font-weight: 600;
  }
}
</style>

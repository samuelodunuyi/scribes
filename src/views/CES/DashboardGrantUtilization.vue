<script setup>
import { ref, computed, watch } from "vue";
import { useDashOptionStore } from "../../stores/dashOption";
import pinia from "../../stores/store";
import ceservice from "../../services/cesService";
import ToolBarCESGrant from "../../components/ToolBarCESGrant.vue";
import PieChartStage from "../../components/Charts/PieChartCRMStageSummary2.vue";
import PieChartStage2 from "../../components/Charts/PieChartCRMStageSummary3.vue";

const stores = useDashOptionStore(pinia);

const props = defineProps([
  "data",
  "dealSec",
  "selectedUserList",
  "fundOption",
  "performance",
]);
const dialogTransactionList = ref(false);
const selectedDevelopmentPartner = ref("");
const computedTileData_two = ref("");
const selectedClientName = ref("");
const transactionName = ref("");
const selectedCurrency = ref("");
const selectedGrantType = ref("");
const selectedGrantAmount = ref("");
const selectedGrantUsed = ref("");
const selectedGrantLeft = ref("");
const purposeofGrant = ref("");
const selectedGranttoEdit = ref("");
const filteredSelectedCurrency = ref("");
const filteredSelectedDevelopmentPartner = ref("");
const filteredSelectedGrantType = ref("");
const totalUSDValue = ref("");
const totalEURValue = ref("");
const EURPercentageDealSize = ref("");
const USDPercentageDealSize = ref("");
const totalGrantUsedValue = ref("");
const totalGrantLeft = ref("");
const totalGrantAmountValue = ref("");
const totalDealSize = ref("");
const selectedUUID = ref("");
const TotalGrantLeftPercentageDealSize = ref("");
const TotalGrantUsedPercentageDealSize = ref("");
const computedTileData_one = ref([]);
const guaranteeShow = ref(false);
const green_AmberShow = ref(false);
const greenShow = ref(false);
const originationShow = ref(false);
const isEdit = ref(false);
const openModal = ref(false);
const grant = ref([]);

const next3 = async (event) => {
  let ps = await ceservice.getGrants()
  grant.value = ps.data
};

const saveGrant = async (event) => {
  openModal.value = false
  let ps = await ceservice.createGrant(selectedDevelopmentPartner.value, selectedClientName.value, transactionName.value, selectedCurrency.value, selectedGrantType.value, parseInt(selectedGrantAmount.value), parseInt(selectedGrantUsed.value), parseInt(selectedGrantLeft.value), purposeofGrant.value)
};

const editGrants = async (event) => {
  isEdit.value = true
  openModal.value = true
  selectedUUID.value = event
  selectedGranttoEdit.value = grant.value.filter(o => o.uuid == event)
  selectedDevelopmentPartner.value = selectedGranttoEdit.value[0].development_partner;
  selectedClientName.value = selectedGranttoEdit.value[0].client_name;
  transactionName.value = selectedGranttoEdit.value[0].transaction_name;
  selectedCurrency.value = selectedGranttoEdit.value[0].currency;
  selectedGrantType.value = selectedGranttoEdit.value[0].grant_type;
  selectedGrantAmount.value = selectedGranttoEdit.value[0].total_grant_amount;
  selectedGrantUsed.value = selectedGranttoEdit.value[0].total_grant_used;
  selectedGrantLeft.value = selectedGranttoEdit.value[0].total_grant_left;
  purposeofGrant.value = selectedGranttoEdit.value[0].purpose_of_grant;

};


const saveEdit = async (event) => {
  openModal.value = false
  isEdit.value = true
  let ps = await ceservice.editGrant(selectedUUID.value, selectedDevelopmentPartner.value, selectedClientName.value, transactionName.value, selectedCurrency.value, selectedGrantType.value, parseInt(selectedGrantAmount.value), parseInt(selectedGrantUsed.value), parseInt(selectedGrantLeft.value), purposeofGrant.value)
};


watch(
  () => totalDealSize.value,
  (first, second) => {
    if (first != second) {
      computedTileData_one.value = [
        {
          "title": "EUR",
          "style": "#1A3972",
          "amount": parseFloat(totalEURValue.value).toFixed(2),
          "percentage": `${EURPercentageDealSize.value}`
        },
        {
          "title": "USD",
          "style": "#9747FF",
          "amount": parseFloat(totalUSDValue.value).toFixed(2),
          "percentage": `${USDPercentageDealSize.value}`
        }
      ];
    }
  }
);

watch(
  () => selectedGrantUsed.value,
  (first, second) => {
    selectedGrantLeft.value = selectedGrantAmount.value - selectedGrantUsed.value
  }
);


watch(
  () => totalDealSize.value,
  (first, second) => {
    if (first != second) {
      computedTileData_two.value = [
        {
          "title": "Grant Amount Used",
          "style": "#1A3972",
          "amount": parseFloat(totalGrantUsedValue.value).toFixed(2),
          "percentage": `${TotalGrantUsedPercentageDealSize.value}`
        },
        {
          "title": "Grant Amount Left",
          "style": "#9747FF",
          "amount": parseFloat(totalGrantLeft.value).toFixed(2),
          "percentage": `${TotalGrantLeftPercentageDealSize.value}`
        }
      ];
    }
  }
);

const computedTileData2 = computed(() => {
  next3()
  if (filteredSelectedCurrency.value != "" && filteredSelectedCurrency.value && filteredSelectedCurrency.value != "All") {
    grant.value = grant.value.filter(o => o.currency == filteredSelectedCurrency.value)
  }

  if (filteredSelectedDevelopmentPartner.value != "" && filteredSelectedDevelopmentPartner.value && filteredSelectedDevelopmentPartner.value != "All") {
    grant.value = grant.value.filter(o => o.development_partner == filteredSelectedDevelopmentPartner.value)
  }


  if (filteredSelectedGrantType.value != "" && filteredSelectedGrantType.value && filteredSelectedGrantType.value != "All") {
    grant.value = grant.value.filter(o => o.grant_type == filteredSelectedGrantType.value)
  }

  let EurList = grant.value.filter(o => o.currency == 'EUR')
  let USDList = grant.value.filter(o => o.currency == 'USD')

  const cartPricesArrayStringEUR = EurList.map(function (item) {
    return item.total_grant_amount;
  });


  const cartPricesArrayStringUSD = USDList.map(function (item) {
    return item.total_grant_amount;
  });

  const cartPricesArrayStringGrantUsed = grant.value.map(function (item) {
    return item.total_grant_used;
  });

  const cartPricesArrayStringGrantAmount = grant.value.map(function (item) {
    return item.total_grant_amount;
  });

  totalUSDValue.value = cartPricesArrayStringUSD.reduce((partialSum, a) => (partialSum + a), 0);
  totalEURValue.value = cartPricesArrayStringEUR.reduce((partialSum, a) => (partialSum + a), 0);
  totalGrantUsedValue.value = cartPricesArrayStringGrantUsed.reduce((partialSum, a) => (partialSum + a), 0);
  totalGrantAmountValue.value = cartPricesArrayStringGrantAmount.reduce((partialSum, a) => (partialSum + a), 0);


  totalDealSize.value = parseInt(totalEURValue.value) + parseInt(totalUSDValue.value)
  EURPercentageDealSize.value = ((totalEURValue.value / totalDealSize.value) * 100).toFixed(0);
  USDPercentageDealSize.value = ((totalUSDValue.value / totalDealSize.value) * 100).toFixed(0);
  totalGrantLeft.value = totalGrantAmountValue.value - totalGrantUsedValue.value
  TotalGrantLeftPercentageDealSize.value = ((totalGrantLeft.value / totalGrantAmountValue.value) * 100).toFixed(0);
  TotalGrantUsedPercentageDealSize.value = ((totalGrantUsedValue.value / totalGrantAmountValue.value) * 100).toFixed(0);


  return grant.value
});

const createNewGrant = (isCorrect) => {
  openModal.value = isCorrect;
};

const close = async () => {
  guaranteeShow.value = false;
  green_AmberShow.value = false;
  greenShow.value = false;
  originationShow.value = false;
  dialogTransactionList.value = false;
};

</script>

<template>
  <div class="main">
    <v-dialog v-model="openModal" transition="slide-y-transiion" width="1050" @click:outside="close">
      <v-card style="padding: 20px">
        <h5 class="mt-3">Add Grant</h5>
        <div>
          <v-row class="mt-2">
            <v-col cols="4" sm="3">
              <label>Development Partner</label>
              <v-select :items="['AFD', 'FSD Africa', 'KFW', 'PIDG']" density="compact" variant="outlined"
                v-model="selectedDevelopmentPartner"></v-select>
            </v-col>

            <v-col cols="4" sm="3">
              <label>Client Name</label>
              <v-select :items="['AFD', 'FSD Africa', 'KFW', 'PIDG']" density="compact" variant="outlined"
                v-model="selectedClientName"></v-select>
            </v-col>

            <v-col cols="4" sm="3">
              <label>Transaction Name</label>
              <v-text-field variant="outlined" density="compact" v-model="transactionName"></v-text-field>
            </v-col>

            <v-col cols="4" sm="3">
              <label>Currency</label>
              <v-select :items="['EUR', 'USD']" density="compact" variant="outlined"
                v-model="selectedCurrency"></v-select>
            </v-col>
          </v-row>

          <v-row class="mt-3">
            <v-col cols="4" sm="3">
              <label>Grant Type</label>
              <v-select :items="['Non Returnable', 'Returnable']" density="compact" variant="outlined"
                v-model="selectedGrantType"></v-select>
            </v-col>

            <v-col cols="4" sm="3">
              <label>Total Grant Amount</label>
              <v-text-field variant="outlined" density="compact" type="number"
                v-model="selectedGrantAmount"></v-text-field>
            </v-col>

            <v-col cols="4" sm="3">
              <label>Total Grant Used</label>
              <v-text-field variant="outlined" density="compact" type="number" v-model="selectedGrantUsed"></v-text-field>
            </v-col>
            <v-col cols="4" sm="3">
              <label>Total Grant Left</label>
              <v-text-field variant="outlined" density="compact" type="number" v-model="selectedGrantLeft" disabled></v-text-field>
            </v-col>
          </v-row>

          <label>Purpose of Grant</label>

          <v-row class="mt-3 ml-0">
              <v-textarea variant="outlined" no-resize rows="5" v-model="purposeofGrant"></v-textarea>
          </v-row>
        </div>
        <div class="d-flex" style="justify-content: end">
          <v-card-actions>
            <v-btn color="blue-darken-1" variant="text" v-if="isEdit == false" @click="saveGrant()">
              Save
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" v-else @click="saveEdit()">
              Save
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="openModal = false">
              Close
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
    <div class="mt-3">
      <ToolBarCESGrant @createGrant="createNewGrant" />
    </div>
    <div class="d-flex justify-content-between gap-4">
      <div class="utilization-form box-padded" style="width: 100%">
        <div class="">
          <label>Currency</label>
          <v-select :items="['All', 'EUR', 'USD']" density="compact" variant="outlined"
            v-model="filteredSelectedCurrency"></v-select>
        </div>
        <div class="mt-3">
          <label>Development Partner</label>
          <v-select :items="['All', 'AFD', 'FSD Africa', 'KFW', 'PIDG']" density="compact" variant="outlined"
            v-model="filteredSelectedDevelopmentPartner"></v-select>
        </div>
        <div class="mt-3">
          <label>Grant Type</label>
          <v-select :items="['All', 'Non Returnable', 'Returnable']" density="compact" variant="outlined"
            v-model="filteredSelectedGrantType"></v-select>
        </div>
      </div>

      <div class="chart-box-3 box-padded">
        <h4 class="box-title">Grant Amount by Currency</h4>
        <PieChartStage chart-id="dealSizes" :fontColor="'#000000'" :doughnut="true" :chartData="computedTileData_one" />
      </div>

      <div class="chart-box-3 box-padded">
        <h4 class="box-title">Amount Used and Amount Left</h4>
        <PieChartStage2 chart-id="dealSizes2" :fontColor="'#000000'" :doughnut="true" :chartData="computedTileData_two" />
      </div>
    </div>

    <div class="box-padded">
      <div class="mt-3">
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
                    <span> Development Partner </span>
                    <span class="d-flex flex-column align-center">
                      <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                      <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                    </span>
                  </div>
                </th>

                <th scope="col" style="background-color: #227CBF;color: white;">
                  <div class="d-flex align-center gap-1">
                    <span> Client </span>
                    <span class="d-flex flex-column align-center">
                      <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                      <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                    </span>
                  </div>
                </th>
                <th scope="col" style="background-color: #227CBF;color: white;">
                  <div class="d-flex align-center gap-1">
                    <span>Transaction Name </span>
                    <span class="d-flex flex-column align-center">
                      <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                      <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                    </span>
                  </div>
                </th>
                <th scope="col" style="background-color: #227CBF;color: white;">
                  <div class="d-flex align-center gap-1">
                    <span>Currency </span>
                    <span class="d-flex flex-column align-center">
                      <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                      <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                    </span>
                  </div>
                </th>
                <th scope="col" style="background-color: #227CBF;color: white;">
                  <div class="d-flex align-center gap-1">
                    <span>Grant Type </span>
                    <span class="d-flex flex-column align-center">
                      <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                      <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                    </span>
                  </div>
                </th>
                <th scope="col" style="background-color: #227CBF;color: white;">
                  <div class="d-flex align-center gap-1">
                    <span>Total Grant Amount </span>
                    <span class="d-flex flex-column align-center">
                      <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                      <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                    </span>
                  </div>
                </th>
                <th scope="col" style="background-color: #227CBF;color: white;">
                  <div class="d-flex align-center gap-1">
                    <span>Total Grant Used </span>
                    <span class="d-flex flex-column align-center">
                      <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                      <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                    </span>
                  </div>
                </th>
                <th scope="col" style="background-color: #227CBF;color: white;">
                  <div class="d-flex align-center gap-1">
                    <span>Total Grant Left </span>
                    <span class="d-flex flex-column align-center">
                      <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                      <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                    </span>
                  </div>
                </th>
                <th scope="col" style="background-color: #227CBF;color: white;">
                  <div class="d-flex align-center gap-1">
                    <span>Purpose of Grant </span>
                    <span class="d-flex flex-column align-center">
                      <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                      <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(i, index) in computedTileData2" @click="editGrants(i.uuid)">
                <td scope="row">{{ index + 1 }}</td>
                <td>{{ i.development_partner }}</td>
                <td>{{ i.client_name }}</td>
                <td>{{ i.transaction_name }}</td>
                <td>{{ i.currency }}</td>
                <td>{{ i.grant_type }}</td>
                <td>{{ i.total_grant_amount }}</td>
                <td>{{ i.total_grant_used }}</td>
                <td>{{ i.total_grant_left }} </td>
                <td>{{ i.purpose_of_grant }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
}

.targets {
  width: 24%;
}

.chart-box-3 {
  width: 30%;
}

.chart-container {
  min-height: 400px;
}

.utilization-form {
  .field {
    h4 {
      font-size: 14px;
      font-weight: bold;
    }
  }

  .field .dropdown {
    width: 100%;
    border: 1px solid #eee;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;

    .default {
      color: #888;
    }
  }

  .field .options {
    display: block;
    background: #fff;
    box-shadow: 0 3px 5px 0 rgb(0, 0, 0, 0.25);
    margin: 0;
    padding: 0;
    z-index: 9;

    &.active {
      display: block;
    }

    li {
      padding: 0.5rem;
      display: flex;
      justify-content: flex-start;

      input {
        margin-right: 0.5rem;
      }
    }
  }
}

.piechart {
  margin: 0rem 1rem 0rem 1rem;
  justify-content: center;
  height: 100%;

  .deal-size-sector {
    display: grid;
    place-items: center;
  }

  h4 {
    font-size: 16px;
    font-weight: 600;
  }

  .deal-summary {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 25% 25% 25% 25%;
    margin-top: 1rem;

    li {
      display: flex;
      align-items: center;

      .color-label {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin: 0 5px;
        background: var(--color);
      }
    }
  }
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
</style>

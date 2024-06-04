<script setup>
import Breadcrumb from "../../components/Breadcrumb.vue";
import { ref, onMounted } from "vue";

import { useRoute } from "vue-router";
import TransactionUpdate from "../../components/Cards/TransactionUpdate.vue";
import DealCategory from "../../components/Cards/DealCategory.vue";
import DealProfile from "../../components/Cards/DealProfile.vue";
import NBCFocusArea from "../../components/Cards/NBCFocusArea.vue";
import Fees from "../../components/Cards/Fees.vue";
import TransactionParties from "../../components/Cards/TransactionParties.vue";
import PerformanceIndicators from "../../components/Cards/PerformanceIndicators.vue";
import OtherConditions from "../../components/Cards/OtherConditions.vue";
import KeyDealsFactors from "../../components/Cards/KeyDealsFactors.vue";
import Amortization from "../../components/Cards/Amortization.vue";
import OtherFocusAreas from "../../components/Cards/OtherFocusAreas.vue";
import CreditCommitteeFocusAreas from "../../components/Cards/CreditCommitteeFocusAreas.vue";
import Stepper from "bs-stepper";
import TRMSService from "../../services/trmsService";

const route = useRoute();
const dealOpened = ref([]);
const num1 = ref(1);
const step1 = ref(null);
var stepper1 = ref("");
const idx = ref("");
const companyName = ref("");
const companyId = ref("");
const dealId = ref("");
const saveTransactionUpdate = ref("");
const saveDealProfile = ref("");
const saveFees = ref("");
const saveDealCategory = ref("");
const saveNBCFocusArea = ref("");
const saveOtherFocusArea = ref("");
const saveccFocusAreas = ref("");
const saveTransactionParties = ref("");
const savePerformanceIndicators = ref("");
const saveOtherConditions = ref("");
const saveKeyDealFactors = ref("");
const saveAmoritization = ref("");
const dealGrade = ref("RED");
idx.value = route.params.id2;

onMounted(async () => {
  var stepper1Node = document.querySelector("#stepper1");
  stepper1.value = new Stepper(step1.value, {
    linear: false,
    animation: true,
  });
  stepper1Node.addEventListener("show.bs-stepper", function (event) {
    console.warn("show.bs-stepper", event);
  });
  stepper1Node.addEventListener("shown.bs-stepper", function (event) {
    console.warn("shown.bs-stepper", event);
  });

  let allDeals = await TRMSService.getDeals();
  dealOpened.value = allDeals.find((o) => o.dealId === idx.value);
  if (dealOpened.value != undefined) {
    companyName.value = dealOpened.value.companyName;
    dealId.value = dealOpened.value.dealId;
    companyId.value = dealOpened.value.companyId;
    dealGrade.value = dealOpened.value.dealCategory;
  }
  if (dealOpened.value == undefined) {
    companyName.value = "New";
  }
});

const next = (id) => {
  stepper1.value.next();
  if (id == 2) {
    saveTransactionUpdate.value = true;
  } else if (id == 3) {
    saveDealProfile.value = true;
  } else if (id == 4) {
    saveFees.value = true;
  } else if (id == 5) {
    saveDealCategory.value = true;
  } else if (id == 6) {
    saveNBCFocusArea.value = true;
  } else if (id == 7) {
    saveOtherFocusArea.value = true;
  } else if (id == 8) {
    saveccFocusAreas.value = true;
  } else if (id == 9) {
    saveTransactionParties.value = true;
  } else if (id == 10) {
    savePerformanceIndicators.value = true;
  } else if (id == 11) {
    saveOtherConditions.value = true;
  } else if (id == 12) {
    saveKeyDealFactors.value = true;
  } else if (id == 13) {
    saveAmoritization.value = true;
  }
};
const previous = () => {
  stepper1.value.previous();
};
const styleBackground = () => {
  if (num1.value > 1) {
    return "background-color: #007BFF";
  }
};
const styleBackground2 = () => {
  if (num1.value > 2) {
    return "background-color: #007BFF";
  }
};
const styleBackground3 = () => {
  if (num1.value > 3) {
    return "background-color: #007BFF";
  }
};
const styleBackground4 = () => {
  if (num1.value > 4) {
    return "background-color: #007BFF";
  }
};
const styleBackground5 = () => {
  if (num1.value > 5) {
    return "background-color: #007BFF";
  }
};
const styleBackground6 = () => {
  if (num1.value > 6) {
    return "background-color: #007BFF";
  }
};
const styleBackground7 = () => {
  if (num1.value > 7) {
    return "background-color: #007BFF";
  }
};
const styleBackground8 = () => {
  if (num1.value > 8) {
    return "background-color: #007BFF";
  }
};
const styleBackground9 = () => {
  if (num1.value > 9) {
    return "background-color: #007BFF";
  }
};
const styleBackground10 = () => {
  if (num1.value > 10) {
    return "background-color: #007BFF";
  }
};
const styleBackground11 = () => {
  if (num1.value > 11) {
    return "background-color: #007BFF";
  }
};
const styleBackground12 = () => {
  if (num1.value > 12) {
    return "background-color: #007BFF";
  }
};
</script>

<template>
  <div class="wrapper">
    <div class="Breadcrumb">
      <Breadcrumb
        menu="TRMS"
        submenu="Portfolio Deals"
        :title="companyName"
        style="margin-left: -50px"
        :grade="dealGrade"
      />
      <div class="d-flex justify-content-between align-center">
        <div class="d-flex align-center gap-1">
          <h4>{{ companyName }}</h4>
        </div>
        <small> {{ dealId }}</small>
      </div>
    </div>
  </div>
  <div class="wrapper" style="margin-top: -35px">
    <div id="stepper1" class="bs-stepper" ref="step1">
      <div class="bs-stepper-header mb-2" style="overflow: auto" id="style-4">
        <div class="step" data-target="#test-l-1" @click="num1 = 1">
          <button type="button" class="btn step-trigger">
            <span class="bs-stepper-circle" :style="styleBackground()">
              <v-icon style="padding-bottom: 10px !important"
                >mdi-card-account-mail</v-icon
              >
            </span>
            <span class="bs-stepper-label">Transaction Team Info</span>
          </button>
        </div>
        <div class="line" v-if="num1 < 2"></div>
        <div
          class="line"
          style="
            background-color: #024a97;
            border: 1px solid #007bff;
            border-radius: 10px;
          "
          v-else
        ></div>
        <div class="step" data-target="#test-l-2" @click="num1 = 2">
          <button type="button" class="btn step-trigger">
            <span class="bs-stepper-circle" :style="styleBackground2()">
              <v-icon style="padding-bottom: 10px !important"
                >mdi-microsoft-teams</v-icon
              >
            </span>
            <span class="bs-stepper-label">Deal Profile</span>
          </button>
        </div>

        <div class="line" v-if="num1 < 3"></div>
        <div
          class="line"
          style="
            background-color: #007bff;
            border: 1px solid #007bff;
            border-radius: 10px;
          "
          v-else
        ></div>
        <div class="step" data-target="#test-l-3" @click="num1 = 3">
          <button type="button" class="btn step-trigger">
            <span class="bs-stepper-circle" :style="styleBackground3()">
              <v-icon style="padding-bottom: 10px !important"
                >mdi-cash-check</v-icon
              >
            </span>
            <span class="bs-stepper-label">Fees</span>
          </button>
        </div>

        <div class="line" v-if="num1 < 4"></div>
        <div
          class="line"
          style="
            background-color: #007bff;
            border: 1px solid #007bff;
            border-radius: 10px;
          "
          v-else
        ></div>
        <div class="step" data-target="#test-l-4" @click="num1 = 4">
          <button type="button" class="btn step-trigger">
            <span class="bs-stepper-circle" :style="styleBackground4()">
              <v-icon style="padding-bottom: 10px !important"
                >mdi-handshake</v-icon
              >
            </span>
            <span class="bs-stepper-label">Deal Category</span>
          </button>
        </div>

        <div class="line" v-if="num1 < 5"></div>
        <div
          class="line"
          style="
            background-color: #007bff;
            border: 1px solid #007bff;
            border-radius: 10px;
          "
          v-else
        ></div>
        <div class="step" data-target="#test-l-5" @click="num1 = 5">
          <button type="button" class="btn step-trigger">
            <span class="bs-stepper-circle" :style="styleBackground5()">
              <v-icon style="padding-bottom: 10px !important"
                >mdi-magnify-expand</v-icon
              >
            </span>
            <span class="bs-stepper-label">NBC Focus Area</span>
          </button>
        </div>

        <div class="line" v-if="num1 < 6"></div>
        <div
          class="line"
          style="
            background-color: #007bff;
            border: 1px solid #007bff;
            border-radius: 10px;
          "
          v-else
        ></div>
        <div class="step" data-target="#test-l-6" @click="num1 = 6">
          <button type="button" class="btn step-trigger">
            <span class="bs-stepper-circle" :style="styleBackground6()">
              <v-icon style="padding-bottom: 10px !important"
                >mdi-magnify</v-icon
              >
            </span>
            <span class="bs-stepper-label">Other Focus Areas</span>
          </button>
        </div>

        <div class="line" v-if="num1 < 7"></div>
        <div
          class="line"
          style="
            background-color: #007bff;
            border: 1px solid #007bff;
            border-radius: 10px;
          "
          v-else
        ></div>
        <div class="step" data-target="#test-l-7" @click="num1 = 7">
          <button type="button" class="btn step-trigger">
            <span class="bs-stepper-circle" :style="styleBackground7()">
              <v-icon style="padding-bottom: 10px !important"
                >mdi-account-credit-card</v-icon
              >
            </span>
            <span class="bs-stepper-label">Credit Committee Focus Area</span>
          </button>
        </div>

        <div class="line" v-if="num1 < 8"></div>
        <div
          class="line"
          style="
            background-color: #007bff;
            border: 1px solid #007bff;
            border-radius: 10px;
          "
          v-else
        ></div>
        <div class="step" data-target="#test-l-8" @click="num1 = 8">
          <button type="button" class="btn step-trigger">
            <span class="bs-stepper-circle" :style="styleBackground8()">
              <v-icon style="padding-bottom: 10px !important"
                >mdi-account-group</v-icon
              >
            </span>
            <span class="bs-stepper-label">Transaction Parties </span>
          </button>
        </div>

        <div class="line" v-if="num1 < 9"></div>
        <div
          class="line"
          style="
            background-color: #007bff;
            border: 1px solid #007bff;
            border-radius: 10px;
          "
          v-else
        ></div>
        <div class="step" data-target="#test-l-9" @click="num1 = 9">
          <button type="button" class="btn step-trigger">
            <span class="bs-stepper-circle" :style="styleBackground9()">
              <v-icon style="padding-bottom: 10px !important">mdi-poll</v-icon>
            </span>
            <span class="bs-stepper-label">Performance Indicators</span>
          </button>
        </div>

        <div class="line" v-if="num1 < 10"></div>
        <div
          class="line"
          style="
            background-color: #007bff;
            border: 1px solid #007bff;
            border-radius: 10px;
          "
          v-else
        ></div>
        <div class="step" data-target="#test-l-10" @click="num1 = 10">
          <button type="button" class="btn step-trigger">
            <span class="bs-stepper-circle" :style="styleBackground10()">
              <v-icon style="padding-bottom: 10px !important"
                >mdi-check-all</v-icon
              >
            </span>
            <span class="bs-stepper-label">Other Conditions</span>
          </button>
        </div>

        <div class="line" v-if="num1 < 11"></div>
        <div
          class="line"
          style="
            background-color: #007bff;
            border: 1px solid #007bff;
            border-radius: 10px;
          "
          v-else
        ></div>
        <div class="step" data-target="#test-l-11" @click="num1 = 11">
          <button type="button" class="btn step-trigger">
            <span class="bs-stepper-circle" :style="styleBackground11()">
              <v-icon style="padding-bottom: 10px !important"
                >mdi-key-alert</v-icon
              >
            </span>
            <span class="bs-stepper-label">Key Deals Factors</span>
          </button>
        </div>

        <div class="line" v-if="num1 < 12"></div>
        <div
          class="line"
          style="
            background-color: #007bff;
            border: 1px solid #007bff;
            border-radius: 10px;
          "
          v-else
        ></div>
        <div class="step" data-target="#test-l-12" @click="num1 = 12">
          <button type="button" class="btn step-trigger">
            <span class="bs-stepper-circle" :style="styleBackground12()">
              <v-icon style="padding-bottom: 10px !important"
                >mdi-sign-text</v-icon
              >
            </span>
            <span class="bs-stepper-label">Amortization</span>
          </button>
        </div>
      </div>
      <div
        class="bs-stepper-content"
        style="margin-left: -20px; margin-right: -20px"
      >
        <div id="test-l-1" class="content">
          <v-card title="Transaction Team Info">
            <div class="details box-padded">
              <TransactionUpdate
                column="col-6"
                :button="false"
                :selectedDealDetails="dealOpened"
                :saveValue="saveTransactionUpdate"
                :isNew="dealId"
                :notEdit="true"
              />
            </div>
          </v-card>
          <div class="d-flex justify-content-end mt-3 gap-3">
            <button
              class="submit-button"
              @click="
                next(2);
                num1 = 2;
              "
            >
              Update/Next
            </button>
          </div>
        </div>
        <div id="test-l-2" class="content">
          <v-card title="Deal Profile" flat>
            <div class="dealteam box-padded">
              <DealProfile
                column="col-3"
                :selectedDealDetails="dealOpened"
                :saveValue="saveDealProfile"
                :isNew="dealId"
                :notEdit="true"
              />
            </div>
          </v-card>
          <div class="d-flex justify-content-end mt-3 gap-3">
            <button
              class="submit-button-back"
              @click="
                previous();
                num1 = 1;
              "
            >
              Previous
            </button>
            <button
              class="submit-button"
              @click="
                next(3);
                num1 = 3;
              "
            >
              Update/Next
            </button>
          </div>
        </div>
        <div id="test-l-3" class="content">
          <v-card title="Fees" flat>
            <div class="otherdetails box-padded">
              <Fees
                column="col-6"
                :button="false"
                :selectedDealDetails="dealOpened"
                :saveValue="saveFees"
                :notEdit="true"
              />
            </div>
          </v-card>
          <div class="d-flex justify-content-end mt-3 gap-3">
            <button
              class="submit-button-back"
              @click="
                previous();
                num1 = 2;
              "
            >
              Previous
            </button>
            <button
              class="submit-button"
              @click="
                next(4);
                num1 = 4;
              "
            >
              Update/Next
            </button>
          </div>
        </div>
        <div id="test-l-4" class="content">
          <v-card title="Deal Category" flat>
            <div class="otherdetails box-padded">
              <DealCategory
                :button="false"
                :selectedDealDetails="dealOpened"
                :saveValue="saveDealCategory"
                :isNew="dealId"
                :notEdit="true"
              />
            </div>
          </v-card>
          <div class="d-flex justify-content-end mt-3 gap-3">
            <button
              class="submit-button-back"
              @click="
                previous();
                num1 = 3;
              "
            >
              Previous
            </button>
            <button
              class="submit-button"
              @click="
                next(5);
                num1 = 5;
              "
            >
              Update/Next
            </button>
          </div>
        </div>
        <div id="test-l-5" class="content">
          <v-card title="NBC Focus Area" flat>
            <div class="otherdetails box-padded">
              <NBCFocusArea
                column="col-6"
                :button="false"
                :selectedDealDetails="dealOpened"
                :saveValue="saveNBCFocusArea"
                :isNew="dealId"
                :notEdit="true"
              />
            </div>
          </v-card>
          <div class="d-flex justify-content-end mt-3 gap-3">
            <button
              class="submit-button-back"
              @click="
                previous();
                num1 = 4;
              "
            >
              Previous
            </button>
            <button
              class="submit-button"
              @click="
                next(6);
                num1 = 6;
              "
            >
              Update/Next
            </button>
          </div>
        </div>
        <div id="test-l-6" class="content">
          <v-card title="Other Focus Area" flat>
            <div class="otherdetails box-padded">
              <OtherFocusAreas
                column="col-6"
                :button="false"
                :selectedDealDetails="dealOpened"
                :saveValue="saveOtherFocusArea"
                :isNew="dealId"
                :notEdit="true"
              />
            </div>
          </v-card>
          <div class="d-flex justify-content-end mt-3 gap-3">
            <button
              class="submit-button-back"
              @click="
                previous();
                num1 = 5;
              "
            >
              Previous
            </button>
            <button class="submit-button" @click="next(7)">Update/Next</button>
          </div>
        </div>
        <div id="test-l-7" class="content">
          <v-card title="Credit Committee Focus Area" flat>
            <div class="otherdetails box-padded">
              <CreditCommitteeFocusAreas
                column="col-6"
                :button="false"
                :selectedDealDetails="dealOpened"
                :saveValue="saveccFocusAreas"
                :isNew="dealId"
                :notEdit="true"
              />
            </div>
          </v-card>
          <div class="d-flex justify-content-end mt-3 gap-3">
            <button
              class="submit-button-back"
              @click="
                previous();
                num1 = 5;
              "
            >
              Previous
            </button>
            <button class="submit-button" @click="next(8)">Update/Next</button>
          </div>
        </div>
        <div id="test-l-8" class="content">
          <v-card title="Transaction Parties" flat>
            <div class="otherdetails box-padded">
              <TransactionParties
                column="col-6"
                :button="false"
                :selectedDealDetails="dealOpened"
                :saveValue="saveTransactionParties"
                :isNew="dealId"
                :notEdit="true"
              />
            </div>
          </v-card>
          <div class="d-flex justify-content-end mt-3 gap-3">
            <button
              class="submit-button-back"
              @click="
                previous();
                num1 = 5;
              "
            >
              Previous
            </button>
            <button class="submit-button" @click="next(9)">Update/Next</button>
          </div>
        </div>
        <div id="test-l-9" class="content">
          <v-card title="Performance Indicators" flat>
            <div class="otherdetails box-padded">
              <PerformanceIndicators
                column="col-6"
                :button="false"
                :selectedDealDetails="dealOpened"
                :saveValue="savePerformanceIndicators"
                :isNew="dealId"
                :notEdit="true"
              />
            </div>
          </v-card>
          <div class="d-flex justify-content-end mt-3 gap-3">
            <button
              class="submit-button-back"
              @click="
                previous();
                num1 = 5;
              "
            >
              Previous
            </button>
            <button class="submit-button" @click="next(10)">Update/Next</button>
          </div>
        </div>
        <div id="test-l-10" class="content">
          <v-card title="Other Conditions Precedent" flat>
            <div class="otherdetails box-padded">
              <OtherConditions
                column="col-6"
                :button="false"
                :selectedDealDetails="dealOpened"
                :saveValue="saveOtherConditions"
                :isNew="dealId"
                :notEdit="true"
              />
            </div>
          </v-card>
          <div class="d-flex justify-content-end mt-3 gap-3">
            <button
              class="submit-button-back"
              @click="
                previous();
                num1 = 5;
              "
            >
              Previous
            </button>
            <button class="submit-button" @click="next(11)">Update/Next</button>
          </div>
        </div>
        <div id="test-l-11" class="content">
          <v-card title="Key Deals Factors" flat>
            <div class="otherdetails box-padded">
              <KeyDealsFactors
                column="col-6"
                :button="false"
                :selectedDealDetails="dealOpened"
                :saveValue="saveKeyDealFactors"
                :isNew="dealId"
                :notEdit="true"
              />
            </div>
          </v-card>
          <div class="d-flex justify-content-end mt-3 gap-3">
            <button
              class="submit-button-back"
              @click="
                previous();
                num1 = 5;
              "
            >
              Previous
            </button>
            <button class="submit-button" @click="next(12)">Update/Next</button>
          </div>
        </div>
        <div id="test-l-12" class="content">
          <v-card title="Amortization" flat>
            <div class="otherdetails box-padded">
              <Amortization
                column="col-6"
                :button="false"
                :selectedDealDetails="dealOpened"
                :saveValue="saveAmoritization"
                :isNew="dealId"
                :notEdit="true"
              />
            </div>
          </v-card>
          <div class="d-flex justify-content-end mt-3 gap-3">
            <button
              class="submit-button-back"
              @click="
                previous();
                num1 = 5;
              "
            >
              Previous
            </button>
            <button class="submit-button" @click="next(13)">Update</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 20px 50px;
  background: #fafafb;
}

.box-padded {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #ffffff;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

div h4 {
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin: 0;
}

.grid-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(5, auto);
  grid-template-areas:
    "det chk fe"
    "dt  dt fe"
    "oth oth fe"
    ". . fe";
  gap: 20px;
}

.details {
  grid-area: det;
}

.checklist {
  grid-area: chk;
}

.dealteam {
  grid-area: dt;
}

.fees {
  grid-area: fe;
}

#style-4::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background: #fff;
}

#style-4::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  border-radius: 25px;
  position: absolute;
  z-index: -1;
}

#style-4::-webkit-scrollbar-thumb {
  background: #555;
  position: absolute;
  border-radius: 10px;
  z-index: -1;
}

.otherdetails {
  grid-area: oth;
}
</style>

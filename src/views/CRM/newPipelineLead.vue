<script setup>
import SubHeader1 from '../../components/SubHeaderCRM.vue'
import Details from '../../components/Cards/DetailsCard.vue'
import DealTeamCard from '../../components/Cards/DealTeamCard.vue'
import Stepper from 'bs-stepper'
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router'
import settingsServices from '../../services/settingsServices'
import CRMService from '../../services/crmService'
import { useDashOptionStore } from "../../stores/dashOption"
import pinia from "../../stores/store";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const stores = useDashOptionStore(pinia);
const route = useRoute()
const leadType = ref('')
if (route.params.id == 'pipelineLeads') {
    leadType.value = 'Pipeline Projects'
}
else if (route.params.id == 'mandatedLeads') {
    leadType.value = 'Mandated Clients'
}

const num1 = ref(1)
const dialogTimeline = ref(false)
const step1 = ref(null)
var stepper1 = ref('')
const leadSources = ref([])
const regions = ref([])
const industries = ref([])
const sectors = ref([])
const company = ref([])
const leadOpened = ref([])
const companyName = ref('')
const activityDescription = ref('')
const companyId = ref('')
const contactId = ref('')
const idx = ref('')
const selectedActivityStatus = ref('')
const activityDetails = ref('')
const saveDetails = ref(false)
const saveDealTeam = ref(false)
const loader = ref(false)
const activityTypes = ref([])
const selectedActivityType = ref([])
const products = ref([])
idx.value = route.params.id2

onMounted(async () => {
    var stepper1Node = document.querySelector('#stepper1')
    stepper1.value = new Stepper(step1.value, {
        linear: false,
        animation: true
    })
    stepper1Node.addEventListener('show.bs-stepper', function (event) {
    })
    stepper1Node.addEventListener('shown.bs-stepper', function (event) {
    })
    sectors.value = await settingsServices.getIndustries()
    company.value = await CRMService.getCompanies()
    leadSources.value = await settingsServices.getLeadSources()
    industries.value = await settingsServices.getIndustries()
    regions.value = await settingsServices.getLeadSources()
    products.value = await settingsServices.getProducts()
    companyName.value = 'New'
});

const next = (id) => {
    stepper1.value.next()
    if (id == 2) {
        saveDetails.value = true
    }
    else if (id == 3) {
        saveDealTeam.value = true
    }
}
const previous = () => {
    stepper1.value.previous()
}
const styleBackground = () => {
    if (num1.value > 1) {
        return 'background-color: #007BFF'
    }
}
const styleBackground2 = () => {
    if (num1.value > 2) {
        return 'background-color: #007BFF'
    }
}

const onSaveNewChanged = (isCorrect) => {
    loader.value = isCorrect
}

const onSaveValueChanged = (isCorrect) => {
    saveDetails.value = isCorrect
    saveDealTeam.value = isCorrect
}
</script>

<template>
    <div class="wrapper grid-wrapper">
        <div class="Breadcrumb">
            <SubHeader1 :title="leadType" :companyName="companyName" />
            <div class="intro-text">
                <div class="d-flex justify-content-between align-center">
                    <div class="d-flex align-center gap-1">
                        <h4> </h4>
                    </div>
                    <small>{{ idx }}</small>
                </div>
            </div>
        </div>
    </div>
    <div class="wrapper" style="margin-top: -35px;">
        <v-dialog v-model="dialogTimeline" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="text-h5 ml-3">Add to TimeLine </span>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-select :items="activityTypes" density="compact" variant="outlined" label="Activity Type"
                                item-title="name" item-value="id" v-model="selectedActivityType"></v-select>
                            <v-text-field v-model="activityDescription" label="Subject" variant="outlined"></v-text-field>
                            <v-textarea v-model="activityDetails" label="Details" variant="outlined"></v-textarea>
                            <v-select :items="['Pending', 'Completed']" density="compact" variant="outlined"
                                label="Activity Status" v-model="selectedActivityStatus"></v-select>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="dialogTimeline = false">
                        Cancel
                    </v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="saveActivityType">Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <div id="stepper1" class="bs-stepper" ref="step1">
            <div class="bs-stepper-header mb-2" style="overflow: auto;">
                <div class="step" data-target="#test-l-1" @click="num1 = 1">
                    <button type="button" class="btn step-trigger">
                        <span class="bs-stepper-circle" :style="styleBackground()">
                            <v-icon style="padding-bottom: 10px !important;">mdi-card-account-mail</v-icon>
                        </span>
                        <span class="bs-stepper-label">Contact Details</span>
                    </button>
                </div>
                <div class="line" v-if="num1 < 2"></div>
                <div class="line" style="background-color: #024a97; border: 1px solid #007BFF; border-radius: 10px;" v-else>
                </div>
                <div class="step" data-target="#test-l-2" @click="num1 = 2">
                    <button type="button" class="btn step-trigger">
                        <span class="bs-stepper-circle" :style="styleBackground2()">
                            <v-icon style="padding-bottom: 10px !important;">mdi-microsoft-teams</v-icon>
                        </span>
                        <span class="bs-stepper-label">Deal Team</span>
                    </button>
                </div>
   
            </div>
            <div class="bs-stepper-content">
                <div id="test-l-1" class="content">
                    <v-card title=" Contact Details">
                        <div class="details box-padded">
                            <Details columns='3' :buttons="false" :leadSource="leadSources" :sectorList="sectors" :product-list="products"
                                :companyList="company" :leadDetails="leadOpened" :saveValue="saveDetails"
                                :isNew="companyName" />
                        </div>
                    </v-card>
                    <div class="d-flex justify-content-end mt-3 gap-3">
                        <button class="submit-button-back" @click="next(2); num1 = 2">Next</button>
                    </div>
                </div>
                <div id="test-l-2" class="content">
                    <v-card title="Deal Team" flat>
                        <div class="dealteam box-padded">
                            <DealTeamCard columns='3' :buttons="false" :leadDetails="leadOpened" :saveValue="saveDealTeam"
                                :isNew="companyName" @saveNew="onSaveNewChanged" @saveValue="onSaveValueChanged" />
                        </div>
                    </v-card>
                    <div class="d-flex justify-content-end mt-3 gap-3">
                        <v-btn class="submit-button-back" @click="previous(); num1 = 1">Previous</v-btn>
                        <v-btn class="submit-button-back" @click="next(3); num1 = 3; loader=true" :loading="loader">Create
                            Lead</v-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Details',
    data() {
        return {
            id: '',
        };
    },
    async created() {
        this.id = this.$route.params.id
    },
};
</script>
<style scoped>
.box-padded {
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 5px;
}

.wrapper {
    padding: 5px 50px;
    background: #fafafb;
}

div h4 {
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    margin: 0;
}

.grid-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(5, auto);
    grid-template-areas:
        "sub sub "
        "det  chk"
        "dt  chk"
        "oth oth"
        "file time"
    ;
    gap: 20px;
}

.Breadcrumb {
    grid-area: sub;
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

.filecard {
    grid-area: file;
}

.timecard {
    grid-area: time;
}

.otherdetails {
    grid-area: oth;
}</style>
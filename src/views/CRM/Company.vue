<script setup>
import { ref, onMounted, computed } from 'vue';
import TabMenu from '../../components/TabMenu.vue';
import ToolBar from '../../components/ToolBar.vue';
import TableCompany from '../../components/Tables/TableCompany.vue'
import CRMService from '../../services/crmService'
import pinia from "../../stores/store";
import { useDashOptionStore } from "../../stores/dashOption"
import settingsServices from '../../services/settingsServices';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import crmService from '../../services/crmService';

const stores = useDashOptionStore(pinia);
const companyiesData = ref([])
const industriesData = ref([])
const leadSourceData = ref([])
const contactsData = ref([])
const contactsData2 = ref([])
const regionsData = ref([])
const dialogOpen = ref(false)
const companyName = ref('')
const Address = ref('')
const city = ref('')
const postalCode = ref('')
const state = ref('')
const country = ref('')
const companyEmail = ref('')
const website = ref('')
const cacRegNum = ref('')
const tinNum = ref('')
const Industry = ref('')
const referredSourceName = ref('')
const leadSource = ref('')
const contacts = ref('')
const contactsSecondary = ref('')
const errorMessage = ref('')
const region = ref('')
const businessOwner = ref('')
const businessDescription = ref('')
const searchValue = ref('')
const filterOption = ref('')
const size = ref(20)
const pageNumber = ref(1)
const totalArrayValue = ref('')
const firstValue = ref('')
const secondValue = ref('')

onMounted(async () => {
    companyiesData.value = await CRMService.getCompanies()
    industriesData.value = await settingsServices.getIndustries()
    leadSourceData.value = await settingsServices.getLeadSources()
    contactsData.value = await crmService.getContacts()
    regionsData.value = await settingsServices.getRegions()
})
const createCompanySubmit = async () => {
    let ps = await CRMService.createCompanys(companyName.value, Address.value, city.value, postalCode.value, state.value, country.value, companyEmail.value, website.value, cacRegNum.value, tinNum.value, 0, Industry.value, referredSourceName.value, leadSource.value, contacts.value.contactId, contacts.value.contactFirstName, contacts.value.contactLastName, contacts.value.contactPhoneNo, contacts.value.contactOfficialEmailAddress, contactsSecondary.value.contactId, contactsSecondary.value.contactFirstName, contactsSecondary.value.contactLastName, contactsSecondary.value.contactPhoneNo, contactsSecondary.value.contactOfficialEmailAddress, stores.signedInUserEmail, stores.signedInUserEmail, new Date().toJSON(), new Date().toJSON(), stores.signedInUserEmail, region.value, businessOwner.value, businessDescription.value)
    if (ps == true) {
        toast.success("Company Created Successfully")
        setTimeout(async () => {
            dialogOpen.value = false
            companyiesData.value = await CRMService.getCompanies()
        }, 1500);
    }
    else {
        toast.error("An error Occured, try again")
    }
}
const checkValue = async (user) => {
    contactsData2.value = contactsData.value.filter(o => o.contactId != user.contactId)
}
const CompanyG = computed(() => {
    next()
    let companyList = companyiesData.value
    totalArrayValue.value = companyList.length
    // Process search input
    if (searchValue.value != '' && searchValue.value) {
        companyList = companyList.filter((item) => {
            return item.companyId
                .toLowerCase()
                .includes(searchValue.value.toLowerCase()) ||
                item.companyName.toLowerCase().includes(searchValue.value.toLowerCase())
        })
    }
    // Sort by alphabetical order
    companyList = companyList.sort((a, b) => {
        if (filterOption.value == 'asc') {
            let fa = a.companyName.toLowerCase(), fb = b.companyName.toLowerCase()

            if (fa > fb) {
                return 1
            }
            if (fa < fb) {
                return -1
            }
            return 0

        }
        else if (filterOption.value == 'dsc') {
            let fa = a.companyName.toLowerCase(), fb = b.companyName.toLowerCase()

            if (fa < fb) {
                return 1
            }
            if (fa > fb) {
                return -1
            }
            return 0

        }
    })

    if (companyList.length > 0) {
        companyList.forEach((element, index, array) => {
      array[index].count = index + 1
    });

    let ps = companyList.slice(indexStart.value, indexEnd.value)
    firstValue.value = ps[0].count;
    secondValue.value = ps[ps.length - 1].count
  }

    return companyList.slice(indexStart.value, indexEnd.value)
})

const pageCount = computed(() => {
  let l = totalArrayValue.value,
    s = size.value;
  return Math.ceil(l / s);
})

const indexStart = computed(() => {
    return (pageNumber.value - 1) * size.value;
})

const indexEnd = computed(() => {
    return indexStart.value + size.value;
})  

const next = async () => {
    companyiesData.value = await CRMService.getCompanies()
}

const onFilterSelected = (isCorrect) => {
    filterOption.value = isCorrect
}

const onSearchValuesEntered = (isCorrect) => {
    searchValue.value = isCorrect
}

const pageMovement = (isCorrect) => {
  if (isCorrect == 'Next') {
    pageNumber.value++;
  }
  else if (isCorrect == 'Previous') {
    pageNumber.value--;
  }
}
</script>

<template>
    <div class="wrapper" style="max-height: 100%;">
        <TabMenu />
        <div class="intro mt-4 d-flex justify-content-between mb-2">
            <h3> Companies </h3>
            <v-btn class="text-none" color="#298729" prepend-icon="mdi-office-building-marker-outline"
                @click="dialogOpen = true">
                Create Company
            </v-btn>
        </div>
        <v-dialog v-model="dialogOpen" transition="slide-y-transition" content-class="my-custom-dialog" height="100%"
            width="750">
            <v-card id="style-4">
                <v-card-title>
                    <div class="d-flex justify-content-between mt-3">
                        <span class="text-h5 ml-5">Create Company</span>
                        <p class="mr-5" style="cursor: pointer;" @click="dialogOpen = false">X</p>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-container style="margin-top: -30px">
                        <v-row>
                            <v-col cols="12" sm="6">
                                <label>Company name</label>
                                <v-text-field density="compact" variant="outlined" v-model="companyName"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <label>Address</label>
                                <v-text-field density="compact" variant="outlined" v-model="Address"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <label>City</label>
                                <v-text-field density="compact" variant="outlined" v-model="city"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <label>Postal Code</label>
                                <v-text-field density="compact" variant="outlined" v-model="postalCode"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <label>State</label>
                                <v-text-field density="compact" variant="outlined" v-model="state"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <label>Country</label>
                                <v-text-field density="compact" variant="outlined" v-model="country"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <label>Company Email</label>
                                <v-text-field density="compact" variant="outlined" type="email"
                                    v-model="companyEmail"></v-text-field>
                            </v-col> <v-col cols="12" sm="6">
                                <label>Website</label>
                                <v-text-field density="compact" variant="outlined" v-model="website"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <label>Cac Reg. Number</label>
                                <v-text-field density="compact" variant="outlined" v-model="cacRegNum"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <label>Tin Number</label>
                                <v-text-field density="compact" variant="outlined" v-model="tinNum"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <label>Industry</label>
                                <v-select :items="industriesData" density="compact" variant="outlined"
                                    item-title="description" item-value="id" v-model="Industry"></v-select>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <label>Region</label>
                                <v-select :items="regionsData" density="compact" variant="outlined" item-title="regionName"
                                    item-value="regionCode" v-model="region"></v-select>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <label>Lead Source</label>
                                <v-select :items="leadSourceData" density="compact" variant="outlined"
                                    item-title="leadSourceName" item-value="id" v-model="leadSource"></v-select>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <label>Referred Source Name</label>
                                <v-text-field density="compact" variant="outlined"
                                    v-model="referredSourceName"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <label>Primary Contact ID</label>
                                <select class="form-select" id="lead-source" v-model="contacts"
                                    style="border: 1px solid black; height: 45px;" @change="checkValue(contacts)">
                                    <option :value=user v-for="user in contactsData" :key="user.contactId">
                                        {{ user.contactId }}-{{ user.contactFirstName }}
                                        {{ user.contactLastName }}
                                    </option>
                                </select>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <label>Secondary Contact ID</label>
                                <select class="form-select" id="lead-source" v-model="contactsSecondary"
                                    style="border: 1px solid black; height: 45px;">
                                    <option :value=user v-for="user in contactsData2" :key="user.userId">
                                        {{ user.contactId }}-{{ user.contactFirstName }}
                                        {{ user.contactLastName }}
                                    </option>
                                </select>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <label>Business Ownership</label>
                                <v-select :items="['Public', 'Private', 'Subsidiary', 'Other']" required density="compact"
                                    variant="outlined" v-model="businessOwner"></v-select>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <label>Business Description</label>
                                <v-textarea density="compact" variant="outlined" v-model="businessDescription"></v-textarea>
                            </v-col>
                        </v-row>
                    </v-container><small style="margin-left: 20px; color: red">{{ errorMessage }}</small>
                    <div class="mt-4 d-flex justify-content-end gap-2">
                        <button class="rfqbtn" @click="dialogOpen = false">Cancel</button>
                        <button class="rfqbtn" @click="createCompanySubmit()">Create</button>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
        <ToolBar @filterOptions="onFilterSelected" @searchValues="onSearchValuesEntered" :pageCounts="pageCount" :firstVal="firstValue"
        :lastVal="secondValue" :totalValue="totalArrayValue" :pageNum="pageNumber" @pageDetails="pageMovement"/>
        <div class="d-flex justify-content-between mt-4  ">
            <div class="custom-table table-responsive-sm">
                <TableCompany :companyData="CompanyG" :contactsDat="contactsData" :contactsDat2="contactsData2" />
            </div>
        </div>


    </div>
</template>

<style scoped>
.intro h3 {
    font-size: 20px;
    font-weight: 600;
}

.intro p {
    font-size: 12px;
}

.custom-table {
    width: 100%;
}


.rfqbtn {
    font-family: 'Inter';
    font-size: 14px;
    color: #FFFFFF;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 35px;
    background: #3949AB;
    border-radius: 10px;
}

.rfqbtn:hover {
    color: #000000;
    width: 80px;
    height: 35px;
    border: 1px solid #3949AB;
    background: #ffffff;
    transition: 0.7s;
}

.v-dialog>>>.my-custom-dialog {
    align-self: flex-end;
    right: 0px;
    margin: 0px;
    min-height: 100%;
}

.absolute {
    margin: 0 !important;
    width: 100% !important;
}
</style>
        
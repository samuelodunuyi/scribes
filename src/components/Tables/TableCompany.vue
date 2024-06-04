<script setup>
import { ref, onMounted } from 'vue'
import settingsServices from '../../services/settingsServices';
import CRMService from '../../services/crmService';
import pinia from "../../stores/store";
import { useDashOptionStore } from "../../stores/dashOption"
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const stores = useDashOptionStore(pinia);
const props = defineProps(['companyData', 'contactsDat'])
const dialogNew = ref(false)
const selectedCompany = ref([])
const companyEmailAddress = ref('')
const primaryContactFirstName = ref('')
const primaryContactId = ref('')
const secondaryContactId = ref('')
const primaryContactLastName = ref('')
const primaryContactPhone = ref('')
const primaryContactEmail = ref('')
const secondaryContactFirstName = ref('')
const secondaryContactLastName = ref('')
const secondaryContactPhone = ref('')
const secondaryContactEmail = ref('')
const companyWebsite = ref('')
const companyAddress = ref('')
const companyName = ref('')
const companyId = ref('')
const city = ref('')
const postalCode = ref('')
const state = ref('')
const country = ref('')
const selectedSector = ref('')
const referredSourceName = ref('')
const allSectors = ref([])
const cacRegNumber = ref('')
const tinNumber = ref('')
const selectedLeadSource = ref('')
const allLeadSources = ref([])
const selectedregionCode = ref('')
const allRegionCodes = ref([])
const allContacts = ref([])
const ownership = ref('')
const businessDescription = ref('')
const contacts2 = ref('')

onMounted(async () => {
    allLeadSources.value = await settingsServices.getLeadSources()
    allSectors.value = await settingsServices.getIndustries()
    allRegionCodes.value = await settingsServices.getRegions()
});
const editDialog = (company) => {
    dialogNew.value = true;
    selectedCompany.value = company;
    companyName.value = company.companyName;
    companyId.value = company.companyId;
    primaryContactId.value = company.primaryContactId;
    contacts2.value = props.contactsDat.filter(o => o.contactId != primaryContactId.value)
    secondaryContactId.value = company.secondaryContactId;
    companyEmailAddress.value = company.companyEmailAddress;
    primaryContactFirstName.value = company.primaryContactFirstName;
    primaryContactLastName.value = company.primaryContactLastName;
    primaryContactPhone.value = company.primaryContactPhoneNo;
    primaryContactEmail.value = company.primaryContactEmailAddress;
    secondaryContactFirstName.value = company.secondaryContactFirstName;
    secondaryContactLastName.value = company.secondaryContactLastName;
    secondaryContactPhone.value = company.secondaryContactPhoneNo;
    secondaryContactEmail.value = company.secondaryContactEmailAddress;
    companyWebsite.value = company.website;
    referredSourceName.value = company.referredSourceName;
    companyAddress.value = company.address;
    city.value = company.city;
    postalCode.value = company.postalCode;
    state.value = company.stateId;
    country.value = company.countryId;
    selectedSector.value = company.industrySectorId;
    cacRegNumber.value = company.cacRegistrationNumber;
    tinNumber.value = company.tinNumber;
    selectedLeadSource.value = company.leadSourceId;
    selectedregionCode.value = company.regionCode;
    ownership.value = company.ownership;
    businessDescription.value = company.businessDescription;
}
const checkValue = async (user, second) => {
    if (second == true) {
        contacts2.value = props.contactsDat.filter(o => o.contactId != user)
        let list = props.contactsDat.filter(o => o.contactId == user)
        primaryContactFirstName.value = list[0].contactFirstName;
        primaryContactLastName.value = list[0].contactLastName;
        primaryContactPhone.value = list[0].contactPhoneNo;
        primaryContactEmail.value = list[0].contactPersonalEmailAddress;
    }
}
const checkValue2 = async (user, second) => {
    if (second == true) {
        let list = contacts2.value.filter(o => o.contactId == user)
        secondaryContactFirstName.value = list[0].contactFirstName;
        secondaryContactLastName.value = list[0].contactLastName;
        secondaryContactPhone.value = list[0].contactPhoneNo;
        secondaryContactEmail.value = list[0].contactPersonalEmailAddress;
    }
}
const saveEdit = async () => {
    let ps = await CRMService.editCompany(companyId.value, companyName.value, companyAddress.value, city.value, postalCode.value, state.value, country.value, companyEmailAddress.value, companyWebsite.value, cacRegNumber.value, tinNumber.value, 0, selectedSector.value, referredSourceName.value, selectedLeadSource.value, primaryContactId.value, primaryContactFirstName.value, primaryContactLastName.value, primaryContactPhone.value, primaryContactEmail.value, secondaryContactId.value, secondaryContactFirstName.value, secondaryContactLastName.value, secondaryContactPhone.value, secondaryContactEmail.value, stores.signedInUserEmail, stores.signedInUserEmail, new Date().toJSON(), new Date().toJSON(), stores.signedInUserEmail, selectedregionCode.value, ownership.value, businessDescription.value)
    if (ps == 200) {
        toast.success("Edit Successful")
        setTimeout(async () => {
            dialogNew.value = false
        }, 1500);
    }
    else {
        toast.error("An Error Occured, try Again")
    }
}
</script>

<template>
    <div>
        <v-dialog v-model="dialogNew" transition="slide-y-transition" content-class="my-custom-dialog" height="100%"
            width="750">
            <v-card class="absolute" height="100%">
                <div class="modal-header">
                    <div class="row w-100">
                        <div class="col-md-7 account d-flex" style="font-size: 20px;">
                            <div class="company_img">
                                <v-icon size="x-large">mdi-domain</v-icon>
                            </div>
                            <div class="mt-1">
                                <span class="modal-title">{{ selectedCompany.companyName }} </span>
                                <span class="lock" style="font-size: 15px;">- Company</span>
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn-close xs-close" data-bs-dismiss="modal"
                        @click="dialogNew = false"></button>
                </div>
                <div class="card due-dates" style="border-top: none; border-left: none; border-right: none;">
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <span>ID</span>
                                <p>{{ selectedCompany.companyId }}</p>
                            </div>
                            <div class="col">
                                <span>Name</span>
                                <p>{{ selectedCompany.companyName }}</p>
                            </div>
                            <div class="col">
                                <span>Email</span>
                                <p>{{ selectedCompany.companyEmailAddress }}</p>
                            </div>
                            <div class="col">
                                <span>Phone</span>
                                <p>{{ selectedCompany.primaryContactPhoneNo }}</p>
                            </div>
                            <div class="col">
                                <span>Owner</span>
                                <p>{{ selectedCompany.ownership }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="task-infos" style="padding:10px 20px">
                        <ul class="nav nav-tabs nav-tabs-solid nav-tabs-rounded nav-justified">
                            <li class="nav-item"><a class="nav-link active" href="#task-details"
                                    data-bs-toggle="tab">Details</a></li>
                            <li class="nav-item"><a class="nav-link" href="#task-related" data-bs-toggle="tab">Related</a>
                            </li>
                            <li class="nav-item"><a class="nav-link" href="#task-activity" data-bs-toggle="tab">Activity</a>
                            </li>
                        </ul>
                        <div></div>
                        <div class="accordion  mt-3" id="accordionExample">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingOne">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Organization Name
                                    </button>
                                </h2>
                                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                                    data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <div class="accordion-body__contents">
                                            <table class="table acc">
                                                <tbody>
                                                    <tr>
                                                        <td class="">Record ID</td>
                                                        <td class=" names">{{ selectedCompany.companyId }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Organization Name</td>
                                                        <td>{{ selectedCompany.companyName }}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingTwo">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Organization Contact Details
                                    </button>
                                </h2>
                                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                                    data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <div class="accordion-body__contents">
                                            <table class="table acc">
                                                <tbody>
                                                    <tr>
                                                        <td>Comapny Email Address</td>
                                                        <td class="names"><input type="text" v-model="companyEmailAddress">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Primary Contact Details</td>
                                                        <td class="names">
                                                            <select class="form-select" id="lead-source"
                                                                style="font-size: 12px;" v-model="primaryContactId"
                                                                @change="checkValue(primaryContactId, true)">
                                                                <option :value=user.contactId v-for="user in contactsDat"
                                                                    :key="user.contactId">
                                                                    {{ user.contactId }}-{{ user.contactFirstName }}
                                                                    {{ user.contactLastName }}
                                                                </option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Secondary Contact Details</td>
                                                        <td class=" names">
                                                            <select class="form-select" id="lead-source"
                                                                style="font-size: 12px;"
                                                                @change="checkValue2(secondaryContactId, true)"
                                                                v-model="secondaryContactId">
                                                                <option :value=user.contactId v-for="user in contacts2"
                                                                    :key="user.contactId">
                                                                    {{ user.contactId }}-{{ user.contactFirstName }}
                                                                    {{ user.contactLastName }}
                                                                </option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Website</td>
                                                        <td class=" names"><input type="text" v-model="companyWebsite"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingThree">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        Address Information
                                    </button>
                                </h2>
                                <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                                    data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <div class="accordion-body__contents">
                                            <table class="table acc">
                                                <tbody>
                                                    <tr>
                                                        <td>Address</td>
                                                        <td class="names"><input type="text" v-model="companyAddress"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>City</td>
                                                        <td class="names"><input type="text" v-model="city"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Postal Code</td>
                                                        <td class="names"><input type="text" v-model="postalCode"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>State</td>
                                                        <td class=" names"><input type="text" v-model="state"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Country</td>
                                                        <td class=" names"><input type="text" v-model="country"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingFour">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                        Additional Information
                                    </button>
                                </h2>
                                <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour"
                                    data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <div class="accordion-body__contents">
                                            <table class="table acc">
                                                <tbody>
                                                    <tr>
                                                        <td>Sector</td>
                                                        <td class="names"> <select name="sector" v-model="selectedSector">
                                                                <option :value=sectors.id v-for="sectors in allSectors"
                                                                    :key="sectors.id">{{
                                                                        sectors.description }}
                                                                </option>
                                                            </select></td>
                                                    </tr>
                                                    <tr>
                                                        <td>CAC Reg. Number</td>
                                                        <td class="names"><input type="text" v-model="cacRegNumber"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Tin Number</td>
                                                        <td class="names"><input type="text" v-model="tinNumber"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Referred Source Name</td>
                                                        <td class="names"><input type="text" v-model="referredSourceName">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Lead Source</td>
                                                        <td class=" names"> <select name="leadSource"
                                                                v-model="selectedLeadSource">
                                                                <option :value=sources.id v-for="sources in allLeadSources"
                                                                    :key="sources.id">{{
                                                                        sources.leadSourceName }}
                                                                </option>
                                                            </select></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Region Code</td>
                                                        <td class=" names"> <select name="regionCode"
                                                                v-model="selectedregionCode">
                                                                <option :value=regions.regionCode
                                                                    v-for="regions in allRegionCodes"
                                                                    :key="regions.regionCode">
                                                                    {{
                                                                        regions.regionName }}
                                                                </option>
                                                            </select></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Ownership</td>
                                                        <td class=" names"><input type="text" v-model="ownership"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingFive">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                        Business Description
                                    </button>
                                </h2>
                                <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive"
                                    data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <div class="accordion-body__contents">
                                            <table class="table acc">
                                                <tbody>
                                                    <tr>
                                                        <td class="border-0">Business Description</td>
                                                        <td class="names border-0"><textarea class="form-control"
                                                                style="resize:none; border: 1px solid #7a7a7a;"
                                                                v-model="businessDescription"></textarea></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="dialogNew = false">
                        Cancel
                    </v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="saveEdit">Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span class="noshrink">S/N</span>

                                <span class="d-flex flex-column align-center">
                                    <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                    <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span class="noshrink">Company Name</span>

                                <span class="d-flex flex-column align-center">
                                    <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                    <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span class="noshrink"> First Name</span>
                                <span class="d-flex flex-column align-center">
                                    <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                    <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                </span>

                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span class="noshrink"> Last Name </span>

                                <span class="d-flex flex-column align-center">
                                    <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                    <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                </span>

                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span class="noshrink">Phone Number</span>
                                <span class="d-flex flex-column align-center">
                                    <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                    <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span class="noshrink">Email Address </span>

                                <span class="d-flex flex-column align-center">
                                    <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                    <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                </span>

                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span class="noshrink">Region</span>

                                <span class="d-flex flex-column align-center">
                                    <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                    <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                </span>

                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="i in companyData" style="cursor: pointer;" @click="editDialog(i)" :key="i.companyId">
                        <td scope="row">{{ i.count }}</td>
                        <td >{{ i.companyName }}</td>
                        <td>{{ i.primaryContactFirstName }}</td>
                        <td>{{ i.primaryContactLastName }}</td>
                        <td>{{ i.primaryContactPhoneNo }}</td>
                        <td>{{ i.primaryContactEmailAddress }}</td>
                        <td>{{ i.regionCode }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
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
    padding: 20px;
}

.acc tbody tr {
    box-shadow: none;
}

thead,
tr {
    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}

@media only screen and (max-width: 767.98px) {
    .nav-tabs.nav-tabs-solid.nav-tabs-rounded {
        border-radius: 5px;
    }

    .nav-tabs.nav-justified {
        border: 0 none;
        border-bottom: 0;
    }

    .nav-tabs.nav-tabs-solid {
        padding: 5px;
    }

    .nav-tabs {
        position: relative;
        background-color: #fff;
    }

    .nav-tabs.nav-tabs-solid>li>a {
        border-left-width: 0 !important;
    }

    .nav-link {
        display: block;
    }

    .nav-tabs .nav-link {
        padding: .2rem 0rem;
        border-width: 2px;
    }

    .nav-tabs.nav-tabs-solid>li>a {
        border-left-width: 0 !important;
    }

    .nav-tabs.nav-tabs-solid>li>a {
        border-left-width: 0 !important;
    }

    .nav-tabs .nav-link {
        border-width: 2px;
    }
}

.nav-tabs.nav-tabs-solid>li>a {
    color: #333;
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

.nav-tabs.nav-justified>li>a.active,
.nav-tabs.nav-justified>li>a.active:hover,
.nav-tabs.nav-justified>li>a.active:focus {
    border-color: transparent transparent transparent #9a55ff;
}

.nav-tabs.nav-tabs-solid>li>a.active,
.nav-tabs.nav-tabs-solid>li>a.active:hover,
.nav-tabs.nav-tabs-solid>li>a.active:focus {
    background-color: #9a55ff;
    color: #fff;
}

.nav-tabs.nav-tabs-solid.nav-tabs-rounded {
    border-radius: 50px;
}

.nav-tabs.nav-tabs-solid.nav-tabs-rounded>li>a.active,
.nav-tabs.nav-tabs-solid.nav-tabs-rounded>li>a.active:hover,
.nav-tabs.nav-tabs-solid.nav-tabs-rounded>li>a.active:focus {
    border-radius: 50px;
}

.accordion-button:focus {
    z-index: 3;
    border-color: none;
    outline: 0;
    box-shadow: none;
}

.nav-tabs.nav-tabs-solid.nav-tabs-rounded>li>a {
    border-radius: 50px;
}

.nav-tabs.nav-justified.nav-tabs-solid>li>a {
    border-color: transparent;
}

.nav-tabs.nav-tabs-solid {
    background-color: #fafafa;
    border: 0;
}

.collapse.show {
    visibility: visible;
}

.due-dates p {
    font-size: 12px;
    margin-bottom: 0;
}


.accordion-body__contents {
    padding: 5px 0;
    font-size: .85em;
}

.accordion-header {
    color: #000;
    cursor: pointer;
    font-size: 14px;
    letter-spacing: .1em;
    transition: all .3s;
}

.modal-header {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1rem;
    border-bottom: 1px solid #dee2e6;
    border-top-left-radius: calc(.3rem - 1px);
    border-top-right-radius: calc(.3rem - 1px);
}

::-webkit-scrollbar-track {
    background: #fff;
}

::-webkit-scrollbar-thumb {
    background: #ccc;
    position: absolute;
    z-index: -1;
}

::-webkit-scrollbar {
    width: 8px;
    height: 5px;
    border-radius: 25px;
    position: absolute;
    z-index: -1;
}

.accordion-button:not(.collapsed) {
    background: #eaeaea !important;
    color: inherit !important;
    color: #000 !important;
    border: none !important;
}

.due-dates span {
    color: #a9a7a7;
}

.accordion-header:hover {
    position: relative;
    z-index: 5;
}

.names input {
    margin-top: -10px;
    display: flex;
    height: 35px;
    width: 195px;
    padding: 10px 20px 10px 10px;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 5px;
    border: 1px solid #030315;
    background: var(--white, #fff);
}

.names select {
    margin-top: -10px;
    display: flex;
    height: 40px;
    width: 195px;
    padding: 10px 20px 10px 10px;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 5px;
    border: 1px solid #030315;
    background: var(--white, #fff);
}

.nav-tabs.nav-justified>li>a {
    margin-bottom: 0;
}</style>
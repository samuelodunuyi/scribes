<script setup>
import { ref, onMounted, computed } from 'vue';
import TabMenu from '../../components/TabMenu.vue';
import ToolBar from '../../components/ToolBar.vue';
import ContactDetails from '../../components/Cards/ContactDetails.vue';
import crmService from '../../services/crmService';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import pinia from "../../stores/store";
import { useDashOptionStore } from "../../stores/dashOption"
const stores = useDashOptionStore(pinia);
const props = defineProps({
    headerType: {
        type: String,
        default: 'access'
    }
})
const contactList = ref([])
const companyList = ref([])
const contactselected = ref('')
const title = ref('')
const firstName = ref('')
const lastName = ref('')
const selectedCompany = ref('')
const errorMessage = ref('')
const Address = ref('')
const city = ref('')
const postalCode = ref('')
const state = ref('')
const country = ref('')
const officialEmail = ref('')
const personalEmail = ref('')
const phoneNo = ref('')
const designation = ref('')
const contactPreferredMethod = ref('')
const dialogOpen = ref(false)
const searchValue = ref('')
const filterOption = ref('')
const size = ref(20)
const pageNumber = ref(1)
const totalArrayValue = ref('')
const firstValue = ref('')
const secondValue = ref('')

onMounted(async () => {
    contactList.value = await crmService.getContacts()
    companyList.value = await crmService.getCompanies()
});

const onFilterSelected = (isCorrect) => {
    filterOption.value = isCorrect
}

const onSearchValuesEntered = (isCorrect) => {
    searchValue.value = isCorrect
}

const ContactsG = computed(() => {
    next()
    let companyList = contactList.value
    totalArrayValue.value = companyList.length
    // Process search input
    if (searchValue.value != '' && searchValue.value) {
        companyList = companyList.filter((item) => {
            return item.contactFirstName
                .toLowerCase()
                .includes(searchValue.value.toLowerCase()) ||
                item.contactLastName.toLowerCase().includes(searchValue.value.toLowerCase())
        })
    }
    // Sort by alphabetical order
    companyList = companyList.sort((a, b) => {
        if (filterOption.value == 'asc') {
            let fa = a.contactFirstName.toLowerCase(), fb = b.contactFirstName.toLowerCase()

            if (fa > fb) {
                return 1
            }
            if (fa < fb) {
                return -1
            }
            return 0

        }
        else if (filterOption.value == 'dsc') {
            let fa = a.contactFirstName.toLowerCase(), fb = b.contactFirstName.toLowerCase()

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
    contactList.value = await crmService.getContacts()
}
const selectedContact = (contact) => {
    contactselected.value = contact
}
const createContactSubmit = async () => {
    let ps = await crmService.createContacts(firstName.value, lastName.value, selectedCompany.value, title.value, Address.value, city.value, postalCode.value, state.value, country.value, officialEmail.value, personalEmail.value, phoneNo.value, designation.value, stores.signedInUserEmail, stores.signedInUserEmail, new Date().toJSON(), new Date().toJSON(), stores.signedInUserEmail, contactPreferredMethod.value, true, true, true, true, true)

    if (ps == true) {
        toast.success("Contact Created Successfully")
        setTimeout(async () => {
            dialogOpen.value = false
            firstName.value = ''
            lastName.value = ''
            selectedCompany.value = ''
            title.value = ''
            Address.value = ''
            city.value = ''
            postalCode.value = ''
            state.value = ''
            country.value = ''
            officialEmail.value = ''
            personalEmail.value = ''
            phoneNo.value = ''
            designation.value = ''
            contactPreferredMethod.value = ''
            contactList.value = await crmService.getContacts()
        }, 1500);
    }
    else {
        toast.error("An error occured, try again")
    }
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
    <div class="wrapper">
        <TabMenu />
        <div class="intro mt-4 d-flex justify-content-between mb-2">
            <h3> Contacts </h3>
            <v-btn class="text-none" color="#298729" prepend-icon="mdi-contacts" @click="dialogOpen = true">
                Create Contact
            </v-btn>
        </div>

        <v-dialog v-model="dialogOpen" transition="slide-y-transition" content-class="my-custom-dialog" height="100%"
            width="750">
            <v-card id="style-4">
                <v-card-title>
                    <div class="d-flex justify-content-between mt-3">
                        <span class="text-h5 ml-5">Create Contact</span>
                        <p class="mr-5" style="cursor: pointer;" @click="dialogOpen = false">X</p>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-container style="margin-top: -30px">
                        <v-row>
                            <v-col cols="12" sm="3">
                                <label>Title</label>
                                <v-select :items="['Mr.', 'Mrs.', 'Miss', 'Dr.', 'Other']" density="compact"
                                    variant="outlined" v-model="title"></v-select>
                            </v-col>
                            <v-col cols="12" sm="5">
                                <label>First name</label>
                                <v-text-field density="compact" variant="outlined" v-model="firstName"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4">
                                <label>Last name</label>
                                <v-text-field density="compact" variant="outlined" v-model="lastName"></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <label>Company (optional)</label>
                                <v-autocomplete density="compact" v-model="selectedCompany" :items="companyList"
                                    variant="outlined" item-title="companyName" item-value="companyId">
                                </v-autocomplete>

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
                                <label>Official Email</label>
                                <v-text-field density="compact" variant="outlined" type="email"
                                    v-model="officialEmail"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <label>Personal Email</label>
                                <v-text-field density="compact" variant="outlined" type="email"
                                    v-model="personalEmail"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <label>Phone No</label>
                                <v-text-field density="compact" variant="outlined" v-model="phoneNo"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <label>Designation</label>
                                <v-text-field density="compact" variant="outlined" v-model="designation"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <label>Contact Preferred Method</label>
                                <v-select :items="['Any', 'Email', 'Phone', 'Fax', 'Mail']" density="compact"
                                    variant="outlined" v-model="contactPreferredMethod"></v-select>
                            </v-col>
                        </v-row>
                    </v-container><small style="margin-left: 20px; color: red">{{ errorMessage }}</small>
                    <div class="mt-4 d-flex justify-content-end gap-2">
                        <button class="rfqbtn" @click="dialogOpen = false">Cancel</button>
                        <button class="rfqbtn" @click="createContactSubmit()">Create</button>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
        <ToolBar @filterOptions="onFilterSelected" @searchValues="onSearchValuesEntered" :pageCounts="pageCount"
            :firstVal="firstValue" :lastVal="secondValue" :totalValue="totalArrayValue" :pageNum="pageNumber"
            @pageDetails="pageMovement" />
        <div class="d-flex justify-content-between mt-4  ">
            <div class="custom-table">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">
                                    <div class="d-flex align-center gap-1">
                                        <span class="noshrink"> S/N</span>
                                        <span class="d-flex flex-column align-center">
                                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                        </span>

                                    </div>
                                </th>
                                <th scope="col">
                                    <div class="d-flex align-center gap-1">
                                        <span class="noshrink"> Full Name</span>
                                        <span class="d-flex flex-column align-center">
                                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                        </span>

                                    </div>
                                </th>
                                <th scope="col">
                                    <div class="d-flex align-center gap-1">
                                        <span class="noshrink"> Client Name</span>

                                        <span class="d-flex flex-column align-center">
                                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                        </span>

                                    </div>
                                </th>
                                <th scope="col">
                                    <div class="d-flex align-center gap-1">
                                        <span class="noshrink"> Email Address </span>

                                        <span class="d-flex flex-column align-center">
                                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                        </span>

                                    </div>
                                </th>
                                <th scope="col">
                                    <div class="d-flex align-center gap-1">
                                        <span class="noshrink">Business Phone</span>

                                        <span class="d-flex flex-column align-center">
                                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                        </span>

                                    </div>
                                </th>
                                <th scope="col">
                                    <div class="d-flex align-center gap-1">
                                        <span class="noshrink">Designation</span>

                                        <span class="d-flex flex-column align-center">
                                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                                        </span>

                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in ContactsG" style="cursor: pointer;" @click="selectedContact(row)"
                                :key="row.contactId">
                                <td>{{ row.count }}</td>
                                <td>{{ row.contactFirstName }} {{ row.contactLastName }}</td>
                                <td>{{ row.companyId }}</td>
                                <td>{{ row.contactOfficialEmailAddress }}</td>
                                <td>{{ row.contactPhoneNo }}</td>
                                <td>{{ row.contactDesignation }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="side-panel">
                <h4> Details </h4>
                <ContactDetails :selectedContact="contactselected" :openDialog="dialogOpen" :companies="companyList" />
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
    width: 70%;
}

.side-panel {
    padding: 20px;
    background: #eeeeee;
    width: 35%;
    max-width: 428px;

}

.accordion-body {
    padding: 10px;
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
    padding: 20px;
}

thead,
tr {
    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
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


.submit-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 35px;
    padding: 10px;
    gap: 10px;
    border-radius: 50px;
    background: var(--gradient, linear-gradient(90deg, #227CBF 0%, #47B65C 100%));

    color: #FFF;
    /* Body Text */
    font-size: 16px;
    font-weight: 400;
    line-height: 19.2px;
}
</style>
        
<script setup>
import { ref } from 'vue'
import crmService from '../../services/crmService';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import pinia from "../../stores/store";
import { useDashOptionStore } from "../../stores/dashOption"
const stores = useDashOptionStore(pinia);
const props = defineProps(['selectedContact', 'dialogOpen', 'companies'])
const dialogNew = ref(false)
const contactFirstName = ref('')
const contactLastName = ref('')
const phoneNo = ref('')
const officialEmail = ref('')
const personalEmail = ref('')
const designation = ref('')
const contactAddress = ref('')
const city = ref('')
const postalCode = ref('')
const state = ref('')
const country = ref('')
const ownership = ref('')
const preferredContactMethod = ref('')
const title = ref('')
const contactId = ref('')
const selectedOrganization = ref('')
const organizationList = ref([])
// const emit = defineEmits(["close"])
const editDialog = () => {
  let selectedContact = props.selectedContact
  dialogNew.value = true;
  title.value = selectedContact.contactTitle;
  contactId.value = selectedContact.contactId;
  contactFirstName.value = selectedContact.contactFirstName;
  contactLastName.value = selectedContact.contactLastName;
  phoneNo.value = selectedContact.contactPhoneNo;
  officialEmail.value = selectedContact.contactOfficialEmailAddress;
  personalEmail.value = selectedContact.contactPersonalEmailAddress;
  designation.value = selectedContact.contactDesignation;
  contactAddress.value = selectedContact.contactAddress;
  city.value = selectedContact.contactCity;
  postalCode.value = selectedContact.contactPostalCode;
  state.value = selectedContact.contactStateId;
  country.value = selectedContact.contactCountryId;
  ownership.value = selectedContact.contactOwner;
  selectedOrganization.value = selectedContact.companyId;
  organizationList.value = props.companies
  preferredContactMethod.value = selectedContact.contactPreferenceMethod;
}

const saveEdit = async () => {
  let ps = await crmService.editContact(contactId.value, contactFirstName.value, contactLastName.value, selectedOrganization.value, title.value, contactAddress.value, city.value, postalCode.value, state.value, country.value, officialEmail.value, personalEmail.value, phoneNo.value, designation.value, stores.signedInUserEmail, stores.signedInUserEmail, new Date().toJSON(), new Date().toJSON(), stores.signedInUserEmail, preferredContactMethod.value)
  if (ps == 200) {
    toast.success("Edit Successful")
    setTimeout(async () => {
      dialogNew.value = false
    }, 1500);
  }
    else  {
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
                <v-icon size="x-large">mdi-account-outline</v-icon>
              </div>
              <div class="mt-1">
                <span class="modal-title">{{ selectedContact.contactFirstName }} </span>
                <span class="lock" style="font-size: 15px;">- Contact</span>
              </div>
            </div>
          </div>
          <button type="button" class="btn-close xs-close" data-bs-dismiss="modal" @click="dialogNew = false"></button>
        </div>
        <div class="card due-dates" style="border-top: none; border-left: none; border-right: none;">
          <div class="card-body">
            <div class="row">
              <div class="col">
                <span>ID</span>
                <p>{{ selectedContact.contactId }}</p>
              </div>
              <div class="col">
                <span>Name</span>
                <p>{{ selectedContact.contactFirstName }} {{ selectedContact.contactLastName }}</p>
              </div>
              <div class="col">
                <span>Email</span>
                <p>{{ selectedContact.contactOfficialEmailAddress }}</p>
              </div>
              <div class="col">
                <span>Phone</span>
                <p>{{ selectedContact.contactPhoneNo }}</p>
              </div>
              <div class="col">
                <span>Designation</span>
                <p>{{ selectedContact.contactDesignation }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-body">
          <div class="task-infos" style="padding:10px 20px">
            <ul class="nav nav-tabs nav-tabs-solid nav-tabs-rounded nav-justified">
              <li class="nav-item"><a class="nav-link active" href="#task-details" data-bs-toggle="tab">Details</a></li>
              <li class="nav-item"><a class="nav-link" href="#task-related" data-bs-toggle="tab">Related</a></li>
              <li class="nav-item"><a class="nav-link" href="#task-activity" data-bs-toggle="tab">Activity</a>
              </li>
            </ul> 
            <div></div>
            <div class="accordion  mt-3" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                    aria-expanded="true" aria-controls="collapseOne">
                    Contact Reference
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
                            <td class=" names">{{ selectedContact.contactId }}</td>
                          </tr>
                          <tr>
                            <td>Organization Name</td>
                            <td>
                              <select class="form-select" id="lead-source" v-model="selectedOrganization">
                                <option :value=user.companyId v-for="user in organizationList" :key="user.companyId">
                                  {{ user.companyName }}</option>
                              </select>
                            </td>
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
                    Details
                  </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <div class="accordion-body__contents">
                      <table class="table acc">
                        <tbody>
                          <tr>
                            <td>Title</td>
                            <td class="names">
                              <select v-model="title">
                                <option value="Mr.">Mr.</option>
                                <option value="Mrs.">Mrs.</option>
                                <option value="Miss">Miss</option>
                                <option value="Dr.">Dr</option>
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <td>First Name</td>
                            <td class="names"><input type="text" v-model="contactFirstName"></td>
                          </tr>
                          <tr>
                            <td>Last Name</td>
                            <td class="names"><input type="text" v-model="contactLastName">
                            </td>
                          </tr>
                          <tr>
                            <td>Official Email</td>
                            <td class="names"><input type="text" v-model="officialEmail">
                            </td>
                          </tr>
                          <tr>
                            <td>Personal Email</td>
                            <td class=" names"><input type="text" v-model="personalEmail">
                            </td>
                          </tr>
                          <tr>
                            <td>Phone No</td>
                            <td class=" names"><input type="text" v-model="phoneNo">
                            </td>
                          </tr>
                          <tr>
                            <td>Designation</td>
                            <td class=" names"><input type="text" v-model="designation">
                            </td>
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
                            <td class="names"><input type="text" v-model="contactAddress"></td>
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
                            <td>Contact Preferred Method</td>
                            <td class=" names">
                              <select v-model="preferredContactMethod">
                                <option value="Any">Any</option>
                                <option value="Email">Email</option>
                                <option value="Phone">Phone</option>
                                <option value="Fax">Fax</option>
                                <option value="Mail">Mail</option>
                              </select>
                            </td>
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
            </div>
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialogNew = false">
            Cancel
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="saveEdit(false)">Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="det">
      <div class="det-title">
        <h4>Contact Details</h4>
        <p @click="editDialog()" v-if="selectedContact.length != 0">Edit</p>
      </div>
      <b>Primary Contact</b>
      <div class="d-flex justify-content-between name flex-md-wrap">
        <div class="fname">
          <h5>First Name</h5>
          <h6>{{ selectedContact.contactTitle }} {{ selectedContact.contactFirstName }}</h6>
        </div>

        <div class="fname">
          <h5>Last Name</h5>
          <h6>{{ selectedContact.contactLastName }}</h6>
        </div>
      </div>
      <div class="d-flex justify-content-between name flex-md-wrap">
        <div class="email">
          <h5>Email Address</h5>
          <h6>{{ selectedContact.contactOfficialEmailAddress }}</h6>
        </div>

        <div class="email">
          <h5>Phone Number</h5>
          <h6>{{ selectedContact.contactPhoneNo }}</h6>
        </div>
      </div>
      <div class="d-flex justify-content-between name flex-md-wrap">
        <div class="email">
          <h5>Company Name</h5>
          <h6>{{ selectedContact.companyId }} </h6>
        </div>

        <div class="email">
          <h5>Designation</h5>
          <h6>{{ selectedContact.contactDesignation }}</h6>
        </div>
      </div>

      <div class="d-flex justify-content-between name flex-md-wrap">
        <div class="email">
          <h5>Address</h5>
          <h6>{{ selectedContact.contactAddress }}, {{ selectedContact.contactCity }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.det {
  display: flex;
  padding: 15px 15px 25px 15px;
  flex-direction: column;
  gap: 10px;
  align-self: stretch;
  border-radius: 5px;
  border: 0.885px solid var(--gray-200, #e4e4e7);
  background: var(--color-3, #fff);
  box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.1);
}

.acc tbody tr {
  box-shadow: none;
}

.det-title {
  display: flex;
  height: 44px;
  padding: 10px 0px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-bottom: 2px solid #eee;
}

.det-title h4 {
  color: var(--black, #000);
  font-family: 'Inter';
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
}

.det-title p {
  color: var(--black, #d90000);
  font-family: 'Inter';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  cursor: pointer;
}

.contact {
  display: flex;
  align-items: center;
  gap: 75px;
  align-self: stretch;
}

.fname,
.email {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  width: 135px;
}

.name h5 {
  color: var(--grey-dark, #808080);
  font-family: 'Inter';
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}

h6 {
  color: var(--black, #000);
  font-family: 'Inter';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}

thead tr th {
  padding: 15px;
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

.accordion-button:focus {
  z-index: 3;
  border-color: none;
  outline: 0;
  box-shadow: none;
}

.due-dates p {
  font-size: 12px;
  margin-bottom: 0;
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

.accordion-body__contents {
  padding: 5px 0;
  font-size: .85em;
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

.accordion-header:hover {
  position: relative;
  z-index: 5;
}

.due-dates span {
  color: #a9a7a7;
}

.accordion-button:not(.collapsed) {
  background: #eaeaea !important;
  color: inherit !important;
  color: #000 !important;
  border: none !important;
}

.collapse.show {
  visibility: visible;
}

.nav-tabs.nav-justified>li>a {
  margin-bottom: 0;
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
</style>
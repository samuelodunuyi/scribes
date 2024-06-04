<script setup>
import TabMenu from '../components/TabMenu.vue';
</script>

<template>
  <main class="wrapper">
    <TabMenu />
    <div class="container-fluid mt-3 justify-content-start">
      <div class="intro mt-4 ">
        <h3> Settings</h3>
        <p>System Configuration</p>
      </div>
      <v-dialog v-model="dialogNew" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="text-h5">New {{ itemName }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="newItem" label="Name"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="dialogNew = false">
              Cancel
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="saveNew">Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogNew3" max-width="700px">
        <v-card>
          <v-card-title style="padding: 30px 0px 5px 0px;">
            <span class="text-h5 ml-10">New {{ itemName }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <label>Select Year</label>
                  <v-select :items="financialYear" required density="compact" variant="outlined" item-title="name"
                    item-value="name" v-model="selectedYear"></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <label>Origination Mandate Target</label>
                  <v-text-field density="compact" variant="outlined" type="number"
                    v-model="originationMandatedTarget"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <label>Credit Committee Approval Target</label>
                  <v-text-field density="compact" variant="outlined" type="number"
                    v-model="ccapprovalTarget"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <label>Fee Letter Target</label>
                  <v-text-field density="compact" variant="outlined" type="number"
                    v-model="feeLetterTarget"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <label>Financial Close Target</label>
                  <v-text-field density="compact" variant="outlined" type="number"
                    v-model="financialCloseTarget"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <label>Guarantee Pipeline</label>
                  <v-text-field density="compact" variant="outlined" type="number"
                    v-model="guaranteePipelineTarget"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="close">
              Cancel
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="saveNew">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogNew2" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="text-h5">New {{ itemName }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="newItem" label="Name"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="newItemShortcode" label="Shortcode"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="dialogNew2 = false">
              Cancel
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="saveNew">Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogNew4" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="text-h5">New {{ itemName }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="2">
                  <v-text-field variant="outlined" density="compact" value="FY" :readonly="true"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field variant="outlined" density="compact" v-model="selectedYear" label="Year"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="dialogNew4 = false">
              Cancel
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="saveNew">Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <div class="row all-reports m-0">
        <div class="col-md-4 p-0">
          <ul class="nav nav-tabs card p-0 mb-0" id="reports" role="tablist">
            <li class="nav-item w-100">
              <a class="nav-link active" data-bs-toggle="tab" href="#personal-reports" role="tab"
                aria-controls="personal-reports" aria-selected="true"
                @click="isDepartments = false; isBusinessUnits = false; isLevels = false; isIndustries = true; isRegion = false; isLeadSource = false; isProducts = false; isActivityType = false; isFinancialYearTarget = false; isFinancialYear = false; isAdminDelete = false">Industries</a>
            </li>
            <li class="nav-item w-100">
              <a class="nav-link" data-bs-toggle="tab" href="#shared-reports" role="tab" aria-controls="shared-reports"
                aria-selected="false"
                @click="isDepartments = false; isBusinessUnits = false; isLevels = false; isIndustries = false; isRegion = false; isLeadSource = false; isProducts = true; isActivityType = false; isFinancialYearTarget = false; isFinancialYear = false; isAdminDelete = false">Products</a>
            </li>
            <li class="nav-item w-100">
              <a class="nav-link" data-bs-toggle="tab" href="#levels" role="tab" aria-controls="levels"
                aria-selected="false"
                @click="isDepartments = false; isBusinessUnits = false; isLevels = true; isIndustries = false; isRegion = false; isLeadSource = false; isProducts = false; isActivityType = false; isFinancialYearTarget = false; isFinancialYear = false; isAdminDelete = false">Levels</a>
            </li>
            <li class="nav-item w-100">
              <a class="nav-link" data-bs-toggle="tab" href="#region" role="tab" aria-controls="region"
                aria-selected="false"
                @click="isDepartments = false; isBusinessUnits = false; isLevels = false; isIndustries = false; isRegion = true; isLeadSource = false; isProducts = false; isActivityType = false; isFinancialYearTarget = false; isFinancialYear = false; isAdminDelete = false">Regions</a>
            </li>
            <li class="nav-item w-100">
              <a class="nav-link" data-bs-toggle="tab" href="#leadSource" role="tab" aria-controls="leadSource"
                aria-selected="false"
                @click="isDepartments = false; isBusinessUnits = false; isLevels = false; isIndustries = false; isRegion = false; isLeadSource = true; isProducts = false; isActivityType = false; isFinancialYearTarget = false; isFinancialYear = false; isAdminDelete = false">Lead
                Sources</a>
            </li>
            <li class="nav-item w-100">
              <a class="nav-link" data-bs-toggle="tab" href="#departments" role="tab" aria-controls="departments"
                aria-selected="false"
                @click="isDepartments = true; isBusinessUnits = false; isLevels = false; isIndustries = false; isRegion = false; isLeadSource = false; isProducts = false; isActivityType = false; isFinancialYearTarget = false; isFinancialYear = false; isAdminDelete = false">Departments</a>
            </li>
            <li class="nav-item w-100">
              <a class="nav-link" data-bs-toggle="tab" href="#businessunits" role="tab" aria-controls="businessunits"
                aria-selected="false"
                @click="isBusinessUnits = true; isDepartments = false; isLevels = false; isIndustries = false; isRegion = false; isLeadSource = false; isProducts = false; isActivityType = false; isFinancialYearTarget = false; isFinancialYear = false; isAdminDelete = false">Business
                Units</a>
            </li>
            <li class="nav-item w-100">
              <a class="nav-link" data-bs-toggle="tab" href="#activityType" role="tab" aria-controls="activityType"
                aria-selected="false"
                @click="isBusinessUnits = false; isDepartments = false; isLevels = false; isIndustries = false; isRegion = false; isLeadSource = false; isProducts = false; isActivityType = true; isFinancialYearTarget = false; isFinancialYear = false; isAdminDelete = false">Activity
                Types</a>
            </li>
            <li class="nav-item w-100">
              <a class="nav-link" data-bs-toggle="tab" href="#financialYearTargets" role="tab"
                aria-controls="financialYearTargets" aria-selected="false"
                @click="isBusinessUnits = false; isDepartments = false; isLevels = false; isIndustries = false; isRegion = false; isLeadSource = false; isProducts = false; isActivityType = false; isFinancialYearTarget = true; isFinancialYear = false; isAdminDelete = false">Financial
                Year Target
              </a>
            </li>
            <li class="nav-item w-100">
              <a class="nav-link" data-bs-toggle="tab" href="#financialYears" role="tab" aria-controls="financialYears"
                aria-selected="false"
                @click="isBusinessUnits = false; isDepartments = false; isLevels = false; isIndustries = false; isRegion = false; isLeadSource = false; isProducts = false; isActivityType = false; isFinancialYearTarget = false; isFinancialYear = true; isAdminDelete = false">Financial
                Year
              </a>
            </li>
            <li class="nav-item w-100">
              <a class="nav-link" data-bs-toggle="tab" href="#adminDelete" role="tab" aria-controls="adminDelete"
                aria-selected="false"
                @click="isBusinessUnits = false; isDepartments = false; isLevels = false; isIndustries = false; isRegion = false; isLeadSource = false; isProducts = false; isActivityType = false; isFinancialYearTarget = false; isFinancialYear = false; isAdminDelete = true">Administrative
                Delete
              </a>
            </li>
          </ul>
        </div>
        <div class="col-md-8 pe-0 Reports">
          <div class="tab-content pt-0">
            <div class="tab-pane active" id="personal-reports" role="tabpanel">
              <div class="table-responsive card">
                <div class="card-body">
                  <div class="d-flex justify-content-between pb-3">
                    <h4 class="pb-3">Industries</h4> <button class="btn btn-sm btn-dark font-weight-bold btn-rounded"
                      id="add-task" @click="dialogNew = true; itemName = 'Industry'">Add Industry</button>
                  </div>
                  <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                    <div class="row">
                      <div class="col-sm-12">
                        <v-data-table :headers="headersGeneral" :items="initializeValues"
                          :sort-by="[{ key: 'description', order: 'asc' }]" class="elevation-1">
                          <template v-slot:top>
                            <div>
                              <v-dialog v-model="dialogEditIndustry" max-width="500px">
                                <v-card>
                                  <v-card-title>
                                    <span class="text-h5">{{ formTitle }}</span>
                                  </v-card-title>
                                  <v-card-text>
                                    <v-container>
                                      <v-row>
                                        <v-col cols="12">
                                          <v-text-field v-model="editedItem.description" label="Name"></v-text-field>
                                        </v-col>
                                      </v-row>
                                    </v-container>
                                  </v-card-text>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue-darken-1" variant="text" @click="close">
                                      Cancel
                                    </v-btn>
                                    <v-btn color="blue-darken-1" variant="text" @click="saveEdit(editedItem.description)">
                                      Save
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                              <v-dialog v-model="dialogDeleteIndustry" max-width="500px">
                                <v-card>
                                  <v-card-title class="text-h5">Are you sure you want to delete this
                                    item?</v-card-title>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue-darken-1" variant="text"
                                      @click="dialogDeleteIndustry = false">Cancel</v-btn>
                                    <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm(1)">OK</v-btn>
                                    <v-spacer></v-spacer>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </div>
                          </template>
                          <template v-slot:item.actions="{ item }">
                            <v-icon size="small" class="me-2" @click="editItem(item.raw); itemName = 'Industry'">
                              mdi-pencil
                            </v-icon>
                            <v-icon size="small" @click="deleteItem(item.raw, 1)">
                              mdi-delete
                            </v-icon>
                          </template>
                          <template v-slot:no-data>
                            <v-btn color="primary" @click="initializeValues">
                              Reset
                            </v-btn>
                          </template>
                        </v-data-table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="tab-pane" id="shared-reports" role="tabpanel">
              <div class="table-responsive card">
                <div class="card-body">
                  <div class="d-flex justify-content-between pb-3">
                    <h4 class="pb-3">Products</h4>
                    <button class="btn btn-sm btn-dark font-weight-bold btn-rounded" id="add-task"
                      @click="dialogNew = true; itemName = 'Product'">Add New Product</button>
                  </div>
                  <div id="DataTables_Table_1_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                    <div class="row">
                      <div class="col-sm-12">
                        <v-data-table :headers="headersGeneral" :items="initializeValues"
                          :sort-by="[{ key: 'description', order: 'asc' }]" class="elevation-1">
                          <template v-slot:top>
                            <div flat>
                              <v-dialog v-model="dialogDeleteProduct" max-width="500px">
                                <v-card>
                                  <v-card-title class="text-h5">Are you sure you want to delete this
                                    item?</v-card-title>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue-darken-1" variant="text"
                                      @click="dialogDeleteProduct = false">Cancel</v-btn>
                                    <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm(2)">OK</v-btn>
                                    <v-spacer></v-spacer>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </div>
                          </template>
                          <template v-slot:item.actions="{ item }">
                            <v-icon size="small" class="me-2" @click="editItem(item.raw); itemName = 'Product'">
                              mdi-pencil
                            </v-icon>
                            <v-icon size="small" @click="deleteItem(item.raw, 2)">
                              mdi-delete
                            </v-icon>
                          </template>
                          <template v-slot:no-data>
                            <v-btn color="primary" @click="initializeValues">
                              Reset
                            </v-btn>
                          </template>
                        </v-data-table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane" id="levels" role="tabpanel">
              <div class="table-responsive card">
                <div class="card-body">
                  <div class="d-flex justify-content-between pb-3">
                    <h4 class="pb-3">Levels</h4>
                    <button class="btn btn-sm btn-dark font-weight-bold btn-rounded" id="add-task"
                      @click="dialogNew = true; itemName = 'Level'">Add New
                      Levels</button>
                  </div>
                  <div id="DataTables_Table_2_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                    <div class="row">
                      <div class="col-sm-12">
                        <v-data-table :headers="headersGeneral" :items="initializeValues"
                          :sort-by="[{ key: 'description', order: 'asc' }]" class="elevation-1">
                          <template v-slot:top>
                            <div flat>
                              <v-dialog v-model="dialogDeleteLevels" max-width="500px">
                                <v-card>
                                  <v-card-title class="text-h5">Are you sure you want to delete this
                                    item?</v-card-title>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue-darken-1" variant="text"
                                      @click="dialogDeleteLevels = false">Cancel</v-btn>
                                    <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm(3)">OK</v-btn>
                                    <v-spacer></v-spacer>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </div>
                          </template>
                          <template v-slot:item.actions="{ item }">
                            <v-icon size="small" class="me-2" @click="editItem(item.raw); itemName = 'Level'">
                              mdi-pencil
                            </v-icon>
                            <v-icon size="small" @click="deleteItem(item.raw, 3)">
                              mdi-delete
                            </v-icon>
                          </template>
                          <template v-slot:no-data>
                            <v-btn color="primary" @click="initializeValues">
                              Reset
                            </v-btn>
                          </template>
                        </v-data-table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane" id="region" role="tabpanel">
              <div class="table-responsive card">
                <div class="card-body">
                  <div class="d-flex justify-content-between pb-3">
                    <h4 class="pb-3">Regions</h4>
                  </div>
                  <div id="DataTables_Table_2_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                    <div class="row">
                      <div class="col-sm-12">
                        <v-data-table :headers="headersRegions" :items="initializeValues"
                          :sort-by="[{ key: 'regionName', order: 'asc' }]" class="elevation-1">
                          <template v-slot:no-data>
                            <v-btn color="primary" @click="initializeValues">
                              Reset
                            </v-btn>
                          </template>
                        </v-data-table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane" id="leadSource" role="tabpanel">
              <div class="table-responsive card">
                <div class="card-body">
                  <div class="d-flex justify-content-between pb-3">
                    <h4 class="pb-3">Lead Sources</h4>
                    <button class="btn btn-sm btn-dark font-weight-bold btn-rounded" id="add-task"
                      @click="dialogNew = true; itemName = 'Lead Source'">Add Lead Source</button>
                  </div>
                  <div id="DataTables_Table_2_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                    <div class="row">
                      <div class="col-sm-12">
                        <v-data-table :headers="headersLeadSource" :items="initializeValues"
                          :sort-by="[{ key: 'leadSourceName', order: 'asc' }]" class="elevation-1">
                          <template v-slot:top>
                            <div flat>
                              <v-dialog v-model="dialogEditLeadSource" max-width="500px">
                                <v-card>
                                  <v-card-title>
                                    <span class="text-h5">{{ formTitle }}</span>
                                  </v-card-title>
                                  <v-card-text>
                                    <v-container>
                                      <v-row>
                                        <v-col cols="12">
                                          <v-text-field v-model="editedItem4.leadSourceName" label="Name"></v-text-field>
                                        </v-col>
                                      </v-row>
                                    </v-container>
                                  </v-card-text>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue-darken-1" variant="text" @click="close">
                                      Cancel
                                    </v-btn>
                                    <v-btn color="blue-darken-1" variant="text"
                                      @click="saveEdit(editedItem4.leadSourceName)">
                                      Save
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                              <v-dialog v-model="dialogDeleteLeadSource" max-width="500px">
                                <v-card>
                                  <v-card-title class="text-h5">Are you sure you want to delete this
                                    item?</v-card-title>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue-darken-1" variant="text"
                                      @click="dialogDeleteLeadSource = false">Cancel</v-btn>
                                    <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm(5)">OK</v-btn>
                                    <v-spacer></v-spacer>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </div>
                          </template>
                          <template v-slot:item.actions="{ item }">
                            <v-icon size="small" class="me-2" @click="editItem4(item.raw); itemName = 'Lead Source'">
                              mdi-pencil
                            </v-icon>
                            <v-icon size="small" @click="deleteItem(item.raw, 5)">
                              mdi-delete
                            </v-icon>
                          </template>
                          <template v-slot:no-data>
                            <v-btn color="primary" @click="initializeValues">
                              Reset
                            </v-btn>
                          </template>
                        </v-data-table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane" id="departments" role="tabpanel">
              <div class="table-responsive card">
                <div class="card-body">
                  <div class="d-flex justify-content-between pb-3">
                    <h4 class="pb-3">Departments</h4>
                    <button class="btn btn-sm btn-dark font-weight-bold btn-rounded" id="add-task"
                      @click="dialogNew2 = true; itemName = 'Department'">Add Department</button>
                  </div>
                  <div id="DataTables_Table_2_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                    <div class="row">
                      <div class="col-sm-12">
                        <v-data-table :headers="headersDepartment" :items="initializeValues"
                          :sort-by="[{ key: 'departmentDescription', order: 'asc' }]" class="elevation-1">
                          <template v-slot:top>
                            <div flat>
                              <v-dialog v-model="dialogEditDepartment" max-width="500px">
                                <v-card>
                                  <v-card-title>
                                    <span class="text-h5">{{ formTitle }}</span>
                                  </v-card-title>
                                  <v-card-text>
                                    <v-container>
                                      <v-row>
                                        <v-col cols="12">
                                          <v-text-field v-model="editedItem2.departmentDescription"
                                            label="Name"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                          <v-text-field v-model="editedItem2.shortCode" label="Shortcode"></v-text-field>
                                        </v-col>
                                      </v-row>
                                    </v-container>
                                  </v-card-text>

                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue-darken-1" variant="text" @click="dialogEditDepartment = false">
                                      Cancel
                                    </v-btn>
                                    <v-btn color="blue-darken-1" variant="text"
                                      @click="saveEdit(editedItem2.departmentDescription, editedItem2.shortCode)">Save
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </div>
                          </template>
                          <template v-slot:item.actions="{ item }">
                            <v-icon size="small" class="me-2" @click="editItem2(item.raw); itemName = 'Department'">
                              mdi-pencil
                            </v-icon>
                          </template>
                          <template v-slot:no-data>
                            <v-btn color="primary" @click="initializeValues">
                              Reset
                            </v-btn>
                          </template>
                        </v-data-table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane" id="businessunits" role="tabpanel">
              <div class="table-responsive card">
                <div class="card-body">
                  <div class="d-flex justify-content-between pb-3">
                    <h4 class="pb-3">Business Units</h4>
                    <button class="btn btn-sm btn-dark font-weight-bold btn-rounded" id="add-task"
                      @click="dialogNew2 = true; itemName = 'Business Unit'">Add Business
                      Unit</button>
                  </div>
                  <div id="DataTables_Table_2_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                    <div class="row">
                      <div class="col-sm-12">
                        <v-data-table :headers="headersBusinessUnit" :items="initializeValues"
                          :sort-by="[{ key: 'businessUnitDescription', order: 'asc' }]" class="elevation-1">
                          <template v-slot:top>
                            <div flat>
                              <v-dialog v-model="dialogEditBusinessUnit" max-width="500px">
                                <v-card>
                                  <v-card-title>
                                    <span class="text-h5">{{ formTitle }}</span>
                                  </v-card-title>
                                  <v-card-text>
                                    <v-container>
                                      <v-row>
                                        <v-col cols="12">
                                          <v-text-field v-model="editedItem2.businessUnitDescription"
                                            label="Name"></v-text-field>
                                        </v-col> <v-col cols="12">
                                          <v-text-field v-model="editedItem2.shortCode" label="Shortcode"></v-text-field>
                                        </v-col>
                                      </v-row>
                                    </v-container>
                                  </v-card-text>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue-darken-1" variant="text" @click="dialogEditBusinessUnit = false">
                                      Cancel
                                    </v-btn>
                                    <v-btn color="blue-darken-1" variant="text"
                                      @click="saveEdit(editedItem2.businessUnitDescription, editedItem2.shortCode)">Save
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </div>
                          </template>
                          <template v-slot:item.actions="{ item }">
                            <v-icon size="small" class="me-2" @click="editItem3(item.raw); itemName = 'Business Unit'">
                              mdi-pencil
                            </v-icon>
                          </template>
                          <template v-slot:no-data>
                            <v-btn color="primary" @click="initializeValues">
                              Reset
                            </v-btn>
                          </template>
                        </v-data-table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane" id="activityType" role="tabpanel">
              <div class="table-responsive card">
                <div class="card-body">
                  <div class="d-flex justify-content-between pb-3">
                    <h4 class="pb-3">Activity Types</h4>
                    <button class="btn btn-sm btn-dark font-weight-bold btn-rounded" id="add-task"
                      @click="dialogNew = true; itemName = 'Activity Type'">Add Activity Type</button>
                  </div>
                  <div id="DataTables_Table_2_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                    <div class="row">
                      <div class="col-sm-12">
                        <v-data-table :headers="headersActivityType" :items="initializeValues"
                          :sort-by="[{ key: 'name', order: 'asc' }]" class="elevation-1">
                          <template v-slot:top>
                            <div flat>
                              <v-dialog v-model="dialogEditActivityType" max-width="500px">
                                <v-card>
                                  <v-card-title>
                                    <span class="text-h5">{{ formTitle }}</span>
                                  </v-card-title>
                                  <v-card-text>
                                    <v-container>
                                      <v-row>
                                        <v-col cols="12">
                                          <v-text-field v-model="editedItem5.name" label="Name"></v-text-field>
                                        </v-col>
                                      </v-row>
                                    </v-container>
                                  </v-card-text>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue-darken-1" variant="text" @click="close">
                                      Cancel
                                    </v-btn>
                                    <v-btn color="blue-darken-1" variant="text" @click="saveEdit(editedItem5.name)">
                                      Save
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                              <v-dialog v-model="dialogDeleteActivityLevel" max-width="500px">
                                <v-card>
                                  <v-card-title class="text-h5">Are you sure you want to delete this
                                    item?</v-card-title>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue-darken-1" variant="text"
                                      @click="dialogDeleteActivityLevel = false">Cancel</v-btn>
                                    <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm(8)">OK</v-btn>
                                    <v-spacer></v-spacer>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </div>
                          </template>
                          <template v-slot:item.actions="{ item }">
                            <v-icon size="small" class="me-2" @click="editItem5(item.raw); itemName = 'Activity Type'">
                              mdi-pencil
                            </v-icon>
                            <v-icon size="small" @click="deleteItem(item.raw, 8)">
                              mdi-delete
                            </v-icon>
                          </template>
                          <template v-slot:no-data>
                            <v-btn color="primary" @click="initializeValues">
                              Reset
                            </v-btn>
                          </template>
                        </v-data-table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane" id="financialYearTargets" role="tabpanel">
              <div class="table-responsive card">
                <div class="card-body">
                  <div class="d-flex justify-content-between pb-3">
                    <h4 class="pb-3">Financial Year Target</h4>
                    <button class="btn btn-sm btn-dark font-weight-bold btn-rounded" id="add-task"
                      @click="dialogNew3 = true; itemName = 'Financial Year Target'">Add Target for Financial
                      Year</button>
                  </div>
                  <div id="DataTables_Table_2_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                    <div class="row">
                      <div class="col-sm-12">
                        <v-data-table :headers="headersFinancialTarget" :items="initializeValues"
                          :sort-by="[{ key: 'name', order: 'asc' }]" class="elevation-1">
                          <template v-slot:top>
                            <div flat>
                              <v-dialog v-model="dialogEditFinancialYearTarget" max-width="500px">
                                <v-card>
                                  <v-card-title>
                                    <span class="text-h5">{{ formTitle }}</span>
                                  </v-card-title>
                                  <v-card-text>
                                    <v-container>
                                      <v-row>
                                        <v-col cols="12" sm="6">
                                          <label>Select Year</label>
                                          <v-select :items="years" required density="compact" variant="outlined"
                                            v-model="editedItem5.financialYearName"></v-select>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                          <label>Guarantee Pipeline</label>
                                          <v-text-field density="compact" variant="outlined" type="number"
                                            v-model="editedItem5.guaranteePipelineTarget"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                          <label>Mandates Originated Target</label>
                                          <v-text-field density="compact" variant="outlined" type="number"
                                            v-model="editedItem5.originationMandatedTarget"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                          <label>Credit Committee Approval Target</label>
                                          <v-text-field density="compact" variant="outlined" type="number"
                                            v-model="editedItem5.creditCommitteeApprovalTarget"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                          <label>Fee Letter Target</label>
                                          <v-text-field density="compact" variant="outlined" type="number"
                                            v-model="editedItem5.feeLetterTarget"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                          <label>Financial Close Target</label>
                                          <v-text-field density="compact" variant="outlined" type="number"
                                            v-model="editedItem5.financialCloseTarget"></v-text-field>
                                        </v-col>
                                      </v-row>
                                    </v-container>
                                  </v-card-text>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue-darken-1" variant="text" @click="close">
                                      Cancel
                                    </v-btn>
                                    <v-btn color="blue-darken-1" variant="text" @click="saveEdit(editedItem5)">
                                      Save
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </div>
                          </template>
                          <template v-slot:item.actions="{ item }">
                            <v-icon size="small" class="me-2"
                              @click="editItem6(item.raw); itemName = 'Financial Year Traget'">
                              mdi-pencil
                            </v-icon>
                          </template>
                          <template v-slot:no-data>
                            <v-btn color="primary" @click="initializeValues">
                              Reset
                            </v-btn>
                          </template>
                        </v-data-table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane" id="financialYears" role="tabpanel">
              <div class="table-responsive card">
                <div class="card-body">
                  <div class="d-flex justify-content-between pb-3">
                    <h4 class="pb-3">Financial Year</h4>
                    <button class="btn btn-sm btn-dark font-weight-bold btn-rounded" id="add-task"
                      @click="dialogNew4 = true; itemName = 'Financial Year'">Add Financial Year</button>
                  </div>
                  <div id="DataTables_Table_2_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                    <div class="row">
                      <div class="col-sm-12">
                        <v-data-table :headers="headersFinancialYear" :items="initializeValues"
                          :sort-by="[{ key: 'name', order: 'asc' }]" class="elevation-1">
                          <template v-slot:top>
                            <div flat>
                              <v-dialog v-model="dialogEditFinancialYear" max-width="500px">
                                <v-card>
                                  <v-card-title>
                                    <span class="text-h5">{{ formTitle }}</span>
                                  </v-card-title>
                                  <v-card-text>
                                    <v-container>
                                      <v-row>
                                        <v-col cols="6">
                                          <v-select variant="outlined" density="compact" v-model="editedItem6.name"
                                            label="Year"
                                            :items="['FY2020', 'FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026', 'FY2027', 'FY2028', 'FY2029', 'FY2030']"></v-select>
                                        </v-col>
                                        <v-col cols="6">
                                          <v-select variant="outlined" density="compact" v-model="editedItem6.status"
                                            label="Status"
                                            :items="[{ id: true, name: 'Active' }, { id: false, name: 'Inactive' }]"
                                            item-title="name" item-value="id"></v-select>
                                        </v-col>
                                      </v-row>
                                    </v-container>
                                  </v-card-text>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue-darken-1" variant="text" @click="close">
                                      Cancel
                                    </v-btn>
                                    <v-btn color="blue-darken-1" variant="text" @click="saveEdit(editedItem6)">
                                      Save
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </div>
                          </template>
                          <template v-slot:item.actions="{ item }">
                            <v-icon size="small" class="me-2" @click="editItem7(item.raw); itemName = 'Financial Year'">
                              mdi-pencil
                            </v-icon>
                            <v-icon size="small" @click="deleteItem(item.raw, 8)">
                              mdi-delete
                            </v-icon>
                          </template>
                          <template v-slot:no-data>
                            <v-btn color="primary" @click="initializeValues">
                              Reset
                            </v-btn>
                          </template>
                        </v-data-table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="tab-pane" id="adminDelete" role="tabpanel">
              <div class="table-responsive card">
                <div class="card-body">
                  <div class="d-flex justify-content-between pb-3">
                    <h4 class="pb-3">Administrative Delete</h4>
                  </div>
                  <div id="DataTables_Table_2_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                    <div flat>
                      <v-dialog v-model="dialogAdminDelete" max-width="800px">
                        <v-card>
                          <v-card-title>
                            <span class="text-h5"> {{ formTitleAdminDelete }}</span>
                          </v-card-title>
                          <v-card-text>
                            <v-container>
                              <v-row>
                                <div class="table-responsive">
                                  <table class="table" ref="transactSummary">
                                    <thead>
                                      <tr
                                        v-if="itemDeleteName == 'Pipeline Projects' || itemDeleteName == 'Mandated Clients'">
                                        <th scope="col">
                                          <div class="d-flex align-center gap-1">
                                            <span class="noshrink">ID</span>
                                          </div>
                                        </th>
                                        <th scope="col">
                                          <div class="d-flex align-center gap-1">
                                            <span class="noshrink">Client</span>
                                          </div>
                                        </th>
                                        <th scope="col">
                                          <div class="d-flex align-center gap-1">
                                            <span class="noshrink"></span>
                                          </div>
                                        </th>
                                      </tr>
                                      <tr v-if="itemDeleteName == 'Comapnies'">
                                        <th scope="col">
                                          <div class="d-flex align-center gap-1">
                                            <span class="noshrink">Company Name</span>
                                          </div>
                                        </th>
                                        <th scope="col">
                                          <div class="d-flex align-center gap-1">
                                            <span class="noshrink">Address</span>
                                          </div>
                                        </th>
                                        <th scope="col">
                                          <div class="d-flex align-center gap-1">
                                            <span class="noshrink">Email</span>
                                          </div>
                                        </th>
                                        <th scope="col">
                                          <div class="d-flex align-center gap-1">
                                            <span class="noshrink">Region Code</span>
                                          </div>
                                        </th>
                                        <th scope="col">
                                          <div class="d-flex align-center gap-1">
                                            <span class="noshrink"></span>
                                          </div>
                                        </th>
                                      </tr>
                                      <tr v-if="itemDeleteName == 'Contacts'">
                                        <th scope="col">
                                          <div class="d-flex align-center gap-1">
                                            <span class="noshrink">First Name</span>
                                          </div>
                                        </th>
                                        <th scope="col">
                                          <div class="d-flex align-center gap-1">
                                            <span class="noshrink">Last Name</span>
                                          </div>
                                        </th>
                                        <th scope="col">
                                          <div class="d-flex align-center gap-1">
                                            <span class="noshrink">Official Email</span>
                                          </div>
                                        </th>
                                        <th scope="col">
                                          <div class="d-flex align-center gap-1">
                                            <span class="noshrink">Address</span>
                                          </div>
                                        </th>
                                        <th scope="col">
                                          <div class="d-flex align-center gap-1">
                                            <span class="noshrink"></span>
                                          </div>
                                        </th>
                                      </tr>
                                      <tr
                                        v-if="itemDeleteName == 'Pipeline Deals' || itemDeleteName == 'Portfolio Deals'">
                                        <th scope="col">
                                          <div class="d-flex align-center gap-1">
                                            <span class="noshrink">ID</span>
                                          </div>
                                        </th>
                                        <th scope="col">
                                          <div class="d-flex align-center gap-1">
                                            <span class="noshrink">Client</span>
                                          </div>
                                        </th>
                                        <th scope="col">
                                          <div class="d-flex align-center gap-1">
                                            <span class="noshrink">Product</span>
                                          </div>
                                        </th>
                                        <th scope="col">
                                          <div class="d-flex align-center gap-1">
                                            <span class="noshrink">Transactor</span>
                                          </div>
                                        </th>
                                        <th scope="col">
                                          <div class="d-flex align-center gap-1">
                                            <span class="noshrink">Status</span>
                                          </div>
                                        </th>
                                        <th scope="col">
                                          <div class="d-flex align-center gap-1">
                                            <span class="noshrink"></span>
                                          </div>
                                        </th>
                                      </tr>
                                      <tr v-if="itemDeleteName == 'Transaction Update'">
                                        <th scope="col">
                                          <div class="d-flex align-center gap-1">
                                            <span class="noshrink">ID</span>
                                          </div>
                                        </th>
                                        <th scope="col">
                                          <div class="d-flex align-center gap-1">
                                            <span class="noshrink">Description</span>
                                          </div>
                                        </th>
                                        <th scope="col">
                                          <div class="d-flex align-center gap-1">
                                            <span class="noshrink">Record Owner</span>
                                          </div>
                                        </th>
                                        <th scope="col">
                                          <div class="d-flex align-center gap-1">
                                            <span class="noshrink">Details</span>
                                          </div>
                                        </th>
                                        <th scope="col">
                                          <div class="d-flex align-center gap-1">
                                            <span class="noshrink"></span>
                                          </div>
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr
                                        v-if="itemDeleteName == 'Pipeline Projects' || itemDeleteName == 'Mandated Clients'"
                                        v-for="item in deleteTableList" :key="item.id" style="cursor: pointer">
                                        <td>{{ item.leadId }}</td>
                                        <td>{{ item.companyName }}</td>
                                        <td style="color:red; font-size: 15px"
                                          @click="dialogConfirmDelete2 = true; adminDeleteItemId = item.leadId">X</td>
                                      </tr>
                                      <tr v-if="itemDeleteName == 'Companies'" v-for="item in deleteTableList"
                                        :key="item.id" style="cursor: pointer">
                                        <td>{{ item.companyName }}</td>
                                        <td>{{ item.address }}</td>
                                        <td>{{ item.companyEmailAddress }}</td>
                                        <td>{{ item.regionCode }}</td>
                                        <td style="color:red; font-size: 15px"
                                          @click="dialogConfirmDelete2 = true; adminDeleteItemId = item.companyId">X</td>
                                      </tr>
                                      <tr v-if="itemDeleteName == 'Contacts'" v-for="item in deleteTableList"
                                        :key="item.id" style="cursor: pointer">
                                        <td>{{ item.contactFirstName }}</td>
                                        <td>{{ item.contactLastName }}</td>
                                        <td>{{ item.contactOfficialEmailAddress }}</td>
                                        <td>{{ item.contactAddress }}</td>
                                        <td style="color:red; font-size: 15px"
                                          @click="dialogConfirmDelete2 = true; adminDeleteItemId = item.contactId">X</td>
                                      </tr>
                                      <tr v-if="itemDeleteName == 'Pipeline Deals' || itemDeleteName == 'Portfolio Deals'"
                                        v-for="item in deleteTableList" :key="item.id" style="cursor: pointer">
                                        <td>{{ item.dealId }}</td>
                                        <td>{{ item.companyName }}</td>
                                        <td>{{ item.productDescription }}</td>
                                        <td>{{ item.leadTransactorName }}</td>
                                        <td>{{ item.dealCategory }}</td>
                                        <td style="color:red; font-size: 15px"
                                          @click="dialogConfirmDelete2 = true; adminDeleteItemId = item.dealId">X</td>
                                      </tr>
                                      <tr v-if="itemDeleteName == 'Transaction Update'" v-for="item in deleteTableList"
                                        :key="item.id" style="cursor: pointer">
                                        <td>{{ item.regardingRecordId }}</td>
                                        <td>{{ item.description }}</td>
                                        <td>{{ item.recordOwnerFullName }}</td>
                                        <td>
                                          <div class="card-text" v-html="item.notes"></div>
                                        </td>
                                        <td style="color:red; font-size: 15px"
                                          @click="dialogConfirmDelete2 = true; adminDeleteItemId = item.activityId">X</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </v-row>
                            </v-container>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" @click="dialogAdminDelete = false">
                              Cancel
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                      <v-dialog v-model="dialogConfirmDelete2" max-width="500px">
                        <v-card>
                          <v-card-title class="text-h5">Are you sure you want to delete this
                            item?</v-card-title>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text"
                              @click="dialogConfirmDelete2 = false">Cancel</v-btn>
                            <v-btn color="blue-darken-1" variant="text" @click="deleteItemAdminConfirm()">OK</v-btn>
                            <v-spacer></v-spacer>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </div>
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="table-responsive">
                          <table class="table" ref="transactSummary">
                            <thead>
                              <tr>
                                <th scope="col">
                                  <div class="d-flex align-center gap-1">
                                    <span class="noshrink">Type</span>
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="item in deleteTypeList" :key="item.id" style="cursor: pointer"
                                @click="openDeleteDialog(item.title)">
                                <td>{{ item.title }}</td>
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
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import settingsServices from '../services/settingsServices';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useDashOptionStore } from "../stores/dashOption";
import pinia from "../stores/store";
import crmService from '../services/crmService';
import trmsService from '../services/trmsService';

const stores = useDashOptionStore(pinia);

export default {
  data: () => ({
    dialogEditIndustry: false,
    dialogEditLeadSource: false,
    dialogEditProducts: false,
    dialogEditLevels: false,
    dialogEditBusinessUnit: false,
    dialogEditDepartment: false,
    dialogEditActivityType: false,
    dialogEditFinancialYear: false,
    dialogEditFinancialYearTarget: false,
    dialogDeleteActivityLevel: false,
    dialogDeleteLeadSource: false,
    dialogDeleteLevels: false,
    dialogDeleteProduct: false,
    dialogDeleteIndustry: false,
    dialogDelete: false,
    guaranteePipelineTarget: 0,
    ccapprovalTarget: 0,
    feeLetterTarget: 0,
    financialCloseTarget: 0,
    originationMandatedTarget: 0,
    selectedYear: '',
    deleteTypeList: [
      { title: 'Pipeline Projects', id: 1 },
      { title: 'Mandated Clients', id: 2 },
      { title: 'Companies', id: 3 },
      { title: 'Contacts', id: 4 },
      { title: 'Pipeline Deals', id: 5 },
      { title: 'Portfolio Deals', id: 6 },
      { title: 'Transaction Update', id: 7 },
    ],
    headersLeadSource: [
      {
        title: 'Source',
        align: 'start',
        sortable: true,
        key: 'leadSourceName',
      },
      { title: 'Actions', align: 'end', key: 'actions', sortable: false },
    ],
    headersActivityType: [
      {
        title: 'Name',
        align: 'start',
        sortable: true,
        key: 'name'
      },
      { title: 'Actions', align: 'end', key: 'actions', sortable: false },
    ],
    headersFinancialYear: [
      {
        title: 'Year',
        align: 'start',
        sortable: true,
        key: 'name'
      },
      { title: 'Actions', align: 'end', key: 'actions', sortable: false },
    ],
    headersRegions: [
      {
        title: 'Region Name',
        align: 'start',
        sortable: true,
        key: 'regionName',
      },
      {
        title: 'Region Code',
        align: 'start',
        sortable: true,
        key: 'regionCode',
      },
    ],
    headersBusinessUnit: [
      {
        title: 'ShortCode',
        align: 'start',
        sortable: true,
        key: 'shortCode',
      },
      {
        title: 'Description',
        align: 'start',
        sortable: true,
        key: 'businessUnitDescription',
      },
      { title: 'Actions', align: 'end', key: 'actions', sortable: false },
    ],
    headersDepartment: [
      {
        title: 'ShortCode',
        align: 'start',
        sortable: true,
        key: 'shortCode',
      },
      {
        title: 'Description',
        align: 'start',
        sortable: true,
        key: 'departmentDescription',
      },
      { title: 'Actions', align: 'end', key: 'actions', sortable: false },
    ],
    headersGeneral: [
      {
        title: 'Name',
        align: 'start',
        sortable: true,
        key: 'description',
      },
      { title: 'Actions', align: 'end', key: 'actions', sortable: false },
    ],
    headersFinancialTarget: [
      {
        title: 'Year',
        align: 'start',
        sortable: true,
        key: 'financialYearName',
      },
      {
        title: 'Guarantee Pipeline',
        align: 'start',
        sortable: true,
        key: 'guaranteePipelineTarget',
      },
      {
        title: 'Mandates Origination Target',
        align: 'start',
        sortable: true,
        key: 'originationMandatedTarget',
      },
      {
        title: 'Execution Target (Credit Committee Letter)',
        align: 'start',
        sortable: true,
        key: 'creditCommitteeApprovalTarget',
      },
      {
        title: 'Execution Target (Fee Letter)',
        align: 'start',
        sortable: true,
        key: 'feeLetterTarget',
      },
      {
        title: 'Execution Target (Closing)',
        align: 'start',
        sortable: true,
        key: 'financialCloseTarget',
      },
      { title: 'Actions', align: 'end', key: 'actions', sortable: false },
    ],
    industries: [],
    products: [],
    businessUnits: [],
    departments: [],
    levels: [],
    financialYearTarget: [],
    financialYear: [],
    regions: [],
    leadSource: [],
    activityType: [],
    dataTableSelected: [],
    deleteTableList: [],
    isIndustries: true,
    isDepartments: false,
    isBusinessUnits: false,
    isRegion: false,
    isLeadSource: false,
    itemName: '',
    itemDeleteName: '',
    isProducts: false,
    dialogNew: false,
    dialogNew2: false,
    dialogNew3: false,
    dialogNew4: false,
    dialogAdminDelete: false,
    dialogConfirmDelete2: false,
    isLevels: false,
    isActivityType: false,
    isFinancialYearTarget: false,
    isFinancialYear: false,
    isAdminDelete: false,
    editedIndex: -1,
    newItem: '',
    newItemShortcode: '',
    itemId: '',
    adminDeleteItemId: '',
    itemDescription: '',
    editedItem: {
      name: '',
    },
    editedItem2: {
      name: '',
      shortCode: '',
    },
    editedItem4: {
      id: '',
      leadSourceName: '',
    },
    editedItem5: {
      name: '',
    },
    editedItem6: {
      name: '',
      status: '',
    },
    defaultItem: {
      name: '',
    },
  }),

  computed: {
    formTitle() {
      return `Edit ${this.itemName} `
    },
    formTitleAdminDelete() {
      return `Delete ${this.itemDeleteName} `
    },
    initializeValues() {
      if (this.isIndustries) {
        this.dataTableSelected = this.industries
      }
      else if (this.isProducts) {
        this.dataTableSelected = this.products
      }
      else if (this.isLevels) {
        this.dataTableSelected = this.levels
      }
      else if (this.isRegion) {
        this.dataTableSelected = this.regions
      }
      else if (this.isLeadSource) {
        this.dataTableSelected = this.leadSource
      }
      else if (this.isDepartments) {
        this.dataTableSelected = this.departments
      }
      else if (this.isBusinessUnits) {
        this.dataTableSelected = this.businessUnits
      }
      else if (this.isActivityType) {
        this.dataTableSelected = this.activityType
      }
      else if (this.isFinancialYearTarget) {
        this.dataTableSelected = this.financialYearTarget
      }
      else if (this.isFinancialYear) {
        this.dataTableSelected = this.financialYear
      }
      return this.dataTableSelected
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  async created() {
    this.industries = await settingsServices.getIndustries();
    this.departments = await settingsServices.getDepartments();
    this.businessUnits = await settingsServices.getBusinessUnits();
    this.products = await settingsServices.getProducts();
    this.levels = await settingsServices.getLevels();
    this.regions = await settingsServices.getRegions();
    this.leadSource = await settingsServices.getLeadSources();
    this.financialYearTarget = await settingsServices.getFinancialYearTargets();
    this.financialYear = await settingsServices.getFinancialYears();
    this.activityType = await crmService.getActivityTypes();
  },

  methods: {
    async openDeleteDialog(item) {
      this.dialogAdminDelete = true
      this.deleteTableList = []
      this.itemDeleteName = item
      if (item == 'Pipeline Projects') {
        let list = await crmService.getLeads()
        this.deleteTableList = list.filter(o => o.mandateSigned == false)
      }
      else if (item == 'Mandated Clients') {
        let list = await crmService.getLeads()
        this.deleteTableList = list.filter(o => o.mandateSigned == true)
      }
      else if (item == 'Companies') {
        this.deleteTableList = await crmService.getCompanies()
      }
      else if (item == 'Contacts') {
        this.deleteTableList = await crmService.getContacts()
      }
      else if (item == 'Pipeline Deals') {
        let list = await trmsService.getDeals()
        this.deleteTableList = list.filter(o => o.dealCategory != 'CLOSED')
      }
      else if (item == 'Portfolio Deals') {
        let list = await trmsService.getDeals()
        this.deleteTableList = list.filter(o => o.dealCategory == 'CLOSED')
      }
      else if (item == 'Transaction Update') {
        this.deleteTableList = await crmService.getActivities()
      }

    },

    async deleteItemAdminConfirm() {
      if (this.itemDeleteName == 'Pipeline Projects') {
        let status = await crmService.deleteLead(this.adminDeleteItemId)
        if (status == 200) {
          this.dialogConfirmDelete2 = false
          let list = await crmService.getLeads()
          this.deleteTableList = list.filter(o => o.mandateSigned == false)
        }
      }
      else if (this.itemDeleteName == 'Mandated Clients') {
        let status = await crmService.deleteLead(this.adminDeleteItemId)
        if (status == 200) {
          this.dialogConfirmDelete2 = false
          let list = await crmService.getLeads()
          this.deleteTableList = list.filter(o => o.mandateSigned == true)
        }
      }
      else if (this.itemDeleteName == 'Companies') {
        let status = await crmService.deleteCompany(this.adminDeleteItemId)
        if (status == 200) {
          this.dialogConfirmDelete2 = false
          this.deleteTableList = await crmService.getCompanies()
        }
      }
      else if (this.itemDeleteName == 'Contacts') {
        let status = await crmService.deleteContact(this.adminDeleteItemId)
        if (status == 200) {
          this.dialogConfirmDelete2 = false
          this.deleteTableList = await crmService.getContacts()
        }
      }
      else if (this.itemDeleteName == 'Pipeline Deals') {
        let status = await trmsService.deleteDeal(this.adminDeleteItemId)
        if (status == 200) {
          this.dialogConfirmDelete2 = false
          let list = await trmsService.getDeals()
          this.deleteTableList = list.filter(o => o.dealCategory != 'CLOSED')
        }
      }
      else if (this.itemDeleteName == 'Portfolio Deals') {
        let status = await trmsService.deleteDeal(this.adminDeleteItemId)
        if (status == 200) {
          this.dialogConfirmDelete2 = false
          let list = await trmsService.getDeals()
          this.deleteTableList = list.filter(o => o.dealCategory == 'CLOSED')
        }
      }
      else if (this.itemDeleteName == 'Transaction Update') {
        let status = await crmService.deleteActivity(this.adminDeleteItemId)
        if (status == 200) {
          this.dialogConfirmDelete2 = false
          this.deleteTableList = await crmService.getActivities()
        }
      }
    },
    editItem(item) {
      this.editedIndex = this.industries.indexOf(item.id)
      this.editedItem = Object.assign({}, item)
      this.dialogEditIndustry = true
      this.itemId = item.id
    },
    editItem2(item) {
      this.editedIndex = this.departments.indexOf(item.id)
      this.editedItem2 = Object.assign({}, item)
      this.dialogEditDepartment = true
      this.itemId = item.id
    },
    editItem3(item) {
      this.editedIndex = this.businessUnits.indexOf(item.id)
      this.editedItem2 = Object.assign({}, item)
      this.dialogEditBusinessUnit = true
      this.itemId = item.id
    },
    editItem4(item) {
      this.editedIndex = this.leadSource.indexOf(item.id)
      this.editedItem4 = Object.assign({}, item)
      this.dialogEditLeadSource = true
      this.itemId = item.id
    },
    editItem5(item) {
      this.editedIndex = this.activityType.indexOf(item.id)
      this.editedItem5 = Object.assign({}, item)
      this.dialogEditActivityType = true
      this.itemId = item.id
    },
    editItem6(item) {
      this.editedIndex = this.activityType.indexOf(item.id)
      this.editedItem5 = Object.assign({}, item)
      this.dialogEditFinancialYearTarget = true
      this.itemId = item.id
    },
    editItem7(item) {
      this.editedIndex = this.activityType.indexOf(item.id)
      this.editedItem6 = Object.assign({}, item)
      this.dialogEditFinancialYear = true
      this.itemId = item.id
    },
    deleteItem(item, id) {
      if (id == 1) {
        this.dialogDeleteIndustry = true
        this.itemId = item.id
      }
      else if (id == 2) {
        this.dialogDeleteProduct = true
        this.itemId = item.id
      }
      else if (id == 3) {
        this.dialogDeleteLevels = true
        this.itemId = item.id
      }
      else if (id == 5) {
        this.dialogDeleteLeadSource = true
        this.itemId = item.id
      }
      else if (id == 8) {
        this.dialogDeleteActivityLevel = true
        this.itemId = item.id
      }
    },
    async deleteItemConfirm(id) {
      if (id == 1) {
        let ps = await settingsServices.deleteIndustry(this.itemId)
        if (ps == 200) {
          this.closeDelete()
          toast.success("Item Deleted");
          setTimeout(async () => {
            this.industries = await settingsServices.getIndustries();
          }, 2000);
        } else {
          toast.error("An Error Occured, try again");
        }
      }
      else if (id == 2) {
        let ps = await settingsServices.deleteProducts(this.itemId)
        if (ps == 200) {
          this.closeDelete()
          toast.success("Item Deleted");
          setTimeout(async () => {
            this.products = await settingsServices.getProducts();
          }, 2000);
        } else {
          toast.error("An Error Occured, try again");
        }
      }
      else if (id == 3) {
        let ps = await settingsServices.deleteLevel(this.itemId)
        if (ps == 200) {
          this.closeDelete()
          toast.success("Item Deleted");
          setTimeout(async () => {
            this.levels = await settingsServices.getLevels();
          }, 2000);
        } else {
          toast.error("An Error Occured, try again");
        }
      }
      else if (id == 5) {
        let ps = await settingsServices.deleteLeadSource(this.itemId)
        if (ps == 200) {
          this.closeDelete()
          toast.success("Item Deleted");
          setTimeout(async () => {
            this.leadSource = await settingsServices.getLeadSources();
          }, 2000);
        } else {
          toast.error("An Error Occured, try again");
        }
      }
      else if (id == 8) {
        let ps = await crmService.deleteActivityType(this.itemId)
        if (ps == 200) {
          this.closeDelete()
          toast.success("Item Deleted");
          setTimeout(async () => {
            this.leadSource = await crmService.getActivityTypes();
          }, 2000);
        } else {
          toast.error("An Error Occured, try again");
        }
      }
    },
    close() {
      this.dialogEditIndustry = false
      this.dialogEditLeadSource = false
      this.dialogEditFinancialYearTarget = false
      this.dialogEditActivityType = false
      this.dialogEditFinancialYear = false
      this.dialogNew = false
      this.newItem = ''
      this.selectedYear = ''
      this.guaranteePipelineTarget = ''
      this.ccapprovalTarget = ''
      this.feeLetterTarget = ''
      this.financialCloseTarget = ''
      this.originationMandatedTarget = ''

      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async saveEdit(description, shortcode) {
      if (this.itemName == 'Industry') {
        await settingsServices.editIndustry(this.itemId, description, stores.signedInUserEmail)
        this.dialogEditIndustry = false
        this.editedItem = ''
        toast.success("Edit Successful");
        setTimeout(async () => {
          this.industries = await settingsServices.getIndustries();
        }, 2000);
      }
      else if (this.itemName == 'Product') {
        await settingsServices.editProduct(this.itemId, description, stores.signedInUserEmail)
        this.dialogEditIndustry = false
        this.editedItem = ''
        toast.success("Edit Successful");
        setTimeout(async () => {
          this.products = await settingsServices.getProducts();
        }, 2000);
      }
      else if (this.itemName == 'Level') {
        await settingsServices.editLevel(this.itemId, description, stores.signedInUserEmail)
        this.dialogEditIndustry = false
        this.editedItem = ''
        toast.success("Edit Successful");
        setTimeout(async () => {
          this.levels = await settingsServices.getLevels();
        }, 2000);
      }
      else if (this.itemName == 'Department') {
        await settingsServices.editDepartment(this.itemId, shortcode, stores.signedInUserEmail, description)
        this.dialogEditDepartment = false
        this.editedItem2 = ''
        this.newItemShortcode = ''
        toast.success("Edit Successful");
        setTimeout(async () => {
          this.departments = await settingsServices.getDepartments();
        }, 2000);
      }
      else if (this.itemName == 'Lead Source') {
        await settingsServices.editLeadSources(this.itemId, description, stores.signedInUserEmail)
        this.dialogEditLeadSource = false
        this.editedItem4 = ''
        this.newItemShortcode = ''
        toast.success("Edit Successful");
        setTimeout(async () => {
          this.leadSource = await settingsServices.getLeadSources();
        }, 2000);
      }
      else if (this.itemName == 'Business Unit') {
        let ps = await settingsServices.editBusinessUnit(this.itemId, shortcode, stores.signedInUserEmail, description)
        this.dialogEditBusinessUnit = false
        this.editedItem2 = ''
        this.newItemShortcode = ''
        toast.success("Edit Successful");
        setTimeout(async () => {
          this.businessUnits = await settingsServices.getBusinessUnits();
        }, 2000);
      }
      else if (this.itemName == 'Activity Type') {
        await crmService.editActivityType(this.itemId, description, stores.signedInUserEmail)
        this.dialogEditActivityType = false
        this.editedItem = ''
        toast.success("Edit Successful");
        setTimeout(async () => {
          this.activityType = await crmService.getActivityTypes();
        }, 2000);
      }
      else if (this.itemName == 'Financial Year Traget') {
        if (description !== null) {
          await settingsServices.editFinancialYearTargets(this.itemId, description.financialYearName, description.guaranteePipelineTarget, description.creditCommitteeApprovalTarget, description.feeLetterTarget, description.financialCloseTarget, description.originationMandatedTarget, stores.signedInUserEmail, stores.signedInUserEmail, new Date().toJSON(), new Date().toJSON())
          this.dialogEditFinancialYearTarget = false
          this.editedItem5 = ''
          toast.success("Edit Successful");
          setTimeout(async () => {
            this.financialYearTarget = await settingsServices.getFinancialYearTargets();
          }, 2000);
        }
      }
      else if (this.itemName == 'Financial Year') {
        if (description !== null) {
          var firstDay = new Date(description.name.slice(2), 0, 1, 1).toJSON();
          var lastDay = new Date(description.name.slice(2), 11, 32).toJSON();
          let ps = await settingsServices.editFinancialYear(this.itemId, description.name, firstDay, lastDay, description.status, stores.signedInUserEmail, stores.signedInUserEmail, new Date().toJSON(), new Date().toJSON())
          console.log(ps)
          this.dialogEditFinancialYear = false
          this.editedItem6 = ''
          toast.success("Edit Successful");
          setTimeout(async () => {
            this.financialYear = await settingsServices.getFinancialYears();
          }, 2000);
        }
      }
      this.close()
    },
    async saveNew() {
      if (this.itemName == 'Industry') {
        let ps = await settingsServices.createIndustries(this.newItem, stores.signedInUserEmail)
        if (ps == true) {
          this.dialogNew = false
          this.newItem = ''
          toast.success("Industry Created Successfully");
        }
        setTimeout(async () => {
          this.industries = await settingsServices.getIndustries();
        }, 2000);
      }
      else if (this.itemName == 'Product') {
        let ps = await settingsServices.createProduct(this.newItem, stores.signedInUserEmail)
        if (ps == true) {
          this.dialogNew = false
          this.newItem = ''
          toast.success("Product Created Successfully");
        }
        setTimeout(async () => {
          this.products = await settingsServices.getProducts();
        }, 2000);
      }
      else if (this.itemName == 'Level') {
        let ps = await settingsServices.createLevel(this.newItem, stores.signedInUserEmail)
        if (ps == true) {
          this.dialogNew = false
          this.newItem = ''
          toast.success("Level Created Successfully");
        }
        setTimeout(async () => {
          this.levels = await settingsServices.getLevels();
        }, 2000);
      }
      else if (this.itemName == 'Lead Source') {
        await settingsServices.createLeadSources(this.newItem, stores.signedInUserEmail)
        this.dialogEditIndustry = false
        this.editedItem4 = ''
        this.newItemShortcode = ''
        toast.success("Lead Source Created Successfully");
        setTimeout(async () => {
          this.leadSource = await settingsServices.getLeadSources();
        }, 2000);
      }
      else if (this.itemName == 'Department') {
        let ps = await settingsServices.createDepartment(this.newItem, stores.signedInUserEmail, this.newItemShortcode)
        if (ps == true) {
          this.dialogNew2 = false
          this.newItem = ''
          this.newItemShortcode = ''
          toast.success("Department Created Successfully");
        }
        setTimeout(async () => {
          this.departments = await settingsServices.getDepartments();
        }, 2000);
      }
      else if (this.itemName == 'Business Unit') {
        let ps = await settingsServices.createBusinessUnit(this.newItem, stores.signedInUserEmail, this.newItemShortcode)
        if (ps == true) {
          this.dialogNew2 = false
          this.newItem = ''
          this.newItemShortcode = ''
          toast.success("Business Unit Created Successfully");
        }
        setTimeout(async () => {
          this.businessUnits = await settingsServices.getBusinessUnits();
        }, 2000);
      }
      else if (this.itemName == 'Activity Type') {
        let ps = await crmService.createActivityTypes(this.newItem, stores.signedInUserEmail, new Date().toJSON())
        if (ps == true) {
          this.dialogNew = false
          this.newItem = ''
          toast.success("Activity Type Created");
        }
        setTimeout(async () => {
          this.activityType = await crmService.getActivityTypes();
        }, 2000);
      }
      else if (this.itemName == 'Financial Year Target') {
        let ps = await settingsServices.createFinancialYearTarget(this.selectedYear, this.guaranteePipelineTarget, this.ccapprovalTarget, this.feeLetterTarget, this.financialCloseTarget, this.originationMandatedTarget, stores.signedInUserEmail)
        if (ps == true) {
          this.dialogNew3 = false
          this.selectedYear = ''
          this.guaranteePipelineTarget = ''
          this.ccapprovalTarget = ''
          this.feeLetterTarget = ''
          this.financialCloseTarget = ''
          toast.success("Financial Year Target Created");
        }
        setTimeout(async () => {
          this.financialYearTarget = await settingsServices.getFinancialYearTargets();
        }, 2000);
      }
      else if (this.itemName == 'Financial Year') {
        var firstDay = new Date(this.selectedYear, 0, 1, 1).toJSON();
        var lastDay = new Date(this.selectedYear, 11, 32).toJSON();
        let ps = await settingsServices.createFinancialYear(`FY${this.selectedYear}`, firstDay, lastDay, false, stores.signedInUserEmail)
        if (ps == true) {
          this.dialogNew4 = false
          this.selectedYear = ''
          toast.success("Financial Year Created");
        }
        setTimeout(async () => {
          this.financialYear = await settingsServices.getFinancialYears();
        }, 2000);
      }
      this.close()
    },
  },
}
</script>
<style scoped>
main {
  background: #fafafb;
  height: 100%;
  width: 100%;
  padding: 0px 50px;
}

.intro h3 {
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
}

.intro p {
  font-size: 16px;
  font-weight: 400;
  line-height: 19.2px;

}

.wrapper {
  min-height: 90vh;
}

.list-group-item {
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}

.card {
  border: 1px solid #ededed;
  box-shadow: 0px 0px 20px 2px #eaeaea;
}

.listGrid {
  font-family: 'Inter';
  font-size: .9375rem;
  font-weight: 400;
  line-height: 14px;
  text-align: left;
  color: #000000;
}

.nav-link {
  display: block;
  text-decoration: none;
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out;
}

.all-reports .nav-tabs .nav-link.active,
.all-reports .nav-tabs .nav-link:hover {
  background: #f6f6f6;
}

.nav-tabs>li>a {
  margin-right: 0;
  color: #888;
  border-radius: 0;
}

#style-4::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #F5F5F5;
}

#style-4::-webkit-scrollbar {
  width: 5px;
  background-color: #F5F5F5;
}

#style-4::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: #555;
}

#reports .nav-link {
  border: 0 none;
  padding: 10px;
}
</style>
<script setup>
import TabMenu from '../../components/TabMenu.vue';
import ToolBar from '../../components/ToolBar.vue';
import TableCreateDeals from '../../components/Tables/TableCreateDeals.vue'
import DetailsCard from '../../components/Cards/DetailsCardSidebar.vue';
import DealTeamCard from '../../components/Cards/DealTeamCardSidebar.vue';
import CheckList from '../../components/Cards/CheckList.vue';
import FileCard from '../../components/Cards/FileCard.vue';
import TimeLineCard from '../../components/Cards/TimeLineCard.vue';
import OtherDetailsCard from '../../components/Cards/OtherDetailsCard.vue';

import { ref } from 'vue'

const dialog = ref(false)
const dialog2 = ref(false)
const dialogPipeline = ref(false)
const modal = ref(false)

</script>

<template>
    <div class="wrapper">
        <TabMenu />
        <div class="d-flex justify-content-between align-center">

            <div class="intro mt-4 ">
                <h3> Create Deals</h3>
                <p> Search for the deal to be created </p>
            </div>
            <v-dialog v-model="dialog" width="700px">
                <template v-slot:activator="{ props }">
                    <span class="add-button" v-bind="props">
                        <v-icon icon="mdi-plus"></v-icon>
                    </span>
                </template>
                <v-card>
                    <v-card-text style="text-align: center;">
                        <h4> Is this an existing Transaction or would you like to create a new one?</h4>
                        <div class="d-flex justify-content-center align-items gap-4 my-4">
                            <!-- here -->
                            <button type="button" class="btn btn-outline" @click="dialog = false; dialogPipeline = true">
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
                        <h4> Would you like to create a transaction with entries from CRM</h4>
                        <div class="d-flex justify-content-center align-items gap-4 my-4">
                            <!-- here -->
                            <button type="button" class="btn btn-outline" @click="dialog2 = false">
                                Yes
                            </button>
                            <button type="button" class="btn btn-success" @click="modal = true; dialog2 = false">
                                No
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
                                <h3> Select from Pipeline Deals </h3>
                                <div class="input-group search-bar">
                                    <input type="text" class="form-control" placeholder="Search">
                                    <span class="input-group-text"><v-icon icon="mdi-magnify"></v-icon></span>
                                </div>
                            </div>
                            <v-icon @click="dialogPipeline = false" icon="mdi-close" size="large"></v-icon>
                        </div>
                        <TableCreateDeals />
                        <div class="d-flex justify-content-end mr-2 mt-3">
                            <button @click="modal = false" class="submit-button">Select</button>
                        </div>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </div>
        <ToolBar />
        <div class="d-flex justify-content-between mt-4  ">
            <div class="custom-table table-responsive-sm">
                <TableCreateDeals />

            </div>
            <div class="side-panel">
                <h4> Details </h4>
                <div class="accordion" id="accordionPanelsStayOpenExample">
                    <div class="accordion-item">

                        <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="false"
                                aria-controls="panelsStayOpen-collapseOne">
                                Contact Details
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse"
                            aria-labelledby="panelsStayOpen-headingOne">
                            <div class="accordion-body">
                                <DetailsCard />
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false"
                                aria-controls="panelsStayOpen-collapseTwo">
                                Deal Team
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse"
                            aria-labelledby="panelsStayOpen-headingTwo">
                            <div class="accordion-body">
                                <DealTeamCard />
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false"
                                aria-controls="panelsStayOpen-collapseThree">
                                Checklist
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse"
                            aria-labelledby="panelsStayOpen-headingThree">
                            <div class="accordion-body">
                                <CheckList />
                            </div>
                        </div>
                    </div>


                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingFour">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-collapseFour " aria-expanded="false"
                                aria-controls="panelsStayOpen-collapseFour">
                                Other Details
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseFour" class="accordion-collapse collapse"
                            aria-labelledby="panelsStayOpen-headingFour">
                            <div class="accordion-body">
                                <OtherDetailsCard />
                            </div>
                        </div>
                    </div>


                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingFive">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-collapseFive" aria-expanded="false"
                                aria-controls="panelsStayOpen-collapseFive">
                                Files
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseFive" class="accordion-collapse collapse"
                            aria-labelledby="panelsStayOpen-headingFive">
                            <div class="accordion-body">
                                <FileCard />

                            </div>
                        </div>
                    </div>


                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingSix">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-collapseSix" aria-expanded="false"
                                aria-controls="panelsStayOpen-collapseSix">
                                Activity Timeline
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseSix" class="accordion-collapse collapse"
                            aria-labelledby="panelsStayOpen-headingSix">
                            <div class="accordion-body">
                                <TimeLineCard v-for="i in 3" />

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>


    </div>
</template>

<style scoped>
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
.collapse.show {
  visibility: visible;
}

.custom-table {
    width: 70%;
}

.side-panel {
    padding: 20px;
    background: #eeeeee;
    width: 35%;
}

.accordion-body {
    padding: 10px;
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
    font-size: 16px;
    font-weight: 400;
    line-height: 19.2px;
}

.add-button {
    padding: 10px;
    border-radius: 50%;
    background: var(--gradient, linear-gradient(90deg, #227CBF 0%, #47B65C 100%));
    cursor: pointer;
    color: #FFF;
}

.close-modal {
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
}

.search-bar {
    width: 50%;
    height: 40px;

}

.input-group input::placeholder {
    font-size: 12px;
    line-height: 14.4px;
}

.search-bar span {
    cursor: pointer;
}
</style>
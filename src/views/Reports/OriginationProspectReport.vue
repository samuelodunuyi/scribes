<script setup>
import { ref, onMounted } from 'vue'
import TabMenu from '../../components/TabMenu.vue';
import ReportSubMenu from '../../components/ReportSubMenu.vue';
import crmService from '../../services/crmService';

const crmList = ref([])
onMounted(() => {
    crmDetails()
})

const crmDetails = async () => {
    crmList.value = await crmService.getLeads()
    console.log(crmList.value)


}

</script>
<template>
    <div class="wrapper">
        <div>
            <TabMenu />
            <div class="intro mt-4 ">
                <h3> Report </h3>
                <ReportSubMenu />
            </div>
        </div>
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> S/N </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Infrastructure Entity </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Infrastructure Activity </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Brief Description </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span> Size(N'b) </span>
                            </div>
                        </th>
                        <th scope="col">
                            <div class="d-flex align-center gap-1">
                                <span>NBC/Mandate Status </span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(i, index) in crmList" :key="index">
                        <td>{{ index+1 }}</td>
                        <td>{{ i.companyName }}</td>
                        <td>{{ i.companyName }}</td>
                        <td>{{ i.leadProjectDescription }}</td>
                        <td>{{ i.totalProjectSize_Indicative }}</td>
                        <td v-if="i.nbcApproved==true && i.nbcApproved==true">*NBC Approval obtained <br>*Mandate Letter Signed</td>
                        <td v-if="i.mandateSigned==false && i.nbcApproved==true">*NBC Approval obtained <br>*Awaiting Mandate Letter</td>
                        <td v-if="i.mandateSigned==true && i.nbcApproved==false">*Awaiting NBC Approval  <br>*Mandate Letter Signed</td>
                        <td v-if="i.mandateSigned==false && i.nbcApproved==false">*Awaiting NBC Approval <br>*Awaiting Mandate Letter</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<style scoped>
.chart-box-3 {
    width: 27%;
    align-items: center;
    margin: 0px auto;
    text-align: center;
    padding: 20px 0px;
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
    padding: 20px 15px;
    cursor: pointer;
}

thead,
tr {
    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}

tr:hover {
    background: #4b4a4a;
    background-color: rgba(0, 0, 0, 0.1);
}

.noshrink {
    display: flex;
    flex-shrink: 0;
}</style>
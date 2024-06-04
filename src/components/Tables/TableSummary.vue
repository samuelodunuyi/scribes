<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDashOptionStore } from "../../stores/dashOption"
import pinia from "../../stores/store";
const stores = useDashOptionStore(pinia);
import GradeButton from '../../components/GradeButton.vue';
const props = defineProps(['deal'])
const searchValue = ref('')

const transactSummary = ref(null)

const pipelineDeals = computed(() => {
    var pipelineDealList = props.deal
    // Process search input
    if (searchValue.value != '' && searchValue.value) {
        pipelineDealList = pipelineDealList.filter((item) => {
            return item.companyName.toLowerCase().includes(searchValue.value.toLowerCase()) ||
                item.regionName.toLowerCase().includes(searchValue.value.toLowerCase()) ||
                item.productDescription.toLowerCase().includes(searchValue.value.toLowerCase())
        })
    }
    stores.transactionSummary = transactSummary.value
    return pipelineDealList
})


</script>

<template>
    <div>
        <div class="table-responsive" >
            <table class="table" ref="transactSummary">
            <thead>
              <tr>
                <th scope="col">
                  <div class="d-flex align-center gap-1">
                    <span class="noshrink"> S/N</span>
                  </div>
                </th>
                <th scope="col" style="width: 100px">
                  <div class="d-flex align-center gap-1">
                    <span class="noshrink"> Client</span>
                  </div>
                </th>
                <th scope="col" style="width: 100px">
                  <div class="d-flex align-center gap-1">
                    <span class="noshrink">Transaction Name</span>
                  </div>
                </th>
                <th scope="col">
                  <div class="d-flex align-center gap-1">
                    <span> Transaction Size </span>
                  </div>
                </th>
                <th scope="col">
                  <div class="d-flex align-center gap-1">
                    <span> Status </span>
                  </div>
                </th>
                <th scope="col">
                  <div class="d-flex align-center gap-1">
                    <span> Transactor</span>
                  </div>
                </th>
                <th scope="col">
                  <div class="d-flex align-center gap-1">
                    <span>Product </span>
                  </div>
                </th>
                <th scope="col">
                  <div class="d-flex align-center gap-1">
                    <span> Recent Updates </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in pipelineDeals" :key="item.dealId">
                <td>{{ item.count }}</td>
                <td style="width:100px">{{ item.companyName }}</td>
                <td style="width:100px">{{ item.transactionName }}</td>
                <td>{{ item.dealSize }}</td>
                <td>
                  <GradeButton :grade="item.dealCategory" />
                </td>
                <td>{{ item.leadTransactorName }}</td>
                <td>{{ item.productDescription }}</td>
                <td><div v-html="item.latestTransactionUpdate"></div></td>
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
    color: black;
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
</style>
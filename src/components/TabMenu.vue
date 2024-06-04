<script setup>
import { ref, watch, onMounted } from 'vue';
import { useDashOptionStore } from "../stores/dashOption"
import pinia from "../stores/store";
import 'vue3-toastify/dist/index.css';
import settingsServices from '../services/settingsServices';

const stores = useDashOptionStore(pinia);
const financialYear = ref([])
const selectedFinancialYear = ref('')

onMounted(async () => {
  financialYear.value = await settingsServices.getFinancialYears()
  financialYear.value = financialYear.value.sort(
    (p1, p2) => (p1.name < p2.name) ? 1 : (p1.name > p2.name) ? -1 : 0);
  selectedFinancialYear.value = (financialYear.value.filter(o => o.status == true))[0].name
  stores.financialYear = selectedFinancialYear.value
});

const selectFinancialYear = () => {
  stores.financialYear = selectedFinancialYear.value
}
</script>



<template>
  <div class="menu">
    <nav class="navbar navbar-expand-md ">

      <ul class="navbar-nav">
        <li class="nav-item dropdown ">
          <a class="nav-link dropdown-toggle" to="/crm" href="#" role="button" data-bs-toggle="dropdown"
            aria-expanded="false" style="text-decoration: none;">
            <router-link to="/crm">
              CRM
            </router-link>
          </a>
          <ul class="dropdown-menu">
            <li><router-link to="/crm" class="dropdown-item active-link" style="border: none;">Dashboard</router-link>
            </li>
            <li><router-link to="/crm/pipelineprojects" class="dropdown-item active-link" style="border: none;">Pipeline
                Projects</router-link> </li>
            <li><router-link to="/crm/mandatedclients" class="dropdown-item active-link" style="border: none;">Mandated
                Clients</router-link> </li>
            <li><router-link to="/crm/transactors" class="dropdown-item" style="border: none;">Transactors</router-link>
            </li>
            <li><router-link to="/crm/company" class="dropdown-item" style="border: none;">Company</router-link> </li>
            <li><router-link to="/crm/contacts" class="dropdown-item" style="border: none;">Contacts</router-link> </li>
          </ul>
        </li>

        <li class="nav-item dropdown ">
          <a class="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <router-link to="/TRMS">
              TRMS
            </router-link>
          </a>
          <ul class="dropdown-menu">
            <li><router-link to="/TRMS" class="dropdown-item active-link" style="border: none;">Dashboard</router-link>
            </li>
            <li>
              <router-link to="/TRMS/pipelinedeals" class="dropdown-item" style="border: none;">Pipeline
                Deals</router-link>
            </li>
            <li>
              <router-link to="/TRMS/portfoliodeals" class="dropdown-item" style="border: none;">Portfolio
                Deals</router-link>
            </li>            <li>
              <router-link to="/TRMS/MPR" class="dropdown-item" style="border: none;">MPR</router-link>
            </li>
            <li>
              <router-link to="/report" class="dropdown-item" style="border: none;">Report</router-link>
            </li>
            <li>
              <span class="dropdown-item"> Budget</span>
            </li>
          </ul>
        </li>

        <li class="nav-item link">
          <a class="nav-link " href="#">PMS </a>
        </li>
        <li class="nav-item link" v-if="stores.signedInUserLevel=='MANAGEMENT' || stores.signedInUserLevel=='IT'">
          <router-link to="/ces" class="nav-link">CES</router-link>
        </li>

        <li class="nav-item link" v-if="stores.signedInUserLevel=='MANAGEMENT' || stores.signedInUserLevel=='IT'">
          <router-link to="/administration" class="nav-link">Administration</router-link>
        </li>

        <li class="nav-item link" v-if="stores.signedInUserLevel=='MANAGEMENT' || stores.signedInUserLevel=='IT'">
          <router-link to="/settings" class="nav-link"> Settings </router-link>
        </li>

        <li class="nav-item link" v-if="stores.signedInUserLevel=='MANAGEMENT' || stores.signedInUserLevel=='IT'">
          <router-link to="/audit" class="nav-link"> Audit </router-link>
        </li>
      </ul>

    </nav>

    <label>
      <span> Financial Year </span>
      <select class="form-select" v-model="selectedFinancialYear" @change="selectFinancialYear">
        <option :value=year.name v-for="year in financialYear" :key="year.id">{{
          year.name }}
        </option>
      </select>
    </label>
  </div>
</template>

<style scoped>
.menu {
  display: flex;
  justify-content: space-between;
}

label {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
}

label span {
  flex-shrink: 0;
}

label select {
  flex-grow: 0;
}

.navbar {
  border-bottom: 1px solid #808080;
  width: 80%;
  flex-wrap: nowrap;
}

.navbar-nav .nav-item:first-child .nav-link {
  padding-left: 0;
}

.nav-link.active {
  color: #227cbf;
  border-bottom: 5px solid #227cbf;

}

.nav-item {
  margin-top: 10px;
  margin-right: 45px;
  position: relative;
}

.nav-link {
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-decoration: none;
  color: black;
}

.link {
  margin-right: 40px;
}

a {
  color: black;
  text-decoration: none;
}

.active-link {
  width: 100%;
  padding-bottom: 12px;
  height: 35px;
  border-bottom: 5px solid #227cbf;
}</style>
<script setup>
import { ref, watch } from 'vue';
import trmsService from '../../services/trmsService';
const props = defineProps(['topBar', 'bottomBar']);
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const transactions = ref([])
watch(() => props.topBar, async (first, second) => {
  if (props.topBar != '' && props.topBar != null && props.topBar) {
    let names = props.topBar.userFullName
    firstName.value = names.split(" ")[0]
    lastName.value = names.split(" ")[1]

    transactions.value = await trmsService.getLeadsByTransactor(props.topBar.userId)
    const maxLen = 16;

let result = props.topBar.userId.substring(0, maxLen);
    email.value = result.substring(0, 16);
  }
});
</script>
<template>
  <div class="det">
    <div class="det-title">
      <h4>Transactor Details</h4>
    </div>

    <div class="d-flex justify-content-between name flex-md-wrap">
      <div class="fname">
        <h5>First Name</h5>
        <h6>{{ firstName }}</h6>
      </div>

      <div class="fname">
        <h5>Last Name</h5>
        <h6>{{ lastName }}</h6>
      </div>
    </div>
    <div class="d-flex justify-content-between name flex-md-wrap">
      <div class="email">
        <h5>Email Address</h5>
        <h6>{{ email }}...</h6>
      </div>

      <div class="email">
        <h5>Phone Number</h5>
        <h6>{{ topBar.phoneNumber }}</h6>
      </div>
    </div>
    <div class="d-flex justify-content-between name flex-md-wrap">
      <div class="email">
        <h5>Department</h5>
        <h6>{{ topBar.departmentDescription }}</h6>
      </div>

      <div class="email">
        <h5>Unit</h5>
        <h6>{{ topBar.businessUnitDescription }}</h6>
      </div>
    </div>
    <div class="d-flex justify-content-between name flex-md-wrap">
      <div class="email">
        <h5>Role</h5>
        <h6>{{ topBar.roleName }} </h6>
      </div>

    </div>
  </div>
  <div class="det mt-3">
    <div class="det-title">
      <h4>Transaction</h4>
    </div>
    <div class="table-responsive-sm">

      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Company Name</th>
            <th scope="col">Role</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="row in transactions" style="cursor: pointer;" :key="row.leadId">
            <td scope="row">{{ row.leadId }}</td>
            <td>{{ row.companyName }}</td>
            <td>{{ row.leadStatus }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
.det {
  display: flex;
  padding: 15px 15px 25px 15px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 5px;
  border: 0.885px solid var(--gray-200, #e4e4e7);
  background: var(--color-3, #fff);
  box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.1);
}

.det-title {
  display: flex;
  height: 44px;
  padding: 10px 0px;
  flex-direction: column;
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

.name {
  display: flex;
  align-items: center;
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

tbody tr td {
  color: var(--grey-dark, #808080);
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
  padding: 20px;
}</style>
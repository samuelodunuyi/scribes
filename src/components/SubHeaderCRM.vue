<script setup>
import { RouterLink } from 'vue-router'

defineProps(['title', 'companyName', 'companyName2'])

</script>

<template>
  <div class="MainHead">
    <div class="WelcomeNote">
      <div aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><RouterLink to="/crm" style="color:black">CRM</RouterLink></li>
          <li class="breadcrumb-item" v-if="title=='Mandated Clients'"><RouterLink to="/crm/mandatedclients" style="color:black" >{{title}}</RouterLink></li>
          <li class="breadcrumb-item" v-else="title=='Pipeline Projects'"><RouterLink to="/crm/pipelineprojects" style="color:black" >{{title}}</RouterLink></li>
          <li class="breadcrumb-item" aria-current="page" style="color:#000; font-weight: bold;">{{companyName2}}</li>
        </ol>
      </div>
      <p class="pd"><b>{{title}}</b></p>
      <div class="ps mt-5" style="position:relative;">
        <div class="d-flex mt-2" style="position:absolute;left:0px;">
          <p class="lfz"><b>{{companyName2}}</b></p>
        </div>
      </div>

    </div>

  </div>
</template>

<script>


export default {
  name: 'PageMenuHeader',
  data() {
    return {
      account: undefined,
      firstName: undefined,
      userRoleId: '',
      showBidderMenu: false,
      showBasicMenu: false,
      showFinanceAdminMenu: false,
      showProcurementAdminMenu: false,
      showITAdminMenu: false,
      showManagementMenu: false,
      text: 'myrecords',
    };
  },

  
};

</script>

<style scoped>
.MainHead {
  width: 100%;
  height: 5%;
  margin-left: 20px;
  color: black !important;
}

.WelcomeNote {
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;
  height: 24px;
  padding-top: 30px;
}

.pd {
  float: left;
}

.lfz {
  font-size: 13px;
  width: 240px;
}

.WelcomeNote b {
  font-weight: 500;
  font-size: 18px;
}

/* Style the list */
ol.breadcrumb {
  list-style: none;
}

/* Add a color to all links inside the list */
ol.breadcrumb li a,
.active {
  text-decoration: none;
}

ol.breadcrumb li {
  font-size: 14px;
}
</style>
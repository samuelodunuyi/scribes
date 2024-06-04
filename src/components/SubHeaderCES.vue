<script setup>
import { RouterLink } from 'vue-router'

defineProps(['title', 'companyName', 'companyName2'])

</script>

<template>
  <div class="MainHead">
    <div class="WelcomeNote">
      <div aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><RouterLink to="/ces" style="color:black"><v-icon style="margin-top: -3px">mdi-chevron-left</v-icon>Back</RouterLink></li>
          <li class="breadcrumb-item" aria-current="page" style="color:#000; cursor: context-menu">{{companyName2}}</li>
        </ol>
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
  margin-left: 10px;
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
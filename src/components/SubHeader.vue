<script setup>

</script>

<template>
  <div class="MainHead">
    <div class="WelcomeNote">
      <div aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><RouterLink to="/TRMS" style="color:#9F9F9F">TRMS</RouterLink></li>
          <li class="breadcrumb-item"><RouterLink to="/pipelinedeals" style="color:#9F9F9F">Pipeline Deals</RouterLink></li>
          <li class="breadcrumb-item" aria-current="page" style="color:#000">Lagos Free Zone Company</li>
        </ol>
      </div>
      <p class="pd"><b>Pipeline Deal</b></p>
      <div class="ps mt-5" style="position:relative;">
        <div class="d-flex mt-2" style="position:absolute;left:0px;">
          <p class="lfz"><b>Lagos Free Zone Company</b></p>

          <div style="text-align:center;background:#fee2e2;width:70px;border-radius:10px 10px;display:flex;height:15px;margin-left:20px;margin-top:5px">

            <span class="dots"></span>
            <h6 style="font-size:12px;margin-left:6px">Red</h6>
          </div>
          <div class="right" style="margin-left:900px">
            <h6 style="color:#9F9F9F;font-size:12px;margin-top:6px">#CP4526</h6>
          </div>

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

  

  // mounted() {
  //   const accounts = authenticationService.msalInstance.getAllAccounts();
  //   this.account = accounts[0];
  //   this.firstName = this.account.name
  //   this.firstName = this.firstName.substring(0, this.firstName.indexOf(' '));
  // },
};

</script>

<style scoped>
.MainHead {
  width: 100%;
  height: 5%;
  margin-left: 20px;
}

.WelcomeNote {
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;
  height: 24px;
  flex: none;
  order: 0;
  flex-grow: 0;
  padding-top: 30px;
}

.pd {
  float: left;
}

.lfz {
  font-size: 14px;
  width: 240px;
}

.WelcomeNote b {
  height: 24px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #000000;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.tabmenu {
  margin-top: 20px;
  width: 1045px;
  height: 44px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 30px;
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
  font-size: 12px;
}

.box {
  height: 15px;
  width: 70px;
  background-color: #fee2e2;
  border-radius: 10px 10px;
  margin-left: 20px;
  margin-top: 6px;
}

.dot {
  height: 10px;
  width: 10px;
  background-color: #ff0000;
  border-radius: 50%;
}

.dots {
  height: 10px;
  width: 10px;
  background-color: #ff0000;
  border-radius: 50%;
  margin-top: 2px;
  margin-left: 15px;
}
</style>

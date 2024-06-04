<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
  <div class="MainHead">
    <div class="WelcomeNote">

    </div>

    <div class="wrap d-flex">
      <div class="topItems">
        <!-- <div class="topItems"> -->
        <div class="tabmenu">
          <ul class="nav justify-content-start">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="#">CRM<i class="fas fa-light fa-angle-down ml-1" style="color: #808080;"></i></a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link" href="#">TRMS<i class="fas fa-light fa-angle-down ml-1" style="color: #808080;"></i></a>

            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">PMS</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Administration</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="#" tabindex="-1" style="color: #227cbf;
            border-bottom: 5px solid #227cbf;padding-bottom: 14px;cursor: default;">Settings</a>
            </li>
          </ul>

        </div>
      </div>
      <div class="f-year mt-4 d-flex" style="position:relative;height:40px">
        <label for="financial year" style="color: var(--black, #000);font-size: 16px;font-family: 'Inter';font-style: normal;font-weight: 400;line-height: 19.2px;margin-top:7px">Financial Year:</label>
        <select class="form-select form-select-sm" aria-label=".form-select-sm example" style="width:85px;height:35px;position:absolute;top:0px;left:110px">
          <option selected>2023</option>
          <option value="1">2022</option>
          <option value="2">2021</option>
          <option value="3">2020</option>
        </select>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'PageMenuHeader',

};

</script>

<style scoped>
.MainHead {
  width: 100%;
}

.WelcomeNote {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0px;
  gap: 10px;
  height: 4px;
  flex: none;
  order: 0;
  flex-grow: 0;
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

.inactive {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  font-family: 'Inter';
  text-decoration: none;
  color: #808080;
}

.nav-link .active {
  color: #227cbf;
  border-bottom: 1.5px solid #227cbf;
  padding-bottom: 14px;
  cursor: default;
}

.WelcomeNote h2 {
  height: 20px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #808080;
}

.tabmenu {
  margin-top: 10px;
  width: 1045px;
  height: 44px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 30px;
}

.topItems {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  width: 85%;
  height: 52px;
  border-bottom: 0.5px solid #808080;
}

.generalInput_ Input {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  gap: 71px;
  width: 220px;
  height: 35px;
  border: 0.5px solid #808080;
  border-radius: 5px;
  font-family: 'Inter';
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  color: #000000;
}

.generalInput_ {
  margin-top: 20px;
}

.generalInput_ p {
  color: black;
}

.rfqbtn:hover,
.rfqbtn2:hover {
  background: linear-gradient(90deg, #47b65c 0%, #227cbf 100%);
  transition: 0.7s;
}

.nav-link {
  color: var(--grey-dark, #808080);
  font-size: 16px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}

.nav-link .dropdown-toggle {
  outline: none;
  border: none;
}
</style>

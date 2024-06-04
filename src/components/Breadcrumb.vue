<script setup>
const props = defineProps({
  menu: {
    type: String,
    default: 'TRMS'
  },
  submenu: {
    type: String,
    default: 'Pipeline Deals'
  },
  grade: {
    type: String,
    default: 'RED'
  },
  title: {
    type: String,
    default: 'Lagos Free Zone Company'
  }
})

</script>

<template>
  <div class="wrapper" style="display: flex; flex-direction: row; justify-content: space-between;">
    <div aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a @click="$router.push('/TRMS')">{{ menu }}</a></li>
        <li class="breadcrumb-item"><a @click="$router.go(-1)">{{ submenu }}</a></li>
        <li class="breadcrumb-item" aria-current="page" style="color:#000"> {{ title }}</li>
      </ol>
    </div>

    <div style="margin-top: 10px; cursor: pointer;">
<span v-if="grade === 'RED'" style=" background: #FEE2E2; color: #940505;"
        class="grade-btn d-flex align-items-center justify-content-center gap-1 px-2 py-1">
        <i class="dot " style="background: #f00;"></i>
        Red
      </span>
      <span v-else-if="grade === 'GREEN'" style="background-color: rgb(216, 251, 216); color:green"
        class="grade-btn d-flex align-items-center justify-content-center gap-1 px-2 py-1">
        <i class="dot" style="background: green"></i>
        Green
      </span>
      <span v-else-if="grade === 'AMBER'" style="background-color: rgb(255, 250, 214); color: orange;"
        class="grade-btn d-flex align-items-center justify-content-center gap-1 px-2 py-1">
        <i class="dot" style="background: orange;"></i>
        Amber
      </span> <span v-else-if="grade === 'CLOSED'" style="background-color: rgb(212, 212, 207); color: rgb(102, 99, 94);"
        class="grade-btn d-flex align-items-center justify-content-center gap-1 px-2 py-1">
        <i class="dot" style="background: rgb(102, 99, 94);"></i>
        Closed
      </span>
    </div>
  </div>
</template>


<style scoped>
.breadcrumb {
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
  margin-top: 20px;
}

a {
  cursor: pointer;
}

.grade-btn {
  min-width: 45px;
  max-width: 85px;
  border-radius: 15px;
}

.dot {
  display: inline-block;
  border-radius: 50%;
  padding: 5px;
}

.breadcrumb-item a {
  color: var(--grey-dark, #808080);
}
</style>
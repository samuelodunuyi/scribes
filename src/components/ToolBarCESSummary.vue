<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  totalValue: {
    type: [String, Number],
    default: 0,
  },
  pageNum: {
    type: [String, Number],
    default: 0,
  },
  pageCounts: {
    type: [String, Number],
    default: 0,
  },
  firstVal: {
    type: [String, Number],
    default: 0,
  },
  lastVal: {
    type: [String, Number],
    default: 0,
  },
});
const emit = defineEmits([
  "category",
  "summaryType",
  "sector",
]);

const emitSelectedFilterOption = (isCorrects) => {
  emit("category", isCorrects);
};

const emitSelectedFilter2Option = (isCorrects) => {
  emit("summaryType", isCorrects);
};
const emitSelectedFilter3Option = (isCorrects) => {
  emit("sector", isCorrects);
};
const selectedValue2 = ref("Mandated");
const selectedValue3 = ref("All");
const selectedValue4 = ref("All");
const pageNumber = ref("");

watch(
  () => props.pageNum,
  (first, second) => {
    pageNumber.value = props.pageNum;
  }
);
watch(
  () => props.pageCounts,
  (first, second) => {
    pageNumber.value = props.pageNum;
  }
);
</script>

<template>
  <div class="d-flex justify-content-between align-items-center">
    <div class="d-flex gap-1 pl-2" style="background-color: white">
      <div class="dropdown">
        <span style="font-size: 11px; margin: 0px 5px">Summary Type</span>
        <button class="btn btn-secondary dropdown-toggle btn-light btn-generic" type="button" id="dropdownMenuButton1"
          data-bs-toggle="dropdown" aria-expanded="false">
          {{ selectedValue2 }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style="font-size: 11px">
          <li>
            <a class="dropdown-item" href="#" @click="
              emitSelectedFilter2Option('Mandated');
            selectedValue2 = 'Mandated';
            ">Mandated
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="
              emitSelectedFilter2Option('Pre-Mandated');
            selectedValue2 = 'Pre-Mandated';
            ">Pre-Mandated</a>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="
              emitSelectedFilter2Option('');
            selectedValue2 = 'All';
            ">All</a>
          </li>
        </ul>
      </div>

      <div class="dropdown">
        <span style="font-size: 11px; margin: 0px 5px">Sector</span>
        <button class="btn btn-secondary dropdown-toggle btn-light btn-generic" type="button" id="dropdownMenuButton1"
          data-bs-toggle="dropdown" aria-expanded="false">
          {{ selectedValue3 }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style="font-size: 11px">
          <li>
            <a class="dropdown-item" href="#" @click="
              emitSelectedFilter3Option('');
            selectedValue3 = 'All';
            ">All
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="
              emitSelectedFilter3Option('Clean Energy');
            selectedValue3 = 'Clean Energy';
            ">Clean Energy</a>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="
              emitSelectedFilter3Option('CRG');
            selectedValue3 = 'CRG';
            ">CRG</a>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="
              emitSelectedFilter3Option('Housing');
            selectedValue3 = 'Housing';
            ">Housing</a>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="
              emitSelectedFilter3Option('Other');
            selectedValue3 = 'Other';
            ">Other</a>
          </li>
        </ul>
      </div>

      <div class="dropdown">
        <span style="font-size: 11px; margin: 0px 5px">Category</span>
        <button class="btn btn-secondary dropdown-toggle btn-light btn-generic" type="button" id="dropdownMenuButton1"
          data-bs-toggle="dropdown" aria-expanded="false">
          {{ selectedValue4 }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style="font-size: 11px">
          <li>
            <a class="dropdown-item" href="#" @click="
              emitSelectedFilterOption('');
            selectedValue4 = 'All';
            ">All
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="
              emitSelectedFilterOption('Mini-Grid');
            selectedValue4 = 'Mini-Grid ';
            ">Mini-Grid
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="
              emitSelectedFilterOption('Interconnected Grid');
            selectedValue4 = 'Interconnected Grid';
            ">Interconnected Grid</a>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="
              emitSelectedFilterOption('Mesh Grid');
            selectedValue4 = 'Mesh Grid';
            ">Mesh Grid</a>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="
              emitSelectedFilterOption('C & I');
            selectedValue4 = 'C & I';
            ">C & I</a>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="
              emitSelectedFilterOption('Stand-alone for Home and Business');
            selectedValue4 = 'Stand-alone for Home and Business';
            ">Stand-alone for Home and Business</a>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="
              emitSelectedFilterOption('Productive Use Equipment');
            selectedValue4 = 'Productive Use Equipment';
            ">Productive Use Equipment</a>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="
              emitSelectedFilterOption('Battery as a Service');
            selectedValue4 = 'Battery as a Service';
            ">Battery as a Service</a>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="
              emitSelectedFilterOption('SHS');
            selectedValue4 = 'SHS';
            ">SHS</a>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="
              emitSelectedFilterOption(
                'Stand-alone for Telecommunication Towers'
              );
            selectedValue4 = 'Stand-alone for Telecommunication Towers';
            ">Stand-alone for Telecommunication Towers</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-generic {
  border-radius: 5px;
  border: 1px solid #eee;
  background: #fff;
  font-size: 12px;
  line-height: 14.4px;
  padding: 10px;
}

.v-btn {
  min-width: 0;
  width: 10px;
}

.search-bar {
  width: 25%;
}

.disabled {
  color: grey;
  text-decoration: none;
  cursor: default;
}

.input-group input::placeholder {
  font-size: 12px;
  line-height: 14.4px;
}

.search-bar span,
.navigation {
  cursor: pointer;
}

.navigation {
  margin-bottom: -10px;
  margin-top: -10px;
}
</style>

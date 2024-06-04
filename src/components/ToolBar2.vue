<script setup>
import { ref, watch } from 'vue';
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
const emit = defineEmits(["searchValues", "filterOptions", "filterOptions2", "pageDetails"])
const emitSearchValues = (isCorrects) => {
    emit("searchValues", isCorrects)
}

const emitSelectedFilterOption = (isCorrects) => {
    emit("filterOptions", isCorrects)
}

const emitSelectedFilter2Option = (isCorrects) => {
    emit("filterOptions2", isCorrects)
}
const emitSelectedFilter3Option = (isCorrects) => {
    emit("pageDetails", isCorrects)
}
const searchValue = ref('')
const selectedValue = ref('All')
const selectedValue2 = ref('All')
const pageNumber = ref('')

watch(() => props.pageNum, (first, second) => {
    pageNumber.value = props.pageNum
});
watch(() => props.pageCounts, (first, second) => {
    pageNumber.value = props.pageNum
});
</script>


<template>
    <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex gap-1 pl-2" style="background-color: white;">
            <div class="dropdown" style="font-size: 12px;">Filter By: <span style="font-size: 12px; margin: 0px 5px;">Status</span>
                <button class="btn btn-secondary dropdown-toggle btn-light btn-generic" type="button"
                    id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    {{ selectedValue }}
                </button>

                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style="font-size: 12px;">
                    <li><a class="dropdown-item" href="#" @click="emitSelectedFilterOption(''); selectedValue = 'All'">All
                        </a></li>
                    <li><a class="dropdown-item" href="#" @click="emitSelectedFilterOption('RED'); selectedValue = 'Red'"
                            style="color: red;">Red
                        </a></li>
                    <li><a class="dropdown-item" href="#"
                            @click="emitSelectedFilterOption('AMBER'); selectedValue = 'Amber'"
                            style="color: orange;">Amber</a></li>
                    <li><a class="dropdown-item" href="#"
                            @click="emitSelectedFilterOption('GREEN'); selectedValue = 'Green'"
                            style="color: green;">Green</a></li>
                </ul>
            </div>

            <div class="dropdown"><span style="font-size: 11px; margin: 0px 5px;">Funding Option</span>
                <button class="btn btn-secondary dropdown-toggle btn-light btn-generic" type="button"
                    id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    {{ selectedValue2 }}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style="font-size: 11px;">
                    <li><a class="dropdown-item" href="#" @click="emitSelectedFilter2Option(''); selectedValue2 = 'All'">All
                        </a></li>
                    <li><a class="dropdown-item" href="#"
                            @click="emitSelectedFilter2Option('BOI'); selectedValue2 = 'BOI'">BOI</a></li>
                    <li><a class="dropdown-item" href="#"
                            @click="emitSelectedFilter2Option('DCM'); selectedValue2 = 'DCM'">DCM</a></li>
                    <li><a class="dropdown-item" href="#"
                            @click="emitSelectedFilter2Option('PCB'); selectedValue2 = 'PCB'">PCB</a></li>
                </ul>
            </div>

            <div class="btn-generic d-flex justify-content-evenly align-items-center gap-1 col">
                Showing {{firstVal}} - {{lastVal}} of {{ totalValue }}
                <div class="navigation gap-2">
                    <v-btn variant="text" density="compact" @click="emitSelectedFilter3Option('Previous')"
                        :disabled="pageNumber == 1">
                        <v-icon icon="mdi-chevron-left"></v-icon></v-btn>
                    <v-btn variant="text" density="compact" @click="emitSelectedFilter3Option('Next')"
                        :disabled="pageNumber >= pageCounts">
                        <v-icon icon="mdi-chevron-right"></v-icon></v-btn>
                </div>
            </div>
        </div>

        <div class="input-group search-bar">
            <input type="text" class="form-control" placeholder="Search" v-model="searchValue"
                @input="emitSearchValues(searchValue)">
            <span class="input-group-text"><v-icon icon="mdi-magnify" desnsity="compact"></v-icon></span>
        </div>

    </div>
</template>

<style scoped>
.btn-generic {
    border-radius: 5px;
    border: 1px solid #EEE;
    background: #FFF;
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
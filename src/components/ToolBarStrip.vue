<script setup>
import { ref } from 'vue';
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
const emit = defineEmits(["searchValues", "filterOptions", "pageDetails"])
const emitSearchValues = (isCorrects) => {
    emit("searchValues", isCorrects)
}
const emitSelectedFilterOption = (isCorrects) => {
    emit("filterOptions", isCorrects)
}
const emitSelectedFilter3Option = (isCorrects) => {
    emit("pageDetails", isCorrects)
}
const searchValue = ref('')


</script>


<template>
    <div class="d-flex justify-content-between align-items-center">
        <div class="input-group search-bar">
            <input type="text" class="form-control" placeholder="Search" v-model="searchValue" @input="emitSearchValues(searchValue)">
            <span class="input-group-text"><v-icon icon="mdi-magnify"></v-icon></span>
        </div>

        <div class="d-flex gap-1">
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle btn-light btn-generic" type="button"
                    id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <v-icon icon="mdi-filter-outline"></v-icon>
                    Filter by
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style="font-size: 12px;">
                    <li><a class="dropdown-item" href="#" @click="emitSelectedFilterOption('asc')">A to Z <v-icon icon="mdi-chevron-up"></v-icon>
                        </a></li>
                    <li><a class="dropdown-item" href="#" @click="emitSelectedFilterOption('dsc')">Z to A <v-icon icon="mdi-chevron-down"></v-icon></a></li>
                </ul>
            </div> 
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

.search-bar {
    width: 25%;

}

.input-group input::placeholder {
    font-size: 12px;
    line-height: 14.4px;
}

.search-bar span,
.navigation {
    cursor: pointer;
}
</style>
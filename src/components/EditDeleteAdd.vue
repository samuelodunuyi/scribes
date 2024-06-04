<template>
    <div class="editdeleteadd">

        <div class="d-flex justify-content-end mt-2">
            <span class="mr-2 d-flex align-center" style="color: #0a38a3;">
                Edit/Save <v-icon icon="mdi-file-document-edit"></v-icon>
            </span>
            <span class="d-flex align-center" style="color: #F00;">
                Delete <v-icon icon="mdi-trash-can-outline"></v-icon>
            </span>
        </div>
    </div>
</template>


<style scoped>
.editdeleteadd {

    font-size: 12px;
    font-weight: 400;
    line-height: 14.4px;
    /* 120% */  
}
span{
    cursor: pointer;
}
</style>
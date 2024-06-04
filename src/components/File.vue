<script setup>
const showUploadModal = ref(false)

</script>

<template>
<div>
<div v-if="showUploadModal" class="overlay" @click="showUploadModal = false">
    <div class="modal3" @click.stop>
      <div class="topUpload">
        <img src="../../assets/images/upload_cloud.svg" />
        <div class="bottomContent">
          <h2>Select a file or drag and drop here</h2>
          <p>.pdf, file size no more than 30MB</p>
        </div>
        <div class="upload">
          <v-btn :loading="loadingUpload" height="48" rounded="xl" size="small"
            onclick="document.getElementById('getFile').click()" variant="flat">Upload file</v-btn>
          <input type='file' id="getFile" style="display:none" @change="submitFile()" accept="application/pdf"
            ref="fileInput">
        </div>
        <div class="fileUploaded" v-if="contractUploadUrl != ''">
          <p style="text-decoration: underline; font-weight: bold;">{{ example.name }}</p>
          <p :style="{ cursor: 'pointer' }" @click="clearInput()">X</p>
        </div>
      </div>
      <b v-if="errorMessage">{{ errorMessage }}</b>
      <div class="bottomUpload">
        <div>
          <div class="topBotton3">
            <button class="topButton" @click="clearModal()">Cancel</button>
            <button class="topButton" @click="uploadContract()">Upload</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <form action="">
    <div class="file d-flex mb-2 ">
      <h4>File</h4>
      <div class="icon">
        <v-btn class="text-none" color="blue" prepend-icon="mdi-export-variant" variant="text" @click="showUploadModal=true">
          Upload
        </v-btn>
      </div>
    </div>
    <div v-for="item in 7" class="view d-flex p-2 border border-2 rounded justify-content-between align-items-center">
      <div>
        <p class="mb-0">Document</p>
        <p class="mb-0"><small class="text-muted"> 5mb</small></p>
      </div>
      <v-btn class="text-none" color="blue" prepend-icon="mdi-eye-outline" variant="text">
        View
      </v-btn>
    </div>
  </form>
</div>
</template>

<style scoped>
.modal3 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  gap: 20px;
  position: relative;
  width: 540px;
  height: 400.81px;
  background: #FAFAFB;
  border-radius: 10px;
}

.topUpload {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px;
  gap: 24px;
  width: 531px;
  height: 287px;
  background: #FAFAFB;
  border-width: 1px 1px 0px 1px;
  border-style: dashed;
  border-color: #000000;
  border-radius: 5px 5px 0px 0px;
}


.bottomContent h2 {
  text-align: center;
  font-family: Roboto;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #227CBF;
}

.bottomContent p {
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 5px;
  line-height: 19px;
  text-align: center;
  color: #808080;
}

.fileUploaded {
  display: flex;
  flex-direction: row;
  gap: 12px;
}

.bottomUpload {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 10px;
  width: 531px;
  height: 80px;
  background: #808080;
  box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.1);
  border-radius: 0px 0px 10px 10px;
}

button:hover {
  cursor: pointer;
}

.topBotton3 {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 7px;
  flex-direction: row;
  padding: 20px 20px 0px 0px;
}

form {
  width: 500px;
  height: 504px;
  display: flex;
  padding: 10px 15px 20px 15px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 5px;
  border: 0.885px solid var(--gray-200, #e4e4e7);
  background: var(--color-3, #fff);
  box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.1);
}
.file h4 {
  color: var(--black, #000);
  font-family: 'Inter';
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
}
.icon {
  margin-left: 490px;
}
input,
select {
  padding: 10px 20px 10px 10px;
  align-items: center;

  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
}
.view {
  height: 50px;
  width: 610px;
}
.view p {
  color: var(--black, #000);
  font-family: 'Inter';
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}
</style>
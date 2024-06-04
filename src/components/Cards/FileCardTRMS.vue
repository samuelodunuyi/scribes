<script setup>
import { ref, watch } from 'vue'
import fileUploadServices from '../../services/fileUploadServices'
import crmService from '../../services/crmService';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const props = defineProps(['selectedLeadDetails'])
const showUploadModal = ref(false)
const showFileButton = ref(false)
const loadingUpload = ref(false)
const example = ref('')
const contractUploadUrl = ref('')
const errorMessage = ref('')
const fileName = ref('')
const fileInput = ref(null)
const files = ref([])

watch(() => props.selectedLeadDetails, async (first, second) => {
  if (JSON.stringify(first) !== JSON.stringify(second)) {
    let newTransact = props.selectedLeadDetails
    console.log(newTransact.leadId)
    if (newTransact != undefined) {
      if(newTransact.leadId!='' && newTransact.leadId){
        showFileButton.value = true
      }
      // files.value = await crmService.getDealsCreditCommitteeFocusAreasByDealId(newTransct.leadId)
      files.value = [{
        fileName: '638379045607956260.PNG',
        fileSize: '5mb'
      }]
    }
  }
});

const clearModal = () => {
  fileName.value = ''
  contractUploadUrl.value = ''
  showUploadModal.value = false
  loadingUpload.value = false
}


const submitFile = async () => {
  example.value = fileInput.value.files[0];
  errorMessage.value = ''
  loadingUpload.value = true
  let contractUpload = await fileUploadServices.UploadCRMFile(fileInput.value.files[0])
  if (contractUpload.length > 5) {
    contractUploadUrl.value = contractUpload
    loadingUpload.value = false
  }
};

const uploadContract = async () => {
  if (contractUploadUrl.value.length < 3) {
    return errorMessage.value = "Invalid file uploaded"
  }
  errorMessage.value = ""
  showUploadModal.value = false
  // let ps = await crmService.uploadFiles(null)
  let ps = 200
  if (ps == 200) {
    toast.success('Upload Succesful')
    setTimeout(async () => {
      clearModal()
    }, 1300);
  }
};

const downloadContract = async (fileName) => {
  var link = document.createElement("a");
  link.download = "filename";
  link.target = "_blank";
  link.href = `https://ctpms.icgc.local:8443/FileUpload/DownloadCRMFiles?filename=${fileName}`
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>

<template>
  <div>
    <v-dialog v-model="showUploadModal" transition="slide-y-transition" width="600">
      <v-card style="padding: 20px;">
        <div class="topUpload">
          <img src="../../assets/images/upload_cloud.svg" />
          <div class="bottomContent">
            <h2>Select a file to upload here</h2>
          </div>
          <div class="upload">
            <v-btn :loading="loadingUpload" height="48" rounded="xl" size="small"
              onclick="document.getElementById('getFile').click()" variant="flat" class="new">Upload file</v-btn>
            <input type='file' id="getFile" style="display:none" @change="submitFile()" accept="application/pdf"
              ref="fileInput">
          </div>
          <div class="fileUploaded" v-if="contractUploadUrl != ''">
            <p style="text-decoration: underline; font-weight: bold; cursor: context-menu;">{{ example.name }}</p>
            <p :style="{ cursor: 'pointer' }" @click="clearModal()">X</p>
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
      </v-card>
    </v-dialog>
    <form action="">
      <div class="d-flex justify-content-end mb-2" v-if="showFileButton">
        <v-btn class="text-none" color="blue" prepend-icon="mdi-export-variant" variant="text"
          @click="showUploadModal = true">
          Upload
        </v-btn>
      </div>
      <div v-for="file in files"
        class="d-flex p-2 border border-2 rounded justify-content-between align-items-center mb-2">
        <div>
          <p class="mb-0">{{ file.fileName }}</p>
          <p class="mb-0"><small class="text-muted">{{ file.fileSize }}</small></p>
        </div>
        <v-btn class="text-none" color="blue" prepend-icon="mdi-eye-outline" variant="text"
          @click="downloadContract(file.fileName)">
          Download
        </v-btn>
      </div>
    </form>
  </div>
</template>

<style scoped>
input,
select {
  padding: 10px 20px 10px 10px;
  align-items: center;

  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
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


.new {
  text-transform: none !important;
  width: 240px;
  height: 40px;
  justify-content: center;
  padding: 15px;
  background: linear-gradient(90deg, #47B65C 0%, #227CBF 100%) !important;
  font-family: 'Roboto' !important;
  font-weight: 400;
  font-size: 14px !important;
  color: white
}

.new:hover {
  background: linear-gradient(90deg, #47B65C 0%, #227CBF 100%) !important;
  transition: 0.7s !important;
  color: #FFFFFF !important;
  border: none !important;
}

.new:disabled {
  background: linear-gradient(90deg, #47B65C 0%, #227CBF 100%) !important;
  color: #100f0f !important;
}
</style>

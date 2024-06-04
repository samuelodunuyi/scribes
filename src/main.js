import './assets/main.css';
import store from './stores/authStore';
import stores from "./stores/store";
import { createApp } from 'vue'
import Emitter from 'tiny-emitter'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import App from './App.vue'
import router from './router'
import vuetify from './vuetify'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import Avatar from 'primevue/avatar'
import Breadcrumb from 'primevue/breadcrumb'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import CKEditor from '@ckeditor/ckeditor5-vue';
const app = createApp(App)


app.use(PrimeVue)
app.use(router)
app.use(vuetify)
app.config.globalProperties.$emitter = new Emitter();
app.component('InputText', InputText)
app.component('Column', Column)
app.component('DataTable', DataTable)
app.component('ButtonVue', Button)
app.component('Breadcrumb', Breadcrumb)
app.component('Avatar', Avatar)
app.use( CKEditor )
app.use(store).use(stores).mount('#app')
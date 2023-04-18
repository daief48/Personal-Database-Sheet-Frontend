import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router/index'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Toaster from "@meforma/vue-toaster";
import VueSweetalert2 from "vue-sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';
import naive from "naive-ui";
import VueCryptojs from 'vue-cryptojs';
window.$ = window.jQuery = require("jquery");
import SummernoteEditor from 'vue3-summernote-editor';
import CKEditor from '@ckeditor/ckeditor5-vue';
import moment from 'moment';
import VOtpInput from "vue3-otp-input";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* add some free styles */
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faMobile } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faPlus} from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { faFileCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { faInfo } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { faReply } from '@fortawesome/free-solid-svg-icons'
import { faSquareUpRight} from '@fortawesome/free-solid-svg-icons'
import { faCropSimple } from '@fortawesome/free-solid-svg-icons'
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { faRectangleList } from '@fortawesome/free-solid-svg-icons'
import { faPrint } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faFile } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faTwitter,faFacebook, faEnvelope, faKey, faTrash, faPencil, faPlus
    , faList,faFileCircleExclamation,faInfo,faInfoCircle,faReply,faSquareUpRight
    , faCropSimple,faBan,faUpload,faInstagram,faLinkedin,faEnvelope
    ,faRectangleXmark, faEye, faSquareCheck,faRectangleList,faPrint,faLocationDot,faMapLocationDot,faFile,faMobile,faUser)

import Preloader from '../src/dashboard/Preloader.vue';
import Loader from '../src/components/Loader.vue';


//import adminlte scripts
import '../src/assets/js/admin-lte.js';
//import adminlte styles
import '../src/assets/css/admin-lte.css';
import '../src/assets/css/custom.css';
import  VueHtmlToPaper from '../plugins/VueHtmlToPaper.js';
import VueApexCharts from "vue3-apexcharts";
//Data table 
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
//Data table print
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";


const app = createApp(App);
app.use(store) 
.use(router)
.use(VueAxios, axios)
.use(Toaster)
.use(VueSweetalert2)
.use(VueCryptojs)
.use(naive)
.use( CKEditor )
.use( VueHtmlToPaper )
.use(VueApexCharts)
.component('pre-loader',Preloader)
.component('loader',Loader)
.component('font-awesome-icon', FontAwesomeIcon)
.component('SummernoteEditor', SummernoteEditor)
.component('v-otp-input', VOtpInput)
//app.config.globalProperties.backendUrl = 'http://203.76.123.197/asfBackend';
//app.config.globalProperties.base_url_for_resource = 'http://203.76.123.197/asfBackend/public/';
app.config.globalProperties.backendUrl = 'http://localhost/pds-backend';
app.config.globalProperties.base_url_for_resource = 'http://localhost/pds-backend/public/';
app.config.globalProperties.$filters = {

    myDateFormate(date){
        return moment(date).format("DD MMM YYYY"); 
    },
    fullMonthDateFormate(date){
        return moment(date).format("DD MMMM YYYY"); 
    }
}

app.mount('#app')

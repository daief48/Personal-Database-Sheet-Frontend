<template>
     <div class="card card-default">
        <div class="card-header">
            <h3 class="card-title"><strong> Important Link   {{backend_url}}{{formAction}}</strong></h3>
        </div>

        <div class="card-body">
            <div class="row">
                <div class="col-md-3 form-bg">
                    <Form @submit="handleUser" :validation-schema="userForm" ref="form">
                        <div>
                        <div class="form-group">
                            <label for="title">Title*</label>
                            <Field name="importantLinkTitle" type="text" v-model="importantLinkTitle" class="form-control" autocomplete="off"/>
                            <ErrorMessage name="importantLinkTitle" v-model="importantLinkTitle" class="error-feedback" />
                        </div>

                        </div>
                    </Form>
                </div>
            </div>
        </div>

     </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import {useStore} from "vuex"
//import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
       // VPagination,
    },
    data() {
        const store = useStore();
        const validationCreate = yup.object().shape({
            importantLinkTitle: yup
                .string()
                .required("Important Link Title is required!")
                .min(3, "Must be at least 3 characters!")
                .max(20, "Must be maximum 20 characters!"),
   
        });
        return {
            backend_url: process.env.VUE_APP_API_URL,
            url: this.backendUrl + "/api/links",
            store,
            validationCreate: validationCreate,
            userForm: validationCreate,
            
        }
    },
    

}
</script>

<style>

</style>
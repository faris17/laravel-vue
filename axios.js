import axios from "axios";
import { notify } from "@kyvg/vue3-notification";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";

axios.interceptors.response.use(
    response => response,

    error => {
        if(error.response.status === 401 || error.response.status===422 ){
            notify({
                title: error.response.data.message,
                type: 'error'
            })
        }
        return error;
    }
)
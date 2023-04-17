<template>
    <div class="container">
        <div class="col-md-6 m-auto">
            <h1>Reset Password</h1>

            <div class="mt-3" style="color:red">
                {{ errmessage }}
            </div>

            <div class="mt-3">
                <form @submit.prevent="submitReset">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleFormControlInput1"
                            v-model="form.password">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Password Confirm</label>
                        <input type="password" class="form-control" id="exampleFormControlInput1" v-model="form.password_confirmation">
                    </div>
                    <div>
                        <button type="submit" class="btn btn-primary">Reset</button>
                        
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios'

import { useRouter, useRoute } from 'vue-router'

import { authStore } from '../stores/authstore';

const router = useRouter();
const route = useRoute();
const useAuth = authStore();

const form = ref({
    token: route.params.token,
    email: route.query.email,
    password: '',
    password_confirmation: ''
});

const errmessage = ref('');

const submitReset = async () => {
    await useAuth.getToken();
    await axios.post('/reset-password', {
        token: form.value.token,
        email: form.value.email,
        password: form.value.password,
        password_confirmation: form.value.password_confirmation
    })
    .then(response => {

        if(response.status != null){
            router.push('/login');
        }
        console.log(response.data.message);
        errmessage.value = response.data.message;
        
    }).catch(error => {
        errmessage.value = error.response.data.message;
    });
   
}

</script>
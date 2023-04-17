<template>
    <div class="container mt-3">
        <div class="col-md-6 m-auto shadow">
            <h1 class="text-center pt-3">Login Page</h1>

            <div class="mt-3" style="color:red">
                {{ errmessage }}
            </div>

            <div class="m-3 p-5">
                <form @submit.prevent="submitLogin">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Email</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1"
                            placeholder="name@example.com" v-model="form.email">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleFormControlInput1" v-model="form.password">
                    </div>
                    <div class="d-flex justify-content-between">
                        <button type="submit" class="btn btn-primary">Login</button>
                        <router-link to="/forgot">Forgot Password?</router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios'

import { useRouter } from 'vue-router'

import { authStore } from '../stores/authstore';

const router = useRouter();
const useAuth = authStore();

const form = ref({
    email: '',
    password: ''
});

const errmessage = ref('');

const submitLogin = async () => {
    await useAuth.getToken();
    await axios.post('/login', {
        email: form.value.email,
        password: form.value.password
    })
    .then(response => {

        if(response.status === 204){
            router.push('/');
        }
        console.log(response.data.message);
        errmessage.value = response.data.message;
        
        
    }).catch(error => {
        errmessage.value = error.response.data.message;
    });
   
}

</script>
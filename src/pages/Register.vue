<template>
    <div class="container">
        <div class="col-md-6 m-auto">
            <h1>Register Page</h1>

            <div class="mt-3" style="color:red">
                {{ errmessage }}
            </div>

            <div class="mt-3">
                <form @submit.prevent="submitRegister">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Name</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1"
                            placeholder="Your Name" v-model="form.name">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Email</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1"
                            placeholder="name@example.com" v-model="form.email">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleFormControlInput1" v-model="form.password">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Password Confirmation</label>
                        <input type="password" class="form-control" id="exampleFormControlInput1" v-model="form.password_confirmation">
                    </div>
                    <div>
                        <button type="submit" class="btn btn-primary" v-if="!isProcess">Register</button>
                        <button type="submit" class="btn btn-primary" v-if="isProcess" disabled>Loading</button>
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
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
});

const errmessage = ref('');
const isProcess = ref(false);

const submitRegister = async () => {
    isProcess.value = true;
    await useAuth.getToken();
    await axios.post('/register', {
        name: form.value.name,
        email: form.value.email,
        password: form.value.password,
        password_confirmation: form.value.password_confirmation
    })
    .then(response => {

        if(response.status === 204){
            isProcess.value = true;
            router.push('/');
        }
        console.log(response.data.message);
        errmessage.value = response.data.message;
        
    }).catch(error => {
        isProcess.value = false;
        errmessage.value = error.response.data.message;
    });
   
}

</script>
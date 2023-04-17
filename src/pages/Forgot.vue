<template>
    <div class="container">
        <div class="col-md-4 m-auto">
            <h1>Forgot Password</h1>

            <div class="mt-3" style="color:green">
                {{ message }}
            </div>

            <div class="mt-3">
                <form @submit.prevent="submitForgot">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Email</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1"
                            placeholder="name@example.com" v-model="form.email">
                    </div>
                    
                    <div>
                        <button type="submit" class="btn btn-primary">Send</button>
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
});

const message = ref('');

const submitForgot = async () => {
    try{
        await useAuth.getToken();
        await axios.post('/forgot-password', {
            email: form.value.email,
        })
        .then(response => {
            console.log(response);
            if(response.status === 200){
                message.value = response.data.status;
            }
        });
    }catch(error){
        console.log(error);
    }
   
}

</script>
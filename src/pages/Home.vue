<template>
    <div class="container">
        <div v-if="useAuth.user" class="col-md-10 shadow p-3 mt-2">
            <h1>Data User</h1>

            <router-link to="/create-user">
                <button class="btn btn-primary" type="button">Create</button>
            </router-link>

            <table class="table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Profile</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in useAuth.authUser" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>
                            <img :src="user.profile" width="50" height="50" v-if="user.profile" />
                        </td>
                        <td>
                            <router-link :to="`/edit-user/${user.id}`">
                                <button class="btn btn-info m-2">Edit</button>
                            </router-link>
                            
                            <button class="btn btn-danger m-2" @click="clickDel(user.id, index)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-else>
            <h3>No Data</h3>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios'
import { authStore } from '../stores/authstore';

import { useRouter } from 'vue-router'

import Swal from 'sweetalert2';

const router = useRouter();

const useAuth = authStore();


onMounted(async () => {
    useAuth.getUser();
});

const clickDel = (id, index) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            await axios.delete('/api/users/' + id)
                .then(response => {
                    if (response.status === 200) {
                        useAuth.authUser.splice(index, 1);
                    }
                })
        }
    })

}

</script>
<template>
    <div>
        <h1>Login View</h1>

        <input type="text" placeholder="id" v-model="id">
        <input type="password" placeholder="password" v-model="password">

        <button @click="handleLogin">login</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useLoginStore } from '@/stores/login';

const loginStore = useLoginStore();
const id = ref('')
const password = ref('')

const handleLogin = () => {
    const userInfo = {
        id: id.value,
        password: password.value
    }

    loginStore.login(userInfo);

}

</script>

<style scoped>

</style>
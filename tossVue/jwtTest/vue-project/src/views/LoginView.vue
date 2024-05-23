<template>
    <div>
        <form>
        <input type="text" placeholder="id" v-model="id">
        <input type="password" placeholder="password" v-model="password">
        <button @click='handleLogin'>로그인</button>
    </form>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import { useLoginStore} from '@/stores/login'
const id =ref('')
const loginStore = useLoginStore()
const password =ref('')
const handleLogin = () =>{
    const userInfo={
        id:id.value,
        password:password.value,
    }
    loginStore.login(userInfo)
}
</script>

<style scoped>
</style>
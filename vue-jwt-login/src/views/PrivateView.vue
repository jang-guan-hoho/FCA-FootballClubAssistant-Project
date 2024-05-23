<template>
    <div>
        <h1>Private View</h1>
        <button @click="getMyPage">my page</button>
    </div>
</template>

<script setup>
import { useLoginStore } from '@/stores/login'
const loginStore= useLoginStore();

const getMyPage = ()=>{
    loginStore.getMyPage();
}

</script>

<style scoped>

</style>
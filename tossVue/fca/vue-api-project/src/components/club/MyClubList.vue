<template>
    <div>
        <h2>MyClubList</h2>
        <div v-for="club in store.MyClubList" :key="club.clubId">
            <RouterLink :to="{ name:'clubHome', params:{clubId: club.clubId}}"> 
            <div>{{ club.name }}</div>
            <div>{{ club.content }}</div> 
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { useClubStore } from '@/stores/club';
import { onMounted } from 'vue';
const store = useClubStore()
onMounted(()=>{
    // store.getMyClubList(userId);
    store.updateMyClubList;
})
</script>

<style scoped></style>
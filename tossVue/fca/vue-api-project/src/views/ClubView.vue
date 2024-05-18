<template>
    <div>
        <h2>ClubView</h2>
        <RouterLink :to="{ name: 'myClubList' }">마이 클럽</RouterLink> |
        <RouterLink :to="{ name: 'clubList'}">클럽 리스트</RouterLink> 
        <RouterView />
    </div>
</template>

<script setup>
import { useClubStore } from '@/stores/club';

const store = useClubStore()

</script>

<style scoped></style>
<template>
    <div>
        <a>clubHome</a>
        
        <ClubNavBar :clubId="route.params.clubId"/>
        <RouterView />
    </div>
</template>

<script setup>
import ClubNavBar from '@/components/club/common/ClubNavBar.vue';
import { useRoute } from 'vue-router';

const route = useRoute()



</script>

<style scoped></style>
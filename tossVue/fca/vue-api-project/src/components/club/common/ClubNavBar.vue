<template>
    <div id="container">
        <header>
            <nav>
                <RouterLink :to="{ name: 'clubHome', params:{clubId:store.club.clubId}}">홈</RouterLink> |
                <RouterLink :to="{ name: 'clubScheduleList' }">일정</RouterLink> |
                <RouterLink :to="{ name: '' }">게시판</RouterLink> |
                <RouterLink :to="{ name: 'clubScheduleDetailReceipt'}">회비사용내역</RouterLink>
            </nav>
        </header>
    </div>
</template>

<script setup>
import { useClubStore } from '@/stores/club';
const store = useClubStore()

</script>

<style scoped>
#container {
    text-align: center;
    border-radius: 45%;
}

nav a {
    font-weight: bold;
    text-decoration: none;
    color: black;
}

nav a.router-link-exact-active {
    color: red;
}
</style>
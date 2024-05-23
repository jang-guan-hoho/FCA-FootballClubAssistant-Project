<template>
    <div id="container">
        <header>
            <nav>
                <RouterLink to="/">logo</RouterLink> |
                <RouterLink :to="{ name: 'clubCreate' }">clubCrete</RouterLink> |
                <RouterLink :to="{ name: 'club'}">clubHome</RouterLink> 
            </nav>
            <RouterLink v-if="loginStore.accessToken === ''" to="/login">Login</RouterLink>
             <button v-else @click="logout">Logout</button>
             <RouterLink :to="{ name: 'signUp'}">회원가입</RouterLink> 

        </header>
    </div>
</template>

<script setup>
import { useClubStore } from '@/stores/club';
import { useLoginStore } from '@/stores/login';
const loginStore = useLoginStore();
</script>

<style scoped>
#container {
    text-align: center;
}

nav a {
    font-weight: bold;
    text-decoration: none;
    color: black;
}

nav a.router-link-exact-active {
    color: #42b983
}
</style>
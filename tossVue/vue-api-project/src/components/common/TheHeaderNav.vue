<template>
    <div id="container">
        <header>
            <nav>
                <RouterLink to="/">Home</RouterLink> |
                <RouterLink to="/kakao">Kakao</RouterLink> |
                <RouterLink :to="{ name: 'boardList' }">BoardList</RouterLink> |
                <RouterLink :to="{ name: 'boardCreate' }">BoardCreate</RouterLink>
            </nav>
        </header>
    </div>
</template>

<script setup>

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
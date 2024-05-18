<template>
    <div id="container">
        <header>
            <nav>
                <RouterLink :to="{ name: 'clubHome', params: { clubId: clubId } }">홈</RouterLink> |
                <RouterLink :to="{ name: 'clubScheduleList', params: { clubId: clubId } }">일정</RouterLink> |
                <RouterLink :to="{ name: 'boardList', params: { clubId: clubId }}">게시판</RouterLink> |
                <RouterLink :to="{ name: 'clubScheduleDetailReceipt', params: { clubId: clubId, receiptDate: today} }">월별 회비</RouterLink> 
            </nav>
        </header>
    </div>
</template>

<script setup>
import { useClubStore } from '@/stores/club';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const store = useClubStore()

const currentDate = new Date();
const props = defineProps({
  clubId: {
    type: String,
    required: true
  }
});
onMounted(()=>{

    store.getClub(props.clubId)
})
// 날짜와 시간을 문자열로 포맷팅
const today = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`;
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
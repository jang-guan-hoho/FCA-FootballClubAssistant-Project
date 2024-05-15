<template>
    <div>
        <a>clubHome</a>
        <ClubInfoBar />
        <section>
            <div>{{ store.clubMember.length }} / {{ store.club.maxMember }}</div>
            <button type="button" @click="joinClub">가입 신청</button>
            <div v-for="member in store.clubMember" :key="member.id">
                <div>{{ member.img }}</div>
                <div>{{ member.name }}</div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import ClubInfoBar from './common/ClubInfoBar.vue';
import { useClubStore } from '@/stores/club';
import { onMounted } from 'vue';

const store = useClubStore();

const route = useRoute();
const router = useRouter();

onMounted(() => {
    // 클럽원 리스트 불러오기
    //store.getMember(route.params.clubId)
})

const joinClub = function () {
   // router.push({ name: 'clubJoin' })
   // 클럽 신청 폼
   console.log('클럽 가입 신청')
}
</script>

<style scoped>

</style>
<template>
    <div>
      <ClubInfoBar />
      <section>
        <div>{{ store.clubMember.length }} / {{ store.club.maxMember }}</div>
        <button type="button" @click="joinClub">가입 신청</button>
        <div v-for="member in store.clubMember" :key="member.id">
          <img :src="member.img" alt="member image" />
          <div>{{ member.name }}</div>
        </div>
      </section>

      <RouterView />
    </div>
  </template>
  
  <script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { useClubStore } from '@/stores/club';
  import { onMounted,ref } from 'vue';
  import axios from 'axios';
  import ClubInfoBar from './common/ClubInfoBar.vue';
  
  const store = useClubStore();
  
  const route = useRoute();
  const router = useRouter();

  onMounted(() => {
    store.getClub(route.params.clubId);
    // 클럽원 리스트 불러오기
    // store.getClubMember(route.params.clubId);


  });
  
  const joinClub = async () => {
    try {
      const userId = store.loginUser.id; // 로그인된 유저의 ID를 가져오는 방법
      await axios.post(`http://localhost:8080/club/${route.params.clubId}/join`, { userId });
      router.push({ name: 'clubHome', params: { clubId: route.params.clubId } });
      console.log('클럽 가입 신청');
    } catch (error) {
      console.error('클럽 가입 신청 중 오류 발생:', error);
    }
  };
  </script>
  
  <style scoped>
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  </style>
  
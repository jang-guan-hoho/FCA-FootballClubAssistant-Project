<template>
    <div>
      <a>Club Schedule Detail</a>
      <ClubInfoBar />
      <KakaoMap />
      <!-- 오늘 날짜 일정 표시 -->
      <div v-if="todaySchedule">
        <div>
        <h3>Today's Schedule:</h3>
        <p>시간: {{ todaySchedule.date }}</p>/
        <p>장비: {{ todaySchedule.equipment }}</p>/
        <p>{{ todaySchedule.match }} / {{ todaySchedule.match }}</p>
        </div>
        <div>
            <butto @click="">참여신청</butto>
        </div>
        <div v-for="participant in participants" :key="participant.id">
            <div></div>
        </div>
    </div>
      <div v-else>
        <p>No events for today.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useScheduleStore } from '@/stores/schedule';
  import ClubInfoBar from '../common/ClubInfoBar.vue';
  import { ref, onMounted } from 'vue';
  import KakaoMap from '@/components/common/kakao/KakaoMap.vue'
  // 스토어 사용
  const store = useScheduleStore();
  
  
  // 오늘 날짜의 일정을 찾아 저장할 ref
  const todaySchedule = ref(null);
  
  // 오늘 날짜 구하기
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD 형식
  
  onMounted(() => {
    store.getSchedule(today);
    todaySchedule.value =store.schedule;
    store.getParticipant(store.schedule.scheduleId);
    participants.value = store.participant;
  });

  const participants = ref([])


  </script>
  
  <style scoped>

  </style>
  
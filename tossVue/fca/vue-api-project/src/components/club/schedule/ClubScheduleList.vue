<template>
    <div>
      <a>Club Schedule List</a>
      <ClubInfoBar />
      <!-- 캘린더 삽입 -->
      <FullCalendar :options="calendarOptions" />
      </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import FullCalendar from '@fullcalendar/vue3';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import interactionPlugin from '@fullcalendar/interaction';
  import { useRoute, useRouter } from 'vue-router';
  import ClubInfoBar from '../common/ClubInfoBar.vue';
  
  const router = useRouter()
  // 달력 옵션을 반응형 참조로 설정
  const calendarOptions = ref({
    plugins: [dayGridPlugin, interactionPlugin], // 사용할 플러그인
    initialView: 'dayGridMonth', // 초기 보기 설정
    events: [ // 이벤트 예시
      { title: 'event 1', date: '2024-05-01' },
      { title: 'event 2', date: '2024-05-02' }
    ],
    dateClick: handleDateClick // 날짜 클릭 이벤트 핸들러
  });
  
  // 날짜 클릭 이벤트 핸들러
  function handleDateClick(info) {
    console.log(info.dateStr)
    router.push({ name: 'clubScheduleDetail', params: { date: info.dateStr } });
  }
  </script>
  
  <style scoped>
  </style>
  
  npm install --save \
    @fullcalendar/core \
    @fullcalendar/vue3
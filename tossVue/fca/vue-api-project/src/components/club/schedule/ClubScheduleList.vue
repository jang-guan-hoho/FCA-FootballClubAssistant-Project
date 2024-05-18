<template>
    <div>
      <a>Club Schedule List</a>
      
      <!-- 캘린더 삽입 -->
      <FullCalendar :options="calendarOptions" />
      </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import FullCalendar from '@fullcalendar/vue3';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import interactionPlugin from '@fullcalendar/interaction';
  import { useRoute, useRouter } from 'vue-router';
  import ClubInfoBar from '../common/ClubInfoBar.vue';
  import { useClubStore } from '@/stores/club';
  import { useScheduleStore } from '@/stores/schedule';
  
  const cstore = useClubStore()
  const sstore = useScheduleStore()
  const router = useRouter()
  // 달력 옵션을 반응형 참조로 설정
  const calendarOptions = ref({
    plugins: [dayGridPlugin, interactionPlugin], // 사용할 플러그인
    initialView: 'dayGridMonth', // 초기 보기 설정
    events: [
    ],
    dateClick: handleDateClick // 날짜 클릭 이벤트 핸들러
  });
  
  function handleDateClick(info) {
  // 일정 목록이 존재하고, 해당 날짜에 일정이 있는지 확인
  if (event.value) {
    const hasEventOnDate = event.value.some(schedule => schedule.date === info.dateStr);
    if (hasEventOnDate) {
      router.push({ name: 'clubScheduleDetail', params: { date: info.dateStr } });
    } else {
      alert("선택한 날짜에 일정이 없습니다.");
    }
  } else {
    console.log("일정 데이터가 아직 로드되지 않았습니다.");
  }
}
  const event = ref([])
  onMounted(() => {
    // sstore.getScheduleList(cstore.club.clubId, 유저Id)
    event.value = sstore.scheduleList
    calendarOptions.value.events=event.value
  })
  </script>
  
  <style scoped>
  </style>
  
  npm install --save \
    @fullcalendar/core \
    @fullcalendar/vue3
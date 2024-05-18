<template>
  <div>
    <a>Club Schedule Detail</a>
    <div v-if="sstore.schedule.scheduleId">
      <div>
        <h3>오늘 일정</h3>
        <KakaoMap />
        <p>시간: {{ sstore.schedule.time }}</p>
        <p>장비: {{ sstore.schedule.equipment }}</p>
        <p>모집인원: {{ sstore.schedule.match }}명</p>
        <p>현재인원: {{ sstore.participant.length }}명</p>
      </div>
      <div>
        <button @click="joinSchedule">참여신청</button>
      </div>
      <div v-for="participant in cstore.userList" :key="participant.userId">
        <div>{{ participant.profile }}</div>
        <div>{{ participant.name }}</div>
      </div>
      <button @click="deleteSchedule">일정 삭제</button>
    </div>
    <table>
      <tr>
        <th>항목</th>
        <th>금액</th>
      </tr>
    <tr v-for="receipt in sstore.receipt" :key="receipt.receiptId">
      <td>{{ receipt.item }}</td>
      <td>{{ receipt.price }}원</td>
      <button @click="deleteReceipt(receipt.receiptId)">삭제</button>
    </tr>
    <tr>
      <td></td>
      <td><h5>Total:{{ totalAmount }}원</h5></td>
    </tr>
  </table>
  <form>
    <input type="text" :value="receipt.item">
    <input type="number" :value="receipt.price">
    <button @click="createReceipt">추가</button>
  </form>
</div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useScheduleStore } from '@/stores/schedule';
import ClubInfoBar from '../common/ClubInfoBar.vue';
import KakaoMap from '@/components/common/kakao/KakaoMap.vue';
import { useRoute, useRouter } from 'vue-router';
import { useClubStore } from '@/stores/club';
import axios from 'axios';

const route = useRoute();
const sstore = useScheduleStore();
const cstore = useClubStore();
const router = useRouter();
const receipt= ref({
  scheduleId:sstore.schedule.scheduleId,
  item:'',
  price:'',
})
const receipts=ref([])
const createReceipt = function(){
  sstore.receipts.push(receipt.value);
  sstore.createReceipt(receipts.value);
}

const deleteReceipt = function (receipt) {//수정
    axios.delete(`http://localhost:8080/api-board/board/${receipt}`)
        .then(() => {
             router.push({name: 'clubScheduleDetail', params:{date:schedule.date}})
        })
}
// 일정과 참여자 정보를 불러오는 함수
async function loadScheduleDetails() {
  console.log("Route date:", route.params.date);

  // 일정 불러오기
  sstore.getSchedule(route.params.date);
  console.log("Schedule loaded:", sstore.schedule);

  if (sstore.schedule && sstore.schedule.scheduleId) {
    // 참여자 유저Id 불러오기
    sstore.getParticipant(sstore.schedule.scheduleId);


    const userIds = sstore.participant.map(participant => participant.userId);
    userIds.map(userId => cstore.getUserList(userId)); // getUser는 userId로 사용자 정보를 불러오는 함수입니다.
  }

  sstore.getPlace(sstore.schedule.placeId);

  sstore.getReceipt(sstore.schedule.scheduleId);
  console.log(sstore.receipt)
}

onMounted(() => {
  loadScheduleDetails();
});

// 스케줄의 반응적 감시
watch(() => sstore.schedule, (newSchedule) => {
  console.log("Schedule updated:", newSchedule);
}, { immediate: true });


const participant = ref({})
// 일정 참가
const joinSchedule=function(){
  participant.value.userId=null;
  participant.value.scheduleId=sstore.schedule.scheduleId;
  // 클럽아이디, 유저id(user pinia에 저장되어 있다고 생각) 넘김 메소드 생성
  axios.post(`http://localhost:8080/club/${cstore.clubId}/schedule/${sstore.schedule.scheduleId}/participant`,participant)
        .then(() => {
            router.push({ name: 'clubList' })
        })
        .catch(err =>{
          console.log(err)
        })
}


const deleteSchedule = function () {
  console.log(sstore.schedule.scheduleId)
    axios.delete(`http://localhost:8080/api-board/board/${sstore.schedule.scheduleId}`)
        .then(() => {
            router.push({ name: 'clubScheduleList' })
        })
}



const totalAmount = computed(() => {
  return sstore.receipt.reduce((sum, receipt) => sum + receipt.price, 0);
});
</script>



<style scoped>
</style>

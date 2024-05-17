import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

const REST_BOARD_API = `http://localhost:8080/api-board/board`
const REST_PLACE_API = `http://localhost:8080/api-PLACE/board`
const REST_PARTICIPANT_API = `http://localhost:8080/api-participant/board`
const REST_USER_API = `http://localhost:8080/api-participant/board`
const REST_RECEIPT_API = `http://localhost:8080/api-partcipant/board`

export const useScheduleStore = defineStore('schedule', () => {

  const schedule = ref({})
  const scheduleList = ref([
      {
        scheduleId: 1,
        title:'축구1',
        time:'07:00~09:30',
        date: '2024-04-29',
        match: 5,
        equipment: '축구화, 유니폼',
        placeId: 1
      },
      {
        scheduleId: 2,
        title:'축구2',
        time:'07:00~09:30',
        date: '2024-05-05',
        match: 10,
        equipment: '축구화, 실내화',
        placeId: 2
      },
      {
        scheduleId: 3,
        title:'축구3',
        time:'07:00~09:30',
        date: '2024-05-16',
        match: 8,
        equipment: '축구화, 골키퍼 장갑',
        placeId: 3
      },
      {
        scheduleId: 4,
        title:'축구5',
        time:'07:00~09:30',
        date: '2024-05-19',
        match: 6,
        equipment: '축구화, 트레이닝 복',
        placeId: 4
      },
      {
        scheduleId: 5,
        title:'축구6',
        time:'07:00~09:30',
        date: '2024-05-26',
        match: 12,
        equipment: '축구화, 유니폼, 골대',
        placeId: 5
      }
    ]);

  const createSchedule = function (schedule) {
    axios({
      url: REST_BOARD_API,
      method: 'POST',
      // 아래 작업하지 않아도 그냥 JSON 형태로 Content-type을 결정해서 보내버림
      // headers: {
      //   "Content-Type": "applcation/json"
      // },
      data: schedule
    })
      .then(() => {
        router.push({name: 'clubScheduleList'})
      })
      .catch((err) => {
      console.log(err)
    })
  }

  const getScheduleList = function (clubId, userId) {
    axios.get(`${REST_SCHEDULE_API}/${clubId}`)
      .then((response) => {
      scheduleList.value = response.data
    })
  }

  const getSchedule = (searchDate) => {
    console.log("Searching for date:", searchDate);
  
    // scheduleList 내 모든 날짜 로깅
    console.log("Available dates in scheduleList:");
    scheduleList.value.forEach(sch => console.log(sch.date));
  
    // 일정 찾기
    const foundSchedule = scheduleList.value.find(schedule => {
      console.log(`Checking ${schedule.date} against ${searchDate}`);
      return schedule.date === searchDate;
    });
  
    // 결과 로깅
    if (foundSchedule) {
      console.log("Found schedule:", foundSchedule);
    } else {
      console.log("No schedule found for:", searchDate);
    }
  
    schedule.value = foundSchedule;
  };



  // 이제부터 위치정보 출력
  const place = ref({})
  const getPlace = function (placeId) {
    // axios.get(`${REST_PLACE_API}/${placeId}`) // 아마 URL 
    //   .then((response) => {
    //   place.value = response.data
    // })
    place.value = places.value.find(p=>p.placeId === placeId);
  }
  const places = ref([
    //더미데이터
    {placeId:1, name:"풋살장", address:'서울 영등포구 선유로43길 19', url:'	https://map.kakao.com/link/map/668122925'},
    {placeId:2, name:"풋살장2", address:'화랑로 51길 78', url:'	https://map.kakao.com/link/map/668122925'},
    {placeId:3, name:"풋살장3", address:'서울 영등포구 선유로43길 19', url:'	https://map.kakao.com/link/map/668122925'},
    {placeId:5, name:"풋살장4", address:'서울 영등포구 선유로43길 19', url:'	https://map.kakao.com/link/map/668122925'},
    {placeId:4, name:"풋살장5", address:'화성시 금반1길 30', url:'	https://map.kakao.com/link/map/668122925'},
  ])

  // 해당 스캐줄의 참여자 유저 아이디 받아오기
  const participants = ref([
   {id:1, scheduleId:2, userId:1},
   {id:2, scheduleId:2, userId:5},
   {id:3, scheduleId:1, userId:1},
   {id:4, scheduleId:3, userId:2},
  ]);
  const participant = ref([])
  const getParticipant = function (scheduleId) {
    // axios.get(`${REST_PARTICIPANT_API}/${scheduleId}`) // 아마 URL 
    //   .then((response) => {
    //   participant.value = response.data
    // }).catch((err) => {
    //   console.log(err)
    // })
    
    //테스트 용
    participant.value = participants.value.filter(participant => participant.scheduleId === scheduleId);
  }

  const receipts = ref([
    {receiptId:1 , item:'대관료', price:1000, scheduleId:1},
    {receiptId:2 , item:'식대', price:1000000, scheduleId:1},
    {receiptId:3 , item:'대여료', price:1000, scheduleId:3},
    {receiptId:4 , item:'대관료', price:1000, scheduleId:2},
    {receiptId:5 , item:'식대', price:1000000, scheduleId:2},
    {receiptId:6 , item:'대여료', price:1000, scheduleId:2},
  ])
  const receipt = ref([])
  const getReceipt = function(scheduleId){
    // axios.get(`${REST_RECEIPT_API}/${scheduleId}`) 
    //   .then((response) => {
    //   receipt.value = response.data
    // }).catch((err) => {
    //   console.log(err)
    // })
    receipt.value = receipts.value.filter(r => r.scheduleId === scheduleId);
    
  }


  return { receipt, getReceipt, schedule, scheduleList, createSchedule, getSchedule, getScheduleList,place, getPlace, participant, getParticipant}
})

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

const REST_BOARD_API = `http://localhost:8080/api-board/board`
const REST_PLACE_API = `http://localhost:8080/api-PLACE/board`
const REST_PARTICIPANT_API = `http://localhost:8080/api-PLACE/board`

export const useScheduleStore = defineStore('schedule', () => {

  const schedule = ref({})
  const scheduleList = ref([])

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

  const getScheduleList = function (clubId) {
    axios.get(`${REST_BOARD_API}/${clubId}`)
      .then((response) => {
      boardList.value = response.data
    })
  }


  const getSchedule = function (date) {
    // 날짜를 Date 객체로 파싱
    const targetDate = new Date(date);
    const targetYear = targetDate.getFullYear();
    const targetMonth = targetDate.getMonth(); // 월은 0부터 시작 (0 = 1월)
    const targetDay = targetDate.getDate();

    // 일정 리스트에서 해당 날짜와 일치하는 일정 찾기
    const foundSchedule = scheduleList.value.find(s => {
      const scheduleDate = new Date(s.date);
      return scheduleDate.getFullYear() === targetYear &&
             scheduleDate.getMonth() === targetMonth &&
             scheduleDate.getDate() === targetDay;
    });

    // 찾은 일정을 schedule 상태에 저장
    schedule.value = foundSchedule;
  };

  const updateSchedule = function () {
    axios.put(REST_BOARD_API, schedule.value)
      .then(() => {
      router.push({name: 'boardList'})
    })
  }



  // 이제부터 위치정보 출력
  const place = ref({})
  const getPlace = function (placeId) {
    axios.get(`${REST_PLACE_API}/${placeId}`) // 아마 URL 
      .then((response) => {
      place.value = response.data
    })
  }


  // 해당 스캐줄의 참여자
  const participant = ref([])
  const getParticipant = function (scheduleId) {
    axios.get(`${REST_PARTICIPANT_API}/${scheduleId}`) // 아마 URL 
      .then((response) => {
      participant.value = response.data
    })
  }

  return { schedule, scheduleList, createSchedule, getSchedule, getScheduleList, getPlace, participant, getParticipant}
})

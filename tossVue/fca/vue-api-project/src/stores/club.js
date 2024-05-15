import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

const REST_BOARD_API = `http://localhost:8080/api-board/board`

export const useClubStore = defineStore('club', () => {
const club = ref({})
const clubMember = ref([])

  const createClub = function (club) {
    axios({
      url: REST_BOARD_API,
      method: 'POST',
      // 아래 작업하지 않아도 그냥 JSON 형태로 Content-type을 결정해서 보내버림
      // headers: {
      //   "Content-Type": "applcation/json"
      // },
      data: board
    })
      .then(() => {
        router.push({name: 'clubHome'})
      })
      .catch((err) => {
      console.log(err)
    })
  }

  const getClubMember = function (clubId) {
    axios.get(REST_BOARD_API)
      .then((response) => {
      clubMember.value = response.data
    })
  }


  const getClub = function (clubId) {
    axios.get(`${REST_BOARD_API}/${clubId}`)
      .then((response) => {
      club.value = response.data
    })
  }

  const updateClub = function () {
    axios.put(REST_BOARD_API, club.value)
      .then(() => {
      router.push({name: 'clubHome'})
    })
  }











  return { createClub, clubMember, getClubMember, club, getClub, updateClub}
})

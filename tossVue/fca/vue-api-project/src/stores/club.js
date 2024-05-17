import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

const REST_BOARD_API = `http://localhost:8080/api-board/board`

export const useClubStore = defineStore('club', () => {
const club = ref({
  clubId:1
})
const clubMember = ref([
  // 더미 데이터
  {
    userId: 1,
    name: "김철수",
    profile: "https://example.com/profiles/kim.jpg"
  },
  {
    userId: 2,
    name: "이영희",
    profile: "https://example.com/profiles/lee.jpg"
  },
  {
    userId: 3,
    name: "박지민",
    profile: "https://example.com/profiles/park.jpg"
  }
])

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


  const userList = ref([])
  const getUserList = function(userIds) {
    // clubMember 배열에서 userId가 일치하는 첫 번째 사용자 객체를 찾습니다.
    const foundUser = clubMember.value.find(user => user.userId === userIds);
    console.log(foundUser)
    
    // 찾은 사용자가 있으면, userList에 추가합니다.
    if (foundUser) {
      userList.value.push(foundUser);
    } else {
      console.log("No user found with ID:", userIds);
    }
  }
  




  return { createClub, clubMember, getClubMember, club, getClub, updateClub, userList, getUserList}
})

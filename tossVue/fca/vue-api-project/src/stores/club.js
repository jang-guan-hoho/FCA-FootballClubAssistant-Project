import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

const REST_CLUB_API = `http://localhost:8080/api-board/board`
const REST_CLUB_MEMBER_API = `http://localhost:8080/api-board/board`

export const useClubStore = defineStore('club', () => {

const clubList = ref([{
  clubId:2,
  name:"ssafy",
  maxMemeber:10,
  fee:100000,
},
{
  clubId:1,
  name:"s",
  maxMemeber:10,
  fee:10000,
}])
const MyClubIdList=ref([
  1,
])
const MyClubList =ref([
])
const club = ref({
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
      url: REST_CLUB_API,
      method: 'POST',
      // 아래 작업하지 않아도 그냥 JSON 형태로 Content-type을 결정해서 보내버림
      // headers: {
      //   "Content-Type": "applcation/json"
      // },
      data: club
    })
      .then(() => {
        router.push({name: 'clubHome'})
      })
      .catch((err) => {
      console.log(err)
    })
  }

  const getClubMember = function (clubId) {
    axios.get(`${REST_CLUB_API}/${clubId}`)
      .then((response) => {
      clubMember.value = response.data
    })
  }

// getClubList로 가져와서 pinia에 저장후 꺼내 쓸예정
  const getClub = function (clubId) {
    const numericClubId = Number(clubId);
    console.log(clubId) // 1
    club.value = clubList.value.find(club => club.clubId === numericClubId);
    console.log(club.value) // 이게 왜 undefine이 뜰까?
  }

  const updateClub = function () {
    axios.put(REST_CLUB_API, club.value)
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
  


  const getClubList = function () {
    axios.get(`${REST_CLUB_API}/`)
      .then((response) => {
      clubList.value = response.data
    })
  }

  const getMyClubList = function (userId) {
    axios.get(`${REST_CLUB_MEMBER_API}/${userId}`)
      .then((response) => {
      MyClubList.value = response.data
    })
  }
  //MyClubIdList에 있는 id를 전부 clubList에 검색해서 객체들을 배열로 MyClubList에 저장하는 메소드
  const updateMyClubList = function () {
    MyClubList.value = [];
    MyClubIdList.value.forEach(clubId => {
      const club = clubList.value.find(c => c.clubId === clubId);
      if (club) {
        MyClubList.value.push(club);
      }
    });
  }




  const joinClub = function (clubId, user) {
    //user정보 넣어줘야함 지금 아무것도 안들어있음
    axios.post(`${REST_CLUB_API}/${clubId}`, user)
    .then(()=>{
      router.push({name:'clubHome', params:{clubId:clubId}})
    })
 }


  const isClubIn = function() {
    // 클럽 객체가 비어있는지 확인
    updateMyClubList();
    return MyClubList.value && Object.keys(MyClubList.value).length > 0;
  }
  

  return { joinClub, createClub, clubMember, getClubMember, club, updateClub, userList, getUserList, clubList, isClubIn, getClubList, MyClubIdList,MyClubList, getMyClubList, updateMyClubList,getClub}
})
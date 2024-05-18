import { ref } from 'vue'
import { defineStore } from 'pinia';
import axios from 'axios'
import router from '../router'


export const useLoginStore = defineStore('login', ()=>{

    const accessToken = ref('')
    const loginUser = ref({})
    // refreshToken => 백엔드에서 응답 헤더(Cookie)에 넣어서 응답
    // -> 자동으로 브라우저에 저장이 되고, 다음 요청에 자동으로 쿠키를 가지고 요청
    // accessToken => 백엔드에서 응답 본문에 넣어서 보냄.
    // -> pinia의 상태에 저장하든, sessionStorage, localStorage에 저장.

    // POST 요청
    // userInfo: { "id": "user", "password": "user"}
    const login = (userInfo) => {
        axios.post('http://localhost:8080/user/login', userInfo)
        .then((res)=>{
            console.log(res);
            // axios가 res의 data 속성에 응답 본문을 넣어줌.
            accessToken.value = res.data.accessToken;
            loginUser.value = {...userInfo, name: res.data.name};
            router.push({ name: "private"})
        })
        .catch((e)=>{
            console.log('로그인 실패')
            console.log(e)
        })
    }

    const logout = ()=>{
        accessToken.value = ''
        loginUser.value = {}
    }

    const getMyPage = ()=>{
        axios.get('http://localhost:8080/user/mypage', {
            headers: {
                Authorization: accessToken.value
            }
        })
        .then((res)=>{
            console.log(res)
        })
    }



    return { accessToken, loginUser, login , logout, getMyPage }
})
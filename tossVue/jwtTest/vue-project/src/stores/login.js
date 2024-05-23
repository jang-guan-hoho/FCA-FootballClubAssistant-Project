import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useLoginStore = defineStore('login', () => {
  const accessToken= ref('')
    // accessToekn은 백엔드에서 본문에 넣어서 보내고
    // pina에 저장하든 sessionStorage, localStorage에저장
    const loginUser =ref('')
    const login = (userInfo) =>{
        axios.post('http://localhost:8080/user/login', userInfo)
        .then((resoponse)=>{
            accessToken.value = response.data.accessToken;
            loginUser.value = {...userInfo, name: response.data.name};
        })
    }
  return { accessToken, login, loginUser}
})

import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '../router';

export const useLoginStore = defineStore('login', () => {
    const loginUser = ref({});

    // SessionStorage에서 토큰 가져오기
    const accessToken = ref(sessionStorage.getItem('accessToken'));

    // 로그인 함수
    const login = async (userInfo) => {
        try {
            const res = await axios.post('http://localhost:8080/user/login', userInfo);
            console.log(res);
            accessToken.value = res.data.accessToken;
            sessionStorage.setItem('accessToken', accessToken.value);  // 토큰을 SessionStorage에 저장

            // 유저 객체를 응답 데이터로 설정
            loginUser.value = {
                userId: res.data.userId,
                email: userInfo.email,
                password: userInfo.password, 
                name: res.data.name,
                gender: res.data.gender,
                birth: res.data.birth,
                intro: res.data.intro,
                profile: res.data.profile
            };

            router.push({ name: "private" });
        } catch (e) {
            console.log('로그인 실패');
            console.log(e);
        }
    };
    // 로그아웃 함수
    const logout = () => {
        accessToken.value = '';
        sessionStorage.removeItem('accessToken');  // SessionStorage에서 토큰 제거
        loginUser.value = {};
        router.push({ name: "home" });
    };

// 회원가입 함수
const signup = async (formData) => {
    try {
        await axios.post('http://localhost:8080/user/signup', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        alert('회원가입 성공!');
    } catch (error) {
        console.error('회원가입 실패:', error);
        throw error;
    }
};

    return { accessToken, loginUser, login, logout, signup };
});

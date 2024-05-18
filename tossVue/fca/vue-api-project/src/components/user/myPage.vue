<template>
    <div>
      <h2>MyPage</h2>
      <form @submit.prevent="updateProfile">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="editableUser.email" readonly />
        </div>
        <div>
          <label for="name">이름:</label>
          <input type="text" id="name" v-model="editableUser.name" />
        </div>
        <div>
          <label for="gender">성별:</label>
          <select id="gender" v-model="editableUser.gender">
            <option value="male">남</option>
            <option value="female">여</option>
          </select>
        </div>
        <div>
          <label for="birth">생년월일:</label>
          <input type="date" id="birth" v-model="editableUser.birth" />
        </div>
        <div>
          <label for="intro">자기소개:</label>
          <textarea id="intro" v-model="editableUser.intro"></textarea>
        </div>
        <div>
          <label for="profile">프로필사진:</label>
          <input type="file" id="profile" @change="handleProfileUpload" />
          <img :src="editableUser.profile" alt="Profile Picture" v-if="editableUser.profile" />
        </div>
        <button type="submit">수정하기</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useLoginStore } from '@/stores/login';
  import axios from 'axios';
  
  const { loginUser, accessToken } = useLoginStore();
  
  // 사용자가 수정할 수 있는 데이터를 복사
  const editableUser = ref({ ...loginUser });
  
  const handleProfileUpload = (event) => {
    const file = event.target.files[0];
    editableUser.value.profile = URL.createObjectURL(file);
  };
  
  const updateProfile = async () => {
    const formData = new FormData();
    Object.keys(editableUser.value).forEach(key => {
      formData.append(key, editableUser.value[key]);
    });
  
    try {
      const response = await axios.put(`http://localhost:8080/user/${editableUser.userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken.value}`,
        },
      });
      // 서버 응답 후 loginUser 업데이트
      Object.assign(loginUser, response.data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };
  </script>
  
  <style scoped>
  form div {
    margin-bottom: 1em;
  }
  form label {
    display: block;
    margin-bottom: 0.5em;
  }
  form input, form textarea, form select {
    width: 100%;
    padding: 0.5em;
  }
  form img {
    max-width: 100px;
    display: block;
    margin-top: 1em;
  }
  </style>
  
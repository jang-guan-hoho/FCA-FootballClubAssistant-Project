<template>
    <div>
      <h2>Sign Up</h2>
      <form @submit.prevent="signup">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="user.email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="user.password" required />
        </div>
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="user.name" required />
        </div>
        <div>
          <label for="gender">Gender:</label>
          <select id="gender" v-model="user.gender" required>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label for="birth">Birth Date:</label>
          <input type="date" id="birth" v-model="user.birth" required />
        </div>
        <div>
          <label for="intro">Introduction:</label>
          <textarea id="intro" v-model="user.intro"></textarea>
        </div>
        <div>
          <label for="profile">Profile Picture:</label>
          <input type="file" id="profile" @change="handleProfileUpload" />
          <img :src="profilePreview" alt="Profile Picture" v-if="profilePreview" />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useLoginStore } from '@/stores/login';
  import { useRouter } from 'vue-router';
  
  const store = useLoginStore();
  const router = useRouter();
  
  const user = ref({
    email: '',
    password: '',
    name: '',
    gender: 'male',
    birth: '',
    intro: '',
    profile: ''
  });
  
  const profilePreview = ref(null);
  
  const handleProfileUpload = (event) => {
    const file = event.target.files[0];
    user.value.profile = file;
    profilePreview.value = URL.createObjectURL(file);
  };
  
  const signup = async () => {
    const formData = new FormData();
    Object.keys(user.value).forEach(key => {
      formData.append(key, user.value[key]);
    });
  
    try {
      await store.signup(formData);
      router.push({ name: 'home' });
    } catch (error) {
      console.error('Signup failed:', error);
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
  
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import PrivateView from '../views/PrivateView.vue'
import { useLoginStore } from '@/stores/login'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/private',
      name: 'private',
      component: PrivateView,
      beforeEnter(to, from){
        // to.name === 'private'
      }
    },
    
  ]
})


router.beforeEach((to, from) => {
  const loginStore = useLoginStore();

  if( to.name === "private"&& loginStore.accessToken === ''){
    return {name: "login"}
  }
  // 탐색을 취소하려면 명시적으로 false를 반환해야 함.
  return true
})

export default router

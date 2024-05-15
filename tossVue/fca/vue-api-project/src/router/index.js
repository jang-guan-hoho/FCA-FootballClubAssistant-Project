import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ClubView from '@/views/ClubView.vue'
import BoardView from '@/views/BoardView.vue'

import BoardCreate from '@/components/board/BoardCreate.vue'
import BoardList from '@/components/board/BoardList.vue'
import BoardUpdate from '@/components/board/BoardUpdate.vue'
import BoardDetail from '@/components/board/BoardDetail.vue'
import KakaoMap from '@/views/KakaoView.vue'
import ClubCreate from '@/components/club/ClubCreate.vue'
import ClubHome from '@/components/club/ClubHome.vue'
import ClubScheduleDetail from '@/components/club/schedule/ClubScheduleDetail.vue'
import ClubScheduleList from '@/components/club/schedule/ClubScheduleList.vue'
import ClubScheduleView from '@/views/ClubScheduleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/club',
      name: 'club',
      component: ClubView,
      children: [
        {
          path: '',
          name: 'clubCreate',
          component: ClubCreate,
        },
        {
          path: 'home',
          name: 'clubHome',
          component: ClubHome,
        },
        {
          path: 'schedule',
          name: 'clubSchedule',
          component: ClubScheduleView,
          children:[
            {
              path: '',
          name: 'clubScheduleList',
          component: ClubScheduleList,
            }, 
            {
              path: ':date',
              name: 'clubScheduleDetail',
              component: ClubScheduleDetail,
            },
          ]
        },
        
      ]
    },
    {
      path: '/board',
      name: 'board',
      component: BoardView,
      children: [
        {
          path: '',
          name: 'boardList',
          component: BoardList
        },
        {
          path: 'create',
          name: 'boardCreate',
          component: BoardCreate
        },
        {
          path: 'update',
          name: 'boardUpdate',
          component: BoardUpdate
        },
        {
          path: ':id',
          name: 'boardDetail',
          component: BoardDetail
        },
      ]
    },
    {
      path:"/kakao",
      name: 'kakao',
      component: KakaoMap
    }
  ]
})

export default router

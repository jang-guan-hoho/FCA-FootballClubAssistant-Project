import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ClubView from '@/views/ClubView.vue';
import BoardView from '@/views/BoardView.vue';
import BoardCreate from '@/components/board/BoardCreate.vue';
import BoardList from '@/components/board/BoardList.vue';
import BoardUpdate from '@/components/board/BoardUpdate.vue';
import BoardDetail from '@/components/board/BoardDetail.vue';
import KakaoMap from '@/views/KakaoView.vue';
import ClubCreate from '@/components/club/ClubCreate.vue';
import ClubHome from '@/components/club/ClubHome.vue';
import ClubScheduleDetail from '@/components/club/schedule/ClubScheduleDetail.vue';
import ClubScheduleList from '@/components/club/schedule/ClubScheduleList.vue';
import ClubScheduleView from '@/views/ClubScheduleView.vue';
import ClubScheduleDetailReceipt from '@/components/club/schedule/ClubScheduleDetailReceipt.vue';
import { useClubStore } from '@/stores/club';
import { useScheduleStore } from '@/stores/schedule';
import ClubHomeView from '@/views/ClubHomeView.vue';
import ClubScheduleDetailReceiptView from '@/views/ClubScheduleDetailReceiptView.vue';
import ClubList from '@/components/club/ClubList.vue';
import MyClubList from '@/components/club/MyClubList.vue';
import LoginView from '@/views/LoginView.vue';
import { useLoginStore } from '@/stores/login';
import signUp from '@/components/user/signUp.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: signUp
    },
    { path: '/clubCreate', name: 'clubCreate', component: ClubCreate },
    {
      path: '/club',
      name: 'club',
      component: ClubView,
      beforeEnter: (to, from, next) => {
        const clubStore = useClubStore();
        console.log('Club in:', clubStore.isClubIn());
        if (!clubStore.isClubIn()) {
          alert('가입된 클럽이 없습니다');
          next({ name: 'clubCreate' });
        } else {
          next();
        }
      },
      
      children: [
        {
          path: '',
          name: 'clubList',
          component: ClubList,
        },
        {
          path: 'myclublist',
          name: 'myClubList',
          component: MyClubList,
        },
        {
          path: ':clubId',
          name: 'clubHomeView',
          component: ClubHomeView,
          children: [
            {
              path: '',
              name: 'clubHome',
              component: ClubHome,
            },
            {
<<<<<<< HEAD
              path: 'pay/:clubFee/:name',
=======
              path: 'pay/:clubFee',
>>>>>>> 081c1298970ff3000fab8e41f38a0881c0194b06
              name: 'pay',
              component: () => import('../views/CheckoutView.vue')
            },
            
            {
              path: 'schedule',
              name: 'clubSchedule',
              beforeEnter: (to, from, next) => {
                const store = useScheduleStore();
                if (!store.isScheduleIn()) {
                  alert('일정이 없습니다!');
                  next({ name: 'clubHome' });
                } else {
                  next();
                }
              },
              component: ClubScheduleView,
              children: [
                { path: '', name: 'clubScheduleList', component: ClubScheduleList },
                { path: ':date', name: 'clubScheduleDetail', component: ClubScheduleDetail },
                { path: 'receipt', name: 'clubScheduleDetailReceiptView', component: ClubScheduleDetailReceiptView,
                  children:[
                    {
                      path: ':receiptDate',
                      name: 'clubScheduleDetailReceipt',
                      component:ClubScheduleDetailReceipt
                    }
                  ]
                 },
              ],
            },
            {
              path: 'board',
              name: 'boardView',
              component: BoardView,
              children: [
                { path: '', name: 'boardList', component: BoardList },
                { path: 'create', name: 'boardCreate', component: BoardCreate },
                { path: 'update', name: 'boardUpdate', component: BoardUpdate },
                { path: ':boardId', name: 'boardDetail', component: BoardDetail },
              ],
            },
          ],
        },
      ],
    },
    
    { path: '/kakao', name: 'kakao', component: KakaoMap },
    {
      path: '/success',
      name: 'success',
      component: () => import('../views/SuccessView.vue')
    },
    {
      path: '/fail',
      name: 'fail',
      component: () => import('../views/FailView.vue')
    },
   
  ],
  
});


// router.beforeEach((to, from, next) => {
//   const store = useLoginStore();
//   // home, login, signup 페이지를 제외한 모든 경로에 대해 requiresAuth 검사
//   if (!['home', 'login', 'signUp'].includes(to.name) && !store.accessToken) {
//     alert('로그인이 필요합니다.');
//     next({ name: 'login' }); // 로그인 페이지로 리디렉션
//   } else {
//     next(); // 페이지 이동 허용
//   }
// });
export default router;

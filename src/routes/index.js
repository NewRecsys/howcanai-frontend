// routes/index.js
import { createWebHistory, createRouter } from "vue-router";
import store from '../store/index.js';
import IndexView from "../views/IndexView.vue";
import ChatView from "../views/ChatView.vue";
import ChatMainArea from "../components/ChatMainArea.vue";
import SignUpView from "../views/SignUpView.vue";
import SignInView from "../views/SignInView.vue";

// ChatMainArea
const routes = [
  {
    path: "/",
    component: IndexView
  },
  {
    path: "/signup",
    component: SignUpView
  },
  {
    path: "/signin",
    component: SignInView
  },
  {
    path: "/chat",
    component: ChatView,
    beforeEnter: (to, from, next) => {
      store.dispatch('resetNewChat');
      store.dispatch('resetChatRoom');
      store.dispatch('fetchChatList')
        .then(() => {
          next();
        })
        .catch(error => {
          console.error(error);
          next(false); // 라우트 진입을 중단하고 에러 처리
        });
    },
    children: [
      {
        path: "/chat/:id",
        component: ChatMainArea,
        beforeRouteLeave(to, from, next) {
          // chatDetail 초기화 
          store.dispatch('resetChatDetail');
          next();
        },
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;